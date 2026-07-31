import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbSidebar } from "@stencil-storybook-boilerplate/core/src/components/ssb-sidebar/ssb-sidebar"

type Args = SsbSidebar

const navItems = html`
  <div slot="header" style="font-weight: 600; font-size: 0.875rem;">
    Acme Inc.
  </div>
  <ssb-item interactive><span slot="item-title">Dashboard</span></ssb-item>
  <ssb-item interactive><span slot="item-title">Projects</span></ssb-item>
  <ssb-item interactive><span slot="item-title">Settings</span></ssb-item>
`

const frame = (sidebar: unknown) =>
  html`<div
    style="display: flex; height: 24rem; width: 40rem; border: 1px solid var(--ssb-color-border, #e2e8f0); border-radius: 0.75rem; overflow: hidden;"
  >
    ${sidebar}
    <main style="flex: 1; padding: 1rem; font-size: 0.875rem;">
      Main content
    </main>
  </div>`

const meta = {
  title: "Components/Sidebar",
  parameters: {
    layout: "centered",
  },
  args: {
    collapsed: false,
    collapsible: true,
    side: "left",
  },
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ collapsed, collapsible, side }: Args) =>
    frame(
      html`<ssb-sidebar
        ?collapsed=${collapsed}
        ?collapsible=${collapsible}
        side=${side}
        >${navItems}</ssb-sidebar
      >`,
    ),
} satisfies StoryObj<Args>

export const Collapsed = {
  render: () =>
    frame(html`<ssb-sidebar ?collapsed=${true}>${navItems}</ssb-sidebar>`),
} satisfies StoryObj<Args>

export const RightSide = {
  render: () =>
    html`<div
      style="display: flex; height: 24rem; width: 40rem; border: 1px solid var(--ssb-color-border, #e2e8f0); border-radius: 0.75rem; overflow: hidden;"
    >
      <main style="flex: 1; padding: 1rem; font-size: 0.875rem;">
        Main content
      </main>
      <ssb-sidebar side="right">${navItems}</ssb-sidebar>
    </div>`,
} satisfies StoryObj<Args>
