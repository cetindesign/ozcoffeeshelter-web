import Link from "next/link";
import { sectionIds, siteConfig } from "@/lib/config";

/**
 * Sticky üst gezinme.
 * Mobile'da link satırı kompakt; "Menü" en görünür CTA.
 */
const navItems = [
  { href: `#${sectionIds.about}`, label: "Hakkımızda" },
  { href: `#${sectionIds.menu}`, label: "Menü" },
  { href: `#${sectionIds.gallery}`, label: "Galeri" },
  { href: `#${sectionIds.location}`, label: "Konum" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-ink/5">
      <nav
        aria-label="Ana gezinme"
        className="container flex items-center justify-between h-16"
      >
        <Link
          href={`#${sectionIds.hero}`}
          className="font-serif text-lg sm:text-xl tracking-wide"
        >
          <span className="text-ink">OZ</span>
          <span className="text-gold ml-1.5 text-sm tracking-[0.2em] uppercase">
            Coffee Shelter
          </span>
          <span className="sr-only">{siteConfig.name} anasayfa</span>
        </Link>

        <ul className="hidden md:flex items-center gap-7 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-ink/80 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: yalnızca menüye kısa yol — en sık aranan bilgi */}
        <Link
          href={`#${sectionIds.menu}`}
          className="md:hidden text-sm font-medium text-ink border border-gold/60 px-3 py-1.5 rounded-full hover:bg-gold hover:text-cream transition-colors"
        >
          Menü
        </Link>
      </nav>
    </header>
  );
}
