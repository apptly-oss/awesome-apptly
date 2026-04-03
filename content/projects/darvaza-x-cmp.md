---
title: darvaza.org/x/cmp
description: Generic helpers to compare and match values.
category:
  - darvaza
  - go
repo: github:darvaza-proxy/x/cmp
licence: MIT
go: darvaza.org/x/cmp
---

Generic `CompFunc[T]` (three-way) and `CondFunc[T]` (boolean)
types with conversion functions between the two styles — `AsLess`,
`AsCmp`, `AsEqual`, `Reverse`. Works with any type via custom
comparators, or directly
with `comparable`/:go-pkg{mod="darvaza.org/core" sym="Ordered"}
types.

The composable `Matcher[T]` interface chains predicates with
`And`, `Or`, and `Not`. Factory functions (`MatchEq`, `MatchLt`,
`MatchGtEq`, …) produce matchers from values or comparators, and
`Compose` transforms across types — e.g. match on a struct field
without unwrapping manually.
