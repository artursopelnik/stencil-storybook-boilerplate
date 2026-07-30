import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbAccordionItem } from "@stencil-storybook-boilerplate/core/src/components/ssb-accordion-item/ssb-accordion-item"

type Args = SsbAccordionItem & { content: string }

const meta = {
  title: "Components/AccordionItem",
  parameters: {
    layout: "centered",
  },
  args: {
    heading: "Is it accessible?",
    content:
      "Yes. It adheres to the WAI-ARIA design pattern with proper button and region semantics.",
    open: false,
    disabled: false,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ heading, content, open, disabled }: Args) =>
    html`<ssb-accordion-item
      heading=${heading}
      ?open=${open}
      ?disabled=${disabled}
      style="width: 24rem;"
    >
      ${content}
    </ssb-accordion-item>`,
} satisfies StoryObj<Args>

export const Open = {
  render: () =>
    html`<ssb-accordion-item
      heading="Shipping details"
      ?open=${true}
      style="width: 24rem;"
    >
      Orders are shipped within 2 business days and arrive within a week.
    </ssb-accordion-item>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () =>
    html`<ssb-accordion-item
      heading="Unavailable section"
      ?disabled=${true}
      style="width: 24rem;"
    >
      This content cannot be reached because the item is disabled.
    </ssb-accordion-item>`,
} satisfies StoryObj<Args>
