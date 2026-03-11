# Clean Light Theme + Rebrand — Design Spec

**Date:** 2026-03-10
**Status:** Approved

## Overview

Restyle the existing company portal from Modern Dark (navy/indigo) to Clean Light (white/slate/sky-blue). Bundle in a company name and email update at the same time.

## Approach

**Token swap in `tailwind.config.ts`** — replace custom `navy` color tokens with `light` equivalents, swap `indigo` for `sky`. Then do a targeted find-replace of Tailwind class names across all components and pages.

No new abstraction layer. No CSS variables. Follow the existing patterns exactly.

## Color Token Changes

| Token | Old Value | New Value | Role |
|---|---|---|---|
| `light-50` (was `navy-950`) | `#0f0f1a` | `#f8fafc` | Page background |
| `light-100` (was `navy-900`) | `#1a1a2e` | `#f1f5f9` | Cards, Navbar, Footer bg |
| `light-200` (was `navy-800`) | `#16213e` | `#e2e8f0` | Subtle section backgrounds |
| `light-300` (was `navy-700`) | `#2d2d4e` | `#cbd5e1` | Borders |
| `sky-600` (was `indigo-600`) | `#4f46e5` | `#0284c7` | Primary CTAs, active states |
| `sky-500` (was `indigo-500`) | `#6366f1` | `#0ea5e9` | Hover states, highlights |

## Global CSS Changes

`app/globals.css` — body background `#f8fafc`, text color `#0f172a` (slate-900).

## Files to Update

| File | Changes |
|---|---|
| `tailwind.config.ts` | Rename `navy` → `light`, update hex values; rename `indigo` → `sky`, update hex values |
| `app/globals.css` | Light bg + dark text on body |
| `app/layout.tsx` | Metadata title → "Aurevian Tech Solutions — Web, Mobile & Infrastructure" |
| `components/Navbar.tsx` | Dark bg/text → white bg/slate-900 text; "Portal" → "Aurevian Tech Solutions" |
| `components/Footer.tsx` | Dark bg/text → light bg/slate-600 text; "Portal" → "Aurevian Tech Solutions"; copyright name update |
| `components/ServiceCard.tsx` | Dark card bg → white; dark border → light border; white heading → slate-900 |
| `components/ContactForm.tsx` | Dark inputs → white/light border; indigo button → sky button |
| `app/page.tsx` | Hero dark gradient → white bg; dark text → slate-900; indigo → sky; CTA strip dark → light-100 bg |
| `app/about/page.tsx` | Dark value cards → white/light; indigo skill badges → sky; headings → slate-900 |
| `app/contact/page.tsx` | White headings → slate-900; indigo links → sky; `hello@portal.dev` → `hello@aureviantech.com` |

## Content Updates

- **Company name:** "Portal" → "Aurevian Tech Solutions" (Navbar logo, Footer logo, layout metadata, Footer copyright)
- **Email:** `hello@portal.dev` → `hello@aureviantech.com` (Contact page href + display text)

## Class Mapping Reference

Key Tailwind class swaps across components:

| Old class | New class |
|---|---|
| `bg-navy-950` | `bg-light-50` |
| `bg-navy-900` | `bg-light-100` |
| `bg-navy-800` | `bg-light-200` |
| `border-navy-700` | `border-light-300` |
| `bg-indigo-600` | `bg-sky-600` |
| `bg-indigo-500` | `bg-sky-500` |
| `hover:bg-indigo-500` | `hover:bg-sky-500` |
| `text-indigo-500` | `text-sky-600` |
| `text-indigo-400` | `text-sky-600` |
| `hover:text-indigo-300` | `hover:text-sky-500` |
| `border-indigo-600` | `border-sky-600` |
| `focus:border-indigo-500` | `focus:border-sky-500` |
| `text-white` (headings) | `text-slate-900` |
| `text-slate-300` | `text-slate-600` |
| `text-slate-400` | `text-slate-500` |
| `from-navy-950 via-navy-900 to-navy-800` | `bg-white` (hero section) |

## Constraints

- No dark mode toggle — single theme only
- Tests cover component rendering, not Tailwind classes — existing tests remain valid and need no changes
- Build must pass ESLint and TypeScript checks after changes
