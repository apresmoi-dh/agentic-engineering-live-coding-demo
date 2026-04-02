---
name: playwright-screenshot
version: 1.0.0
description: >
  How to use the Playwright MCP to open a local HTML file in a visible browser,
  take a full-page screenshot, save it to disk, and close the browser.
  TRIGGER when: user asks to preview, screenshot, or capture a local HTML page.
metadata:
  last_updated: 2026-04-02
  owner: juan
---

# Playwright Screenshot — Skill

Use the Playwright MCP tools to open local files in a real (headed) browser, take screenshots, and save them to the project folder. Always close the browser when done.

---

## Step-by-step workflow

### 1. Navigate to the local file

Use `mcp__playwright__browser_navigate` with a `file:///` URL:

```
url: file:///absolute/path/to/file.html
```

The MCP is configured with `--allow-unrestricted-file-access` so local files work.

### 2. (Optional) Resize the viewport

Use `mcp__playwright__browser_resize` if a specific size is needed:

```
width: 1400
height: 900
```

### 3. Take the screenshot

Use `mcp__playwright__browser_take_screenshot`:

- `type`: `"png"` (or `"jpeg"`)
- `fullPage`: `true` to capture the entire scrollable page, `false` for viewport only
- `filename`: absolute path where to save, e.g. `/Users/juan.fortunatti/Documents/project/screenshot.png`

### 4. Close the browser

**Always** call `mcp__playwright__browser_close` after you are done. Never leave the browser open.

---

## Quick reference — all Playwright MCP tools available

| Tool | Purpose |
|---|---|
| `browser_navigate` | Go to a URL (supports `file://`) |
| `browser_snapshot` | Accessibility snapshot (better than screenshot for actions) |
| `browser_take_screenshot` | Save a PNG/JPEG to disk |
| `browser_click` | Click an element by ref |
| `browser_type` | Type text into an input |
| `browser_fill_form` | Fill multiple form fields at once |
| `browser_hover` | Hover over an element |
| `browser_press_key` | Press a keyboard key |
| `browser_select_option` | Select dropdown option |
| `browser_drag` | Drag and drop |
| `browser_evaluate` | Run arbitrary JS on the page |
| `browser_run_code` | Run a Playwright code snippet |
| `browser_resize` | Resize the viewport |
| `browser_tabs` | List/create/close/select tabs |
| `browser_wait_for` | Wait for text or time |
| `browser_console_messages` | Read console output |
| `browser_network_requests` | Read network requests |
| `browser_file_upload` | Upload files |
| `browser_handle_dialog` | Accept/dismiss dialogs |
| `browser_navigate_back` | Go back |
| `browser_close` | **Close the browser (always do this)** |

---

## Example: screenshot a local HTML file

```
1. browser_navigate  → file:///Users/juan.fortunatti/Documents/project/page.html
2. browser_take_screenshot → type: png, fullPage: true, filename: /Users/juan.fortunatti/Documents/project/screenshot.png
3. browser_close
```

---

## Notes

- The browser opens **headed** (visible) by default — no headless flag needed.
- The MCP server is installed globally at user scope via: `claude mcp add --transport stdio --scope user playwright -- npx -y @playwright/mcp@latest --allow-unrestricted-file-access`
- Chromium is the default browser. To use another, reconfigure with `--browser firefox|webkit|msedge`.
- If you need to interact with the page (click, type, scroll) before screenshotting, use `browser_snapshot` first to get element refs, then use `browser_click`/`browser_type` with those refs.