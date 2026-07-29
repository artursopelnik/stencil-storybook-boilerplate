# Agent guide

This repository is a design system boilerplate (Stencil web components + Storybook + DTCG design tokens, monorepo via Lerna). It is **agentic-ready** — use the structured sources below instead of guessing component APIs.

## Query the design system

Two equivalent interfaces (single source in `packages/agentic/src/lib/tools.mjs`):

- **CLI** — `node packages/agentic/src/cli.mjs <list|get|docs|examples|tokens|search|validate|guidelines|manifest>` (installed as `ssds` bin when the package is used from `node_modules`). Prefer this if `bash` is available.
- **MCP server** — `node packages/agentic/src/server.mjs` (stdio). Repo-root `.mcp.json` auto-registers it for Claude Code inside this monorepo. Tools: `list_components`, `get_component`, `get_component_docs`, `get_examples`, `get_design_tokens`, `search`, `validate_usage`, `get_usage_guidelines`, `manifest`.

Both delegate to the same functions — pick whichever your environment supports. Start with `manifest` for capability discovery, end every code-writing task with `validate` / `validate_usage`.

## Machine-readable sources

- `packages/agentic/dist/manifest.json` — full component API + usage examples + design tokens (run `npm run build` once if missing).
- `packages/agentic/dist/components/<tag>.md` — per-component markdown docs.
- `packages/agentic/dist/design-tokens.md` — flattened token table (name, CSS variable, type, resolved value)
- `packages/agentic/dist/llms.txt` / `llms-full.txt` — llms.txt-style index / full dump.
- `packages/core/dist/custom-elements.json` — Custom Elements Manifest (interop standard).

## Rules

- Look up exact prop names/types via the manifest before writing code — do not invent props.
- Respect each component's `intent`, `dos` and `donts` from the manifest.
- In React/Vue/Angular apps prefer the generated framework wrappers (`packages/react`, `packages/vue`, `packages/angular`) over raw custom elements.
- Use design tokens (CSS custom properties from `packages/design-tokens`) instead of hard-coded colors/sizes; themes are `light.css` / `dark.css`.
- Set ARIA attributes through the `aria` prop (JSON string or object) where a component exposes it.
- New components: scaffold with `node packages/agentic/src/cli.mjs new component <tag>` — creates the Stencil component (`.tsx`+`.css`+`.spec.ts`) plus CSF3 story + MDX (Intent/Guidelines) in the right locations. The AI manifest picks both up automatically after `npm run build`.

## Build & verify

```bash
npm install
npm run build          # tokens → core (incl. docs.json/CEM) → wrappers → AI manifest
cd packages/core && npm test
```
