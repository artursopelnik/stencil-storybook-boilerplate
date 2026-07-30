import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbButton } from "@stencil-storybook-boilerplate/core/src/components/ssb-button/ssb-button"

type Args = SsbButton & { label: string }

const meta = {
  title: "Components/Button",
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "outline", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ label, variant, size, disabled }) =>
    html`<ssb-button variant=${variant} size=${size} ?disabled=${disabled}>${label}</ssb-button>`,
} satisfies StoryObj<Args>

export const Variants = {
  render: () =>
    html`<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ssb-button variant="primary">Primary</ssb-button>
      <ssb-button variant="secondary">Secondary</ssb-button>
      <ssb-button variant="destructive">Destructive</ssb-button>
      <ssb-button variant="outline">Outline</ssb-button>
      <ssb-button variant="ghost">Ghost</ssb-button>
      <ssb-button variant="link">Link</ssb-button>
    </div>`,
} satisfies StoryObj<Args>

export const Sizes = {
  render: () =>
    html`<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ssb-button size="sm">Small</ssb-button>
      <ssb-button size="md">Medium</ssb-button>
      <ssb-button size="lg">Large</ssb-button>
      <ssb-button size="icon" aria=${JSON.stringify({ "aria-label": "Settings" })}>&#9881;</ssb-button>
    </div>`,
} satisfies StoryObj<Args>

export const AsLink = {
  render: () => html`<ssb-button href="https://example.com" target="_blank" variant="outline">Open example.com</ssb-button>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () => html`<ssb-button ?disabled=${true}>Disabled</ssb-button>`,
} satisfies StoryObj<Args>
