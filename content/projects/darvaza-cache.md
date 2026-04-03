---
title: darvaza.org/cache
description: Generic cache abstraction with TTL, stampede control, and pluggable backends.
category:
  - darvaza
  - go
repo: github:darvaza-proxy/cache
licence: MIT
go: darvaza.org/cache
---

Generic cache abstraction keyed by any `comparable` type. The
:go-pkg{mod="darvaza.org/cache" sym="Cache" short} interface
provides `Get`, `Set`, and `Remove` with per-entry expiration. Data
flows through a `Sink` abstraction — `ByteSink` for raw bytes,
`GobSink[T]` for Gob-encoded objects, or a custom `SinkFn[T]` built
from user-supplied encode/decode functions.
A :go-pkg{mod="darvaza.org/cache" sym="Store" short} manages named
cache namespaces with size limits and pluggable data loaders
(`Getter[K]`).

## Backends

| Backend | Module | Description |
|---------|--------|-------------|
| simplelru | :badge-version-go{mod="darvaza.org/cache/x/simplelru"} | Non-thread-safe LRU with TTL; evicts expired entries first |
| memcache | :badge-version-go{mod="darvaza.org/cache/x/memcache"} | Thread-safe in-memory cache with `SingleFlight` stampede prevention |
| groupcache | :badge-version-go{mod="darvaza.org/cache/x/groupcache"} | Distributed caching via :go-pkg{mod="github.com/mailgun/groupcache/v2" label="mailgun/groupcache"} with HTTP peer discovery |
| protosink | :badge-version-go{mod="darvaza.org/cache/x/protosink"} | `TSink[T]` implementation using Protocol Buffers encoding |

## See also

- DNS resolver (uses simplelru) — :go-pkg{mod="darvaza.org/resolver"}
- Structured logging — :go-pkg{mod="darvaza.org/slog"}
