"use client";

import { useEffect, useMemo, useState } from "react";

export interface StickyOrderDockProps {
  zeptoHref?: string;
  swiggyHref?: string;
}

export function StickyOrderDock(props: StickyOrderDockProps) {
  const { zeptoHref = "https://www.zeptonow.com/", swiggyHref = "https://www.swiggy.com/" } = props;
  const [isVisible, setIsVisible] = useState(false);
  const revealThreshold = useMemo(() => 0.25, []); // 25% scroll

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY || document.documentElement.scrollTop || 0;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? scrolled / docHeight : 0;
        const next = progress >= revealThreshold && scrolled > 10;
        setIsVisible((prev) => (prev === next ? prev : next));
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealThreshold]);

  return (
    <div
      aria-hidden={!isVisible}
      className={[
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-3",
        "transition-[transform,opacity] duration-200 ease-out will-change-transform",
        "motion-safe:data-[visible=false]:translate-y-6 data-[visible=false]:opacity-0",
        "data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100",
      ].join(" ")}
      data-visible={isVisible}
    >
      <div className="pointer-events-auto mx-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-foreground/10 bg-[--color-background]/95 p-3 shadow-lg backdrop-blur-md md:max-w-xl">
        <a
          href={zeptoHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full bg-foreground px-4 py-3 text-center text-sm font-medium text-background transition-[transform,opacity] duration-200 ease-out active:opacity-90 motion-safe:hover:scale-[1.02] motion-safe:active:scale-95"
        >
          Order on Zepto
        </a>
        <a
          href={swiggyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-foreground/20 bg-background px-4 py-3 text-center text-sm font-medium text-foreground shadow-sm transition-[transform,opacity] duration-200 ease-out active:opacity-90 motion-safe:hover:scale-[1.02] motion-safe:active:scale-95"
        >
          Order on Swiggy
        </a>
      </div>
    </div>
  );
}


