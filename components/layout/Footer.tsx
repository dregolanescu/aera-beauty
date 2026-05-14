import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-32 bg-cocoa-900 text-ivory-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Logo variant="ivory" className="h-7 w-auto mb-6" />
            <p className="body max-w-sm text-ivory-50/70" style={{ color: "rgba(251, 247, 240, 0.7)" }}>
              Frumusețe curată, reprezentată în România.
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-4" style={{ color: "rgba(251, 247, 240, 0.6)" }}>Navigație</h3>
            <ul className="space-y-2">
              <li><Link href="/despre" className="hover:text-ivory-50/70 transition-colors">Despre</Link></li>
              <li><Link href="/produse" className="hover:text-ivory-50/70 transition-colors">Produse</Link></li>
              <li><Link href="/colaboreaza" className="hover:text-ivory-50/70 transition-colors">Colaborează</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4" style={{ color: "rgba(251, 247, 240, 0.6)" }}>Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:hello@aerabeauty.ro" className="hover:text-ivory-50/70 transition-colors">hello@aerabeauty.ro</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ivory-50/10 flex flex-col md:flex-row justify-between gap-4 text-sm" style={{ color: "rgba(251, 247, 240, 0.5)" }}>
          <p>© 2026 SC AERA SCENTT SRL · Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <Link href="/politica-confidentialitate" className="hover:text-ivory-50/70 transition-colors">Politica de confidențialitate</Link>
            <Link href="/termeni-si-conditii" className="hover:text-ivory-50/70 transition-colors">Termeni</Link>
            <Link href="/cookies" className="hover:text-ivory-50/70 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
