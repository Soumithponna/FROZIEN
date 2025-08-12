import { GlassCard } from "@/components/shared/glass-card";
interface VendingLocation {
  id: string;
  name: string;
  address: string;
  hours: string;
  notes?: string;
}

interface MapPoint {
  id: VendingLocation["id"];
  topPercent: number;
  leftPercent: number;
}

const LOCATIONS: VendingLocation[] = [
  { id: "indiranagar", name: "Indiranagar Station", address: "12th Main Rd, Indiranagar, Bengaluru", hours: "6:00 AM – 11:00 PM", notes: "Near Gate 2" },
  { id: "koramangala", name: "Koramangala Forum", address: "Forum Mall, Koramangala, Bengaluru", hours: "10:00 AM – 10:00 PM" },
  { id: "hsr", name: "HSR BDA Complex", address: "27th Main Rd, HSR Layout, Bengaluru", hours: "7:00 AM – 10:00 PM" },
];

// Approximate placements for a playful map card (not a real map)
const MAP_POINTS: MapPoint[] = [
  { id: "indiranagar", topPercent: 28, leftPercent: 62 },
  { id: "koramangala", topPercent: 58, leftPercent: 48 },
  { id: "hsr", topPercent: 66, leftPercent: 72 },
];

export const metadata = {
  title: "Find FROZEIN Vending Machines Near You",
  description: "Locate FROZEIN vending machines and enjoy our high-protein, no sugar ice cream.",
};

export default function VendingPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,_rgba(255,255,255,0.8),_rgba(255,255,255,0.35),_rgba(255,255,255,0.8))]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-5 pt-20 md:pt-28">
          <div className="p-6 md:p-10">
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 shadow-sm">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
                Vending
              </span>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Find a Frozein vending machine</h1>
                <p className="mx-auto mt-3 max-w-2xl text-foreground/80 md:text-lg">Protein ice cream, on your route. Tap to pay, pick up, and go — in under a minute.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="#locations" className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-[--color-background] px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm hover:bg-white">
                  See locations
                </a>
                <a href="/shop" className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white/80 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur hover:bg-white">
                  View flavours
                </a>
                <a href="mailto:hello@frozein.com?subject=Vending%20Machine%20Request" className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white/40 px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur hover:bg-white/60">
                  Request a machine
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map + list */}
        <div id="locations" className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
          <div className="grid items-start gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
            {/* Locations list */}
            <div className="space-y-4">
              {LOCATIONS.map((loc) => (
                <GlassCard key={loc.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold tracking-tight">{loc.name}</div>
                      <div className="mt-1 text-sm text-foreground/70">{loc.address}</div>
                      <div className="mt-1 text-sm text-foreground/70">Hours: {loc.hours}</div>
                      {loc.notes ? <div className="mt-1 text-xs text-foreground/60">{loc.notes}</div> : null}
                    </div>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/30 px-3 py-1.5 text-xs font-medium text-foreground/90 shadow-sm backdrop-blur hover:bg-white/40">
                      Directions
                    </a>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Playful map card */}
            <GlassCard className="p-0" hover={false}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.06),transparent_35%)]" />
              <div className="relative aspect-[4/3] w-full">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
                {MAP_POINTS.map((pt) => {
                  const loc = LOCATIONS.find((l) => l.id === pt.id);
                  if (!loc) return null;
                  return (
                    <div
                      key={pt.id}
                      className="group absolute"
                      style={{ top: `${pt.topPercent}%`, left: `${pt.leftPercent}%` }}
                    >
                      <div className="-translate-x-1/2 -translate-y-1/2 transform">
                        <div className="relative">
                          <span className="absolute inset-0 -z-10 rounded-full bg-[var(--color-brand)]/30 blur-md" />
                          <span className="inline-flex h-3.5 w-3.5 -translate-y-0.5 items-center justify-center rounded-full border-2 border-white bg-[var(--color-brand)] shadow ring-1 ring-black/5" />
                        </div>
                        <div className="mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-foreground/10 bg-white/90 px-2.5 py-1 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur opacity-0 transition-opacity group-hover:opacity-100">
                          {loc.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-white/20 p-4 text-center text-xs text-foreground/60">
                Not a real map — just a vibe. Tap a location above for directions.
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-12 md:pb-16">
        <GlassCard className="p-6 md:p-10">
          <div className="md:flex md:items-start md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
              <p className="mt-2 text-foreground/75">Cashless, clean, and quick. Your protein treat in four steps.</p>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/70 px-4 py-1.5 text-xs font-medium text-foreground/85 shadow-sm backdrop-blur md:mt-0">
              Safe • 24/7 • Cashless
            </div>
          </div>
          <ol className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              "Select your flavour on the screen.",
              "Scan the QR to pay (UPI, cards, or wallets).",
              "Door unlocks — collect your cup.",
              "Enjoy chilled, protein‑packed dessert.",
            ].map((text, i) => (
              <li key={i} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-foreground/80 shadow-sm backdrop-blur">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-foreground/15 bg-white/80 text-xs font-semibold text-foreground/80 shadow-sm">{i + 1}</span>
                <span className="ml-3 align-middle">{text}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
      </section>

      {/* FAQ + CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-20">
        <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-lg font-semibold tracking-tight">FAQs</h3>
            <div className="mt-4 space-y-4 text-sm text-foreground/80">
              <details className="group rounded-xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur" open>
                <summary className="cursor-pointer list-none font-medium">Can I pay with UPI?</summary>
                <p className="mt-2 text-foreground/70">Yes — PhonePe, GPay, Paytm and more. Cards and popular wallets are supported too.</p>
              </details>
              <details className="group rounded-xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur">
                <summary className="cursor-pointer list-none font-medium">Are the machines restocked daily?</summary>
                <p className="mt-2 text-foreground/70">We monitor inventory and restock frequently. Peak locations are checked multiple times a day.</p>
              </details>
            </div>
          </GlassCard>
          <GlassCard className="p-6 text-center md:p-8">
            <h3 className="text-lg font-semibold tracking-tight">Want Frozein at your workplace?</h3>
            <p className="mt-2 text-sm text-foreground/75">We partner with offices, gyms, and campuses. It takes less than a week to set up.</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a href="mailto:hello@frozein.com?subject=Vending%20Machine%20Request" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/20 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur hover:bg-white/30">Request a machine</a>
              <a href="/shop" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/30 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur hover:bg-white/40">View flavours</a>
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}


