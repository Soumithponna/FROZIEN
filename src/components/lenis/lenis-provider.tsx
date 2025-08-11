"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/shared/motion";

interface LenisLike {
  on?: (event: string, cb: (e?: unknown) => void) => void;
  raf: (time: number) => void;
  destroy: () => void;
}

interface LenisConstructorLike {
  new (options?: Record<string, unknown>): LenisLike;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef<LenisLike | null>(null);

  useEffect(() => {
    let mounted = true;
    if (reduced) return;

    async function setup() {
      try {
        const mod = (await import("lenis")) as unknown as { default: LenisConstructorLike };
        if (!mounted) return;
        const LenisCtor = mod.default;
        const lenis = new LenisCtor({
          autoRaf: true,
          anchors: { offset: 80 },
          smoothWheel: true,
          // keep default easing/lerp for natural feel
        });
        lenisRef.current = lenis;
      } catch {
        // lenis not installed or failed to load; silently no-op
      }
    }

    setup();
    return () => {
      mounted = false;
      lenisRef.current?.destroy?.();
      lenisRef.current = null;
    };
  }, [reduced]);

  return children as JSX.Element;
}



