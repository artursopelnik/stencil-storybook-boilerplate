# Consumer project — WITHOUT MCP

This folder simulates an application that consumes the design system as an external dependency. No MCP server is configured here — the design system docs are available as static llms.txt / markdown files instead (the "Nord way").

## Rules for AI agents

- Before writing any UI code, read the design system documentation. Do not invent props or events:
  - Index: `../../agentic/dist/llms.txt` (hosted: https://artursopelnik.github.io/stencil-storybook-boilerplate/llms.txt)
  - Per component: `../../agentic/dist/components/<tag>.md`
  - Design tokens: `../../agentic/dist/design-tokens.md`
  - Everything in one file: `../../agentic/dist/llms-full.txt`

  Read the index first, then the markdown of every component you use. If these files are missing, run `npm run build` once at the repo root.

- Treat the design system as an external npm package: do NOT read or modify its source code (`packages/core`, `packages/storybook`, `packages/agentic`).
- Only edit files inside this folder (`index.html`, `src/`).
- Use design tokens (CSS custom properties) instead of hard-coded colors and sizes.
