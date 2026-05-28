import { sectionIds, siteConfig } from "@/lib/config";
import { Reveal } from "./Reveal";

/**
 * Konum & İletişim — koyu zeminli, mekan kapanışı.
 *
 * ===== HARİTA EMBED HAKKINDA =====
 * API key gerektirmeyen `q=...&output=embed` formatı kullanıyoruz.
 * İşletme adı + koordinat + ilçe/şehir verildiği için pin doğru yere düşer.
 *
 * Daha şık bir embed (Google'ın "Haritayı yerleştir" pb=... formatı) için:
 *   Google Maps → işletme → Paylaş → Haritayı yerleştir → iframe src kopyala
 *   → aşağıdaki GOOGLE_MAPS_EMBED_URL sabitine yapıştır.
 */
const GOOGLE_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${siteConfig.name} ${siteConfig.address.district} ${siteConfig.address.city}`
)}&ll=${siteConfig.address.latitude},${siteConfig.address.longitude}&z=17&output=embed`;

export function Location() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.address.latitude},${siteConfig.address.longitude}`;

  return (
    <section
      id={sectionIds.location}
      aria-labelledby="location-title"
      className="relative py-24 sm:py-32 bg-ink text-cream overflow-hidden"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto items-start">
          {/* --- Sol: başlık + iletişim --- */}
          <div>
            <Reveal>
              <p className="text-xs sm:text-sm tracking-[0.5em] uppercase text-gold mb-4">
                Bizi ziyaret edin
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="location-title"
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05]"
              >
                Karabağlar'da
                <span className="block text-gold italic">küçük</span>
                bir sığınak.
              </h2>
            </Reveal>

            <div className="mt-10 sm:mt-12 space-y-8 font-sans">
              <Reveal delay={0.1}>
                <InfoBlock title="Adres">
                  <address className="not-italic text-cream/80 leading-relaxed">
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.district}, {siteConfig.address.city}
                  </address>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 mt-4 text-sm text-gold hover:text-cream transition-colors"
                  >
                    <span>Yol tarifi al</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </InfoBlock>
              </Reveal>

              <Reveal delay={0.15}>
                <InfoBlock title="Çalışma Saatleri">
                  <ul className="space-y-1.5 text-cream/80">
                    {siteConfig.openingHours.map((row) => (
                      <li
                        key={row.days}
                        className="flex items-baseline justify-between max-w-xs gap-4"
                      >
                        <span>{row.days}</span>
                        <span className="dot-leader flex-1 self-end mb-[6px] h-px text-cream" />
                        <span className="tabular-nums text-cream">
                          {row.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </InfoBlock>
              </Reveal>

              {(siteConfig.phone || siteConfig.email) && (
                <Reveal delay={0.2}>
                  <InfoBlock title="İletişim">
                    {siteConfig.phone && (
                      <p>
                        <a
                          href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                          className="text-cream/80 hover:text-gold transition-colors"
                        >
                          {siteConfig.phoneDisplay || siteConfig.phone}
                        </a>
                      </p>
                    )}
                    {siteConfig.email && (
                      <p className="mt-1">
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="text-cream/80 hover:text-gold transition-colors"
                        >
                          {siteConfig.email}
                        </a>
                      </p>
                    )}
                  </InfoBlock>
                </Reveal>
              )}

              {siteConfig.social.instagram && (
                <Reveal delay={0.25}>
                  <InfoBlock title="Sosyal Medya">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream/80 hover:text-gold transition-colors"
                    >
                      Instagram →
                    </a>
                  </InfoBlock>
                </Reveal>
              )}
            </div>
          </div>

          {/* --- Sağ: Harita --- */}
          <Reveal delay={0.15} className="lg:sticky lg:top-24">
            <div className="aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-lg ring-1 ring-cream/10 shadow-2xl">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                title={`${siteConfig.name} konum haritası`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="w-full h-full border-0 grayscale-[0.3] contrast-[1.05]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// --- Yardımcı: tutarlı bilgi bloğu ---
function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-serif text-base text-gold tracking-[0.2em] uppercase mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}
