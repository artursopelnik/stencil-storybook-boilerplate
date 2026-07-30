import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type {
  SsbTabs,
  TabItem,
} from "@stencil-storybook-boilerplate/core/src/components/ssb-tabs/ssb-tabs"

type Args = SsbTabs & { tabs: TabItem[] }

const meta = {
  title: "Components/Tabs",
  parameters: {
    layout: "centered",
  },
  args: {
    tabs: [
      { value: "account", label: "Account" },
      { value: "password", label: "Password" },
    ],
    value: "account",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ tabs, value }: Args) =>
    html`<ssb-tabs
      tabs=${JSON.stringify(tabs)}
      value=${value}
      style="width: 24rem;"
    >
      <div slot="account">
        Make changes to your account here. Click save when you are done.
      </div>
      <div slot="password">
        Change your password here. After saving, you will be logged out.
      </div>
    </ssb-tabs>`,
} satisfies StoryObj<Args>

export const WithDisabledTab = {
  render: () =>
    html`<ssb-tabs
      tabs=${JSON.stringify([
        { value: "overview", label: "Overview" },
        { value: "analytics", label: "Analytics" },
        { value: "reports", label: "Reports", disabled: true },
      ])}
      style="width: 24rem;"
    >
      <div slot="overview">A summary of the most important metrics.</div>
      <div slot="analytics">Detailed analytics with charts and filters.</div>
      <div slot="reports">Reports are not available on this plan.</div>
    </ssb-tabs>`,
} satisfies StoryObj<Args>

export const Preselected = {
  render: () =>
    html`<ssb-tabs
      tabs=${JSON.stringify([
        { value: "tab1", label: "Tab 1" },
        { value: "tab2", label: "Tab 2" },
        { value: "tab3", label: "Tab 3" },
      ])}
      value="tab2"
      style="width: 24rem;"
    >
      <div slot="tab1">Content of the first tab.</div>
      <div slot="tab2">The second tab is selected via the value prop.</div>
      <div slot="tab3">Content of the third tab.</div>
    </ssb-tabs>`,
} satisfies StoryObj<Args>
