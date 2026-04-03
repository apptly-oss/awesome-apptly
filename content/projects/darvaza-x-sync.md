---
title: darvaza.org/x/sync
description: Synchronisation primitive interfaces with panic-safe cleanup.
category:
  - darvaza
  - go
repo: github:darvaza-proxy/x/sync
licence: MIT
go: darvaza.org/x/sync
---

Defines `Mutex`, `RWMutex`, and their context-aware variants as
interfaces, with panic-safe wrappers (`SafeLock`, `SafeUnlock`, …)
that recover panics
via :go-pkg{mod="darvaza.org/core" func="Catch"} and aggregate
errors. Multi-mutex operations acquire locks in order and
reverse-unlock on failure.

Higher-level primitives: `SpinLock` (atomic CAS), channel-based
`Semaphore` (concurrent readers, exclusive writers), `Barrier` and
`Count` condition variables,
and :go-pkg{mod="darvaza.org/x/sync" dir="workgroup" sym="Group"} —
a context-aware goroutine manager with cancellation propagation and
panic recovery.
