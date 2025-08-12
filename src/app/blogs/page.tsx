import Image from "next/image";
import { BLOG_POSTS } from "./posts";
import { GlassCard } from "@/components/shared/glass-card";

export const metadata = {
  title: "FROZEIN Blog | Healthy Dessert Tips & Nutrition Insights",
  description: "Explore FROZEIN’s blog for health tips, nutrition trends, and ice cream updates.",
};

export default function BlogsPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto w-full max-w-6xl px-5 py-16 md:py-24">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 shadow-sm backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
            Blog
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Notes from the Freezer</h1>
          <p className="mx-auto mt-3 max-w-prose text-foreground/80 md:text-lg">Design, nutrition, and everything we’re learning building protein ice cream.</p>
        </header>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <GlassCard key={post.slug} as="li" className="group overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-lg font-semibold tracking-tight drop-shadow">{post.title}</div>
                </div>
              </div>
              <div className="space-y-3 p-4 text-sm">
                <div className="text-foreground/60">{new Date(post.date).toLocaleDateString()}</div>
                <p className="text-foreground/80">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span key={t} className="inline-flex items-center rounded-full border border-white/15 bg-white/30 px-2.5 py-1 text-xs text-foreground/80 backdrop-blur">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/20 p-4 text-sm">
                <a href={`/blogs/${post.slug}`} className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/30 px-3 py-1.5 font-medium text-foreground/90 shadow-sm backdrop-blur transition-colors hover:bg-white/40">Read</a>
                <a href="/shop" className="text-foreground/70 hover:text-foreground">Shop →</a>
              </div>
            </GlassCard>
          ))}
        </ul>
      </section>
    </main>
  );
}


