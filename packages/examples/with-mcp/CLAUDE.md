# Consumer project — WITH MCP

This folder simulates an application that consumes the design system as an external dependency. A `design-system` MCP server is configured via `.mcp.json` in this folder.

## Rules for AI agents

- Before writing any UI code, look up components via the `design-system` MCP tools: `list_components`, `get_component`, `get_examples`, `get_design_tokens`, `get_usage_guidelines`. Do not invent props or events.
- After writing or changing UI code, ALWAYS run `validate_usage` on the markup (and CSS) and fix every reported error before you are done. If the MCP tools are unavailable in your environment, use the validation CLI instead: `node ../../agentic/src/cli.mjs index.html src/main.js` (docs are then in `../../agentic/dist/`, start with `llms.txt`).
- Treat the design system as an external npm package: do NOT read or modify its source code (`packages/core`, `packages/storybook`, `packages/agentic`).
- Only edit files inside this folder (`index.html`, `src/`).
- Use design tokens (CSS custom properties) instead of hard-coded colors and sizes.
