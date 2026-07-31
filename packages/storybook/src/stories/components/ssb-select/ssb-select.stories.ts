import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbSelect } from "@stencil-storybook-boilerplate/core/src/components/ssb-select/ssb-select"

type Args = SsbSelect

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes", disabled: true },
  { label: "Pineapple", value: "pineapple" },
]

const meta = {
  title: "Components/Select",
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Select a fruit",
    value: "",
    disabled: false,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ placeholder, value, disabled }: Args) =>
    html`<div style="min-width: 14rem;">
      <ssb-select
        .options=${FRUITS}
        placeholder=${placeholder}
        value=${value}
        ?disabled=${disabled}
      ></ssb-select>
    </div>`,
} satisfies StoryObj<Args>

export const Preselected = {
  render: () =>
    html`<div style="min-width: 14rem;">
      <ssb-select .options=${FRUITS} value="banana"></ssb-select>
    </div>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () =>
    html`<div style="min-width: 14rem;">
      <ssb-select
        .options=${FRUITS}
        placeholder="Select a fruit"
        ?disabled=${true}
      ></ssb-select>
    </div>`,
} satisfies StoryObj<Args>
