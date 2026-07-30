import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbScrollArea } from "@stencil-storybook-boilerplate/core/src/components/ssb-scroll-area/ssb-scroll-area"

type Args = SsbScrollArea & { itemCount: number }

const meta = {
  title: "Components/ScrollArea",
  parameters: {
    layout: "centered",
  },
  args: {
    maxHeight: "16rem",
    orientation: "vertical",
    itemCount: 30,
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "both"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ maxHeight, orientation, itemCount }: Args) =>
    html`<ssb-scroll-area
      max-height=${maxHeight}
      orientation=${orientation}
      style="width: 16rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0 1rem;"
    >
      ${Array.from({ length: itemCount }, (_, index) => html`<p style="font-size: 0.875rem;">Tag v1.2.0-beta.${index + 1}</p>`)}
    </ssb-scroll-area>`,
} satisfies StoryObj<Args>

export const Horizontal = {
  render: () =>
    html`<ssb-scroll-area
      orientation="horizontal"
      style="width: 20rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1rem;"
    >
      <div style="display: flex; gap: 0.5rem; width: max-content;">
        ${Array.from(
          { length: 12 },
          (_, index) =>
            html`<div
              style="width: 6rem; height: 4rem; display: flex; align-items: center; justify-content: center; background: #edf2f7; border-radius: 0.5rem; font-size: 0.875rem;"
            >
              Card ${index + 1}
            </div>`,
        )}
      </div>
    </ssb-scroll-area>`,
} satisfies StoryObj<Args>

export const ShortContent = {
  render: () =>
    html`<ssb-scroll-area
      max-height="16rem"
      style="width: 16rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0 1rem;"
    >
      <p style="font-size: 0.875rem;">
        Short content does not scroll — the viewport only grows up to its max
        height.
      </p>
    </ssb-scroll-area>`,
} satisfies StoryObj<Args>
