---
title: @poupe/eslint-config
description: Shareable ESLint flat-config preset for TypeScript, Vue, and Tailwind CSS projects.
repo: github:poupe-ui/eslint-config
licence: MIT
npm: @poupe/eslint-config
category:
  - poupe
  - tooling
  - typescript
---

Opinionated ESLint 9 flat-config preset used across all Poupe and
Apptly repositories. Layers `@stylistic` formatting, `typescript-eslint`
strict rules, `unicorn` best-practices, and `perfectionist` import
sorting into a single shareable config.

Framework-aware: Vue SFC support, tsdoc enforcement, markdownlint
for prose files, jsonc for config files, and `@eslint/css` with
Tailwind CSS v4 `@theme` syntax validation. Provides `defineConfig`,
`withPoupe`, and `withConfig` helpers for composing project-specific
overrides on top of the preset.
