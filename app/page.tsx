import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";

/**
 * Tek sayfa kompozisyonu.
 *
 * Akış kararları:
 *  - Hero (koyu) → Marquee (koyu, akan tipografi) → About (krem)
 *    → Menu (krem, foto kartlar) → Marquee (koyu) → Gallery (krem)
 *    → Location (koyu) → Footer (koyu, büyük tipografi)
 *  - Koyu/krem alternansı her bölümün diğerinden net biçimde ayrışmasını sağlar.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee
          items={[
            "Espresso",
            "Flat Gold",
            "OZ Special",
            "Matcha Latte",
            "Spanish Latte",
            "Hulk",
            "Türk Kahvesi",
            "Cool Lime",
          ]}
        />
        <About />
        <Menu />
        <Marquee
          items={[
            "Specialty Coffee",
            "Mevsim Özel",
            "Third Wave",
            "Karabağlar",
            "Sığınak",
            "16 yıl",
          ]}
          speed={50}
        />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </>
  );
}
