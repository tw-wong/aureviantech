# Aurevian Tech — Site Redesign Design

**Date:** 2026-06-10
**Branch:** `feat/site-redesign`
**Source:** Claude Design handoff bundle (`Aurevian Tech - Redesign.html` + `aurevian-tech-design-system` tokens/components + chat transcript).

## Goal

Replace the current sky-blue marketing site with the new **lime-green / sage / forest**
design system. Reuse the existing stack — **Next.js 15 (App Router) + Tailwind CSS** — and
the existing three routes (Home, About, Contact). Recreate the design's *visual output*
faithfully, **not** its prototype internals: no React-UMD/Babel runtime, no `image-slot`
web component, no Tweaks panel.

## Brand summary

A calm, Scandinavian-magazine feel for a senior engineering studio. One vivid action
colour (lime green) on a sage canvas, generous 24px-rounded cards, heavy display sans
headlines. Surface contrast (sage page vs white card) carries elevation — resting cards
have no shadow. Bands alternate sage → white → ink down the page. No emoji; plain,
confident, sentence-case copy.

## 1. Design tokens (foundation)

Everything references tokens, never hard-coded values.

- **CSS custom properties** in `app/globals.css`, ported from the design system:
  - Colours: `--color-primary #9fe870`, `--color-primary-active #cdffad`,
    `--color-primary-neutral #c5edab`, `--color-primary-pale #e2f6d5`,
    `--color-on-primary #163300`, `--color-canvas #ffffff`, `--color-canvas-soft #e8ebe6`,
    `--color-ink #0e0f0c`, `--color-ink-deep #163300`, `--color-body #454745`,
    `--color-mute #868685`, plus semantic positive/warning/negative and accent
    orange/cyan.
  - Radius: `--radius-sm 8`, `--radius-md 12`, `--radius-lg 16`, `--radius-xl 24` (canonical),
    `--radius-pill/full 9999`.
  - Spacing: 4px scale `--space-xxs 2` … `--space-3xl 48`; `--container-max 1200`,
    `--container-text 768`.
  - Shadows: `--shadow-soft`, `--shadow-float`. Motion: `--ease-standard
    cubic-bezier(0.2,0,0,1)`, `--dur-fast 120ms`, `--dur-base 200ms`.
- **Tailwind theme** (`tailwind.config.ts`) maps tokens to utility names so pages use clean
  classes: colours (`bg-canvas-soft`, `bg-canvas`, `bg-ink`, `text-ink`, `text-body`,
  `text-mute`, `text-positive-deep`, `bg-primary`, `text-on-primary`, `bg-primary-pale`,
  …), `rounded-xl` (24px), `rounded-lg` (16px), `rounded-md` (12px), `shadow-soft`,
  `font-display`, `font-body`, `font-wordmark`, container max widths. Old `sky`/`light`
  palettes removed.
- **Fonts** via `next/font/google`: add **Manrope** (weights 500–800; 800 = display) next
  to existing **Inter** (body) and **Playfair Display** (wordmark only). Expose as
  `--font-display`, `--font-body`, `--font-wordmark`.

## 2. Reusable components (`components/`)

Typed Tailwind/React recreations of the design-system primitives. Visual contracts match
the bundle exactly.

- **Button** — variants `primary` (lime bg, forest text), `secondary` (sage), `tertiary`
  (white + 1px ink hairline), `dark` (ink bg, lime text); sizes sm/md/lg (md/lg radius
  24px); hover `brightness(0.96)`, active `scale(0.98)`; `iconLeft/iconRight`, `fullWidth`,
  `disabled`.
- **IconButton** — circular (44px md), tertiary white/hairline default.
- **Card** — variants content (white) / sage / dark / outline; `padding` prop; `lifted`
  adds `shadow-soft`; 24px radius.
- **ServiceCard** — `Card` (content) with a soft-green icon tile (56px, 16px radius,
  forest glyph), title, description; hover raises a lime border + soft shadow.
- **Badge** — small pill; positive/neutral/negative/warning.
- **Input / Textarea** — hairline 1px ink border, 12px radius, lime focus halo
  (`0 0 0 3px primary-pale`), error → negative border + message; label above.
