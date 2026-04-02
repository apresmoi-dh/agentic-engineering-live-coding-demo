# Agentic Live Coding Session #1

**AI-Native Workflows — Delivery Hero**

This project was built live during a coding session demonstrating how to go from unstructured research to a fully working application using agentic workflows with Claude Code.

## What happened

Starting from raw robot vacuum product pages, the session walked through:

1. **Structuring raw data** into a reusable markdown schema with YAML frontmatter
2. **Crystallizing the process** into CLAUDE.md instruction files so the workflow persists across sessions
3. **Generating a branded UI prototype** using the CAPE design system (Delivery Hero's internal design system)
4. **Visual verification loops** with Playwright — the agent screenshots its own output and self-corrects
5. **Scaffolding a React app** with layered CLAUDE.md files governing each part of the codebase
6. **Delegating to a team of agents** that implemented the full app in parallel, verified against the HTML prototype

## HTML to React: by the numbers

The final phase — converting the static HTML comparison page into a pixel-perfect React + TypeScript + Vite application — was done with a team of 6 agents:

| Agent | Model | Role |
|---|---|---|
| Lead (orchestrator) | Opus | Scaffold, types, wiring, verification |
| data-agent | Haiku | Spec files + data loader |
| styles-agent | Haiku | Global CSS |
| logic-agent | Sonnet | Business logic modules |
| ui-agent | Sonnet | Layout + atomic components |
| compare-agent | Sonnet | Compound components (CompareCard) |

**Total cost: $8.48**
- Opus: $5.98
- Haiku: $0.90
- Sonnet: $1.60

**Duration:**
- ~29 min API time — total time the models spent "thinking" across all calls
- ~38 min wall time — real elapsed clock time, including tool execution, npm install, Playwright screenshots, and network latency

**Code changes: 1,997 lines added, 42 removed**

## Live demo

- **App:** https://apresmoi-dh.github.io/agentic-engineering-live-coding-demo/
- **Slides:** https://apresmoi-dh.github.io/agentic-engineering-live-coding-demo/slides/

## Running locally

```bash
npm install

# React comparison app (http://localhost:5173)
npm run dev

# Slides (http://localhost:3030)
npm run slides
```

---

*Juan Cruz Fortunatti*
