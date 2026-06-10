"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
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
