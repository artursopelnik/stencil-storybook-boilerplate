# Research: How design systems become "AI / Agentic-ready"

_Snapshot: July 2026. Basis for the architecture of `@stencil-storybook-boilerplate/agentic`._

## 1. Custom Elements Manifest (CEM) — the machine-readable API standard

- A community-standard JSON schema (`custom-elements.json`) describing web components: tag names, attributes/properties, methods, events, slots, CSS parts, CSS custom properties, CSS states, demos and module/export info. Maintained at [webcomponents/custom-elements-manifest](https://github.com/webcomponents/custom-elements-manifest); schema npm package `custom-elements-manifest` (2.1.0).
- Generation: [`@custom-elements-manifest/analyzer`](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) (0.11.0) with plugins for Lit, FAST, Stencil and Catalyst.
- **Stencil has this built in since v4.42**: the first-party [`docs-custom-elements-manifest` output target](https://stenciljs.com/docs/docs-custom-elements-manifest) emits schema-conformant CEM including props/methods/events/attributes from decorators, CSS custom properties from `@prop` JSDoc annotations in CSS/SCSS, and slots/CSS parts from component JSDoc tags. The older [`docs-json`](https://stenciljs.com/docs/docs-json) target is Stencil-proprietary but richer in some respects; CEM is the _interoperable_ format.
- Who ships CEM: Shoelace/Web Awesome, Lion, FAST, Nord (`@nordhealth/components`), Carbon web components — it powers docs sites, IDE autocomplete, framework wrapper generation and AI tooling. Dave Rupert calls CEM ["the killer feature of web components"](https://daverupert.com/2025/10/custom-elements-manifest-killer-feature/).
- CEM→AI ecosystem: [WC Toolkit](https://wc-toolkit.com/) (language server with MCP), [bennypowers/cem](https://github.com/bennypowers/cem) (`cem mcp` serves manifest data over MCP: HTML validation, attribute suggestion, HTML generation), `wc-storybook-helpers` (Storybook controls from a CEM).

## 2. llms.txt and markdown-for-LLMs

- Spec ([llmstxt.org](https://llmstxt.org/)): `/llms.txt` is a small markdown index (H1 title, blockquote summary, H2 sections of links) that fits in a context window; `/llms-full.txt` inlines full docs; plus the convention of serving a clean `.md` twin of every docs page.
- Design systems doing it:
  - **Nord (Nordhealth)** — the flagship example: [llms.txt](https://nordhealth.design/ai/llms-txt) (structured overview linking raw markdown per component/guideline) and `llms-full.txt` (1M+ tokens with implementation details, examples, design tokens), plus an [AI Integration hub](https://nordhealth.design/ai/) and installable [Agent Skills](https://nordhealth.design/ai/skills/) for Claude Code, Cursor, Copilot.
  - **IBM Carbon** — llms.txt index + [Carbon MCP server](https://carbondesignsystem.com/developing/carbon-mcp/onboarding-and-setup/).
  - **Atlassian Design System** — [atlassian.design/llms.txt](https://atlassian.design/llms.txt); **Ant Design** — [llms-full.txt](https://ant.design/llms-full.txt); **CMS Design System** — [design.cms.gov](https://design.cms.gov/using-ai/llms-txt/).
  - **Porsche Design System** — no confirmed live llms.txt yet, but an `ai-context-playground` repo exists in their GitHub org (work in progress).
- Pattern: llms.txt = index; per-component `.md` files = retrieval targets; llms-full.txt = one-shot dump for large-context models.

## 3. MCP servers for design systems

- **Storybook MCP** — [`@storybook/addon-mcp`](https://storybook.js.org/addons/@storybook/addon-mcp) (0.7.0), served at `http://localhost:6006/mcp`, ships with Storybook 10.3+. Toolsets ([docs](https://storybook.js.org/docs/ai/mcp/overview)): docs (`list-all-documentation`, `get-documentation`, `get-documentation-for-story`), development (`get-changed-stories`, `preview-stories`), testing (`run-story-tests` incl. a11y). **Caveat: manifests + MCP are preview and React-only today**; web-components support is planned. Community alternative: [`storybook-mcp`](https://www.npmjs.com/package/storybook-mcp) works off a built Storybook's `index.json`.
- **shadcn MCP** ([docs](https://ui.shadcn.com/docs/mcp)) — browse/search/install registry items via natural language. Key idea: the machine-readable registry is the contract; any compatible registry is MCP-ready with zero config.
- **Figma Dev Mode MCP** ([guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)) — `get_design_context`, `get_screenshot`, `get_variable_defs` (tokens) and `get_code_connect_map`, which maps Figma nodes to real code components so agents reuse design-system components instead of regenerating markup.
- Typical converged tool surface: list components → get one component's API → get usage examples/stories → search/get design tokens → (optionally) validate/generate markup and run tests. **This is the tool set our MCP server implements.**

## 4. Storybook specifics: stories as machine-readable usage examples

- `index.json`: every built/dev Storybook serves a stories index (id, title, name, importPath, tags) — good for enumeration, not for source.
- CSF parsing: `@storybook/csf-tools` parses CSF3 files programmatically; our generator uses the TypeScript compiler API directly (already a repo dependency) for the same purpose.
- New [Storybook AI manifests](https://github.com/storybookjs/storybook/blob/next/docs/ai/manifests.mdx): `/manifests/components.json` with usage examples derived from stories — prop extraction uses react-docgen, hence the React-only limitation; for web components, CEM is the equivalent source today.
- [Best practices](https://github.com/storybookjs/storybook/blob/next/docs/ai/best-practices.mdx) for agent-legible stories: CSF3, one concept per story, good JSDoc, right-sized context.

## 5. What an agent-facing component manifest should contain

Per component: tag name + import/registration snippet; props/attributes (name, attr, type, default, required, allowed values, description); events (name, detail type, when fired); methods; slots; CSS custom properties; CSS parts/states; design tokens used; 2–5 copy-pasteable usage examples (from stories, simplest first); usage guidelines + a11y notes; related components; deprecation info. Plus system-level pages: getting started, theming/tokens, framework-wrapper usage. Nord, Carbon and Storybook's manifests all converge on roughly this shape.

## Decisions for this boilerplate

1. **Manifest layer**: `docs-json` + first-party `docs-custom-elements-manifest` output targets in `core` (CEM referenced via `customElements` in package.json).
2. **Markdown layer**: `agentic` generator merges docs.json + stories + tokens into `manifest.json`, per-component `.md`, `design-tokens.md`, `llms.txt`, `llms-full.txt`; deployed with Storybook to GitHub Pages.
3. **MCP layer**: stdio server over `manifest.json` with the converged tool set; auto-discovered by Claude Code via root `.mcp.json`.
4. **Storybook layer**: adopt `@storybook/addon-mcp` once web-components manifests leave React-only preview (track [storybookjs/addon-mcp](https://github.com/storybookjs/addon-mcp)); stories stay CSF3/manifest-friendly.

## Further sources

[CEM spec](https://github.com/webcomponents/custom-elements-manifest) · [CEM analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) · [Stencil CEM output target](https://stenciljs.com/docs/docs-custom-elements-manifest) · [Stencil docs-json](https://stenciljs.com/docs/docs-json) · [llmstxt.org](https://llmstxt.org) · [Nord AI](https://nordhealth.design/ai/) · [Carbon MCP](https://carbondesignsystem.com/developing/carbon-mcp/onboarding-and-setup/) · [Storybook MCP overview](https://storybook.js.org/docs/ai/mcp/overview) · [shadcn MCP](https://ui.shadcn.com/docs/mcp) · [Figma MCP](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server) · [wc-toolkit.com](https://wc-toolkit.com/) · [bennypowers/cem](https://github.com/bennypowers/cem) · [Codrops: Storybook MCP for design systems](https://tympanus.net/codrops/2025/12/09/supercharge-your-design-system-with-llms-and-storybook-mcp/) · [LogRocket: Storybook MCP](https://blog.logrocket.com/storybook-mcp-component-libraries/)
