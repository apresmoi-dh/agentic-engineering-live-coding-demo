# src/ Guidelines

## Stack
- React 18 + TypeScript + Vite
- Global CSS only (`App.css`) — no CSS modules, no styled-components, no Tailwind
- All styles use CAPE design system CSS custom properties (`--cp-*`) defined in `:root`
- Figtree font loaded via `<link>` in `index.html`

## Architecture
- `layout/` — container/structural components (Nav, Page)
- `components/` — atomic, reusable UI components (Tag, FilterChip, etc.)
- `logic/` — pure functions, no React imports, no side effects
- `data/` — data loading and spec markdown files
- `types/` — shared TypeScript interfaces

## Component Folder Convention
Every component lives in its own folder:
```
ComponentName/
  index.ts            ← barrel export only, no logic
  ComponentName.tsx   ← main component
  SubComponent.tsx    ← co-located subcomponents (optional)
```

Barrel files (`index.ts`) export only what external consumers need:
```ts
export { ComponentName } from './ComponentName';
```

## Rules
- No default exports — use named exports everywhere
- No external state management libraries — `useState`/`useMemo` are sufficient
- No inline styles — use CSS classes from `App.css` exclusively
- Data flows down via props — no context providers needed for this app
- All data comes from `src/data/loadSpecs.ts` which reads `src/data/specs/*.md` frontmatter
- The reference design is `compare.html` at the project root — match it pixel-for-pixel
- Do NOT add docstrings, comments, or extra error handling beyond what is needed
