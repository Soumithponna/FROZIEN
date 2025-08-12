"use client";

import Image from "next/image";
import { usePrefersReducedMotion, useRevealOnce } from "@/components/shared/motion";
import { GlassCard } from "@/components/shared/glass-card";

export interface LayerAdvantageProps {
  backgroundSrc?: string;
}

export function LayerAdvantage(_: LayerAdvantageProps) {
  const { ref, isRevealed } = useRevealOnce<HTMLDivElement>({ threshold: 0.2 });
  const reduced = usePrefersReducedMotion();

  const items = [
    { title: "Crunch Topping", desc: "Texture that delights at first bite." },
    { title: "Protein Cream", desc: "Silky, protein-rich goodness." },
    { title: "Flavor Base", desc: "Vibrant flavors that complete the cup." },
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
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10 bg-white/50 shadow-sm backdrop-blur md:order-1">
            <Image
              src="/layer.png"
              alt="Layered cup illustration"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-600">Layers</span>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">The Layer Advantage</h2>
            <p className="mt-3 max-w-prose text-foreground/80 md:text-lg">
              Every transparent cup tells a story of thoughtful nutrition, beautiful presentation, and uncompromising taste.
            </p>
            <ul className="mt-6 grid gap-3">
              {items.map((item, idx) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur"
                  style={{
                    opacity: isRevealed || reduced ? 1 : 0,
                    transform: reduced ? "none" : isRevealed ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: reduced ? "0s" : `${60 + idx * 40}ms`,
                    transition: reduced
                      ? "opacity 0.001s linear"
                      : "opacity 220ms ease-out, transform 220ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div className="text-sm font-semibold text-foreground/80">{item.title}</div>
                  <div className="mt-1 text-sm text-foreground/70">{item.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


