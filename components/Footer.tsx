import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/#services" },
      { label: "Mobile Apps", href: "/#services" },
      { label: "Infrastructure", href: "/#services" },
      { label: "Consultancy", href: "/#services" },
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
