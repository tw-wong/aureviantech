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
