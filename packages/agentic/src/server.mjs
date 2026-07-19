#!/usr/bin/env node
/**
 * MCP (Model Context Protocol) server for the design system.
 *
 * Exposes the generated AI manifest (dist/manifest.json) to AI coding agents
 * like Claude Code, Cursor or Copilot via stdio. See the package readme for
 * client configuration.
 *
 * Prerequisite: `npm run build` (root) or `npm run build -w packages/agentic`
 * so that dist/manifest.json exists.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, "../dist")
const MANIFEST_PATH = path.join(DIST_DIR, "manifest.json")

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(
      `manifest.json not found at ${MANIFEST_PATH}. ` +
        'Run "npm run build" at the repo root (or "npm run build -w packages/agentic") first.',
    )
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
}

function text(payload) {
  return {
    content: [
      {
        type: "text",
        text:
          typeof payload === "string"
            ? payload
            : JSON.stringify(payload, null, 2),
      },
    ],
  }
}

function errorText(message) {
  return { isError: true, content: [{ type: "text", text: message }] }
}

function findComponent(manifest, tag) {
  const normalized = tag
    .trim()
    .toLowerCase()
    .replace(/^</, "")
    .replace(/>$/, "")
  return manifest.components.find((c) => c.tag === normalized)
}

const server = new McpServer({
  name: "stencil-storybook-boilerplate-design-system",
  version: "0.0.1",
})

server.registerTool(
  "list_components",
  {
    title: "List components",
    description:
      "Lists all components of the design system with tag names and a short description. Start here to discover what exists.",
    inputSchema: {},
  },
  async () => {
    const manifest = loadManifest()
    return text(
      manifest.components.map((c) => ({
        tag: c.tag,
        description: (c.description || "").split("\n")[0],
        storybook: c.storybook?.url,
      })),
    )
  },
)

server.registerTool(
  "get_component",
  {
    title: "Get component API",
    description:
      'Returns the full structured API of one component: props/attributes, events, methods, slots, CSS custom properties, CSS parts and usage examples. Use the exact tag name from list_components (e.g. "my-component").',
    inputSchema: {
      tag: z.string().describe('Custom element tag name, e.g. "my-component"'),
    },
  },
  async ({ tag }) => {
    const manifest = loadManifest()
    const component = findComponent(manifest, tag)
    if (!component) {
      return errorText(
        `Unknown component "${tag}". Available: ${manifest.components.map((c) => c.tag).join(", ")}`,
      )
    }
    return text(component)
  },
)

server.registerTool(
  "get_component_docs",
  {
    title: "Get component docs (markdown)",
    description:
      "Returns the agent-friendly markdown documentation of one component, including usage examples for HTML, React, Vue and Angular.",
    inputSchema: {
      tag: z.string().describe('Custom element tag name, e.g. "my-component"'),
    },
  },
  async ({ tag }) => {
    const manifest = loadManifest()
    const component = findComponent(manifest, tag)
    if (!component) {
      return errorText(
        `Unknown component "${tag}". Available: ${manifest.components.map((c) => c.tag).join(", ")}`,
      )
    }
    const mdPath = path.join(DIST_DIR, component.docsPath)
    return text(fs.readFileSync(mdPath, "utf8"))
  },
)

server.registerTool(
  "get_examples",
  {
    title: "Get usage examples",
    description:
      'Returns copy-paste-ready usage examples for one component, extracted from its Storybook stories. Optionally filtered by framework ("html", "react", "vue", "angular").',
    inputSchema: {
      tag: z.string().describe('Custom element tag name, e.g. "my-component"'),
      framework: z
        .enum(["html", "react", "vue", "angular"])
        .optional()
        .describe("Only return snippets for this framework"),
    },
  },
  async ({ tag, framework }) => {
    const manifest = loadManifest()
    const component = findComponent(manifest, tag)
    if (!component) {
      return errorText(
        `Unknown component "${tag}". Available: ${manifest.components.map((c) => c.tag).join(", ")}`,
      )
    }
    const examples = (component.examples ?? []).map((example) =>
      framework
        ? { name: example.name, [framework]: example[framework] }
        : example,
    )
    return text({
      tag: component.tag,
      storybook: component.storybook?.url,
      examples,
    })
  },
)

server.registerTool(
  "get_design_tokens",
  {
    title: "Get design tokens",
    description:
      'Returns the design tokens (DTCG) of the design system as CSS variables with resolved values. Optionally filtered by a substring, e.g. "color", "purple" or "spacing".',
    inputSchema: {
      filter: z
        .string()
        .optional()
        .describe("Case-insensitive substring filter on token name"),
    },
  },
  async ({ filter }) => {
    const manifest = loadManifest()
    let tokens = manifest.designTokens ?? []
    if (filter) {
      const query = filter.toLowerCase()
      tokens = tokens.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.cssVariable.toLowerCase().includes(query),
      )
    }
    return text(tokens)
  },
)

server.registerTool(
  "search",
  {
    title: "Search the design system",
    description:
      "Free-text search across component names, descriptions, props, events and design tokens. Returns matching components and tokens.",
    inputSchema: {
      query: z
        .string()
        .describe('Search term, e.g. "aria", "click" or "purple"'),
    },
  },
  async ({ query }) => {
    const manifest = loadManifest()
    const q = query.toLowerCase()

    const components = manifest.components
      .map((c) => {
        const matches = []
        if (
          c.tag.includes(q) ||
          (c.description || "").toLowerCase().includes(q)
        )
          matches.push("component")
        for (const p of c.props ?? []) {
          if (
            p.name.toLowerCase().includes(q) ||
            (p.description || "").toLowerCase().includes(q)
          ) {
            matches.push(`prop:${p.name}`)
          }
        }
        for (const e of c.events ?? []) {
          if (
            e.name.toLowerCase().includes(q) ||
            (e.description || "").toLowerCase().includes(q)
          ) {
            matches.push(`event:${e.name}`)
          }
        }
        return matches.length ? { tag: c.tag, matches } : null
      })
      .filter(Boolean)

    const tokens = (manifest.designTokens ?? []).filter((t) =>
      t.name.toLowerCase().includes(q),
    )

    return text({ components, designTokens: tokens.map((t) => t.name) })
  },
)

server.registerTool(
  "get_usage_guidelines",
  {
    title: "Get setup & usage guidelines",
    description:
      "Explains how to install and use the design system in a project (vanilla JS, React, Vue, Angular, SSR/Next.js) and how theming with design tokens works.",
    inputSchema: {},
  },
  async () => {
    const manifest = loadManifest()
    return text(
      [
        `# Using ${manifest.name}`,
        "",
        "## Packages",
        "- `@stencil-storybook-boilerplate/core` — the web components (Stencil). Import the loader or use `dist-custom-elements`.",
        "- `@stencil-storybook-boilerplate/react`, `/vue`, `/angular` — framework wrappers generated by Stencil output targets.",
        "- `@stencil-storybook-boilerplate/design-tokens` — DTCG tokens compiled with Style Dictionary (light & dark themes as CSS files).",
        "",
        "## Rules for generated code",
        "- Prefer the framework wrapper components over raw custom elements in React/Vue/Angular apps.",
        "- The React wrappers support SSR with the Next.js App Router (hydrate module).",
        "- Set ARIA attributes via the `aria` prop (JSON string or object) where a component exposes it.",
        "- Use design tokens (CSS custom properties) instead of hard-coded colors/sizes. Themes: `themes/light.css`, `themes/dark.css`.",
        "- Consult `get_component` for exact prop names/types before writing code; do not invent props.",
        "",
        `Storybook: ${manifest.homepage}`,
        `Repository: ${manifest.repository}`,
      ].join("\n"),
    )
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)
console.error("Design system MCP server running on stdio")
