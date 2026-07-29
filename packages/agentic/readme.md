# @stencil-storybook-boilerplate/agentic

**AI / Agentic Design System Readiness** for this boilerplate: makes the design system consumable by AI coding agents (Claude Code, Cursor, Copilot & friends).

It combines three existing sources of truth into agent-friendly artifacts — no docs are written twice:

| Source                                      | What it contributes                                           |
| ------------------------------------------- | ------------------------------------------------------------- |
| Stencil `docs-json` (`core/dist/docs.json`) | Component API: props, attributes, events, methods, slots, CSS |
| Storybook CSF stories + MDX pages           | Copy-paste-ready usage examples & human-written descriptions  |
| Design tokens (DTCG `tokens.json`)          | Theming data with resolved values and CSS variable names      |

## Generated artifacts (`dist/`)

Run `npm run build` at the repo root (or `node scripts/generate.mjs` here, after building `core`):

- **`manifest.json`** — one structured JSON document: every component with props, events, methods, slots, CSS custom properties, usage examples (HTML, React, Vue, Angular) and Storybook deep links, plus all design tokens. Also carries structured `intent`, `dos` and `donts` fields per component, parsed from the `## Intent` and `## Guidelines` (`**Do**`/`**Don't**` bullets) sections of the Storybook MDX page.
- **`components/<tag>.md`** — per-component markdown, optimized for LLM retrieval.
- **`design-tokens.md`** — flattened token table (name, CSS variable, resolved value).
- **`llms.txt`** / **`llms-full.txt`** — index & full-dump following [llmstxt.org](https://llmstxt.org), the convention used by design systems like [Nord](https://nordhealth.design/ai/), [Atlassian](https://atlassian.design/llms.txt) and [Ant Design](https://ant.design/llms-full.txt). Both are deployed to GitHub Pages together with Storybook.

Additionally, `packages/core` emits **`dist/custom-elements.json`** via Stencil's first-party `docs-custom-elements-manifest` output target — the interoperable [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest) standard that powers IDE autocomplete and CEM-based AI tooling. It is advertised through the `customElements` field of `packages/core/package.json`.

## Using this design system in a consumer project

Prerequisite: the design system packages (`@stencil-storybook-boilerplate/core` plus the wrapper you need — `/react`, `/vue` or `/angular` — and `/design-tokens` for theming) are installed in your consumer app.

Two layers, both needed for agents to consume the design system reliably:

1. **Tool layer** — the same pure functions exposed two ways:
   - **`ssds` CLI** (`npx ssds list`, `ssds get my-component`, `ssds validate -`) — one round-trip, jq-pipeable, works anywhere `bash` runs.
   - **`design-system` MCP server** (`list_components`, `get_component`, `validate_usage`, …) — for MCP-native agents.

   Both share `src/lib/tools.mjs` so the API surface stays in lock-step. Astryx-style: single interface, two consumers.

2. **Skill** — tells the agent *when* to call the tools and enforces conventions the manifest cannot express (aria prop, framework wrappers, SSR).

### Install

```bash
npm install -D @stencil-storybook-boilerplate/agentic
npx ssds init --claude --cursor        # writes .mcp.json + skill symlinks (opt-in flags per tool)
```

Both the MCP server binary and the skill file ship inside this package — their version is coupled to the installed design system version.

`ssds init` is idempotent (skips existing files, merges `.mcp.json` non-destructively). Skip it if you prefer manual setup — the equivalent steps are documented below.

### Step 1 — CLI and/or MCP server

The package ships two bins: **`ssds`** (CLI) and **`design-system-mcp`** (MCP server). Both wrap the same operations from `src/lib/tools.mjs` — pick whichever your environment supports.

**CLI (no config needed)** — usable straight after `npm install`:

```bash
npx ssds manifest                          # capability manifest + design system summary
npx ssds list                              # all components
npx ssds get my-component                  # full API of one component
npx ssds examples my-component --framework react
npx ssds tokens --filter color
echo '<my-component first="Ada" />' | npx ssds validate -
```

Sub-commands: `list`, `get`, `docs`, `examples`, `tokens`, `search`, `validate`, `guidelines`, `manifest`, `mcp`, `init`, `new component <tag>` (boilerplate-only: scaffolds Stencil component + story + MDX).

**MCP server (`.mcp.json`)** — for MCP-native clients (Claude Code, Cursor):

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

Pin the version (`@1.4.0` etc.) in production so agents see a frozen API surface per release.

Tools exposed: `list_components`, `get_component`, `get_component_docs`, `get_examples`, `get_design_tokens`, `search`, `validate_usage`, `get_usage_guidelines`, `manifest`.

Client-specific config paths (if `.mcp.json` is not auto-picked-up):

- **Claude Code / Claude Desktop** — `.mcp.json` at repo root (auto).
- **Cursor** — `.cursor/mcp.json` (same schema).
- **Copilot CLI / Codex** — see the tool's own MCP docs; same `command` + `args`.

**Local checkout** (development inside the boilerplate monorepo): swap `"command": "npx"` / `"args": [...]` for `"command": "node"` / `"args": ["packages/agentic/src/server.mjs"]` after running `npm install && npm run build` at the root. The CLI runs directly via `node packages/agentic/src/cli.mjs <command>`.

### Step 2 — Skill (tells the agent to actually use the MCP)

Canonical location `.agents/skills/ssds/` (project convention — no tool auto-discovers this path yet, it is the single source of truth that tool-specific paths symlink back to). Symlink the file straight out of `node_modules` so `npm update` propagates skill updates:

```bash
mkdir -p .agents/skills/ssds
ln -sf ../../../node_modules/@stencil-storybook-boilerplate/agentic/skill/SKILL.md .agents/skills/ssds/SKILL.md
```

Wire the tools you use:

- **Claude Code**: `mkdir -p .claude/skills && ln -sf ../../.agents/skills/ssds .claude/skills/ssds`
- **Cursor**: `mkdir -p .cursor/rules && ln -sf ../../.agents/skills/ssds/SKILL.md .cursor/rules/ssds.mdc`
- **Codex / AGENTS.md-aware**: add a line to `AGENTS.md` — `Design system: see .agents/skills/ssds/SKILL.md`
- **GitHub Copilot**: add the same line to `.github/copilot-instructions.md`.

If symlinks are impractical (Windows, hoisting, committed-skills policy), `cp` the file instead — but re-copy on every `npm update`.

### Local development (design system not on npm yet)

Skip `npm install` entirely and point the consumer at a local checkout of the boilerplate. Run `npm install && npm run build` once inside the checkout so `packages/agentic/dist/manifest.json` exists, then in the consumer app:

```bash
# Skill: symlink from checkout
mkdir -p .agents/skills/ssds
ln -sf /absolute/path/to/stencil-storybook-boilerplate/packages/agentic/skill/SKILL.md \
       .agents/skills/ssds/SKILL.md

# MCP: server from checkout
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

Boilerplate changes propagate on next agent call — no re-install. Migrate to the `npm install` form above once the package is published.

### Verify

The user never asks for validation — the skill makes it automatic. Prompt the agent with a normal request:

> *"Build a login form with two buttons labeled Sign in and Cancel."*

Expected (all silent, no user involvement):

1. Agent calls `ssds list` / `ssds get my-component` (or MCP equivalents) to discover what exists.
2. Writes markup using real props from the manifest.
3. Runs `ssds validate -` (or MCP `validate_usage`) on its own output before returning.
4. If the validator flags anything (unknown attribute, missing required prop, hard-coded color, framework binding in HTML), the agent fixes it and re-validates.

You only see the final, validated code. The harness is invisible to the consumer — that is the whole point: no extra prompt engineering, no "please validate", no "use design tokens" reminders.

Full per-tool snippets and offline vendoring: [`skill/SKILL.md`](skill/SKILL.md).

## How this compares to other design systems

Based on how other systems approach AI readiness:

- **Nord (Nordhealth)**: `llms.txt` + `llms-full.txt` + per-page markdown + agent skills → we follow the same llms.txt convention.
- **IBM Carbon, Atlassian, Ant Design**: publish llms.txt → same pattern.
- **shadcn/ui**: machine-readable registry → our `manifest.json` plays that role.
- **Storybook 10.4+ `@storybook/addon-mcp`**: serves docs/story tools from a running Storybook — currently a **React-only preview**. Once web-components support lands, it can complement parts of this package; our stories are already CSF3 and manifest-friendly. Track [storybookjs/addon-mcp](https://github.com/storybookjs/addon-mcp).
- **Custom Elements Manifest**: the interop layer used by Shoelace/Web Awesome, Nord, FAST — we ship it from Stencil directly.
- **[Astryx](https://astryx.atmeta.com/) (Meta)**: CLI as single source of truth, thin MCP wrapping the CLI, skill orchestrating the workflow, scaffolding + validation harness. This package follows the same architecture — `src/lib/tools.mjs` is the SSoT, `src/server.mjs` is a thin MCP wrapper, `src/cli.mjs` exposes the same operations as `ssds …`, `ssds new component` scaffolds new Stencil components deterministically, and `ssds init` provisions the consumer app.

## Extending

- Scaffold a new component with `ssds new component <tag>` — creates `packages/core/src/components/<tag>/{<tag>.tsx,<tag>.css,<tag>.spec.ts}` plus `packages/storybook/src/stories/components/<tag>/{<tag>.stories.ts,<tag>.mdx}` with Intent/Guidelines placeholders. Then run `npm run build` to regenerate the manifest.
- New components appear automatically in the manifest: Stencil docs + a `*.stories.ts` file are enough; MDX intro text is picked up as the description.
- The story extractor understands the CSF3 + lit patterns used in this boilerplate (`meta`/`args`, `render` with `html\`...\``, `${prop}`, `${prop || nothing}`, `.prop=`, `?attr=`, `@event=` bindings). Exotic render logic falls back gracefully (the story is skipped).
- Slots, CSS custom properties and CSS parts are picked up from Stencil JSDoc tags (`@slot`, `@part`) and CSS `@prop` annotations once you add them.
