---
title: darvaza.org/x/fs
description: Helpers for working with fs.FS — globbing, extended interfaces, and file locking.
category:
  - darvaza
  - go
repo: github:darvaza-proxy/x/fs
licence: MIT
go: darvaza.org/x/fs
---

Shadow of Go's :go-pkg{mod="io/fs"} package that re-exports
standard types and adds write-side interfaces mirroring
:go-pkg{mod="os"} — `ChmodFS`, `ChtimesFS`, `MkdirFS`,
`MkdirAllFS`, `MkdirTempFS`, `ReadlinkFS`, `RemoveFS`,
`RemoveAllFS`, `RenameFS`, `SymlinkFS`, and `WriteFileFS`.

File globbing compiles patterns
via :go-pkg{mod="github.com/gobwas/glob" label="gobwas/glob"} with
full `**` support for recursive matching. `Glob` walks
an :go-pkg{mod="io/fs" sym="FS"} and returns all matches;
`GlobCompile` and `Match` separate compilation from traversal
for reuse. `Clean` and `Split` extend the standard path
utilities with validity reporting.

The :go-pkg{mod="darvaza.org/x/fs" dir="fssyscall"} sub-package
provides cross-platform advisory file locking —
`LockEx`, `UnlockEx`, and non-blocking `TryLockEx` — backed
by `flock(2)` on Linux and `LockFileEx` on Windows. Convenience
wrappers (`FLockEx`, `FUnlockEx`, `FTryLockEx`) accept
an `*os.File` directly.
The :go-pkg{mod="darvaza.org/x/fs" dir="flock"} sub-package wraps
these into a single `LockEx(filename)` call.
