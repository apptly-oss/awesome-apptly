---
title: @poupe/material-color-utilities
description: Fork of Google's Material Design 3 colour algorithms — timely npm releases with ESM packaging fixes.
repo: github:poupe-ui/material-color-utilities
licence: Apache-2.0
npm: @poupe/material-color-utilities
category:
  - poupe
  - ui
  - typescript
---

Fork of Google's `material-foundation/material-color-utilities`.
The upstream library implements the HCT colour space, tonal palette
generation, dynamic colour schemes, and image-to-seed extraction
that power Material Design 3 — but Google rarely publishes the
TypeScript package to npm.

This fork carries no functional changes. It re-scopes to `@poupe`,
fixes bare ESM import specifiers (missing `.js` extensions), and
publishes timely releases so downstream packages can depend on a
stable npm artefact.
