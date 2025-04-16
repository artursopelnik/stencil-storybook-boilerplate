'use client';

/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

/* eslint-disable */

import { MyComponent as MyComponentElement, defineCustomElement as defineMyComponent } from "@stencil-storybook-boilerplate/core/dist/components/my-component.js";
import type { EventName, StencilReactComponent } from '@stencil/react-output-target/runtime';
import { createComponent } from '@stencil/react-output-target/runtime';
import React from 'react';

export type MyComponentEvents = { onButtonClick: EventName<CustomEvent<any>> };

export const MyComponent: StencilReactComponent<MyComponentElement, MyComponentEvents> = /*@__PURE__*/ createComponent<MyComponentElement, MyComponentEvents>({
    tagName: 'my-component',
    elementClass: MyComponentElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onButtonClick: 'buttonClick' } as MyComponentEvents,
    defineCustomElement: defineMyComponent
});
