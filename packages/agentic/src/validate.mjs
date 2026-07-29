/**
 * Usage validation against the AI manifest — the "harness" part of agentic
 * readiness: instead of hoping an agent read the docs, generated markup can
 * be checked for invented components/props, missing required props, invalid
 * `aria` JSON and unknown design tokens.
 */

const GLOBAL_ATTRIBUTES = new Set([
  "id",
  "class",
  "style",
  "slot",
  "part",
  "title",
  "hidden",
  "tabindex",
  "role",
  "dir",
  "lang",
  "translate",
  "draggable",
  "autofocus",
])

/**
 * @param {object} manifest  the generated manifest.json content
 * @param {string} code      HTML markup using design system components
 * @param {object} [options]
 * @param {string} [options.css]  optional CSS to validate var(--token) usage
 * @returns {{ valid: boolean, errors: string[], warnings: string[], checkedComponents: string[], reminders: Record<string, string[]> }}
 */
export function validateUsage(manifest, code, { css } = {}) {
  const errors = []
  const warnings = []
  const checked = new Set()
  const reminders = {}

  const componentsByTag = new Map(manifest.components.map((c) => [c.tag, c]))

  const tagPattern =
    /<([a-z][a-z0-9]*-[a-z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)\/?>/g
  for (const match of code.matchAll(tagPattern)) {
    const [, tag, attributesBlob] = match
    const component = componentsByTag.get(tag)

    if (!component) {
      errors.push(
        `Unknown component <${tag}>. Available components: ${[...componentsByTag.keys()].join(", ")}`,
      )
      continue
    }

    checked.add(tag)
    validateAttributes(component, attributesBlob, { errors, warnings })

    if (component.donts?.length) {
      reminders[tag] = component.donts.map((rule) => `Don't ${rule}`)
    }
  }

  validateTokens(manifest, `${code}\n${css ?? ""}`, { errors, warnings })

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    checkedComponents: [...checked],
    reminders,
  }
}

function validateAttributes(component, attributesBlob, { errors, warnings }) {
  const validAttributes = new Map(
    component.props.filter((p) => p.attribute).map((p) => [p.attribute, p]),
  )
  const seen = new Set()

  const attributePattern =
    /([.@?]?[a-zA-Z_][\w:.-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g
  for (const match of attributesBlob.matchAll(attributePattern)) {
    const [, rawName, doubleQuoted, singleQuoted, unquoted] = match
    const value = doubleQuoted ?? singleQuoted ?? unquoted

    let name = rawName.toLowerCase()
    if (/^[.@?]/.test(rawName)) {
      warnings.push(
        `<${component.tag}>: "${rawName}" uses framework binding syntax (lit/JSX) — in plain HTML use the attribute form instead.`,
      )
      name = name.slice(1)
    }

    seen.add(name)

    if (GLOBAL_ATTRIBUTES.has(name) || name.startsWith("data-")) continue
    if (name.startsWith("on")) {
      warnings.push(
        `<${component.tag}>: inline "${name}" handler — prefer addEventListener${component.events?.length ? ` (events: ${component.events.map((e) => e.name).join(", ")})` : ""}.`,
      )
      continue
    }
    // aria-* passthrough is allowed, but this design system prefers the `aria` prop
    if (name.startsWith("aria-")) {
      if (validAttributes.has("aria")) {
        warnings.push(
          `<${component.tag}>: "${name}" — this component exposes an \`aria\` prop (JSON string or object); prefer aria='{"${name}":"..."}'.`,
        )
      }
      continue
    }

    const prop = validAttributes.get(name)
    if (!prop) {
      const suggestion = closestMatch(name, [...validAttributes.keys()])
      errors.push(
        `<${component.tag}>: unknown attribute "${name}".${suggestion ? ` Did you mean "${suggestion}"?` : ""} Valid attributes: ${[...validAttributes.keys()].join(", ")}`,
      )
      continue
    }

    if (value !== undefined) {
      if (
        prop.type === "number" &&
        value !== "" &&
        Number.isNaN(Number(value))
      ) {
        errors.push(
          `<${component.tag}>: attribute "${name}" expects a number, got "${value}".`,
        )
      }
      if (value.trim().startsWith("{")) {
        try {
          JSON.parse(value)
        } catch {
          errors.push(
            `<${component.tag}>: attribute "${name}" looks like JSON but does not parse — use valid JSON with double quotes, e.g. aria='{"aria-label":"..."}'.`,
          )
        }
      }
    }
  }

  for (const prop of component.props) {
    if (prop.required && prop.attribute && !seen.has(prop.attribute)) {
      errors.push(
        `<${component.tag}>: required attribute "${prop.attribute}" is missing.`,
      )
    }
  }
}

function validateTokens(manifest, source, { errors, warnings }) {
  const knownVariables = new Set(
    (manifest.designTokens ?? []).map((t) => t.cssVariable),
  )
  for (const component of manifest.components) {
    for (const cssProp of component.cssProperties ?? []) {
      knownVariables.add(cssProp.name)
    }
  }

  for (const match of source.matchAll(/var\(\s*(--[\w-]+)/g)) {
    const variable = match[1]
    if (!knownVariables.has(variable)) {
      const suggestion = closestMatch(variable, [...knownVariables])
      errors.push(
        `Unknown design token "var(${variable})".${suggestion ? ` Did you mean "var(${suggestion})"?` : ""}`,
      )
    }
  }

  for (const match of source.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
    warnings.push(
      `Hard-coded color "${match[0]}" — prefer a design token (see get_design_tokens).`,
    )
  }
}

function closestMatch(input, candidates) {
  let best = null
  let bestDistance = Infinity
  for (const candidate of candidates) {
    const distance = levenshtein(input, candidate)
    if (distance < bestDistance) {
      bestDistance = distance
      best = candidate
    }
  }
  return bestDistance <= Math.max(2, Math.floor(input.length / 3)) ? best : null
}

function levenshtein(a, b) {
  const rows = a.length + 1
  const cols = b.length + 1
  const d = Array.from({ length: rows }, (_, i) => {
    const row = new Array(cols).fill(0)
    row[0] = i
    return row
  })
  for (let j = 0; j < cols; j++) d[0][j] = j

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
  }
  return d[rows - 1][cols - 1]
}
