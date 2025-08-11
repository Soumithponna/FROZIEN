"use client";

import { usePrefersReducedMotion, useRevealOnce } from "@/components/shared/motion";

export function DesignedToBeSeen() {
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
        <div className="mx-auto flex w-full max-w-6xl justify-center px-2">
          <div
            className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white/60 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur"
            style={{
              opacity: isRevealed || reduced ? 1 : 0,
              transform: reduced ? "none" : isRevealed ? "translateY(0)" : "translateY(6px)",
              transition: reduced
                ? "opacity 0.001s linear"
                : "opacity 200ms ease-out, transform 220ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
            <span>Designed to be seen</span>
          </div>
        </div>
      </div>
    </section>
  );
}


