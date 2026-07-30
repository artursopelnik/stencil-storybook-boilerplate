import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbTextarea } from "@stencil-storybook-boilerplate/core/src/components/ssb-textarea/ssb-textarea"

type Args = SsbTextarea

const meta = {
  title: "Components/Textarea",
  parameters: {
    layout: "centered",
  },
  args: {
    value: "",
    placeholder: "Type your message here.",
    rows: 3,
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({
    value,
    placeholder,
    rows,
    disabled,
    readonly,
    required,
    invalid,
  }: Args) =>
    html`<ssb-textarea
      style="width: 20rem;"
      value=${value}
      placeholder=${placeholder}
      rows=${rows}
      ?disabled=${disabled}
      ?readonly=${readonly}
      ?required=${required}
      ?invalid=${invalid}
    ></ssb-textarea>`,
} satisfies StoryObj<Args>

export const Invalid = {
  render: () =>
    html`<ssb-textarea
      style="width: 20rem;"
      ?invalid=${true}
      placeholder="Type your message here."
    ></ssb-textarea>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () =>
    html`<ssb-textarea
      style="width: 20rem;"
      ?disabled=${true}
      placeholder="Disabled"
    ></ssb-textarea>`,
} satisfies StoryObj<Args>
