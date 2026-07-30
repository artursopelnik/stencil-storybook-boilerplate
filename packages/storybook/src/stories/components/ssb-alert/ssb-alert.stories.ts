import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbAlert } from "@stencil-storybook-boilerplate/core/src/components/ssb-alert/ssb-alert"

type Args = SsbAlert & { alertTitle: string; description: string }

const meta = {
  title: "Components/Alert",
  parameters: {
    layout: "centered",
  },
  args: {
    alertTitle: "Heads up!",
    description: "You can add components to your app using the CLI.",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ alertTitle, description, variant }) =>
    html`<ssb-alert variant=${variant} style="width: 24rem;">
      <span slot="alert-title">${alertTitle}</span>
      ${description}
    </ssb-alert>`,
} satisfies StoryObj<Args>

export const WithIcon = {
  render: () =>
    html`<ssb-alert style="width: 24rem;">
      <span slot="icon">&#128276;</span>
      <span slot="alert-title">Notification</span>
      New components have been added to the library.
    </ssb-alert>`,
} satisfies StoryObj<Args>

export const Destructive = {
  render: () =>
    html`<ssb-alert variant="destructive" style="width: 24rem;">
      <span slot="icon">&#9888;</span>
      <span slot="alert-title">Error</span>
      Your session has expired. Please log in again.
    </ssb-alert>`,
} satisfies StoryObj<Args>
