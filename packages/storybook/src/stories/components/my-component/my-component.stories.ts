import {html, nothing} from "lit"
import type { Meta, StoryObj } from "@storybook/web-components"

// @ts-ignore because Intellij does not understand imports within Lerna monorepos
import type { MyComponent } from "@stencil-storybook-boilerplate/core/src/components/my-component/my-component"

const meta = {
  title: "Components/MyComponent",
  args: {
    first: "John",
    middle: "",
    last: "Doe",
    aria: {
      "aria-label": "Some label"
    }
  },
  argTypes: {
    first: {
      type: {
        required: true,
      },
    },
  },
} satisfies Meta<MyComponent>

export default meta

export const Default = {
  render: ({ first, middle, last, aria, onClick }) =>
    html`<my-component
      .aria="${aria  || nothing}"
      first=${first}
      middle=${middle || nothing}
      last=${last}
      @click=${onClick}
    ></my-component>`,
} satisfies StoryObj<MyComponent>
