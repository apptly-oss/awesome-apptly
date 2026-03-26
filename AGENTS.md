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

Project entries (`content/projects/*.md`) must include front
matter matching the Zod schema in `content.config.ts`.

Valid values for `category`: `darvaza`, `kagal`, `poupe`,
`infrastructure`, `networking`, `security`, `tooling`, `ui`.

Valid values for `language`: `Go`, `TypeScript`.

Both fields are arrays (one or more values):

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
