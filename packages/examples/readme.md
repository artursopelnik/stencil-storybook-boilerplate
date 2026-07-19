# @stencil-storybook-boilerplate/examples

Two identical consumer apps for an **A/B experiment**: how well does an AI coding agent build UIs with the design system **with** vs. **without** the MCP server?

| Folder         | Docs access for the agent                                                                 |
| -------------- | ----------------------------------------------------------------------------------------- |
| `with-mcp/`    | `design-system` MCP server (configured via `.mcp.json` in the folder)                     |
| `without-mcp/` | Static `llms.txt` + markdown files only (the ["Nord way"](https://nordhealth.design/ai/)) |

Both folders contain the same minimal Vite app (loads the web components + light theme) and a `CLAUDE.md` with the same rules — the only difference is _how_ the agent can access the design system documentation. Both forbid reading the design system source, so the agent must rely on docs.

## Setup

```bash
npm install
npm run build   # builds core + generates the AI manifest (packages/agentic/dist)
```

## Run the experiment

Start a **fresh agent session inside each folder** (starting at the repo root would give both the root `.mcp.json`, spoiling the comparison):

```bash
cd packages/examples/with-mcp && claude      # session A
cd packages/examples/without-mcp && claude   # session B
```

Give both the **same prompt**, e.g.:

> Build a team greeting section: render my-component for Ada Lovelace, Grace Hopper and Alan Turing (one of them with a middle name). Give each internal button an accessible label. Style the section using the design system's purple color tokens and size tokens — no hard-coded values.

## What to compare

- **Correctness**: are `first`/`middle`/`last`, the `aria` prop (JSON string!) and token names used exactly right, or does the agent invent props/tokens?
- **Process**: session A should call `list_components` → `get_component` → `get_design_tokens`; session B should read `../../agentic/dist/llms.txt` and follow the links. Does B actually read the docs, or does it guess?
- **Guidelines adherence**: both should respect the component guidelines (e.g. not abusing `count` as app state) — A gets them via `get_component`, B via the component markdown.
- **Token usage / context**: how much documentation does each approach pull into context?

## View the result

```bash
npm run dev:with-mcp -w packages/examples
npm run dev:without-mcp -w packages/examples
```
