# CLAUDE.md

A personal weekly calisthenics planner. Originally a single-file React component Claude generated as an artifact in the iPhone app — now a deployable Next.js app, used primarily on iPhone.

## Quick map

- [src/app/layout.tsx](src/app/layout.tsx) — root layout, font loading (DM Mono via `next/font`), viewport + Apple PWA meta, theme color.
- [src/app/page.tsx](src/app/page.tsx) — the entire app: weekly plan data (`days`), per-exercise detail data (`exerciseInfo`), and the `Routine` component (day tabs + exercise list + bottom-drawer detail view). Client component (`"use client"`).
- [src/app/globals.css](src/app/globals.css) — barebones: Tailwind import, body colors, iOS tap-highlight reset, `touch-action: manipulation` on buttons.
- [public/icon.svg](public/icon.svg), [public/apple-touch-icon.png](public/apple-touch-icon.png), [public/icon-512.png](public/icon-512.png) — three accent bars (push/pull/core colors) on a dark rounded square.
- [railway.json](railway.json) — explicit build + start commands for Railway.

## Conventions

- **iPhone-first.** Layout is single-column, full-height (`100dvh`), with a bottom drawer for details. All touch targets are ≥ 30×30 with `touch-action: manipulation` to kill the 300ms tap delay. Use `env(safe-area-inset-*)` for any padding near the top of the header or bottom of the screen.
- **Inline styles, not Tailwind classes.** The component was originally an artifact and uses inline `style={{}}`. Tailwind 4 is installed for future use (and global resets), but don't reflexively rewrite — only port to classes if it makes a concrete edit cleaner.
- **Day color is the accent.** `day.color` (yellow-green / teal / orange / gray) threads through borders, labels, and emphasis text. Keep that pattern — it's the whole visual identity.
- **No state persistence yet.** `useState` for active day + selected exercise; nothing in localStorage. If you add streak tracking or "today's workout" defaulting, that's the natural seam.
- **Static page.** `/` pre-renders as static at build time — keep it that way unless there's a real reason. Railway serves it cheaply.

## Adding exercises or days

`days` and `exerciseInfo` in [src/app/page.tsx](src/app/page.tsx) are the only sources of truth. To add an exercise, add an entry to `exerciseInfo` keyed by display name, then reference that name in one or more `days[].exercises[].name`. The lookup is `exerciseInfo[selected.name]` — if the key is missing, the drawer shows "No additional info for this one."

## Mobile gotchas to remember

- `100vh` is broken on iOS Safari (counts the URL-bar area). Use `100dvh`.
- Apple PWA meta is set, but if/when an actual icon design lands, replace [public/apple-touch-icon.png](public/apple-touch-icon.png) — iOS Add-to-Home-Screen uses it at 180×180.
- The drawer uses `position: fixed` + `inset: 0` for the overlay and `overscroll-behavior: contain` on the inner scroller to keep iOS rubber-band from leaking to the body.

## Deployment

- Railway, single service, Nixpacks auto-detects Next.js. `engines.node >= 20.19.0` in package.json pins the runtime. `npm start` runs `next start -H 0.0.0.0` and reads `$PORT`.
- No env vars, no database, no external services. If that changes, document it here.
