import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbPopover } from "@stencil-storybook-boilerplate/core/src/components/ssb-popover/ssb-popover"

type Args = SsbPopover & { triggerLabel: string }

const meta = {
  title: "Components/Popover",
  parameters: {
    layout: "centered",
  },
  args: {
    open: false,
    position: "bottom",
    align: "center",
    triggerLabel: "Open popover",
  },
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ open, position, align, triggerLabel }) =>
    html`<ssb-popover ?open=${open} position=${position} align=${align}>
      <ssb-button slot="trigger" variant="outline">${triggerLabel}</ssb-button>
      <div>
        <strong style="display: block; margin-bottom: 0.25rem;">Dimensions</strong>
        Set the dimensions for the layer. Click outside or press Escape to close.
      </div>
    </ssb-popover>`,
} satisfies StoryObj<Args>

export const Alignments = {
  render: () =>
    html`<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; padding: 6rem 2rem;">
      <ssb-popover align="start">
        <ssb-button slot="trigger" variant="outline">Start</ssb-button>
        <div>Aligned to the start edge of the trigger.</div>
      </ssb-popover>
      <ssb-popover align="center">
        <ssb-button slot="trigger" variant="outline">Center</ssb-button>
        <div>Centered below the trigger.</div>
      </ssb-popover>
      <ssb-popover align="end">
        <ssb-button slot="trigger" variant="outline">End</ssb-button>
        <div>Aligned to the end edge of the trigger.</div>
      </ssb-popover>
    </div>`,
} satisfies StoryObj<Args>

export const OnTop = {
  render: () =>
    html`<div style="padding-top: 8rem;">
      <ssb-popover position="top">
        <ssb-button slot="trigger" variant="outline">Open above</ssb-button>
        <div>This panel opens above the trigger.</div>
      </ssb-popover>
    </div>`,
} satisfies StoryObj<Args>
