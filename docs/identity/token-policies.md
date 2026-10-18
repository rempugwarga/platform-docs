---
title: Kebijakan Token
description: Umur token, rotasi refresh, scope, audience, MFA, dan rotasi kredensial pada identity platform.
---

# Kebijakan Token

Nilai lengkap & sumber kebenaran:
[`policies/token-policy.json`](https://github.com/rempugwarga/identity-platform/blob/main/policies/token-policy.json)
(diuji CI; perubahan wajib PR). Kontrak saat ini: **versi 1.0.0**, efektif
**2026-10-01** — versi dinaikkan setiap nilai kebijakan berubah, sehingga
perilaku token dapat dikaitkan dengan versi kontrak.

## Ringkasan untuk konsumen

| Parameter | Nilai | Dampak ke aplikasi |
| --- | --- | --- |
| Access token | **5 menit** | Implementasikan refresh otomatis |
| Refresh token | Rotasi, reuse dilarang | Simpan token terbaru; jangan refresh paralel |
| SSO session idle | **30 menit** | User pasif harus login ulang |
| SSO session max | 10 jam | Sesi dipaksa berotasi tiap hari kerja |
| PKCE | Wajib S256 untuk SPA/mobile | Gunakan library OIDC standar |
| MFA | TOTP tersedia per user | Diminta platform sesuai risiko |
| Audience | Per API (mapper) | Jangan pakai token lintas API |

## Klaim (claims) yang dijamin

| Klaim | Isi | Catatan |
| --- | --- | --- |
| `iss` | issuer environment | Jangan hardcode; validasi |
| `aud` | API target | Wajib divalidasi resource server |
| `sub` | ID unik pengguna | Stabil per realm |
| `preferred_username` | username | Untuk tampilan/log |
| `email`, `name` | profil | Sesuai scope `email`/`profile` |
| `realm_access.roles` | role realm | Gunakan untuk otorisasi kasar |
| `exp`, `iat` | masa berlaku | Toleransi clock skew 30 dtk |

## Praktik aman (wajib)

1. **Jangan simpan token di `localStorage`.** Gunakan memori/session storage
   (`oidc-client-ts` default) atau BFF pattern.
2. **Verifikasi audience** di setiap API (bukan hanya signature).
3. **Jangan log token.** Redaksi header `Authorization` di log/tracing.
4. **Refresh dengan single-flight** — hindari beberapa refresh paralel
   (refresh rotation membuat yang kalah invalid).

## Rotasi kredensial

| Kredensial | Maksimum | Cara rotasi |
| --- | --- | --- |
| Client secret | 90 hari | PR ke `identity-platform` bila regenerasi diperlukan |
| Kredensial admin | 90 hari / break-glass | [Akses Admin Console](/security/admin-console-access) |

Detail lengkap & alasan kebijakan:
[identity-platform/docs/TOKEN-POLICY.md](https://github.com/rempugwarga/identity-platform/blob/main/docs/TOKEN-POLICY.md).
