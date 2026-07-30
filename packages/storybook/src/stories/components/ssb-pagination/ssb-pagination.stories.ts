import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbPagination } from "@stencil-storybook-boilerplate/core/src/components/ssb-pagination/ssb-pagination"

type Args = SsbPagination & { label: string }

const meta = {
  title: "Components/Pagination",
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Pagination",
    page: 1,
    totalPages: 10,
    siblingCount: 1,
  },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
    siblingCount: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ page, totalPages, siblingCount }) =>
    html`<ssb-pagination page=${page} total-pages=${totalPages} sibling-count=${siblingCount}></ssb-pagination>`,
} satisfies StoryObj<Args>

export const MiddlePage = {
  render: () => html`<ssb-pagination page=${5} total-pages=${10}></ssb-pagination>`,
} satisfies StoryObj<Args>

export const FewPages = {
  render: () => html`<ssb-pagination page=${2} total-pages=${3}></ssb-pagination>`,
} satisfies StoryObj<Args>

export const WiderSiblings = {
  render: () => html`<ssb-pagination page=${10} total-pages=${20} sibling-count=${2}></ssb-pagination>`,
} satisfies StoryObj<Args>
