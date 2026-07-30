import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbDropdownMenu } from "@stencil-storybook-boilerplate/core/src/components/ssb-dropdown-menu/ssb-dropdown-menu"

type Args = SsbDropdownMenu & { triggerLabel: string }

const defaultItems = [
  { groupLabel: "My Account" },
  { label: "Profile", value: "profile" },
  { label: "Billing", value: "billing" },
  { label: "Settings", value: "settings" },
  { separator: true },
  { label: "API (disabled)", value: "api", disabled: true },
  { separator: true },
  { label: "Log out", value: "logout", destructive: true },
]

const meta = {
  title: "Components/DropdownMenu",
  parameters: {
    layout: "centered",
  },
  args: {
    open: false,
    items: defaultItems,
    align: "start",
    triggerLabel: "Open menu",
  },
  argTypes: {
    align: {
      control: "select",
      options: ["start", "end"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ open, items, align, triggerLabel }: Args) =>
    html`<ssb-dropdown-menu ?open=${open} .items=${items} align=${align}>
      <ssb-button slot="trigger" variant="outline">${triggerLabel}</ssb-button>
    </ssb-dropdown-menu>`,
} satisfies StoryObj<Args>

export const AlignEnd = {
  render: () =>
    html`<ssb-dropdown-menu align="end" .items=${defaultItems}>
      <ssb-button slot="trigger" variant="outline">Aligned to end</ssb-button>
    </ssb-dropdown-menu>`,
} satisfies StoryObj<Args>

export const InitiallyOpen = {
  render: () =>
    html`<div style="padding-bottom: 16rem;">
      <ssb-dropdown-menu ?open=${true} .items=${defaultItems}>
        <ssb-button slot="trigger" variant="outline">Open menu</ssb-button>
      </ssb-dropdown-menu>
    </div>`,
} satisfies StoryObj<Args>
