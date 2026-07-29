# [Stencil Storybook Boilerplate](https://artursopelnik.github.io/stencil-storybook-boilerplate/)

[![Build & Deploy to GitHub Pages](https://github.com/artursopelnik/stencil-storybook-boilerplate/actions/workflows/workflow.yml/badge.svg)](https://github.com/artursopelnik/stencil-storybook-boilerplate/actions/workflows/workflow.yml)
[![LICENSE](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/artursopelnik/stencil-storybook-boilerplate/blob/main/LICENSE.txt)

A modern boilerplate for building fast and robust design systems for [React](https://reactjs.org/), [Remix](https://remix.run/), [Next.js](https://nextjs.org/), [Vue](https://vuejs.org/), [Angular](https://angular.io/) or Vanilla JS applications ✨ using:

- [Stencil v4](https://github.com/ionic-team/stencil)
- [Storybook v10](https://github.com/storybookjs/storybook)
- [Style Dictionary v5](https://github.com/amzn/style-dictionary)
- [Vite v8](https://github.com/vitejs/vite)
- [TypeScript v6](https://github.com/microsoft/TypeScript)

This monorepo is structured using [Lerna](https://lerna.js.org/). For more details, check out my [blog post](https://www.designsystemscollective.com/how-to-use-storybook-with-stencil-in-2025-and-why-lit-isnt-the-best-choice-81fb5c2d521e).

## 📢 Announcement (as of April 2025)

**It's happening! 🎉**

Storybook has officially confirmed a **native Stencil integration**, with contributions already coming from the Stencil core team.

👉 https://github.com/storybookjs/storybook/pull/33737

👉 https://www.npmjs.com/package/@stencil/storybook-plugin

We're closely following the progress and will switch to the native setup as soon as it's stable.

## 📖 Features

Optimized for Web Components: Seamlessly integrates across frameworks.

- **Optimized for Web Components**: Works seamlessly across frameworks
- **Storybook Integration**: Documents and tests UI components with dark mode support and Hot Module Replacement (HMR).
- **Vite-Powered**: Provides a lightning-fast development experience.
- **SSR-Ready with Next.js**: Full support for Server-Side Rendering (SSR) with Next.js App Router , unlike Lit.
- **Fully Typed Arguments**: Enhanced type safety with TypeScript.
- **Design Tokens Support**: Enables consistent theming with customizable tokens ([DTCG](https://styledictionary.com/info/dtcg/)).
- **Accessibility-Focused**: Define and validate ARIA attributes through a single `aria` prop, as [Porsche and the Stencil Core do](https://github.com/stenciljs/core/issues/5033#issuecomment-2828695662), accepting both JSON strings and objects to improve inclusivity and usability.
- **AI / Agentic Ready**: Ships a machine-readable component manifest, per-component markdown, [llms.txt](https://llmstxt.org) and a [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest), so AI coding agents (Claude Code, Cursor, Copilot) can consume the design system without hallucinating APIs. See below 🤖.

## 🤔 Why Stencil over Lit?

Stencil is the **only** Web Components framework that fully supports **SSR with Next.js App Router**. While Lit is better integrated with Storybook and Vite, it falls short due to:

❌ Limited SSR support (only for the outdated Next.js Page Router)  
❌ Buggy and experimental React integration

✅ **Why Stencil Wins:**

- Full SSR support with Next.js App Router
- JSX support
- Optimized for modern Micro Frontends
- Cleaner Design System integration

---

## 💡 Requirements

- [Node.js](https://nodejs.org/) 20+
- [Git](https://git-scm.com/)

## 🚀 Getting Started

Clone this repository:

```bash
git clone https://github.com/artursopelnik/stencil-storybook-boilerplate.git
cd stencil-storybook-boilerplate
```

## 👩‍💻 Usage

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build packages
   ```bash
   npm run build
   ```
3. Go to the Storybook package:

   ```bash
   cd packages/storybook
   ```

   - Run **`npm run storybook.run`** to monitor only the Storybook stories.
   - Run **`npm run storybook`** to also watch changes in the web components.

4. Optional to generate a new component:
   ```bash
   cd packages/core
   npm run generate <sub-folder>
   ```

## 🤖 AI / Agentic Design System Readiness

### Why CLI + MCP + Skill (the Astryx way)

The less an agent has to guess, the lower the hallucination rate. Meta's [Astryx](https://astryx.atmeta.com) is the most consequent step in a five-stage maturity ladder — this boilerplate follows the same architecture:

| Stage | Approach                                                          | Hallucination rate |
| ----- | ----------------------------------------------------------------- | ------------------ |
| 1     | Link the design system in `CLAUDE.md` / `DESIGN.md`               | ~100 %             |
| 2     | Structured per-component markdown (props, variants, do's & don'ts) | ~50 %              |
| 3     | Skill delivers structured data on-demand, keeps context lean       | ~30 %              |
| 4     | MCP server exposes capabilities + skill orchestrates + `validate` harness checks output against the manifest | ~10 % |
| 5     | **Astryx**: CLI as single source of truth, thin MCP passes CLI through, skill adds instructions — the agent no longer generates freely, it retrieves | ~0 % |

This boilerplate composes exactly that: a `ssds` CLI backs everything, a thin `design-system-mcp` server forwards the same operations, a `SKILL.md` wires workflow, and a `validate` op catches invented tags/props/tokens before the code reaches the user. Nothing new individually — the composition is what drops hallucinations to near-zero.

Background & reasoning: [LinkedIn post — "Agentic-Ready Design Systeme: Meta setzt mit Astryx neue Maßstäbe"](https://www.linkedin.com/in/artur-sopelnik-b93656110/).

### What gets generated

The design system is consumable by AI coding agents. `npm run build` generates (from Stencil docs, Storybook stories and design tokens — nothing is documented twice):

- `packages/agentic/dist/manifest.json` — structured data per component: props, events, methods, slots, CSS custom properties **plus usage examples extracted from Storybook stories** (HTML, React, Vue, Angular) and all design tokens with resolved values
- `packages/agentic/dist/components/<tag>.md` — agent-friendly markdown per component
- `packages/agentic/dist/design-tokens.md` — flattened token table (name, CSS variable, type, resolved value)
- `packages/agentic/dist/llms.txt` / `llms-full.txt` — [llms.txt](https://llmstxt.org) index & full dump (deployed to [GitHub Pages](https://artursopelnik.github.io/stencil-storybook-boilerplate/llms.txt) alongside Storybook)
- `packages/core/dist/custom-elements.json` — interoperable [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest) (Stencil `docs-custom-elements-manifest` output target)

👉 Architecture and a comparison with how Nord, Carbon, Atlassian and shadcn approach AI readiness: [`packages/agentic`](packages/agentic/readme.md) · [AGENTS.md](AGENTS.md)

### Using the design system in a consumer project

A consumer app that installs `@stencil-storybook-boilerplate/*` gets AI-agent readiness in one step:

```bash
npm install -D @stencil-storybook-boilerplate/agentic
npx ssds init --claude --cursor    # writes .mcp.json + skill symlinks (opt-in flags)
```

`ssds init` is idempotent (merges into existing `.mcp.json`, skips existing symlinks), detects monorepo vs. `node_modules` install, and supports `--claude`, `--cursor`, `--codex`, `--copilot` for tool-specific wiring. The manual steps below explain what it does.

**0. Install the agentic package** — ships the MCP server binary, the skill file and the pre-generated manifest, all versioned together with the design system:

```bash
npm install -D @stencil-storybook-boilerplate/agentic
```

**1. Use the CLI or register the MCP server** — the package ships two bins that share the same operations (Astryx-style, single source in `src/lib/tools.mjs`):

- **`ssds` CLI** — usable straight away: `npx ssds list`, `ssds get my-component`, `echo '<my-component />' | ssds validate -`. Sub-commands: `list`, `get`, `docs`, `examples`, `tokens`, `search`, `validate`, `guidelines`, `manifest`, `mcp`.
- **`design-system-mcp` server** — for MCP-native clients. Add `.mcp.json` at the consumer repo root (Cursor uses `.cursor/mcp.json`, same schema):

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

Pin the version (`@1.4.0` etc.) in production so agents see a frozen API surface per release. When developing inside this monorepo, swap for `"command": "node"` / `"args": ["packages/agentic/src/server.mjs"]` — see the repo-root [`.mcp.json`](.mcp.json).

**2. Install the skill** — canonical location `.agents/skills/ssds/`. Symlink out of `node_modules` so `npm update` propagates skill updates automatically:

```bash
mkdir -p .agents/skills/ssds
ln -sf ../../../node_modules/@stencil-storybook-boilerplate/agentic/skill/SKILL.md .agents/skills/ssds/SKILL.md
```

Then wire up your tools:

- **Claude Code**: `mkdir -p .claude/skills && ln -sf ../../.agents/skills/ssds .claude/skills/ssds`
- **Cursor**: `mkdir -p .cursor/rules && ln -sf ../../.agents/skills/ssds/SKILL.md .cursor/rules/ssds.mdc`
- **Codex / AGENTS.md-aware**: add `Design system: see .agents/skills/ssds/SKILL.md` to `AGENTS.md`.
- **GitHub Copilot**: add the same line to `.github/copilot-instructions.md`.

Full snippets and non-symlink fallback: [`packages/agentic/skill/SKILL.md`](packages/agentic/skill/SKILL.md).

**Local development (design system not on npm yet)** — skip step 0 and point at a local checkout of this repo instead. After `npm install && npm run build` inside the checkout:

```bash
# Skill
mkdir -p .agents/skills/ssds
ln -sf /absolute/path/to/stencil-storybook-boilerplate/packages/agentic/skill/SKILL.md \
       .agents/skills/ssds/SKILL.md

# MCP (.mcp.json)
{ "mcpServers": { "design-system": {
  "command": "node",
  "args": ["/absolute/path/to/stencil-storybook-boilerplate/packages/agentic/src/server.mjs"]
} } }
```

Changes to the boilerplate are picked up on next agent call — no re-install. Switch to the `npm install` form once published.

### Operations (CLI + MCP)

Both the `ssds` CLI and the `design-system-mcp` MCP server expose the same operations (single source: `src/lib/tools.mjs`). The MCP server is at [`packages/agentic/src/server.mjs`](packages/agentic/src/server.mjs); the CLI at [`packages/agentic/src/cli.mjs`](packages/agentic/src/cli.mjs). Repo-root [`.mcp.json`](.mcp.json) is auto-discovered by Claude Code inside this monorepo.

| CLI                                      | MCP tool               | Purpose                                                                             |
| ---------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| `ssds manifest`                          | `manifest`             | Self-describing capability manifest for zero-hardcoding agent discovery             |
| `ssds list`                              | `list_components`      | Discover all components (tag + short description + Storybook link)                  |
| `ssds get <tag>`                         | `get_component`        | Full structured API of one component                                                |
| `ssds docs <tag>`                        | `get_component_docs`   | Markdown docs incl. examples for HTML, React, Vue, Angular                          |
| `ssds examples <tag> [--framework <fw>]` | `get_examples`         | Usage examples from Storybook stories, optionally filtered by framework             |
| `ssds tokens [--filter <q>]`             | `get_design_tokens`    | Design tokens with resolved values, optionally filtered                             |
| `ssds search <query>`                    | `search`               | Free-text search across components, props, events and tokens                        |
| `ssds validate <file\|-> [--css <file>]` | `validate_usage`       | **The harness**: checks generated markup/CSS against the manifest — unknown tags, invented/misspelled attributes (with did-you-mean), missing required props, invalid `aria` JSON, framework binding syntax in plain HTML, unknown design tokens and hard-coded colors. Returns per-component don't-rules as reminders. |
| `ssds guidelines`                        | `get_usage_guidelines` | Install & usage rules (packages, SSR, theming, `aria` prop convention)              |
| `ssds mcp`                               | —                      | Start the MCP server on stdio (same as `design-system-mcp` bin)                     |
| `ssds init [--claude\|--cursor\|--codex\|--copilot]` | —          | Provision consumer app: writes `.mcp.json` + symlinks `SKILL.md`. Idempotent, merges non-destructively |
| `ssds new component <tag>`               | —                      | Boilerplate-only: scaffold Stencil component (`.tsx`+`.css`+`.spec.ts`) + Storybook story + MDX with Intent/Guidelines skeleton |

Prerequisite: `npm run build` at the repo root so `packages/agentic/dist/manifest.json` exists. Wire other MCP clients by pointing them at `node packages/agentic/src/server.mjs`; use the CLI via `node packages/agentic/src/cli.mjs <command>`.

## 🙌 Contributing

We welcome contributions! 🚀

- [Pull requests](https://github.com/artursopelnik/stencil-storybook-boilerplate/pulls) and ⭐ stars are always appreciated.
- For major changes, please open an [issue](https://github.com/artursopelnik/stencil-storybook-boilerplate/issues) first.
- Ensure tests are updated accordingly.

## 📩 Contact

📧 Email: [artur.sopelnik93@gmail.com](mailto:artur.sopelnik93@gmail.com)  
💼 LinkedIn: [@artursopelnik](https://www.linkedin.com/in/artur-sopelnik-b93656110/)

## 📜 License

MIT &copy; [Artur Sopelnik](https://github.com/artursopelnik/)
