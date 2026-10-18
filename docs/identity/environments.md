---
title: Environment & URL
description: Daftar URL issuer, endpoint OIDC, Admin Console, dan remote design system untuk setiap environment.
---

# Environment & URL

Semua URL di bawah adalah kontrak stabil. Ganti `rempugwarga.example` dengan
domain organisasi Anda saat menerapkan; nilai sebenarnya juga tersedia sebagai
`terraform output oidc_endpoints` di repo `identity-platform`.

## Identity (OIDC)

| Item | Dev | Staging | Production |
| --- | --- | --- | --- |
| Issuer | `https://id-dev.rempugwarga.example/realms/rempugwarga` | `https://id-staging.rempugwarga.example/realms/rempugwarga` | `https://id.rempugwarga.example/realms/rempugwarga` |
| Discovery | `{issuer}/.well-known/openid-configuration` | idem | idem |
| Token | `{issuer}/protocol/openid-connect/token` | idem | idem |
| Authorization | `{issuer}/protocol/openid-connect/auth` | idem | idem |
| UserInfo | `{issuer}/protocol/openid-connect/userinfo` | idem | idem |
| JWKS | `{issuer}/protocol/openid-connect/certs` | idem | idem |
| Logout | `{issuer}/protocol/openid-connect/logout` | idem | idem |
| Admin Console | `https://id-dev.rempugwarga.example/admin` | `https://id-staging.rempugwarga.example/admin` | `https://id.rempugwarga.example/admin` |

> **Admin Console:** akses dibatasi berbasis kebutuhan — lihat
> [Akses Admin Console](/security/admin-console-access).

## Realm & konvensi

| Item | Nilai |
| --- | --- |
| Realm | `rempugwarga` (satu realm per environment) |
| Admin realm | `master` (hanya untuk operasi break-glass) |
| Client ID | konvensi `kebab-case`, mengikuti nama repository/aplikasi |

## Design System

| Item | Dev | Production |
| --- | --- | --- |
| npm registry | `@rempugwarga/design-system` (semver) | idem |
| MF manifest | `http://localhost:3001/mf-manifest.json` (lokal) | `https://ds.rempugwarga.example/mf-manifest.json` (placeholder) |
| Storybook | Storybook lokal (`bun run storybook`) | GitHub Pages repo `design-system` |

## Catatan

- Environment **dev** boleh berisi data uji dan client eksperimen (prefix
  `test-`). Jangan mengarahkan aplikasi produksi ke dev.
- Untuk perubahan URL/endpoint, pengumuman dilakukan melalui
  [katalog layanan](/services/catalog) minimal 2 minggu sebelum berlaku.
