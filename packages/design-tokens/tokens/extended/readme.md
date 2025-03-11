# Style-Dictionary Extended Design Tokens

Das Skript `build.js` generiert Design Tokens (JSON-Dateien) basierend auf Ihrer Referenz und dem zu extendenden Objekt.
Es nutzt die lodash-Bibliothek zum Mergen der Daten und json5, um JSON5-Dateien zu lesen und zu schreiben.
Durch die Verwendung von Extends wird die Light-Version als Ausgangspunkt festgelegt, da sich abweichende Themes wie "dark" nur minimal ändern.

## 💡 Systemvoraussetzungen

- Node.js 22
- Git

## 🚀 Setup

1. Wählen Sie die kompatible Node-Version: `nvm use`
2. Dependencies installieren: `npm install`
3. Projekt bauen `npm run build`
    - (optional) Projekt bauen mit watch `npm run start`
