import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbToast } from "@stencil-storybook-boilerplate/core/src/components/ssb-toast/ssb-toast"

type Args = SsbToast & { triggerLabel: string }

const showToast = () => {
  const toast = document.querySelector("ssb-toast") as HTMLElement & {
    open: boolean
  }
  if (toast) toast.open = true
}

const meta = {
  title: "Components/Toast",
  parameters: {
    layout: "centered",
  },
  args: {
    open: true,
    toastTitle: "Event has been created",
    description: "Sunday, December 03, 2023 at 9:00 AM",
    variant: "default",
    duration: 0,
    dismissible: true,
    triggerLabel: "Show toast",
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
  render: ({
    open,
    toastTitle,
    description,
    variant,
    duration,
    dismissible,
  }: Args) =>
    html`<ssb-toast
      ?open=${open}
      toast-title=${toastTitle}
      description=${description}
      variant=${variant}
      duration=${duration}
      ?dismissible=${dismissible}
    ></ssb-toast>`,
} satisfies StoryObj<Args>

export const Destructive = {
  render: () =>
    html`<ssb-toast
      ?open=${true}
      variant="destructive"
      toast-title="Something went wrong"
      description="There was a problem with your request."
    ></ssb-toast>`,
} satisfies StoryObj<Args>

export const AutoDismiss = {
  render: () =>
    html`<div
      style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;"
    >
      <ssb-button variant="outline" @click=${showToast}>Show toast</ssb-button>
      <ssb-toast
        toast-title="Copied to clipboard"
        description="Disappears after 3 seconds."
        duration=${3000}
      ></ssb-toast>
    </div>`,
} satisfies StoryObj<Args>
