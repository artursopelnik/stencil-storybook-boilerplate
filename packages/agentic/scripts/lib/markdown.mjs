/**
 * Renders the structured component data into agent-friendly markdown,
 * plus the llms.txt / llms-full.txt index files (see https://llmstxt.org).
 */

export function componentMarkdown(component) {
  const lines = []

  lines.push("---")
  lines.push(`tag: ${component.tag}`)
  lines.push(`title: ${component.storybook?.title ?? component.tag}`)
  lines.push("---")
  lines.push("")
  lines.push(`# \`<${component.tag}>\``)
  lines.push("")
  if (component.description) lines.push(component.description, "")
  if (component.deprecated)
    lines.push(`> ⚠️ **Deprecated**: ${component.deprecated}`, "")

  if (component.intent) {
    lines.push("## Intent", "", component.intent, "")
  }

  if (component.examples?.length) {
    lines.push("## Usage")
    for (const example of component.examples) {
      lines.push("", `### ${example.name}`, "")
      lines.push("#### HTML / Vanilla JS", "", "```html", example.html, "```")
      if (example.react)
        lines.push("", "#### React", "", "```tsx", example.react, "```")
      if (example.vue)
        lines.push("", "#### Vue", "", "```html", example.vue, "```")
      if (example.angular)
        lines.push("", "#### Angular", "", "```html", example.angular, "```")
    }
    lines.push("")
  }

  if (component.props?.length) {
    lines.push("## Properties", "")
    lines.push(
      "| Property | Attribute | Description | Type | Required | Default |",
    )
    lines.push("| --- | --- | --- | --- | --- | --- |")
    for (const p of component.props) {
      lines.push(
        `| \`${p.name}\` | ${p.attribute ? `\`${p.attribute}\`` : "—"} | ${cell(p.description)} | ${cell(code(p.type))} | ${p.required ? "yes" : "no"} | ${p.default != null ? code(p.default) : "—"} |`,
      )
    }
    lines.push("")
  }

  if (component.events?.length) {
    lines.push("## Events", "")
    lines.push("| Event | Description | Detail | Bubbles |")
    lines.push("| --- | --- | --- | --- |")
    for (const e of component.events) {
      lines.push(
        `| \`${e.name}\` | ${cell(e.description)} | ${cell(code(e.detailType))} | ${e.bubbles ? "yes" : "no"} |`,
      )
    }
    lines.push("")
  }

  if (component.methods?.length) {
    lines.push("## Methods", "")
    for (const m of component.methods) {
      lines.push(
        `- \`${m.signature}\`${m.description ? ` — ${m.description}` : ""}`,
      )
    }
    lines.push("")
  }

  if (component.slots?.length) {
    lines.push("## Slots", "")
    for (const s of component.slots) {
      lines.push(`- \`${s.name}\`${s.description ? ` — ${s.description}` : ""}`)
    }
    lines.push("")
  }

  if (component.cssProperties?.length) {
    lines.push("## CSS Custom Properties", "")
    for (const c of component.cssProperties) {
      lines.push(`- \`${c.name}\`${c.description ? ` — ${c.description}` : ""}`)
    }
    lines.push("")
  }

  if (component.guidelines) {
    lines.push("## Guidelines", "", component.guidelines, "")
  }

  if (component.storybook?.url) {
    lines.push(
      `> Interactive demos: [Storybook → ${component.storybook.title}](${component.storybook.url})`,
      "",
    )
  }

  return lines.join("\n")
}

export function tokensMarkdown(tokens) {
  const lines = ["# Design Tokens", ""]
  lines.push(
    "Design tokens of this design system ([DTCG format](https://styledictionary.com/info/dtcg/)), consumable as CSS custom properties. Themes: `light` and `dark`.",
    "",
  )
  lines.push("| Token | CSS Variable | Type | Value |")
  lines.push("| --- | --- | --- | --- |")
  for (const t of tokens) {
    lines.push(
      `| \`${t.name}\` | \`${t.cssVariable}\` | ${t.type ?? "—"} | \`${String(t.value)}\` |`,
    )
  }
  lines.push("")
  return lines.join("\n")
}

export function llmsTxt(manifest, { siteUrl }) {
  const lines = [`# ${manifest.name}`, ""]
  lines.push(`> ${manifest.description}`, "")
  lines.push(
    "Web components built with Stencil, documented in Storybook, themable via design tokens. Framework wrappers exist for React, Vue and Angular. Machine-readable API data: [manifest.json](ai/manifest.json). An MCP server is available, see [Agentic readme](https://github.com/artursopelnik/stencil-storybook-boilerplate/tree/main/packages/agentic).",
    "",
  )
  lines.push("## Components", "")
  for (const cmp of manifest.components) {
    const description = (cmp.description || "").split("\n")[0]
    lines.push(
      `- [${cmp.tag}](ai/components/${cmp.tag}.md)${description ? `: ${description}` : ""}`,
    )
  }
  lines.push("", "## Design Tokens", "")
  lines.push(
    "- [Design tokens](ai/design-tokens.md): colors, sizes and semantic aliases (light & dark themes)",
  )
  if (siteUrl) {
    lines.push("", "## Optional", "")
    lines.push(
      `- [Storybook](${siteUrl}): interactive component demos and docs`,
    )
  }
  lines.push("")
  return lines.join("\n")
}

export function llmsFullTxt(manifest, componentMarkdowns, tokensMd) {
  const parts = [
    `# ${manifest.name} — full documentation for LLMs`,
    "",
    `> ${manifest.description}`,
    "",
  ]
  for (const md of componentMarkdowns) parts.push(md, "", "---", "")
  parts.push(tokensMd, "")
  return parts.join("\n")
}

function cell(text) {
  return (text ?? "").replace(/\r?\n/g, " ").replace(/\|/g, "\\|") || "—"
}

function code(text) {
  return text != null && text !== "" ? `\`${text}\`` : ""
}
