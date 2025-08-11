"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/shared/motion";
import Link from "next/link";

export function Navbar() {
  const reduced = usePrefersReducedMotion();
  const [isSolid, setIsSolid] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const solid = window.scrollY > 40;
        setIsSolid(solid);
        rafRef.current && cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={[
            "mt-3 flex h-12 items-center justify-between gap-3 rounded-full border px-3",
            "backdrop-blur-md transition-[background-color,border-color,color,transform,opacity] duration-200 ease-out",
            isSolid
              ? "bg-[color:oklch(98.7%_0.022_95.277)/.92] border-foreground/10 text-[--color-foreground] shadow"
              : "bg-white/70 border-foreground/10 text-[--color-foreground] shadow-sm",
          ].join(" ")}
          style={{
            transitionDuration: reduced ? "1ms" : undefined,
          }}
          aria-label="Primary"
        >
          <Link
            href="/"
            className="select-none font-semibold tracking-tight"
            onClick={e => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            FROZIEN
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#flavours" className="hover:opacity-80 transition-opacity">Flavours</a>
            <a href="/shop" className="hover:opacity-80 transition-opacity">Shop</a>
            <a href="/vending" className="hover:opacity-80 transition-opacity">Vending</a>
            <a href="/blogs" className="hover:opacity-80 transition-opacity">Blogs</a>
            <a href="/about" className="hover:opacity-80 transition-opacity">About</a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.zeptonow.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center rounded-full bg-[--color-brand] px-4 py-1.5 text-sm font-medium text-[--color-brand-contrast] shadow-sm hover:opacity-95 transition-opacity"
            >
              Order
            </a>
            <a
              href="#flavours"
              className="md:hidden inline-flex items-center justify-center rounded-full border border-foreground/15 px-3 py-1.5 text-sm text-[--color-foreground]"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}



