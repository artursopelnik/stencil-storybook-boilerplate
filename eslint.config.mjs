import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import json from "@eslint/json"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    ignores: [
      "./node_modules",
      "./package-lock.json",
      "./packages/**/node_modules",
      "./packages/**/dist",
      "./packages/angular",
      "./packages/react",
      "./packages/vue",
      "./packages/core/loader",
      "./packages/core/.stencil",
      "./packages/core/hydrate",
      "./packages/core/www",
      "./packages/design-tokens/tokens/extended",
      "./packages/storybook/www",
      "./packages/storybook/storybook-static",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^h$",
        },
      ],
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.json5"],
    plugins: { json },
    language: "json/json5",
    extends: ["json/recommended"],
  },
])
