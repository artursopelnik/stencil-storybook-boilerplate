---
name: ssds
description: Use when building, styling, theming or refactoring UI in a consumer app that depends on the Stencil Storybook Boilerplate design system (`@stencil-storybook-boilerplate/*`). Delegates API lookup and validation to the `design-system` MCP server; enforces conventions the MCP alone cannot (query-order, aria prop, framework wrappers, SSR).
---

# Stencil Storybook Boilerplate — Design System Skill

Thin instruction layer on top of the design system's `ssds` CLI and `design-system` MCP server. Both expose the **same** operations (they share `src/lib/tools.mjs`); pick whichever your environment offers. The tool layer holds the truth (component API, tokens, examples, validator); this skill tells the agent **when** to call it and enforces the few conventions the manifest cannot express.

## When to use

Any UI task touching `@stencil-storybook-boilerplate/*` or a `<my-…>` custom element. Skip for business logic / backend.

## Transports (pick one — same operations)

| You have…                    | Use               | Example                             |
| ---------------------------- | ----------------- | ----------------------------------- |
| shell (`bash` tool available) | `ssds` CLI        | `ssds list`, `ssds get my-component` |
| MCP client (Claude/Cursor)   | `design-system` MCP tools | `list_components`, `get_component` |

CLI is preferred where available (one round-trip, jq-pipeable, no protocol overhead). Fall back to MCP when there is no shell.

## Required workflow

1. **Manifest** — call `ssds manifest` (or MCP `manifest`) once at session start to discover available capabilities and design system size. No hard-coded tool names.
2. **Discover** — `ssds list` (or MCP `list_components`).
3. **Read** — for each component you will use, `ssds get <tag>` / `ssds docs <tag>` (or MCP `get_component` / `get_component_docs`).
4. **Tokens** — for any color / size / spacing / radius, `ssds tokens [--filter <q>]` (or MCP `get_design_tokens`). Never hard-code hex, px, rem.
5. **Write** — copy the closest `examples` snippet as starting point (`ssds examples <tag> --framework react`).
6. **Validate before returning code** — `echo "<markup>" | ssds validate -` or `ssds validate file.html --css file.css` (or MCP `validate_usage`). Fix every error, address every warning.

If neither the CLI nor MCP is reachable, fall back in this order (no validator available in either case):

1. **Local `node_modules`** — read `node_modules/@stencil-storybook-boilerplate/agentic/dist/manifest.json` and per-component files under `dist/components/*.md`. This is the preferred fallback because the manifest version is coupled to the installed `@stencil-storybook-boilerplate/core` version.
2. **Hosted** — `https://artursopelnik.github.io/stencil-storybook-boilerplate/llms.txt` (always latest `main`; may drift from the installed core version).

Stop after step 5 in either fallback.

## Conventions (not derivable from manifest)

- **Framework wrappers, not raw custom elements** in React/Vue/Angular apps:
  - React → `@stencil-storybook-boilerplate/react`
  - Vue → `@stencil-storybook-boilerplate/vue`
  - Angular → `@stencil-storybook-boilerplate/angular`
- **ARIA via the `aria` prop** (JSON string or object) on components that expose it. Never spread individual `aria-*`.
- **SSR (Next.js App Router)**: use `@stencil-storybook-boilerplate/react/hydrate`. No blanket `"use client"`.
- **Theming**: import `@stencil-storybook-boilerplate/design-tokens/themes/light.css` (or `dark.css`) once at the app root.
- **Don't invent props/events/slots/CSS custom properties.** If the validator flags "unknown attribute", the attribute does not exist — do not "fix" it by adding it to the component.

## Install (consumer project)

Prerequisite: `@stencil-storybook-boilerplate/agentic` is installed as a dev dependency in the consumer app:

```bash
npm install -D @stencil-storybook-boilerplate/agentic
```

The package ships the MCP server, the skill file and the pre-generated manifest — all versioned together with the design system.

