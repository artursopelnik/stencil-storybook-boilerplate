import { toClassName } from "./stencil-docs.mjs"

/**
 * Generates framework-specific usage snippets (React, Vue, Angular) from
 * story args, based on the component's prop metadata from docs.json.
 */
export function frameworkExamples(component, args) {
  const props = usedProps(component, args)

  return {
    react: reactExample(component, props),
    vue: vueExample(component, props),
    angular: angularExample(component, props),
  }
}

function usedProps(component, args) {
  return component.props
    .filter((prop) => {
      const value = args[prop.name]
      return value !== undefined && value !== null && value !== ""
    })
    .map((prop) => ({ ...prop, value: args[prop.name] }))
}

function reactExample(component, props) {
  const name = toClassName(component.tag)
  const attrs = props
    .map(({ name: propName, value }) => {
      if (typeof value === "string") return `${propName}="${value}"`
      return `${propName}={${JSON.stringify(value)}}`
    })
    .join(" ")
  return `<${name}${attrs ? " " + attrs : ""} />`
}

function vueExample(component, props) {
  const name = toClassName(component.tag)
  const attrs = props
    .map(({ name: propName, value }) => {
      if (typeof value === "string") return `${propName}="${value}"`
      const literal = JSON.stringify(value).replace(/"/g, "'")
      return `:${propName}="${literal}"`
    })
    .join(" ")
  return `<${name}${attrs ? " " + attrs : ""} />`
}

function angularExample(component, props) {
  const attrs = props
    .map(({ attribute, name: propName, value }) => {
      const attr = attribute ?? propName
      if (typeof value === "string") return `${attr}="${value}"`
      const literal = JSON.stringify(value).replace(/"/g, "'")
      return `[${propName}]="${literal}"`
    })
    .join(" ")
  return `<${component.tag}${attrs ? " " + attrs : ""}></${component.tag}>`
}
