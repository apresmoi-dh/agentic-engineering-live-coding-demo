---
name: cape-design-system
version: 1.1.0
last_updated: 2026-03-17
owner: design-team
status: INCOMPLETE
missing_sections:
  - elevation / shadow tokens
  - z-index tokens
  - motion / animation tokens
  - focus ring tokens
description: >
  Reference for CAPE design system CSS custom properties (--cp-*) used in Delivery Hero
  B2B products. Covers spacing, sizing, typography, colour, and border tokens with correct
  usage context for each scale. Scoped to [data-theme$="b2b"]. Token tables are the
  authoritative source — do not infer values from prior session memory.
---

# CAPE Design System — Frontend UI Skill

This skill governs all frontend UI generation for Delivery Hero products using the CAPE design system. All React + TypeScript components MUST use CAPE CSS custom properties (`--cp-*`) and the `[data-theme$="b2b"]` theme context. Never hardcode pixel values, hex colours, or font sizes. Never use raw MUI tokens, Tailwind utilities, or arbitrary CSS values when a CAPE token exists.

> **INCOMPLETE SKILL** — sections covering elevation/shadow, z-index, motion/animation, and focus ring tokens are pending from the design team. Do not treat token gaps as design freedom — raise a gap in the PR if a needed token is not listed here.

---

## 1. Quick Decision Guide

Read this section first. It answers the most common questions without reading further.

### Which spacing scale?

| I'm styling… | Token scale |
|---|---|
| Gap between page sections, layout whitespace | `--cp-spacing-*` |
| Padding inside a card, dialog, or drawer | `--cp-base-spacing-*` |
| Padding inside a button, chip, or icon button | `--cp-action-spacing-*` |
| Padding inside an input, select, or text area | `--cp-control-spacing-*` |

### Which sizing scale?

| I'm sizing… | Token scale |
|---|---|
| An icon | `--cp-icon-sizing-*` — always; never use generic sizing for icons |
| A button or chip height | `--cp-action-sizing-*` |
| An input or select height | `--cp-control-sizing-*` |
| An avatar, spacer, or generic element | `--cp-sizing-*` |

### Which typography token?

Always `--cp-text-*`. Never `--cp-desktop-*` / `--cp-mobile-*` / `--cp-tablet-*` (all deprecated).

| I need… | Token |
|---|---|
| Main page title | `--cp-text-display2xlarge` (700/36px) |
| Section heading | `--cp-text-display-large` (700/24px) |
| Sub-section heading | `--cp-text-display-medium` (700/20px) |
| Container heading | `--cp-text-subtitle-large` (600/16px) |
| Default body copy | `--cp-text-body-medium` (500/14px) |
| Small/tertiary copy | `--cp-text-body-small` (500/12px) |
| Badge, caption, label | `--cp-text-caption` (700/10px) |

### Which colour?

- **Neutral UI** (borders, text, backgrounds, dividers): `--cp-color-jacaranda-grey-*`
- **State feedback** (success, error, warning, info): semantic palette (`cape-success`, `cape-danger`, `cape-warning`, `cape-highlight`)
- Tint `*-05` for backgrounds · primary `*-60` for interactive colour · dark `*-95` for text on light

### Cape component prop or raw token?

Prefer Cape component props — they map to tokens internally. Only reach for raw `--cp-*` tokens in CSS modules when no component prop exists for the case. See section 8 for the mapping.

---

## 2. Token Prefix & Theme Context

All CAPE tokens are CSS custom properties prefixed with `--cp-`. They are scoped to `[data-theme$="b2b"]`. When generating component styles, assume this theme context is active on a parent element.

```tsx
// Correct — uses CAPE token
<Box sx={{ padding: 'var(--cp-spacing-large)' }} />

// Wrong — hardcoded value
<Box sx={{ padding: '16px' }} />
```

---

## 3. Spacing Tokens

CAPE has four spacing scales. Use the right scale for the right context.

### 3.1 General Spacing (`--cp-spacing-*`)
Use for layout gaps, section padding, and general whitespace between elements.

| Token | Value |
|---|---|
| `--cp-spacing-none` | 0 |
| `--cp-spacing-tiny` | 2px |
| `--cp-spacing-xsmall` | 4px |
| `--cp-spacing-small` | 8px |
| `--cp-spacing-medium` | 12px |
| `--cp-spacing-large` | 16px |
| `--cp-spacing-xlarge` | 20px |
| `--cp-spacing-2xlarge` | 24px |
| `--cp-spacing-3xlarge` | 32px |
| `--cp-spacing-4xlarge` | 36px |
| `--cp-spacing-5xlarge` | 40px |
| `--cp-spacing-6xlarge` | 48px |
| `--cp-spacing-7xlarge` | 56px |

