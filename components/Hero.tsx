"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { sectionIds, siteConfig } from "@/lib/config";
import { EASE_OUT_EXPO } from "./Reveal";
import { HeroVideo } from "./HeroVideo";

// --- Stagger varyantları (modül seviyesinde sabit — re-render'da yeniden yaratılmaz) ---
const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/**
 * Hero — sayfanın ilk izlenimi.
 *
 * Tasarım kararları:
 *  - Tipografi devasa: "OZ" tek başına ekran genişliği kadar büyür
 *  - Çok aşamalı metin reveal'i (stagger): eyebrow → başlık → açıklama → CTA
 *  - Arka plana hafif parallax (scroll'la birlikte yukarı süzülür)
 *  - Görsel YOKSA derin koyu gradient + grain hissi (radial vignette)
 *
 * public/hero.jpg ekleyince arka plana koyu opacite ile yerleşir,
 * yine ön plandaki tipografi okunur.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll progress'i bu bölüm için ölç (0..1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Arka plan, içerikten daha yavaş kayıyor → parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id={sectionIds.hero}
      aria-label="Giriş"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-ink"
    >
      {/* --- Parallax arka plan ---
       * Katman sırası (alttan üste, DOM sırasına göre):
       *  1) Deep gradient (her zaman görünür — video yüklenirken / hatada fallback)
       *  2) HeroVideo (autoplay loop, reduced-motion'da pause)
       *  3) Radial vignette (kenarları koyulaştır)
       *  4) Üst gradient (header okunabilirliği)
       *
       * NOT: Negatif z-index KULLANMA — section'ın `bg-ink` background-color'ı
       * negatif z-index'li çocukları örter ve video görünmez.
       */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#1a130d] to-[#2e2017]" />

        {/* Akan video — kendi videonu /public/hero/hero.mp4 olarak ekleyince
            HeroVideo.tsx'in DEFAULT_SOURCE'unu değiştirerek devreye alırsın */}
        <HeroVideo poster="/hero/poster.jpg" />

        {/* Radial vignette — merkez okunaklı, kenarlar koyu */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.55)_65%,_rgba(0,0,0,0.92)_100%)]" />
        {/* Üst hafif gradient — header'ın okunabilmesi için */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />
      </motion.div>

      {/* --- İçerik --- */}
      <motion.div
        style={{ y: contentY, opacity }}
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="show"
        className="container text-center text-cream py-24 sm:py-32 relative z-10"
      >
        <motion.p
          variants={ITEM_VARIANTS}
          className="font-sans text-xs sm:text-sm tracking-[0.5em] uppercase text-gold mb-8"
        >
          16 yıllık zanaat — İzmir
        </motion.p>

        {/* Başlık — kelime kelime stagger */}
        <h1 className="font-serif font-semibold leading-[0.95] tracking-tight">
          <motion.span
            variants={ITEM_VARIANTS}
            className="block text-[22vw] sm:text-[14vw] md:text-[180px] text-cream"
          >
            OZ
          </motion.span>
          <motion.span
            variants={ITEM_VARIANTS}
            className="block text-3xl sm:text-5xl md:text-6xl mt-2 sm:mt-0 text-gold tracking-[0.15em] uppercase font-normal"
          >
            Coffee Shelter
          </motion.span>
        </h1>

        <motion.p
          variants={ITEM_VARIANTS}
          className="mt-10 text-base sm:text-lg text-cream/80 max-w-xl mx-auto font-sans leading-relaxed"
        >
          {siteConfig.tagline} Özenle seçilmiş çekirdekler, mevsim özel
          içecekler ve kendine has bir atmosfer.
        </motion.p>

        <motion.div
          variants={ITEM_VARIANTS}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={`#${sectionIds.menu}`}
            className="group inline-flex items-center justify-center gap-2 bg-gold text-ink font-medium px-8 py-3.5 rounded-full hover:bg-cream transition-colors min-w-[200px]"
          >
            <span>Menüyü Gör</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href={`#${sectionIds.location}`}
            className="inline-flex items-center justify-center border border-cream/30 text-cream font-medium px-8 py-3.5 rounded-full hover:border-gold hover:text-gold transition-colors min-w-[200px]"
          >
            Yol Tarifi Al
          </Link>
        </motion.div>
      </motion.div>

      {/* --- Scroll cue --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50 text-[10px] tracking-[0.4em] uppercase"
      >
        <span>Keşfet</span>
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-cream/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
