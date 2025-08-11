"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Flavor {
  slug: string;
  title: string;
  src: string;
  accentHex: string;
}

const FLAVOURS: Flavor[] = [
  { slug: "cake", title: "Blueberry Cheesecake", src: "/cake.png", accentHex: "#f4c7d9" },
  { slug: "triple", title: "Triple Chocolate", src: "/triple.png", accentHex: "#f7e0b9" },
  { slug: "oreo", title: "Cookies & Cream", src: "/oreo.png", accentHex: "#d6d6d6" },
  { slug: "fudge", title: "Choco Brownie Fudge", src: "/fudge.png", accentHex: "#b98d7a" },
];

export function Flavours() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const total = Math.max(rect.height - viewportH, 1);
        const offset = Math.min(Math.max(-rect.top, 0), total);
        const totalPanels = FLAVOURS.length + 1; // intro + flavours
        const index = Math.min(
          Math.max(Math.floor((offset + viewportH * 0.35) / viewportH), 0),
          totalPanels - 1
        );
        setActiveIndex(index);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section aria-label="Flavours" className="relative isolate">
      {/* Tall scroller equals intro + number of flavours times viewport height */}
      <div ref={containerRef} className="relative" style={{ height: `calc(${FLAVOURS.length + 1} * 100svh)` }}>
        <IntroPanel index={0} isActive={activeIndex === 0} />
        {FLAVOURS.map((flavour, index) => (
          <Panel key={flavour.slug} flavour={flavour} index={index + 1} isActive={index + 1 === activeIndex} />
        ))}
      </div>
    </section>
  );
}

interface PanelProps {
  flavour: Flavor;
  index: number;
  isActive: boolean;
}

function Panel(props: PanelProps) {
  const { flavour, index, isActive } = props;
  const isFirstFlavor = index === 1; // after intro panel
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.4);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-[100svh] w-full overflow-hidden will-change-transform"
      style={{ zIndex: 10 + index }}
    >
      <div
        className="relative h-full w-full"
        style={{
          opacity: isVisible || reduced ? 1 : 0.85,
          transform: reduced ? "none" : isVisible ? "translate3d(0,0,0) scale(1)" : "translate3d(0,16px,0) scale(0.995)",
          transition: reduced
            ? "opacity 0.001s linear"
            : "opacity 220ms ease-out, transform 220ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Soft backdrop then image and tints */}
        <div className="absolute inset-0 bg-[--color-background]" aria-hidden />
        <Image
          src={flavour.src}
          alt={`${flavour.title} background`}
          fill
          priority={isFirstFlavor}
          loading={isFirstFlavor ? "eager" : "lazy"}
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${flavour.accentHex}33, transparent 60%)` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" aria-hidden />

        {/* Overlay title */}
        <div
          className="absolute inset-0 flex items-center justify-center p-6 text-center"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 180ms ease-out, transform 200ms cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: isActive ? "auto" : "none",
          }}
          aria-hidden={!isActive}
        >
          <div>
            <span className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: flavour.accentHex }} />
              Flavour
            </span>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white drop-shadow md:text-6xl">
              {flavour.title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntroPanel({ index, isActive }: { index: number; isActive: boolean }) {
  return (
    <div className="sticky top-0 h-[100svh] w-full overflow-hidden" style={{ zIndex: 10 + index }}>
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-[--color-background]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.02] via-black/[0.03] to-black/[0.05]" aria-hidden />
        <div
          className="absolute inset-0 flex items-center justify-center p-6 text-center"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 180ms ease-out, transform 200ms cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: isActive ? "auto" : "none",
          }}
          aria-hidden={!isActive}
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-600">Explore</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Our Flavours</h2>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-neutral-700 md:text-lg">
              A vertical tasting journey. Scroll to reveal each immersive panel as the next flavour layers over the last.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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


