import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// prettier-ignore
// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbBreadcrumb, BreadcrumbItem } from "@stencil-storybook-boilerplate/core/src/components/ssb-breadcrumb/ssb-breadcrumb"

type Args = SsbBreadcrumb & { items: BreadcrumbItem[] }

const meta = {
  title: "Components/Breadcrumb",
  parameters: {
    layout: "centered",
  },
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Components", href: "#" },
      { label: "Breadcrumb" },
    ],
    separator: "/",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ items, separator }: Args) =>
    html`<ssb-breadcrumb
      items=${JSON.stringify(items)}
      separator=${separator}
    ></ssb-breadcrumb>`,
} satisfies StoryObj<Args>

export const CustomSeparator = {
  render: () =>
    html`<ssb-breadcrumb
      items=${JSON.stringify([
        { label: "Home", href: "#" },
        { label: "Library", href: "#" },
        { label: "Data" },
      ])}
      separator="&rsaquo;"
    ></ssb-breadcrumb>`,
} satisfies StoryObj<Args>

export const WithoutLinks = {
  render: () =>
    html`<ssb-breadcrumb
      items=${JSON.stringify([{ label: "Home" }, { label: "Settings" }, { label: "Profile" }])}
    ></ssb-breadcrumb>`,
} satisfies StoryObj<Args>
