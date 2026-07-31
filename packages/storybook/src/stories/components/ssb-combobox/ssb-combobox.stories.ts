import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbCombobox } from "@stencil-storybook-boilerplate/core/src/components/ssb-combobox/ssb-combobox"

type Args = SsbCombobox

const FRAMEWORKS = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
]

const meta = {
  title: "Components/Combobox",
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Select framework",
    searchPlaceholder: "Search framework…",
    value: "",
    disabled: false,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ placeholder, searchPlaceholder, value, disabled }: Args) =>
    html`<div style="min-width: 14rem;">
      <ssb-combobox
        .options=${FRAMEWORKS}
        placeholder=${placeholder}
        search-placeholder=${searchPlaceholder}
        value=${value}
        ?disabled=${disabled}
      ></ssb-combobox>
    </div>`,
} satisfies StoryObj<Args>

export const Preselected = {
  render: () =>
    html`<div style="min-width: 14rem;">
      <ssb-combobox .options=${FRAMEWORKS} value="astro"></ssb-combobox>
    </div>`,
} satisfies StoryObj<Args>

export const CustomEmptyMessage = {
  render: () =>
    html`<div style="min-width: 14rem;">
      <ssb-combobox
        .options=${FRAMEWORKS}
        empty-message="Nothing matches your search."
      ></ssb-combobox>
    </div>`,
} satisfies StoryObj<Args>
