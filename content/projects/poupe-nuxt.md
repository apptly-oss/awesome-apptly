---
title: @poupe/nuxt
description: Nuxt module that auto-configures Poupe UI — theme CSS, component registration, and colour-mode support.
repo: github:poupe-ui/poupe/packages/@poupe-nuxt
licence: MIT
npm: @poupe/nuxt
category:
  - poupe
  - ui
  - typescript
---

Drop-in Nuxt integration for the full Poupe UI stack. Add the
module, provide a seed colour, and everything else is wired
automatically — Tailwind plugin, theme CSS injection, Vue component
registration, and `@nuxtjs/color-mode` integration.

Handles SSR-safe colour-scheme hydration, tree-shakes unused
components via the auto-import resolver, and exposes module options
for overriding theme tokens, icon sets, and scrollbar styling
without ejecting from the defaults.
