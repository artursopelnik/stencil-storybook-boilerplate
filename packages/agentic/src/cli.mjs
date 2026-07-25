#!/usr/bin/env node
/**
 * CLI for usage validation — the same harness as the MCP `validate_usage`
 * tool, but callable from a shell (agents without MCP support, git hooks, CI).
 *
 * Usage:
 *   node packages/agentic/src/cli.mjs <file...>   validate HTML/JS markup and CSS files
 *   node packages/agentic/src/cli.mjs --stdin     validate markup from stdin
 *   ... --json                                    machine-readable report
 *
 * Exits 1 when any file has validation errors (warnings alone pass).
 * Prerequisite: `npm run build` at the repo root so dist/manifest.json exists.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { validateUsage } from "./validate.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MANIFEST_PATH = path.resolve(__dirname, "../dist/manifest.json")

function fail(message) {
  console.error(message)
  process.exit(2)
}

const args = process.argv.slice(2)
const json = args.includes("--json")
const useStdin = args.includes("--stdin")
const files = args.filter((arg) => !arg.startsWith("--"))

if (!useStdin && files.length === 0) {
  fail(
    "Usage: design-system-validate [--json] <file...> | --stdin\n" +
      "Validates design-system markup (any text file) and CSS against the AI manifest.",
  )
}

if (!fs.existsSync(MANIFEST_PATH)) {
  fail(
    `manifest.json not found at ${MANIFEST_PATH}. Run "npm run build" at the repo root first.`,
  )
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))

const sources = files.map((file) => {
  if (!fs.existsSync(file)) fail(`File not found: ${file}`)
  return { file, content: fs.readFileSync(file, "utf8") }
})
if (useStdin) {
  sources.push({ file: "(stdin)", content: fs.readFileSync(0, "utf8") })
}

const reports = sources.map(({ file, content }) => {
  const isCss = file.endsWith(".css")
  const result = isCss
    ? validateUsage(manifest, "", { css: content })
    : validateUsage(manifest, content)
  return { file, ...result }
})

if (json) {
  console.log(JSON.stringify(reports, null, 2))
} else {
  for (const report of reports) {
    const status = report.valid ? "✔" : "✖"
    const counts = `${report.errors.length} error(s), ${report.warnings.length} warning(s)`
    const components = report.checkedComponents.length
      ? ` [${report.checkedComponents.join(", ")}]`
      : ""
    console.log(`${status} ${report.file} — ${counts}${components}`)
    for (const error of report.errors) console.log(`  error: ${error}`)
    for (const warning of report.warnings) console.log(`  warning: ${warning}`)
    for (const [tag, rules] of Object.entries(report.reminders)) {
      for (const rule of rules) console.log(`  reminder <${tag}>: ${rule}`)
    }
  }
}

process.exit(reports.some((report) => !report.valid) ? 1 : 0)
