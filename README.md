# 💪 FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up. Built for Assignment 6 (B14-A6-Fit-Log).


## Description

FitLog lets you browse a 12-exercise workout library, open a detailed page for any lift (equipment, sets/reps, instructions), and either add it to **Today's Plan** (capped at 5 lifts) or **Save it for later**. The My Plan page tracks live totals for exercises, minutes, and calories, and everything persists across reloads via `localStorage`.

## Technologies Used

- **Next.js 14** (App Router) — routing, layouts, dynamic `/workout/[id]` routes
- **React** — client components, hooks, Context API for global state
- **Tailwind CSS** — utility-first styling, fully responsive dark theme
- **Google Fonts** (Oswald + Inter) via `next/font`
- **FitLog REST API** — `https://api.abcz.workers.dev/api/fitlog`

## Features

1. **Responsive workout library** — 3x4 grid on desktop that collapses gracefully on tablet and mobile, with a live "Sort By" dropdown (Duration / Calories / Rating).
2. **Detailed workout pages** — two-column layout with key specs, step-by-step instructions, and Add to Plan / Save for Later actions.
3. **Persistent My Plan** — Today's Plan (5-lift cap) and Saved tabs with live metrics (exercises, minutes, calories), Mark as Done, and Remove — all saved to `localStorage` so it survives a refresh.
4. **Toast notifications** — instant feedback for every plan/save/remove/done action.
5. **Navbar badges** — Plan and Saved pill counters that update in real time and link straight to `/my-plan`.
6. **Polished empty & loading states** — animated loading spinner while fetching, a friendly "Nothing here yet" empty state, and a custom 404 page for unknown routes.

## Getting Started

```bash
npm install
npm run dev
```


## Build

```bash
npm run build
npm start
```

## Deployment

Deploy directly to Vercel (recommended for Next.js)
Live Link: https://fitlog-lovat.vercel.app/
