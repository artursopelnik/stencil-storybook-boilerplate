---
name: ssds
description: Use when building UI in a consumer app that depends on the Stencil Storybook Boilerplate design system. Loads component API, props, events, slots, CSS custom properties, design tokens and framework-specific usage examples (HTML, React, Vue, Angular) from the hosted llms.txt / manifest.json so component code is grounded in real APIs instead of guessed ones. Trigger on any request to add, style, theme or refactor a `<my-*>` custom element or its framework wrapper.
---

# Stencil Storybook Boilerplate — Design System Skill

Cross-platform agent skill. Canonical location in a consumer repo: **`.agents/skills/ssds/SKILL.md`** — a tool-neutral single source of truth. Each AI tool (Claude Code, Cursor, Copilot, Codex, …) is pointed at it via a symlink or a one-line reference in the tool's own instructions file. Grounds AI-authored UI in the real component APIs, tokens and story-derived usage examples of this design system.

## When to use

Invoke whenever the user asks to:

- Add or edit any `<my-…>` custom element, or a React/Vue/Angular wrapper from `@stencil-storybook-boilerplate/*`.
- Style, theme, or tokenize UI in a consumer app that depends on this design system.
- Migrate a legacy component to the design system.

Skip for: unrelated business logic, non-UI code, backend work.

## Sources of truth (fetch on demand)

Prefer local files if the consumer vendored them; otherwise fetch from GitHub Pages.

| Artifact | Local path (if vendored) | Hosted URL |
| --- | --- | --- |
| llms.txt index | `ai/llms.txt` | https://artursopelnik.github.io/stencil-storybook-boilerplate/llms.txt |
| llms-full dump | `ai/llms-full.txt` | https://artursopelnik.github.io/stencil-storybook-boilerplate/llms-full.txt |
| Component manifest | `ai/manifest.json` | https://artursopelnik.github.io/stencil-storybook-boilerplate/ai/manifest.json |
| Per-component md | `ai/components/<tag>.md` | https://artursopelnik.github.io/stencil-storybook-boilerplate/ai/components/<tag>.md |
| Design tokens | `ai/design-tokens.md` | https://artursopelnik.github.io/stencil-storybook-boilerplate/ai/design-tokens.md |
| Custom Elements Manifest | `node_modules/@stencil-storybook-boilerplate/core/dist/custom-elements.json` | — |

Lookup order:

1. Start with `llms.txt` to discover which components / tokens exist.
2. For a specific component, read `ai/components/<tag>.md` (fast) or the component's entry in `manifest.json` (structured).
3. For theming, read `ai/design-tokens.md`.

Tools per platform:

- Claude Code: `WebFetch` for URLs, `Read` for local files.
- Copilot CLI: `fetch` / built-in HTTP tool, `read_file` for local.
- Cursor: `@web` for URLs, file references for local.

## Rules

- **Never invent props, events, slots, or CSS custom properties.** Look them up in `manifest.json` or the per-component markdown first.
- **Respect each component's `intent`, `dos` and `donts`** from the manifest — these encode accessibility and design intent.
- **Prefer framework wrappers over raw custom elements** in React/Vue/Angular apps:
  - React: `@stencil-storybook-boilerplate/react`
  - Vue: `@stencil-storybook-boilerplate/vue`
  - Angular: `@stencil-storybook-boilerplate/angular`
- **Use design tokens (CSS custom properties)** from `@stencil-storybook-boilerplate/design-tokens` instead of hard-coded colors, sizes, spacing, radii. Themes: `light.css` / `dark.css`.
- **ARIA attributes go through the `aria` prop** (JSON string or object) on components that expose it — do not spread individual `aria-*` attributes.
- **Copy usage examples verbatim** from the manifest's `examples` field when possible; they are extracted from Storybook stories and known to render.
- **SSR**: this design system supports Next.js App Router SSR (Stencil hydrate). Do not wrap components in `"use client"` unless there is a real client-only reason.

## Install (consumer project)

One canonical file, per-tool adapters. No tool currently auto-discovers `.agents/skills/`, so each supported tool gets a one-shot symlink or reference back to the canonical file.

### Step 1 — Drop the canonical skill into `.agents/skills/ssds/`

```bash
mkdir -p .agents/skills/ssds
curl -o .agents/skills/ssds/SKILL.md \
  https://raw.githubusercontent.com/artursopelnik/stencil-storybook-boilerplate/main/packages/agentic/skill/SKILL.md
```

Commit it. This is the single source of truth for every AI tool in the repo. Everything below points *at* this file.

### Step 2 — Wire up your AI tools

Do only the ones you use.

**Claude Code** — symlink into `.claude/skills/`:

```bash
mkdir -p .claude/skills
ln -sf ../../.agents/skills/ssds .claude/skills/ssds
```

**Cursor** — symlink into `.cursor/rules/` (Cursor reads `.mdc`, same frontmatter format):

```bash
mkdir -p .cursor/rules
ln -sf ../../.agents/skills/ssds/SKILL.md .cursor/rules/ssds.mdc
```

**Codex / any tool that reads `AGENTS.md`** — add a pointer to `AGENTS.md` at the repo root:

```md
This project uses the Stencil Storybook Boilerplate design system.
Load rules and sources of truth from `.agents/skills/ssds/SKILL.md` before writing UI code.
```

**GitHub Copilot** — no skill/rule directory; reference the skill from `.github/copilot-instructions.md`:

```bash
mkdir -p .github
cat >> .github/copilot-instructions.md <<'EOF'
Design system: see .agents/skills/ssds/SKILL.md for rules and sources of truth.
Ground component code in the hosted llms.txt / manifest.json referenced from that file.
EOF
```

### Optional: vendor the artifacts offline

For airgapped / high-frequency use, copy the artifacts into the consumer repo so the agent reads them locally (no network):

```bash
mkdir -p ai
curl -o ai/llms.txt      https://artursopelnik.github.io/stencil-storybook-boilerplate/llms.txt
curl -o ai/llms-full.txt https://artursopelnik.github.io/stencil-storybook-boilerplate/llms-full.txt
mkdir -p ai/components
# repeat for manifest.json, design-tokens.md and each component md
```

Update the paths in the "Sources of truth" table above to point at your local copies.

## Verify

Ask the agent something like: *"List all props on `<my-component>`."* If it enumerates `first`, `middle`, `last` (from the manifest) rather than hallucinating, the skill is wired up correctly.
