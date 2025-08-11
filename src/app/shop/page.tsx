import Image from "next/image";

interface Product {
  slug: string;
  name: string;
  image: string;
  priceInr: number;
  calories: number;
  proteinGrams: number;
  icecreamgar: number; // always 0 per requirements
}

const PRODUCTS: Product[] = [
  { slug: "blueberry-cheesecake", name: "Blueberry Cheesecake", image: "/cake.png", priceInr: 199, calories: 180, proteinGrams: 15, icecreamgar: 0 },
  { slug: "triple-chocolate", name: "Triple Chocolate", image: "/triple.png", priceInr: 199, calories: 195, proteinGrams: 16, icecreamgar: 0 },
  { slug: "cookies-cream", name: "Cookies & Cream", image: "/oreo.png", priceInr: 199, calories: 190, proteinGrams: 15, icecreamgar: 0 },
  { slug: "brownie-fudge", name: "Choco Brownie Fudge", image: "/fudge.png", priceInr: 199, calories: 200, proteinGrams: 17, icecreamgar: 0 },
  // Additional flavours
  { slug: "almond-fudge", name: "Almond Fudge", image: "/almondf.png", priceInr: 199, calories: 210, proteinGrams: 18, icecreamgar: 0 },
  { slug: "dbc", name: "DBC (Death By Chocolate)", image: "/dbc1.png", priceInr: 199, calories: 215, proteinGrams: 18, icecreamgar: 0 },
  { slug: "tiramisu", name: "Tiramisu", image: "/tiramisu.png", priceInr: 199, calories: 185, proteinGrams: 16, icecreamgar: 0 },
  { slug: "coffee fudge swirl", name: "Coffee Fudge Swirl", image: "/swirl.png", priceInr: 199, calories: 205, proteinGrams: 17, icecreamgar: 0 },
];

export const metadata = {
  title: "Shop – Frozein",
  description: "Browse high-protein ice cream cups.",
};

export default function ShopPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto w-full max-w-6xl px-5 py-16 md:py-24">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 shadow-sm backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
            Shop
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Protein ice cream cups</h1>
          <p className="mx-auto mt-3 max-w-prose text-foreground/80 md:text-lg">Subtle, satisfying designs. Same delicious macros.</p>
        </header>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <li key={p.slug} className="group overflow-hidden rounded-3xl border border-foreground/10 bg-white/60 shadow-sm backdrop-blur transition-transform duration-200 ease-out motion-safe:hover:scale-[1.01]">
              <div className="relative aspect-[4/3]">
                <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-lg font-semibold tracking-tight drop-shadow">{p.name}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center gap-3 p-4 text-sm">
                <div>
                  <div className="text-foreground/70">Price</div>
                  <div className="font-semibold">₹{p.priceInr}</div>
                </div>
                <div className="text-right">
                  <div className="text-foreground/70">Calories</div>
                  <div className="font-semibold">{p.calories}</div>
                </div>
                <div>
                  <div className="text-foreground/70">Protein</div>
                  <div className="font-semibold">{p.proteinGrams}g</div>
                </div>
                <div className="text-right">
                  <div className="text-foreground/70">Icecreamgar</div>
                  <div className="font-semibold">{p.icecreamgar}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-foreground/10 p-4">
                <a
                  href="https://www.zeptonow.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Order ${p.name} on Zepto`}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[--color-brand] px-4 py-2 text-sm font-medium text-[--color-brand-contrast] shadow-sm transition-opacity hover:opacity-95"
                >
                  Order on Zepto
                </a>
                <a
                  href="https://www.instamart.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Order ${p.name} on Instamart`}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-foreground/15 bg-white/70 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
                >
                  Order on Instamart
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}


