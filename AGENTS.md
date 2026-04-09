<!-- cSpell:ignore maxage subpackages typechecks -->
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
full icon library into the Nitro server). The `BadgeHandler` class
in `server/utils/badge.ts` handles method dispatch, input
validation, cache headers, SVG rendering, and cache management —
each endpoint provides only its identity and fetch callback.

### Endpoints

- `GET /api/badge/go/{module}` — fetches version from
  `proxy.golang.org/{module}/@latest`. Validates the path
  matches a Go module pattern (domain with dot in first segment).
- `GET /api/badge/npm/{package}` — fetches version from
  `registry.npmjs.org/{package}/latest`. Validates the name
  matches npm naming rules (`@scope/name` or `name`).
- `DELETE` on either endpoint busts the version cache
  and purges the CF edge cache (current PoP), so a freshly
  published version is picked up on the next GET.
- Other methods return `405` with an `Allow` header.

Successful responses carry split `Cache-Control` (`max-age=3600`
for browsers, `s-maxage=300` for the CF edge), a weak `ETag`
from the version string (conditional requests return `304`),
and `Last-Modified` from the upstream timestamp. Unknown packages render a
grey "unknown" badge with a 60-second TTL.

### Caching

Version lookups are cached in Cloudflare KV via Nitro's
`useStorage('versions')` (`server/utils/version-cache.ts`).
Each entry has a per-key TTL: 1 hour for successful lookups,
60 seconds for errors — failed entries auto-expire, preventing
unbounded growth from bogus package names. The KV namespace
binding (`VERSIONS_KV`) is configured in `wrangler.toml` and
mounted in `nuxt.config.ts`; local dev uses a memory driver.

Concurrent requests for the same key at the TTL boundary are
coalesced via an in-flight promise map — only one upstream
fetch runs, and only the originating caller writes to KV.

KV operations degrade gracefully: read failures fall through
to an upstream fetch, write failures are logged but the badge
is still returned.

Logging uses `consola` with tagged instances (`badge:go`,
`badge:npm`, `version-cache`).

### Components

Types used in `defineProps<T>()` must be defined or imported
in the component's `<script>` block — auto-imports are not
resolved during production builds.

- If a utility function also uses the type, keep it in the
  utility module and import it in the component.
- If only components use it, define it in the owning
  component's `<script>` block.

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
- `GoPkg` — inline link to pkg.go.dev
  (`:go-pkg{mod="darvaza.org/resolver"}`). The trailing Go icon
  is added by `modules/external-link-icons.ts` via CSS — see
  *External-link icons* below. Props:
  - `mod` (required) — Go module path.
  - `dir` — subdirectory within the module.
  - `sym` — type/constant name, links to `#Symbol`.
  - `func` — function name, links to `#Func`, adds `()` suffix.
    Takes precedence over `sym`.
  - `short` — show only the symbol/function name, omit the
    package prefix. Preserves `()` for functions.
  - `label` — override the display text entirely.
  Bare `mod` displays the full module path. With `sym` or `func`,
  the default label is `pkg.Symbol` (last path segment + name).
  Keep `:go-pkg` mid-line in prose — at line-start MDC treats
  it as a block element and breaks the paragraph.
- `ProseHeading` — shared base for prose heading overrides with
  hover-visible anchor glyph (default `§`). `prose-h2` and
  `prose-h3` delegate to it. The glyph is customisable per
  heading via MDC attributes (`## Heading {glyph="#"}`).

## External-link icons

`modules/external-link-icons.ts` is a build-time Nuxt module
that extracts brand glyphs from `@iconify-json/simple-icons`
(currently `npm`, `go`, and `github`), bundles them with a
hand-rolled lucide-style "open in new tab" SVG, and emits a
CSS file exposing them as `--icon-npm`, `--icon-go`,
`--icon-github`, and `--icon-external-link` custom properties
on `:root`. The file is appended to `nuxt.options.css` so it
ships in the regular client bundle.

The same file decorates external links in markdown content:

```css
.prose a[href^="http" i]:not(:has(img))::after { … }
```

Cascade rules swap the `mask-image` to the matching brand
glyph when the `href` is anchored at the start with
`https://www.npmjs.com/`, `https://pkg.go.dev/`,
`https://github.com/`, or `https://gist.github.com/`. Each
rule uses an anchored `[href^="https://host/" i]`
attribute selector; the trailing `i` flag is the CSS
Selectors Level 4 case-insensitive marker, so a typo'd
`Github.com` link still matches. Multi-host brands like
GitHub wrap their hosts in `:is(…)`. Anchored prefixes rule
out incidental substring hits in URL paths or query
strings. `http://` is intentionally not covered — every
supported brand serves over HTTPS only. The icon is
rendered via `mask-image` over `background-color:
currentColor`, so it inherits the link colour automatically.

Three deliberate exclusions:

- **Scope `.prose`** — the chrome (`ProjectMeta` badges, the
  GitHub repo link) lives outside the prose container, so
  the GitHub icon there is added by `<Icon>` rather than the
  CSS rule.
- **`:not(:has(img))`** — any `:badge-version-*` MDC component
  used inside markdown wraps an `<img>` shield, so the rule
  skips it and keeps the shields.io graphic clean.
- **No double-icon** — `GoPkg` no longer renders an inline
  `<Icon>`; the CSS rule provides its trailing glyph.

Adding a new brand: append a `{ name, host }` entry to
`DEFAULT_BRANDS` in `modules/external-link-icons.ts`, or
extend `externalLinkIcons.brands` in `nuxt.config.ts`. The
matching cascade rule is generated automatically by
`buildBrandRule` — no other edits needed.

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
