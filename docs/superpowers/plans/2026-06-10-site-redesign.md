# Aurevian Tech — Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Aurevian Tech marketing site (Home, About, Contact) from the retired sky-blue theme to the new lime-green / sage / forest design system, on the existing Next.js 15 + Tailwind stack.

**Architecture:** Port the design-system tokens into `app/globals.css` (CSS custom properties) and map them into the Tailwind theme so pages use clean utility classes. Recreate the nine design-system primitives as typed, presentational React components in `components/`, plus small layout helpers. Rebuild the three page layouts from the design's section flow. Preserve the existing accessible mobile drawer and the real Formspree form submission, adding the design's inline validation and visuals. Update the Jest/RTL suite alongside each component (TDD).

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3.4, lucide-react, Jest + React Testing Library, `next/font/google` (Manrope, Inter, Playfair Display).

**Reference:** Spec at `docs/superpowers/specs/2026-06-10-site-redesign-design.md`. Design source extracted to `/tmp/aurevian-design/aurevian-portal/` (tokens in `project/_ds/.../tokens/`, page layouts in `project/site/*.jsx`, component contracts in `project/_ds/.../_ds_bundle.js`).

---

## File Structure

**Foundation**
- Modify `app/globals.css` — design tokens as CSS custom properties + base body styles.
- Modify `tailwind.config.ts` — map tokens to Tailwind theme; remove old `sky`/`light` palettes.
- Modify `app/layout.tsx` — load Manrope/Inter/Playfair via `next/font/google`; set font CSS vars on `<body>`; update metadata.

**Components (`components/`)**
- Create `components/ui/Button.tsx` — Button primitive.
- Create `components/ui/IconButton.tsx` — circular icon button.
- Create `components/ui/Card.tsx` — Card container.
- Create `components/ui/Badge.tsx` — status pill.
- Create `components/ui/Input.tsx` — labelled text input.
- Create `components/ui/Textarea.tsx` — labelled textarea.
- Modify `components/ServiceCard.tsx` — restyle to design.
- Create `components/ui/SectionHeading.tsx` — eyebrow + title + lead (also exports `Eyebrow`).
- Create `components/ui/ArrowLink.tsx` — "Read More" arrow link.
- Create `components/ui/ImagePlaceholder.tsx` — on-brand placeholder tile.
- Modify `components/Navbar.tsx` — restyle, keep mobile drawer.
- Modify `components/Footer.tsx` — dark band, link columns.
- Modify `components/ContactForm.tsx` — design visuals + inline validation, keep Formspree.

**Pages (`app/`)**
- Modify `app/page.tsx` — Home (6 sections).
- Modify `app/about/page.tsx` — About (4 sections).
- Modify `app/contact/page.tsx` — Contact split layout.

**Tests (`__tests__/`)**
- Create `__tests__/Button.test.tsx`.
- Modify `__tests__/ServiceCard.test.tsx`.
- Modify `__tests__/Footer.test.tsx`.
- Modify `__tests__/Navbar.test.tsx` (only the logo/links assertions; drawer assertions stay).
- Modify `__tests__/ContactForm.test.tsx` — add validation tests; keep success/error.

---

## Conventions used in this plan

- Token utility classes come from the Tailwind mapping in Task 1. Colour utilities:
  `primary`, `primary-active`, `primary-neutral`, `primary-pale`, `on-primary`, `canvas`,
  `canvas-soft`, `ink`, `ink-deep`, `body` (use as `text-body`), `mute`, `positive`,
  `positive-deep`. Radius: `rounded-md` (12px), `rounded-lg` (16px), `rounded-xl` (24px),
  `rounded-pill` (9999px). Shadow: `shadow-soft`, `shadow-float`. Fonts: `font-display`,
  `font-body`, `font-wordmark`. Container max width: `max-w-container` (1200px),
  `max-w-text` (768px).
- Run the dev server with `npm run dev`; tests with `npm test`; a single file with
  `npm test -- <file>`.

---

### Task 1: Design tokens + Tailwind theme + fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/globals.css` with token definitions**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===== Aurevian Tech design tokens ===== */
:root {
  /* Brand / accent */
  --color-primary: #9fe870;
  --color-primary-active: #cdffad;
  --color-primary-neutral: #c5edab;
  --color-primary-pale: #e2f6d5;
  --color-on-primary: #163300;

  /* Surface */
  --color-canvas: #ffffff;
  --color-canvas-soft: #e8ebe6;

  /* Ink / text */
  --color-ink: #0e0f0c;
  --color-ink-deep: #163300;
  --color-body: #454745;
  --color-mute: #868685;

  /* Semantic */
  --color-positive: #2ead4b;
  --color-positive-deep: #054d28;
  --color-negative: #d03238;
  --color-negative-darkest: #a7000d;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Elevation */
  --shadow-soft: 0 1px 2px rgba(14, 15, 12, 0.04), 0 8px 24px rgba(14, 15, 12, 0.06);
  --shadow-float: 0 4px 12px rgba(14, 15, 12, 0.08), 0 16px 48px rgba(14, 15, 12, 0.12);

  /* Motion */
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --dur-fast: 120ms;
  --dur-base: 200ms;

  /* Containers */
  --container-max: 1200px;
  --container-text: 768px;
}

