import type { Meta, StoryObj } from "@storybook/web-components";
import { argsToTemplate } from "./utils";
// @ts-ignore because Intellij does not understand imports within Lerna monorepos
import type { MyComponent } from "@stencil-storybook-boilerplate/core/src/components/my-component/my-component";

const meta = {
  title: 'Components/MyComponent',
  args: {
    first: 'John',
    middle: '',
    last: 'Doe',
  },
} satisfies Meta<MyComponent>

export default meta

export const Default = {
  render: (args) => `<my-component ${argsToTemplate(args)}></my-component>`
} satisfies StoryObj<MyComponent>
