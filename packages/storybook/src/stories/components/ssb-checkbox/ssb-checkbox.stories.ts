import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbCheckbox } from "@stencil-storybook-boilerplate/core/src/components/ssb-checkbox/ssb-checkbox"

type Args = SsbCheckbox

const meta = {
  title: "Components/Checkbox",
  parameters: {
    layout: "centered",
  },
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    label: "Accept terms and conditions",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ checked, disabled, indeterminate, label }: Args) =>
    html`<ssb-checkbox
      ?checked=${checked}
      ?disabled=${disabled}
      ?indeterminate=${indeterminate}
      label=${label}
    ></ssb-checkbox>`,
} satisfies StoryObj<Args>

export const Checked = {
  render: () =>
    html`<ssb-checkbox
      ?checked=${true}
      label="Accept terms and conditions"
    ></ssb-checkbox>`,
} satisfies StoryObj<Args>

export const Indeterminate = {
  render: () =>
    html`<ssb-checkbox
      ?indeterminate=${true}
      label="Select all"
    ></ssb-checkbox>`,
} satisfies StoryObj<Args>

export const WithSlottedLabel = {
  render: () =>
    html`<ssb-checkbox
      >I agree to the <strong>terms of service</strong></ssb-checkbox
    >`,
} satisfies StoryObj<Args>
