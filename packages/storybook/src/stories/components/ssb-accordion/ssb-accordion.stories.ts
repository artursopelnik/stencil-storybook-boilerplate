import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbAccordion } from "@stencil-storybook-boilerplate/core/src/components/ssb-accordion/ssb-accordion"

type Args = SsbAccordion & { firstOpen: boolean }

const meta = {
  title: "Components/Accordion",
  parameters: {
    layout: "centered",
  },
  args: {
    multiple: false,
    firstOpen: true,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ multiple, firstOpen }: Args) =>
    html`<ssb-accordion ?multiple=${multiple} style="width: 24rem;">
      <ssb-accordion-item heading="Is it accessible?" ?open=${firstOpen}>
        Yes. It adheres to the WAI-ARIA design pattern with proper button and
        region semantics.
      </ssb-accordion-item>
      <ssb-accordion-item heading="Is it styled?">
        Yes. It comes with neutral Basecoat-like default styles that match the
        other components.
      </ssb-accordion-item>
      <ssb-accordion-item heading="Is it animated?">
        The chevron rotates smoothly when an item is toggled open or closed.
      </ssb-accordion-item>
    </ssb-accordion>`,
} satisfies StoryObj<Args>

export const Multiple = {
  render: () =>
    html`<ssb-accordion ?multiple=${true} style="width: 24rem;">
      <ssb-accordion-item heading="First section" ?open=${true}>
        Multiple items can be open at the same time when the multiple prop is
        set.
      </ssb-accordion-item>
      <ssb-accordion-item heading="Second section" ?open=${true}>
        This item stays open even when another item is opened.
      </ssb-accordion-item>
      <ssb-accordion-item heading="Third section">
        Toggle this item without closing the others.
      </ssb-accordion-item>
    </ssb-accordion>`,
} satisfies StoryObj<Args>

export const WithDisabledItem = {
  render: () =>
    html`<ssb-accordion style="width: 24rem;">
      <ssb-accordion-item heading="Available section">
        This section can be toggled as usual.
      </ssb-accordion-item>
      <ssb-accordion-item heading="Disabled section" ?disabled=${true}>
        This content cannot be reached because the item is disabled.
      </ssb-accordion-item>
    </ssb-accordion>`,
} satisfies StoryObj<Args>
