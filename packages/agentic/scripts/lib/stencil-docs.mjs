import fs from "node:fs"

/**
 * Loads and normalizes the Stencil `docs-json` output (dist/docs.json)
 * into the component shape used by the AI manifest.
 */
export function loadStencilDocs(docsJsonPath) {
  if (!fs.existsSync(docsJsonPath)) {
    throw new Error(
      `Stencil docs.json not found at "${docsJsonPath}".\n` +
        `Run "npm run build" in packages/core first (the "docs-json" output target generates it).`,
    )
  }

  const docs = JSON.parse(fs.readFileSync(docsJsonPath, "utf8"))

  const components = (docs.components ?? []).map((cmp) => ({
    tag: cmp.tag,
    className: toClassName(cmp.tag),
    filePath: cmp.filePath,
    description: cmp.docs ?? "",
    deprecated: cmp.deprecation ?? null,
    props: (cmp.props ?? []).map((p) => ({
      name: p.name,
      attribute: p.attr ?? null,
      description: p.docs ?? "",
      type: p.type,
      required: !!p.required,
      default: p.default ?? null,
      values: (p.values ?? [])
        .filter((v) => v.value !== undefined)
        .map((v) => v.value),
    })),
    events: (cmp.events ?? []).map((e) => ({
      name: e.event,
      description: e.docs ?? "",
      detailType: e.detail,
      bubbles: !!e.bubbles,
      cancelable: !!e.cancelable,
      composed: !!e.composed,
    })),
    methods: (cmp.methods ?? []).map((m) => ({
      name: m.name,
      description: m.docs ?? "",
      signature: m.signature,
    })),
    slots: (cmp.slots ?? []).map((s) => ({
      name: s.name || "(default)",
      description: s.docs ?? "",
    })),
    cssProperties: (cmp.styles ?? [])
      .filter((s) => s.annotation === "prop")
      .map((s) => ({ name: s.name, description: s.docs ?? "" })),
    cssParts: (cmp.parts ?? []).map((p) => ({
      name: p.name,
      description: p.docs ?? "",
    })),
    dependencies: cmp.dependencies ?? [],
  }))

  return { timestamp: docs.timestamp, compiler: docs.compiler, components }
}

/** my-component -> MyComponent */
export function toClassName(tag) {
  return tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}
