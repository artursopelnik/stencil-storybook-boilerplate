import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbField } from "@stencil-storybook-boilerplate/core/src/components/ssb-field/ssb-field"

type Args = SsbField

const meta = {
  title: "Components/Field",
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Email address",
    description: "We never share your email with anyone.",
    error: "",
    required: false,
    fieldId: "email",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ label, description, error, required, fieldId }: Args) =>
    html`<ssb-field
      style="width: 20rem;"
      label=${label}
      description=${description}
      error=${error}
      ?required=${required}
      field-id=${fieldId}
    >
      <ssb-input type="email" placeholder="you@example.com"></ssb-input>
    </ssb-field>`,
} satisfies StoryObj<Args>

export const WithError = {
  render: () =>
    html`<ssb-field
      style="width: 20rem;"
      label="Email address"
      description="We never share your email with anyone."
      error="Please enter a valid email address."
      ?required=${true}
    >
      <ssb-input type="email" value="not-an-email" ?invalid=${true}></ssb-input>
    </ssb-field>`,
} satisfies StoryObj<Args>

export const WithTextarea = {
  render: () =>
    html`<ssb-field
      style="width: 20rem;"
      label="Message"
      description="Max. 500 characters."
    >
      <ssb-textarea placeholder="Type your message here."></ssb-textarea>
    </ssb-field>`,
} satisfies StoryObj<Args>
