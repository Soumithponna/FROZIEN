export const metadata = {
  title: "About – Frozien",
  description: "Our purpose, principles, and the people behind Frozien.",
};

export default function AboutPage() {
  const principles = [
    { title: "Protein-first", desc: "Every cup starts with macros that make sense." },
    { title: "Beautifully Layered", desc: "Nutrition should look as good as it tastes." },
    { title: "Plant-forward", desc: "Vegan and dairy-free options that don’t compromise." },
  ];

  return (
    <main className="bg-background text-foreground">
      {/* Hero stripe */}
      <section className="relative">
        <div className="mx-auto w-full max-w-6xl px-5 pt-20 md:pt-28">
          <div className="rounded-3xl border border-foreground/10 bg-white/60 p-6 text-center shadow-sm backdrop-blur md:p-10">
            <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
              About
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Why we build Frozien</h1>
            <p className="mx-auto mt-3 max-w-prose text-foreground/80 md:text-lg">We’re on a mission to make protein simple, beautiful, and crave‑worthy.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
        <div className="grid items-start gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
          <div className="space-y-4">
            <p className="text-foreground/80 md:text-lg">
              Frozien started with a simple idea: dessert can be functional. We craft
              protein ice cream that fits busy lives without giving up on taste or design.
            </p>
            <p className="text-foreground/80 md:text-lg">
              Our cups are transparent for a reason — we obsess over layers, textures,
              and ingredients you can see.
            </p>
            <div className="rounded-3xl border border-foreground/10 bg-white/60 p-5 shadow-sm backdrop-blur">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Principles</div>
              <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {principles.map((p, idx) => (
                  <li key={p.title} className="rounded-2xl border border-foreground/10 bg-[--color-background] p-4 shadow-sm">
                    <div className="text-sm font-semibold text-foreground/85">{p.title}</div>
                    <div className="mt-1 text-sm text-foreground/70">{p.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-foreground/10 bg-white/60 p-6 text-sm text-foreground/80 shadow-sm backdrop-blur md:p-7">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Press & Mentions</div>
            <ul className="mt-3 grid gap-2">
              <li>Featured on local startup showcases</li>
              <li>Praised by early customers for satiety and taste</li>
              <li>Design community shout-outs for transparent cups</li>
            </ul>
            <div className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Contact</div>
            <ul className="mt-2 grid gap-2">
              <li>Email: hello@frozien.com</li>
              <li>Instagram: @frozien</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}


