import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbEmpty } from "@stencil-storybook-boilerplate/core/src/components/ssb-empty/ssb-empty"

type Args = SsbEmpty & { emptyTitle: string; description: string }

const meta = {
  title: "Components/Empty",
  parameters: {
    layout: "centered",
  },
  args: {
    emptyTitle: "No results found",
    description:
      "Try adjusting your search or filters to find what you are looking for.",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ emptyTitle, description }: Args) =>
    html`<ssb-empty style="width: 28rem;">
      <span slot="empty-title">${emptyTitle}</span>
      ${description}
    </ssb-empty>`,
} satisfies StoryObj<Args>

export const WithIcon = {
  render: () =>
    html`<ssb-empty style="width: 28rem;">
      <span slot="icon">&#128193;</span>
      <span slot="empty-title">No projects</span>
      You have not created any projects yet.
    </ssb-empty>`,
} satisfies StoryObj<Args>

export const WithActions = {
  render: () =>
    html`<ssb-empty style="width: 28rem;">
      <span slot="icon">&#128193;</span>
      <span slot="empty-title">No projects</span>
      You have not created any projects yet. Get started by creating your first
      project.
      <ssb-button slot="actions">Create project</ssb-button>
      <ssb-button slot="actions" variant="outline">Import</ssb-button>
    </ssb-empty>`,
} satisfies StoryObj<Args>
