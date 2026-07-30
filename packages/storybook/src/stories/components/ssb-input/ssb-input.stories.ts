import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbInput } from "@stencil-storybook-boilerplate/core/src/components/ssb-input/ssb-input"

type Args = SsbInput

const meta = {
  title: "Components/Input",
  parameters: {
    layout: "centered",
  },
  args: {
    type: "text",
    value: "",
    placeholder: "Email address",
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({
    type,
    value,
    placeholder,
    disabled,
    readonly,
    required,
    invalid,
  }: Args) =>
    html`<ssb-input
      style="width: 20rem;"
      type=${type}
      value=${value}
      placeholder=${placeholder}
      ?disabled=${disabled}
      ?readonly=${readonly}
      ?required=${required}
      ?invalid=${invalid}
    ></ssb-input>`,
} satisfies StoryObj<Args>

export const Types = {
  render: () =>
    html`<div
      style="display: flex; flex-direction: column; gap: 0.5rem; width: 20rem;"
    >
      <ssb-input type="text" placeholder="Text"></ssb-input>
      <ssb-input type="email" placeholder="Email"></ssb-input>
      <ssb-input type="password" placeholder="Password"></ssb-input>
      <ssb-input type="search" placeholder="Search"></ssb-input>
    </div>`,
} satisfies StoryObj<Args>

export const Invalid = {
  render: () =>
    html`<ssb-input
      style="width: 20rem;"
      ?invalid=${true}
      value="not-an-email"
      placeholder="Email address"
    ></ssb-input>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () =>
    html`<ssb-input
      style="width: 20rem;"
      ?disabled=${true}
      placeholder="Disabled"
    ></ssb-input>`,
} satisfies StoryObj<Args>
