# logic/ Guidelines

## Purpose
Pure functions with zero React imports. These modules contain all business logic: filtering, formatting, best-in-class computation, and row/section definitions.

## Modules

### filters.ts
- Define `FilterDef` type: `{ key: string; label: string; predicate: (spec: RobotSpec) => boolean }`
- Export `FILTERS: FilterDef[]` array with these 5 entries in order:
  1. `valetudo` — "Valetudo (local control)" — `spec.valetudo_support`
  2. `video` — "Video stream" — `spec.video_stream`
  3. `mic` — "Speaker + Mic" — `spec.speaker && spec.microphone`
  4. `dirt` — "Dirt detection" — `spec.dirt_detection`
  5. `under800` — "Under $800" — `spec.price_usd < 800`
- A product is visible when it passes ALL active filters (AND logic)

### bestInClass.ts
- For numeric fields (`suction_pa`, `runtime_minutes`, `self_sufficient_days`): compute `max()` across visible specs; specs matching max get "best"
- For hardware fields (`soc`, `ram_gb`, `flash_gb`): a "known" value (non-null, not starting with "unknown") beats unknown — mark known values as "best" only if some are unknown
- For editorial fields (`valetudo_root_method`, `camera_resolution`): check if the field name is in the spec's `highlight_fields` array
- Return a `Set<string>` of slugs that are "best" for a given field

### formatters.ts
- Price: `$X,XXX.XX` via `Intl.NumberFormat`
- Suction: `X,XXX Pa` (number formatted with commas + " Pa")
- Runtime: `X min`
- Dust bag: `X days`
- RAM: `X GB` or em-dash `—` for null
- Flash: use `flash_display` override if present, else `X GB` or em-dash
- SoC: use `soc_display` override if present, else raw string or em-dash
- Null/unknown values render as em-dash `—` (the actual Unicode character U+2014)

### sections.ts
- Define the 4 sections (Local Control, Camera Platform, Cleaning Autonomy, Hardware) with their SVG icon path data
- Each section contains an ordered list of row definitions
- Each row definition maps a label string to a function that extracts the cell display value from a `RobotSpec`
- Cell values are either plain text strings or `{ tag: variant, text: string }` objects for Tag rendering
- The section SVG icons are inline `<path d="...">` strings copied from `compare.html`

## Rules
- No React imports — these are pure TypeScript modules
- No side effects — all functions are deterministic
- Import types from `../types/RobotSpec`
