/**
 * Scaffolding helpers for `ssds init` (consumer app setup) and
 * `ssds new component` (new Stencil component + story + MDX).
 *
 * Separated from tools.mjs because these touch the filesystem in
 * ways the pure query/validate operations must not (write, symlink).
 */
import fs from "node:fs"
import path from "node:path"

// ── shared helpers ─────────────────────────────────────────────────

export function findMonorepoRoot(startDir = process.cwd()) {
  let dir = path.resolve(startDir)
  while (true) {
    const pkgPath = path.join(dir, "package.json")
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
      const hasCore = fs.existsSync(path.join(dir, "packages/core"))
      const hasStorybook = fs.existsSync(path.join(dir, "packages/storybook"))
      if (
        (pkg.workspaces || fs.existsSync(path.join(dir, "lerna.json"))) &&
        hasCore &&
        hasStorybook
      ) {
        return dir
      }
    }
    const parent = path.dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

export function findConsumerRoot(startDir = process.cwd()) {
  let dir = path.resolve(startDir)
  while (true) {
    if (fs.existsSync(path.join(dir, "package.json"))) return dir
    const parent = path.dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

export function isKebabCase(name) {
  return /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/.test(name)
}

function pascalCase(kebab) {
  return kebab
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("")
}

// ── ssds new component ─────────────────────────────────────────────

export function scaffoldComponent(tag, { root } = {}) {
  if (!isKebabCase(tag)) {
    throw new Error(
      `Invalid tag "${tag}". Custom element tags must be kebab-case with at least one hyphen (e.g. "my-widget", "user-avatar").`,
    )
  }
  const monorepoRoot = root ?? findMonorepoRoot()
  if (!monorepoRoot) {
    throw new Error(
      "ssds new component must be run inside the boilerplate monorepo (needs packages/core and packages/storybook).",
    )
  }
  const className = pascalCase(tag)
  const coreDir = path.join(monorepoRoot, "packages/core/src/components", tag)
  const storyDir = path.join(
    monorepoRoot,
    "packages/storybook/src/stories/components",
    tag,
  )

  const written = []
  const skipped = []

  const files = [
    { path: path.join(coreDir, `${tag}.tsx`), content: tsxTemplate(tag, className) },
    { path: path.join(coreDir, `${tag}.css`), content: cssTemplate() },
    { path: path.join(coreDir, `${tag}.spec.ts`), content: specTemplate(tag, className) },
    { path: path.join(storyDir, `${tag}.stories.ts`), content: storyTemplate(tag, className) },
    { path: path.join(storyDir, `${tag}.mdx`), content: mdxTemplate(tag, className) },
  ]

  for (const file of files) {
    if (fs.existsSync(file.path)) {
      skipped.push(path.relative(monorepoRoot, file.path))
      continue
    }
    fs.mkdirSync(path.dirname(file.path), { recursive: true })
    fs.writeFileSync(file.path, file.content)
    written.push(path.relative(monorepoRoot, file.path))
  }

  return {
    tag,
    className,
    root: monorepoRoot,
    written,
    skipped,
    nextSteps: [
      "npm run build           # regenerates docs.json, wrappers, agentic manifest",
      `npm run storybook       # to see the new component in Storybook`,
      `ssds get ${tag}          # once the manifest picked it up`,
    ],
  }
}

function tsxTemplate(tag, className) {
  return `import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type ${className}AriaAttribute = {
  'aria-label': string;
};

@Component({
  tag: '${tag}',
  styleUrl: '${tag}.css',
  shadow: true,
})
export class ${className} {
  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<${className}AriaAttribute>;

  render() {
    return (
      <Host {...getAriaAttributes(this.aria)}>
        <slot />
      </Host>
    );
  }
}
`
}

function cssTemplate() {
  return `:host {
  display: block;
}
`
}

function specTemplate(tag, className) {
  return `import { newSpecPage } from '@stencil/core/testing';
import { ${className} } from './${tag}';

describe('${tag}', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [${className}],
      html: '<${tag}></${tag}>',
    });
    expect(page.root).toBeTruthy();
  });
});
`
}

function storyTemplate(tag, className) {
  return `import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type { ${className} } from "@stencil-storybook-boilerplate/core/src/components/${tag}/${tag}"

const meta = {
  title: "Components/${className}",
  parameters: {
    layout: "centered",
  },
  args: {
    aria: {
      "aria-label": "Example label",
    },
  },
} satisfies Meta<${className}>

export default meta

export const Default = {
  render: ({ aria }) =>
    html\`<${tag} aria=\${aria ? JSON.stringify(aria) : ""}></${tag}>\`,
} satisfies StoryObj<${className}>
`
}

function mdxTemplate(tag, className) {
  return `import StencilMd from "@stencil-storybook-boilerplate/core/src/components/${tag}/readme.md?raw"
import { Markdown } from "@storybook/addon-docs/blocks"
import { Meta, Title, Canvas } from "@storybook/addon-docs/blocks"
import * as ${className}Stories from "./${tag}.stories"

<Meta of={${className}Stories} />

<Title />

TODO: one-sentence description of what \`${tag}\` does.

## Table of Contents

- [Intent](#intent)
- [Guidelines](#guidelines)
- [Examples](#examples)
- [Properties](#properties)

---

## Intent

TODO: describe when to use this component and when NOT to. This section is parsed into the agentic manifest as \`intent\`.

---

## Guidelines

- **Do** TODO: positive rule (parsed into \`dos\`).
- **Don't** TODO: anti-pattern (parsed into \`donts\`).

---

## Examples

### Default

<Canvas of={${className}Stories.Default} sourceState="none" meta={${className}Stories} withToolbar={false} />

<div className="stencil-props">
  <Markdown>{StencilMd}</Markdown>
</div>
`
}

// ── ssds init ──────────────────────────────────────────────────────

export function initConsumer({
  cwd = process.cwd(),
  mode: forcedMode,
  wireClaude = false,
  wireCursor = false,
  wireCodex = false,
  wireCopilot = false,
} = {}) {
  const consumerRoot = findConsumerRoot(cwd)
  if (!consumerRoot) {
    throw new Error("ssds init must be run inside a project (no package.json found up the tree).")
  }

  const monorepoRoot = findMonorepoRoot(cwd)
  const nodeModulesPkg = path.join(
    consumerRoot,
    "node_modules/@stencil-storybook-boilerplate/agentic",
  )
  const hasNpmInstall = fs.existsSync(nodeModulesPkg)

  let mode = forcedMode
  if (!mode) {
    if (monorepoRoot === consumerRoot) mode = "local"
    else if (hasNpmInstall) mode = "npm"
    else mode = "npm"
  }

  const actions = []

  // 1. .mcp.json
  const mcpPath = path.join(consumerRoot, ".mcp.json")
  const mcpServer =
    mode === "local"
      ? { command: "node", args: ["packages/agentic/src/server.mjs"] }
      : {
          command: "npx",
          args: ["-y", "-p", "@stencil-storybook-boilerplate/agentic", "design-system-mcp"],
        }
  const mcpConfig = { mcpServers: { "design-system": mcpServer } }

  if (fs.existsSync(mcpPath)) {
    const existing = JSON.parse(fs.readFileSync(mcpPath, "utf8"))
    existing.mcpServers = existing.mcpServers || {}
    if (existing.mcpServers["design-system"]) {
      actions.push({ status: "skipped", path: ".mcp.json", reason: "design-system server already registered" })
    } else {
      existing.mcpServers["design-system"] = mcpServer
      fs.writeFileSync(mcpPath, JSON.stringify(existing, null, 2) + "\n")
      actions.push({ status: "merged", path: ".mcp.json" })
    }
  } else {
    fs.writeFileSync(mcpPath, JSON.stringify(mcpConfig, null, 2) + "\n")
    actions.push({ status: "created", path: ".mcp.json" })
  }

  // 2. .agents/skills/ssds/SKILL.md
  const skillDir = path.join(consumerRoot, ".agents/skills/ssds")
  const skillFile = path.join(skillDir, "SKILL.md")

  const skillTarget =
    mode === "local" && monorepoRoot
      ? path.join(monorepoRoot, "packages/agentic/skill/SKILL.md")
      : hasNpmInstall
        ? path.join(nodeModulesPkg, "skill/SKILL.md")
        : null

  if (!skillTarget) {
    actions.push({
      status: "warning",
      path: ".agents/skills/ssds/SKILL.md",
      reason:
        "Cannot resolve skill source — install @stencil-storybook-boilerplate/agentic first, then re-run ssds init.",
    })
  } else if (fs.existsSync(skillFile) || fs.lstatSync(skillFile, { throwIfNoEntry: false })) {
    actions.push({ status: "skipped", path: ".agents/skills/ssds/SKILL.md", reason: "already exists" })
  } else {
    fs.mkdirSync(skillDir, { recursive: true })
    const relTarget = path.relative(skillDir, skillTarget)
    fs.symlinkSync(relTarget, skillFile)
    actions.push({ status: "symlinked", path: ".agents/skills/ssds/SKILL.md", target: relTarget })
  }

  // 3. tool-specific wiring
  if (wireClaude) {
    const claudeDir = path.join(consumerRoot, ".claude/skills")
    fs.mkdirSync(claudeDir, { recursive: true })
    const link = path.join(claudeDir, "ssds")
    if (fs.existsSync(link) || fs.lstatSync(link, { throwIfNoEntry: false })) {
      actions.push({ status: "skipped", path: ".claude/skills/ssds", reason: "already exists" })
    } else {
      fs.symlinkSync("../../.agents/skills/ssds", link)
      actions.push({ status: "symlinked", path: ".claude/skills/ssds" })
    }
  }
  if (wireCursor) {
    const cursorDir = path.join(consumerRoot, ".cursor/rules")
    fs.mkdirSync(cursorDir, { recursive: true })
    const link = path.join(cursorDir, "ssds.mdc")
    if (fs.existsSync(link) || fs.lstatSync(link, { throwIfNoEntry: false })) {
      actions.push({ status: "skipped", path: ".cursor/rules/ssds.mdc", reason: "already exists" })
    } else {
      fs.symlinkSync("../../.agents/skills/ssds/SKILL.md", link)
      actions.push({ status: "symlinked", path: ".cursor/rules/ssds.mdc" })
    }
  }
  if (wireCodex) {
    appendLine(
      path.join(consumerRoot, "AGENTS.md"),
      "Design system: see .agents/skills/ssds/SKILL.md",
      actions,
      "AGENTS.md",
    )
  }
  if (wireCopilot) {
    appendLine(
      path.join(consumerRoot, ".github/copilot-instructions.md"),
      "Design system: see .agents/skills/ssds/SKILL.md",
      actions,
      ".github/copilot-instructions.md",
    )
  }

  return {
    consumerRoot,
    mode,
    actions,
    nextSteps: [
      mode === "npm" && !hasNpmInstall
        ? "npm install -D @stencil-storybook-boilerplate/agentic"
        : null,
      "Restart your MCP-aware agent (Claude Code / Cursor) to pick up .mcp.json.",
      "Verify with: ssds manifest",
    ].filter(Boolean),
  }
}

function appendLine(filePath, line, actions, relPath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8")
    if (content.includes(line)) {
      actions.push({ status: "skipped", path: relPath, reason: "line already present" })
      return
    }
    fs.appendFileSync(filePath, (content.endsWith("\n") ? "" : "\n") + line + "\n")
    actions.push({ status: "appended", path: relPath })
  } else {
    fs.writeFileSync(filePath, line + "\n")
    actions.push({ status: "created", path: relPath })
  }
}
