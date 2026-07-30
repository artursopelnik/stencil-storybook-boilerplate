import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbAlertDialog } from "@stencil-storybook-boilerplate/core/src/components/ssb-alert-dialog/ssb-alert-dialog"

type Args = SsbAlertDialog & { triggerLabel: string }

const openAlertDialog = () => {
  const dialog = document.querySelector("ssb-alert-dialog") as HTMLElement & {
    open: boolean
  }
  if (dialog) dialog.open = true
}

const meta = {
  title: "Components/AlertDialog",
  parameters: {
    layout: "centered",
  },
  args: {
    open: false,
    dialogTitle: "Are you absolutely sure?",
    description:
      "This action cannot be undone. This will permanently remove your data from our servers.",
    confirmLabel: "Continue",
    cancelLabel: "Cancel",
    destructive: false,
    triggerLabel: "Show alert dialog",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({
    open,
    dialogTitle,
    description,
    confirmLabel,
    cancelLabel,
    destructive,
    triggerLabel,
  }: Args) =>
    html`<div>
      <ssb-button variant="outline" @click=${openAlertDialog}
        >${triggerLabel}</ssb-button
      >
      <ssb-alert-dialog
        ?open=${open}
        dialog-title=${dialogTitle}
        description=${description}
        confirm-label=${confirmLabel}
        cancel-label=${cancelLabel}
        ?destructive=${destructive}
      ></ssb-alert-dialog>
    </div>`,
} satisfies StoryObj<Args>

export const Destructive = {
  render: () =>
    html`<div>
      <ssb-button variant="destructive" @click=${openAlertDialog}
        >Delete account</ssb-button
      >
      <ssb-alert-dialog
        dialog-title="Delete account?"
        description="Your account and all associated data will be permanently deleted."
        confirm-label="Delete"
        cancel-label="Cancel"
        ?destructive=${true}
      ></ssb-alert-dialog>
    </div>`,
} satisfies StoryObj<Args>

export const InitiallyOpen = {
  render: () =>
    html`<div>
      <ssb-button variant="outline" @click=${openAlertDialog}
        >Show alert dialog</ssb-button
      >
      <ssb-alert-dialog
        ?open=${true}
        dialog-title="Discard draft?"
        description="Your unsaved changes will be lost."
        confirm-label="Discard"
        cancel-label="Keep editing"
      ></ssb-alert-dialog>
    </div>`,
} satisfies StoryObj<Args>
