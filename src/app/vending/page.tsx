interface VendingLocation {
  id: string;
  name: string;
  address: string;
  hours: string;
  notes?: string;
}

const LOCATIONS: VendingLocation[] = [
  { id: "indiranagar", name: "Indiranagar Station", address: "12th Main Rd, Indiranagar, Bengaluru", hours: "6:00 AM – 11:00 PM", notes: "Near Gate 2" },
  { id: "koramangala", name: "Koramangala Forum", address: "Forum Mall, Koramangala, Bengaluru", hours: "10:00 AM – 10:00 PM" },
  { id: "hsr", name: "HSR BDA Complex", address: "27th Main Rd, HSR Layout, Bengaluru", hours: "7:00 AM – 10:00 PM" },
];

export const metadata = {
  title: "Vending Machines – Frozien",
  description: "Find vending machines near you and learn how to use them.",
};

export default function VendingPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative">
        {/* Soft hero banner */}
        <div className="relative mx-auto w-full max-w-6xl px-5 pt-20 md:pt-28">
          <div className="rounded-3xl border border-foreground/10 bg-white/60 p-6 text-center shadow-sm backdrop-blur md:p-10">
            <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
              Vending
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Find a vending machine</h1>
            <p className="mx-auto mt-3 max-w-prose text-foreground/80 md:text-lg">Grab your protein ice cream on the go. Locations are static for now.</p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
          <div className="grid items-start gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
            {/* Locations list */}
            <div className="space-y-4">
              {LOCATIONS.map((loc) => (
                <div key={loc.id} className="rounded-2xl border border-foreground/10 bg-white/60 p-5 shadow-sm backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold tracking-tight">{loc.name}</div>
                      <div className="mt-1 text-sm text-foreground/70">{loc.address}</div>
                      <div className="mt-1 text-sm text-foreground/70">Hours: {loc.hours}</div>
                      {loc.notes ? <div className="mt-1 text-xs text-foreground/60">{loc.notes}</div> : null}
                    </div>
                    <a href="/shop" className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white/70 px-3 py-1.5 text-xs font-medium text-foreground/90 shadow-sm backdrop-blur hover:bg-white">View flavours</a>
                  </div>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="rounded-3xl border border-foreground/10 bg-white/60 p-6 shadow-sm backdrop-blur md:p-7">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">How it works</div>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-foreground/80">
                <li>Select your flavour on the screen.</li>
                <li>Scan the QR to pay (UPI, cards, or wallets supported).</li>
                <li>Collect your cup when the door unlocks.</li>
                <li>Enjoy chilled, protein‑packed dessert.</li>
              </ol>

              <div className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Payment options</div>
              <ul className="mt-2 grid gap-2 text-sm text-foreground/80">
                <li>UPI (PhonePe, GPay, Paytm)</li>
                <li>Credit/Debit Cards</li>
                <li>Popular Wallets</li>
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/70 px-4 py-1.5 text-xs font-medium text-foreground/85 shadow-sm backdrop-blur">
                Safe • 24/7 • Cashless
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


