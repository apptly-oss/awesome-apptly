---
title: darvaza.org/x/container
description: Generic data structure implementations extending Go's standard containers.
category:
  - darvaza
  - go
repo: github:darvaza-proxy/x/container
licence: MIT
go: darvaza.org/x/container
---

Three generic collection types. `container/list` wraps
:go-pkg{mod="container/list" sym="List"} as a type-safe `List[T]`
with match, filter, and move operations. `container/set` provides a hash-bucketed,
thread-safe `Set[K,H,T]` keyed by user-supplied hash and match
functions.

`container/slices` implements sorted-slice-backed sets —
`CustomSet[T]` for any type with a custom comparator, and
`OrderedSet[T]` as a convenience for :go-pkg{mod="darvaza.org/core" sym="Ordered"}
types. All
sets support `Add`, `Remove`, `Contains`, `ForEach`, `Clone`,
and capacity management (`Reserve`, `Grow`, `Trim`).
