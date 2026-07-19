import fs from "node:fs"

/**
 * Loads the DTCG design tokens (tokens.json) and flattens them into
 * a list of { name, cssVariable, type, value, rawValue } entries.
 *
 * Alias references like "{global.color.purple.600}" are resolved.
 */
export function loadDesignTokens(tokensJsonPath) {
  if (!fs.existsSync(tokensJsonPath)) return []

  const tree = JSON.parse(fs.readFileSync(tokensJsonPath, "utf8"))
  const flat = []
  flatten(tree, [], undefined, flat)

  return flat.map((token) => ({
    ...token,
    value: resolveAlias(token.rawValue, flat),
  }))
}

function flatten(node, pathParts, inheritedType, out) {
  if (node === null || typeof node !== "object") return

  const type = node.$type ?? inheritedType

  if (node.$value !== undefined) {
    const name = pathParts.join(".")
    out.push({
      name,
      cssVariable: `--${pathParts.join("-")}`,
      type: type ?? null,
      rawValue: node.$value,
    })
    return
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) continue
    flatten(value, [...pathParts, key], type, out)
  }
}

function resolveAlias(value, flat, depth = 0) {
  if (typeof value !== "string" || depth > 10) return value
  const match = value.match(/^\{(.+)\}$/)
  if (!match) return value
  const target = flat.find((t) => t.name === match[1])
  return target ? resolveAlias(target.rawValue, flat, depth + 1) : value
}
