import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbRadioGroup } from "@stencil-storybook-boilerplate/core/src/components/ssb-radio-group/ssb-radio-group"

type Args = SsbRadioGroup

const meta = {
  title: "Components/RadioGroup",
  parameters: {
    layout: "centered",
  },
  args: {
    value: "comfortable",
    orientation: "vertical",
    disabled: false,
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ value, orientation, disabled }: Args) =>
    html`<ssb-radio-group
      value=${value}
      orientation=${orientation}
      ?disabled=${disabled}
    >
      <ssb-radio value="default">Default</ssb-radio>
      <ssb-radio value="comfortable">Comfortable</ssb-radio>
      <ssb-radio value="compact">Compact</ssb-radio>
    </ssb-radio-group>`,
} satisfies StoryObj<Args>

export const Horizontal = {
  render: () =>
    html`<ssb-radio-group
      value="monthly"
      orientation="horizontal"
      aria=${JSON.stringify({ "aria-label": "Billing period" })}
    >
      <ssb-radio value="monthly">Monthly</ssb-radio>
      <ssb-radio value="yearly">Yearly</ssb-radio>
    </ssb-radio-group>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () =>
    html`<ssb-radio-group value="default" ?disabled=${true}>
      <ssb-radio value="default">Default</ssb-radio>
      <ssb-radio value="comfortable">Comfortable</ssb-radio>
    </ssb-radio-group>`,
} satisfies StoryObj<Args>
