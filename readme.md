# stencil-storybook-boilerplate

*A boilerplate template for creating fast and robust design systems for React, Remix, Next.js, Vue, Angular or Vanilla JS Application ✨ with Stencil and Storybook.*

Monorepo setup with *Lerna* according to the documentation
at: [stenciljs.com/output-targets](https://stenciljs.com/docs/output-targets)

For Storybook, we use the most commonly used integration for web components with Lit, Vite and TypeScript, so you
already have a basic implementation of buttons, headers etc. Lit is not required and therefore basically
optional. When writing stories for web components built with Stencil, you don't have to use it, but you can, if you
want, perform more advanced operations using the HTML tag for example.
Alternatively, Storybook can also be reinstalled with `npx storybook@latest init` with another integration-template.

## 💡 Requirements

- Node.js 20
- Git

## 🚀 Setup

- Choose compatible node version `nvm use`
- Install dependencies `npm install`
- Go to the Storybook package with `cd /packages/storybook` and use `npm run storybook.run` if you ONLY want to monitor the stories for changes in Storybook. If you also want to watch for changes in the web component itself, use `npm run storybook` instead.
