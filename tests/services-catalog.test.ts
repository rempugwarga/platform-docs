import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import Ajv from 'ajv';
import { describe, expect, it } from '@rstest/core';

interface ServiceEntry {
  name: string;
  display_name: string;
  type: string;
  owner: string;
  repository: string;
  docs: string[];
  interaction: string;
  contact: string;
  interface: string;
  request_path: string;
  sla: string;
  versioning: string;
}

function docPathCandidates(docPath: string): string[] {
  const rel = docPath === '/' ? 'index' : docPath.replace(/^\/+|\/+$/g, '');
  return [
    `docs/${rel}.md`,
    `docs/${rel}.mdx`,
    `docs/${rel}/index.md`,
    `docs/${rel}/index.mdx`,
  ];
}

const catalog = parse(readFileSync('services.yaml', 'utf8')) as {
  services: ServiceEntry[];
};

const schema = {
  type: 'object',
  additionalProperties: false,
  required: ['services'],
  properties: {
    services: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        required: [
          'name',
          'display_name',
          'type',
          'owner',
          'repository',
          'docs',
          'interaction',
          'contact',
          'interface',
          'request_path',
          'sla',
          'versioning',
        ],
        properties: {
          name: { type: 'string', pattern: '^[a-z][a-z0-9-]{2,63}$' },
          display_name: { type: 'string', minLength: 3 },
          type: { enum: ['identity', 'ui', 'ci-cd', 'template', 'docs'] },
          owner: { type: 'string', pattern: '^[a-z][a-z0-9-]{2,49}$' },
          repository: { type: 'string', format: 'uri' },
          docs: {
            type: 'array',
            minItems: 1,
            items: { type: 'string', pattern: '^/' },
          },
          interaction: {
            enum: ['x-as-a-service', 'collaboration', 'facilitating'],
          },
          contact: { type: 'string', minLength: 2 },
          interface: { type: 'string', minLength: 10 },
          request_path: { type: 'string', minLength: 10 },
          sla: { type: 'string', minLength: 5 },
          versioning: { type: 'string', minLength: 5 },
        },
      },
    },
  },
};

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

describe('services.yaml — katalog layanan', () => {
  it('valid terhadap schema', () => {
    const valid = validate(catalog);
    expect(validate.errors ?? []).toEqual([]);
    expect(valid).toBe(true);
  });

  it('nama layanan unik', () => {
    const names = catalog.services.map((service) => service.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('setiap layanan memiliki pemilik, kontak, dan SLA', () => {
    for (const service of catalog.services) {
      expect(service.owner.length).toBeGreaterThan(2);
      expect(service.contact.startsWith('#')).toBe(true);
      expect(service.sla.length).toBeGreaterThan(5);
    }
  });

  it('setiap layanan punya minimal satu dokumen kontrak', () => {
    for (const service of catalog.services) {
      expect(service.docs.length).toBeGreaterThan(0);
    }
  });

  it('setiap dokumen kontrak menunjuk file yang benar-benar ada (tanpa link mati)', () => {
    for (const service of catalog.services) {
      for (const docPath of service.docs) {
        const candidates = docPathCandidates(docPath);
        const found = candidates.some((candidate) => existsSync(candidate));
        expect(found, `docs "${docPath}" (${service.name}) tidak ditemukan; dicoba: ${candidates.join(', ')}`).toBe(true);
      }
    }
  });

  it('setiap layanan mendokumentasikan jalur permintaan self-service', () => {
    for (const service of catalog.services) {
      expect(service.request_path.length).toBeGreaterThanOrEqual(10);
    }
  });
});
