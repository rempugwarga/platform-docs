---
title: Onboarding Tim Aplikasi
description: Checklist 30 menit untuk menghubungkan aplikasi baru ke layanan platform (OIDC, design system, CI/CD).
---

# Onboarding Tim Aplikasi (30 menit)

Target: aplikasi baru dengan login OIDC, komponen design system, dan pipeline
CI/CD — tanpa menunggu pekerjaan manual tim platform.

## Langkah

### 1. Scaffold aplikasi (± 5 menit)

```sh
git clone https://github.com/rempugwarga/app-template.git my-app
cd my-app
bun install
```

Template sudah berisi: Rsbuild + React + TypeScript, login OIDC (PKCE),
konsumsi design system, CI/CD via workflow reusable, dan `.env.example`.

### 2. Daftarkan client OIDC (± 10 menit, self-service)

Ikuti [mekanisme registrasi client](/identity/client-registration): buat file
`clients/<clientId>.json` di repo `identity-platform` dan buka PR. CI akan
memvalidasi; review maksimal 2 hari kerja. Untuk pengembangan lokal, client
`web-dashboard` sudah mencakup `http://localhost:5173`.

### 3. Isi konfigurasi environment (± 5 menit)

Salin `.env.example` → `.env.local` (jangan commit). Isi URL issuer sesuai
[daftar environment](/identity/environments) dan `client_id` Anda. Secret tidak
diperlukan untuk public client (PKCE).

### 4. Aktifkan CI/CD (± 5 menit)

Repo hasil clone sudah memanggil workflow reusable `platform-ci`. Pastikan:

- repo terdaftar di [repos.yaml](https://github.com/rempugwarga/platform-ci/blob/main/repos.yaml)
  (agar branch protection + tim pemilik dibuat otomatis)
- CODEOWNERS repo diganti ke tim Anda

### 5. Deploy ke staging (± 5 menit)

Push ke `main` → pipeline build + scan + deploy staging (environment
`app-staging`). Produksi memerlukan approval environment `app-prod`.

## Checklist hasil akhir

- [ ] Login OIDC berfungsi (Authorization Code + PKCE)
- [ ] Komponen design system dirender
- [ ] `bun run typecheck && bun run test && bun run build` hijau
- [ ] CI hijau (build, test, security scan)
- [ ] Client terdaftar dengan `owner` = tim Anda

## Butuh bantuan?

- Office hours platform: Selasa 14:00 WIB (`#platform-engineering`)
- Jika integrasi mandiri gagal: buka issue di repo platform terkait — platform
  memperbaiki alur, bukan mengambil alih pekerjaan Anda (prinsip enabling).
