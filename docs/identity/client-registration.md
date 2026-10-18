---
title: Registrasi Client
description: Mekanisme self-service pendaftaran client OIDC bagi tim aplikasi — alur, aturan, SLA, dan penanganan secret.
---

# Registrasi Client (Self-Service)

Registrasi client adalah **Pull Request** ke repo
[`identity-platform`](https://github.com/rempugwarga/identity-platform) —
tidak ada pekerjaan manual atau antrian tiket.

## Ringkasan alur

```
Tim aplikasi                      Platform (otomatis + review)
────────────────                  ────────────────────────────
1. Generate clients/<id>.json
   (bun run new-client …)
2. Buka PR            ──────────►  CI: schema + kebijakan + terraform plan +
                                   integration test (realm ephemeral)
3. Alamatkan review   ◄─────────►  Reviewer: Identity Platform Team (SLA 2 hari kerja)
4. Merge              ──────────►  Apply otomatis ke dev
                                   staging/prod via approval environment
5. Terima secret aman ◄─────────   Hanya untuk confidential client
```

Generator client (menjalankan validasi kebijakan yang sama dengan CI):

```sh
bun run new-client --id my-app --name "My App" --owner team-billing \
  --type public-spa --base-url https://my-app.rempugwarga.example \
  --environments dev,staging,prod
```

## Aturan yang divalidasi otomatis

| Aturan | Detail |
| --- | --- |
| Penamaan | `clientId` = nama file; `kebab-case` |
| Kepemilikan | `owner` wajib tim terdaftar di `governance/teams.json` |
| PKCE | `public-spa`/`mobile` wajib `"pkce": "S256"` |
| Redirect URI | HTTPS (kecuali localhost); tanpa wildcard |
| Scope & audience | Terbatas pada `policies/token-policy.json` |
| Environment | `test-` hanya untuk dev |

## Contoh minimal (SPA)

```json
{
  "clientId": "my-app",
  "name": "My App",
  "description": "Aplikasi internal untuk <tujuan>",
  "owner": "team-billing",
  "type": "public-spa",
  "environments": ["dev", "staging", "prod"],
  "redirectUris": ["https://my-app.rempugwarga.example/callback"],
  "webOrigins": ["https://my-app.rempugwarga.example"],
  "scopes": ["openid", "profile", "email", "roles"],
  "pkce": "S256"
}
```

## Secret (confidential client)

- Secret **tidak pernah** ditulis di repository.
- Platform menyuntikkan secret saat deploy dari secret manager
  (`TF_VAR_client_secrets`).
- Tim aplikasi menerima secret melalui kanal aman dan menyimpannya di secret
  manager aplikasi (bukan `.env` yang di-commit).
- Rotasi maksimal **90 hari** — koordinasikan melalui PR perubahan bila perlu
  regenerasi dini.

## SLA & escalation

| Aktivitas | SLA |
| --- | --- |
| Review PR registrasi | ≤ 2 hari kerja |
| Perubahan darurat (security) | ≤ 4 jam, gunakan label `urgent` |
| Pertanyaan | `#identity-platform`, respons ≤ 1 hari kerja |

Dokumentasi lengkap (termasuk offboarding client):
[identity-platform/docs/CLIENT-REGISTRATION.md](https://github.com/rempugwarga/identity-platform/blob/main/docs/CLIENT-REGISTRATION.md).
