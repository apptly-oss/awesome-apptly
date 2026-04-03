---
title: darvaza.org/x/config
description: Helpers for handling config structs — decoding, defaults, and validation.
category:
  - darvaza
  - go
repo: github:darvaza-proxy/x/config
licence: MIT
go: darvaza.org/x/config
---

Format-agnostic configuration loader. A generic `Loader[T]`
tries candidate filenames in order, decodes via a user-supplied
`Decoder` (TOML, YAML, JSON — any format works), applies struct-tag
defaults, expands shell-style `${VAR}` variables, and validates
the result with :go-pkg{mod="github.com/go-playground/validator/v10" label="go-playground/validator"}.

Subpackage :go-pkg{mod="darvaza.org/x/config" dir="expand" label="config/expand"}
provides :go-pkg{mod="mvdan.cc/sh/v3" label="mvdan.cc/sh"}-powered
variable substitution from any source.
Subpackage :go-pkg{mod="darvaza.org/x/config" dir="appdir" label="config/appdir"}
handles XDG/FHS-aware directory discovery (`UserConfigDir`,
`SysConfigDir`, `AllConfigDir`).
