---
title: darvaza.org/x/web
description: Helpers for HTTP handlers — content negotiation, middleware, and error management.
category:
  - darvaza
  - networking
  - go
repo: github:darvaza-proxy/x/web
licence: MIT
go: darvaza.org/x/web
---

Helpers for implementing HTTP handlers. `MiddlewareFunc` and
`MiddlewareErrorFunc` compose handler chains, while
:go-pkg{mod="darvaza.org/x/web" sym="HTTPError" short} wraps status
codes as Go errors with `handler` semantics — factory functions
cover common statuses (301, 302, 400, 404, 500, …).

The :go-pkg{mod="darvaza.org/x/web" dir="qlist"} sub-package parses
RFC 7231 quality-value lists (`Accept`, `Accept-Encoding`) and
selects the best match
via :go-pkg{mod="darvaza.org/x/web" dir="qlist" func="BestQuality" short}
and :go-pkg{mod="darvaza.org/x/web" dir="qlist" func="BestEncoding" short}.

Header utilities set `Cache-Control`, `Retry-After`,
`Last-Modified`, and evaluate `If-Modified-Since` for conditional
responses. A path resolver middleware cleans and attaches the
request path to the context.

The :go-pkg{mod="darvaza.org/x/web" dir="resource"} sub-package
defines a generic `Resource[T]` interface for RESTful endpoints.

## See also

- Network helpers — :go-pkg{mod="darvaza.org/x/net"}
- TLS certificate management — :go-pkg{mod="darvaza.org/x/tls"}
