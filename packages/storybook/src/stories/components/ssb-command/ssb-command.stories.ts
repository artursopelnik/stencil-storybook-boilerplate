import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { SsbCommand } from "@stencil-storybook-boilerplate/core/src/components/ssb-command/ssb-command"

type Args = SsbCommand

const COMMANDS = [
  { label: "Calendar", value: "calendar", group: "Suggestions" },
  { label: "Search Emoji", value: "emoji", group: "Suggestions" },
  {
    label: "Calculator",
    value: "calculator",
    group: "Suggestions",
    disabled: true,
  },
  { label: "Profile", value: "profile", group: "Settings", shortcut: "⌘P" },
  { label: "Billing", value: "billing", group: "Settings", shortcut: "⌘B" },
  { label: "Settings", value: "settings", group: "Settings", shortcut: "⌘S" },
]

const meta = {
  title: "Components/Command",
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Type a command or search…",
    emptyMessage: "No results found.",
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ placeholder, emptyMessage }: Args) =>
    html`<div style="width: 28rem;">
      <ssb-command
        .items=${COMMANDS}
        placeholder=${placeholder}
        empty-message=${emptyMessage}
      ></ssb-command>
    </div>`,
} satisfies StoryObj<Args>

export const Ungrouped = {
  render: () =>
    html`<div style="width: 28rem;">
      <ssb-command
        .items=${[
          { label: "New file", value: "new-file", shortcut: "⌘N" },
          { label: "Open recent", value: "open-recent" },
          { label: "Save all", value: "save-all", shortcut: "⌥⌘S" },
        ]}
      ></ssb-command>
    </div>`,
} satisfies StoryObj<Args>
