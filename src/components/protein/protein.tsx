"use client";

import { usePrefersReducedMotion, useRevealOnce } from "@/components/shared/motion";
import { GlassCard } from "@/components/shared/glass-card";

export interface ProteinProps {
  gramsPerCup?: number;
}

export function Protein(props: ProteinProps) {
  const { gramsPerCup = 15 } = props;
  const { ref, isRevealed } = useRevealOnce<HTMLDivElement>({ threshold: 0.18 });
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
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 shadow-sm backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
            Protein
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Protein that satisfies</h2>
          <p className="mt-3 mx-auto max-w-prose text-foreground/80 md:text-lg">High‑protein, low‑sugar, plant‑based ice cream. Designed for performance and pleasure.</p>
        </div>

        <div className="mt-8 flex justify-center">
          <GlassCard className="relative w-full max-w-2xl p-6 md:p-8">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-[var(--color-brand)]/15 blur-2xl" />
              <div className="absolute -bottom-24 -right-20 h-48 w-48 rounded-full bg-[var(--color-brand)]/10 blur-2xl" />
            </div>
            <div className="relative grid place-items-center text-center">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">Per Cup</div>
                <div className="mt-1 text-6xl font-semibold tracking-tight md:text-7xl">{gramsPerCup}g</div>
                <div className="mt-1 text-sm text-foreground/70">Protein</div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/30 px-3 py-1 text-xs font-medium text-foreground/85 backdrop-blur">Vegan</span>
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/30 px-3 py-1 text-xs font-medium text-foreground/85 backdrop-blur">Dairy‑Free</span>
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/30 px-3 py-1 text-xs font-medium text-foreground/85 backdrop-blur">0g Added Sugar</span>
                </div>

                <div className="mt-6 grid gap-3 text-left md:grid-cols-3">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-sm shadow-sm backdrop-blur">
                    <div className="text-foreground/60">Calories</div>
                    <div className="font-semibold">80–100 kcal</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-sm shadow-sm backdrop-blur">
                    <div className="text-foreground/60">Added Sugar</div>
                    <div className="font-semibold">0 g</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-sm shadow-sm backdrop-blur">
                    <div className="text-foreground/60">Serving Size</div>
                    <div className="font-semibold">1 cup</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">Macro balance (illustrative)</div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full border border-white/15 bg-white/10">
                    <div className="h-full w-[60%] bg-[--color-brand]" />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-foreground/60">
                    <span>Protein ~60%</span>
                    <span>Carbs ~25%</span>
                    <span>Fat ~15%</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <a href="/shop" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/30 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur transition-colors hover:bg-white/40">Shop flavours</a>
                  <a href="/about" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/20 px-4 py-2 text-sm font-medium text-foreground/85 shadow-sm backdrop-blur transition-colors hover:bg-white/30">Learn more</a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}


