#!/usr/bin/env node
/**
 * MCP (Model Context Protocol) server for the design system.
 *
 * Thin wrapper around src/lib/tools.mjs — the same pure functions power
 * the CLI (src/cli.mjs). Astryx-style: one interface, two consumers.
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

import * as tools from "./lib/tools.mjs"

const pkg = JSON.parse(
  fs.readFileSync(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../package.json"),
    "utf8",
  ),
)

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

function run(fn) {
  try {
    return text(fn())
  } catch (err) {
    return errorText(err.message)
  }
}

const server = new McpServer({
  name: "stencil-storybook-boilerplate-design-system",
  version: pkg.version,
})

server.registerTool(
  "list_components",
  {
    title: "List components",
    description:
      "Lists all components of the design system with tag names and a short description. Start here to discover what exists.",
    inputSchema: {},
  },
  async () => run(() => tools.listComponents(tools.loadManifest())),
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
  async ({ tag }) => run(() => tools.getComponent(tools.loadManifest(), tag)),
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
  async ({ tag }) => run(() => tools.getComponentDocs(tools.loadManifest(), tag)),
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
  async ({ tag, framework }) =>
    run(() => tools.getExamples(tools.loadManifest(), tag, { framework })),
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
  async ({ filter }) =>
    run(() => tools.getDesignTokens(tools.loadManifest(), { filter })),
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
  async ({ query }) => run(() => tools.search(tools.loadManifest(), query)),
)

server.registerTool(
  "validate_usage",
  {
    title: "Validate generated markup",
    description:
      "Validates HTML markup (and optionally CSS) against the design system manifest: unknown components, invented or misspelled attributes, missing required props, invalid `aria` JSON, unknown design tokens and hard-coded colors. ALWAYS run this on generated UI code before presenting it — fix every error, consider every warning.",
    inputSchema: {
      code: z
        .string()
        .describe("HTML markup that uses design system components"),
      css: z
        .string()
        .optional()
        .describe(
          "Optional CSS to check var(--token) usage against the design tokens",
        ),
    },
  },
  async ({ code, css }) =>
    run(() => tools.validate(tools.loadManifest(), code, { css })),
)

server.registerTool(
  "get_usage_guidelines",
  {
    title: "Get setup & usage guidelines",
    description:
      "Explains how to install and use the design system in a project (vanilla JS, React, Vue, Angular, SSR/Next.js) and how theming with design tokens works.",
    inputSchema: {},
  },
  async () => run(() => tools.guidelines(tools.loadManifest())),
)

server.registerTool(
  "manifest",
  {
    title: "Capability manifest",
    description:
      "Self-describing capability manifest: what this MCP server / CLI can do, plus a compact summary of the design system (component count, token count, homepage). Use this once at session start to discover what tools are available without hard-coding names.",
    inputSchema: {},
  },
  async () => run(() => tools.capabilityManifest(tools.loadManifest())),
)

const transport = new StdioServerTransport()
await server.connect(transport)
console.error("Design system MCP server running on stdio")
