import StyleDictionary from "style-dictionary"
import {
  formats,
  logBrokenReferenceLevels,
  logVerbosityLevels,
  logWarningLevels,
  transformGroups,
  transforms,
  transformTypes,
} from "style-dictionary/enums"

const THEMES = ["light", "dark"]
const PREFIX = "ssb"
const CONFIG = {
  log: {
    warnings: logWarningLevels.warn,
    verbosity: logVerbosityLevels.verbose,
    errors: {
      brokenReferences: logBrokenReferenceLevels.throw,
    },
  },
}

const { sizePxToRem } = transforms

/**
 * Convert all pixel (px) values to rem, not just dimensions and font sizes, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 * Scales non-zero numbers to rem, and adds ‘rem’ to the end.
 */
StyleDictionary.registerTransform({
  ...StyleDictionary.hooks.transforms[sizePxToRem],
  name: sizePxToRem,
  type: transformTypes.value,
  transitive: true,
  filter: (token, options) => {
    const value = options.usesDtcg ? token.$value : token.value
    return (
      typeof value === "string" &&
      value.trim().endsWith("px") &&
      !token.disablePxToRem
    )
  },
})

const createStyleDictionaryConfig = (theme) => {
  const isLight = theme === "light"
  const src = isLight ? `!(*.${THEMES.join("|*.")})` : `*.${theme}`

  return {
    ...CONFIG,
    source: [`tokens/${src}.{json,json5}`],
    platforms: {
      css: {
        transformGroup: transformGroups.css,
        prefix: PREFIX,
        buildPath: "dist/css/",
        files: [
          {
            destination: `variables.${theme}.css`,
            format: formats.cssVariables,
            options: {
              selector: `.${PREFIX}--theme-${theme} { color-scheme: ${theme}; }\n\n:root, :host, .${PREFIX}--theme-${theme}`,
              outputReferences: true,
            },
          },
        ],
      },
      json: {
        transformGroup: transformGroups.web,
        prefix: PREFIX,
        buildPath: "dist/json/",
        files: [
          {
            destination: `properties.${theme}.json`,
            format: formats.json,
          },
        ],
      },
      js: {
        transformGroup: transformGroups.js,
        prefix: PREFIX,
        buildPath: "dist/js/",
        files: [
          {
            destination: `variables.${theme}.js`,
            format: formats.javascriptEs6,
          },
          {
            destination: `variables.${theme}.d.ts`,
            format: formats.typescriptEs6Declarations,
          },
        ],
      },
    },
  }
}

const buildThemes = (async () => {
  console.log("Build started...")
  console.log("\n==============================================")

  for (const theme of THEMES) {
    const sd = new StyleDictionary(createStyleDictionaryConfig(theme))
    await sd.buildAllPlatforms()
  }

  console.log("\n==============================================")
  console.log("\nBuild completed!")
})()

export default buildThemes
