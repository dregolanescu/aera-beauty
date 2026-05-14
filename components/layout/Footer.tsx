import Link from "next/link";
import { Logo } from "./Logo";

const eyebrowStyle = { color: "rgba(251, 247, 240, 0.6)" };
const mutedLinkClass = "hover:text-ivory-50/70 transition-colors";

export function Footer() {
  return (
    <footer className="mt-32 bg-cocoa-900 text-ivory-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Logo variant="ivory" className="h-14 md:h-20 w-auto mb-8" />
            <p
              className="max-w-sm"
              style={{
                fontFamily: "var(--font-bodoni-moda), Georgia, serif",
                fontSize: "20px",
                lineHeight: 1.3,
                color: "rgba(251, 247, 240, 0.85)",
              }}
            >
              For the love of{" "}
              <span style={{ fontStyle: "italic" }}>Beauty.</span>
            </p>
          </div>

          {/* Navigație */}
          <div className="md:col-span-2">
            <h3 className="eyebrow mb-4" style={eyebrowStyle}>
              Navigație
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/despre" className={mutedLinkClass}>
                  Despre
                </Link>
              </li>
              <li>
                <Link href="/produse" className={mutedLinkClass}>
                  Produse
                </Link>
              </li>
              <li>
                <Link href="/colaboreaza" className={mutedLinkClass}>
                  Colaborează
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="eyebrow mb-4" style={eyebrowStyle}>
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:office@aerabeauty.ro"
                  className={mutedLinkClass}
                >
                  office@aerabeauty.ro
                </a>
              </li>
              <li>
                <a href="tel:+40747306107" className={mutedLinkClass}>
                  +40 747 306 107
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/40747306107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mutedLinkClass}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Firmă */}
          <div className="md:col-span-3">
            <h3 className="eyebrow mb-4" style={eyebrowStyle}>
              Firmă
            </h3>
            <address
              className="not-italic text-sm leading-relaxed"
              style={{ color: "rgba(251, 247, 240, 0.7)" }}
            >
              SC AERA SCENTT SRL
              <br />
              Importator unic în România
              <br />
              <br />
              Str. Panait Cerna nr. 7
              <br />
              bl. M44, sc. 3, et. 7, ap. 93
              <br />
              Sector 3, București
              <br />
              <br />
              CUI: RO 54486857
              <br />
              Reg. Com.: J2026024816005
            </address>
          </div>
        </div>

        <div
          className="pt-8 border-t border-ivory-50/10 flex flex-col md:flex-row justify-between gap-4 text-sm"
          style={{ color: "rgba(251, 247, 240, 0.5)" }}
        >
          <p>© 2026 SC AERA SCENTT SRL · Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <Link href="/politica-confidentialitate" className={mutedLinkClass}>
              Politica de confidențialitate
            </Link>
            <Link href="/termeni-si-conditii" className={mutedLinkClass}>
              Termeni
            </Link>
            <Link href="/cookies" className={mutedLinkClass}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
