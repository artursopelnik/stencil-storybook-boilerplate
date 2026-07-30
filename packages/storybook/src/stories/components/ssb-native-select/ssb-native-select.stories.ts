import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbNativeSelect } from "@stencil-storybook-boilerplate/core/src/components/ssb-native-select/ssb-native-select"

type Args = SsbNativeSelect

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Durian (out of season)", value: "durian", disabled: true },
]

const meta = {
  title: "Components/NativeSelect",
  parameters: {
    layout: "centered",
  },
  args: {
    options: fruits,
    value: "",
    placeholder: "Select a fruit",
    disabled: false,
    required: false,
    size: "md",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ options, value, placeholder, disabled, required, size }) =>
    html`<ssb-native-select
      style="width: 20rem;"
      options=${JSON.stringify(options)}
      value=${value}
      placeholder=${placeholder}
      ?disabled=${disabled}
      ?required=${required}
      size=${size}
    ></ssb-native-select>`,
} satisfies StoryObj<Args>

export const Sizes = {
  render: () =>
    html`<div style="display: flex; flex-direction: column; gap: 0.5rem; width: 20rem;">
      <ssb-native-select size="sm" placeholder="Small" options=${JSON.stringify(fruits)}></ssb-native-select>
      <ssb-native-select size="md" placeholder="Medium" options=${JSON.stringify(fruits)}></ssb-native-select>
    </div>`,
} satisfies StoryObj<Args>

export const Preselected = {
  render: () => html`<ssb-native-select style="width: 20rem;" value="banana" options=${JSON.stringify(fruits)}></ssb-native-select>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () =>
    html`<ssb-native-select style="width: 20rem;" ?disabled=${true} placeholder="Select a fruit" options=${JSON.stringify(fruits)}></ssb-native-select>`,
} satisfies StoryObj<Args>
