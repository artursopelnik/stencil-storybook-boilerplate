#!/usr/bin/env node
/**
 * Bündelt die gebauten Artefakte von Design-System (packages/core) und
 * Design-Tokens (packages/design-tokens) zusammen mit einer README in ein
 * ZIP für externe Dienstleister.
 *
 * Voraussetzung: `npm run package:build` (bzw. `npm run build`) wurde ausgeführt,
 * damit die dist-Verzeichnisse existieren.
 *
 * Aufruf: npm run package:zip
 */
import { createWriteStream } from "node:fs"
import { access, mkdir, readFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { ZipArchive } from "archiver"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const OUT_DIR = join(ROOT, "artifacts")

// Quelle → Zielpfad im ZIP. Es werden bewusst nur gebaute Artefakte (dist)
// gepackt, damit Dienstleister ohne Build-Setup arbeiten können.
const DIRECTORIES = [
  { src: "packages/core/dist", dest: "Design-System/dist" },
  { src: "packages/core/loader", dest: "Design-System/loader" },
  { src: "packages/design-tokens/dist", dest: "Design-Tokens/dist" },
]
const README = { src: "scripts/package/README.md", dest: "README.md" }

const exists = (path) =>
  access(path).then(
    () => true,
    () => false,
  )

const missing = []
for (const { src } of [...DIRECTORIES, README]) {
  if (!(await exists(join(ROOT, src)))) missing.push(src)
}
if (missing.length > 0) {
  console.error(
    `Fehlende Verzeichnisse/Dateien:\n  - ${missing.join("\n  - ")}\n\n` +
      "Bitte zuerst bauen: npm run package:build",
  )
  process.exit(1)
}

const { version } = JSON.parse(
  await readFile(join(ROOT, "packages/core/package.json"), "utf8"),
)
const zipName = `design-system-paket-v${version}.zip`
const zipPath = join(OUT_DIR, zipName)

await mkdir(OUT_DIR, { recursive: true })

const output = createWriteStream(zipPath)
const archive = new ZipArchive({ zlib: { level: 9 } })

const done = new Promise((resolvePromise, reject) => {
  output.on("close", resolvePromise)
  archive.on("error", reject)
})

archive.pipe(output)
archive.file(join(ROOT, README.src), { name: README.dest })
for (const { src, dest } of DIRECTORIES) {
  archive.directory(join(ROOT, src), dest)
}
await archive.finalize()
await done

console.log(
  `ZIP erstellt: ${zipPath} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`,
)
