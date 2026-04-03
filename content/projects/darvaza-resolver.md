---
title: darvaza.org/resolver
description: Pluggable DNS resolver library with forwarding, iterative, and parallel lookup strategies built on miekg/dns.
category:
  - darvaza
  - networking
  - go
repo: github:darvaza-proxy/resolver
licence: MIT
go: darvaza.org/resolver
---

Pluggable DNS resolver library built on :go-pkg{mod="github.com/miekg/dns" label="miekg/dns"}.
Defines the :go-pkg{mod="darvaza.org/resolver" sym="Resolver" short},
:go-pkg{mod="darvaza.org/resolver" sym="Lookuper" short},
and :go-pkg{mod="darvaza.org/resolver" sym="Exchanger" short}
interfaces that decouple DNS consumers from the transport and
resolution strategy.

Three resolver constructors cover the common cases:
`SystemResolver` wraps :go-pkg{mod="net" sym="Resolver"},
`NewResolver` delegates to any `Lookuper`,
and `NewRootResolver` performs iterative resolution from the
root servers.

## Lookuper implementations

| Lookuper | Description |
|----------|-------------|
| :go-pkg{mod="darvaza.org/resolver" sym="SingleLookuper" short} | Forwards queries to a single :go-pkg{mod="darvaza.org/resolver" dir="pkg/client" sym="Client" short} |
| :go-pkg{mod="darvaza.org/resolver" sym="MultiLookuper" short} | Fans out to multiple lookupers, returns the first response |
| :go-pkg{mod="darvaza.org/resolver" sym="RootLookuper" short} | Iterative resolution from root nameservers |
| :go-pkg{mod="darvaza.org/resolver" sym="SingleFlight" short} | Deduplicates identical concurrent queries |

Well-known recursive resolvers (Google, Cloudflare, Quad9) are
available as one-liner constructors.

## Client middleware

| Middleware | Description |
|------------|-------------|
| :go-pkg{mod="darvaza.org/resolver" dir="pkg/client" sym="Auto" short} | Selects protocol by server prefix (`udp://`, `tcp://`, `tls://`), retries truncated UDP as TCP |
| :go-pkg{mod="darvaza.org/resolver" dir="pkg/client" sym="SingleFlight" short} | Per-server deduplication with short-lived caching |
| :go-pkg{mod="darvaza.org/resolver" dir="pkg/client" sym="WorkerPool" short} | Concurrency limiter for exchange calls |
| :go-pkg{mod="darvaza.org/resolver" dir="pkg/client" sym="NoAAAA" short} | Strips `AAAA` records for IPv4-only environments |

## Additional packages

- The :go-pkg{dir="pkg/server" mod="darvaza.org/resolver"} package
  provides a DNS server handler on top of any `Lookuper`
  or `Exchanger`.
- The :go-pkg{dir="pkg/reflect" mod="darvaza.org/resolver"} package
  provides optional logging middleware
  using :go-pkg{mod="darvaza.org/slog"}.
- The :go-pkg{dir="pkg/errors" mod="darvaza.org/resolver"} package
  provides standard :go-pkg{mod="net" sym="DNSError"} wrappers
  with :go-pkg{mod="github.com/miekg/dns" sym="Msg"} conversion.

## See also

- Network helpers — :go-pkg{mod="darvaza.org/x/net"}
- Structured logging — :go-pkg{mod="darvaza.org/slog"}
- DNS library — :go-pkg{mod="github.com/miekg/dns" label="miekg/dns"}
