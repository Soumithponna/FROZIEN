import Image from "next/image";
import { findPostBySlug, getAllBlogSlugs } from "../posts";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPostBySlug(slug);
  if (!post) return { title: "Blog – Frozien" };
  return { title: `${post.title} – Frozien`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPostBySlug(slug);
  if (!post) {
    return (
      <main className="bg-background text-foreground">
        <section className="mx-auto w-full max-w-6xl px-5 py-16 md:py-24">
          <h1 className="text-3xl font-semibold">Post not found</h1>
          <p className="mt-2 text-foreground/70">The blog you’re looking for doesn’t exist.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 shadow-sm backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
            Blog
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
          <div className="mt-2 text-sm text-foreground/60">{new Date(post.date).toLocaleDateString()}</div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {post.tags.map((t) => (
              <span key={t} className="inline-flex items-center rounded-full border border-foreground/10 bg-white/70 px-2.5 py-1 text-xs text-foreground/80 backdrop-blur">
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-foreground/10 bg-white/60 shadow-sm backdrop-blur">
          <Image src={post.image} alt={post.title} fill sizes="100vw" className="object-cover" />
        </div>

        <div className="prose prose-neutral mx-auto mt-8 max-w-none prose-p:my-4">
          {post.content.map((para, idx) => (
            <p key={idx} className="text-foreground/85 md:text-lg">{para}</p>
          ))}
        </div>

        <footer className="mt-10 flex items-center justify-between">
          <a href="/blogs" className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white/70 px-3 py-1.5 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur transition-colors hover:bg-white">← Back to Blog</a>
          <a href="/shop" className="text-sm text-foreground/70 hover:text-foreground">Shop →</a>
        </footer>
      </article>
    </main>
  );
}


