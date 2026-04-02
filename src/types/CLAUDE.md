# types/ Guidelines

## Purpose
Shared TypeScript interfaces and type aliases used across the app.

## RobotSpec Interface
`RobotSpec.ts` must define a single interface matching the YAML frontmatter schema from `src/data/specs/*.md`. Fields:

### Identity
- `slug: string` — derived from filename, not in frontmatter (e.g. `"xiaomi_x10_plus"`)
- `brand: string`
- `model: string`
- `price_usd: number`
- `image: string` — product image URL
- `sort_order: number`

### Local Control
- `valetudo_support: boolean`
- `valetudo_root_method: string | null`
- `valetudo_root_difficulty: string | null`

### Camera Platform
- `camera: boolean`
- `camera_resolution: string | null`
- `video_stream: boolean`
- `speaker: boolean`
- `microphone: boolean`

### Cleaning Autonomy
- `suction_pa: number`
- `runtime_minutes: number`
- `self_sufficient_days: number`
- `auto_mop_wash: boolean`
- `dirt_detection: boolean`
- `multi_floor_mapping: boolean`

### Hardware
- `soc: string | null`
- `ram_gb: number | null`
- `flash_gb: number | null`

### Editorial / Display
- `verdict_label: string` — e.g. `"Spec King"`
- `verdict_level: 'best' | 'good' | 'caution' | 'skip'`
- `highlight_fields: string[]` — frontmatter field names that get pink "best" highlight
- `camera_display: string | null` — UI display override for camera_resolution
- `video_display: string | null` — UI display override for video_stream
- `soc_display: string | null` — UI display override for SoC
- `flash_display: string | null` — UI display override for flash

## Rules
- Named export only: `export interface RobotSpec { ... }`
- No classes, no enums — plain interfaces and type aliases
- Nullable fields use `| null`, not optional `?` — the frontmatter always has the key, value is `null` when unknown
