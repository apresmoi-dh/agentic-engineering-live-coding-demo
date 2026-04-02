# layout/ Guidelines

## Purpose
Structural/container components that define the page skeleton. These are NOT reusable atoms — they are specific to this app's page structure.

## Components

### Nav/Nav.tsx
- Pink navigation bar (`className="nav"`)
- Contains brand text "foodora" and 3 links: Products, Compare (aria-current), Shop
- Links are `<a href="#">` inside `<ul class="nav-links">`
- No props needed — this is static content

### Page/Page.tsx
- `<main className="page">` wrapper providing max-width and padding
- Accepts `children: React.ReactNode`

### Page/PageHeader.tsx
- `<div className="page-header">` with `<h1>` title and `<p>` subtitle
- Props: `title: string`, `subtitle: string`

## Rules
- All styling via CSS class names from the global `App.css` — no inline styles
- Use the exact same class names as in `compare.html` (e.g. `nav`, `nav-brand`, `nav-links`, `page`, `page-header`, `page-title`, `page-subtitle`)
- Each component folder has: `index.ts` (barrel export), `ComponentName.tsx`
- Named exports only
