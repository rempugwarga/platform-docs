# platform-docs

Portal dokumentasi & **kontrak integrasi** rempugwarga (Rspress, konten
Bahasa Indonesia).

> **Pemilik (owner):** Platform Engineering (`@rempugwarga/platform-engineering`)
> **Kontak:** `#platform-engineering`

## Peran dalam organisasi

- **Kontrak terdokumentasi**: OIDC (flow, endpoint, registrasi client, token),
  design system (konsumsi & versioning), CI/CD, dan kebijakan akses.
- **Katalog layanan**: [`services.yaml`](services.yaml) — daftar layanan,
  pemilik, SLA, dan mode interaksi (X-as-a-Service).
- **Self-service**: tim aplikasi mengikuti panduan di sini tanpa menunggu
  bantuan manual.

## Pengembangan

```sh
bun install
bun run dev        # http://localhost:3000
bun run typecheck
bun run test       # validasi services.yaml
bun run build      # doc_build/
```

## Menambah/mengubah dokumentasi

1. Konten berada di `docs/`; navigasi diatur oleh `_meta.json` per folder.
2. Perubahan kontrak (identity/design system/security) memerlukan review code
   owner tim pemilik layanan (lihat `.github/CODEOWNERS`).
3. Jalankan `bun run build` lokal — halaman yang lolos `dev` tetap bisa gagal
   saat build statis.

## Deploy

Push ke `main` → pipeline build + scan + deploy ke GitHub Pages
(dengan `DOCS_BASE` otomatis). Workflow memakai reusable `platform-ci`.
