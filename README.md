# Calisthenics Routine

A simple weekly calisthenics planner I use on my iPhone. Tap a day, see the exercises; tap an exercise, see how to do it, what it works, and what to watch out for. No accounts, no tracking, no equipment beyond a pull-up bar and a chair.

It started as a Claude artifact in the iPhone app and grew into a deployable Next.js app so I'd stop having to open the Claude widget every morning to see what's on.

## Features

- **Seven-day plan** — Mon/Thu Push, Tue/Fri Pull, Wed Core + Mobility, Sat easy/optional, Sun rest. Each day has its own accent color that threads through the UI.
- **Exercise detail drawer** — tap any exercise for muscles worked, step-by-step form, and tips. Slides up from the bottom on iPhone, and slides back down on close.
- **Progress for the week** — tick exercises off as you go (from the list or the drawer). Stored in `localStorage`, resets every Monday. Day tabs show a dot once a day is fully done.
- **Opens on today** — the current day's tab is selected automatically.
- **iPhone-friendly** — full-screen on mobile, safe-area aware (notch + home indicator), no tap-zoom delay, no rubber-band leakage, instant press feedback. "Add to Home Screen" gets you a near-native experience with a custom icon (web manifest included).
- **Static page** — pre-renders at build time, deploys cheap.

## Tech Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4 (resets only), DM Mono via `next/font`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test        # vitest (week/day helpers)
npm run lint
npm run typecheck
```

## Building

```bash
npm run build
```

## Deployment

Deployed on [Railway](https://railway.app). The app runs as a standard Next.js server (`npm start`, listening on `$PORT`). No environment variables or services required. Railway's Nixpacks auto-detects Next.js; [railway.json](railway.json) pins the build and start commands explicitly.

## Project Structure

```text
src/
  app/
    layout.tsx          # Root layout, font, viewport + Apple PWA meta
    page.tsx            # Routine component (tabs, list, drawer, done toggles)
    manifest.ts         # Web app manifest
    globals.css         # Tailwind import, iOS resets, press states, drawer keyframes
  data/plan.ts          # Weekly plan + exercise details (edit here)
  hooks/useProgress.ts  # Weekly done-state in localStorage
  lib/week.ts           # dayIndex / weekKey helpers (+ tests)
public/
  icon.svg              # Source icon (three accent bars on dark)
  apple-touch-icon.png  # 180×180 for iOS Add-to-Home-Screen
  icon-512.png          # 512×512 generic
railway.json            # Build + start commands for Railway
```

The plan data (`days`) and exercise details (`exerciseInfo`) live in [src/data/plan.ts](src/data/plan.ts) — easy to tweak by hand.

## Upcoming ideas

- **Streaks** — carry a week-over-week completion history instead of resetting on Monday.
- **Per-day deep links** — `/push`, `/pull`, `/core` for routing from a home-screen shortcut.
- **Timer for holds** — a tappable 30/45-second timer on plank, hollow body, etc.
- **Swap suggestions** — alternate movements when wrists are flaring or a pull-up bar isn't around.
