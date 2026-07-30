import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbSpinner } from "@stencil-storybook-boilerplate/core/src/components/ssb-spinner/ssb-spinner"

type Args = SsbSpinner

const meta = {
  title: "Components/Spinner",
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    label: "Loading…",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ size, label }: Args) =>
    html`<ssb-spinner size=${size} label=${label}></ssb-spinner>`,
} satisfies StoryObj<Args>

export const Sizes = {
  render: () =>
    html`<div style="display: flex; gap: 1rem; align-items: center;">
      <ssb-spinner size="sm"></ssb-spinner>
      <ssb-spinner size="md"></ssb-spinner>
      <ssb-spinner size="lg"></ssb-spinner>
    </div>`,
} satisfies StoryObj<Args>

export const InButton = {
  render: () =>
    html`<ssb-button ?disabled=${true}>
      <ssb-spinner size="sm" label="Saving…"></ssb-spinner>
      Please wait
    </ssb-button>`,
} satisfies StoryObj<Args>
