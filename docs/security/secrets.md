---
title: Manajemen Secret
description: Kebijakan organisasi — secret tidak disimpan di repository, disuntikkan dari secret manager, dan dipindai otomatis.
---

# Manajemen Secret

Aturan tunggal: **tidak ada secret di dalam repository.**

## Di mana secret disimpan

| Kebutuhan | Lokasi |
| --- | --- |
| Kredensial deploy IAM (Keycloak admin, client secret) | GitHub Environment (`iam-dev`/`iam-staging`/`iam-prod`) |
| Publikasi paket npm | Tidak ada token — **npm Trusted Publishing (OIDC)** |
| Token admin organisasi (Terraform) | GitHub Environment `org-admin` |
| Secret aplikasi runtime | Secret manager aplikasi (Vault/cloud SM) per tim |
| Konfigurasi lokal developer | `.env.local` (tidak pernah di-commit) |

## Yang ditegakkan otomatis

1. **gitleaks** pada setiap PR di seluruh repo (workflow reusable
   `reusable-security-scan.yml`).
2. **Push protection** GitHub pada repo yang mendukung.
3. **Checklist PR** menanyakan eksplisit soal secret baru.
4. `.gitignore` standar menolak `.env`, `*.tfvars`, `*.tfstate`.

## Jika Anda membutuhkan secret baru

1. Tentukan di mana secret hidup (secret manager, bukan repo).
2. Daftarkan nama variabel di dokumentasi repo Anda + `.env.example` (nilai
   kosong/contoh).
3. Untuk secret yang dipakai pipeline: minta Platform Engineering menambahkan
   ke GitHub Environment yang tepat.
4. Untuk client OIDC: ikuti [registrasi client](/identity/client-registration) —
   secret diterbitkan platform melalui kanal aman.

## Jika secret bocor

1. **Rotasi segera** di sumbernya (menghapus commit tidak cukup — riwayat git
   tetap tersimpan).
2. Audit penggunaan, cabut akses.
3. Postmortem blameless + perbaiki pola pencegahan.

Kebijakan lengkap:
[platform-ci/docs/SECRET-MANAGEMENT.md](https://github.com/rempugwarga/platform-ci/blob/main/docs/SECRET-MANAGEMENT.md).
