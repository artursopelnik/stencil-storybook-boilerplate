import "@stencil-storybook-boilerplate/core/dist/stencil-storybook-boilerplate/themes/light.css"
import "@stencil-storybook-boilerplate/core/dist/stencil-storybook-boilerplate/themes/dark.css"
import "./globals.css"

import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/web-components-vite"

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        Light: "ssb-theme--light",
        Dark: "ssb-theme--dark",
      },
      defaultTheme: "Light",
      parentSelector: "html",
    }),
  ],
  parameters: {
    viewMode: "docs",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: "tag",
      toc: {
        title: "On this page",
        headingSelector: "h2, h3",
      },
    },
  },
}

export default preview
