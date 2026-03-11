# Mobile Nav Drawer Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Navbar responsive by hiding nav links on mobile and replacing them with a hamburger button that opens a right-side drawer.

**Architecture:** Convert `Navbar` to a client component with `useState` for open/close, `useEffect` for scroll-lock and Escape-key handling, and `useRef` for focus restoration. A backdrop and drawer panel are always in the DOM, shown/hidden via Tailwind transition classes.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, lucide-react

---

## Chunk 1: Branch + Tests

### Task 1: Create feature branch

**Files:**
- No file changes — git only

- [ ] **Step 1: Create and switch to feature branch**

```bash
git checkout -b feat/mobile-nav-drawer
```

Expected: `Switched to a new branch 'feat/mobile-nav-drawer'`

---

### Task 2: Update Navbar tests to cover responsive behaviour

**Files:**
- Modify: `__tests__/Navbar.test.tsx`

The existing tests cover logo and desktop links. Expand them to cover the hamburger button, drawer, and interactions. We use `@testing-library/user-event` (already installed) for click/keyboard events.

- [ ] **Step 1: Replace the test file with the full test suite**

Open `__tests__/Navbar.test.tsx` and replace its contents with:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  // ── Existing: static content ──────────────────────────────────────────────

  it("renders the logo text", () => {
    render(<Navbar />);
    expect(screen.getByText(/aurevian/i)).toBeInTheDocument();
    expect(screen.getByText(/tech solutions/i)).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
  });

  // ── Hamburger button ───────────────────────────────────────────────────────

  it("renders a hamburger button with correct aria attributes", () => {
    render(<Navbar />);
    const btn = screen.getByRole("button", { name: /open menu/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(btn).toHaveAttribute("aria-controls", "mobile-drawer");
  });

  // ── Drawer opens ──────────────────────────────────────────────────────────

  it("opens the drawer when the hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const btn = screen.getByRole("button", { name: /open menu/i });
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    // Drawer panel is in DOM and no longer translated off-screen
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).not.toHaveClass("translate-x-full");
    expect(drawer).toHaveClass("translate-x-0");
  });

  // ── Drawer closes: X button ───────────────────────────────────────────────

  it("closes the drawer when the X button inside the drawer is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("button", { name: /close menu/i }));
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).toHaveClass("translate-x-full");
  });

  // ── Drawer closes: backdrop ───────────────────────────────────────────────

  it("closes the drawer when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByTestId("nav-backdrop"));
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).toHaveClass("translate-x-full");
  });

  // ── Drawer closes: Escape key ─────────────────────────────────────────────

  it("closes the drawer when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.keyboard("{Escape}");
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).toHaveClass("translate-x-full");
  });

  // ── Drawer closes: link click ─────────────────────────────────────────────

  it("closes the drawer when a drawer link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    // The drawer renders its own set of links; click one
    const drawerLinks = screen.getAllByRole("link", { name: /home/i });
    await user.click(drawerLinks[drawerLinks.length - 1]);
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).toHaveClass("translate-x-full");
  });

  // ── Scroll lock ───────────────────────────────────────────────────────────

  it("adds overflow-hidden to body when drawer opens", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(document.body).toHaveClass("overflow-hidden");
  });

  it("removes overflow-hidden from body when drawer closes", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(document.body).not.toHaveClass("overflow-hidden");
  });
});
```

- [ ] **Step 2: Run the tests — expect failures**

```bash
npm test -- --testPathPattern="Navbar" --no-coverage
```

Expected: Multiple FAIL entries. The new tests should fail because the implementation doesn't exist yet. The two existing tests (logo text, desktop nav links) should still PASS.

- [ ] **Step 3: Commit the failing tests**

```bash
git add __tests__/Navbar.test.tsx
git commit -m "test(navbar): add failing tests for mobile drawer behaviour"
```

---

## Chunk 2: Implementation

### Task 3: Implement the responsive Navbar

**Files:**
- Modify: `components/Navbar.tsx`

Replace the entire file contents with the implementation below. Key changes from the current version:
- Added `'use client'` directive
- Imports: `useState`, `useEffect`, `useRef` from React; `Menu`, `X`, `Home`, `Info`, `Mail` from lucide-react
- `isOpen` state + `hamburgerRef` ref
- Right-side wrapper `<div>` holds both the desktop `<ul>` and mobile `<button>` as siblings
- Backdrop and drawer panel appended inside `<header>` (after `<nav>`)
- Two `useEffect` hooks: scroll-lock and Escape-key

- [ ] **Step 1: Replace `components/Navbar.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, Info, Mail } from "lucide-react";

