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

Umbrella categories have an `org` field (GitHub org name):

```yaml
---
title: "Kagal"
description: "TypeScript libraries for Cloudflare edge infrastructure."
org: "kagal-dev"
---
```

Cross-cutting categories omit `org`:

```yaml
---
title: "Security"
description: "Cryptography, authentication, and PKI."
---
```

### Projects

Project entries live in `content/projects/*.md` with front
matter matching the Zod schema in `content.config.ts`.

Valid values for `language`: `Go`, `TypeScript`.
`category` accepts one or more slugs from `content/categories/`.

```yaml
---
title: "Project Name"
description: "Short description."
category:
  - networking
  - infrastructure
language:
  - Go
  - TypeScript
---
```

## Content DB in development

After adding or removing content files, run `pnpm generate`
before `pnpm dev`. The cloudflare preset serves the client-side
SQL dump from Nitro build storage, which only `generate` (or
`build`) populates. Without this step, SSR works but client-side
navigation will 404.

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
