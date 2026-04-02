# components/ Guidelines

## Purpose
Atomic, reusable UI components. Each is a pure presentational component driven by props.

## Component Inventory

### Tag/Tag.tsx
- Small label pill for feature values
- Props: `variant: 'success' | 'danger' | 'warning' | 'pink' | 'neutral'`, `children: React.ReactNode`
- Renders: `<span className={`tag tag--${variant}`}>{children}</span>`
- Text content is passed as children and displayed as-is (uppercase is handled by CSS `text-transform`)

### VerdictBadge/VerdictBadge.tsx
- Bottom-row verdict pill
- Props: `level: 'best' | 'good' | 'caution' | 'skip'`, `children: React.ReactNode`
- Renders: `<span className={`verdict-badge verdict--${level}`}>{children}</span>`

### FilterChip/FilterChip.tsx
- Toggleable filter button with dot indicator
- Props: `label: string`, `active: boolean`, `onClick: () => void`
- Renders: `<button className={`filter-chip ${active ? 'active' : ''}`}>` with `<span className="chip-dot">` and label text
- The dot's visibility is controlled by CSS (`.filter-chip.active .chip-dot { opacity: 1 }`)

### Filters/Filters.tsx
- Container for the filter bar
- Props: `filters: FilterDef[]`, `activeFilters: Set<string>`, `onToggle: (key: string) => void`
- Renders: `<div className="filters">` with a `<span className="filters-label">Filter:</span>` followed by one `FilterChip` per filter definition

### CompareCard/ (compound component)
- The main comparison table card
- `CompareCard.tsx` — outer `<div className="compare-card">` with `<div className="compare-scroll">` wrapper
- `HeaderRow.tsx` — `<div className="compare-row header-row">` containing model count label cell + one `ProductHeader` per visible spec
- `ProductHeader.tsx` — single product column: image, brand, name, price
- `SectionRow.tsx` — `<div className="compare-row section-row">` with SVG icon + section label text
- `CompareRow.tsx` — `<div className="compare-row">` with label cell + data cells; each data cell gets classes: `compare-cell`, optionally `best`, optionally `faded`; hidden products use `data-hidden="true"`
- `VerdictRow.tsx` — `<div className="compare-row verdict-row">` with verdict badges
- `NoResults.tsx` — `<div className="no-results">` message, visible only when no products match filters

## Rules
- All styling via CSS class names from global `App.css` — NO inline styles
  - Exception: the SoC row in `compare.html` uses inline `style="font: var(--cp-text-body-small); color: var(--cp-color-jacaranda-grey-50);"` on some cells — replicate that exactly
- Use the EXACT same class names as `compare.html` (e.g. `compare-cell`, `filter-chip`, `tag--success`)
- Hidden product cells use `data-hidden="true"` attribute (NOT `display:none` via style) — CSS handles `.compare-cell[data-hidden="true"] { display: none; }`
- Faded columns: apply `faded` class to cells where `spec.valetudo_support === false`
- Best-in-class: apply `best` class to cells identified by `bestInClass` logic
- Named exports only, barrel `index.ts` per folder
- Product images use `loading="lazy"` attribute
