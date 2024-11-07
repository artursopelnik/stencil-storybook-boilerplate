import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because Intellij does not understand imports within Lerna monorepos
import type { MyComponent } from "@stencil-storybook-boilerplate/core/src/components/my-component/my-component";

const meta = {
  title: 'Components/MyComponent',
  args: {
    first: 'John',
    middle: '',
    last: 'Doe'
  },
  argTypes: {
    first: {
      type: {
        required: true,
      }
    }
  }
} satisfies Meta<MyComponent>

export default meta

export const Default = {
  render: ({ first, middle, last, onClick }) =>
      html`<my-component first=${first} middle=${middle} last=${last} @click=${onClick}></my-component>`
} satisfies StoryObj<MyComponent>
