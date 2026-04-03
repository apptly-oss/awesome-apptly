---
title: @kagal/cross-test
description: Cross-platform shell conditions and file tests for npm scripts.
repo: github:kagal-dev/cross-test
licence: MIT
npm: @kagal/cross-test
category:
  - kagal
  - tooling
  - typescript
---

A zero-dependency CLI that brings Unix-like `test` (or `[ ]`)
conditions to any platform. Write conditional logic in `package.json`
scripts that works identically on Windows, macOS, and Linux.

Supports file tests (`-f`, `-d`, `-e`, `-s`), string comparisons
(`=`, `!=`, `-n`, `-z`), logical operators (`!`, `-a`, `-o`), and
grouping with parentheses. Variables (`$VAR`, `${VAR}`) are expanded
from `process.env` before parsing.
