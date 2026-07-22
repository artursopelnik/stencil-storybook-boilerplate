# Agent guide

This repository is a design system boilerplate (Stencil web components + Storybook + DTCG design tokens, monorepo via Lerna). It is **agentic-ready** — use the structured sources below instead of guessing component APIs.

## Machine-readable sources

- `packages/agentic/dist/manifest.json` — full component API + usage examples + design tokens (run `npm run build` once if missing).
- `packages/agentic/dist/components/<tag>.md` — per-component markdown docs.
- `packages/agentic/dist/llms.txt` / `llms-full.txt` — llms.txt-style index / full dump.
- `packages/core/dist/custom-elements.json` — Custom Elements Manifest (interop standard).
- **MCP server**: auto-configured via `.mcp.json` (tools: `list_components`, `get_component`, `get_examples`, `get_design_tokens`, `search`, `validate_usage`, `get_usage_guidelines`). See `packages/agentic/readme.md`.

## Rules

- Look up exact prop names/types via the manifest or MCP before writing code — do not invent props.
- Validate generated UI markup with the `validate_usage` MCP tool and fix every reported error. Respect each component's `intent`, `dos` and `donts` from the manifest.
- In React/Vue/Angular apps prefer the generated framework wrappers (`packages/react`, `packages/vue`, `packages/angular`) over raw custom elements.
- Use design tokens (CSS custom properties from `packages/design-tokens`) instead of hard-coded colors/sizes; themes are `light.css` / `dark.css`.
- Set ARIA attributes through the `aria` prop (JSON string or object) where a component exposes it.
- New components: add Stencil component in `packages/core/src/components/` **and** a CSF3 story (+ optional MDX intro) in `packages/storybook/src/stories/components/` — the AI manifest picks both up automatically.

## Build & verify

```bash
npm install
npm run build          # tokens → core (incl. docs.json/CEM) → wrappers → AI manifest
cd packages/core && npm test
```
