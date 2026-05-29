"use client";

import { useState } from "react";

/**
 * Sonsuz akan yatay tipografi şeridi — CSS animation tabanlı.
 *
 * --- Etkileşim ---
 *  - Desktop: imleç üzerine gelince animasyon duruyor (CSS :hover)
 *  - Mobile : şeride tıklayınca/dokununca toggle ile pause (data-paused)
 *           ↳ user "ne var burada" diye okumak istediğinde, tap = dur,
 *             tekrar tap = devam
 *  - Reduced motion: animasyon hiç çalışmıyor (CSS media query)
 *
 * --- Performans ---
 * framer-motion yok, sadece CSS transform animation. GPU-accelerated,
 * her frame için JS yok. Bütün state — tek bir boolean (paused).
 *
 * --- Erişilebilirlik ---
 * İçerik dekoratif (marka kelimeleri), aria-hidden ile screen reader
 * atlıyor. Görsel kullanıcılar için pause UX'i, tabIndex ile klavyeye
 * de açılıyor (Tab → Enter ile toggle).
 */
type Props = {
  /** Şeritte tekrar edecek kelimeler */
  items: string[];
  /** Bir döngünün süresi (saniye) — büyük değer = yavaş kayış */
  speed?: number;
};

export function Marquee({ items, speed = 40 }: Props) {
  const [paused, setPaused] = useState(false);
  // İki kez dublike ediyoruz: -50% translate tam bir items grubunu kaydırır
  // → dikişsiz döngü.
  const sequence = [...items, ...items];

  const toggle = () => setPaused((p) => !p);

  return (
    <div
      className="marquee-wrap group relative overflow-hidden border-y border-gold/20 bg-ink text-cream/90 select-none cursor-pointer"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={
        paused
          ? "Akan metni devam ettirmek için dokunun"
          : "Akan metni durdurmak için dokunun"
      }
      data-paused={paused || undefined}
    >
      {/* Kenar fade — şeridin başı/sonu siyahın içine erir */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-ink to-transparent" />

      <div
        className="marquee-track flex w-max whitespace-nowrap py-6 sm:py-8"
        // CSS değişkeni ile süre özelleştirmesi
        style={{ ["--marquee-duration" as string]: `${speed}s` } as React.CSSProperties}
      >
        {sequence.map((text, i) => (
          <span
            key={i}
            className="font-serif text-3xl sm:text-5xl md:text-6xl px-8 sm:px-12 flex items-center gap-8 sm:gap-12"
          >
            {text}
            <span className="text-gold text-2xl sm:text-4xl" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>

      {/* Mobile için küçük ipucu — sadece dokunulabilir cihazlarda gözükür,
          ilk açılışta var, kullanıcı bir kez etkileşime girince saklanır */}
      <span
        className={`pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 text-[10px] tracking-[0.3em] uppercase text-cream/40 transition-opacity duration-500 sm:hidden ${
          paused ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        ← dokun, dur ↺
      </span>
    </div>
  );
}
