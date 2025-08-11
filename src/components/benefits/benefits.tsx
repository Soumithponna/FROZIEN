"use client";

import { usePrefersReducedMotion, useRevealOnce } from "@/components/shared/motion";

export interface BenefitsProps {}

export function Benefits(_: BenefitsProps) {
  const items = [
    { title: "Protein-Rich", desc: "Keeps you full, fuels your day." },
    { title: "Low-Calorie", desc: "Indulge without the guilt." },
    { title: "Vegan & Dairy-Free", desc: "Gentle on you, kind to the planet." },
  ];

  const { ref, isRevealed } = useRevealOnce<HTMLDivElement>({ threshold: 0.15 });
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-background text-foreground">
      <div
        ref={ref}
        className="mx-auto w-full max-w-6xl px-5 py-16 md:py-24"
        style={{
          opacity: isRevealed || reduced ? 1 : 0,
          transform: reduced ? "none" : isRevealed ? "translateY(0)" : "translateY(16px)",
          transition: reduced
            ? "opacity 0.001s linear"
            : "opacity 240ms ease-out, transform 260ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {items.map((b, idx) => (
            <div
              key={b.title}
              className="rounded-2xl border border-foreground/10 bg-[--color-background] p-5 shadow-sm"
              style={{
                opacity: isRevealed || reduced ? 1 : 0,
                transform: reduced ? "none" : isRevealed ? "translateY(0)" : "translateY(8px)",
                transitionDelay: reduced ? "0s" : `${60 + idx * 40}ms`,
                transition: reduced
                  ? "opacity 0.001s linear"
                  : "opacity 220ms ease-out, transform 220ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div className="text-base font-semibold">{b.title}</div>
              <div className="mt-1 text-sm text-foreground/70">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


