"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Sonsuz akan yatay tipografi şeridi.
 *
 * Hero ile About arasında atmosferik bir aksanlık olarak kullanılır.
 * Yedek (dublike) içerik trick'iyle dikişsiz loop — gerçek anlamda sonsuz.
 *
 * Reduced motion'da animasyon yok, içerik sabit tek satır kalır.
 */
type Props = {
  /** Şeritte tekrar edecek kelimeler */
  items: string[];
  /** Bir döngünün süresi (sn) — büyük değer = yavaş kayış */
  speed?: number;
};

export function Marquee({ items, speed = 40 }: Props) {
  const reduceMotion = useReducedMotion();
  // İçeriği iki kez render edip x: 0 → -50% animasyonu ile dikişsiz döngü kuruyoruz.
  const sequence = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-gold/20 bg-ink text-cream/90 select-none"
    >
      {/* Kenar fade — şeridin başı ve sonu kremin içine erir */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-ink to-transparent" />

      {/* KRİTİK: `w-max` motion.div'i içerik genişliğinde tutar.
          Olmadığında flex container parent'ı doldurur (viewport width), -50%
          de viewport'un yarısı kadar kayar — bu seamless loop oluşturmaz
          çünkü dublike içerik motion.div'in dışına taşar. w-max ile:
            motion.div width = 2 × (items width)
            x: -50% = tam bir items grubu kadar kayma = dikişsiz döngü */}
      <motion.div
        className="flex w-max whitespace-nowrap py-6 sm:py-8 will-change-transform"
        animate={
          reduceMotion
            ? undefined
            : { x: ["0%", "-50%"] }
        }
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {sequence.map((text, i) => (
          <span
            key={i}
            className="font-serif text-3xl sm:text-5xl md:text-6xl px-8 sm:px-12 flex items-center gap-8 sm:gap-12"
          >
            {text}
            <span className="text-gold text-2xl sm:text-4xl">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
