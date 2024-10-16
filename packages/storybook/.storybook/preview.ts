import './globals.css'
import type { Preview } from "@storybook/web-components";
// @ts-ignore because Intellij does not understand imports within Lerna monorepos
import { defineCustomElements } from '@stencil-storybook-boilerplate/core/loader';

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
