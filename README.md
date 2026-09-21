# Carbon.Negtive — Negative Carbon Technology Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-%23000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-%233178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-%2306B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Live](https://img.shields.io/badge/Live-tewei02.github.io%2FCarbon.Negtive-2ea043?logo=github)](https://tewei02.github.io/Carbon.Negtive/)
[![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Live site:** <https://tewei02.github.io/Carbon.Negtive/>

An interactive educational platform exploring **negative carbon technologies**—biochar, direct air capture (DAC), enhanced rock weathering (ERW), and blue carbon. Built with Next.js 16 App Router + TypeScript + Tailwind CSS, featuring a dark theme.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Technology overview, biochar introduction, comparison table |
| Interactive Tools | `/tools` | Parameterized NPV & carbon removal calculator with charts |
| Case Studies | `/cases` | 6 real-world implementations across 6 countries, 5 technologies |
| Slides | `/slides` | Markdown-based presentation viewer with keyboard navigation |

## Data Sources

The figures shown on the **Case Studies** page are compiled from publicly available project information and media coverage (e.g. Climeworks, Husk, Carbon Streaming announcements; corporate carbon-removal purchases by Microsoft and Stripe). They are **approximate values reported in public sources**, not measurements made or independently verified by this project. For research or citation, consult each project's original sources and third-party verification reports.

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
`npm run build` (and `npm run dev`) regenerates `public/slides-index.json` from those files.

## PWA / Offline

The site is an installable Progressive Web App:

- `public/manifest.json` declares the app shell, icons and standalone display mode
- `public/sw.js` caches the app shell (including `slides-index.json`) so pages keep working offline
- A browser installs it via **Add to Home Screen** (mobile) or the install icon in the address bar (desktop)

## Deployment

The site is deployed to GitHub Pages as a **fully static export**:

```bash
npm run build     # bundles slides, then `next build` with output: "export"
```

- `next.config.ts` sets `output: "export"`, `basePath: "/Carbon.Negtive"`, `trailingSlash: true`
- Output goes to `out/`, which `.github/workflows/pages.yml` uploads to GitHub Pages
- No server-side runtime is required; the previous `/api/slides` routes were replaced by the build-time bundle (`scripts/build-slides.mjs` → `public/slides-index.json`)

## Project Structure

```
Carbon.Negtive/
├── app/                  # App Router pages (/, /tools, /cases, /slides)
├── components/           # Navbar, SlideViewer, ServiceWorkerRegistrar
├── public/
│   ├── slides/           # Markdown decks (source of truth)
│   ├── slides-index.json # generated at build time
│   ├── icons/            # PWA icons
│   ├── manifest.json
│   └── sw.js
├── scripts/build-slides.mjs
├── next.config.ts        # static export + basePath
└── .github/workflows/    # ci.yml, pages.yml
```

## License

MIT
