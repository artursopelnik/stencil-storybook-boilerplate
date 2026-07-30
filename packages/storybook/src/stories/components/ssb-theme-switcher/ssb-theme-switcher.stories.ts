import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbThemeSwitcher } from "@stencil-storybook-boilerplate/core/src/components/ssb-theme-switcher/ssb-theme-switcher"

type Args = SsbThemeSwitcher

const meta = {
  title: "Components/ThemeSwitcher",
  parameters: {
    layout: "centered",
  },
  args: {
    theme: "light",
  },
  argTypes: {
    theme: {
      control: "select",
      options: ["light", "dark"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ theme }) => html`<ssb-theme-switcher theme=${theme}></ssb-theme-switcher>`,
} satisfies StoryObj<Args>

export const Dark = {
  render: () => html`<ssb-theme-switcher theme="dark"></ssb-theme-switcher>`,
} satisfies StoryObj<Args>

export const WithEventLog = {
  render: () =>
    html`<div style="display: flex; gap: 0.75rem; align-items: center;">
      <ssb-theme-switcher
        @ssbThemeChange=${(event: CustomEvent<{ theme: string }>) => {
          const output = document.querySelector("#ssb-theme-switcher-output")
          if (output) {
            output.textContent = `Theme changed to: ${event.detail.theme}`
          }
        }}
      ></ssb-theme-switcher>
      <span id="ssb-theme-switcher-output" style="font-size: 0.875rem;">Click to toggle the theme</span>
    </div>`,
} satisfies StoryObj<Args>