body {
  background-color: var(--color-canvas-soft);
  color: var(--color-ink);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
```

- [ ] **Step 2: Replace `tailwind.config.ts` with the token-mapped theme**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-manrope)", "var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        wordmark: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          active: "var(--color-primary-active)",
          neutral: "var(--color-primary-neutral)",
          pale: "var(--color-primary-pale)",
        },
        "on-primary": "var(--color-on-primary)",
        canvas: {
          DEFAULT: "var(--color-canvas)",
          soft: "var(--color-canvas-soft)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          deep: "var(--color-ink-deep)",
        },
        body: "var(--color-body)",
        mute: "var(--color-mute)",
        positive: {
          DEFAULT: "var(--color-positive)",
          deep: "var(--color-positive-deep)",
        },
        negative: {
          DEFAULT: "var(--color-negative)",
          darkest: "var(--color-negative-darkest)",
        },
      },
      borderRadius: {
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        float: "var(--shadow-float)",
      },
      maxWidth: {
        container: "var(--container-max)",
        text: "var(--container-text)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Update `app/layout.tsx` to load all three fonts and set CSS vars**

```tsx
import type { Metadata } from "next";
import { Inter, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Aurevian Tech Solutions — Web, Mobile & Infrastructure",
  description:
    "A senior engineering studio delivering web, mobile and infrastructure end-to-end — from first commit to production deployment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} ${playfair.variable} font-body flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify the app still compiles**

Run: `npm run build`
Expected: Build succeeds. (Pages still reference old palette utilities like `bg-sky-600`; those are removed from the theme now, so Tailwind will emit no styles for them but the build still passes — they get fixed in Tasks 10–12. If the build *fails* on unknown utilities, it is only a warning, not an error.)

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts app/layout.tsx
git commit -m "feat(redesign): add design-system tokens, Tailwind theme, and fonts"
```

---

### Task 2: Button + IconButton primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/IconButton.tsx`
- Test: `__tests__/Button.test.tsx`

- [ ] **Step 1: Write the failing test** — `__tests__/Button.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/ui/Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Get Started</Button>);
    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button", { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick} disabled>Click</Button>);
    await user.click(screen.getByRole("button", { name: /click/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders right icon content", () => {
    render(<Button iconRight={<span data-testid="icn" />}>Next</Button>);
    expect(screen.getByTestId("icn")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Button`
Expected: FAIL — cannot find module `@/components/ui/Button`.

- [ ] **Step 3: Implement `components/ui/Button.tsx`**

```tsx
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "dark";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary border border-transparent",
  secondary: "bg-canvas-soft text-ink border border-transparent",
  tertiary: "bg-canvas text-ink border border-ink",
  dark: "bg-ink text-primary border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2 rounded-lg",
  md: "text-base px-6 py-3 rounded-xl",
  lg: "text-base px-7 py-4 rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconLeft,
  iconRight,
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 font-semibold leading-6
        transition-[filter,transform] duration-200 ease-standard
        hover:enabled:brightness-95 active:enabled:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : ""} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Button`
Expected: PASS (4 tests).

- [ ] **Step 5: Implement `components/ui/IconButton.tsx`**

```tsx
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "tertiary" | "ghost";
type Size = "sm" | "md" | "lg";

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  label: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary border border-transparent",
  tertiary: "bg-canvas text-ink border border-ink",
  ghost: "bg-transparent text-ink border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-[52px] h-[52px]",
};

export default function IconButton({
  label,
  variant = "tertiary",
  size = "md",
  className = "",
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-pill
        transition-[filter] duration-200 ease-standard
        hover:enabled:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/ui/Button.tsx components/ui/IconButton.tsx __tests__/Button.test.tsx
git commit -m "feat(redesign): add Button and IconButton primitives"
```

---

### Task 3: Card + Badge primitives

**Files:**
- Create: `components/ui/Card.tsx`
- Create: `components/ui/Badge.tsx`

- [ ] **Step 1: Implement `components/ui/Card.tsx`**

```tsx
import { ElementType, HTMLAttributes, ReactNode } from "react";

type Variant = "content" | "sage" | "green" | "dark" | "outline";

interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  lifted?: boolean;
  as?: ElementType;
  /** Tailwind padding classes; defaults to p-6 (24px). */
  padding?: string;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  content: "bg-canvas text-ink border border-transparent",
  sage: "bg-canvas-soft text-ink border border-transparent",
  green: "bg-primary-pale text-ink border border-transparent",
  dark: "bg-ink text-primary border border-transparent",
  outline: "bg-canvas text-ink border border-ink",
};

export default function Card({
  variant = "content",
  lifted = false,
  as: Tag = "div",
  padding = "p-6",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={`rounded-xl font-body ${padding} ${lifted ? "shadow-soft" : ""} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Implement `components/ui/Badge.tsx`**

```tsx
import { HTMLAttributes, ReactNode } from "react";

type Variant = "positive" | "neutral" | "negative" | "warning";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  positive: "bg-primary-pale text-positive-deep",
  neutral: "bg-canvas-soft text-ink",
  negative: "bg-[#320707] text-white",
  warning: "bg-[#ffd11a] text-[#4a3b1c]",
};

export default function Badge({ variant = "neutral", className = "", children, ...rest }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-body text-sm font-semibold leading-5
        px-3 py-1 rounded-pill ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Verify compilation via build**

Run: `npm run build`
Expected: Build succeeds (no test for these pure presentational primitives; they are exercised by pages/ServiceCard).

- [ ] **Step 4: Commit**

```bash
git add components/ui/Card.tsx components/ui/Badge.tsx
git commit -m "feat(redesign): add Card and Badge primitives"
```

---

### Task 4: ServiceCard restyle

**Files:**
- Modify: `components/ServiceCard.tsx`
- Test: `__tests__/ServiceCard.test.tsx`

- [ ] **Step 1: Update the failing test** — replace `__tests__/ServiceCard.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import ServiceCard from "@/components/ServiceCard";

const props = {
  icon: <span data-testid="icn" />,
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

  it("renders the icon node", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByTestId("icn")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ServiceCard`
Expected: FAIL — the icon test fails because the old component renders a string emoji, not the node lookup (or passes by accident; the rewrite below is what makes all three green against the new markup).

- [ ] **Step 3: Replace `components/ServiceCard.tsx`**

```tsx
"use client";

import { ReactNode, useState } from "react";
import Card from "@/components/ui/Card";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function ServiceCard({ icon, title, description, className = "" }: ServiceCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <Card
      variant="content"
      padding="p-8"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`h-full transition-[border-color,box-shadow] duration-200 ease-standard
        ${hover ? "border-primary shadow-soft" : "border-transparent"} ${className}`}
    >
      <div className="w-14 h-14 flex items-center justify-center bg-primary-pale text-ink-deep rounded-lg mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-ink m-0">{title}</h3>
      <p className="mt-2.5 text-base leading-6 text-body">{description}</p>
    </Card>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ServiceCard`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components/ServiceCard.tsx __tests__/ServiceCard.test.tsx
git commit -m "feat(redesign): restyle ServiceCard to design system"
```

---

### Task 5: Input + Textarea primitives

**Files:**
- Create: `components/ui/Input.tsx`
- Create: `components/ui/Textarea.tsx`

- [ ] **Step 1: Implement `components/ui/Input.tsx`**

```tsx
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Input({ label, error, hint, id, name, className = "", ...rest }: InputProps) {
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div className="flex flex-col gap-2 font-body">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={`text-base leading-6 text-ink bg-canvas rounded-md px-4 py-3 outline-none
          border transition-[border-color,box-shadow] duration-200 ease-standard
          ${error ? "border-negative" : "border-ink focus:border-on-primary focus:shadow-[0_0_0_3px_var(--color-primary-pale)]"}
          ${className}`}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {(error || hint) && (
        <span className={`text-xs leading-4 ${error ? "text-negative-darkest" : "text-mute"}`}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Implement `components/ui/Textarea.tsx`**

```tsx
import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Textarea({
  label,
  error,
  hint,
  id,
  name,
  rows = 5,
  className = "",
  ...rest
}: TextareaProps) {
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div className="flex flex-col gap-2 font-body">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        name={name}
        rows={rows}
        className={`text-base leading-6 text-ink bg-canvas rounded-md px-4 py-3 outline-none resize-none
          border transition-[border-color,box-shadow] duration-200 ease-standard
          ${error ? "border-negative" : "border-ink focus:border-on-primary focus:shadow-[0_0_0_3px_var(--color-primary-pale)]"}
          ${className}`}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {(error || hint) && (
        <span className={`text-xs leading-4 ${error ? "text-negative-darkest" : "text-mute"}`}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify compilation**

Run: `npm run build`
Expected: Build succeeds (form fields are tested via ContactForm in Task 9).

- [ ] **Step 4: Commit**

```bash
git add components/ui/Input.tsx components/ui/Textarea.tsx
git commit -m "feat(redesign): add Input and Textarea form primitives"
```

---

### Task 6: Layout helpers — SectionHeading, ArrowLink, ImagePlaceholder

**Files:**
- Create: `components/ui/SectionHeading.tsx`
- Create: `components/ui/ArrowLink.tsx`
- Create: `components/ui/ImagePlaceholder.tsx`

- [ ] **Step 1: Implement `components/ui/SectionHeading.tsx` (exports `Eyebrow` + default `SectionHeading`)**

```tsx
import { ReactNode } from "react";

export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em]
        whitespace-nowrap text-positive-deep ${center ? "justify-center" : "justify-start"}`}
    >
      <span className="w-[18px] h-0.5 rounded-sm bg-primary" />
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  /** Max display title px; default 40. */
  titleSize?: number;
  maxWidth?: number;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  titleSize = 40,
  maxWidth,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const minSize = Math.round(titleSize * 0.72);
  return (
    <div
      className={`${centered ? "text-center" : "text-left"} ${className}`}
      style={{ maxWidth, marginInline: centered && maxWidth ? "auto" : undefined }}
    >
      {eyebrow && (
        <div className={`flex ${centered ? "justify-center" : "justify-start"}`}>
          <Eyebrow center={centered}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`font-display font-extrabold leading-[1.06] tracking-[-0.5px] text-ink text-balance ${eyebrow ? "mt-4" : "mt-0"}`}
        style={{ fontSize: `clamp(${minSize}px, 4.4vw, ${titleSize}px)` }}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-lg leading-7 text-body text-pretty ${centered ? "mx-auto" : ""}`}
          style={{ maxWidth: centered ? 560 : 520 }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Implement `components/ui/ArrowLink.tsx`**

```tsx
"use client";

import { ReactNode, useState } from "react";
import { ArrowRight } from "lucide-react";

interface ArrowLinkProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ArrowLink({ children, onClick, className = "" }: ArrowLinkProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`inline-flex items-center gap-1.5 cursor-pointer bg-none border-none p-0
        font-body text-[15px] font-semibold text-ink ${className}`}
    >
      {children}
      <span
        className="inline-flex transition-transform duration-200 ease-standard"
        style={{ transform: hover ? "translateX(3px)" : "none" }}
      >
        <ArrowRight size={17} strokeWidth={2.25} />
      </span>
    </button>
  );
}
```

- [ ] **Step 3: Implement `components/ui/ImagePlaceholder.tsx`**

```tsx
import { ReactNode } from "react";

interface ImagePlaceholderProps {
  /** Centred Lucide icon node. */
  icon?: ReactNode;
  label?: string;
  /** Height in px; default 460. */
  height?: number;
  /** "rounded" (24px) or "circle". */
  shape?: "rounded" | "circle";
  className?: string;
}

export default function ImagePlaceholder({
  icon,
  label,
  height = 460,
  shape = "rounded",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full flex flex-col items-center justify-center gap-3
        bg-primary-pale text-ink-deep border border-[rgba(22,51,0,0.08)]
        ${shape === "circle" ? "rounded-pill" : "rounded-xl"} ${className}`}
      style={{ height: shape === "circle" ? height : `${height}px` }}
    >
      {icon}
      {label && <span className="text-sm font-medium text-mute px-4 text-center">{label}</span>}
    </div>
  );
}
```

- [ ] **Step 4: Verify compilation**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/ui/SectionHeading.tsx components/ui/ArrowLink.tsx components/ui/ImagePlaceholder.tsx
git commit -m "feat(redesign): add SectionHeading, ArrowLink, ImagePlaceholder helpers"
```

---

### Task 7: Navbar restyle (keep accessible mobile drawer)

**Files:**
- Modify: `components/Navbar.tsx`
- Test: `__tests__/Navbar.test.tsx`

The drawer behaviour (open/close/Escape/backdrop/scroll-lock/focus) is unchanged — its
tests stay green. Only the visual classes, the CTA, and the desktop link styling change.

- [ ] **Step 1: Update the static-content assertions in `__tests__/Navbar.test.tsx`**

Replace the `renders desktop navigation links` test with one that also asserts the CTA, and
keep everything else as-is:

```tsx
  it("renders desktop navigation links and the CTA", () => {
    render(<Navbar />);
    const desktopNav = screen.getByRole("list");
    expect(within(desktopNav).getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(within(desktopNav).getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
    expect(within(desktopNav).getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /get in touch/i })).toHaveAttribute("href", "/contact");
  });
```

- [ ] **Step 2: Run test to verify the new assertion fails**

Run: `npm test -- Navbar`
Expected: FAIL on `get in touch` link (old Navbar has no CTA).

- [ ] **Step 3: Replace `components/Navbar.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

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
    <header className="sticky top-0 z-50 bg-canvas border-b border-ink font-body">
      <nav className="max-w-container mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo lockup */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-icon.png" alt="Aurevian Tech Solutions logo" width={46} height={32} priority />
          <span className="leading-none">
            <span className="block font-wordmark font-black text-base tracking-[0.08em] uppercase text-ink-deep">
              Aurevian
            </span>
            <span className="block font-wordmark font-bold text-[10px] tracking-[0.16em] uppercase text-[#2e6b50] mt-0.5">
              Tech Solutions
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-body hover:text-ink border-b-2 border-transparent hover:border-primary pb-0.5 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center text-sm font-semibold
              bg-primary text-on-primary px-4 py-2 rounded-lg
              transition-[filter] duration-200 ease-standard hover:brightness-95"
          >
            Get in Touch
          </Link>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className="md:hidden p-2 text-ink-deep"
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
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-ink z-[60] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button aria-label="Close menu" onClick={close} className="text-canvas-soft hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="pt-4">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className="flex items-center gap-3 px-6 py-4 border-b border-white/10 text-canvas-soft hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={close}
            className="mx-6 mt-6 inline-flex items-center justify-center bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run the full Navbar suite**

Run: `npm test -- Navbar`
Expected: PASS (all tests — static content incl. CTA, hamburger, open/close/backdrop/Escape/link, scroll-lock). Note: the "closes when a drawer link is clicked" test queries within the drawer for the `home` link — the drawer still has it.

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx __tests__/Navbar.test.tsx
git commit -m "feat(redesign): restyle Navbar with lime CTA, keep mobile drawer"
```

---

### Task 8: Footer restyle (dark band + link columns)

**Files:**
- Modify: `components/Footer.tsx`
- Test: `__tests__/Footer.test.tsx`

- [ ] **Step 1: Update `__tests__/Footer.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders copyright text with the year and company", () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
    expect(screen.getByText(/aurevian tech solutions/i)).toBeInTheDocument();
  });

  it("renders the Services and Company column titles", () => {
    render(<Footer />);
    expect(screen.getByText(/^services$/i)).toBeInTheDocument();
    expect(screen.getByText(/^company$/i)).toBeInTheDocument();
  });

  it("renders a link to About", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Footer`
Expected: FAIL — old Footer has no Services/Company columns or About link.

- [ ] **Step 3: Replace `components/Footer.tsx`**

```tsx
import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/contact" },
      { label: "Mobile Apps", href: "/contact" },
      { label: "Infrastructure", href: "/contact" },
      { label: "Consultancy", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink font-body mt-auto">
      <div className="max-w-container mx-auto px-6 pt-12 pb-6">
        <div className="flex flex-wrap gap-12 justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="block font-wordmark font-black text-xl tracking-[0.08em] uppercase text-primary">
              Aurevian
            </span>
            <span className="block font-wordmark font-bold text-[11px] tracking-[0.16em] uppercase text-primary-neutral mt-0.5">
              Tech Solutions
            </span>
            <p className="mt-4 text-sm leading-5 text-mute">
              Web, mobile and infrastructure — built end to end, idea to production.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-12 flex-wrap">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-bold tracking-[0.08em] uppercase text-canvas-soft mb-3">
                  {col.title}
                </div>
                <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-mute hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-4">
          <p className="m-0 text-sm text-mute">© 2026 Aurevian Tech Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Footer`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx __tests__/Footer.test.tsx
git commit -m "feat(redesign): restyle Footer as dark band with link columns"
```

---

### Task 9: ContactForm restyle + inline validation (keep Formspree)

**Files:**
- Modify: `components/ContactForm.tsx`
- Test: `__tests__/ContactForm.test.tsx`

The form keeps its real Formspree POST and the existing success/error states, and gains the
design's inline client-side validation (empty/invalid fields show field errors and block
submit) plus the new `Input`/`Textarea`/`Button` visuals and success panel.

- [ ] **Step 1: Update `__tests__/ContactForm.test.tsx` — keep existing tests, add validation tests**

Add these two tests inside the `describe("ContactForm", ...)` block (keep the existing four):

```tsx
  it("shows inline errors and does not submit when fields are empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/tell us a little about your project/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows an email error for an invalid email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), "Alice");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/message/i), "Hello there");
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
```

Also update the success test's expectation: the success panel heading is "Message sent"
(already matched by `/message sent/i`) — no change needed there.

- [ ] **Step 2: Run test to verify the new tests fail**

Run: `npm test -- ContactForm`
Expected: FAIL — old form has `required` HTML validation but no inline error text nodes.

- [ ] **Step 3: Replace `components/ContactForm.tsx`**

```tsx
"use client";

import { useState, FormEvent } from "react";
import { Check } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email || !/.+@.+\..+/.test(email)) next.email = "Enter a valid email.";
    if (!message) next.message = "Tell us a little about your project.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
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

  if (status === "success") {
    return (
      <div className="text-center px-2 py-6">
        <div className="w-[60px] h-[60px] mx-auto mb-[18px] flex items-center justify-center bg-primary text-on-primary rounded-pill">
          <Check size={30} strokeWidth={2.5} />
        </div>
        <h3 className="m-0 font-display font-extrabold text-[27px] text-ink">Message sent</h3>
        <p className="mt-2.5 mb-6 text-base text-body">
          Thanks — we will be in touch within 24 hours.
        </p>
        <Button variant="tertiary" onClick={() => { setStatus("idle"); setErrors({}); }}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]" noValidate>
      <Input label="Name" name="name" placeholder="Your name" error={errors.name} />
      <Input label="Email" name="email" type="email" placeholder="you@example.com" error={errors.email} />
      <Textarea label="Message" name="message" rows={5} placeholder="Tell us about your project…" error={errors.message} />
      <Button type="submit" fullWidth disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
      {status === "error" && (
        <p className="text-negative-darkest text-center text-sm m-0">
          Something went wrong. Please email us directly.
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 4: Run the full ContactForm suite**

Run: `npm test -- ContactForm`
Expected: PASS (6 tests). The `renders all form fields` test still finds labelled fields via
`getByLabelText`; success/error tests still work (valid input → fetch → success/error).

- [ ] **Step 5: Commit**

```bash
git add components/ContactForm.tsx __tests__/ContactForm.test.tsx
git commit -m "feat(redesign): restyle ContactForm with inline validation and success panel"
```

---

### Task 10: Home page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Link from "next/link";
import {
  Monitor, Smartphone, Cloud, Lightbulb, ArrowRight, Check,
  GitCommitHorizontal, Star, Image as ImageIcon, Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading, { Eyebrow } from "@/components/ui/SectionHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const services = [
  { icon: <Monitor size={30} strokeWidth={1.5} />, title: "Web Development", description: "Full-stack web apps built with modern frameworks — from landing pages to complex SaaS products." },
  { icon: <Smartphone size={30} strokeWidth={1.5} />, title: "Mobile Apps", description: "Native and cross-platform mobile applications for iOS and Android, built to scale." },
  { icon: <Cloud size={30} strokeWidth={1.5} />, title: "Infrastructure", description: "Cloud architecture, DevOps and CI/CD pipelines for reliable, scalable systems." },
  { icon: <Lightbulb size={30} strokeWidth={1.5} />, title: "Consultancy", description: "Strategic technology advice — architecture reviews, audits and team coaching." },
];

const steps = [
  { n: "01", title: "Discovery & scope", desc: "We map the problem, agree the scope and set a clear, honest timeline." },
  { n: "02", title: "Design & architecture", desc: "Interface, data model and infrastructure designed before a line ships." },
  { n: "03", title: "Build in the open", desc: "Short iterations with working software you can see and steer every week." },
  { n: "04", title: "Launch & support", desc: "We deploy to production and stay on to maintain, monitor and scale." },
];

const points = [
  "A small, senior team — no hand-offs to juniors.",
  "Fixed scope and honest timelines, agreed up front.",
  "You own the code, the infrastructure and the roadmap.",
];

const testimonials = [
  { quote: "Aurevian rebuilt our platform in four months and it has not missed a beat since. The most senior team we have worked with.", name: "Maya Patel", role: "CTO, Northwind" },
  { quote: "They took full ownership of our infrastructure migration. Clear communication the whole way — no jargon, no surprises.", name: "Daniel Sørensen", role: "Founder, Loftwork" },
  { quote: "From first commit to production in record time, and the code is genuinely a pleasure to maintain. Quality over speed, as promised.", name: "Élise Moreau", role: "VP Eng, Cadence" },
];

const stats = [
  { value: "12+", label: "Years shipping" },
  { value: "80+", label: "Products delivered" },
  { value: "24h", label: "Response time" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas-soft relative overflow-hidden">
        <div className="max-w-container mx-auto px-6 pt-[72px] pb-20 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 bg-primary-pale text-positive-deep text-sm font-semibold px-3.5 py-[5px] rounded-pill mb-6">
              <span className="w-2 h-2 rounded-full bg-positive" />
              Available for new projects
            </span>
            <h1 className="m-0 font-display font-extrabold leading-none tracking-[-1px] text-ink text-balance text-[clamp(40px,6vw,68px)]">
              We build the software<br />behind your <span className="text-positive-deep">business</span>.
            </h1>
            <p className="mt-6 mb-8 text-xl leading-[31px] text-body max-w-[480px] text-pretty">
              A senior engineering studio delivering web, mobile and infrastructure end-to-end — from first commit to production deployment.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/contact"><Button iconRight={<ArrowRight size={18} strokeWidth={2.25} />}>Get Started</Button></Link>
              <Link href="/about"><Button variant="tertiary">Learn More</Button></Link>
            </div>
            <div className="flex gap-12 mt-11 flex-wrap">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-extrabold text-3xl leading-none tracking-[-0.5px] text-ink">{s.value}</div>
                  <div className="mt-1.5 text-[13px] text-body">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <ImagePlaceholder height={460} icon={<Users size={48} strokeWidth={1.25} />} label="Team / workspace" />
            <div className="absolute -left-[18px] -bottom-[22px] bg-canvas rounded-lg px-5 py-4 shadow-float flex items-center gap-3.5 max-w-[260px]">
              <div className="w-11 h-11 shrink-0 flex items-center justify-center bg-primary text-on-primary rounded-md">
                <GitCommitHorizontal size={22} strokeWidth={2} />
              </div>
              <div>
                <div className="text-[15px] font-bold text-ink">End-to-end ownership</div>
                <div className="text-[13px] text-body">Idea to production</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-canvas">
        <div className="max-w-container mx-auto px-6 py-[88px]">
          <SectionHeading align="center" maxWidth={620} eyebrow="What we do" title="The services we provide." lead="Everything you need to build, launch and scale your digital product — under one senior team." className="mx-auto" />
          <div className="grid gap-6 mt-12 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {services.map((s) => (
              <div key={s.title}>
                <ServiceCard icon={s.icon} title={s.title} description={s.description} />
                <div className="mt-3.5">
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                    Read More <ArrowRight size={17} strokeWidth={2.25} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-ink text-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-[88px] grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <ImagePlaceholder height={440} icon={<Monitor size={48} strokeWidth={1.25} />} label="Working / process" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.12em] text-primary">
              <span className="w-[18px] h-0.5 rounded-sm bg-primary" />
              How we work
            </div>
            <h2 className="mt-4 mb-8 font-display font-extrabold leading-[1.06] tracking-[-0.5px] text-canvas-soft text-[clamp(30px,4vw,42px)]">
              Four steps, no surprises.
            </h2>
            <div className="flex flex-col gap-1">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-[18px] py-[18px] border-b border-white/10">
                  <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-primary text-on-primary rounded-pill font-display font-extrabold text-base">
                    {s.n}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-canvas-soft">{s.title}</div>
                    <div className="mt-1 text-[15px] leading-[22px] text-mute">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact"><Button>Start a project</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* About the studio */}
      <section className="bg-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-[88px] grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <ImagePlaceholder height={420} icon={<Users size={48} strokeWidth={1.25} />} label="Agency / team" />
            <div className="absolute -right-4 -top-4 bg-primary text-on-primary rounded-lg px-[22px] py-[18px] shadow-soft text-center">
              <div className="font-display font-extrabold text-[26px] leading-none">12+</div>
              <div className="text-xs font-semibold mt-1">Years of<br />shipping</div>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="About the studio" title="A senior team that ships things that last." />
            <p className="mt-5 text-[17px] leading-[27px] text-body text-pretty">
              We partner with startups and established companies to deliver the web apps, mobile apps and infrastructure that power them — taking full ownership from the first commit to production.
            </p>
            <div className="flex flex-col gap-3 my-[26px]">
              {points.map((p) => (
                <div key={p} className="flex gap-3 items-start">
                  <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-primary text-on-primary rounded-pill mt-px">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <span className="text-base leading-6 text-ink">{p}</span>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink">
              Read More <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-canvas">
        <div className="max-w-container mx-auto px-6 py-[88px]">
          <SectionHeading align="center" maxWidth={560} eyebrow="Client stories" title="What our clients say." lead="A few words from the teams we have built with." className="mx-auto" />
          <div className="grid gap-6 mt-12 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {testimonials.map((q) => (
              <Card key={q.name} variant="sage" padding="p-8" className="h-full flex flex-col">
                <div className="flex gap-[3px] text-primary mb-4">
                  {[0, 1, 2, 3, 4].map((n) => <Star key={n} size={18} strokeWidth={1.5} fill="currentColor" />)}
                </div>
                <p className="m-0 text-[17px] leading-[27px] text-ink flex-1 text-pretty">&ldquo;{q.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-6">
                  <ImagePlaceholder height={44} shape="circle" icon={<ImageIcon size={18} strokeWidth={1.5} />} className="!w-11 shrink-0" />
                  <div>
                    <div className="text-[15px] font-bold text-ink">{q.name}</div>
                    <div className="text-[13px] text-body">{q.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink">
        <div className="max-w-text mx-auto px-6 py-[88px] text-center">
          <h2 className="m-0 font-display font-extrabold leading-[1.04] tracking-[-0.5px] text-primary text-[clamp(32px,5vw,52px)]">
            Ready to build something?
          </h2>
          <p className="mx-auto mt-[18px] mb-8 text-[19px] leading-[29px] text-canvas-soft max-w-[480px]">
            Tell us about your project and we&rsquo;ll get back to you within 24 hours.
          </p>
          <Link href="/contact"><Button>Contact Us</Button></Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Visually verify the Home page**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: Sage hero with lime pill + headline + stats + placeholder & floating card; white services grid (4 cards, hover lime border); dark steps band; sage about split with 12+ badge; white testimonials (lime stars); dark final CTA. No sky-blue anywhere.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(redesign): rebuild Home page with new design system"
```

---

### Task 11: About page

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Replace `app/about/page.tsx`**

```tsx
import Link from "next/link";
import { Gem, MessagesSquare, GitCommitHorizontal, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const values = [
  { icon: <Gem size={26} strokeWidth={2} />, title: "Quality over speed", desc: "We ship things that work and last — not things that need rewriting in six months." },
  { icon: <MessagesSquare size={26} strokeWidth={2} />, title: "Clear communication", desc: "No jargon, no surprises. You always know what we are building and why." },
  { icon: <GitCommitHorizontal size={26} strokeWidth={2} />, title: "End-to-end ownership", desc: "We take responsibility from the first commit to production deployment." },
];

const team = [
  { name: "Arman Vasquez", role: "Principal Engineer" },
  { name: "Lena Fischer", role: "Mobile Lead" },
  { name: "Tomas Reyes", role: "Infrastructure Lead" },
  { name: "Priya Nair", role: "Product Engineer" },
];

const capabilities = ["React", "Next.js", "React Native", "Node.js", "Go", "PostgreSQL", "AWS", "Kubernetes", "Terraform", "CI/CD"];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-20 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading eyebrow="About us" title="A small, senior team that builds things that last." titleSize={54} />
            <p className="mt-6 text-[19px] leading-[29px] text-body max-w-[520px] text-pretty">
              We partner with startups and established companies to deliver web applications, mobile apps and the infrastructure that powers them — taking full ownership from first commit to production deployment.
            </p>
            <div className="flex gap-3 mt-[30px] flex-wrap">
              <Link href="/contact"><Button>Work with us</Button></Link>
              <Link href="/"><Button variant="tertiary">Our services</Button></Link>
            </div>
          </div>
          <ImagePlaceholder height={420} icon={<Users size={48} strokeWidth={1.25} />} label="Team" />
        </div>
      </section>

      {/* Values */}
      <section className="bg-canvas">
        <div className="max-w-container mx-auto px-6 py-[88px]">
          <SectionHeading eyebrow="How we operate" title="Our values." />
          <div className="grid gap-6 mt-11 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {values.map((v) => (
              <Card key={v.title} variant="sage" padding="p-8" className="h-full">
                <div className="w-[52px] h-[52px] flex items-center justify-center bg-primary text-on-primary rounded-lg mb-5">
                  {v.icon}
                </div>
                <h3 className="m-0 text-xl font-bold text-ink">{v.title}</h3>
                <p className="mt-2.5 text-base leading-6 text-body text-pretty">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-[88px]">
          <SectionHeading align="center" maxWidth={560} eyebrow="The people" title="Who you will work with." lead="No hand-offs to juniors — the people you meet are the people who build." className="mx-auto" />
          <div className="grid gap-6 mt-12 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {team.map((m) => (
              <Card key={m.name} variant="content" padding="p-6" className="text-center h-full">
                <ImagePlaceholder height={96} shape="circle" icon={<Users size={28} strokeWidth={1.5} />} className="!w-24 mx-auto mb-4" />
                <div className="text-[17px] font-bold text-ink">{m.name}</div>
                <div className="text-sm text-body mt-1">{m.role}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The stack */}
      <section className="bg-ink">
        <div className="max-w-text mx-auto px-6 py-20 text-center">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.12em] text-primary">
              <span className="w-[18px] h-0.5 rounded-sm bg-primary" />
              The stack
            </div>
          </div>
          <h2 className="mt-4 mb-3 font-display font-extrabold leading-[1.1] tracking-[-0.4px] text-canvas-soft text-[clamp(28px,4vw,38px)]">
            The tools we reach for.
          </h2>
          <p className="mx-auto mb-7 text-base text-mute max-w-[460px]">
            A pragmatic, modern stack — chosen per project, never by default.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {capabilities.map((c) => (
              <span key={c} className="text-[15px] font-semibold text-canvas-soft bg-white/[0.08] border border-white/[0.16] px-4 py-[7px] rounded-pill">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Visually verify the About page**

Run: `npm run dev`, open `http://localhost:3000/about`.
Expected: Sage intro split (large title + buttons + placeholder); white values (3 cards, lime icon tiles); sage team (4 circular-avatar cards); dark stack band with capability pills.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat(redesign): rebuild About page with new design system"
```

---

### Task 12: Contact page

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Replace `app/contact/page.tsx`**

```tsx
import { Mail, Clock, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import Card from "@/components/ui/Card";
import IconButton from "@/components/ui/IconButton";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ContactForm";

const details = [
  { icon: <Mail size={20} strokeWidth={2} />, label: "Email", value: "hello@aurevian.tech", href: "mailto:hello@aurevian.tech" },
  { icon: <Clock size={20} strokeWidth={2} />, label: "Response time", value: "Within 24 hours" },
  { icon: <MapPin size={20} strokeWidth={2} />, label: "Location", value: "Remote — GMT ±3h" },
];

export default function ContactPage() {
  return (
    <main className="bg-canvas-soft">
      <div className="max-w-container mx-auto px-6 py-20 grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
        {/* Info */}
        <div>
          <SectionHeading eyebrow="Contact" title="Let us build it together." titleSize={50} />
          <p className="mt-[22px] mb-8 text-lg leading-7 text-body max-w-[400px] text-pretty">
            Have a project in mind? We would love to hear about it. Send a message and we will get back to you within 24 hours.
          </p>

          <div className="flex flex-col gap-3.5 mb-7">
            {details.map((d) => {
              const inner = (
                <>
                  <span className="shrink-0 w-11 h-11 flex items-center justify-center bg-primary-pale text-ink-deep rounded-md">
                    {d.icon}
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.06em] uppercase text-mute whitespace-nowrap">{d.label}</span>
                    <span className="block text-base font-semibold text-ink mt-0.5">{d.value}</span>
                  </span>
                </>
              );
              return d.href ? (
                <a key={d.label} href={d.href} className="flex items-center gap-3.5 no-underline">{inner}</a>
              ) : (
                <div key={d.label} className="flex items-center gap-3.5">{inner}</div>
              );
            })}
          </div>

          <div className="flex gap-2.5">
            <IconButton label="GitHub"><Github size={20} /></IconButton>
            <IconButton label="LinkedIn"><Linkedin size={20} /></IconButton>
            <IconButton label="X"><Twitter size={20} /></IconButton>
          </div>
        </div>

        {/* Form */}
        <Card variant="content" padding="p-8" lifted>
          <ContactForm />
        </Card>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Visually verify the Contact page**

Run: `npm run dev`, open `http://localhost:3000/contact`.
Expected: Sage split — left info (email/response/location rows + 3 circular IconButtons), right lifted white card with the form. Click "Send Message" empty → inline field errors; fill valid → submits (success panel if Formspree endpoint set, else error message — both are correct behaviour).

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat(redesign): rebuild Contact page with new design system"
```

---

### Task 13: Full verification + cleanup

**Files:**
- (verification only; possible small fixes)

- [ ] **Step 1: Confirm no retired palette or prototype artifacts remain**

Run: `grep -rEn "sky-[0-9]|light-[0-9]|hero-bg|image-slot|slate-[0-9]" app components` (excluding node_modules)
Expected: No matches. (`slate-*` was part of the old theme; any remaining occurrence is a missed conversion — fix it to the token utilities.)

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: All suites pass — `Button`, `ServiceCard`, `Footer`, `Navbar`, `ContactForm`.

- [ ] **Step 3: Run the linter**

Run: `npm run lint`
Expected: No errors. Fix any unused-import or `react/no-unescaped-entities` warnings (e.g. ensure apostrophes in JSX text use `&rsquo;`/`&apos;` or are inside expressions).

- [ ] **Step 4: Production build**

Run: `npm run build`
Expected: Build succeeds with all three routes (`/`, `/about`, `/contact`) compiled.

- [ ] **Step 5: Final manual smoke pass**

Run: `npm run dev`; resize the browser narrow (<880px) to confirm hero/steps/about/contact grids collapse to one column and the mobile drawer opens/closes. Tab through the Navbar and contact form to confirm focus rings (lime halo) appear.

- [ ] **Step 6: Commit any cleanup**

```bash
git add -A
git commit -m "chore(redesign): cleanup and final verification fixes"
```

(If Steps 1–5 produced no changes, skip this commit.)

---

## Self-review notes

- **Spec coverage:** tokens (T1) · Button/IconButton (T2) · Card/Badge (T3) · ServiceCard
  (T4) · Input/Textarea (T5) · SectionHeading/Eyebrow/ArrowLink/ImagePlaceholder (T6) ·
  Navbar + mobile drawer (T7) · Footer (T8) · ContactForm validation/visuals (T9) · Home
  (T10) · About (T11) · Contact (T12) · TDD test updates (T2,4,7,8,9) · acceptance
  build/lint/test + cleanup (T13). All spec sections map to a task.
- **Deviation from spec (intentional):** the Contact form preserves the real Formspree POST
  and the success/error states rather than a simulated 900ms timeout — closer to the
  README's "implement for real" guidance while still adding the design's inline validation
  and success panel. The success-panel heading text ("Message sent") matches the existing
  `/message sent/i` test.
- **Type consistency:** component prop names (`variant`, `size`, `padding` as a className
  string, `label`/`error` on fields, `icon`/`title`/`description` on ServiceCard,
  `eyebrow`/`title`/`lead`/`titleSize`/`maxWidth` on SectionHeading) are used consistently
  across tasks and pages.
- **Placeholders:** none — every step contains the full file or the exact edit.
```
