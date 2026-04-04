---
title: @poupe/tailwindcss
description: Tailwind CSS v4 plugin that injects Poupe theme tokens as design tokens and utility classes.
repo: github:poupe-ui/poupe/packages/@poupe-tailwindcss
licence: MIT
npm: @poupe/tailwindcss
category:
  - poupe
  - ui
  - typescript
---

Bridges :npm-pkg{pkg="@poupe/theme-builder"} tokens into
:npm-pkg{pkg="tailwindcss" label="Tailwind CSS"} v4's `@theme`
layer. Colour roles, typography scales, elevation levels,
and shape tokens are registered as CSS custom properties so they
participate in Tailwind's utility generation — `bg-primary`,
`text-on-surface`, `rounded-lg` all resolve to the active theme.

Supports light/dark mode switching through the token layer, custom
breakpoints, and composing multiple theme sources into a single
Tailwind configuration.
