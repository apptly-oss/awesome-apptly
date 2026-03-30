<!-- cSpell:words apptly darvaza kagal poupe -->
# Agent instructions

Read [README.md](README.md) for the project overview, stack,
content model, branching model, and commands.

## Conventions

- British English in comments, commits, and documentation.
- Validate with `pnpm precommit` before committing (generates
  types, auto-fixes lint, and typechecks).
- Also run `make tidy` when editing non-JS files — it fixes
  trailing whitespace and spell-checks markdown.

## Content schema

### Categories

Category definitions live in `content/categories/*.md`. The
filename is the slug. The Zod enum in `content.config.ts` is
derived from these filenames — adding a file extends the enum.

The `kind` field controls sorting and grouping:

- `umbrella` — top-level project families (Kagal, Darvaza, Poupe).
- `language` — programming languages (Go, TypeScript).
- omitted — cross-cutting topics (Security, Networking, Tooling).

```yaml
---
title: Kagal
description: TypeScript libraries for Cloudflare edge infrastructure.
kind: umbrella
---
```

### Projects

Project entries live in `content/projects/*.md` with front
matter matching the Zod schema in `content.config.ts`.

`category` accepts one or more slugs from `content/categories/`,
including language categories (`go`, `typescript`).

Optional metadata fields for badges and links:

- `repo` — source link as `github:{owner/repo[/dir]}`.
- `licence` — SPDX identifier (e.g. `MIT`, `Apache-2.0`).
- `npm` — npm package name for a self-hosted version badge.
- `go` — Go module path for a self-hosted version badge.

```yaml
---
title: Project Name
description: Short description.
category:
  - networking
  - infrastructure
  - go
  - typescript
repo: github:kagal-dev/example
licence: MIT
npm: "@kagal/example"
go: github.com/kagal-dev/example
---
```

## Badge API

Self-hosted SVG version badges rendered by `badge-maker` with
pre-computed logo data URIs (extracted from `simple-icons` at
development time, inlined as base64 constants to avoid bundling the
full icon library into the Nitro server). The shared rendering logic
lives in `server/utils/badge.ts` (Nitro auto-imports it).

### Endpoints

- `/api/badge/go/{module}` — fetches version from
  `proxy.golang.org/{module}/@latest`. Validates the path
  matches a Go module pattern (domain with dot in first segment).
- `/api/badge/npm/{package}` — fetches version from
  `registry.npmjs.org/{package}/latest`. Validates the name
  matches npm naming rules (`@scope/name` or `name`).

Both endpoints return `image/svg+xml` with cache headers (1 hour
for successful responses, 60 seconds for errors). Unknown packages
render a grey "unknown" badge instead of erroring.

### Components

- `BadgeVersion` — generic badge `<img>` wrapper with loading
  skeleton, error fallback (shows alt text), and SSR hydration
  handling (`onMounted` checks `complete` + `naturalWidth`).
- `BadgeVersionGo` — MDC wrapper (`:badge-version-go{mod="..."}`).
  Optional `dir` prop for subpackages sharing a parent `go.mod` —
  badge fetches the parent module version, link points to the
  subpackage on pkg.go.dev.
- `BadgeVersionNpm` — MDC wrapper (`:badge-version-npm{pkg="..."}`).
- Icons use `@nuxt/icon` with `<Icon name="simple-icons:github" />`
  instead of hand-rolled SVG components.

## Content DB in development

`pnpm dev` runs `nuxt cleanup` before starting the dev server,
removing stale client-side SQL dumps that would otherwise cause
SPA 404s. The dev server regenerates the content database on
startup, so no separate `pnpm generate` step is needed.

## Dev server management

Start the dev server as a background task (`pnpm dev --host`
with `run_in_background`). Stop it with `TaskStop` — this sends
SIGTERM to the entire process group, cleanly shutting down
pnpm, nuxt, and all child workers without orphans. Port 3000
is reusable immediately after stopping.

## Branch workflow

- Work on `main` for code changes.
- `stage` is managed by Nuxt Studio for content edits — do not
  push directly to `stage`.
- When invoked on a `stage` → `main` PR, review content changes
  only (front matter validity, spelling, formatting).

## Files to never commit

- `NEXT.md` — private operational notes, intentionally untracked.
- `.env.local` — secrets. Only `.env.template` is committed.
- `.mcp.json` — local MCP server config.
- `.claude/` — local agent state.

## GitHub Actions

- `build.yml` — CI: runs `pnpm check` + `pnpm build` on push
  and PRs.
- `claude.yml` — Claude Code agent, triggered by `@claude`
  mentions. Currently has read-only permissions.
