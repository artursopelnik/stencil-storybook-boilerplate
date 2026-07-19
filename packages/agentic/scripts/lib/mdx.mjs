import fs from "node:fs"
import path from "node:path"

/**
 * Extracts the human-written component description (and optional "Guidelines"
 * section) from the Storybook MDX docs page of a component.
 *
 * The MDX files in this boilerplate live next to their stories file, e.g.
 * `src/stories/components/my-component/my-component.mdx`.
 */
export function extractMdxDocs(storiesRootDir, storiesFileRelative) {
  if (!storiesFileRelative) return {}

  const mdxPath = path.join(
    storiesRootDir,
    storiesFileRelative.replace(/\.stories\.(ts|tsx|js|jsx|mjs)$/, ".mdx"),
  )
  if (!fs.existsSync(mdxPath)) return {}

  const raw = fs.readFileSync(mdxPath, "utf8")

  return {
    description: extractIntro(raw),
    guidelines: extractSection(raw, "Guidelines"),
  }
}

/** Text between `<Title />` (or the imports block) and the first heading/JSX block. */
function extractIntro(raw) {
  const afterTitle = raw.split(/<Title\s*\/>/)[1] ?? raw
  const lines = []

  for (const line of afterTitle.split("\n")) {
    const trimmed = line.trim()
    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith("<") ||
      trimmed === "---"
    ) {
      if (lines.length > 0) break
      continue
    }
    if (trimmed.startsWith("import ")) continue
    lines.push(line)
  }

  return lines.join("\n").trim() || undefined
}

/** Content of a `## <name>` section, up to the next `## ` heading. */
function extractSection(raw, name) {
  const match = raw.match(
    new RegExp(`^##\\s+${name}\\s*$([\\s\\S]*?)(?=^##\\s|\\Z)`, "m"),
  )
  return match ? match[1].trim() || undefined : undefined
}
