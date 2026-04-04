---
title: @poupe/theme-builder
description: Design token management and theme generation for Material Design 3 colour schemes.
repo: github:poupe-ui/poupe/packages/@poupe-theme-builder
licence: MIT
npm: @poupe/theme-builder
category:
  - poupe
  - ui
  - typescript
---

Takes a seed colour and runs it through the Material Design 3
tonal algorithm (via :npm-pkg{pkg="@poupe/material-color-utilities"}) to produce
a complete colour scheme — primary, secondary, tertiary, error,
surface variants, and their on-colour counterparts in both light
and dark modes.

The output is a structured token tree that downstream
packages (:npm-pkg{pkg="@poupe/tailwindcss"},
:npm-pkg{pkg="@poupe/vue"}) consume directly. Supports custom
colour overrides, additional palette sources, and serialisation
to CSS custom properties via :npm-pkg{pkg="@poupe/css"}.
