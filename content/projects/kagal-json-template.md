---
title: @kagal/json-template
repo: github:kagal-dev/json-template
licence: MIT
npm: @kagal/json-template
category:
  - kagal
  - tooling
  - typescript
description: JSON template engine with shell-style ${var:-default} variable substitution.
---

A compile-once, render-to-native-objects template engine for JSON
documents. Variables use shell-style `${var:-default}` syntax; types
are preserved (numbers stay numbers, booleans stay booleans) — no
string concatenation of JSON, no `JSON.parse` at render time.

Supports dotted key paths for nested context traversal, strict mode
for missing variables, and static analysis of variable metadata
without requiring valid JSON input.
