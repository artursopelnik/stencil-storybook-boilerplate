import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbDialog } from "@stencil-storybook-boilerplate/core/src/components/ssb-dialog/ssb-dialog"

type Args = SsbDialog & { content: string }

const openDialog = () => {
  const dialog = document.querySelector("ssb-dialog") as HTMLElement & {
    open: boolean
  }
  if (dialog) dialog.open = true
}

const closeDialog = () => {
  const dialog = document.querySelector("ssb-dialog") as HTMLElement & {
    open: boolean
  }
  if (dialog) dialog.open = false
}

const meta = {
  title: "Components/Dialog",
  parameters: {
    layout: "centered",
  },
  args: {
    open: false,
    dialogTitle: "Edit profile",
    description:
      "Make changes to your profile here. Click save when you are done.",
    hideClose: false,
    content: "Dialog body content goes here.",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ open, dialogTitle, description, hideClose, content }: Args) =>
    html`<div>
      <ssb-button @click=${openDialog}>Open dialog</ssb-button>
      <ssb-dialog
        ?open=${open}
        dialog-title=${dialogTitle}
        description=${description}
        ?hide-close=${hideClose}
      >
        ${content}
        <ssb-button slot="footer" variant="outline" @click=${closeDialog}
          >Cancel</ssb-button
        >
        <ssb-button slot="footer" @click=${closeDialog}
          >Save changes</ssb-button
        >
      </ssb-dialog>
    </div>`,
} satisfies StoryObj<Args>

export const WithoutCloseButton = {
  render: () =>
    html`<div>
      <ssb-button @click=${openDialog}>Open dialog</ssb-button>
      <ssb-dialog
        dialog-title="Terms of service"
        description="You must explicitly accept or decline."
        ?hide-close=${true}
      >
        Please read the terms carefully before continuing.
        <ssb-button slot="footer" variant="outline" @click=${closeDialog}
          >Decline</ssb-button
        >
        <ssb-button slot="footer" @click=${closeDialog}>Accept</ssb-button>
      </ssb-dialog>
    </div>`,
} satisfies StoryObj<Args>

export const InitiallyOpen = {
  render: () =>
    html`<div>
      <ssb-button @click=${openDialog}>Open dialog</ssb-button>
      <ssb-dialog
        ?open=${true}
        dialog-title="Welcome"
        description="This dialog starts in the open state."
      >
        Close it with the ✕ button, the Escape key or a click on the backdrop.
      </ssb-dialog>
    </div>`,
} satisfies StoryObj<Args>
