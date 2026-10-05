import "@stencil-storybook-boilerplate/core/dist/stencil-storybook-boilerplate/themes/light.css"
import "@stencil-storybook-boilerplate/core/dist/stencil-storybook-boilerplate/themes/dark.css"
import "./globals.css"

import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/web-components-vite"

// The source snippet is serialized from the DOM, which escapes quotes inside attribute values
// (e.g. JSON props: aria="{&quot;aria-label&quot;:...}"). Switch those attributes to single quotes instead.
const unescapeAttributeQuotes = (code: string) =>
  code.replace(
    /(\s[^\s"'=<>/]+)="([^"]*&quot;[^"]*)"/g,
    (_, name: string, value: string) => `${name}='${value.replace(/&quot;/g, '"').replace(/'/g, "&#39;")}'`,
  )

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
      source: {
        transform: unescapeAttributeQuotes,
      },
      toc: {
        title: "On this page",
        headingSelector: "h2, h3",
      },
    },
  },
}

export default preview
