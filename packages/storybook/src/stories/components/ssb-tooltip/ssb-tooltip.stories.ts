import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbTooltip } from "@stencil-storybook-boilerplate/core/src/components/ssb-tooltip/ssb-tooltip"

type Args = SsbTooltip & { triggerLabel: string }

const meta = {
  title: "Components/Tooltip",
  parameters: {
    layout: "centered",
  },
  args: {
    text: "Add to library",
    position: "top",
    openDelay: 200,
    triggerLabel: "Hover me",
  },
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ text, position, openDelay, triggerLabel }) =>
    html`<ssb-tooltip text=${text} position=${position} open-delay=${openDelay}>
      <ssb-button variant="outline">${triggerLabel}</ssb-button>
    </ssb-tooltip>`,
} satisfies StoryObj<Args>

export const Positions = {
  render: () =>
    html`<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; padding: 3rem;">
      <ssb-tooltip text="Tooltip on top" position="top">
        <ssb-button variant="outline">Top</ssb-button>
      </ssb-tooltip>
      <ssb-tooltip text="Tooltip on bottom" position="bottom">
        <ssb-button variant="outline">Bottom</ssb-button>
      </ssb-tooltip>
      <ssb-tooltip text="Tooltip on left" position="left">
        <ssb-button variant="outline">Left</ssb-button>
      </ssb-tooltip>
      <ssb-tooltip text="Tooltip on right" position="right">
        <ssb-button variant="outline">Right</ssb-button>
      </ssb-tooltip>
    </div>`,
} satisfies StoryObj<Args>

export const WithoutDelay = {
  render: () =>
    html`<ssb-tooltip text="Shows immediately" open-delay=${0}>
      <ssb-button variant="outline">No delay</ssb-button>
    </ssb-tooltip>`,
} satisfies StoryObj<Args>
