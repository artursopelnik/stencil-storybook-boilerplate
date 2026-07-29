import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

// Printable sentinels used to mark parts of the substituted HTML for later
// post-processing in cleanupHtml. Kept out of the final output.
const REMOVE = "__SSDS_REMOVE__"
const RAW_START = "__SSDS_RAW_START__"
const RAW_END = "__SSDS_RAW_END__"

/**
 * Extracts usage examples from Storybook CSF3 files (*.stories.ts).
 *
 * Supported patterns (as used in this boilerplate):
 * - `const meta = { title, args, ... } satisfies Meta<...>` + `export default meta`
 * - `export const StoryName = { args?, render: (args) => html`...` } satisfies StoryObj<...>`
 * - lit templates with `${prop}`, `${prop || nothing}`, `.prop=${...}`, `?attr=${...}` and `@event=${...}` bindings
 *
 * Returns a map keyed by custom element tag:
 * { [tag]: { title, file, stories: [{ name, args, html }] } }
 */
export function extractStories(storiesRootDir) {
  const files = collectStoryFiles(storiesRootDir)
  const byTag = {}

  for (const file of files) {
    const parsed = parseStoriesFile(file)
    if (!parsed) continue

    for (const story of parsed.stories) {
      const tag = story.tag
      if (!tag) continue
      byTag[tag] ??= {
        title: parsed.title,
        file: path.relative(storiesRootDir, file),
        stories: [],
      }
      byTag[tag].stories.push({
        name: story.name,
        args: story.args,
        html: story.html,
      })
    }
  }

  return byTag
}

function collectStoryFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...collectStoryFiles(full))
    else if (/\.stories\.(ts|tsx|js|jsx|mjs)$/.test(entry.name)) out.push(full)
  }
  return out
}

function parseStoriesFile(file) {
  const source = fs.readFileSync(file, "utf8")
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)

  // Two passes so meta args merge into stories regardless of source order.
  let title
  let metaArgs = {}
  const storyDeclarations = []

  for (const statement of sf.statements) {
    if (!ts.isVariableStatement(statement)) continue

    for (const decl of statement.declarationList.declarations) {
      if (!decl.initializer || !ts.isIdentifier(decl.name)) continue
      const objectLiteral = unwrapExpression(decl.initializer)
      if (!ts.isObjectLiteralExpression(objectLiteral)) continue

      const varName = decl.name.text
      const properties = objectLiteralToMap(objectLiteral)

      if (varName === "meta" || properties.has("title")) {
        const titleNode = properties.get("title")
        if (titleNode && ts.isStringLiteralLike(titleNode))
          title = titleNode.text
        const argsNode = properties.get("args")
        if (argsNode) metaArgs = literalToJs(argsNode) ?? {}
        continue
      }

      const isExported = statement.modifiers?.some(
        (m) => m.kind === ts.SyntaxKind.ExportKeyword,
      )
      if (!isExported) continue

      storyDeclarations.push({ varName, properties })
    }
  }

  const stories = []
  for (const { varName, properties } of storyDeclarations) {
    const storyArgs = properties.has("args")
      ? (literalToJs(properties.get("args")) ?? {})
      : {}
    const mergedArgs = { ...metaArgs, ...storyArgs }
    const renderNode = properties.get("render")
    const template = renderNode ? extractLitTemplate(renderNode) : null
    if (!template) continue

    const html = renderTemplate(template, mergedArgs)
    stories.push({
      name: varName,
      args: mergedArgs,
      html,
      tag: firstCustomElementTag(html),
    })
  }

  return { title, stories }
}

/** Unwraps `expr satisfies X` / `expr as X` / parentheses. */
function unwrapExpression(node) {
  while (
    ts.isSatisfiesExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isParenthesizedExpression(node)
  ) {
    node = node.expression
  }
  return node
}

function objectLiteralToMap(objectLiteral) {
  const map = new Map()
  for (const prop of objectLiteral.properties) {
    if (ts.isPropertyAssignment(prop)) {
      const name =
        ts.isIdentifier(prop.name) || ts.isStringLiteralLike(prop.name)
          ? prop.name.text
          : undefined
      if (name) map.set(name, unwrapExpression(prop.initializer))
    }
  }
  return map
}

