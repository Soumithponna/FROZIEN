export const metadata = {
  title: "About – Frozein",
  description: "Our purpose, principles, and the people behind Frozein.",
};

import { GlassCard } from "@/components/shared/glass-card";


export default function AboutPage() {

  const principles = [
    { title: "Protein-first", desc: "Every cup starts with macros that make sense." },
    { title: "Beautifully Layered", desc: "Nutrition should look as good as it tastes." },
    { title: "Plant-forward", desc: "Vegan and dairy-free options that don’t compromise." },
  ];

  const milestones = [
    { year: "2025", title: "Prototype", desc: "First cups hand-filled in a home kitchen. Learned fast." },
    { year: "2026", title: "First machines", desc: "Launched vending in Bengaluru with three pilot spots." },
    { year: "2027", title: "Scaling", desc: "Expanding flavours, partners, and footprint." },
  ];

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,_rgba(255,255,255,0.8),_rgba(255,255,255,0.35),_rgba(255,255,255,0.8))]" />
        </div>
        <div className="mx-auto w-full max-w-6xl px-5 pt-20 md:pt-28">
          <div className="p-6 text-center md:p-10">
            <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
              About
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Protein, designed to be seen</h1>
            <p className="mx-auto mt-3 max-w-2xl text-foreground/80 md:text-lg">We craft layered, functional dessert that fits real life — with transparency in ingredients and design.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
        <div className="grid items-start gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
          <div className="space-y-4">
            <p className="text-foreground/80 md:text-lg">
              Frozein started with a simple idea: dessert can be functional. We craft
              protein ice cream that fits busy lives without giving up on taste or design.
            </p>
            <p className="text-foreground/80 md:text-lg">
              Our cups are transparent for a reason — we obsess over layers, textures,
              and ingredients you can see.
            </p>
            <GlassCard className="p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Principles</div>
              <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {principles.map((p) => (
                  <li key={p.title} className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur">
                    <div className="text-sm font-semibold text-foreground/85">{p.title}</div>
                    <div className="mt-1 text-sm text-foreground/70">{p.desc}</div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
          <GlassCard className="p-6 text-sm text-foreground/80 md:p-7">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Milestones</div>
            <ol className="mt-3 space-y-3">
              {milestones.map((m) => (
                <li key={m.year} className="relative rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur">
                  <div className="text-sm font-semibold text-foreground/85">{m.year} — {m.title}</div>
                  <div className="mt-1 text-foreground/70">{m.desc}</div>
                </li>
              ))}
            </ol>
            <div className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Press & Mentions</div>
            <ul className="mt-2 grid gap-2">
              <li>Featured on local startup showcases</li>
              <li>Praised by early customers for satiety and taste</li>
              <li>Design community shout-outs for transparent cups</li>
            </ul>
            <div className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">Contact</div>
            <ul className="mt-2 grid gap-2">
              <li>Email: hello@frozein.com</li>
              <li>Instagram: @frozein</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Team CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-20">
        <GlassCard className="p-6 text-center md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">Made by a small team who loves dessert</h2>
          <p className="mx-auto mt-2 max-w-prose text-foreground/75">We’re building with taste, science, and design. If that’s you too, say hi.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:hello@frozein.com" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/20 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur hover:bg-white/30">Email us</a>
            <a href="/blogs" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/30 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur hover:bg-white/40">Read our blog</a>
          </div>
        </GlassCard>
      </section>
    </main>
  );
}


