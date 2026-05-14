import Link from "next/link";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/despre", label: "Despre" },
  { href: "/produse", label: "Produse" },
  { href: "/colaboreaza", label: "Colaborează" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream-100/80 backdrop-blur-sm border-b border-stone-200/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">
        <Link href="/" aria-label="AERA Beauty — pagina principală" className="block">
          <Logo className="h-12 md:h-16 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="button-label text-cocoa-700 hover:text-cocoa-900 transition-colors"
              style={{ letterSpacing: "0.04em", textTransform: "none", fontSize: "14px" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#precomanda"
          className="button-label bg-cocoa-700 text-ivory-50 px-5 py-2.5 hover:bg-cocoa-900 transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Precomandă
        </Link>
      </div>
    </header>
  );
}
