# Plan: React Comparison App (Pixel-Perfect)

## Context

Convert the static `compare.html` robot vacuum comparison page into a React + TypeScript + Vite app with global CSS. The React app must be pixel-perfect against `compare-screenshot.png`. Data comes from the existing `specs/*.md` markdown files (YAML frontmatter), so adding a new robot is just dropping a new `.md` file.

## File Structure

```
/
├── index.html
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css                    ← global CSS (all styles from compare.html)
│   ├── vite-env.d.ts
│   ├── types/
│   │   └── RobotSpec.ts
│   ├── data/
│   │   ├── loadSpecs.ts           ← import.meta.glob + yaml parser
│   │   └── specs/                 ← moved from /specs/
│   │       ├── xiaomi_x10_plus.md
│   │       ├── roborock_qrevo_maxv.md
│   │       ├── eureka_j15_max_ultra.md
│   │       ├── mova_p10_pro_ultra.md
│   │       └── dreame_x40_ultra.md
│   ├── logic/
│   │   ├── filters.ts
│   │   ├── bestInClass.ts
│   │   ├── formatters.ts
│   │   └── sections.ts            ← row definitions, cell rendering config
│   ├── layout/
│   │   ├── Nav/
│   │   │   ├── index.ts
│   │   │   └── Nav.tsx
│   │   └── Page/
│   │       ├── index.ts
│   │       ├── Page.tsx
│   │       └── PageHeader.tsx
│   └── components/
│       ├── FilterChip/
│       │   ├── index.ts
│       │   └── FilterChip.tsx
│       ├── Filters/
│       │   ├── index.ts
│       │   └── Filters.tsx
│       ├── Tag/
│       │   ├── index.ts
│       │   └── Tag.tsx
│       ├── VerdictBadge/
│       │   ├── index.ts
│       │   └── VerdictBadge.tsx
│       └── CompareCard/
│           ├── index.ts
│           ├── CompareCard.tsx
│           ├── HeaderRow.tsx
│           ├── ProductHeader.tsx
│           ├── SectionRow.tsx
│           ├── CompareRow.tsx
│           ├── VerdictRow.tsx
│           └── NoResults.tsx
```

## Key Technical Decisions

| Decision | Choice | Why |
|---|---|---|
| YAML parsing | `yaml` npm package + manual frontmatter split | Avoids `gray-matter`'s Node `Buffer` dep; lighter |
| Spec location | `src/data/specs/` | Enables `import.meta.glob` + Vite HMR |
| Verdicts | Frontmatter fields (`verdict_label`, `verdict_level`) | They're editorial, not computable |
| Best-in-class | Computed for numerics; `highlight_fields` in frontmatter for editorial ones | Hybrid: auto where possible, manual where needed |
| Faded columns | Computed: `valetudo_support === false` | Deterministic rule |
| Product order | `sort_order` frontmatter field | Supports new products without code changes |
| CSS | Single global `App.css` copied from HTML `<style>` | Matches requirement (no modules/styled-components) |
| State | `useState` for filters | Simple enough, no external lib needed |

## New Frontmatter Fields

Each spec `.md` gets these additional fields so verdicts and editorial highlights are data-driven:

```yaml
sort_order: 1
verdict_label: "Budget Cleaner"
verdict_level: caution        # best | good | caution | skip
highlight_fields:             # fields that get pink "best" highlight
  - camera_resolution
camera_display: "Nav only"    # display override when raw value differs from UI text
video_display: null            # optional display override for video_stream
soc_display: null              # optional display override for SoC
flash_display: null            # optional display override for flash
```

## Tasks

### Task 1 — Scaffold Vite + React + TS project
- `npm create vite@latest` to `/tmp`, copy configs to project root
- Create `index.html` with Figtree font `<link>` and `<div id="root">`
- `npm install` + `npm install yaml`
- Add `.gitignore` for `node_modules`, `dist`
- Verify: `npx tsc --noEmit`

### Task 2 — TypeScript types
- `src/types/RobotSpec.ts`: interface matching all frontmatter fields (existing + new)

### Task 3 — Move & update spec markdown files
- Copy `specs/*.md` to `src/data/specs/`
- Add new frontmatter fields (`sort_order`, `verdict_label`, `verdict_level`, `highlight_fields`, `camera_display`, display overrides) to each file
- Values derived by cross-referencing `compare.html` rendering

### Task 4 — Data loading module
- `src/data/loadSpecs.ts`: `import.meta.glob('./specs/*.md', { eager: true, query: '?raw', import: 'default' })` + `yaml` package to parse frontmatter
- Returns `RobotSpec[]` sorted by `sort_order`

### Task 5 — Global CSS
- `src/App.css`: copy all styles verbatim from `compare.html` `<style>` block
- CSS custom properties (`:root`), component classes, media queries — everything

### Task 6 — Logic modules
- `src/logic/filters.ts`: filter definitions with predicates
- `src/logic/bestInClass.ts`: compute max for numeric fields; use `highlight_fields` for editorial
- `src/logic/formatters.ts`: price, Pa, minutes, days formatting; null→em-dash
- `src/logic/sections.ts`: section/row definitions with SVG icon paths and cell rendering config per row

### Task 7 — Layout components
- `Nav`: pink bar, brand name, 3 links
- `Page`: max-width wrapper
- `PageHeader`: title + subtitle

### Task 8 — Atomic components
- `Tag`: variant prop (`success | danger | warning | pink | neutral`)
- `VerdictBadge`: level prop (`best | good | caution | skip`)
- `FilterChip`: `active` state, dot indicator, `onClick`

### Task 9 — Filters component
- Renders `FilterChip` instances from filter definitions
- Props: `activeFilters`, `onToggle`

### Task 10 — CompareCard compound component
- `CompareCard`: outer card + scroll wrapper
- `HeaderRow` + `ProductHeader`: product images, brand, name, price
- `SectionRow`: section divider with SVG icon
- `CompareRow`: label cell + data cells (with Tag/text, best/faded classes, hidden via filter)
- `VerdictRow`: verdict badges per product
- `NoResults`: shown when all filtered out

### Task 11 — Wire up App.tsx + main.tsx
- Load specs, manage filter state, compute visibility/best-in-class
- Compose: `Nav` → `Page` → `PageHeader` → `Filters` → `CompareCard`
- `main.tsx`: `ReactDOM.createRoot` render

### Task 12 — Visual verification
- `npm run dev` to start dev server
- Playwright: navigate to `http://localhost:5173`, resize to match, take full-page screenshot
- Compare against `compare-screenshot.png`
- Fix any pixel discrepancies (spacing, colors, font weights, tag text casing)

### Task 13 — Functional verification
- Playwright: click filter chips, verify products hide/show
- Verify model count updates ("3 of 5")
- Verify "No results" message when all filtered out
- Verify filter chip active state visuals

## Verification

1. **TypeScript**: `npx tsc --noEmit` after each code task
2. **Visual**: Playwright screenshot of running app vs `compare-screenshot.png`
3. **Functional**: Playwright clicks on filters to verify interactivity
4. **Drop-in test**: Adding a dummy `.md` to `src/data/specs/` should show a 6th column after restart
