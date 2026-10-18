---
title: Akses Admin Console
description: Siapa yang boleh mengakses Admin Console Keycloak, bagaimana persetujuannya, dan bagaimana auditnya.
---

# Akses Admin Console (Berbasis Kebutuhan)

Admin Console Keycloak adalah permukaan risiko tinggi. Akses diberikan **hanya
bila ada kebutuhan operasional** yang tidak bisa dipenuhi pipeline, disetujui,
dan teraudit.

## Ikhtisar model

| Peran | Hak | Cara memperoleh |
| --- | --- | --- |
| Tim aplikasi (default) | Perubahan via PR ke `identity-platform` | Tidak perlu Admin Console sama sekali |
| Realm auditor | Baca event/sesi/konfigurasi | Role `realm-auditor` (di kode platform) |
| Platform admin | Operasional realm terbatas | Group `platform-admins` (Identity Platform) |
| Break-glass | Akses penuh (master realm) | Prosedur darurat; maksimal 2 orang |

## Prinsip

1. **Default tanpa akses.** Semua kebutuhan umum (registrasi client, kebijakan
   token, perubahan realm) dipenuhi self-service melalui PR.
2. **MFA wajib** untuk semua akun admin.
3. **Four-eyes:** akses break-glass memerlukan dua orang dan tiket insiden.
4. **Audit penuh:** semua admin events tercatat dan diekspor berkala.
5. **Review kuartalan:** daftar pemegang akses dibandingkan kebutuhan nyata.

## Untuk tim aplikasi

Anda **tidak memerlukan** Admin Console:

- Melihat konfigurasi realm → discovery document (publik).
- Mendaftarkan/mengubah client → PR self-service.
- Mengubah kebijakan token → PR + review.
- Melihat event login Anda → minta ekspor ke `#identity-platform`.

Detail prosedur internal (break-glass, pencabutan):
[identity-platform/docs/ADMIN-ACCESS.md](https://github.com/rempugwarga/identity-platform/blob/main/docs/ADMIN-ACCESS.md).