- **Navbar** — sticky white, ink hairline bottom. Left: logo-icon + Playfair "AUREVIAN /
  TECH SOLUTIONS" lockup. Desktop: links (active = ink text + 2px lime underline) + lime
  "Get in Touch" CTA (Button sm). **Retains the existing accessible mobile drawer** —
  hamburger, backdrop, scroll-lock, Escape-to-close, focus return — restyled to the dark
  forest theme. Client component.
- **Footer** — dark ink band: logo lockup + tagline, Services + Company link columns,
  hairline divider, copyright. Links hover to lime.
- **Shared helpers**: `Icon` is just `lucide-react` (no wrapper needed); `SectionHeading`
  (eyebrow + display `<h2>` clamp + optional lead), `Eyebrow` (lime tick + uppercase
  forest kicker), `ArrowLink` ("Read More" + arrow that nudges on hover),
  `ImagePlaceholder` (on-brand sage/`primary-pale` rounded tile with a centred Lucide icon
  + caption, configurable height/radius/shape).

## 3. Pages

- **Home** (`app/page.tsx`):
  Hero (pale-green "Available for new projects" pill, headline "We build the software
  behind your **business**.", lead, Get Started / Learn More buttons, 12+/80+/24h stats,
  `ImagePlaceholder` + floating "End-to-end ownership" card) → **Services** (centred
  heading + 4 ServiceCards: Web Development, Mobile Apps, Infrastructure, Consultancy, each
  with a Read More ArrowLink) → **How we work** (dark band: placeholder + 4 numbered steps
  + "Start a project") → **About the studio** (split: placeholder with 12+ badge + heading,
  3 check points, Read More) → **Testimonials** (3 sage cards, lime 5-star row, avatar
  placeholder + name/role) → **Final CTA** (dark band, lime headline, Contact Us).
- **About** (`app/about/page.tsx`):
  Intro split (eyebrow + large title + lead + Work with us / Our services buttons +
  placeholder) → **Values** (3 cards, lime icon tiles) → **Team** (4 centred avatar cards) →
  **The stack** (dark band, capability pills: React, Next.js, React Native, Node.js, Go,
  PostgreSQL, AWS, Kubernetes, Terraform, CI/CD).
- **Contact** (`app/contact/page.tsx` + client form):
  Split — info column (eyebrow + title + lead + email/response-time/location rows with
  icon tiles + GitHub/LinkedIn/X IconButtons) and a lifted white `Card` containing the
  **validated message form** (Name, Email, Message). Inline errors on empty/invalid;
  on submit → 900ms "Sending…" → success panel (check tile, "Message sent", "Send another").
  Client component; submission is simulated (no backend), matching the design.

## 4. Tests (TDD)

Update the existing Jest + React Testing Library suites to match redesigned components,
writing/adjusting tests alongside each component:

- `Navbar.test.tsx` — logo lockup, desktop links + CTA, mobile drawer open/close, Escape,
  scroll-lock, focus return, no duplicate-link query issues.
- `Footer.test.tsx` — column titles, links, copyright.
- `ServiceCard.test.tsx` — renders icon, title, description.
- `ContactForm.test.tsx` (or new `Contact` form test) — validation errors on empty submit,
  invalid email, and success state after valid submit.
- New small tests for `Button` variants and the contact form's success transition as
  needed. Keep the suite green.

## 5. Out of scope

- Tweaks panel and `image-slot` drag-and-drop (design-tool artifacts only).
- Real photography (on-brand placeholders instead).
- New routes — "Services" remains a Footer link, not its own page.
- Backend form submission (success is simulated).
- The old sky-blue theme — fully retired.

## Acceptance criteria

- `npm run build`, `npm run lint`, and `npm test` all pass.
- All three pages render the new green/sage/forest design with correct tokens, fonts,
  radii, and section band alternation.
- Navbar mobile drawer remains fully accessible (keyboard + scroll-lock + focus).
- No references to the retired sky-blue palette or `image-slot`/Tweaks remain.
