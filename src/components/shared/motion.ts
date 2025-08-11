"use client";

import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion(): boolean {
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

export interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useRevealOnce<T extends HTMLElement>(options: RevealOptions = {}): {
  ref: React.RefObject<T | null>;
  isRevealed: boolean;
} {
  const { threshold = 0.15, rootMargin = "0px" } = options;
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isRevealed) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio > threshold) {
          setIsRevealed(true);
        }
      },
      { threshold: [threshold], rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isRevealed, threshold, rootMargin]);

  return { ref, isRevealed };
}


