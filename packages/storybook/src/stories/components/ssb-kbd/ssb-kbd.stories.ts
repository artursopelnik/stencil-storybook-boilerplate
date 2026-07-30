import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbKbd } from "@stencil-storybook-boilerplate/core/src/components/ssb-kbd/ssb-kbd"

type Args = SsbKbd & { label: string }

const meta = {
  title: "Components/Kbd",
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Ctrl",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ label }) => html`<ssb-kbd>${label}</ssb-kbd>`,
} satisfies StoryObj<Args>

export const Combination = {
  render: () =>
    html`<span style="display: inline-flex; gap: 0.25rem; align-items: center; font-size: 0.875rem;">
      <ssb-kbd>Ctrl</ssb-kbd> + <ssb-kbd>Shift</ssb-kbd> + <ssb-kbd>P</ssb-kbd>
    </span>`,
} satisfies StoryObj<Args>

export const InText = {
  render: () =>
    html`<p style="font-size: 0.875rem; max-width: 24rem;">
      Press <ssb-kbd>&#8984;</ssb-kbd> <ssb-kbd>K</ssb-kbd> to open the command palette and <ssb-kbd>Esc</ssb-kbd> to close it.
    </p>`,
} satisfies StoryObj<Args>
