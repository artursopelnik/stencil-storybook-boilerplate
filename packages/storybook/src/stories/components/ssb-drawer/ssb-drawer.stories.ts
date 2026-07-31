import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbDrawer } from "@stencil-storybook-boilerplate/core/src/components/ssb-drawer/ssb-drawer"

type Args = SsbDrawer

const openDrawer = () => {
  const drawer = document.querySelector("ssb-drawer") as HTMLElement & {
    open: boolean
  }
  if (drawer) {
    drawer.open = true
  }
}

const meta = {
  title: "Components/Drawer",
  parameters: {
    layout: "centered",
  },
  args: {
    side: "bottom",
    drawerTitle: "Move goal",
    description: "Set your daily activity goal.",
  },
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ side, drawerTitle, description }: Args) =>
    html`<ssb-button variant="outline" @click=${openDrawer}
        >Open drawer</ssb-button
      >
      <ssb-drawer
        side=${side}
        drawer-title=${drawerTitle}
        description=${description}
      >
        <p style="margin: 0; font-size: 0.875rem;">Drawer content goes here.</p>
        <div slot="footer">
          <ssb-button
            variant="outline"
            @click=${() => {
              const drawer = document.querySelector(
                "ssb-drawer",
              ) as HTMLElement & { open: boolean }
              if (drawer) {
                drawer.open = false
              }
            }}
            >Close</ssb-button
          >
        </div>
      </ssb-drawer>`,
} satisfies StoryObj<Args>

export const FromRight = {
  render: () =>
    html`<ssb-button variant="outline" @click=${openDrawer}
        >Open right drawer</ssb-button
      >
      <ssb-drawer
        side="right"
        drawer-title="Filters"
        description="Narrow down the results."
      >
        <p style="margin: 0; font-size: 0.875rem;">Filter controls go here.</p>
      </ssb-drawer>`,
} satisfies StoryObj<Args>
