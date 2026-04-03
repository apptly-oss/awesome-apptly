---
title: darvaza.org/slog
description: Backend-agnostic structured logging interface with adapter handlers for popular Go loggers.
category:
  - darvaza
  - go
repo: github:darvaza-proxy/slog
licence: MIT
go: darvaza.org/slog
---

A backend-agnostic interface for structured logging. Libraries import
`slog` to emit structured logs without forcing a specific backend on
their users. Features method chaining (fluent API), six log levels,
context integration, and immutable loggers safe for concurrent use.

## Adapters

Bidirectional adapters convert in both directions — use the external
logger as an `slog` backend, or create an external logger backed by
`slog`.

| Handler | Module | Description |
|---------|--------|-------------|
| logr | :badge-version-go{mod="darvaza.org/slog/handlers/logr"} | Bidirectional adapter for :go-pkg{mod="github.com/go-logr/logr" label="go-logr/logr"} |
| logrus | :badge-version-go{mod="darvaza.org/slog/handlers/logrus"} | Bidirectional adapter for :go-pkg{mod="github.com/sirupsen/logrus" label="sirupsen/Logrus"} |
| zap | :badge-version-go{mod="darvaza.org/slog/handlers/zap"} | Bidirectional adapter for :go-pkg{mod="go.uber.org/zap" label="Uber's zap"} |
| zerolog | :badge-version-go{mod="darvaza.org/slog/handlers/zerolog"} | Wraps :go-pkg{mod="github.com/rs/zerolog" label="rs/zerolog"} as an slog backend |

## Utility handlers

| Handler | Module | Description |
|---------|--------|-------------|
| cblog | :badge-version-go{mod="darvaza.org/slog/handlers/cblog"} | Channel-based handler for custom log processing |
| filter | :badge-version-go{mod="darvaza.org/slog/handlers/filter"} | Middleware to filter and transform log entries |
| discard | :badge-version-go{mod="darvaza.org/slog/handlers/discard"} | No-op handler for optional logging |
| mock | :badge-version-go{mod="darvaza.org/slog" dir="handlers/mock"} | Records log entries for testing assertions |
