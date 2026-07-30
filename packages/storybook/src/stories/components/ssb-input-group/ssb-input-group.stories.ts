import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbInputGroup } from "@stencil-storybook-boilerplate/core/src/components/ssb-input-group/ssb-input-group"

type Args = SsbInputGroup & { placeholder: string }

const meta = {
  title: "Components/InputGroup",
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Username",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ placeholder }: Args) =>
    html`<ssb-input-group>
      <span slot="prefix">@</span>
      <input type="text" placeholder=${placeholder} aria-label="Username" />
    </ssb-input-group>`,
} satisfies StoryObj<Args>

export const PrefixAndSuffix = {
  render: () =>
    html`<ssb-input-group>
      <span slot="prefix">https://</span>
      <input type="text" placeholder="example" aria-label="Domain name" />
      <span slot="suffix">.com</span>
    </ssb-input-group>`,
} satisfies StoryObj<Args>

export const SuffixOnly = {
  render: () =>
    html`<ssb-input-group>
      <input type="number" placeholder="0.00" aria-label="Amount" />
      <span slot="suffix">EUR</span>
    </ssb-input-group>`,
} satisfies StoryObj<Args>
