import type { CSSProperties, ReactNode } from "react";

export interface GlassCardProps {
  as?: keyof React.JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
  hover?: boolean;
  highlight?: boolean;
  style?: CSSProperties;
}

function joinClassNames(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function GlassCard(props: GlassCardProps) {
  const { as = "div", children, className, hover = true, highlight = true, style } = props;
  const Tag: keyof React.JSX.IntrinsicElements = as;

  const base = joinClassNames(
    "relative overflow-hidden rounded-3xl",
    // Border and subtle ring for definition
    "border border-white/20 ring-1 ring-inset ring-black/5",
    // Translucent, frosted backdrop
    "bg-white/10 backdrop-blur-xl",
    // Gentle depth
    "shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_10px_30px_rgba(0,0,0,0.08)]",
    hover ? "transition-transform duration-200 hover:translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_16px_40px_rgba(0,0,0,0.12)]" : undefined,
    className,
  );

  return (
    <Tag className={base} style={style}>
      {highlight ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* Soft top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/30 to-transparent" />
          {/* Ambient tint */}
          <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-[var(--color-brand)]/10 blur-2xl" />
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </Tag>
  );
}


