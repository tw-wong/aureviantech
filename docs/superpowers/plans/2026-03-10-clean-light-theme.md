# Clean Light Theme + Rebrand Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the portal from Modern Dark (navy/indigo) to Clean Light (white/slate/sky-blue) and rebrand to "Aurevian Tech Solutions".

**Architecture:** Token swap approach — rename `navy` color tokens to `light` in `tailwind.config.ts`, swap `indigo` for `sky`, update `globals.css`, then replace Tailwind class names across all components and pages. No new abstraction layer. Existing tests remain valid (they test behavior, not CSS classes) and need no changes.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3

---

## File Map

| File | Change Type |
|---|---|
| `tailwind.config.ts` | Rename navy→light tokens, indigo→sky tokens, update hex values |
| `app/globals.css` | Light bg, dark text on body |
| `app/layout.tsx` | Metadata title rebrand |
| `components/Navbar.tsx` | Class swap + "Portal" → "Aurevian Tech Solutions" |
| `components/Footer.tsx` | Class swap + name + copyright update |
| `components/ServiceCard.tsx` | Class swap |
| `components/ContactForm.tsx` | Class swap |
| `app/page.tsx` | Class swap (hero, services, CTA strip) |
| `app/about/page.tsx` | Class swap |
| `app/contact/page.tsx` | Class swap + email update |

---

## Chunk 1: Foundation — Tailwind Tokens + Global CSS + Layout Metadata

### Task 1: Update Tailwind config and global CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `tailwind.config.ts`**

Replace the entire file with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
        },
        sky: {
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Replace `app/globals.css`**

Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #f8fafc;
  color: #0f172a;
}
```

- [ ] **Step 3: Update metadata in `app/layout.tsx`**

Replace the metadata block only:

```typescript
export const metadata: Metadata = {
  title: "Aurevian Tech Solutions — Web, Mobile & Infrastructure",
  description: "We build web applications, mobile apps, and server infrastructure.",
};
```

- [ ] **Step 4: Verify the build still compiles**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm run build 2>&1 | tail -20
```

