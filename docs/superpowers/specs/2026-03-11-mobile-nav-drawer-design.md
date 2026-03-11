# Mobile Responsive Navigation Drawer

**Date:** 2026-03-11
**Status:** Approved

## Problem

On mobile viewports the Navbar displays the logo and nav links side-by-side, causing the links to overlap the logo (visible at 375px width). The nav needs to be hidden on small screens and replaced with a toggle button.

## Solution

Convert `Navbar` to a client component and add a slide-in drawer for mobile. On desktop (md+) the existing horizontal link list is shown unchanged. On mobile, a hamburger button replaces the links; pressing it opens a right-side drawer with dark-green branding, icons, and a dim backdrop.

## Design

### DOM structure

The `<nav>` flex container keeps two top-level children: the logo `<Link>` (left) and a right-side wrapper `<div>` (right). The wrapper contains both the desktop `<ul>` and the mobile hamburger `<button>` as siblings. `justify-between` on `<nav>` positions them correctly on all screen sizes.

```
<nav justify-between>
  <Link>               ← logo
  <div>                ← right-side wrapper
    <ul hidden md:flex> ← desktop links
    <button md:hidden>  ← mobile hamburger
```

### Closed state (mobile)
- Logo unchanged on the left.
- Right-side wrapper shows only the hamburger `<button>` (`Menu` icon from lucide-react; `<ul>` is `hidden md:flex`).

### Open state (mobile)
- The hamburger `<button>` always shows `Menu` (3 lines). It does **not** swap to X.
- **Backdrop:** always in DOM; classes: `fixed inset-0 bg-black/50 z-[55] transition-opacity duration-300`. When closed: `opacity-0 pointer-events-none`. When open: `opacity-100`. `z-[55]` sits above the header (`z-50`) and below the drawer (`z-[60]`). When the drawer is open, the backdrop intentionally covers the header (and the hamburger button) — the in-drawer X button is the primary close control. Has `aria-hidden="true"`. `onClick={() => setIsOpen(false)}`.
- **Drawer panel:** always in DOM; classes: `fixed top-0 right-0 h-full w-3/4 max-w-sm bg-[#1a3528] z-[60] transition-transform duration-300`. Closed: `translate-x-full`. Open: `translate-x-0`. `max-w-sm` (384px) caps the drawer on wider mobile/small-tablet viewports (428–767px).
- **Drawer internal layout:**
  - Top row: `X` close button (`X` icon, `aria-label="Close menu"`) right-aligned, `p-4`. This is the only X in the UI.
  - Links section: `pt-4`.
  - Each link is a Next.js `<Link>` with `flex items-center gap-3 px-6 py-4 border-b border-white/10`.
  - Each link has a lucide-react icon using `text-[#86efac]` (≈ Tailwind `text-green-300`).
    - Home → `Home` icon
    - About → `Info` icon
    - Contact → `Mail` icon
  - Link text: `text-[#e2e8f0]`, hover: `hover:text-white`.
- `<body>` receives `overflow-hidden` while the drawer is open (scroll lock). Since `Navbar` lives in the root layout and never unmounts, scroll lock is managed entirely through the `useEffect([isOpen])` cycle — when `isOpen` becomes `false` (via X, backdrop, link click, or Escape), the effect re-runs and removes the class synchronously before the next render.

### Closing the drawer
- Click the X button **inside the drawer** (top-right of drawer panel).
- Click the dim backdrop.
- Navigate to any link (`onClick` on each `<Link>`).
- Press `Escape` key.
- On close, focus returns to the hamburger button.

### Desktop (md and above)
- Hamburger button is hidden (`md:hidden`); the `<ul>` is shown (`hidden md:flex items-center gap-8`).
- Drawer and backdrop remain in the DOM but are visually hidden and non-interactive.
- No behavioural change on desktop.

## Architecture

- **Component:** `components/Navbar.tsx` — add `'use client'` directive.
- **State:** `const [isOpen, setIsOpen] = useState(false)`.
- **Ref:** `const hamburgerRef = useRef<HTMLButtonElement>(null)` — focus returns here on close.
- **Scroll lock effect:** `useEffect` with dependency array `[isOpen]`; adds/removes `overflow-hidden` on `document.body`. Cleanup function removes the class to handle unmount mid-open.
- **Escape key effect:** `useEffect` with dependency array `[isOpen]`; attaches a `keydown` listener when `isOpen` is true. Cleanup removes the listener.
- **Animation:** `transition-transform duration-300` on drawer; `transition-opacity duration-300` on backdrop.
- **Icons:** `lucide-react` — `Menu`, `X`, `Home`, `Info`, `Mail`.
- **No new files needed** — all changes in `Navbar.tsx`.

## Accessibility
- Hamburger `<button>` has static `aria-label="Open menu"` (not toggled — the button is covered by the backdrop when the drawer is open and is non-interactive; the in-drawer X handles close for all users).
- Hamburger `<button>` has `aria-expanded={isOpen}` and `aria-controls="mobile-drawer"`.
- Drawer panel has `id="mobile-drawer"` and `aria-label="Navigation"` (aspirational — has no semantic effect without `role="dialog"`, which is out of scope).
- Backdrop has `aria-hidden="true"`.
- On close, focus returns to the hamburger button immediately via `hamburgerRef.current?.focus()` (before the 300ms transition ends; acceptable for this iteration).
- `useEffect` callbacks only access `document` inside the effect body, which is never called on the server.

## Out of Scope
- `role="dialog"`, `aria-modal`, and focus trap inside the drawer (known accessibility gap, future iteration).
- `aria-current="page"` on active links.
- Active link visual highlighting.
- Any desktop layout changes.
