---
title: Konsumsi Design System
description: Memakai @rempugwarga/design-system sebagai paket npm atau Module Federation remote, plus kebijakan versi.
---

# Konsumsi Design System

Design system rempugwarga diterbitkan sebagai paket npm
`@rempugwarga/design-system` **dan** Module Federation remote `designSystem`.

## Opsi A — paket npm (default)

```sh
bun add @rempugwarga/design-system
```

```tsx
import Provider from '@rempugwarga/design-system';
```

Gunakan rentang caret (`^0.1.0`) agar patch/minor masuk otomatis melalui PR
Dependabot di repo Anda.

## Opsi B — Module Federation (runtime)

Untuk memuat komponen tanpa rebuild aplikasi:

```ts
import { init, loadRemote } from '@module-federation/runtime';

init({
  name: 'my-app',
  remotes: [
    {
      name: 'designSystem',
      entry: import.meta.env.PUBLIC_DS_MF_MANIFEST_URL,
    },
  ],
});

const { default: Provider } = await loadRemote('designSystem/');
```

URL manifest per environment: [Environment & URL](/identity/environments).

## Kebijakan versi (kontrak)

| Aspek | Komitmen |
| --- | --- |
| Skema versi | Semantic Versioning + Changesets |
| Breaking change | Hanya pada `major` (atau catatan migrasi saat `0.x`) |
| Perubahan minor | Additive: komponen/props baru |
| Changelog | Otomatis per rilis (setiap entri memiliki PR + penulis) |
| Provenance | Setiap rilis ditandatangani (npm Trusted Publishing) |

Detail: [design-system/docs/VERSIONING.md](https://github.com/rempugwarga/design-system/blob/main/docs/VERSIONING.md).

## Melihat & mencoba komponen

- **Storybook** — preview interaktif semua komponen (URL di
  [Environment & URL](/identity/environments))
- **Docs kontrak MF**:
  [design-system/docs/INTEGRATION.md](https://github.com/rempugwarga/design-system/blob/main/docs/INTEGRATION.md)

## Alur upgrade yang disarankan

1. Dependabot membuka PR bump versi di repo Anda.
2. Lihat tautan CHANGELOG pada PR (perubahan breaking ditandai jelas).
3. Jalankan visual review melalui Storybook/preview environment.
4. Merge → deploy. Tidak ada langkah manual dengan tim design system.
