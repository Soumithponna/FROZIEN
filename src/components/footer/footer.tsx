import Image from "next/image";

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
            <Image src="/logo/logo.png" alt="Frozein" width={126} height={126} />
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
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-6 md:flex-row">
          <div className="text-center text-xs text-foreground/60 md:text-left">© {new Date().getFullYear()} Frozein. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/frozein"
              aria-label="Find us on Instagram"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-foreground/10 bg-white/60 p-2 shadow-sm backdrop-blur hover:bg-white/70"
            >
              {/* Instagram icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/frozein"
              aria-label="Find us on Twitter"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-foreground/10 bg-white/60 p-2 shadow-sm backdrop-blur hover:bg-white/70"
            >
              {/* Twitter (X) icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 4l7.5 9.5L4.5 20H7l5-5.5L16.5 20H20l-7.6-9.7L19.5 4H17L12.3 9.1 9 4H4z" fill="currentColor"/>
              </svg>
            </a>
            <a
              href="https://facebook.com/frozein"
              aria-label="Find us on Facebook"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-foreground/10 bg-white/60 p-2 shadow-sm backdrop-blur hover:bg-white/70"
            >
              {/* Facebook icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V12H8v3h2v5h3v-5h2.2l.8-3H13v-2c0-.6.4-1 1-1z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