### 3.2 Base Spacing (`--cp-base-spacing-*`)
Use for surface-level containers, cards, dialogs, and page-level layout.

| Token | Value |
|---|---|
| `--cp-base-spacing-none` | 0 |
| `--cp-base-spacing-tiny` | 2px |
| `--cp-base-spacing-xsmall` | 4px |
| `--cp-base-spacing-small` | 8px |
| `--cp-base-spacing-medium` | 12px |
| `--cp-base-spacing-large` | 16px |
| `--cp-base-spacing-xlarge` | 20px |
| `--cp-base-spacing-2xlarge` | 24px |
| `--cp-base-spacing-3xlarge` | 32px |
| `--cp-base-spacing-4xlarge` | 40px |
| `--cp-base-spacing-5xlarge` | 48px |

### 3.3 Action Spacing (`--cp-action-spacing-*`)
Use for interactive elements: buttons, icon buttons, chips, and links.

| Token | Value |
|---|---|
| `--cp-action-spacing-none` | 0 |
| `--cp-action-spacing-tiny` | 2px |
| `--cp-action-spacing-xsmall` | 4px |
| `--cp-action-spacing-small` | 8px |
| `--cp-action-spacing-medium` | 12px |
| `--cp-action-spacing-large` | 16px |
| `--cp-action-spacing-xlarge` | 20px |
| `--cp-action-spacing-2xlarge` | 24px |

### 3.4 Control Spacing (`--cp-control-spacing-*`)
Use for form elements: inputs, selects, checkboxes, radio buttons, switches, and text areas.

| Token | Value |
|---|---|
| `--cp-control-spacing-none` | 0 |
| `--cp-control-spacing-tiny` | 2px |
| `--cp-control-spacing-xsmall` | 4px |
| `--cp-control-spacing-small` | 8px |
| `--cp-control-spacing-medium` | 12px |
| `--cp-control-spacing-large` | 16px |
| `--cp-control-spacing-xlarge` | 20px |
| `--cp-control-spacing-2xlarge` | 24px |

---

## 4. Sizing Tokens

### 4.1 General Sizing (`--cp-sizing-*`)
Use for generic element dimensions: avatars, spacers, elements that don't fit a specific context scale.

| Token | Value |
|---|---|
| `--cp-sizing-mini` | 8px |
| `--cp-sizing-tiny` | 12px |
| `--cp-sizing-xsmall` | 16px |
| `--cp-sizing-small` | 20px |
| `--cp-sizing-medium` | 24px |
| `--cp-sizing-large` | 32px |
| `--cp-sizing-xlarge` | 40px |
| `--cp-sizing-2xlarge` | 48px |
| `--cp-sizing-3xlarge` | 56px |
| `--cp-sizing-4xlarge` | 64px |
| `--cp-sizing-5xlarge` | 80px |

### 4.2 Action Sizing (`--cp-action-sizing-*`)
Use for the height/min-height of interactive elements: buttons, chips, icon buttons.

| Token | Value |
|---|---|
| `--cp-action-sizing-mini` | 20px |
| `--cp-action-sizing-tiny` | 24px |
| `--cp-action-sizing-xsmall` | 32px |
| `--cp-action-sizing-small` | 40px |
| `--cp-action-sizing-medium` | 48px |
| `--cp-action-sizing-large` | 56px |

### 4.3 Control Sizing (`--cp-control-sizing-*`)
Use for the height of form controls: inputs, selects, text areas.

| Token | Value |
|---|---|
| `--cp-control-sizing-mini` | 16px |
| `--cp-control-sizing-tiny` | 24px |
| `--cp-control-sizing-xsmall` | 32px |
| `--cp-control-sizing-small` | 40px |
| `--cp-control-sizing-medium` | 48px |
| `--cp-control-sizing-large` | 56px |

### 4.4 Icon Sizing (`--cp-icon-sizing-*`)
Always use these for icon dimensions. Never use generic or action sizing tokens for icons.

| Token | Value | Usage |
|---|---|---|
| `--cp-icon-sizing-small` | 16px | Compact/inline icons |
| `--cp-icon-sizing-medium` | 24px | Default icon size |
| `--cp-icon-sizing-large` | 32px | Edge cases only |

