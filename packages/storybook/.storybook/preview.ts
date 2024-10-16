import './globals.css'
import type { Preview } from "@storybook/web-components";
// @ts-ignore because Intellij does not understand imports within Lerna monorepos
import { defineCustomElements } from '@stencil-storybook-boilerplate/core/loader';

// Ignore the following import
// @url https://youtrack.jetbrains.com/issue/WEB-45881/Lerna-monorepo-TypeScript-module-is-auto-imported-with-relative-path-instead-of-module-id
// @ts-ignore
defineCustomElements()

const preview: Preview = {
  parameters: {
    viewMode: 'docs',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
