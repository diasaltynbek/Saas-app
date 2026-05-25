# ⚡ Apex — SaaS Productivity Platform

A production-ready SaaS productivity application built with React 18, TypeScript, Tailwind CSS, Recharts, and Zustand.

---

## 🗂 Folder Structure

```
apex-app/
├── index.html                    # Vite HTML entry
├── vite.config.ts                # Vite config with path aliases
├── tailwind.config.js            # Custom design tokens
├── tsconfig.json                 # TypeScript strict config
├── package.json
└── src/
    ├── main.tsx                  # React root render
    ├── App.tsx                   # Shell + router
    ├── index.css                 # Global CSS + design tokens (CSS vars)
    │
    ├── types/
    │   └── index.ts              # All TypeScript interfaces & types
    │
    ├── data/
    │   └── mockData.ts           # Realistic mock data (tasks, users, events…)
    │
    ├── store/
    │   └── useAppStore.ts        # Zustand global store (auth, tasks, notifs, chat…)
    │
    ├── lib/
    │   └── utils.ts              # Helpers (formatDate, TAG_CONFIG, uid…)
    │
    ├── components/
    │   ├── ui/
    │   │   ├── index.tsx         # Badge, Avatar, Card, Toggle, ProgressBar, IconBtn…
    │   │   └── NotificationPanel.tsx
    │   └── layout/
    │       ├── Sidebar.tsx       # Collapsible sidebar nav
    │       └── Topbar.tsx        # Search, theme toggle, notifications, user avatar
    │
    └── pages/
        ├── LoginPage.tsx         # Auth (sign in / register) with OAuth buttons
        ├── DashboardPage.tsx     # Stats, area chart, activity feed, team load
        ├── TasksPage.tsx         # Kanban board with real drag-and-drop
        ├── CalendarPage.tsx      # Monthly calendar + event sidebar
        ├── AnalyticsPage.tsx     # Bar charts, donut charts, KPIs, team perf
        ├── TeamPage.tsx          # Member list + live chat simulation
        ├── InboxPage.tsx         # Two-pane inbox with reply
        └── SettingsPage.tsx      # Profile, theme, toggles, danger zone
```

---

## 🚀 Getting Started

```bash
cd apex-app
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
```

---

## 🎨 Design System

All design tokens live in `src/index.css` as CSS custom properties:

| Token              | Purpose                          |
|--------------------|----------------------------------|
| `--bg-base`        | App background                   |
| `--bg-elevated`    | Sidebar, cards                   |
| `--surface`        | Card surfaces (glassmorphism)    |
| `--border`         | Subtle borders                   |
| `--text-primary`   | Headings, body                   |
| `--text-secondary` | Subtext                          |
| `--brand`          | `#7c6fff` — primary accent       |
| `--teal`           | `#00d4aa` — success / dev        |
| `--rose`           | `#ff6b8a` — danger / marketing   |
| `--amber`          | `#ffb347` — warning / research   |

Dark mode is the default. Light mode is toggled by adding `.light` to `<html>`.

---

## ✨ Features

| Feature                     | Location                    |
|-----------------------------|-----------------------------|
| Kanban drag-and-drop        | `TasksPage.tsx`             |
| Dark / light mode           | `Topbar.tsx` + CSS vars     |
| Glassmorphism cards         | `.glass-card` class         |
| Zustand global state        | `store/useAppStore.ts`      |
| Real-time chat simulation   | `TeamPage.tsx`              |
| Area + Bar + Donut charts   | `AnalyticsPage.tsx`         |
| Notification panel          | `NotificationPanel.tsx`     |
| Collapsible sidebar         | `Sidebar.tsx`               |
| Calendar with events        | `CalendarPage.tsx`          |
| Responsive (mobile ≥ 768px) | `index.css` media queries   |

---

## 🔌 Extending

**Swap mock data → Supabase:**
```ts
// src/store/useAppStore.ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(URL, ANON_KEY)
// Replace INITIAL_TASKS with: const { data } = await supabase.from('tasks').select()
```

**Add Framer Motion page transitions:**
```tsx
import { AnimatePresence, motion } from 'framer-motion'
// Wrap <PageContent /> with <AnimatePresence mode="wait">
// Add <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
```

**Add @dnd-kit for polished drag-and-drop:**
```tsx
import { DndContext, useSortable } from '@dnd-kit/core'
// Replace native HTML5 drag events in TasksPage.tsx
```
