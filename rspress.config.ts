import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: 'docs',
  lang: 'id',
  title: 'rempugwarga · Dokumentasi Platform',
  description:
    'Kontrak integrasi dan katalog layanan platform: identity (OIDC), design system, CI/CD, dan keamanan.',
  base: process.env.DOCS_BASE ?? '/',
});
