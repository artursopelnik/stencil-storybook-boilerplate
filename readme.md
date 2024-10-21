# [stencil-storybook-boilerplate](https://artursopelnik.github.io/stencil-storybook-boilerplate/)

[![Build & Deploy to GitHub Pages](https://github.com/artursopelnik/stencil-storybook-boilerplate/actions/workflows/workflow.yml/badge.svg)](https://github.com/artursopelnik/stencil-storybook-boilerplate/actions/workflows/workflow.yml)
[![LICENSE](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/artursopelnik/stencil-storybook-boilerplate/blob/main/LICENSE.txt)

A boilerplate template for creating fast and robust design systems for React, Remix, Next.js, Vue, Angular or Vanilla JS Application ✨ with [Stencil](https://github.com/ionic-team/stencil), [Storybook](https://github.com/storybookjs/storybook), [Vite](https://github.com/vitejs/vite) and [TypeScript](https://github.com/microsoft/TypeScript). 

Monorepo setup with *Lerna* according to the documentation at: [stenciljs.com/output-targets](https://stenciljs.com/docs/output-targets)

For Storybook, we use the most commonly used integration for web components with Lit, Vite and TypeScript, so you
already have a basic implementation of buttons, headers etc. Lit is not required and therefore basically
optional. When writing stories for web components built with Stencil, you don't have to use it, but you can, if you
want, perform more advanced operations using the HTML tag for example.
Alternatively, Storybook can also be reinstalled with `npx storybook@latest init` with another integration-template.

## 💡 Requirements

- Node.js 20
- Git

## 🚀 Getting Started

To start using this boilerplate, clone this repo to a new directory:

```bash
git clone https://github.com/artursopelnik/stencil-storybook-boilerplate.git
```

## 👩‍💻 Usage

1. Install dependencies: `npm install`
2. Navigate to the stencil core package: `cd /packages/core` and build it with: `npm run build`. To generate a new component, run: 
```bash
npm run generate <sub-folder>
```
4. Go to the Storybook package: `cd /packages/storybook`
    - Use `npm run storybook.run` to monitor only the stories for changes in Storybook.
    - Use `npm run storybook` to also watch for changes in the web component itself.
  
## 👏 Contributing
- :octocat: [Pull requests](https://github.com/artursopelnik/stencil-storybook-boilerplate/pulls) and 🌟 stars are always welcome.
- For major changes, please open an [issue](https://github.com/artursopelnik/stencil-storybook-boilerplate/issues) first to discuss what you would like to change.
- Please make sure to update tests as appropriate.

## 📩 Contact
📧 artur.sopelnik93@gmail.com

💼 Linkedin [@artursopelnik](https://www.linkedin.com/in/artur-sopelnik-b93656110/)

## License
MIT &copy; [Artur Sopelnik](https://github.com/artursopelnik/)
