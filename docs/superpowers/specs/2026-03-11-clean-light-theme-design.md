# Navbar Logo & Favicon — Design Spec

**Date:** 2026-03-11
**Status:** Approved

## Overview

Add the Aurevian Tech Solutions logo icon to the navbar and browser favicon. The logo icon is a hand-crafted SVG approximation of the company's circuit-wave mark. The navbar brand text is styled to match the logo's bold serif typography.

## Files

| File | Action | Description |
|---|---|---|
| `public/logo-icon.svg` | Create | Circuit-wave SVG icon |
| `app/icon.svg` | Create | Same SVG — Next.js auto-serves as favicon |
| `app/layout.tsx` | Update | Add Playfair Display via `next/font/google` |
| `components/Navbar.tsx` | Update | Replace text link with icon + two-line styled brand |

## SVG Icon Spec (`public/logo-icon.svg`)

- **ViewBox:** `0 0 80 60`
- **Structure:** 5 stacked wavy paths (S-curves using cubic bezier), each with filled circle nodes at endpoints and mid-wave intersections
- **Colors:** Gradient dark-to-light green, bottom to top:
  - Line 1 (darkest): `#1a3528`
  - Line 2: `#24503c`
  - Line 3 (middle): `#2e6b50`
  - Line 4: `#3d8a68`
  - Line 5 (lightest): `#5aaa88`
- **Stroke width:** 3px, `stroke-linecap: round`
- **Nodes:** `r=3` circles at line endpoints, `r=2.5` at mid-wave points

## Favicon

Place `app/icon.svg` (identical to `public/logo-icon.svg`) in the `app/` directory. Next.js App Router automatically detects and serves `app/icon.svg` as the browser tab favicon — no changes to `layout.tsx` metadata required.

## Navbar Brand

### Font
Add **Playfair Display** (Google Font) via `next/font/google` in `app/layout.tsx`. Apply the font variable to `<body>` so it's available globally.

### Layout
```
[ SVG icon 40×30px ] [ AUREVIAN          ]
                      [ TECH SOLUTIONS    ]
```

- Icon: `<Image src="/logo-icon.svg" width={40} height={30} alt="Aurevian Tech Solutions logo" />`
- Line 1 `AUREVIAN`: `font-playfair font-black text-[15px] text-[#1a3528] tracking-[0.08em] uppercase`
- Line 2 `TECH SOLUTIONS`: `font-playfair font-bold text-[10px] text-[#2e6b50] tracking-[0.15em] uppercase`
- Wrapper: `flex items-center gap-3`

## Constraints

- No external image files — SVG is inline/self-contained
- No `<img>` tags — use `next/image` for the navbar icon
- Font loaded at build time via `next/font/google` (zero runtime overhead)
- Favicon requires no `<link>` tag — handled by Next.js file convention
