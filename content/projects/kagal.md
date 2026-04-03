---
title: Kagal
description: Agent fleet management — mTLS auth, protobuf protocol, Durable Objects.
repo: github:kagal-dev/kagal
licence: MIT
category:
  - kagal
  - networking
  - security
  - typescript
  - go
---

Named after the Sumerian *Ká.Gal* (𒆍𒃲, "Great Gate"), Kagal is a
control plane on Cloudflare's edge where agents authenticate via mTLS,
receive commands over persistent WebSockets, and are supervised through
Durable Objects.

Packages: `@kagal/proto` (protobuf wire types), `@kagal/worker`
(Durable Object library), `@kagal/server` (fleet management frontend),
`@kagal/agent` (CLI and library).
