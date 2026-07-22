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

## 📦 Distribution package for external partners

Create a ZIP containing the built Design-System (web components) and Design-Tokens plus a partner-facing README:

```bash
npm run package
```

This builds the tokens and the core package, then writes `artifacts/design-system-paket-v<version>.zip` with the following layout:

```
├── README.md
├── Design-System/
│   ├── dist/
│   └── loader/
└── Design-Tokens/
    └── dist/
```

Use `npm run package:zip` to re-zip without rebuilding. The README shipped inside the ZIP lives in `scripts/package/README.md`.

### Upload to Confluence (on-prem)

Confluence does not offer FTP access — attachments are uploaded through its REST API instead:

```bash
npm run package:upload
```

The script uploads the newest ZIP from `artifacts/` (or a path passed as argument) as an attachment to a Confluence page. If the attachment already exists, a new version is created. Configure it via environment variables or a `.env` file (see `.env.example`):

| Variable                                  | Description                                          |
| ----------------------------------------- | ---------------------------------------------------- |
| `CONFLUENCE_BASE_URL`                     | e.g. `https://confluence.example.com`                |
| `CONFLUENCE_PAGE_ID`                      | ID of the target page                                |
| `CONFLUENCE_PAT`                          | Personal Access Token (recommended, Confluence 7.9+) |
| `CONFLUENCE_USER` / `CONFLUENCE_PASSWORD` | Basic-auth alternative to a PAT                      |

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
