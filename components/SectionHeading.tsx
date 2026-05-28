/**
 * Bütün bölümlerde ortak kullanılan başlık bileşeni.
 * Tutarlı tipografi + altta altın bir ince çizgi.
 */
type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignClass} mb-12 sm:mb-16`}>
      {eyebrow && (
        <p className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink">
        {title}
      </h2>
      <div
        className={`section-rule mt-5 w-24 ${
          align === "center" ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />
      {subtitle && (
        <p className="mt-5 text-ink/70 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
