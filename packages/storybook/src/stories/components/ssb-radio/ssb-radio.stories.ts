import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbRadio } from "@stencil-storybook-boilerplate/core/src/components/ssb-radio/ssb-radio"

type Args = SsbRadio & { label: string }

const meta = {
  title: "Components/Radio",
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Radio",
    value: "option",
    checked: false,
    disabled: false,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ label, value, checked, disabled }: Args) =>
    html`<ssb-radio value=${value} ?checked=${checked} ?disabled=${disabled}
      >${label}</ssb-radio
    >`,
} satisfies StoryObj<Args>

export const Checked = {
  render: () =>
    html`<ssb-radio value="option" ?checked=${true}>Checked</ssb-radio>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () =>
    html`<div style="display: flex; gap: 1rem; align-items: center;">
      <ssb-radio value="a" ?disabled=${true}>Disabled</ssb-radio>
      <ssb-radio value="b" ?checked=${true} ?disabled=${true}
        >Disabled checked</ssb-radio
      >
    </div>`,
} satisfies StoryObj<Args>
