---
title: @kagal/ca
description: Challenge-less, EAB-driven private CA engine for Cloudflare Workers.
repo: github:kagal-dev/pki/packages/@kagal-ca
licence: MIT
npm: @kagal/ca
category:
  - kagal
  - security
  - typescript
---

Private certificate authority running as a single Durable Object per
CA with SQLite storage. Challenge-less and EAB-driven — standard ACME
clients (certbot, acme.sh) talk to it over HTTPS. All ACME protocol
logic lives in `@kagal/acme`; the CA handles HTTP parsing, SQLite
persistence, dependency wiring, and DO alarm scheduling.

Beyond the ACME surface: management RPC plane (EAB provisioning,
identity enrollment, direct issuance, revocation), CRL distribution,
and Certificate Transparency log (RFC 6962) with SCT embedding.
