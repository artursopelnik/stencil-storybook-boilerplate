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

Additionally, `packages/core` now emits **`dist/custom-elements.json`** via Stencil's first-party `docs-custom-elements-manifest` output target — the interoperable [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest) standard that powers IDE autocomplete and CEM-based AI tooling (referenced via the `customElements` field in `core/package.json`).

## Using this design system in a consumer project

One canonical file, per-tool adapters. Drop the skill into a tool-neutral location, then symlink or reference it from each AI tool's own path.

**Step 1 — canonical location `.agents/skills/ssds/`**:

```bash
mkdir -p .agents/skills/ssds
curl -o .agents/skills/ssds/SKILL.md \
  https://raw.githubusercontent.com/artursopelnik/stencil-storybook-boilerplate/main/packages/agentic/skill/SKILL.md
```

**Step 2 — wire up your tools** (only the ones you use):

- **Claude Code**: `ln -sf ../../.agents/skills/ssds .claude/skills/ssds`
- **Cursor**: `ln -sf ../../.agents/skills/ssds/SKILL.md .cursor/rules/ssds.mdc`
- **Codex / AGENTS.md-aware**: reference `.agents/skills/ssds/SKILL.md` from `AGENTS.md`.
- **GitHub Copilot**: reference it from `.github/copilot-instructions.md`.

Note: `.agents/skills/` is not auto-discovered by any tool today — it acts as a single source of truth, and each tool-specific path symlinks or points back to it.

Full per-tool snippets, offline vendoring, and verification: [`skill/SKILL.md`](skill/SKILL.md).

## How this compares to other design systems

Based on how other systems approach AI readiness:

- **Nord (Nordhealth)**: `llms.txt` + `llms-full.txt` + per-page markdown + agent skills → we follow the same llms.txt convention.
- **IBM Carbon, Atlassian, Ant Design**: publish llms.txt → same pattern.
- **shadcn/ui**: machine-readable registry → our `manifest.json` plays that role.
- **Storybook 10.4+ `@storybook/addon-mcp`**: serves docs/story tools from a running Storybook — currently a **React-only preview**. Once web-components support lands, it can complement parts of this package; our stories are already CSF3 and manifest-friendly. Track [storybookjs/addon-mcp](https://github.com/storybookjs/addon-mcp).
- **Custom Elements Manifest**: the interop layer used by Shoelace/Web Awesome, Nord, FAST — we ship it from Stencil directly.

## Extending

- New components appear automatically: Stencil docs + a `*.stories.ts` file are enough; MDX intro text is picked up as the description.
- The story extractor understands the CSF3 + lit patterns used in this boilerplate (`meta`/`args`, `render` with `html\`...\``, `${prop}`, `${prop || nothing}`, `.prop=`, `?attr=`, `@event=` bindings). Exotic render logic falls back gracefully (the story is skipped).
- Slots, CSS custom properties and CSS parts are picked up from Stencil JSDoc tags (`@slot`, `@part`) and CSS `@prop` annotations once you add them.
