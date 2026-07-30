import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbProgress } from "@stencil-storybook-boilerplate/core/src/components/ssb-progress/ssb-progress"

type Args = SsbProgress

const meta = {
  title: "Components/Progress",
  parameters: {
    layout: "centered",
  },
  args: {
    value: 40,
    max: 100,
    label: "Loading",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ value, max, label }: Args) =>
    html`<div style="width: 320px;">
      <ssb-progress value=${value} max=${max} label=${label}></ssb-progress>
    </div>`,
} satisfies StoryObj<Args>

export const Complete = {
  render: () =>
    html`<div style="width: 320px;">
      <ssb-progress value="100" label="Upload complete"></ssb-progress>
    </div>`,
} satisfies StoryObj<Args>

export const CustomMax = {
  render: () =>
    html`<div style="width: 320px;">
      <ssb-progress value="3" max="5" label="Step 3 of 5"></ssb-progress>
    </div>`,
} satisfies StoryObj<Args>
