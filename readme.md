# [Stencil Storybook Boilerplate](https://artursopelnik.github.io/stencil-storybook-boilerplate/)

[![Build & Deploy to GitHub Pages](https://github.com/artursopelnik/stencil-storybook-boilerplate/actions/workflows/workflow.yml/badge.svg)](https://github.com/artursopelnik/stencil-storybook-boilerplate/actions/workflows/workflow.yml)
[![LICENSE](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/artursopelnik/stencil-storybook-boilerplate/blob/main/LICENSE.txt)

A modern boilerplate for building fast and robust design systems for [React](https://reactjs.org/), [Remix](https://remix.run/), [Next.js](https://nextjs.org/), [Vue](https://vuejs.org/), [Angular](https://angular.io/) or Vanilla JS applications ✨ using:

- [Stencil v4](https://github.com/ionic-team/stencil)
- [Storybook v10](https://github.com/storybookjs/storybook)
- [Style Dictionary v5](https://github.com/amzn/style-dictionary)
- [Vite v8](https://github.com/vitejs/vite)
- [TypeScript v5](https://github.com/microsoft/TypeScript)

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
- **AI / Agentic Ready**: Ships a machine-readable component manifest, per-component markdown, [llms.txt](https://llmstxt.org), a [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest) and an **MCP server**, so AI coding agents (Claude Code, Cursor, Copilot) can consume the design system without hallucinating APIs. See below 🤖.

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

The design system is consumable by AI coding agents. `npm run build` generates (from Stencil docs, Storybook stories and design tokens — nothing is documented twice):

- `packages/agentic/dist/manifest.json` — structured data per component: props, events, methods, slots, CSS custom properties **plus usage examples extracted from Storybook stories** (HTML, React, Vue, Angular) and all design tokens with resolved values
- `packages/agentic/dist/components/<tag>.md` — agent-friendly markdown per component
- `packages/agentic/dist/llms.txt` / `llms-full.txt` — [llms.txt](https://llmstxt.org) index & full dump (deployed to [GitHub Pages](https://artursopelnik.github.io/stencil-storybook-boilerplate/llms.txt) alongside Storybook)
- `packages/core/dist/custom-elements.json` — interoperable [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest) (Stencil `docs-custom-elements-manifest` output target)

**MCP server**: `.mcp.json` is checked in, so Claude Code discovers the design-system MCP server automatically. Tools: `list_components`, `get_component`, `get_component_docs`, `get_examples`, `get_design_tokens`, `search`, `get_usage_guidelines`.

👉 Setup for Cursor/VS Code/Claude Desktop, architecture and a comparison with how Nord, Carbon, Atlassian and shadcn approach AI readiness: [`packages/agentic`](packages/agentic/readme.md) · [research notes](packages/agentic/docs/research.md) · [AGENTS.md](AGENTS.md)

**Try it yourself**: [`packages/examples`](packages/examples/readme.md) contains two identical consumer apps for an A/B experiment — let an AI agent build the same UI once **with** the MCP server and once **without** (llms.txt/markdown only) and compare correctness, process and hallucinations.

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
