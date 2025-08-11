"use client";

import { usePrefersReducedMotion, useRevealOnce } from "@/components/shared/motion";

export interface ProteinProps {
  gramsPerCup?: number;
}

export function Protein(props: ProteinProps) {
  const { gramsPerCup = 15 } = props;
  const { ref, isRevealed } = useRevealOnce<HTMLDivElement>({ threshold: 0.18 });
  const reduced = usePrefersReducedMotion();

  const features = [
    { title: `${gramsPerCup}g+ Protein`, desc: "Real macro nutrition in every cup." },
    { title: "Complete Profile", desc: "Balanced amino acids for recovery." },
    { title: "Low Sugar", desc: "Sweetness without the crash." },
    { title: "Plant-Based", desc: "Clean protein. Dairy-free." },
    { title: "Light & Satiating", desc: "Keeps you full, not heavy." },
    { title: "Cold-Crafted", desc: "Smooth texture, better experience." },
  ];

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
        <div className="grid items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12">
          {/* Copy + features */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
              Protein
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Protein ice cream
            </h2>
            <p className="mt-3 max-w-prose text-foreground/80 md:text-lg">
              Built for goals and cravings. High‑protein, low‑sugar, and plant‑based — so you can enjoy dessert and still hit your macros.
            </p>

            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {features.map((f, idx) => (
                <li
                  key={f.title}
                  className="rounded-2xl border border-foreground/10 bg-[--color-background] p-4 shadow-sm"
                  style={{
                    opacity: isRevealed || reduced ? 1 : 0,
                    transform: reduced ? "none" : isRevealed ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: reduced ? "0s" : `${60 + idx * 40}ms`,
                    transition: reduced
                      ? "opacity 0.001s linear"
                      : "opacity 220ms ease-out, transform 220ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div className="text-sm font-semibold text-foreground/85">{f.title}</div>
                  <div className="mt-1 text-sm text-foreground/70">{f.desc}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlight card */}
          <div className="relative order-first aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10 bg-white/60 shadow-sm backdrop-blur md:order-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[color:oklch(63%_0.215_20)/.12] via-white/40 to-transparent" aria-hidden />
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">Per Cup</div>
                <div className="mt-1 text-6xl font-semibold tracking-tight md:text-7xl">
                  {gramsPerCup}g
                </div>
                <div className="mt-1 text-sm text-foreground/70">Protein</div>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/70 px-4 py-1.5 text-sm font-medium text-foreground/85 shadow-sm">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
                  Vegan • Dairy‑Free
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


