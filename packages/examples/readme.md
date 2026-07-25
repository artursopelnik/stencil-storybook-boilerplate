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
- **Drift & self-correction**: session A can (and per its `CLAUDE.md` must) run `validate_usage` on its own output — invented attributes, missing required props, wrong tokens and hard-coded colors get caught and fixed in the loop. Session B has no feedback mechanism: whatever drift happens, stays. This is the core "harness" difference.
- **Token usage / context**: how much documentation does each approach pull into context?

## Sample run (July 2026)

One recorded run with the prompt above, adapted to a headless environment without MCP clients: arm A = static docs **plus mandatory validation loop** via the CLI (`node packages/agentic/src/cli.mjs <files>`, the MCP-free twin of `validate_usage`), arm B = static docs only, no feedback mechanism. Both agents were forbidden to read the design-system source.

| | Arm A (docs + harness) | Arm B (docs only) |
| --- | --- | --- |
| Docs read | `llms.txt` → `my-component.md` → `design-tokens.md` | identical, same order |
| Judge validation (errors/warnings) | 0 / 0 | 0 / 0 |
| Validation rounds needed | 1 (passed first try) | — (not allowed) |
| `first`/`middle`, `aria` JSON, tokens | all correct | all correct |

Takeaways: with a single well-documented component, **the static docs alone were sufficient** — both agents produced correct markup, used the `aria` JSON-string convention and real token names, and neither invented props. The harness added confirmation, not correction, in this run. It earns its keep when docs are *not* read carefully: in a manual spot check, a from-memory token guess (`--gen-color-purple-100` instead of `--global-color-purple-100`) was immediately caught with a did-you-mean fix. Expect the gap between the arms to grow with component count and API surface — rerun the experiment as the system grows.

## View the result

```bash
npm run dev:with-mcp -w packages/examples
npm run dev:without-mcp -w packages/examples
```