Expected: Build succeeds (some pages may lose styling temporarily — that's fine, classes will be fixed in subsequent tasks).

---

## Chunk 2: Shared Components

### Task 2: Navbar

**Files:**
- Modify: `components/Navbar.tsx`
- Test: `__tests__/Navbar.test.tsx` (no change needed — tests check links/text, not classes)

- [ ] **Step 1: Replace `components/Navbar.tsx`**

```typescript
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-light-300">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900 tracking-tight">
          Aurevian Tech Solutions
        </Link>
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Update Navbar test to match new company name**

Open `__tests__/Navbar.test.tsx` and change:
```typescript
expect(screen.getByText(/portal/i)).toBeInTheDocument();
```
to:
```typescript
expect(screen.getByText(/aurevian tech solutions/i)).toBeInTheDocument();
```

- [ ] **Step 3: Run Navbar tests**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm test -- Navbar
```

Expected: PASS — 2 tests passing.

---

### Task 3: Footer

**Files:**
- Modify: `components/Footer.tsx`
- Modify: `__tests__/Footer.test.tsx` (update logo text matcher)

- [ ] **Step 1: Replace `components/Footer.tsx`**

```typescript
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-light-100 border-t border-light-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold text-slate-900">
          Aurevian Tech Solutions
        </Link>
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-slate-500 hover:text-slate-900 transition-colors text-sm">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-slate-400 text-sm">© 2026 Aurevian Tech Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Run Footer tests**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm test -- Footer
```

Expected: PASS — 2 tests passing.

---

### Task 4: ServiceCard

**Files:**
- Modify: `components/ServiceCard.tsx`

- [ ] **Step 1: Replace `components/ServiceCard.tsx`**

```typescript
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white border border-light-300 rounded-xl p-8 hover:border-sky-600 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
```

- [ ] **Step 2: Run ServiceCard tests**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm test -- ServiceCard
```

Expected: PASS — 3 tests passing (tests check text content only, not classes).

---

### Task 5: ContactForm

**Files:**
- Modify: `components/ContactForm.tsx`

- [ ] **Step 1: Replace `components/ContactForm.tsx`**

```typescript
"use client";

import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-white border border-light-300 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-white border border-light-300 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-white border border-light-300 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-center text-sm">
          Message sent! We&apos;ll get back to you within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-center text-sm">
          Something went wrong. Please email us directly.
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Run ContactForm tests**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm test -- ContactForm
```

Expected: PASS — 4 tests passing.

---

## Chunk 3: Pages

### Task 6: Home page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```typescript
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks. From landing pages to complex SaaS products.",
  },
  {
    icon: "📱",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android, built to scale.",
  },
  {
    icon: "🖥️",
    title: "Server Infrastructure",
    description:
      "Cloud architecture, DevOps, CI/CD pipelines, and server management for reliable, scalable systems.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-28 px-6 border-b border-light-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            We Build{" "}
            <span className="text-sky-600">Web, Mobile</span>
            {" "}& Infrastructure
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            A tech team that delivers end-to-end digital solutions — from idea to production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/about"
              className="border border-light-300 hover:border-slate-400 text-slate-600 hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-light-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">What We Do</h2>
          <p className="text-slate-500 text-center mb-12">
            Three core service areas — one team that connects them all.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-light-100 border-t border-b border-light-300 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Build Something?</h2>
          <p className="text-slate-500 mb-8">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
          <Link
            href="/contact"
            className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
```

---

### Task 7: About page

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Replace `app/about/page.tsx`**

```typescript
const skills = [
  "React", "Next.js", "TypeScript", "Node.js",
  "React Native", "Flutter", "AWS", "GCP",
  "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Intro */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">About Us</h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          We are a small, senior engineering team passionate about building digital products
          that work. We partner with startups and established companies to deliver web
          applications, mobile apps, and the infrastructure that powers them.
        </p>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Values</h2>
        <ul className="space-y-4">
          {[
            { title: "Quality over speed", desc: "We ship things that work and last, not things that need rewriting in six months." },
            { title: "Clear communication", desc: "No jargon, no surprises. You always know what we're building and why." },
            { title: "End-to-end ownership", desc: "We take responsibility from first commit to production deployment." },
          ].map((item) => (
            <li key={item.title} className="flex gap-4 bg-white border border-light-300 rounded-lg p-6">
              <span className="text-sky-600 font-bold mt-0.5">→</span>
              <div>
                <h3 className="text-slate-900 font-semibold mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Stack</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-white border border-sky-600 text-sky-600 px-4 py-1.5 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

### Task 8: Contact page

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Replace `app/contact/page.tsx`**

```typescript
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: contact info */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Have a project in mind? We&apos;d love to hear about it. Send us a message
            and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-wide mb-1">Email</p>
              <a
                href="mailto:hello@aureviantech.com"
                className="text-sky-600 hover:text-sky-500 transition-colors"
              >
                hello@aureviantech.com
              </a>
            </div>
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-wide mb-1">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <ContactForm />
      </div>
    </div>
  );
}
```

---

## Chunk 4: Final Verification

### Task 9: Run all tests and build

**Files:** none

- [ ] **Step 1: Run full test suite**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm test
```

Expected: All 11 tests pass across 4 suites. If any fail, fix before continuing.

- [ ] **Step 2: Run static build**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm run build
```

Expected: Build succeeds with no errors. All 3 routes show `○ (Static)`.

- [ ] **Step 3: Verify in dev server**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm run dev
```

Open `http://localhost:3000` and verify:

- [ ] **Step 3a:** White/light background throughout (no dark navy anywhere)
- [ ] **Step 3b:** "Aurevian Tech Solutions" appears in Navbar and Footer
- [ ] **Step 3c:** Sky blue buttons on Hero and CTA strip
- [ ] **Step 3d:** `/about` — white value cards, sky blue skill badge borders
- [ ] **Step 3e:** `/contact` — `hello@aureviantech.com` displayed and linked correctly

Stop dev server with Ctrl+C.
