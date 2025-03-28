# [Stencil Storybook Boilerplate](https://artursopelnik.github.io/stencil-storybook-boilerplate/)

[![Build & Deploy to GitHub Pages](https://github.com/artursopelnik/stencil-storybook-boilerplate/actions/workflows/workflow.yml/badge.svg)](https://github.com/artursopelnik/stencil-storybook-boilerplate/actions/workflows/workflow.yml)
[![LICENSE](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/artursopelnik/stencil-storybook-boilerplate/blob/main/LICENSE.txt)

A modern boilerplate for building fast and robust design systems for [React](https://reactjs.org/), [Remix](https://remix.run/), [Next.js](https://nextjs.org/), [Vue](https://vuejs.org/), [Angular](https://angular.io/) or Vanilla JS applications ✨ using:

- [Stencil](https://github.com/ionic-team/stencil)
- [Storybook](https://github.com/storybookjs/storybook)
- [Vite](https://github.com/vitejs/vite)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Style Dictionary](https://github.com/amzn/style-dictionary)

This monorepo is structured using [Lerna](https://lerna.js.org/). For more details, check out my [blog post](https://www.designsystemscollective.com/how-to-use-storybook-with-stencil-in-2025-and-why-lit-isnt-the-best-choice-81fb5c2d521e).

## 📖 Features

- **Optimized for Web Components**: Works seamlessly across frameworks
- **Storybook Integration**: Supports documenting and testing UI components, complete with dark mode support and Hot Module Replacement (HMR)
- **Vite-Powered**: Lightning-fast development experience
- **SSR-Ready with Next.js**: Fully supports Server-Side Rendering (SSR) with the Next.js App Router, unlike Lit
- **Fully Typed Arguments**: Leverages TypeScript for enhanced type safety
- **Design Tokens Support**: Enables consistent theming with customizable design tokens
- **Accessibility-Focused**: Pass and validate aria properties to ensure inclusivity and better usability.

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
2. Navigate to the Stencil core package and build it:
   ```bash
   cd packages/core
   npm run build
   ```
3. To generate a new component:
   ```bash
   npm run generate <sub-folder>
   ```
4. Go to the Storybook package:
   ```bash
   cd packages/storybook
   ```
   - Run **`npm run storybook.run`** to monitor only the Storybook stories.
   - Run **`npm run storybook`** to also watch changes in the web components.

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
