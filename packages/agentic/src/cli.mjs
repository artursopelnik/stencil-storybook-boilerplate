#!/usr/bin/env node
/**
 * Astryx-style CLI for the design system. Same business logic as the MCP
 * server (src/server.mjs) — both import from src/lib/tools.mjs. Humans get
 * a shell-friendly interface; agents that have `bash` prefer this over MCP
 * (one round-trip, no protocol overhead).
 *
 * Sub-commands:
 *   ssds list                     — list all components
 *   ssds get <tag>                — full API of one component
 *   ssds docs <tag>               — markdown docs incl. examples
 *   ssds examples <tag> [--framework html|react|vue|angular]
 *   ssds tokens [--filter <q>]    — design tokens
 *   ssds search <query>           — free-text search
 *   ssds validate <file|-> [--css <file>]   — validate markup (+CSS)
 *   ssds guidelines               — install & usage rules
 *   ssds manifest                 — self-describing capability manifest
 *   ssds mcp                      — start MCP server on stdio
 *   ssds init [--claude|--cursor|--codex|--copilot] [--mode local|npm]
 *                                 — set up .mcp.json + skill in consumer app
 *   ssds new component <tag>      — scaffold Stencil component + story + MDX
 *
 * Output is JSON by default (pipe to jq); markdown/plain-text commands
 * (docs, guidelines) emit raw text.
 */
import fs from "node:fs"
import { spawn } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

import * as tools from "./lib/tools.mjs"
import { initConsumer, scaffoldComponent } from "./lib/scaffold.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function parseFlags(argv) {
  const positional = []
  const flags = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith("--")) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (next && !next.startsWith("--")) {
        flags[key] = next
        i++
      } else {
        flags[key] = true
      }
    } else {
      positional.push(a)
    }
  }
  return { positional, flags }
}

function print(payload) {
  if (typeof payload === "string") {
    process.stdout.write(payload.endsWith("\n") ? payload : payload + "\n")
  } else {
    process.stdout.write(JSON.stringify(payload, null, 2) + "\n")
  }
}

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = ""
    process.stdin.setEncoding("utf8")
    process.stdin.on("data", (chunk) => (data += chunk))
    process.stdin.on("end", () => resolve(data))
    process.stdin.on("error", reject)
  })
}

async function readInput(source) {
  if (!source || source === "-") return readStdin()
  return fs.readFileSync(source, "utf8")
}

function usage() {
  return [
    "ssds — Stencil Storybook Boilerplate design system CLI",
    "",
    "Usage: ssds <command> [args]",
    "",
    "Commands:",
    "  list                                  List all components",
    "  get <tag>                             Full API of one component",
    "  docs <tag>                            Markdown docs incl. examples",
    "  examples <tag> [--framework <fw>]     Usage examples (html|react|vue|angular)",
    "  tokens [--filter <q>]                 Design tokens (optional filter)",
    "  search <query>                        Free-text search",
    "  validate <file|-> [--css <file>]      Validate markup (+ optional CSS)",
    "  guidelines                            Install & usage rules",
    "  manifest                              Self-describing capability manifest",
    "  mcp                                   Start MCP server on stdio",
    "  init [--claude|--cursor|--codex|--copilot]",
    "                                        Set up .mcp.json + skill in consumer app",
    "  new component <tag>                   Scaffold Stencil component + story + MDX",
    "",
    "Examples:",
    "  ssds list | jq '.[].tag'",
    "  ssds get my-component",
    "  ssds examples my-component --framework react",
    "  echo '<my-component first=\"Ada\" />' | ssds validate -",
    "  ssds init --claude",
    "  ssds new component user-avatar",
  ].join("\n")
}

async function main() {
  const [, , command, ...rest] = process.argv

  if (!command || command === "--help" || command === "-h") {
    print(usage())
    return
  }

  if (command === "mcp") {
    const serverPath = path.join(__dirname, "server.mjs")
    const child = spawn(process.execPath, [serverPath], { stdio: "inherit" })
    child.on("exit", (code) => process.exit(code ?? 0))
    return
  }

  const { positional, flags } = parseFlags(rest)

  // Commands that don't need the manifest (scaffolding / setup) run first,
  // so consumers can `ssds init` before the manifest has ever been generated.
  if (command === "init") {
    const result = initConsumer({
      mode: flags.mode,
      wireClaude: !!flags.claude,
      wireCursor: !!flags.cursor,
      wireCodex: !!flags.codex,
      wireCopilot: !!flags.copilot,
    })
    print(result)
    return
  }

  if (command === "new") {
    const [subject, ...args] = positional
    if (subject !== "component") {
      throw new Error("Usage: ssds new component <tag>")
    }
    const [tag] = args
    if (!tag) throw new Error("Usage: ssds new component <tag>")
    print(scaffoldComponent(tag))
    return
  }

  const manifest = tools.loadManifest()

  switch (command) {
    case "list":
      print(tools.listComponents(manifest))
      break
    case "get": {
      const [tag] = positional
      if (!tag) throw new Error("Usage: ssds get <tag>")
      print(tools.getComponent(manifest, tag))
      break
    }
    case "docs": {
      const [tag] = positional
      if (!tag) throw new Error("Usage: ssds docs <tag>")
      print(tools.getComponentDocs(manifest, tag))
      break
    }
    case "examples": {
      const [tag] = positional
      if (!tag) throw new Error("Usage: ssds examples <tag> [--framework <fw>]")
      print(tools.getExamples(manifest, tag, { framework: flags.framework }))
      break
    }
    case "tokens":
      print(tools.getDesignTokens(manifest, { filter: flags.filter }))
      break
    case "search": {
      const [query] = positional
      if (!query) throw new Error("Usage: ssds search <query>")
      print(tools.search(manifest, query))
      break
    }
    case "validate": {
      const [source] = positional
      const code = await readInput(source)
      const css = flags.css ? fs.readFileSync(flags.css, "utf8") : undefined
      print(tools.validate(manifest, code, { css }))
      break
    }
    case "guidelines":
      print(tools.guidelines(manifest))
      break
    case "manifest":
      print(tools.capabilityManifest(manifest))
      break
    default:
      process.stderr.write(`Unknown command: ${command}\n\n${usage()}\n`)
      process.exit(2)
  }
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`)
  process.exit(1)
})
