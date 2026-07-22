#!/usr/bin/env node
/**
 * Lädt das gebaute ZIP als Attachment auf eine Confluence-Seite hoch
 * (Confluence Server / Data Center, "On Prem") – über die REST API, da
 * Confluence keinen FTP-Zugang für Attachments anbietet.
 *
 * Existiert bereits ein Attachment mit gleichem Dateinamen, wird eine neue
 * Version des Attachments hochgeladen (Versionshistorie bleibt erhalten).
 *
 * Konfiguration über Umgebungsvariablen (oder eine .env-Datei im Repo-Root):
 *   CONFLUENCE_BASE_URL   z. B. https://confluence.example.com
 *   CONFLUENCE_PAGE_ID    ID der Zielseite (in der Seiten-URL bzw. unter Seiteninformationen)
 *   CONFLUENCE_PAT        Personal Access Token (empfohlen, ab Confluence 7.9)
 *   – oder alternativ –
 *   CONFLUENCE_USER / CONFLUENCE_PASSWORD  (Basic Auth)
 *
 * Aufruf: npm run package:upload [-- pfad/zum/paket.zip]
 * Ohne Argument wird das neueste ZIP aus artifacts/ verwendet.
 */
import { readdir, readFile, stat } from "node:fs/promises"
import { basename, dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")

// Minimaler .env-Loader, damit keine zusätzliche Abhängigkeit nötig ist.
try {
  const env = await readFile(join(ROOT, ".env"), "utf8")
  for (const line of env.split("\n")) {
    const match = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/)
    if (match && !(match[1] in process.env)) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "")
    }
  }
} catch {
  // keine .env vorhanden – Umgebungsvariablen werden direkt verwendet
}

const {
  CONFLUENCE_BASE_URL,
  CONFLUENCE_PAGE_ID,
  CONFLUENCE_PAT,
  CONFLUENCE_USER,
  CONFLUENCE_PASSWORD,
} = process.env

if (!CONFLUENCE_BASE_URL || !CONFLUENCE_PAGE_ID) {
  console.error(
    "CONFLUENCE_BASE_URL und CONFLUENCE_PAGE_ID müssen gesetzt sein (Umgebungsvariable oder .env).",
  )
  process.exit(1)
}
if (!CONFLUENCE_PAT && !(CONFLUENCE_USER && CONFLUENCE_PASSWORD)) {
  console.error(
    "Zur Authentifizierung CONFLUENCE_PAT oder CONFLUENCE_USER + CONFLUENCE_PASSWORD setzen.",
  )
  process.exit(1)
}

// ZIP bestimmen: explizites Argument oder das neueste ZIP aus artifacts/
let zipPath = process.argv[2]
if (!zipPath) {
  const artifactsDir = join(ROOT, "artifacts")
  const zips = (await readdir(artifactsDir).catch(() => [])).filter((f) =>
    f.endsWith(".zip"),
  )
  if (zips.length === 0) {
    console.error(
      "Kein ZIP in artifacts/ gefunden. Bitte zuerst `npm run package` ausführen.",
    )
    process.exit(1)
  }
  const withTime = await Promise.all(
    zips.map(async (f) => ({
      f,
      mtime: (await stat(join(artifactsDir, f))).mtimeMs,
    })),
  )
  withTime.sort((a, b) => b.mtime - a.mtime)
  zipPath = join(artifactsDir, withTime[0].f)
}
zipPath = resolve(zipPath)
const fileName = basename(zipPath)

const baseUrl = CONFLUENCE_BASE_URL.replace(/\/+$/, "")
const authHeader = CONFLUENCE_PAT
  ? `Bearer ${CONFLUENCE_PAT}`
  : `Basic ${Buffer.from(`${CONFLUENCE_USER}:${CONFLUENCE_PASSWORD}`).toString("base64")}`
const headers = {
  Authorization: authHeader,
  // Pflicht-Header, sonst blockt Confluence den Upload (XSRF-Schutz)
  "X-Atlassian-Token": "nocheck",
}

const attachmentsUrl = `${baseUrl}/rest/api/content/${CONFLUENCE_PAGE_ID}/child/attachment`

// Prüfen, ob das Attachment schon existiert → dann neue Version hochladen
const lookup = await fetch(
  `${attachmentsUrl}?filename=${encodeURIComponent(fileName)}`,
  {
    headers,
  },
)
if (!lookup.ok) {
  console.error(
    `Confluence-Anfrage fehlgeschlagen (${lookup.status}): ${await lookup.text()}`,
  )
  process.exit(1)
}
const existing = (await lookup.json()).results?.[0]

const form = new FormData()
form.append("file", new Blob([await readFile(zipPath)]), fileName)
form.append("minorEdit", "true")
form.append(
  "comment",
  `Automatischer Upload via npm run package:upload (${new Date().toISOString()})`,
)

const uploadUrl = existing
  ? `${attachmentsUrl}/${existing.id}/data`
  : attachmentsUrl
const response = await fetch(uploadUrl, { method: "POST", headers, body: form })

if (!response.ok) {
  console.error(
    `Upload fehlgeschlagen (${response.status}): ${await response.text()}`,
  )
  process.exit(1)
}

console.log(
  existing
    ? `Neue Version von "${fileName}" auf Seite ${CONFLUENCE_PAGE_ID} hochgeladen.`
    : `"${fileName}" als neues Attachment auf Seite ${CONFLUENCE_PAGE_ID} hochgeladen.`,
)
