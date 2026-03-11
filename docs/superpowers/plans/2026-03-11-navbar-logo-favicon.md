# Navbar Logo & Favicon Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Aurevian Tech Solutions circuit-wave SVG icon to the navbar and browser tab favicon, with brand text styled using Playfair Display to match the logo typography.

**Architecture:** Create a self-contained SVG icon file, copy it as `app/icon.svg` for Next.js favicon auto-detection, update `layout.tsx` to load Playfair Display via `next/font/google`, and update `Navbar.tsx` to render the icon beside two-line styled brand text.

**Tech Stack:** Next.js 15 App Router, `next/image`, `next/font/google` (Playfair Display), Tailwind CSS v3, Jest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-03-11-clean-light-theme-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `public/logo-icon.svg` | Create | Circuit-wave SVG icon (served statically) |
| `app/icon.svg` | Create | Identical SVG — Next.js auto-serves as favicon |
| `app/layout.tsx` | Modify | Add Playfair Display font, expose `playfair.variable` on `<body>` |
| `components/Navbar.tsx` | Modify | Replace text-only brand link with icon + two-line styled text |
| `__tests__/Navbar.test.tsx` | Modify | Update logo test to match new two-line structure |

---

## Chunk 1: SVG Icon Files

### Task 1: Create `public/logo-icon.svg`

**Files:**
- Create: `public/logo-icon.svg`

- [ ] **Step 1: Create the SVG file**

Write `public/logo-icon.svg` with this exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" fill="none">
  <!-- Line 5 – lightest teal -->
  <path d="M6,48 C16,48 20,38 30,38 C40,38 44,48 54,48 C64,48 68,38 74,38"
        stroke="#5aaa88" stroke-width="3" stroke-linecap="round"/>
  <circle cx="6"  cy="48" r="3"   fill="#5aaa88"/>
  <circle cx="74" cy="38" r="3"   fill="#5aaa88"/>

  <!-- Line 4 -->
  <path d="M6,40 C16,40 20,30 30,30 C40,30 44,40 54,40 C64,40 68,30 74,30"
        stroke="#3d8a68" stroke-width="3" stroke-linecap="round"/>
  <circle cx="6"  cy="40" r="3"   fill="#3d8a68"/>
  <circle cx="74" cy="30" r="3"   fill="#3d8a68"/>
  <circle cx="30" cy="30" r="2.5" fill="#3d8a68"/>

  <!-- Line 3 – middle -->
  <path d="M6,32 C16,32 20,22 30,22 C40,22 44,32 54,32 C64,32 68,22 74,22"
        stroke="#2e6b50" stroke-width="3" stroke-linecap="round"/>
  <circle cx="6"  cy="32" r="3"   fill="#2e6b50"/>
  <circle cx="74" cy="22" r="3"   fill="#2e6b50"/>
  <circle cx="54" cy="32" r="2.5" fill="#2e6b50"/>

  <!-- Line 2 -->
  <path d="M6,24 C16,24 20,14 30,14 C40,14 44,24 54,24 C64,24 68,14 74,14"
        stroke="#24503c" stroke-width="3" stroke-linecap="round"/>
  <circle cx="6"  cy="24" r="3"   fill="#24503c"/>
  <circle cx="74" cy="14" r="3"   fill="#24503c"/>

  <!-- Line 1 – darkest -->
  <path d="M6,16 C16,16 20,6 30,6 C40,6 44,16 54,16 C64,16 68,6 74,6"
        stroke="#1a3528" stroke-width="3" stroke-linecap="round"/>
  <circle cx="6"  cy="16" r="3"   fill="#1a3528"/>
  <circle cx="74" cy="6"  r="3"   fill="#1a3528"/>
</svg>
```

- [ ] **Step 2: Create `app/icon.svg` (favicon)**

Copy the identical content to `app/icon.svg`. Next.js App Router automatically detects `app/icon.svg` and serves it as the browser tab favicon — no `<link>` tag needed.

- [ ] **Step 3: Verify files exist**

```bash
ls public/logo-icon.svg app/icon.svg
```
Expected: both files listed.

---

## Chunk 2: Playfair Display Font

### Task 2: Add Playfair Display to `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

Current state of `layout.tsx`:
```typescript
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
// body uses: className={`${inter.className} flex flex-col min-h-screen`}
```

- [ ] **Step 1: Add Playfair Display import and variable**

Replace the font section in `app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],
});
```

- [ ] **Step 2: Apply font variable to `<body>`**

Update the `<body>` className to include the Playfair variable:

```typescript
<body className={`${inter.className} ${playfair.variable} flex flex-col min-h-screen`}>
```

- [ ] **Step 3: Add Tailwind font config**

In `tailwind.config.ts`, extend fontFamily to map `playfair` to the CSS variable:

```typescript
theme: {
  extend: {
    fontFamily: {
      playfair: ["var(--font-playfair)", "Georgia", "serif"],
    },
    colors: {
      // ... existing colors unchanged
    },
  },
},
```

- [ ] **Step 4: Build to verify no errors**

```bash
~/.nvm/versions/node/v20.19.6/bin/node /path/to/portal/node_modules/.bin/next build 2>&1 | grep -E "error|Error|✓"
```
Expected: `✓ Compiled successfully` with no errors.

---

## Chunk 3: Navbar Update

### Task 3: Update `components/Navbar.tsx`

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `__tests__/Navbar.test.tsx`

- [ ] **Step 1: Update the Navbar test first (TDD)**

The current test checks for `/aurevian tech solutions/i` in a single text node. After the change, "AUREVIAN" and "TECH SOLUTIONS" will be separate elements. Update `__tests__/Navbar.test.tsx`:

```typescript
it("renders the logo text", () => {
  render(<Navbar />);
  expect(screen.getByText(/aurevian/i)).toBeInTheDocument();
  expect(screen.getByText(/tech solutions/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm test -- Navbar 2>&1 | tail -15
```
Expected: FAIL — "Unable to find an element with text /aurevian/i" (old single-node text won't match).

- [ ] **Step 3: Replace `components/Navbar.tsx`**

```typescript
import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-light-300">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icon.svg"
            alt="Aurevian Tech Solutions logo"
            width={40}
            height={30}
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
        <ul className="flex items-center gap-8">
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
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Run Navbar tests**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm test -- Navbar 2>&1 | tail -15
```
Expected: PASS — 2 tests passing.

- [ ] **Step 5: Run full test suite**

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm test 2>&1 | tail -10
```
Expected: 11/11 tests passing, 4 suites.

- [ ] **Step 6: Build verify**

```bash
~/.nvm/versions/node/v20.19.6/bin/node /Users/tengwai.wong/Repo/repo_tw/portal/node_modules/.bin/next build 2>&1 | tail -15
```
Expected: `✓ Generating static pages (7/7)`, no errors.
