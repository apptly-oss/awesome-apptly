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

Drop-in :npm-pkg{pkg="nuxt" label="Nuxt"} integration for the
full Poupe UI stack. Add the module, provide a seed colour, and
everything else is wired automatically —
:npm-pkg{pkg="tailwindcss" label="Tailwind CSS"} plugin, theme
CSS injection, :npm-pkg{pkg="vue" label="Vue"} component
registration,
and :npm-pkg{pkg="@nuxtjs/color-mode"} integration.

Handles SSR-safe colour-scheme hydration, tree-shakes unused
components via the auto-import resolver, and exposes module options
for overriding theme tokens, icon sets, and scrollbar styling
without ejecting from the defaults.
