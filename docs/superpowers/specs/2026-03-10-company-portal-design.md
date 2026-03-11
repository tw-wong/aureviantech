# Company Portal — Design Spec

**Date:** 2026-03-10
**Status:** Approved

## Overview

A public-facing marketing portal for a tech services company offering web development, mobile app development, and server infrastructure services. The primary audience is potential clients looking to hire the team.

## Approach

**Next.js 15 App Router with Static Export**

All pages pre-rendered as static HTML at build time. No Node.js server required — deployable to any static host (Netlify, GitHub Pages, Vercel, S3, etc.).

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Output:** Static export (`output: 'export'`)
- **Contact form:** Formspree (free tier, no backend needed)

## Visual Design

- **Style:** Modern Dark
- **Background:** Deep navy/dark (`#0f0f1a`, `#1a1a2e`, `#16213e`)
- **Accent:** Indigo/purple (`#4f46e5`, `#6366f1`)
- **Text:** White + light slate for secondary
- **Buttons:** Indigo filled (primary), ghost/outline (secondary)

## File Structure

```
portal/
  app/
    layout.tsx        ← shared Navbar + Footer
    page.tsx          ← Home (/)
    about/
      page.tsx        ← About (/about)
    contact/
      page.tsx        ← Contact (/contact)
  components/
    Navbar.tsx
    Footer.tsx
    ServiceCard.tsx
    ContactForm.tsx
  next.config.ts      ← output: 'export'
  tailwind.config.ts
```

## Pages

### Home (`/`)

1. **Navbar** — Logo left, links right (Home · About · Contact), sticky, dark bg with subtle bottom border
2. **Hero** — Full-width dark gradient section, bold headline ("We Build Web, Mobile & Infrastructure"), subheadline, two CTAs: "Get in Touch" (indigo filled) + "Learn More" (ghost outline)
3. **Services** — 3 cards in a row: Web Development, Mobile Apps, Server Infrastructure — each with icon, title, short description
4. **CTA Strip** — Dark accent band: "Ready to build something?" + "Contact Us" button linking to `/contact`
5. **Footer** — Logo, nav links, copyright line

### About (`/about`)

1. Intro paragraph about the company/team
2. Mission or values (2–3 bullet points)
3. Tech stack/skills section (badge-style tags: React, Node.js, AWS, etc.)

### Contact (`/contact`)

1. Contact form: Name, Email, Message, Submit button
2. Form submits to Formspree (client-side POST)
3. Below form: email address + optional social links (GitHub, LinkedIn)

## Components

| Component | Purpose |
|---|---|
| `Navbar` | Sticky top nav with logo and page links |
| `Footer` | Bottom section with links and copyright |
| `ServiceCard` | Reusable card for each service offering |
| `ContactForm` | Client component with Formspree integration |

## Constraints & Decisions

- **No portfolio section** — keep homepage minimal, focused on services
- **No testimonials** — not needed for initial version
- **Static export** means no API routes — Formspree handles contact form submissions
- **All Server Components by default** except `ContactForm` (needs client-side form state → `'use client'`)
