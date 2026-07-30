import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbLabel } from "@stencil-storybook-boilerplate/core/src/components/ssb-label/ssb-label"

type Args = SsbLabel & { text: string }

const meta = {
  title: "Components/Label",
  parameters: {
    layout: "centered",
  },
  args: {
    text: "Email address",
    htmlFor: "email",
    required: false,
    disabled: false,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ text, htmlFor, required, disabled }) =>
    html`<ssb-label html-for=${htmlFor} ?required=${required} ?disabled=${disabled}>${text}</ssb-label>`,
} satisfies StoryObj<Args>

export const Required = {
  render: () => html`<ssb-label ?required=${true}>Email address</ssb-label>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () => html`<ssb-label ?disabled=${true}>Email address</ssb-label>`,
} satisfies StoryObj<Args>

export const WithInput = {
  render: () =>
    html`<div style="display: flex; flex-direction: column; gap: 0.375rem; width: 20rem;">
      <ssb-label ?required=${true}>Email address</ssb-label>
      <ssb-input type="email" placeholder="you@example.com"></ssb-input>
    </div>`,
} satisfies StoryObj<Args>
