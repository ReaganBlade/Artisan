import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "./cn";

type Variant = "acid" | "paper" | "ink" | "riot" | "electric" | "signal";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 border-2 border-ink font-mono font-bold uppercase tracking-wider transition-[transform,box-shadow,background-color] duration-100 select-none cursor-pointer shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  acid: "bg-acid text-ink hover:bg-riot",
  paper: "bg-paper text-ink hover:bg-acid",
  ink: "bg-ink text-paper hover:bg-electric",
  riot: "bg-riot text-ink hover:bg-acid",
  electric: "bg-electric text-paper hover:bg-ink",
  signal: "bg-signal text-ink hover:bg-acid",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  variant = "acid",
  size = "md",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const anchorProps = rest as ComponentPropsWithoutRef<"a">;
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} className={cls} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
