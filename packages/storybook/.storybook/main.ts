import type { StorybookConfig } from "@storybook/web-components-vite"

const { BASE_PATH } = process.env

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  previewHead: (head) => `${head}
    <script type="module" src="${BASE_PATH ? BASE_PATH : "/"}www/build/stencil-storybook-boilerplate.esm.js"></script>
    <script nomodule src="${BASE_PATH ? BASE_PATH : "/"}www/build/stencil-storybook-boilerplate.js"></script>
  `,
  staticDirs: ["../public", { from: "../www", to: "/www" }],
  async viteFinal(config) {
    config.base = BASE_PATH || config.base

    const { mergeConfig } = await import("vite")
    const { liveReload } = await import("vite-plugin-live-reload")

    return mergeConfig(config, {
      plugins: [
        liveReload([
          "www/build/stencil-storybook-boilerplate.esm.js",
          "www/build/stencil-storybook-boilerplate.js",
        ]),
      ],
      build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            manualChunks: {
              lit: ["lit"],
              react: ["react"],
              "react-dom": ["react-dom"],
              "react/jsx-runtime": ["react/jsx-runtime"],
            },
          },
        },
      },
    })
  },
  typescript: {
    check: true,
  },
}

export default config
