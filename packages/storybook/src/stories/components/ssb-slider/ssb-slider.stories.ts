import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbSlider } from "@stencil-storybook-boilerplate/core/src/components/ssb-slider/ssb-slider"

type Args = SsbSlider

const meta = {
  title: "Components/Slider",
  parameters: {
    layout: "centered",
  },
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    showValue: false,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ value, min, max, step, disabled, showValue }: Args) =>
    html`<div style="width: 320px;">
      <ssb-slider
        value=${value}
        min=${min}
        max=${max}
        step=${step}
        ?disabled=${disabled}
        ?show-value=${showValue}
        aria=${JSON.stringify({ "aria-label": "Volume" })}
      ></ssb-slider>
    </div>`,
} satisfies StoryObj<Args>

export const WithValue = {
  render: () =>
    html`<div style="width: 320px;">
      <ssb-slider
        value="30"
        ?show-value=${true}
        aria=${JSON.stringify({ "aria-label": "Opacity" })}
      ></ssb-slider>
    </div>`,
} satisfies StoryObj<Args>

export const Steps = {
  render: () =>
    html`<div style="width: 320px;">
      <ssb-slider
        value="40"
        step="10"
        ?show-value=${true}
        aria=${JSON.stringify({ "aria-label": "Zoom" })}
      ></ssb-slider>
    </div>`,
} satisfies StoryObj<Args>

export const Disabled = {
  render: () =>
    html`<div style="width: 320px;">
      <ssb-slider
        value="60"
        ?disabled=${true}
        aria=${JSON.stringify({ "aria-label": "Volume" })}
      ></ssb-slider>
    </div>`,
} satisfies StoryObj<Args>
