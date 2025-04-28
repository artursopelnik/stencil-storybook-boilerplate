import "@stencil-storybook-boilerplate/core/dist/stencil-storybook-boilerplate/themes/light.css"
import "@stencil-storybook-boilerplate/core/dist/stencil-storybook-boilerplate/themes/dark.css"
import "./globals.css"

import type { Preview } from "@storybook/web-components"

const preview: Preview = {
  parameters: {
    darkMode: {
      classTarget: "html",
      stylePreview: true,
      darkClass: "ssb-theme--dark",
      lightClass: "ssb-theme--light",
    },
    viewMode: "docs",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        title: (async () => {
          const headingSelector = "h2, h3"
          const showTitle = document.querySelector(headingSelector) !== null
          return showTitle ? "On this page" : ""
        })(),
        headingSelector: "h2, h3",
      },
    },
  },
}

export default preview
