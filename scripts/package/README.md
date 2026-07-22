# Design-System & Design-Tokens – Paket für externe Dienstleister

Dieses Paket enthält die gebauten Artefakte des Design-Systems (Web Components)
und der Design-Tokens. Es ist ohne Build-Setup direkt verwendbar.

## Inhalt

```
├── README.md                 ← diese Datei
├── Design-System/
│   ├── dist/                 ← gebaute Web Components (Stencil)
│   │   ├── stencil-storybook-boilerplate/
│   │   │   ├── *.esm.js      ← Lazy-Loading-Bundle
│   │   │   └── themes/       ← light.css / dark.css (fertige Themes)
│   │   ├── components/       ← einzelne Custom Elements (ESM)
│   │   ├── esm/ & cjs/       ← Module für Bundler
│   │   └── types/            ← TypeScript-Typdefinitionen
│   └── loader/               ← ESM-Loader zum Registrieren der Komponenten
└── Design-Tokens/
    └── dist/
        ├── css/              ← CSS Custom Properties (variables.light.css / variables.dark.css)
        ├── json/             ← Tokens als JSON (z. B. für Tooling)
        └── js/               ← Tokens als ES-Module inkl. TypeScript-Deklarationen
```

## Design-Tokens verwenden

Die CSS-Variablen einbinden (Light-Theme ist standardmäßig auf `:root` aktiv):

```html
<link rel="stylesheet" href="Design-Tokens/dist/css/variables.light.css" />
<link rel="stylesheet" href="Design-Tokens/dist/css/variables.dark.css" />
```

Das Dark-Theme wird über die Klasse `ssb-theme--dark` an einem Container aktiviert:

```html
<body class="ssb-theme--dark">
  …
</body>
```

Alle Variablen sind mit `--ssb-` geprefixt, z. B.:

```css
.my-button {
  color: var(--ssb-color-primary);
}
```

In JavaScript/TypeScript stehen die Tokens zusätzlich als ES-Module zur Verfügung:

```js
import * as tokens from "./Design-Tokens/dist/js/variables.light.js"
```

## Web Components verwenden

Variante 1 – Lazy Loading über das Haupt-Bundle:

```html
<script
  type="module"
  src="Design-System/dist/stencil-storybook-boilerplate/stencil-storybook-boilerplate.esm.js"
></script>
<link
  rel="stylesheet"
  href="Design-System/dist/stencil-storybook-boilerplate/themes/light.css"
/>
```

Variante 2 – gezielter Import einzelner Komponenten (ESM, z. B. mit Bundler):

```js
import "Design-System/dist/components/my-component.js"
```

Danach können die Komponenten wie normale HTML-Elemente genutzt werden:

```html
<my-component first="Max" last="Mustermann"></my-component>
```

TypeScript-Typen liegen unter `Design-System/dist/types/`.

## Support

Bei Fragen zum Paket bitte an das Design-System-Team wenden.
