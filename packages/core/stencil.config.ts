import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import postcss from 'rollup-plugin-postcss';

export const config: Config = {
  namespace: 'stencil-storybook-boilerplate',
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: 'themes/vite-generated/light.css', dest: 'themes/light.css' },
        { src: 'themes/vite-generated/dark.css', dest: 'themes/dark.css' },
      ],
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
      footer: '', // hide "Built with StencilJS"c
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: '**/*.html' },
        {
          src: 'themes/vite-generated/light.css',
          dest: 'themes/light.css',
        },
        { src: 'themes/vite-generated/dark.css', dest: 'themes/dark.css' },
      ],
    },
    {
      type: 'www',
      dir: '../storybook/www',
      serviceWorker: null, // disable service workers
    },
    angularOutputTarget({
      componentCorePackage: '@stencil-storybook-boilerplate/core',
      outputType: 'component',
      directivesProxyFile: '../angular/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular/projects/component-library/src/lib/stencil-generated/index.ts',
    }),
    vueOutputTarget({
      componentCorePackage: '@stencil-storybook-boilerplate/core',
      proxiesFile: '../vue/lib/stencil-generated/components.ts',
    }),
    reactOutputTarget({
      outDir: '../react/lib/components/stencil-generated/',
      hydrateModule: '@stencil-storybook-boilerplate/core/hydrate',
      esModules: true,
    }),
    {
      type: 'dist-hydrate-script',
      dir: './hydrate',
    },
  ],
  plugins: [
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
  //eslint-disable-next-line
  watchIgnoredRegex: [/src\/themes\/[^\/]+\.css$/],
};
