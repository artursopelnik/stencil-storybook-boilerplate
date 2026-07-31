import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbChart } from "@stencil-storybook-boilerplate/core/src/components/ssb-chart/ssb-chart"

type Args = SsbChart

const MONTHLY = [
  { label: "Jan", value: 186 },
  { label: "Feb", value: 305 },
  { label: "Mar", value: 237 },
  { label: "Apr", value: 73 },
  { label: "May", value: 209 },
  { label: "Jun", value: 214 },
]

const meta = {
  title: "Components/Chart",
  parameters: {
    layout: "centered",
  },
  args: {
    type: "bar",
    showGrid: true,
    showLabels: true,
    accent: false,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["bar", "line", "area"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ type, showGrid, showLabels, accent }: Args) =>
    html`<div style="width: 36rem;">
      <ssb-chart
        .data=${MONTHLY}
        type=${type}
        ?show-grid=${showGrid}
        ?show-labels=${showLabels}
        ?accent=${accent}
      ></ssb-chart>
    </div>`,
} satisfies StoryObj<Args>

export const Line = {
  render: () =>
    html`<div style="width: 36rem;">
      <ssb-chart .data=${MONTHLY} type="line" ?accent=${true}></ssb-chart>
    </div>`,
} satisfies StoryObj<Args>

export const Area = {
  render: () =>
    html`<div style="width: 36rem;">
      <ssb-chart
        .data=${MONTHLY}
        type="area"
        ?accent=${true}
        chart-height="12rem"
      ></ssb-chart>
    </div>`,
} satisfies StoryObj<Args>
