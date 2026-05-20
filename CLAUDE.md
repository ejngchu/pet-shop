# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 pet shop website with 10 pages. It uses:
- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS v4** (CSS-based configuration, no tailwind.config.js)
- **Framer Motion** for page transitions and animations
- **Zustand** for state management
- **TanStack Query** for server state with SSR hydration support

## Commands

```bash
npm run dev      # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

### Route Groups
The app uses Next.js route groups for layout separation:
- `(marketing)` — public pages (home, about, store-info, guarantee)
- `(shop)` — shop pages (pets listing, pet detail, cart, checkout)
- `(auth)` — authentication pages (login, register)

### State Management
- **Zustand stores** in `src/stores/`:
  - `pet-store.ts` — pet data and fetching
  - `cart-store.ts` — shopping cart with localStorage persistence
  - `auth-store.ts` — user authentication state
  - `ui-store.ts` — UI state (modals, sidebars)

### Data Fetching Pattern
TanStack Query with SSR hydration:
1. Server Component prefetches with `prefetchQuery`
2. `dehydrate()` exports the state
3. `HydrationBoundary` in `Providers` hydrates on client

Query keys: `['pets', 'list']`, `['pets', 'detail', id]`, `['cart']`, `['user']`

### Template System
`src/app/template.tsx` wraps all pages with `PageTransition` for fade animations on route changes.

### Component Structure
- `src/components/ui/` — reusable UI components (Button, Card, Input, Modal, Badge)
- `src/components/animations/` — animation components (PageTransition, FadeIn, SlideIn)
- `src/components/pets/` — pet-specific components and types
- `src/components/navigation/` — Header, NavBar, Footer

### Tailwind v4 Theme
Custom colors defined in `src/app/globals.css` via `@theme inline`:
- `--color-brand-*` — orange brand palette (50-900)
- `--color-brown-*` — brown accent palette (50-900)
- `--shadow-pet`, `--shadow-pet-hover` — custom pet shop shadows

## Key Files
- `src/app/layout.tsx` — root layout with Providers and Template
- `src/app/providers.tsx` — QueryClient provider with hydration boundary
- `src/lib/query-client.ts` — SSR-safe QueryClient factory
