import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbSkeleton } from "@stencil-storybook-boilerplate/core/src/components/ssb-skeleton/ssb-skeleton"

type Args = SsbSkeleton

const meta = {
  title: "Components/Skeleton",
  parameters: {
    layout: "centered",
  },
  args: {
    width: "16rem",
    height: "1rem",
    rounded: "medium",
  },
  argTypes: {
    rounded: {
      control: "select",
      options: ["small", "medium", "large", "full"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ width, height, rounded }) => html`<ssb-skeleton width=${width} height=${height} rounded=${rounded}></ssb-skeleton>`,
} satisfies StoryObj<Args>

export const CardPlaceholder = {
  render: () =>
    html`<div style="display: flex; flex-direction: column; gap: 0.5rem; width: 16rem;">
      <ssb-skeleton height="8rem" rounded="large"></ssb-skeleton>
      <ssb-skeleton width="75%"></ssb-skeleton>
      <ssb-skeleton width="50%"></ssb-skeleton>
    </div>`,
} satisfies StoryObj<Args>

export const AvatarPlaceholder = {
  render: () =>
    html`<div style="display: flex; gap: 0.75rem; align-items: center; width: 16rem;">
      <ssb-skeleton width="2.5rem" height="2.5rem" rounded="full" style="flex-shrink: 0;"></ssb-skeleton>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; flex: 1;">
        <ssb-skeleton width="60%" height="0.75rem"></ssb-skeleton>
        <ssb-skeleton width="40%" height="0.75rem"></ssb-skeleton>
      </div>
    </div>`,
} satisfies StoryObj<Args>
