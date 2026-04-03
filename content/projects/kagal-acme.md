---
title: @kagal/acme
repo: github:kagal-dev/pki/packages/@kagal-acme
licence: MIT
npm: @kagal/acme
category:
  - kagal
  - security
  - typescript
description: Platform-neutral ACME protocol library (RFC 8555) — client and server state machines.
---

Platform-neutral ACME protocol library implementing both client and
server as resumable state machines with JSON-serialisable state and
injected dependencies — the machine owns protocol logic, the consumer
owns persistence, key material, and policy. Works on any platform
with WebCrypto.

Extensions supported from day one: ARI (RFC 9773) and Profiles
(draft-ietf-acme-profiles).
