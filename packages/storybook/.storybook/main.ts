import type { StorybookConfig } from "@storybook/web-components-vite";

import { join, dirname } from "path";

const { BASE_PATH } = process.env

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/stories/components/**/*.mdx",
    "../src/stories/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("storybook-dark-mode")
  ],
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {}
  },
  previewHead: (head) => `${head}
    <script type="module" src="${BASE_PATH ? BASE_PATH : '/'}www/build/stencil-storybook-boilerplate.esm.js"></script>
    <script nomodule src="${BASE_PATH ? BASE_PATH : '/'}www/build/stencil-storybook-boilerplate.js"></script>
  `,
  staticDirs: ['../public', { from: '../www', to: '/www' }],
  async viteFinal(config) {
    config.base = BASE_PATH || config.base

    const { mergeConfig } = await import('vite');
    const { liveReload } = await import('vite-plugin-live-reload');

    return mergeConfig(config, {
      plugins: [
        liveReload('../core/www/build/stencil-storybook-boilerplate.esm.js'),
      ],
      build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            manualChunks: {
              lit: ['lit'],
              react: ['react'],
              'react-dom': ['react-dom'],
              'react/jsx-runtime': ['react/jsx-runtime']
            },
          },
        },
      }
    });
  },
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  }
};

// @ts-ignore
export default config;
