import { siteConfig } from "@/lib/config";

/**
 * Footer — büyük marka tipografisi + sosyal linkler + telif.
 *
 * Üstte ekran genişliği kadar büyüyen "OZ COFFEE SHELTER" yazısı,
 * altta minimal bilgi satırı.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const socials: Array<{ href: string; label: string }> = [
    { href: siteConfig.social.instagram, label: "Instagram" },
    { href: siteConfig.social.facebook, label: "Facebook" },
    { href: siteConfig.social.twitter, label: "Twitter" },
  ].filter((s) => s.href.length > 0);

  return (
    <footer className="bg-ink text-cream/70 pt-16 sm:pt-24 pb-8 font-sans border-t border-cream/5">
      <div className="container">
        {/* --- Büyük marka tipografisi --- */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-serif text-cream leading-none tracking-tight text-[14vw] sm:text-[10vw] md:text-[8vw]">
            OZ <span className="text-gold italic">Coffee</span>
          </p>
          <p className="font-sans text-xs sm:text-sm tracking-[0.5em] uppercase text-cream/50 mt-2">
            Shelter
          </p>
        </div>

        {/* --- Alt bilgi satırı --- */}
        <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
          <p className="text-cream/50 text-xs">
            © {year} {siteConfig.name}. Tüm hakları saklıdır.
          </p>

          {socials.length > 0 && (
            <ul className="flex items-center gap-6">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/70 hover:text-gold transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p className="text-cream/40 text-xs">
            İzmir / Karabağlar
          </p>
        </div>
      </div>
    </footer>
  );
}
