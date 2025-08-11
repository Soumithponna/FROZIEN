"use client";

import { usePrefersReducedMotion, useRevealOnce } from "@/components/shared/motion";

export interface WhyWeExistProps {
  items: { num: string; label: string }[];
}

export function WhyWeExist(_: WhyWeExistProps) {
  const { ref, isRevealed } = useRevealOnce<HTMLDivElement>({ threshold: 0.2 });
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative bg-background text-foreground">
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
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-600">Our Story</span>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Why We Exist</h2>
            <p className="mt-4 max-w-prose text-foreground/80 md:text-lg">
              Two friends, one dream — create ice cream anyone can enjoy. Protein-packed, dairy-free, and designed to look as good as it tastes.
            </p>
          </div>
          <ul className="grid grid-cols-3 gap-3 md:gap-4">
            {[{ num: "2", label: "Founders" }, { num: "100+", label: "Recipes" }, { num: "1", label: "Formula" }].map(({ num, label }, idx) => (
              <li
                key={label}
                className="rounded-2xl border border-foreground/10 bg-[--color-background] p-4 text-center shadow-sm"
                style={{
                  opacity: isRevealed || reduced ? 1 : 0,
                  transform: reduced ? "none" : isRevealed ? "translateY(0)" : "translateY(8px)",
                  transitionDelay: reduced ? "0s" : `${80 + idx * 40}ms`,
                  transition: reduced
                    ? "opacity 0.001s linear"
                    : "opacity 220ms ease-out, transform 220ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div className="text-3xl font-semibold md:text-4xl">{num}</div>
                <div className="mt-1 text-xs font-medium tracking-wide text-foreground/60 md:text-sm">{label}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


