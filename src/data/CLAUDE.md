# data/ Guidelines

## Purpose
Load and parse robot vacuum specs from markdown files with YAML frontmatter.

## Spec Files
- Markdown files live in `src/data/specs/*.md`
- Each has YAML frontmatter (between `---` delimiters) containing all fields defined in `src/types/RobotSpec.ts`
- The body content (below frontmatter) is NOT used by the app — only frontmatter matters
- Adding a new `.md` file to `specs/` should automatically add a new column to the comparison table

## loadSpecs.ts
- Use `import.meta.glob('./specs/*.md', { eager: true, query: '?raw', import: 'default' })` to load all markdown files as raw strings at build time
- Parse frontmatter using the `yaml` npm package (NOT `gray-matter` — it requires Node polyfills)
- Extract frontmatter manually by splitting on `---` delimiters:
  ```ts
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  ```
- Derive `slug` from the filename (strip path and `.md` extension)
- Return `RobotSpec[]` sorted by `sort_order` ascending
- Named export: `export function loadSpecs(): RobotSpec[]`

## Rules
- No async loading — `import.meta.glob` with `eager: true` is synchronous
- No runtime `fetch` calls — specs are bundled at build time
- The `yaml` package's `parse()` function is the only YAML parser used
