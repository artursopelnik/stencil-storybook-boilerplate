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

- **`manifest.json`** — one structured JSON document: every component with props, events, methods, slots, CSS custom properties, usage examples (HTML, React, Vue, Angular) and Storybook deep links, plus all design tokens. This is the single source the MCP server reads.
- **`components/<tag>.md`** — per-component markdown, optimized for LLM retrieval.
- **`design-tokens.md`** — flattened token table (name, CSS variable, resolved value).
- **`llms.txt`** / **`llms-full.txt`** — index & full-dump following [llmstxt.org](https://llmstxt.org), the convention used by design systems like [Nord](https://nordhealth.design/ai/), [Atlassian](https://atlassian.design/llms.txt) and [Ant Design](https://ant.design/llms-full.txt). Both are deployed to GitHub Pages together with Storybook.

Additionally, `packages/core` now emits **`dist/custom-elements.json`** via Stencil's first-party `docs-custom-elements-manifest` output target — the interoperable [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest) standard that powers IDE autocomplete and CEM-based AI tooling (referenced via the `customElements` field in `core/package.json`).

## MCP server

A [Model Context Protocol](https://modelcontextprotocol.io) server (stdio) that lets agents query the design system instead of guessing APIs.

### Tools

| Tool                   | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `list_components`      | Discover all components (tag + short description + Storybook link)      |
| `get_component`        | Full structured API of one component                                    |
| `get_component_docs`   | Markdown docs incl. examples for HTML, React, Vue, Angular              |
| `get_examples`         | Usage examples from Storybook stories, optionally filtered by framework |
| `get_design_tokens`    | Design tokens with resolved values, optionally filtered                 |
| `search`               | Free-text search across components, props, events and tokens            |
| `get_usage_guidelines` | Install & usage rules (packages, SSR, theming, `aria` prop convention)  |

### Setup

Prerequisite — generate the manifest once:

```bash
npm install
npm run build
```

**Claude Code** — nothing to do: the repo ships a root [`.mcp.json`](../../.mcp.json), Claude Code picks the server up automatically. Manual alternative:

```bash
claude mcp add design-system -- node packages/agentic/src/server.mjs
```

**Cursor** (`.cursor/mcp.json`) / **VS Code** (`.vscode/mcp.json`) / **Claude Desktop** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": [
        "/absolute/path/to/stencil-storybook-boilerplate/packages/agentic/src/server.mjs"
      ]
    }
  }
}
```

### Try it

Ask your agent things like:

> Which components does the design system provide?
> Build a page section using `my-component` in React — use the correct props.
> Which purple color tokens exist and what are their hex values?

The agent will call `list_components` / `get_component` / `get_design_tokens` and generate code against the real API instead of hallucinating props.

## How this compares to other design systems

Based on [research](docs/research.md) into how other systems approach AI readiness:

- **Nord (Nordhealth)**: `llms.txt` + `llms-full.txt` + per-page markdown + agent skills → we follow the same llms.txt convention.
- **IBM Carbon, Atlassian, Ant Design**: publish llms.txt / MCP servers → same pattern.
- **shadcn/ui**: MCP over a machine-readable registry → our `manifest.json` plays that role.
- **Storybook 10.4+ `@storybook/addon-mcp`**: serves docs/story tools from a running Storybook — currently a **React-only preview**. Once web-components support lands, it can complement or replace parts of this package; our stories are already CSF3 and manifest-friendly. Track [storybookjs/addon-mcp](https://github.com/storybookjs/addon-mcp).
- **Custom Elements Manifest**: the interop layer used by Shoelace/Web Awesome, Nord, FAST — we ship it from Stencil directly.

## Extending

- New components appear automatically: Stencil docs + a `*.stories.ts` file are enough; MDX intro text is picked up as the description.
- The story extractor understands the CSF3 + lit patterns used in this boilerplate (`meta`/`args`, `render` with `html\`...\``, `${prop}`, `${prop || nothing}`, `.prop=`, `?attr=`, `@event=` bindings). Exotic render logic falls back gracefully (the story is skipped).
- Slots, CSS custom properties and CSS parts are picked up from Stencil JSDoc tags (`@slot`, `@part`) and CSS `@prop` annotations once you add them.
