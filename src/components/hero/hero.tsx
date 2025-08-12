"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface HeroProps {
  backgroundSrc?: string;
  brandName?: string;
  proteinGrams?: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function useSmoothed(value: number, factor = 0.18, disabled = false): number {
  const [smoothed, setSmoothed] = useState(value);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (disabled) {
      setSmoothed(value);
      return;
    }
    function tick() {
      setSmoothed((prev) => {
        const next = prev + (value - prev) * factor;
        if (Math.abs(next - value) < 0.001) return value;
        rafRef.current = requestAnimationFrame(tick);
        return next;
      });
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, factor, disabled]);
  return smoothed;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const handler = () => setReduced(media.matches);
    media.addEventListener?.("change", handler);
    return () => media.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

export function Hero(props: HeroProps) {
  const { backgroundSrc = "/ice.png", brandName = "FROZIEN", proteinGrams = 15 } = props;

  const sectionTwoRef = useRef<HTMLDivElement | null>(null);
  const [sectionTwoProgress, setSectionTwoProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionTwoRef.current;
    if (!el) return;

    let ticking = false;
    const getViewportHeight = () => {
      if (typeof window === "undefined") return 0;
      const vv: VisualViewport | undefined = (window as unknown as { visualViewport?: VisualViewport }).visualViewport;
      return vv && typeof vv.height === "number" ? Math.round(vv.height) : window.innerHeight;
    };

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = getViewportHeight();
      // Progress of section 2 entering the viewport: 0 when its top is at bottom, 1 when its top reaches the top
      const p = clamp(1 - rect.top / viewportH, 0, 1);
      setSectionTwoProgress(p);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    const resizeObserver = new ResizeObserver(() => update());
    resizeObserver.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("orientationchange", onScroll);
    const maybeVV: VisualViewport | undefined = (window as unknown as { visualViewport?: VisualViewport }).visualViewport;
    if (maybeVV && typeof maybeVV.addEventListener === "function") {
      maybeVV.addEventListener("resize", onScroll, { passive: true });
      maybeVV.addEventListener("scroll", onScroll, { passive: true });
    }

    update();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
      if (maybeVV && typeof maybeVV.removeEventListener === "function") {
        maybeVV.removeEventListener("resize", onScroll);
        maybeVV.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  const smoothSectionTwo = useSmoothed(sectionTwoProgress, 0.18, reduced);
  const sectionTwoOpacity = reduced ? 1 : smoothstep(0.2, 0.9, smoothSectionTwo);
  const sectionTwoTranslate = reduced ? 0 : (1 - sectionTwoOpacity) * 20;
  const sectionOneOpacity = reduced ? (sectionTwoProgress < 1 ? 1 : 0) : 1 - smoothstep(0.1, 0.8, smoothSectionTwo);
  const sectionOneTranslate = reduced ? 0 : (1 - sectionOneOpacity) * 20;

  return (
    <section className="relative isolate bg-background text-foreground">
      <div className="relative">
        {/* Sticky, shared background limited to these two sections with Section 1 content overlayed */}
        <div className="sticky top-0 z-0 h-[100svh] w-screen overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={backgroundSrc}
              alt="Close-up of beautifully layered vegan ice-cream"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
          </div>
          <div
            className="relative z-10 flex min-h-[100svh] w-screen items-center justify-center p-6"
            style={{
              opacity: sectionOneOpacity,
              transform: `translateY(${sectionOneTranslate}px)`,
              transition: reduced ? "opacity 0.001s linear" : "opacity 200ms ease-out, transform 300ms cubic-bezier(0.22,1,0.36,1)",
              pointerEvents: sectionOneOpacity < 0.05 ? "none" : "auto",
            }}
            aria-hidden={sectionOneOpacity < 0.05}
          >
            <div className="w-full max-w-2xl text-center text-white">
          <div className="mb-3 text-sm font-semibold tracking-[0.25em] text-white/80 md:text-base">{brandName}</div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Protein-packed. Guilt-free. Beautifully layered.
          </h1>
          <p className="mt-4 text-lg text-white/85 md:mt-5 md:text-2xl">
            Vegan. Low calorie. High protein. Dairy-free delight.
          </p>

          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/95 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-[--color-brand]"></span>
              {proteinGrams}g Protein per cup
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:justify-center">
            <a
              href="https://www.zeptonow.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on Zepto"
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-[--color-brand] px-5 py-3 text-sm font-medium text-[--color-brand-contrast] shadow-sm transition-[transform,opacity,box-shadow] duration-200 ease-out active:opacity-90 motion-safe:hover:scale-[1.02] motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white hover:bg-white/20 hover:text-white hover:border-white/40 hover:backdrop-blur-md hover:ring-1 hover:ring-white/60"
            >
              Order on Zepto
            </a>
            <a
              href="https://www.swiggy.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on Swiggy"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/20 px-5 py-3 text-sm font-medium text-white shadow-sm backdrop-blur-md transition-[transform,opacity,box-shadow] duration-200 ease-out active:opacity-90 motion-safe:hover:scale-[1.02] motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Order on Swiggy
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/85 md:mt-6">
            {["Vegan", "Low Calorie", `${proteinGrams}g Protein`, "Dairy-Free"].map((label) => (
              <li key={label}>
                <span className="inline-flex select-none items-center gap-1 rounded-full border border-white/25 bg-white/[0.06] px-3 py-1 backdrop-blur">
                  {label}
                </span>
              </li>
            ))}
          </ul>
            </div>
          </div>
        </div>

        {/* Section 2: details/stats that layer up on scroll */}
        <section
          ref={sectionTwoRef}
          className="relative z-10 flex min-h-[100svh] w-screen items-end p-6 md:p-10"
          style={{
            opacity: sectionTwoOpacity,
            transform: `translateY(${sectionTwoTranslate}px)`,
            transition: reduced ? "opacity 0.001s linear" : "opacity 200ms ease-out, transform 300ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="grid w-full grid-cols-1 items-end gap-6 text-white md:grid-cols-2 md:gap-10">
            <p className="max-w-[40ch] text-left text-2xl font-semibold leading-tight text-white/95 md:text-5xl">
              Experience the finest layers, crafted with fresh ingredients for a delightful taste. Perfect for breakfast, a snack, or any occasion.
            </p>

            <ul className="justify-self-end self-end text-right grid grid-cols-3 gap-4 text-white/90 md:grid-cols-1 md:gap-4">
              {[
                { value: "100+", label: "Flavours" },
                { value: "50+", label: "Partner Stores" },
                { value: "15k+", label: "Happy Customers" },
              ].map((s) => (
                <li key={s.label}>
                  <div className="text-3xl font-semibold md:text-5xl">{s.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-white/70 md:text-sm">
                    {s.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}


