---
title: Dokumentasi Platform rempugwarga
description: Pusat kontrak integrasi platform — OIDC, design system, CI/CD, dan keamanan untuk tim aplikasi.
---

# Dokumentasi Platform

Portal ini adalah **kontrak resmi** antara tim platform dan tim aplikasi
(stream-aligned). Semua layanan platform terdokumentasi di sini — integrasi
dapat dilakukan **self-service tanpa menunggu bantuan manual**.

## Layanan platform

| Layanan | Pemilik | Dokumentasi |
| --- | --- | --- |
| Identity (OIDC / Keycloak) | Identity Platform Team | [Integrasi OIDC](/identity/oidc-integration) · [Environment](/identity/environments) · [Registrasi client](/identity/client-registration) · [Kebijakan token](/identity/token-policies) |
| Design System (`@rempugwarga/design-system`) | Design System Team | [Konsumsi & versioning](/design-system/consumption) |
| CI/CD reusable + branch protection | Platform Engineering | [platform-ci](https://github.com/rempugwarga/platform-ci) (README) |
| Golden path aplikasi | Platform Engineering | [app-template](https://github.com/rempugwarga/app-template) |

## Mulai dari sini

1. **[Onboarding tim aplikasi](/onboarding/)** — 30 menit dari nol ke aplikasi
   ber-login yang terhubung ke layanan platform.
2. **[Katalog layanan](/services/catalog)** — daftar layanan, SLA, dan mode
   interaksi.
3. **[Kebijakan keamanan](/security/secrets)** — aturan secret dan akses.
