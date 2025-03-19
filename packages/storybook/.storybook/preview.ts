import "@stencil-storybook-boilerplate/core/dist/stencil-storybook-boilerplate/themes/dark.css"
import "@stencil-storybook-boilerplate/core/dist/stencil-storybook-boilerplate/themes/light.css"

import "./globals.css"
import type { Preview } from "@storybook/web-components"

const preview: Preview = {
  parameters: {
    darkMode: {
      current: "light",
      stylePreview: true,
      darkClass: "ssb--theme-dark",
      lightClass: "ssb--theme-light",
    },
    viewMode: "docs",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
