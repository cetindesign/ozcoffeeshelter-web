"use client";

import {
  motion,
  useReducedMotion,
  cubicBezier,
  type Variants,
} from "framer-motion";
import { useMemo, type ReactNode } from "react";

// Tek yerde tutulan "yumuşak outExpo" easing — bütün motion bileşenleri
// tutarlı bir his için bunu kullanıyor.
export const EASE_OUT_EXPO = cubicBezier(0.22, 1, 0.36, 1);

/**
 * Scroll-triggered reveal wrapper.
 *
 * Sayfa kaydırıldıkça çocukları aşağıdan yumuşak bir fade ile yukarı taşır.
 * `delay` ile sıralı reveal yapılabilir (stagger):
 *   <Reveal>başlık</Reveal>
 *   <Reveal delay={0.1}>açıklama</Reveal>
 *
 * Kullanıcı "reduced motion" ayarladıysa animasyon devre dışı, içerik
 * doğrudan görünür şekilde render edilir (a11y için kritik).
 */
type Props = {
  children: ReactNode;
  delay?: number;
  /** Aşağıdan kaç piksel yukarı süzülecek */
  y?: number;
  /** Animasyon süresi (sn) */
  duration?: number;
  className?: string;
  /** "all" → ilk görünüşte tetiklen, "once: false" → her viewport'ta tekrar */
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "header";
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className,
  once = true,
  as = "div",
}: Props) {
  const reduceMotion = useReducedMotion();

  // Variants objesi propslar değişmedikçe sabit referansta kalır —
  // motion bileşeninin gereksiz re-konfigürasyonunu engeller.
  const variants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : y },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduceMotion ? 0 : duration,
          delay,
          ease: EASE_OUT_EXPO,
        },
      },
    }),
    [delay, duration, y, reduceMotion],
  );

  // framer-motion'da etiket-bağlı motion componenti seçimi
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px 0px" }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
