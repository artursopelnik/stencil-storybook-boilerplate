import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbAvatar } from "@stencil-storybook-boilerplate/core/src/components/ssb-avatar/ssb-avatar"

type Args = SsbAvatar

const meta = {
  title: "Components/Avatar",
  parameters: {
    layout: "centered",
  },
  args: {
    src: "https://i.pravatar.cc/128?img=5",
    alt: "Jane Doe",
    initials: "JD",
    shape: "circle",
    size: "md",
  },
  argTypes: {
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ src, alt, initials, shape, size }: Args) =>
    html`<ssb-avatar
      src=${src}
      alt=${alt}
      initials=${initials}
      shape=${shape}
      size=${size}
    ></ssb-avatar>`,
} satisfies StoryObj<Args>

export const Fallback = {
  render: () =>
    html`<div style="display: flex; gap: 0.5rem; align-items: center;">
      <ssb-avatar initials="JD" alt="Jane Doe"></ssb-avatar>
      <ssb-avatar initials="AB" alt="Alex Brown" shape="square"></ssb-avatar>
      <ssb-avatar
        src="https://example.invalid/broken.png"
        initials="KO"
        alt="Kim Ono"
      ></ssb-avatar>
    </div>`,
} satisfies StoryObj<Args>

export const Sizes = {
  render: () =>
    html`<div style="display: flex; gap: 0.5rem; align-items: center;">
      <ssb-avatar size="sm" initials="SM" alt="Small avatar"></ssb-avatar>
      <ssb-avatar size="md" initials="MD" alt="Medium avatar"></ssb-avatar>
      <ssb-avatar size="lg" initials="LG" alt="Large avatar"></ssb-avatar>
    </div>`,
} satisfies StoryObj<Args>
