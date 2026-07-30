import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbButtonGroup } from "@stencil-storybook-boilerplate/core/src/components/ssb-button-group/ssb-button-group"

type Args = SsbButtonGroup

const meta = {
  title: "Components/ButtonGroup",
  parameters: {
    layout: "centered",
  },
  args: {
    aria: { "aria-label": "Text alignment" },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ aria }: Args) =>
    html`<ssb-button-group aria=${JSON.stringify(aria)}>
      <ssb-button variant="outline">Left</ssb-button>
      <ssb-button variant="outline">Center</ssb-button>
      <ssb-button variant="outline">Right</ssb-button>
    </ssb-button-group>`,
} satisfies StoryObj<Args>

export const TwoButtons = {
  render: () =>
    html`<ssb-button-group
      aria=${JSON.stringify({ "aria-label": "Pagination" })}
    >
      <ssb-button variant="outline">Previous</ssb-button>
      <ssb-button variant="outline">Next</ssb-button>
    </ssb-button-group>`,
} satisfies StoryObj<Args>

export const WithSecondary = {
  render: () =>
    html`<ssb-button-group
      aria=${JSON.stringify({ "aria-label": "Editor actions" })}
    >
      <ssb-button variant="secondary">Bold</ssb-button>
      <ssb-button variant="secondary">Italic</ssb-button>
      <ssb-button variant="secondary">Underline</ssb-button>
    </ssb-button-group>`,
} satisfies StoryObj<Args>
