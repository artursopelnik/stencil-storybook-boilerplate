import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbBadge } from "@stencil-storybook-boilerplate/core/src/components/ssb-badge/ssb-badge"

type Args = SsbBadge & { label: string }

const meta = {
  title: "Components/Badge",
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Badge",
    variant: "primary",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "outline"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ label, variant }) => html`<ssb-badge variant=${variant}>${label}</ssb-badge>`,
} satisfies StoryObj<Args>

export const Variants = {
  render: () =>
    html`<div style="display: flex; gap: 0.5rem; align-items: center;">
      <ssb-badge variant="primary">Primary</ssb-badge>
      <ssb-badge variant="secondary">Secondary</ssb-badge>
      <ssb-badge variant="destructive">Destructive</ssb-badge>
      <ssb-badge variant="outline">Outline</ssb-badge>
    </div>`,
} satisfies StoryObj<Args>
