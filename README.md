# Reishabh Rathore — Portfolio

A flight-deck–themed portfolio for a Robotics & Automation Engineer: black/purple sci-fi
system, HUD instrumentation, canvas starfield, glitch title, typewriter roles, tilt project
cards and a full mission log of robotics, embedded and UAV work.

Built with **Vite + React 18 + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide**.

## Run locally

```bash
npm install
npm run dev        # dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Deploy

### GitHub Pages (recommended)

1. Push this repo to GitHub (`main` branch).
2. Repo **Settings → Pages → Build and deployment → Source:** select **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) automatically builds and
   deploys on every push to `main`.
4. Your site appears at `https://<username>.github.io/portfolio` (or your repo's pages URL).

> The app uses a relative base (`base: "./"`), so it works under any repo sub-path.

### Vercel (alternative)

1. Import the repo at [vercel.com](https://vercel.com).
2. Framework preset: **Vite** — no extra config needed.
3. Deploy, then add `vercel.app` (or custom domain) to the URL on the contact page.

### Netlify (alternative)

1. Import the repo at [netlify.com](https://netlify.com).
2. Build command: `npm run build` · Publish directory: `dist`.

## Editing content

All text and links live in one place — no component edits required:

| File | Contains |
|---|---|
| `src/data/profile.ts` | Name, tagline, roles, contact info, education, hero ticker |
| `src/data/projects.ts` | All 6 projects (summary, highlights, tech, source/demo links), experience, achievements, skill bars, about facts |

### Images

- `public/projects/img-000.jpg` … `img-025.jpg` — project photos (extracted & optimized from the resume/portfolio PDFs).
- `public/projects/schematic.svg` — stylized cover for the bare-metal drivers project (no photos existed).
- `src/data/projects.ts` → `Project.cover` sets the displayed image per project.
- Drop new images into `public/projects/` and update `cover`/`images` to swap visuals.

### Links to update

- GitHub / LinkedIn / email / phone → `src/data/profile.ts`.
- Per-project Source + Demo links → `src/data/projects.ts` (`source` / `demos` arrays).
- Demo labels are placeholders (`Demo 1`, `Demo 2`, …) — rename to descriptive titles if preferred.

## Design system

Themes, tokens and utilities are in `src/index.css`:
black `#060609` base · violet `#8b5cf6` · cyan `#22d3ee` · Space Grotesk / DM Sans / JetBrains Mono.
Utilities: `hud-corner` brackets, `glitch`, `radar-sweep`, `scanline`, film `grain`, `ticker-track`,
`bg-grid`, `pulse-dot`. All animations pause under `prefers-reduced-motion`.

## Project structure

```
src/
  App.tsx               # page composition
  components/           # Navbar Hero About Skills Projects Experience Contact Footer Reveal SectionHeading Starfield ProjectCard
  hooks/                # useTypewriter
  data/                 # profile.ts, projects.ts (all editable content)
  lib/                  # asset() base-aware path helper
public/projects/        # images + schematic.svg
.github/workflows/      # GitHub Pages deploy
```