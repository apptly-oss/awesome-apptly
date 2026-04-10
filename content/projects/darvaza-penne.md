---
title: darvaza.org/penne
description: Config-driven, pipeline-oriented DNS resolver that allows complex workflows to be defined simply, with split-horizon DNS support built on the Darvaza sidecar engine and resolver interface.
category:
  - darvaza
  - networking
  - go
repo: github:darvaza-proxy/penne
licence: MIT
go: darvaza.org/penne
---

Config-driven, pipeline-oriented DNS resolver that allows complex
workflows to be defined simply. Built using the Darvaza sidecar
engine and :go-pkg{mod="darvaza.org/resolver"}.

## Architecture

Penne uses a pipeline/middleware design with three resolver modes:

- **Iterative** — performs iterative DNS resolution from root servers.
- **Forwarder** — forwards queries to upstream resolvers.
- **Chained** — chains multiple resolver strategies together.

## Key features

- **Horizons** — named CIDR sets that route, annotate, or filter DNS
  requests based on the client's IP address, enabling split-horizon DNS.
- **Pattern matching** — uses globbing (via
  :go-pkg{mod="github.com/gobwas/glob"}) instead of regex for suffix
  matching and name rewrites, with capture group replacements
  (`${n}`).
- **Capabilities** — domain-specific resolver restriction, record
  filtering (e.g., dropping `AAAA` records), and request/response
  rewriting.

## Configuration

Penne is designed to be config-driven, with YAML or JSON
configuration files defining resolver pipelines, horizons,
and transformation rules. This allows complex DNS workflows to
be declared without writing code.

## Planned features

Future versions of Penne will adopt a plugin architecture — each
capability below is planned as a standalone plugin, so you only
install the pieces you need. The planned plugins are:

- **Authoritative DNS** — host your own DNS zones with persistent
  storage, turning Penne into a full network DNS server.
- **DHCP server** — integrated DHCP lease management alongside DNS,
  keeping address assignment and name resolution under one roof.
- **IPAM server** — IP Address Management for tracking address
  usage, planning subnets, and managing allocations across the
  network.
- **Security licence (Protective DNS)** — threat protection at the
  DNS layer, blocking known malicious domains, phishing sites, and
  malware command-and-control servers.
- **Enhanced reporting** — richer analytics and reporting on DNS
  activity across the network.
- **Blocklists** — network-wide domain blocking, similar to ad-blockers
  but applied at the server level for all clients.
- **HA clustering** — high-availability mode with multiple Penne nodes
  staying in sync to provide failover if one node goes down.

## See also

- DNS resolver library — :go-pkg{mod="darvaza.org/resolver"}
- Core helpers — :go-pkg{mod="darvaza.org/core"}
- Structured logging — :go-pkg{mod="darvaza.org/slog"}
