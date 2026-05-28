import { sectionIds } from "@/lib/config";
import { Reveal } from "./Reveal";

/**
 * Galeri — bento-style asimetrik grid.
 *
 * Mobile'da 2 kolon, lg'de 4 kolon ile 6 hücrelik düzen — bazı hücreler
 * iki satır kaplar, bazıları iki kolon. Bu kompozisyon "sıradan görsel
 * gridi" hissinden uzaklaşıp magazin layout'una yaklaştırır.
 *
 * Görseller yüklenince public/gallery/0X.jpg üstte gözükür; yüklenmemişse
 * altta brand-koyu placeholder kalır (404 olmaz çünkü plain <img>).
 */
const galleryImages = [
  {
    src: "/gallery/01.jpg",
    alt: "OZ Coffee Shelter mekan içi — sıcak ışıklı oturma alanı",
    span: "row-span-2",
  },
  {
    src: "/gallery/02.jpg",
    alt: "Barista espresso hazırlarken yakın çekim",
    span: "",
  },
  {
    src: "/gallery/03.jpg",
    alt: "Latte art ile servis edilen kahve",
    span: "col-span-2",
  },
  {
    src: "/gallery/04.jpg",
    alt: "Matcha latte ve yanında tatlı sunumu",
    span: "",
  },
  {
    src: "/gallery/05.jpg",
    alt: "Mekanın atmosferik dış cephesi",
    span: "row-span-2 col-span-2",
  },
  {
    src: "/gallery/06.jpg",
    alt: "Summer Edition soğuk içecek servisi",
    span: "",
  },
] as const;

export function Gallery() {
  return (
    <section
      id={sectionIds.gallery}
      aria-labelledby="gallery-title"
      className="py-24 sm:py-32 bg-cream"
    >
      <div className="container">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <Reveal>
            <p className="text-xs sm:text-sm tracking-[0.5em] uppercase text-gold mb-4">
              Galeri
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="gallery-title"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-ink"
            >
              Mekandan kareler
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-ink/60 text-base sm:text-lg max-w-xl">
              Burası kahveden çok daha fazlası. Bir köşe, bir ışık, bir kupa.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[240px] gap-3 sm:gap-4 max-w-6xl mx-auto">
          {galleryImages.map((img, i) => (
            <Reveal
              key={img.src}
              delay={i * 0.06}
              as="article"
              className={`relative overflow-hidden rounded-lg group ${img.span}`}
            >
              {/* Brand-koyu placeholder (görsel yokken görünür) */}
              <div className="absolute inset-0 bg-gradient-to-br from-ink to-[#3a2c1f] flex items-center justify-center">
                <span className="text-gold/30 font-serif text-3xl tracking-widest">
                  OZ
                </span>
              </div>

              {/* Gerçek görsel — public/gallery/0X.jpg eklenince devreye girer */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay — altın kenar + alttan koyu gradient */}
              <div className="absolute inset-0 ring-0 group-hover:ring-1 group-hover:ring-gold/70 transition-all duration-500 rounded-lg" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
