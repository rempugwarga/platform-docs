---
title: Katalog Layanan
description: Daftar layanan yang disediakan platform beserta pemilik, kontrak, SLA, dan mode interaksi.
---

# Katalog Layanan Platform

Sumber kebenaran: [`services.yaml`](https://github.com/rempugwarga/platform-docs/blob/main/services.yaml)
(diuji otomatis). Layanan dikonsumsi dengan mode **X-as-a-Service** — tim
aplikasi berintegrasi melalui antarmuka terdokumentasi tanpa ketergantungan
manual.

| Layanan | Pemilik | Antarmuka | Kontak | SLA |
| --- | --- | --- | --- | --- |
| Identity & OIDC | Identity Platform Team | OIDC discovery; registrasi client via PR | `#identity-platform` | Review client ≤ 2 hari kerja |
| Design System | Design System Team | npm semver + MF remote | `#platform-design-system` | Perbaikan bug ≤ 5 hari kerja |
| CI/CD & Branch Protection | Platform Engineering | Workflow reusable + `repos.yaml` | `#platform-engineering` | Perubahan standar ≤ 3 hari kerja |
| Golden Path Aplikasi | Platform Engineering | Repo template | `#platform-engineering` | Template selalu hijau |
| Portal Dokumentasi | Platform Engineering | Situs statis | `#platform-engineering` | Diperbarui bersama kontrak |

## Cara memulai (tanpa menunggu tim platform)

| Layanan | Jalur permintaan self-service |
| --- | --- |
| Identity & OIDC | `bun run new-client …` di repo `identity-platform` → PR ke `clients/` |
| Design System | `npm install @rempugwarga/design-system` atau MF remote; upgrade via Dependabot |
| CI/CD | Salin pemanggilan workflow reusable ke `.github/workflows/` (contoh tersedia) |
| Golden Path | "Use this template" + checklist onboarding di README repo hasil |
| Portal Docs | Usulan perubahan kontrak via PR (review code owner kontrak) |

## Mode interaksi tim (ringkasan)

| Hubungan | Mode | Batasan |
| --- | --- | --- |
| Tim aplikasi ↔ platform | X-as-a-Service | Standar; melalui kontrak & PR |
| Platform ↔ tim baru | Facilitating (time-boxed) | Onboarding maksimal 2 minggu, lalu mandiri |
| Platform ↔ platform | Collaboration untuk perubahan besar | Time-boxed per inisiatif |

Detail arsitektur organisasi (topologi tim & Conway alignment): dokumen
`ARCHITECTURE.md` di workspace organisasi + ringkasan governance & kepemilikan
di [repo `platform-ci`](https://github.com/rempugwarga/platform-ci).

## Menambah/mengubah layanan

1. PR ke `services.yaml` (owner, interface, SLA, kontak).
2. CI memvalidasi schema + kepemilikan.
3. Pengumuman ke `#platform-engineering` dan (bila breaking) portal ini
   diperbarui pada halaman terkait.
