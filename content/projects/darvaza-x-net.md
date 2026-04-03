---
title: darvaza.org/x/net
description: Generic network helpers — port binding with retry, reconnecting TCP clients.
category:
  - darvaza
  - networking
  - go
repo: github:darvaza-proxy/x/net
licence: MIT
go: darvaza.org/x/net
---

Network helpers extending Go's standard :go-pkg{mod="net"} package.
Top-level utilities validate and split host/port pairs, and define
a :go-pkg{mod="darvaza.org/x/net" sym="Dialer" short} interface
compatible with `*net.Dialer`.

The :go-pkg{mod="darvaza.org/x/net" dir="bind"} sub-package
provides advanced port binding — multi-interface and multi-address
listening, automatic port retry with configurable attempts,
`SO_REUSEADDR`/`SO_REUSEPORT` control, and a context-aware
`ListenConfig` that creates TCP listeners and UDP connections
in bulk.

The :go-pkg{mod="darvaza.org/x/net" dir="reconnect"} sub-package
implements a generic reconnecting client for TCP and Unix domain
sockets. Lifecycle callbacks (`OnConnect`, `OnSession`,
`OnDisconnect`, `OnError`) drive application logic, while
configurable backoff and context-based cancellation manage retries.
A generic `StreamSession[Input, Output]` adds message-oriented
I/O with pluggable codecs and stampede-safe send/receive channels.

## See also

- TLS certificate management — :go-pkg{mod="darvaza.org/x/tls"}
- HTTP handler utilities — :go-pkg{mod="darvaza.org/x/web"}
- DNS resolver library — :go-pkg{mod="darvaza.org/resolver"}
