# Carbon.Negtive — Negative Carbon Technology Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-%23000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-%233178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-%2306B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive educational platform exploring **negative carbon technologies**—biochar, direct air capture (DAC), enhanced rock weathering (ERW), and blue carbon. Built with Next.js 16 App Router + TypeScript + Tailwind CSS, featuring a dark theme.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Technology overview, biochar introduction, comparison table |
| Interactive Tools | `/tools` | Parameterized NPV & carbon removal calculator with charts |
| Case Studies | `/cases` | 6 real-world implementations across 6 countries, 5 technologies |
| Slides | `/slides` | Markdown-based presentation viewer with keyboard navigation |

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Carbon Calculator

Supports 4 negative carbon technologies with adjustable parameters:

| Technology | Sequestration Factor |
|-----------|---------------------|
| Biochar | 2.6 tCO₂ / ton |
| Direct Air Capture (DAC) | 1.0 tCO₂ / unit |
| Enhanced Rock Weathering (ERW) | 0.9 tCO₂ / ton |
| Blue Carbon | 7.5 tCO₂ / hectare / year |

**Tunable inputs**: project duration (1–50 years), annual output, carbon price (0–300 USD/tCO₂), discount rate, production cost.

**Outputs**: annual sequestration chart, annual revenue chart, cumulative NPV chart, detailed data table.

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (dark theme) |
| Charts | Recharts (area, bar, line) |
| Markdown | react-markdown + remark-gfm |

## Slide System

Slides are stored as Markdown in `public/slides/`. Each `---` separator defines a new slide:

```markdown
---
title: My Presentation
---

# Slide 1
Content...

---

# Slide 2
Content...
```

Add new `.md` files to `public/slides/` with a `title` in the frontmatter.

## Deployment

```bash
npm run build
```

Deploy-ready on Vercel or any Node.js host.

## License

MIT
