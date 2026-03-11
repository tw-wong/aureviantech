# Company Portal Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3-page static marketing portal (Home, About, Contact) for a tech services company using Next.js 15 App Router.

**Architecture:** Next.js 15 App Router with `output: 'export'` for static site generation. All pages are React Server Components except `ContactForm` which is a Client Component. Tailwind CSS for styling with a Modern Dark theme. Contact form uses Formspree for submission handling.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, React Testing Library, Jest, Formspree

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout — wraps all pages with Navbar + Footer, sets global font/bg |
| `app/page.tsx` | Home page — Hero + Services grid + CTA strip |
| `app/about/page.tsx` | About page — Intro + Mission + Skills |
| `app/contact/page.tsx` | Contact page — ContactForm + contact details |
| `components/Navbar.tsx` | Sticky top nav — logo + page links |
| `components/Footer.tsx` | Footer — logo, nav links, copyright |
| `components/ServiceCard.tsx` | Reusable card for a single service offering |
| `components/ContactForm.tsx` | Client component — controlled form + Formspree POST |
| `next.config.ts` | Next.js config — sets `output: 'export'` |
| `tailwind.config.ts` | Tailwind config — dark theme color tokens |
| `__tests__/Navbar.test.tsx` | Tests for Navbar links and rendering |
| `__tests__/Footer.test.tsx` | Tests for Footer links and copyright |
| `__tests__/ServiceCard.test.tsx` | Tests for ServiceCard props rendering |
| `__tests__/ContactForm.test.tsx` | Tests for form fields, validation, submission |

---

## Chunk 1: Project Setup + Global Config

### Task 1: Scaffold Next.js project

**Files:**
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `app/globals.css`

- [ ] **Step 1: Bootstrap the project**

```bash
cd /Users/tengwai.wong/Repo/repo_tw/portal
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted, accept all defaults. This creates: `app/`, `components/` (if any), `public/`, `next.config.ts`, `tailwind.config.ts`, `package.json`, `tsconfig.json`.

- [ ] **Step 2: Configure static export**

Open `next.config.ts` and replace its contents with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 3: Set up Tailwind dark theme colors**

Replace `tailwind.config.ts` with:

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
        navy: {
          950: "#0f0f1a",
          900: "#1a1a2e",
          800: "#16213e",
          700: "#2d2d4e",
        },
        indigo: {
          500: "#6366f1",
          600: "#4f46e5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Set up global CSS**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0f0f1a;
  color: #e2e8f0;
}
```

- [ ] **Step 5: Install testing dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest
```

- [ ] **Step 6: Create Jest config**

Create `jest.config.ts`:

```typescript
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
```

Create `jest.setup.ts`:

```typescript
import "@testing-library/jest-dom";
```

- [ ] **Step 7: Add test script to package.json**

In `package.json`, add to `"scripts"`:

```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Server running at `http://localhost:3000` with default Next.js page. Stop with Ctrl+C.

- [ ] **Step 9: Commit**

```bash
git init
git add next.config.ts tailwind.config.ts app/globals.css jest.config.ts jest.setup.ts package.json tsconfig.json
git commit -m "chore: scaffold Next.js 15 with static export, Tailwind dark theme, Jest"
```

---

## Chunk 2: Shared Layout — Navbar + Footer

### Task 2: Navbar component

**Files:**
- Create: `components/Navbar.tsx`
- Create: `__tests__/Navbar.test.tsx`

- [ ] **Step 1: Write failing test**

Create `__tests__/Navbar.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders the logo text", () => {
    render(<Navbar />);
    expect(screen.getByText(/portal/i)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Navbar
```

Expected: FAIL — "Cannot find module '@/components/Navbar'"

- [ ] **Step 3: Implement Navbar**

Create `components/Navbar.tsx`:

```typescript
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-navy-900 border-b border-navy-700">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Portal
        </Link>
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
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

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- Navbar
```

