export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterProps {
  links?: FooterLink[];
}

export function Footer(props: FooterProps) {
  const { links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/vending", label: "Vending" },
  ] } = props;

  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="text-lg font-semibold tracking-tight">FROZIEN</div>
            <div className="mt-1 text-sm text-foreground/70">Protein ice cream, designed to be seen.</div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/80">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="rounded-full border border-foreground/10 bg-white/60 px-3 py-1.5 shadow-sm backdrop-blur transition-colors hover:bg-white/70">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-6 border-t border-foreground/10 pt-6 text-center text-xs text-foreground/60">
          © {new Date().getFullYear()} Frozein. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


