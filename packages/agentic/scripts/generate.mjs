#!/usr/bin/env node
/**
 * AI / Agentic Design System Readiness generator.
 *
 * Combines three sources into one machine-readable component manifest:
 *   1. Stencil `docs-json` output    → component API (props, events, methods, slots, CSS)
 *   2. Storybook CSF stories + MDX   → usage examples and human-written descriptions
 *   3. Design tokens (DTCG)          → theming data
 *
 * Outputs (into dist/):
 *   - manifest.json          structured data per component, for tools & the MCP server
 *   - components/<tag>.md    agent-friendly markdown per component
 *   - design-tokens.md       flattened token table
 *   - llms.txt               index file following https://llmstxt.org
 *   - llms-full.txt          full documentation in one file
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { loadStencilDocs } from "./lib/stencil-docs.mjs"
import { extractStories } from "./lib/stories.mjs"
import { loadDesignTokens } from "./lib/tokens.mjs"
import { frameworkExamples } from "./lib/examples.mjs"
import { extractMdxDocs } from "./lib/mdx.mjs"
import {
  componentMarkdown,
  tokensMarkdown,
  llmsTxt,
  llmsFullTxt,
} from "./lib/markdown.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, "../../..")

const DOCS_JSON = path.join(repoRoot, "packages/core/dist/docs.json")
const STORIES_DIR = path.join(repoRoot, "packages/storybook/src/stories")
const TOKENS_JSON = path.join(
  repoRoot,
  "packages/design-tokens/tokens/tokens.json",
)
const OUT_DIR = path.join(repoRoot, "packages/agentic/dist")

const SITE_URL =
  "https://artursopelnik.github.io/stencil-storybook-boilerplate/"

function storyUrl(title, storyName) {
  const id = `${title.replace(/\//g, "-")}--${storyName}`
    .toLowerCase()
    .replace(/\s+/g, "-")
  return `${SITE_URL}?path=/story/${id}`
}

function main() {
  const stencilDocs = loadStencilDocs(DOCS_JSON)
  const storiesByTag = extractStories(STORIES_DIR)
  const tokens = loadDesignTokens(TOKENS_JSON)

  const components = stencilDocs.components.map((component) => {
    const storyData = storiesByTag[component.tag]
    const mdxDocs = extractMdxDocs(STORIES_DIR, storyData?.file)

    const examples = (storyData?.stories ?? []).map((story) => ({
      name: story.name,
      html: story.html,
      ...frameworkExamples(component, story.args),
    }))

    return {
      ...component,
      description: mdxDocs.description || component.description,
      intent: mdxDocs.intent,
      guidelines: mdxDocs.guidelines,
      dos: mdxDocs.dos ?? [],
      donts: mdxDocs.donts ?? [],
      examples,
      storybook: storyData
        ? {
            title: storyData.title,
            url: storyUrl(storyData.title, examples[0]?.name ?? "default"),
          }
        : null,
      docsPath: `components/${component.tag}.md`,
    }
  })

  const manifest = {
    $schema: "./manifest.schema.json",
    name: "Stencil Storybook Boilerplate Design System",
    description:
      "A design system boilerplate built with Stencil web components, Storybook docs and DTCG design tokens, with wrappers for React, Vue and Angular.",
    homepage: SITE_URL,
    repository:
      "https://github.com/artursopelnik/stencil-storybook-boilerplate",
    generatedWith: { stencilCompiler: stencilDocs.compiler?.version },
    components,
    designTokens: tokens,
  }

  fs.rmSync(OUT_DIR, { recursive: true, force: true })
  fs.mkdirSync(path.join(OUT_DIR, "components"), { recursive: true })

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  )

  const componentMarkdowns = []
  for (const component of components) {
    const md = componentMarkdown(component)
    componentMarkdowns.push(md)
    fs.writeFileSync(path.join(OUT_DIR, component.docsPath), md)
  }

  const tokensMd = tokensMarkdown(tokens)
  fs.writeFileSync(path.join(OUT_DIR, "design-tokens.md"), tokensMd)
  fs.writeFileSync(
    path.join(OUT_DIR, "llms.txt"),
    llmsTxt(manifest, { siteUrl: SITE_URL }),
  )
  fs.writeFileSync(
    path.join(OUT_DIR, "llms-full.txt"),
    llmsFullTxt(manifest, componentMarkdowns, tokensMd),
  )

  console.log(
    `✔ AI manifest generated: ${components.length} component(s), ${tokens.length} design token(s) → ${path.relative(repoRoot, OUT_DIR)}/`,
  )
}

main()
