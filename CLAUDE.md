# CLAUDE.md

A personal weekly calisthenics planner. Originally a single-file React component Claude generated as an artifact in the iPhone app — now a deployable Next.js app, used primarily on iPhone.

## Quick map

- [src/app/layout.tsx](src/app/layout.tsx) — root layout, font loading (DM Mono via `next/font`), viewport + Apple PWA meta, theme color.
- [src/app/page.tsx](src/app/page.tsx) — the `Routine` component: day tabs + exercise list + bottom-drawer detail view + done toggles. Client component (`"use client"`).
- [src/data/plan.ts](src/data/plan.ts) — weekly plan data (`days`, index 0 = Monday) and per-exercise detail data (`exerciseInfo`). Data only, no React.
- [src/hooks/useProgress.ts](src/hooks/useProgress.ts) — per-exercise done state for the current week in `localStorage` (`calisthenics.progress.v1`), reset when the week key changes.
- [src/lib/week.ts](src/lib/week.ts) — `dayIndex` (Mon-first) and `weekKey` (ISO date of the week's Monday). Pure; unit-tested in `week.test.ts` via vitest (`npm test`).
- [src/app/manifest.ts](src/app/manifest.ts) — web app manifest (standalone display, icons); Next links it automatically.
- [src/app/globals.css](src/app/globals.css) — Tailwind import, body colors, iOS resets on buttons, and the `.tab` / `.card` / `.check` press states plus the `.backdrop` / `.sheet` drawer keyframes (open and `.drawer-closing` exit).
- [public/icon.svg](public/icon.svg), [public/apple-touch-icon.png](public/apple-touch-icon.png), [public/icon-512.png](public/icon-512.png) — three accent bars (push/pull/core colors) on a dark rounded square.
- [railway.json](railway.json) — explicit build + start commands for Railway.

## Conventions

- **iPhone-first.** Layout is single-column, full-height (`100dvh`), with a bottom drawer for details. All touch targets are ≥ 30×30 with `touch-action: manipulation` to kill the 300ms tap delay. Use `env(safe-area-inset-*)` for any padding near the top of the header or bottom of the screen.
- **Inline styles, not Tailwind classes.** The component was originally an artifact and uses inline `style={{}}`. Tailwind 4 is installed for future use (and global resets), but don't reflexively rewrite — only port to classes if it makes a concrete edit cleaner. The exception is anything inline styles can't express (`:active`, `:hover`, keyframes): those live as small named classes in `globals.css`.
- **Touch feel.** No `onMouseEnter`/`onMouseLeave` hover hacks — iOS emulates hover and it sticks until the next tap. Hover goes behind `@media (hover: hover)`; press feedback is `:active` with `transition-duration: 0s` so it's instant. Only animate `opacity`/`transform` on the drawer (compositor-only); the sheet stays mounted for `CLOSE_MS` after close so the exit animation plays — keep that constant in sync with `sheet-out` in the CSS.
- **Day color is the accent.** `day.color` (yellow-green / teal / orange / gray) threads through borders, labels, and emphasis text. Keep that pattern — it's the whole visual identity.
- **Progress is the only persisted state.** `useProgress` stores done exercises for the current week under a single localStorage key and drops them when the week rolls over. Active day and selected exercise are plain `useState`; the active day snaps to today on mount and on `visibilitychange`.
- **Static page.** `/` pre-renders as static at build time — keep it that way unless there's a real reason. Railway serves it cheaply.

## Adding exercises or days

`days` and `exerciseInfo` in [src/data/plan.ts](src/data/plan.ts) are the only sources of truth. To add an exercise, add an entry to `exerciseInfo` keyed by display name, then reference that name in one or more `days[].exercises[].name`. The lookup is `exerciseInfo[selected.name]` — if the key is missing, the drawer shows "No additional info for this one." Exercise names must be unique within a day (they're React keys and the progress key).

## Mobile gotchas to remember

- `100vh` is broken on iOS Safari (counts the URL-bar area). Use `100dvh`.
- Apple PWA meta is set, but if/when an actual icon design lands, replace [public/apple-touch-icon.png](public/apple-touch-icon.png) — iOS Add-to-Home-Screen uses it at 180×180.
- The drawer uses `position: fixed` + `inset: 0` for the overlay and `overscroll-behavior: contain` on the inner scroller to keep iOS rubber-band from leaking to the body.

## Deployment

- Railway, single service, Nixpacks auto-detects Next.js. `engines.node >= 20.19.0` in package.json pins the runtime. `npm start` runs `next start -H 0.0.0.0` and reads `$PORT`.
- No env vars, no database, no external services. If that changes, document it here.
