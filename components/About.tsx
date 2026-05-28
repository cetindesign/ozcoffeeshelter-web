import { sectionIds } from "@/lib/config";
import { Reveal } from "./Reveal";

/**
 * Hakkımızda — magazin tipi iki kolonlu düzen.
 *
 * Sol kolon: küçük eyebrow + dev serif başlık + büyük "16" sayısal vurgu
 * Sağ kolon: 3 paragraf hikaye + 3 küçük "fact" metriği
 *
 * Bütün öğeler Reveal ile scroll'a göre sıralı görünüyor.
 */
export function About() {
  return (
    <section
      id={sectionIds.about}
      aria-labelledby="about-title"
      className="py-24 sm:py-32 bg-cream"
    >
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* --- Sol: başlık + sayı vurgusu --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <Reveal>
              <p className="text-xs sm:text-sm tracking-[0.5em] uppercase text-gold mb-5">
                Hakkımızda
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="about-title"
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] text-ink"
              >
                Bir bardakta
                <span className="block text-gold italic">16 yıl</span>
                <span className="block">birikmiş zanaat.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="section-rule mt-8 w-24" aria-hidden="true" />
            </Reveal>
          </div>

          {/* --- Sağ: paragraflar --- */}
          <div className="lg:col-span-7 space-y-6 text-ink/80 text-base sm:text-lg leading-relaxed font-sans">
            <Reveal delay={0.1}>
              <p>
                <span className="font-serif text-ink text-xl">
                  OZ Coffee Shelter
                </span>
                , 16 yılını kahvenin sayısız tezgâhında geçirmiş bir
                baristanın kendi adına açtığı ilk mekan. Bir sığınak fikri
                etrafında kuruldu: gün boyu süren koşuşturmadan sıyrılıp,
                bir bardağın kıyısında nefes alabileceğin yer.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Burada her şey bardakta başlar. Çekirdekler özenle seçilir,
                taze öğütülür, sabırla demlenir. Espresso'nun yoğunluğundan
                matcha'nın ipeksi sakinliğine; klasik tariflerden imzamızı
                taşıyan{" "}
                <em className="text-ink not-italic font-medium">OZ Special</em>,{" "}
                <em className="text-ink not-italic font-medium">Flat Gold</em>{" "}
                ve{" "}
                <em className="text-ink not-italic font-medium">Hulk</em>'a
                kadar her bardak, 16 yıllık bir alışkanlığın incelttiği bir el
                ile hazırlanır.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Mekan küçük, ışık koyu, ahşap sıcak. Bitkisel süt
                alternatiflerinden mevsim özel Summer Edition serisine,
                menüyü herkesin kendine bir köşe bulabileceği şekilde
                kuruyoruz. Bir kitabınızla, bir arkadaşınızla ya da
                yalnız — kapımız her gün açık.
              </p>
            </Reveal>

            {/* --- Küçük "metrik" şeridi --- */}
            <Reveal delay={0.28}>
              <dl className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t border-ink/10">
                <Stat n="16" label="yıllık tezgah deneyimi" />
                <Stat n="29" label="kalemlik menü" />
                <Stat n="∞" label="bardağın kıyısı" />
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <dt className="font-serif text-3xl sm:text-4xl text-ink tabular-nums">
        {n}
      </dt>
      <dd className="text-xs sm:text-sm text-ink/60 mt-1 leading-tight">
        {label}
      </dd>
    </div>
  );
}
