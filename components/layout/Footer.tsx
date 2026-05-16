import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { Logo } from './Logo'

const eyebrowStyle = { color: 'var(--color-taupe-500)' }
const mutedLinkClass =
  'text-cocoa-700 hover:text-cocoa-900 transition-colors duration-200'

export function Footer() {
  return (
    <footer className="mt-20 bg-ivory-50 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 md:pt-16 pb-6">
        {/* Logo + tagline editorial */}
        <div className="mb-12 md:mb-16">
          <Logo variant="mocha" className="h-12 md:h-14 w-auto mb-5" />
          <p
            className="max-w-xl"
            style={{
              fontFamily: 'var(--font-bodoni-moda), Georgia, serif',
              fontSize: '22px',
              lineHeight: 1.3,
              color: 'var(--color-cocoa-700)',
            }}
          >
            For the love of{' '}
            <span style={{ fontStyle: 'italic' }}>Beauty.</span>
          </p>

          {/* Social — Instagram */}
          <div className="mt-7">
            <h3 className="eyebrow mb-2" style={eyebrowStyle}>
              Urmărește-ne
            </h3>
            <div className="flex items-center -ml-2.5">
              <a
                href="https://www.instagram.com/aerabeauty.ro/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urmărește AERA Beauty pe Instagram (se deschide într-o filă nouă)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cocoa-700 hover:text-cocoa-900 hover:bg-stone-200/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-700 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50"
              >
                <Instagram
                  size={22}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 mb-12">
          {/* Navigație */}
          <div className="md:col-span-3">
            <h3 className="eyebrow mb-3" style={eyebrowStyle}>
              Navigație
            </h3>
            <ul className="space-y-1.5 text-sm">
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

          {/* Branduri */}
          <div className="md:col-span-3">
            <h3 className="eyebrow mb-3" style={eyebrowStyle}>
              Branduri
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href="/produse/aqua-mineral"
                  className={mutedLinkClass}
                >
                  Aqua Mineral
                </Link>
              </li>
              <li>
                <Link
                  href="/produse/oliere-paris"
                  className={mutedLinkClass}
                >
                  Oliere Paris
                </Link>
              </li>
              <li>
                <Link
                  href="/produse/redefine-matcha"
                  className={mutedLinkClass}
                >
                  Redefine Matcha
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="eyebrow mb-3" style={eyebrowStyle}>
              Contact
            </h3>
            <ul className="space-y-1.5 text-sm">
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
            <h3 className="eyebrow mb-3" style={eyebrowStyle}>
              Firmă
            </h3>
            <address
              className="not-italic text-sm leading-snug text-taupe-500"
            >
              SC AERA SCENTT SRL · Importator unic
              <br />
              Str. Panait Cerna 7, bl. M44, sc. 3, et. 7, ap. 93
              <br />
              Sector 3, București
              <br />
              CUI RO 54486857 · Reg. Com. J2026024816005
            </address>
          </div>
        </div>

        {/* Legal bar */}
        <div className="pt-6 border-t border-stone-200 flex flex-col md:flex-row justify-between gap-3 text-xs text-taupe-500">
          <p>© 2026 SC AERA SCENTT SRL · Toate drepturile rezervate.</p>
          <div className="flex gap-5">
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
  )
}
