---
title: @poupe/vue
description: Vue 3 component library with themed, accessible UI components built on reka-ui.
repo: github:poupe-ui/poupe/packages/@poupe-vue
licence: MIT
npm: @poupe/vue
category:
  - poupe
  - ui
  - typescript
---

Built on `reka-ui` headless primitives for accessibility, styled with
`tailwind-variants` for token-driven theming. Each component resolves
its colours and spacing from `@poupe/tailwindcss` tokens, so
switching the seed colour re-themes the entire UI automatically.

Ships a component resolver for bundler auto-imports, composables
for reactive theme state, a colour-scheme manager (light / dark /
system), and a story viewer for developing components in isolation.