### Zero-config: `ssds init` (recommended)

Sets up `.mcp.json` and symlinks the skill in one shot. Optional flags wire tool-specific paths:

```bash
npx ssds init --claude              # + .claude/skills/ssds symlink
npx ssds init --cursor              # + .cursor/rules/ssds.mdc symlink
npx ssds init --codex               # + AGENTS.md line
npx ssds init --copilot             # + .github/copilot-instructions.md line
```

Idempotent: re-running skips existing files, merges `.mcp.json` non-destructively (keeps other `mcpServers` entries). Detects local monorepo vs. `node_modules` install automatically. Override with `--mode local|npm`.

If you prefer manual setup — the steps `ssds init` performs are below.

### 1. Register the MCP server (or use the CLI directly)

The package ships two bins: `ssds` (CLI) and `design-system-mcp` (MCP server).

**CLI** — available immediately after `npm install`, no config file needed:

```bash
npx ssds manifest   # or: npx ssds list, ssds get my-component, …
```

**MCP** — add `.mcp.json` at the consumer repo root (Cursor uses `.cursor/mcp.json`, same schema):

```json
{
  "mcpServers": {
    "design-system": {
      "command": "npx",
      "args": ["-y", "-p", "@stencil-storybook-boilerplate/agentic", "design-system-mcp"]
    }
  }
}
```

Pin the version (`@1.4.0` etc.) in production so the API surface the agent sees is frozen to the design system version you ship against.

### 2. Symlink the skill from `node_modules`

Canonical file: `.agents/skills/ssds/SKILL.md`. Symlink it directly out of `node_modules` so `npm update` updates the skill along with the design system — no manual re-curl:

```bash
mkdir -p .agents/skills/ssds
ln -sf ../../../node_modules/@stencil-storybook-boilerplate/agentic/skill/SKILL.md .agents/skills/ssds/SKILL.md
```

Then wire up the tools you use:

- **Claude Code** — `mkdir -p .claude/skills && ln -sf ../../.agents/skills/ssds .claude/skills/ssds`
- **Cursor** — `mkdir -p .cursor/rules && ln -sf ../../.agents/skills/ssds/SKILL.md .cursor/rules/ssds.mdc`
- **Codex / AGENTS.md** — add: `Design system: see .agents/skills/ssds/SKILL.md`
- **Copilot** — same one-liner in `.github/copilot-instructions.md`

### Alternative: vendor a copy

If symlinks don't fit your workflow (Windows, monorepo hoisting, committed skills), copy the file instead — but you must re-run this whenever you `npm update` the design system:

```bash
cp node_modules/@stencil-storybook-boilerplate/agentic/skill/SKILL.md .agents/skills/ssds/SKILL.md
```

### Local development (no npm publish)

If the design system is not published to npm yet — e.g. you are iterating on the boilerplate itself — skip `npm install` and point at a local checkout on disk. Run `npm install && npm run build` once inside the boilerplate so `packages/agentic/dist/manifest.json` exists, then:

```bash
# Skill: symlink straight from the checkout
mkdir -p .agents/skills/ssds
ln -sf /absolute/path/to/stencil-storybook-boilerplate/packages/agentic/skill/SKILL.md \
       .agents/skills/ssds/SKILL.md

# MCP: point at the checkout's server.mjs
cat > .mcp.json <<'JSON'
{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": ["/absolute/path/to/stencil-storybook-boilerplate/packages/agentic/src/server.mjs"]
    }
  }
}
JSON
```

Any change you make to the boilerplate is picked up on the next agent call — no re-copy, no re-install. Switch to the `npm install` form above once the package is published.

## Verify

Ask: *"Add a `<my-component>` with first name Ada and an accessible button label."* Expect the agent to call `ssds get my-component` (or MCP `get_component`), use the `aria` prop with JSON, and run `ssds validate -` (or MCP `validate_usage`) before returning.
