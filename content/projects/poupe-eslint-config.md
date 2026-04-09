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

Opinionated :npm-pkg{pkg="eslint" label="ESLint"} 9
flat-config preset used across all Poupe and Apptly repositories.
Layers :npm-pkg{pkg="@stylistic/eslint-plugin" label="@stylistic"}
formatting,
:npm-pkg{pkg="typescript-eslint"} strict rules,
:npm-pkg{pkg="eslint-plugin-unicorn" label="unicorn"} best-practices,
and :npm-pkg{pkg="eslint-plugin-perfectionist" label="perfectionist"}
import sorting into a single shareable config.

Framework-aware: :npm-pkg{pkg="vue" label="Vue"} SFC support,
:npm-pkg{pkg="eslint-plugin-tsdoc" label="tsdoc"} enforcement,
:npm-pkg{pkg="eslint-plugin-markdownlint" label="markdownlint"} for
prose files, :npm-pkg{pkg="eslint-plugin-jsonc" label="jsonc"} for
config files, and :npm-pkg{pkg="@eslint/css"} with
:npm-pkg{pkg="tailwindcss" label="Tailwind CSS"} v4 `@theme`
syntax validation. Provides `defineConfig`, `withPoupe`, and
`withConfig` helpers for composing project-specific overrides on
top of the preset.
