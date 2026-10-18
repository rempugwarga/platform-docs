---
title: Integrasi OIDC
description: Cara menghubungkan aplikasi ke identity platform rempugwarga — flow, endpoint, contoh kode, dan penanganan error.
---

# Integrasi OIDC

Platform identitas rempugwarga menyediakan **OpenID Connect (OIDC)** standar
berbasis Keycloak. Halaman ini adalah kontrak integrasi; perubahan bersifat
additive dan diumumkan di katalog layanan.

## Pilih flow

| Tipe aplikasi | Flow | Catatan |
| --- | --- | --- |
| SPA / frontend (React, Vue, dll.) | **Authorization Code + PKCE (S256)** | Wajib PKCE; tanpa client secret |
| Aplikasi mobile | Authorization Code + PKCE (S256) | Gunakan custom scheme/biometric storage |
| Service / worker (M2M) | **Client Credentials** | Client rahasia; secret dari secret manager |
| Aplikasi web backend (server-rendered) | Authorization Code | Client rahasia; simpan token di server-side session |

> Implicit flow **tidak didukung** dan `Direct Access Grants` (password grant)
> dinonaktifkan oleh kebijakan platform.

## Endpoint per environment

Selalu temukan endpoint dari **discovery document** — jangan hardcode:

```
GET {issuer}/.well-known/openid-configuration
```

Daftar issuer per environment: [Environment & URL](/identity/environments).

Field penting pada discovery document:

| Field | Dipakai untuk |
| --- | --- |
| `authorization_endpoint` | Memulai login pengguna |
| `token_endpoint` | Menukar code / refresh / client credentials |
| `userinfo_endpoint` | Profil pengguna |
| `end_session_endpoint` | Logout SSO |
| `jwks_uri` | Verifikasi tanda tangan token (resource server) |

## Contoh SPA (React, `oidc-client-ts`)

```ts
import { UserManager } from 'oidc-client-ts';

export const userManager = new UserManager({
  authority: import.meta.env.PUBLIC_OIDC_ISSUER,
  client_id: import.meta.env.PUBLIC_OIDC_CLIENT_ID,
  redirect_uri: `${window.location.origin}/callback`,
  post_logout_redirect_uri: window.location.origin,
  scope: 'openid profile email roles',
  // PKCE otomatis diaktifkan oidc-client-ts; jangan simpan token di localStorage
  userStore: undefined, // gunakan sessionStorage in-memory default yang aman
});

export async function login(): Promise<void> {
  await userManager.signinRedirect();
}
```

Pola lengkap (refresh otomatis, route guard, logout) tersedia di
[`app-template`](https://github.com/rempugwarga/app-template).

## Contoh service (M2M, client credentials)

```ts
const response = await fetch(`${issuer}/protocol/openid-connect/token`, {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.OIDC_CLIENT_ID!,
    client_secret: process.env.OIDC_CLIENT_SECRET!, // dari secret manager
    scope: 'billing-api',
  }),
});
```

## Verifikasi token (resource server)

1. Verifikasi tanda tangan melalui JWKS (`jwks_uri`) dan **cache** kunci.
2. Validasi `iss` (harus tepat sama dengan issuer environment).
3. Validasi `aud` — token hanya untuk API Anda (audience mapper per API).
4. Validasi `exp` dengan toleransi clock skew ±30 detik.
5. Jangan panggil `userinfo` untuk setiap request — token sudah cukup.

## Penanganan error umum

| Gejala | Penyebab | Solusi |
| --- | --- | --- |
| `invalid_redirect_uri` | URI tidak terdaftar untuk client | Perbarui registrasi client (PR) |
| `invalid_request` saat login | PKCE tidak dikirim | Pastikan `code_challenge` S256 terkirim |
| `invalid_grant` saat refresh | Refresh token dipakai ulang (rotasi) | Simpan token terbaru; jangan paralel refresh |
| 401 dari API sendiri | `aud`/`iss` salah atau token kedaluwarsa | Cek issuer environment + refresh |
| `Sesi berakhir tiba-tiba` | SSO idle timeout 30 menit | Implementasikan refresh otomatis |

Escalation: `#identity-platform` (SLA respons 1 hari kerja).
