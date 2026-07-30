import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbCard } from "@stencil-storybook-boilerplate/core/src/components/ssb-card/ssb-card"

type Args = SsbCard & { cardTitle: string; description: string; content: string }

const meta = {
  title: "Components/Card",
  parameters: {
    layout: "centered",
  },
  args: {
    cardTitle: "Create project",
    description: "Deploy your new project in one click.",
    content: "Your project will be created in the selected workspace.",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ cardTitle, description, content }) =>
    html`<ssb-card style="width: 24rem;">
      <span slot="card-title">${cardTitle}</span>
      <span slot="card-description">${description}</span>
      ${content}
    </ssb-card>`,
} satisfies StoryObj<Args>

export const WithAction = {
  render: () =>
    html`<ssb-card style="width: 24rem;">
      <span slot="card-title">Notifications</span>
      <span slot="card-description">Manage how you receive updates.</span>
      <ssb-button slot="action" variant="ghost" size="icon" aria=${JSON.stringify({ "aria-label": "Settings" })}>&#9881;</ssb-button>
      You currently receive notifications by e-mail.
    </ssb-card>`,
} satisfies StoryObj<Args>

export const WithFooter = {
  render: () =>
    html`<ssb-card style="width: 24rem;">
      <span slot="card-title">Create project</span>
      <span slot="card-description">Deploy your new project in one click.</span>
      Your project will be created in the selected workspace.
      <ssb-button slot="footer" variant="outline">Cancel</ssb-button>
      <ssb-button slot="footer">Deploy</ssb-button>
    </ssb-card>`,
} satisfies StoryObj<Args>