Expected: PASS — 2 tests passing

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx __tests__/Navbar.test.tsx
git commit -m "feat: add Navbar component with navigation links"
```

---

### Task 3: Footer component

**Files:**
- Create: `components/Footer.tsx`
- Create: `__tests__/Footer.test.tsx`

- [ ] **Step 1: Write failing test**

Create `__tests__/Footer.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Footer
```

Expected: FAIL — "Cannot find module '@/components/Footer'"

- [ ] **Step 3: Implement Footer**

Create `components/Footer.tsx`:

```typescript
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-700 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold text-white">
          Portal
        </Link>
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-slate-500 text-sm">© 2026 Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- Footer
```

Expected: PASS — 2 tests passing

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx __tests__/Footer.test.tsx
git commit -m "feat: add Footer component"
```

---

### Task 4: Root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update root layout to use Navbar and Footer**

Replace `app/layout.tsx` with:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal — Web, Mobile & Infrastructure",
  description: "We build web applications, mobile apps, and server infrastructure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify layout renders in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: Dark background, Navbar at top, Footer at bottom. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire Navbar and Footer into root layout"
```

---

## Chunk 3: Home Page

### Task 5: ServiceCard component

**Files:**
- Create: `components/ServiceCard.tsx`
- Create: `__tests__/ServiceCard.test.tsx`

- [ ] **Step 1: Write failing test**

Create `__tests__/ServiceCard.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import ServiceCard from "@/components/ServiceCard";

const props = {
  icon: "🌐",
  title: "Web Development",
  description: "We build fast, scalable web applications.",
};

