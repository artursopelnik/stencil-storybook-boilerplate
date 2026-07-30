import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbItem } from "@stencil-storybook-boilerplate/core/src/components/ssb-item/ssb-item"

type Args = SsbItem & { itemTitle: string; description: string }

const meta = {
  title: "Components/Item",
  parameters: {
    layout: "centered",
  },
  args: {
    itemTitle: "Design review",
    description: "Review the latest component designs with the team.",
    variant: "default",
    interactive: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ itemTitle, description, variant, interactive }: Args) =>
    html`<div style="width: 380px;">
      <ssb-item variant=${variant} ?interactive=${interactive}>
        <span slot="media">&#9733;</span>
        <span slot="item-title">${itemTitle}</span>
        ${description}
        <ssb-button slot="actions" variant="outline" size="sm">Open</ssb-button>
      </ssb-item>
    </div>`,
} satisfies StoryObj<Args>

export const Variants = {
  render: () =>
    html`<div
      style="width: 380px; display: flex; flex-direction: column; gap: 0.5rem;"
    >
      <ssb-item variant="default">
        <span slot="item-title">Default</span>
        A plain item without a border.
      </ssb-item>
      <ssb-item variant="outline">
        <span slot="item-title">Outline</span>
        An item with a subtle 1px border.
      </ssb-item>
      <ssb-item variant="muted">
        <span slot="item-title">Muted</span>
        An item on a muted background.
      </ssb-item>
    </div>`,
} satisfies StoryObj<Args>

export const Interactive = {
  render: () =>
    html`<div style="width: 380px;">
      <ssb-item variant="outline" ?interactive=${true}>
        <span slot="media">&#9993;</span>
        <span slot="item-title">Inbox</span>
        3 unread messages waiting for you.
      </ssb-item>
    </div>`,
} satisfies StoryObj<Args>

export const AsLink = {
  render: () =>
    html`<div style="width: 380px;">
      <ssb-item variant="outline" href="https://example.com">
        <span slot="item-title">Documentation</span>
        Opens the component documentation.
        <span slot="actions">&#8594;</span>
      </ssb-item>
    </div>`,
} satisfies StoryObj<Args>
