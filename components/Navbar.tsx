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
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-[#1a3528]/75 backdrop-blur-sm z-[60] transition-transform duration-300 ${
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
