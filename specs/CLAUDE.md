# Robot Vacuum Comparison Project

This project compares robot vacuums as **locally-controlled mobile camera platforms** — prioritizing: rootability (Valetudo), camera quality, video streaming, two-way audio, and cleaning autonomy.

## Adding a New Product

When the user pastes a product page, create `specs/<brand>_<model_slug>.md` (lowercase, underscored). Pull data from both the manufacturer page and any community/rootability sources (e.g. robotinfo.dev, valetudo.cloud).

### Frontmatter Schema

```yaml
---
brand: ""
model: ""
price_usd:

# Local Control
valetudo_support: true/false
valetudo_root_method: ""    # e.g. Fastboot, or null if unsupported
valetudo_root_difficulty: "" # easy | medium | hard, or null

# Mobile Camera Platform
camera: true/false
camera_resolution: ""       # e.g. 8MP, FHD, or "unknown" / "unknown (RGB)"
video_stream: true/false
speaker: true/false
microphone: true/false

# Cleaning Autonomy
suction_pa:
runtime_minutes:
self_sufficient_days:       # dust bag capacity in days
auto_mop_wash: true/false
dirt_detection: true/false
multi_floor_mapping: true/false

# Hardware
soc: ""                     # e.g. Allwinner MR813, or null if unknown
ram_gb:                     # or null
flash_gb:                   # or null
image: ""                   # product image URL
---
```

Use `null` for fields that are genuinely unknown (hardware specs on closed platforms). Use `"unknown"` for string fields where the feature exists but the spec is undocumented (e.g. `camera_resolution: unknown`).

### Body Sections

Always include these sections, in this order:

1. **Title** — `# Brand Model` as an H1.
2. **Images** — one or more `![alt](url)` lines using the product image URL(s).
3. **Summary paragraph** — 2-3 sentences positioning the robot: what makes it stand out or fall short for the project's goals (local control, camera platform, value).
4. **Why This One** / **Why Not This One** — bulleted list of key pros (or cons, if the robot is not recommended). Bold the lead phrase of each bullet.
5. **Watch Out** (optional) — bulleted caveats, tradeoffs, or missing features. Skip if the "Why Not" section already covers this.
6. **Sources** — bulleted list of links (official page, teardown, Valetudo docs, community projects).