const links = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-light-300">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt="Aurevian Tech Solutions logo"
            width={58}
            height={40}
            priority
          />
          <div>
            <span className="block font-playfair font-black text-[15px] text-[#1a3528] tracking-[0.08em] uppercase leading-tight">
              AUREVIAN
            </span>
            <span className="block font-playfair font-bold text-[10px] text-[#2e6b50] tracking-[0.15em] uppercase leading-tight">
              TECH SOLUTIONS
            </span>
          </div>
        </Link>

        {/* Right-side: desktop links + mobile hamburger */}
        <div className="flex items-center">
          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-600 hover:text-sky-600 transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger button */}
          <button
            ref={hamburgerRef}
            className="md:hidden p-2 text-[#1a3528]"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        data-testid="nav-backdrop"
        aria-hidden="true"
        className={`fixed inset-0 bg-black/50 z-[55] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Drawer */}
      <div
        id="mobile-drawer"
        aria-label="Navigation"
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-[#1a3528] z-[60] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            aria-label="Close menu"
            onClick={close}
            className="text-[#e2e8f0] hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="pt-4">
          {links.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className="flex items-center gap-3 px-6 py-4 border-b border-white/10 text-[#e2e8f0] hover:text-white transition-colors"
            >
              <Icon size={18} className="text-[#86efac]" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Run the full test suite**

```bash
npm test -- --testPathPattern="Navbar" --no-coverage
```

Expected: All tests PASS. If any fail, read the error output carefully — it will point to which assertion is wrong.

- [ ] **Step 3: Run all tests to check for regressions**

```bash
npm test -- --no-coverage
```

Expected: All tests PASS (no regressions in ContactForm, Footer, ServiceCard tests).

- [ ] **Step 4: Commit the implementation**

```bash
git add components/Navbar.tsx
git commit -m "feat(navbar): add responsive mobile drawer with hamburger button"
```

---

## Chunk 3: Manual verification + merge

### Task 4: Manual smoke test in browser

**Files:** None — verification only

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

- [ ] **Step 2: Verify desktop layout (no regression)**

Resize browser to ≥768px wide. Expected:
- Logo visible on left
- "Home", "About", "Contact" links visible on right
- No hamburger button visible

- [ ] **Step 3: Verify mobile layout**

Open DevTools → toggle device toolbar → select iPhone SE (375×667). Expected:
- Logo visible on left
- Hamburger (☰) icon visible on right
- Nav links NOT visible

- [ ] **Step 4: Verify drawer opens**

Click the hamburger icon. Expected:
- Dark green drawer slides in from the right
- Dim backdrop appears over the page
- Drawer shows Home (house icon), About (info icon), Contact (mail icon) links in `#86efac` / `#e2e8f0` colours
- Page scroll is locked

- [ ] **Step 5: Verify drawer closes**

Test each close method:
1. Click the X button top-right of the drawer → drawer slides out
2. Re-open, click the dark backdrop → drawer closes
3. Re-open, press `Escape` → drawer closes
4. Re-open, click a nav link → drawer closes and navigates

- [ ] **Step 6: Confirm commits and push branch**

```bash
git log --oneline -5
```

Confirm the two feature commits are present, then push:

```bash
git push -u origin feat/mobile-nav-drawer
```