/** Converts a literal AST node into a plain JS value (non-literals become undefined). */
function literalToJs(node) {
  node = unwrapExpression(node)
  if (ts.isStringLiteralLike(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null
  if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) {
    return node.operator === ts.SyntaxKind.MinusToken
      ? -Number(node.operand.text)
      : Number(node.operand.text)
  }
  if (ts.isObjectLiteralExpression(node)) {
    const obj = {}
    for (const [key, value] of objectLiteralToMap(node)) {
      const jsValue = literalToJs(value)
      if (jsValue !== undefined) obj[key] = jsValue
    }
    return obj
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements
      .map((el) => literalToJs(el))
      .filter((v) => v !== undefined)
  }
  return undefined
}

/** Finds the first `html\`...\`` tagged template inside a render function. */
function extractLitTemplate(renderNode) {
  let template = null

  const visit = (node) => {
    if (template) return
    if (
      ts.isTaggedTemplateExpression(node) &&
      ts.isIdentifier(node.tag) &&
      node.tag.text === "html"
    ) {
      template = taggedTemplateToParts(node)
      return
    }
    ts.forEachChild(node, visit)
  }
  visit(renderNode)

  return template
}

/** Returns interleaved parts: strings and { expr } placeholders. */
function taggedTemplateToParts(tagged) {
  const tpl = tagged.template
  if (ts.isNoSubstitutionTemplateLiteral(tpl)) return [tpl.text]

  const parts = [tpl.head.text]
  for (const span of tpl.templateSpans) {
    parts.push({ expr: span.expression.getText() })
    parts.push(span.literal.text)
  }
  return parts
}

/**
 * Substitutes story args into the lit template parts and normalizes the
 * result into framework-neutral, plain HTML.
 */
function renderTemplate(parts, args) {
  let html = ""
  for (const part of parts) {
    if (typeof part === "string") {
      html += part
      continue
    }
    const resolved = resolvePlaceholder(part.expr, args)
    // lit templates allow unquoted bindings (`first=${first}`) — quote them in plain HTML
    if (
      html.endsWith("=") &&
      resolved !== REMOVE &&
      !resolved.startsWith(RAW_START)
    ) {
      html += `"${resolved}"`
    } else {
      html += resolved
    }
  }
  return cleanupHtml(html)
}

function resolvePlaceholder(expr, args) {
  let normalized = expr.trim()
  let removeWhenEmpty = false

  // `value || nothing` → drop the attribute when value is empty
  const orNothing = normalized.match(/^(.+?)\s*\|\|\s*nothing$/s)
  if (orNothing) {
    normalized = orNothing[1].trim()
    removeWhenEmpty = true
  }

  // simple identifier or `args.foo`
  const identifier = normalized.match(/^(?:args\.)?([A-Za-z_$][\w$]*)$/)
  const value = identifier ? args[identifier[1]] : undefined

  if (value === undefined || value === null || value === "") {
    return removeWhenEmpty || value === undefined ? REMOVE : ""
  }
  if (typeof value === "object") {
    // objects become JSON attribute values (e.g. the `aria` prop accepts JSON strings)
    return `${RAW_START}${JSON.stringify(value)}${RAW_END}`
  }
  return String(value)
}

function cleanupHtml(html) {
  return (
    html
      // drop bindings whose value could not / should not be rendered, incl. the attribute name
      .replace(
        new RegExp(
          `\\s*[.?@]?[\\w-]+=(?:"${REMOVE}"|'${REMOVE}'|${REMOVE})`,
          "g",
        ),
        "",
      )
      .replace(new RegExp(REMOVE, "g"), "")
      // JSON attribute values get single quotes: attr="{...}" → attr='{...}'
      .replace(
        new RegExp(
          `=(?:"${RAW_START}(.*?)${RAW_END}"|'${RAW_START}(.*?)${RAW_END}'|${RAW_START}(.*?)${RAW_END})`,
          "g",
        ),
        (_, a, b, c) => `='${a ?? b ?? c}'`,
      )
      // lit property bindings `.prop=` → plain attributes
      .replace(/(\s)\.([\w-]+)=/g, "$1$2=")
      // lit boolean bindings `?attr=` → plain attributes
      .replace(/(\s)\?([\w-]+)=/g, "$1$2=")
      // collapse whitespace introduced by removed bindings
      .replace(/\s+>/g, ">")
      .replace(/\s{2,}/g, " ")
      .trim()
  )
}

function firstCustomElementTag(html) {
  const match = html.match(/<([a-z][\w]*-[\w-]+)[\s>/]/)
  return match ? match[1] : null
}