---

## 5. Typography Tokens

### 5.1 Current Text Styles (`--cp-text-*`) — USE THESE
Composite `font` shorthand tokens. Always prefer these over `--cp-desktop-*`, `--cp-mobile-*`, or `--cp-tablet-*` (all deprecated).

Format: `font-weight font-size/line-height font-family`

| Token | Value | Usage |
|---|---|---|
| `--cp-text-display2xlarge` | 700 36px/1.25 Figtree | Main page titles — once per screen |
| `--cp-text-display-xlarge` | 700 30px/1.25 Figtree | Primary headlines |
| `--cp-text-display-large` | 700 24px/1.5 Figtree | Section headings, dashboard stats |
| `--cp-text-display-medium` | 700 20px/1.5 Figtree | Sub-section headings |
| `--cp-text-display-small` | 700 16px/1.5 Figtree | Extra heading hierarchy level |
| `--cp-text-display-xsmall` | 700 14px/1.5 Figtree | Smallest heading level |
| `--cp-text-subtitle-xlarge` | 600 20px/1.5 Figtree | Large headings inside containers |
| `--cp-text-subtitle-large` | 600 16px/1.5 Figtree | Headings inside containers |
| `--cp-text-subtitle-medium` | 600 14px/1.5 Figtree | Medium headings inside containers |
| `--cp-text-subtitle-small` | 600 12px/1.5 Figtree | Small headings inside containers |
| `--cp-text-body-large` | 500 16px/1.5 Figtree | Default paragraph, long copy |
| `--cp-text-body-medium` | 500 14px/1.5 Figtree | Secondary copy — default body |
| `--cp-text-body-small` | 500 12px/1.5 Figtree | Tertiary copy, least prominent |
| `--cp-text-caption` | 700 10px/1.6 Figtree | Captions, badges, labels |

```tsx
<Typography sx={{ font: 'var(--cp-text-body-medium)' }}>...</Typography>
```

### 5.2 Font Family Tokens

| Token | Value |
|---|---|
| `--cp-font-family-figtree-ltr` | Figtree (primary B2B font) |
| `--cp-font-family-noto-sans-ltr` | Noto Sans |
| `--cp-font-family-noto-sans-rtl` | Noto Sans Arabic (RTL contexts) |
| `--cp-font-fallback` | system-ui, Segoe UI, Helvetica, Arial, sans-serif |

### 5.3 Primitive Font Tokens (use only when composite tokens are insufficient)

**Font size:** `mini` (8px) → `tiny` (10px) → `xsmall` (12px) → `small` (14px) → `medium` (16px) → `large` (20px) → `xlarge` (24px) → `2xlarge` (30px) → `3xlarge` (36px)

**Font weight:** `regular` (400) | `medium` (500) | `semi-bold` (600) | `bold` (700) | `extra-bold` (800) | `black` (900)

**Line height:** `tighter` (1.25) | `tight` (1.34) | `snug` (1.45) | `normal` (1.5) | `loose` (1.6)

**Letter spacing:** `none` (0) | `small` (0.2) | `medium` (0.3) | `large` (0.4)

---

## 6. Colour Tokens

### 6.1 Neutral Palette — Jacaranda Grey

