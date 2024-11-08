import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'stencil-storybook-boilerplate',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
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
      copy: [{ src: '**/*.html' }, { src: '**/*.css' }]
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
    reactOutputTarget({
      outDir: '../react/lib/components/stencil-generated/'
    }),
    vueOutputTarget({
      componentCorePackage: '@stencil-storybook-boilerplate/core',
      proxiesFile: '../vue/lib/stencil-generated/components.ts',
    }),
  ],
  testing: {
    browserHeadless: "new",
  },
};
