---
title: darvaza.org/x/tls
description: Dynamic TLS certificate management — runtime store, SNI routing, chain bundling.
category:
  - darvaza
  - networking
  - security
  - go
repo: github:darvaza-proxy/x/tls
licence: MIT
go: darvaza.org/x/tls
---

TLS certificate management utilities extending Go's :go-pkg{mod="crypto/tls"}.
Defines `Store`, `StoreReader`, `StoreWriter`, and `StoreX509Writer`
interfaces that decouple certificate lookup from storage backend.

The :go-pkg{mod="darvaza.org/x/tls" sym="Bundler" short} builds
verified certificate chains from a set of roots and intermediates,
selecting the shortest (or custom-ranked) chain and returning a
ready-to-use `tls.Certificate`.
`Verify` validates a
`tls.Certificate` end-to-end — leaf parsing, validity period,
key-pair match, and optional chain verification against roots.

The :go-pkg{mod="darvaza.org/x/tls" dir="sni"} sub-package parses
raw ClientHello packets to extract the server name without a full
TLS handshake.
A :go-pkg{mod="darvaza.org/x/tls" dir="sni" sym="Dispatcher" short}
routes incoming connections by SNI to per-host handlers, with
graceful shutdown and structured logging.

Three store backends live
under :go-pkg{mod="darvaza.org/x/tls" dir="store"}:
`basic` (simple programmatic store), `buffer` (PEM file/directory
decoder that collects keys and certificates), and `config`
(path-based loading helpers for certs, keys, and CA roots).

The :go-pkg{mod="darvaza.org/x/tls" dir="x509utils"} sub-package
adds `PrivateKey` and `PublicKey` interfaces, PEM read/write,
PKCS#1/PKCS#8 key parsing, SPKI hashing (SHA-1/SHA-256), name
sanitisation, and wildcard-pattern extraction. Its `certpool`
sub-package provides a thread-safe, BLAKE3-deduplicated certificate
pool with name/pattern indexing and system root loading.

## See also

- Network helpers — :go-pkg{mod="darvaza.org/x/net"}
- HTTP handler utilities — :go-pkg{mod="darvaza.org/x/web"}
