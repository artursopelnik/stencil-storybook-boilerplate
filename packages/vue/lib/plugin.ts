import { Plugin } from 'vue';

// @ts-ignore because Intellij does not understand imports within Lerna monorepos
import { applyPolyfills, defineCustomElements } from '@stencil-storybook-boilerplate/core/loader';

export const ComponentLibrary: Plugin = {
    async install() {
        applyPolyfills().then(() => {
            defineCustomElements();
        });
    },
};