describe("ServiceCard", () => {
  it("renders the title", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByText("Web Development")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByText("We build fast, scalable web applications.")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByText("🌐")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- ServiceCard
```

Expected: FAIL — "Cannot find module '@/components/ServiceCard'"

- [ ] **Step 3: Implement ServiceCard**

Create `components/ServiceCard.tsx`:

```typescript
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl p-8 hover:border-indigo-600 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- ServiceCard
```

Expected: PASS — 3 tests passing

- [ ] **Step 5: Commit**

```bash
git add components/ServiceCard.tsx __tests__/ServiceCard.test.tsx
git commit -m "feat: add ServiceCard component"
```

---

### Task 6: Home page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement Home page**

Replace `app/page.tsx` with:

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
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            We Build{" "}
            <span className="text-indigo-500">Web, Mobile</span>
            {" "}& Infrastructure
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            A tech team that delivers end-to-end digital solutions — from idea to production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/about"
              className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">What We Do</h2>
          <p className="text-slate-400 text-center mb-12">
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
      <section className="bg-navy-900 border-t border-b border-navy-700 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Something?</h2>
          <p className="text-slate-400 mb-8">Tell us about your project and we'll get back to you within 24 hours.</p>
          <Link
            href="/contact"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: Hero section with headline, 3 service cards below, CTA strip at bottom. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: implement Home page with Hero, Services grid, and CTA strip"
```

---

## Chunk 4: About + Contact Pages

### Task 7: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Implement About page**

Create `app/about/page.tsx`:

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
        <h1 className="text-4xl font-bold text-white mb-6">About Us</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          We are a small, senior engineering team passionate about building digital products
          that work. We partner with startups and established companies to deliver web
          applications, mobile apps, and the infrastructure that powers them.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Our Values</h2>
        <ul className="space-y-4">
          {[
            { title: "Quality over speed", desc: "We ship things that work and last, not things that need rewriting in six months." },
            { title: "Clear communication", desc: "No jargon, no surprises. You always know what we're building and why." },
            { title: "End-to-end ownership", desc: "We take responsibility from first commit to production deployment." },
          ].map((item) => (
            <li key={item.title} className="flex gap-4 bg-navy-900 border border-navy-700 rounded-lg p-6">
              <span className="text-indigo-500 font-bold mt-0.5">→</span>
              <div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Our Stack</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-navy-900 border border-indigo-600 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium"
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

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000/about`. Expected: About page with intro, values list, and skills badges. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: implement About page with intro, values, and skills"
```

---

### Task 8: ContactForm component

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `__tests__/ContactForm.test.tsx`

- [ ] **Step 1: Get a Formspree endpoint**

Go to https://formspree.io, sign up for free, create a new form, and copy the form endpoint (looks like `https://formspree.io/f/xxxxxxxx`). Keep it handy — you'll paste it in Step 4.

- [ ] **Step 2: Write failing test**

Create `__tests__/ContactForm.test.tsx`:

```typescript
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

// Mock fetch globally
global.fetch = jest.fn();

beforeEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("allows typing in fields", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), "Alice");
    expect(screen.getByLabelText(/name/i)).toHaveValue("Alice");
  });

  it("shows success message on successful submission", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), "Alice");
    await user.type(screen.getByLabelText(/email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello!");
    await user.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() =>
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    );
  });

  it("shows error message on failed submission", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), "Alice");
    await user.type(screen.getByLabelText(/email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello!");
    await user.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test -- ContactForm
```

Expected: FAIL — "Cannot find module '@/components/ContactForm'"

- [ ] **Step 4: Implement ContactForm**

Create `components/ContactForm.tsx`:

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
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-400 text-center text-sm">
          Message sent! We'll get back to you within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-center text-sm">
          Something went wrong. Please email us directly.
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 5: Set your Formspree endpoint**

Create `.env.local` in the project root with the endpoint you copied in Step 1:

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ACTUAL_ID
```

Also create `.env.local.example` (safe to commit, no real value):

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

Add `.env.local` to `.gitignore` (it should already be there from create-next-app — verify).

- [ ] **Step 6: Run test to verify it passes**

```bash
npm test -- ContactForm
```

Expected: PASS — 4 tests passing

- [ ] **Step 7: Commit**

```bash
git add components/ContactForm.tsx __tests__/ContactForm.test.tsx .env.local.example
git commit -m "feat: add ContactForm with Formspree integration"
```

---

### Task 9: Contact page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Implement Contact page**

Create `app/contact/page.tsx`:

```typescript
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: contact info */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Have a project in mind? We'd love to hear about it. Send us a message
            and we'll get back to you within 24 hours.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Email</p>
              <a
                href="mailto:hello@portal.dev"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                hello@portal.dev
              </a>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
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

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000/contact`. Expected: Two-column layout with contact info on left and form on right. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: implement Contact page"
```

---

## Chunk 5: Final Verification

### Task 10: Run all tests and build

**Files:** none

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: All tests PASS. If any fail, fix before continuing.

- [ ] **Step 2: Run static build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output goes to `out/` directory. You should see:
```
Route (app)                Size
┌ ○ /                      ...
├ ○ /about                 ...
└ ○ /contact               ...
```

If build fails with Image optimization errors, add to `next.config.ts`:
```typescript
images: { unoptimized: true }
```

- [ ] **Step 3: Preview the static build locally**

```bash
npx serve out
```

Open the URL shown (usually `http://localhost:3000`).

- [ ] **Step 3a: Verify Navbar links work** — click Home, About, Contact in the nav; each page loads correctly.

- [ ] **Step 3b: Verify Home page** — hero headline visible, 3 service cards (Web, Mobile, Infra) displayed in a row, CTA strip at bottom.

- [ ] **Step 3c: Verify About page** — intro text visible, 3 value bullets with arrows, skills badges visible.

- [ ] **Step 3d: Verify Contact page** — two-column layout renders, all 3 form fields (Name, Email, Message) and Send button visible.

- [ ] **Step 4: Add .gitignore entries**

Ensure `.gitignore` includes:
```
.superpowers/
out/
```

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: verify build passes, add .gitignore entries"
```
