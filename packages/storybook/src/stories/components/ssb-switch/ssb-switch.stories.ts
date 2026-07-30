import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbSwitch } from "@stencil-storybook-boilerplate/core/src/components/ssb-switch/ssb-switch"

type Args = SsbSwitch & { label: string }

const meta = {
  title: "Components/Switch",
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Airplane mode",
    checked: false,
    disabled: false,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ label, checked, disabled }) => html`<ssb-switch ?checked=${checked} ?disabled=${disabled}>${label}</ssb-switch>`,
} satisfies StoryObj<Args>

export const Checked = {
  render: () => html`<ssb-switch ?checked=${true}>Airplane mode</ssb-switch>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () =>
    html`<div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <ssb-switch ?disabled=${true}>Disabled off</ssb-switch>
      <ssb-switch ?disabled=${true} ?checked=${true}>Disabled on</ssb-switch>
    </div>`,
} satisfies StoryObj<Args>