`--cp-color-jacaranda-grey-00` (#FFFFFF) through `--cp-color-jacaranda-grey-100` (#000000)

Key stops: `01` (#F4F5F6) | `05` (#E9EAEC) | `10` (#CECED4) | `50` (#6C6D73) | `80` (#343437) | `99` (#141415)

| Stop | Common usage |
|---|---|
| `00` | White surface |
| `01` / `05` | Page background |
| `10` | Subtle border, divider |
| `50` | Secondary text |
| `80` | Primary text |
| `99` | Near-black text |

### 6.2 Semantic Colour Palettes

Each scale runs `05` (lightest tint) → `95` (darkest shade):

| Palette | 05 | 60 (primary) | 95 (dark text) |
|---|---|---|---|
| `cape-warning` | #FFF8DF | #FFC400 | #664200 |
| `cape-success` | #E5F5EC | #048A42 | #012D15 |
| `cape-danger` | #FCEBE8 | #D62D0B | #601405 |
| `cape-highlight` | #F7F5FC | #6635B6 | #261343 |
| `fast-red` | #F8DADB | #B21A20 | — |

```tsx
// Background tint
backgroundColor: 'var(--cp-color-cape-success-05)'
// Primary colour
color: 'var(--cp-color-cape-success-60)'
// Dark text on light background
color: 'var(--cp-color-cape-success-95)'
```

### 6.3 Colour Usage Rules
- Never hardcode hex values
- `*-05` tints for backgrounds and surface fills
- `*-50` to `*-60` for primary interactive/semantic colour
- `*-80` to `*-95` for text on light backgrounds in semantic contexts
- `jacaranda-grey-*` for all neutral UI

---

## 7. Border Tokens

### 7.1 Border Radius

**Context-specific tokens (prefer these over general radius values):**

| Context | Token | Value |
|---|---|---|
| Cards, dialogs, overlays | `--cp-base-border-radius-xlarge` | 20px |
| Containers, sections | `--cp-base-border-radius-large` | 12px |
| Inner elements, children | `--cp-base-border-radius-medium` | 8px |
| Smallest children | `--cp-base-border-radius-small` | 6px |
| Buttons, chips (default) | `--cp-action-border-radius-medium` | 8px |
| Pill buttons, round chips | `--cp-action-border-radius-pill` | 200px |
| Form inputs | `--cp-control-border-radius-medium` | 8px |
| Alerts | `--cp-alert-border-radius-medium` | 8px |
| Tags | `--cp-tag-border-radius-medium` | 8px |
| Switches | `--cp-switch-border-radius-pill` | 200px |
| Tabs | `--cp-tabs-border-radius-large` | 8px |

### 7.2 Border Width

| Context | Default | Active/Focus | Strong highlight |
|---|---|---|---|
| Base surfaces | `--cp-base-border-width-small` (1px) | `--cp-base-border-width-medium` (2px) | `--cp-base-border-width-large` (4px) |
| Action elements | `--cp-action-border-width-small` (1px) | `--cp-action-border-width-medium` (2px) | `--cp-action-border-width-large` (4px) |
| Form controls | `--cp-control-border-width-small` (1px) | `--cp-control-border-width-medium` (2px) | `--cp-control-border-width-large` (4px) |
| Icons (small) | `--cp-icon-border-width-small` (1px) | — | — |
| Icons (medium) | `--cp-icon-border-width-medium` (2px) | — | — |

---

## 8. Cape Component Prop → Token Mapping

When using Cape React components, prefer props over raw CSS tokens — the component applies the correct token internally. Only use raw `--cp-*` tokens in CSS modules when no component prop covers the case.

### 8.1 Stack — CRITICAL: use `spacing`, not `gap`

**`Stack` reads `spacing`, not `gap`.** Passing `gap="..."` is silently ignored — it falls into `...restProps` on the DOM element and has no visual effect. The Stack CSS defaults `--cp-stack-gap: 0`, so any `<Stack gap="...">` renders with **zero gap**.

The `spacing` value must be a CSS custom property name starting with `--`. The hook wraps it in `var(...)` automatically:

```tsx
// ✅ CORRECT — spacing prop with --cp-* token name
<Stack direction="column" spacing="--cp-spacing-2xlarge">   {/* 24px */}
<Stack direction="row"    spacing="--cp-spacing-small">     {/* 8px  */}

// ✅ ALSO CORRECT — inline style gap overrides the CSS class
<Stack direction="column" style={{ gap: 'var(--cp-spacing-2xlarge)' }}>

// ❌ WRONG — gap prop is silently ignored; renders with gap: 0
<Stack direction="column" gap="2xlarge">
<Stack direction="row"    gap="small">
```

| Spacing value | `spacing` prop | Gap |  When to use |
|---|---|---|---|
| 24px | `spacing="--cp-spacing-2xlarge"` | 24px | **Form field groups** (default for forms) |
| 16px | `spacing="--cp-spacing-large"` | 16px | Related sub-items within a section |
| 12px | `spacing="--cp-spacing-medium"` | 12px | Tightly coupled sub-items only |
| 8px  | `spacing="--cp-spacing-small"` | 8px  | Checkbox / radio lists within a section |
| 4px  | `spacing="--cp-spacing-xsmall"` | 4px  | Inline label+value pairs |

### 8.2 Other components

| Component | Prop | Resolves to | Notes |
|---|---|---|---|
| `Button` | `size="small"` | `--cp-action-sizing-small` (40px) height | Compact contexts |
| `Button` | `size="medium"` | `--cp-action-sizing-medium` (48px) height | Default CTA |
| `Tag` | `size="medium"` | `--cp-tag-*` tokens | Status badges (ACTIVE, PENDING, REJECTED) |
| `Banner` | `variant="error"` | `--cp-color-cape-danger-*` | Page-level and drawer-level errors |
| `Banner` | `variant="success"` | `--cp-color-cape-success-*` | Page-level action success |
| `Banner` | `variant="warning"` | `--cp-color-cape-warning-*` | Partial degradation states |
| `HelperText` | `variant="error"` | `--cp-color-cape-danger-*` | Inline field validation errors |
| `Checkbox` | `label="..."` | renders as `<label>` | Pass label text directly — no manual `<Label>` wrapper needed |
| `Checkbox` | `size="small"` | `--cp-control-*` tokens | Use in compact form lists |

---

## 9. RTL Layout Rules

For locales where `dir="rtl"` is active (Arabic — `ar`, Hebrew — `he`):

**What Cape handles automatically:**
- `Stack direction="row"` reverses item order correctly under `dir="rtl"` — no manual workaround needed
- Text alignment in Cape `Typography` and `HelperText` adapts to `dir`

**What you must handle manually:**

```tsx
// Direction-aware spacing — use logical properties
margin-inline-start  // replaces margin-left
margin-inline-end    // replaces margin-right
padding-inline-start // replaces padding-left
padding-inline-end   // replaces padding-right

// Wrong in RTL
sx={{ marginLeft: 'var(--cp-spacing-medium)' }}

// Right — direction-agnostic
sx={{ marginInlineStart: 'var(--cp-spacing-medium)' }}
```

**Icon mirroring:**
Directional icons (chevrons, arrows, back/forward) must be mirrored in RTL. Use a CSS transform — do not use a separate icon asset:

```tsx
// In a CSS module
.chevronIcon {
  [dir="rtl"] & {
    transform: scaleX(-1);
  }
}
```

Non-directional icons (close ×, checkmark ✓, status dots) must NOT be mirrored.

**Font:**
Apply `--cp-font-family-noto-sans-rtl` when `dir="rtl"` is active. Figtree does not cover Arabic glyphs.

```tsx
const font = locale === 'ar' ? 'var(--cp-font-family-noto-sans-rtl)' : 'var(--cp-font-family-figtree-ltr)'
```

---

## 10. Anti-patterns

Common mistakes that have caused review failures or visual regressions. Each has the wrong pattern, the correct pattern, and why.

| Wrong | Right | Why |
|---|---|---|
| `<Stack gap="medium">` | `<Stack spacing="--cp-spacing-medium">` | `gap` prop is silently ignored by Stack — only `spacing` sets `--cp-stack-gap`. Using `gap` renders with zero gap. |
| `<Stack gap="2xlarge">` on a form | `<Stack spacing="--cp-spacing-2xlarge">` | Same silent-ignore bug AND wrong value — form field groups need 24px; `spacing` is the only working prop |
| `<Stack gap="small">` | `<Stack spacing="--cp-spacing-small">` | Same: `gap` is silently dropped. Pass the token name as the `spacing` string. |
| `<Checkbox id="x" /><Label htmlFor="x">text</Label>` | `<Checkbox label="text" />` | `Checkbox` renders as `<label>` when `label` prop is provided — no manual wrapper or `htmlFor` needed |
| `sx={{ padding: '16px' }}` | `style={{ padding: 'var(--cp-spacing-large)' }}` | Hardcoded values break theme switching and are not design-reviewable |
| `font: 'var(--cp-desktop-body-medium)'` | `font: 'var(--cp-text-body-medium)'` | `--cp-desktop-*` tokens are `@deprecated` — they will be removed |
| `width: 24, height: 24` on an icon | `width: 'var(--cp-icon-sizing-medium)', height: 'var(--cp-icon-sizing-medium)'` | Icon sizing has its own scale — generic values skip the design system |
| `opacity: 0.5` for disabled state | `color: 'var(--cp-color-text-disabled)'` | Opacity-based disabled produces off-brand colour and does not disable pointer events correctly |
| `marginLeft: 'var(--cp-spacing-medium)'` | `marginInlineStart: 'var(--cp-spacing-medium)'` | Physical margin breaks RTL layouts — use logical properties |
| `#FFC400` in style props | `'var(--cp-color-cape-warning-60)'` | Hardcoded hex is not theme-aware and will not update if the token value changes |
| Sizing icons with `--cp-sizing-medium` | `--cp-icon-sizing-medium` | `--cp-sizing-medium` = 24px coincidentally matches today, but the scales are semantically distinct and may diverge |
