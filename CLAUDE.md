# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Architecture

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Lucide React

**Data layer** — all local, no external DB:
- `data/db.json` — single JSON file with `students`, `events`, `categories` arrays
- `lib/db.ts` — `readDb()` / `writeDb()` via Node.js `fs` (server-only)
- `lib/types.ts` — shared TypeScript interfaces (`Student`, `Event`, `Category`, etc.)
- `lib/queries.ts` — pure read functions: `getLeaderboardByPeriod()`, `getStudentStats()`, etc. Points are always computed from events, never stored directly.
- `lib/actions.ts` — Next.js Server Actions for all mutations (`addEvent`, `addStudent`, `deleteStudent`, `addCategory`, `deleteCategory`, `undoLastEvent`). Each action calls `revalidatePath()` to trigger re-render.

**Pattern:** Server Components read data directly (no fetch/API), Server Actions mutate + revalidate. No client-side state management library needed.

**Pages:**
- `/` — Dashboard: student grid + leaderboard (week/month/all)
- `/elevi/[id]` — Student profile: stats + full event history
- `/grupuri` — Random student picker + group builder
- `/setari` — Manage students and categories

**Key components:**
- `StudentGrid` (client) — renders student cards, opens `QuickAction` modal on click
- `QuickAction` (client) — modal for adding/removing points with predefined categories + undo last action
- `Leaderboard` (client) — tabbed leaderboard, receives pre-computed data as props
- `GrupuriClient` / `SetariClient` — fully client-side interactive pages with `useTransition` for Server Actions

**Routing pattern for interactive pages:** Server page component fetches data → passes as props to a `*Client.tsx` component marked `"use client"`.
