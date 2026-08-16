import type { ReactNode } from "react";
import { cn } from "./cn";

type Tone = "acid" | "riot" | "signal" | "electric" | "paper" | "ink";

const tones: Record<Tone, string> = {
  acid: "bg-acid text-ink",
  riot: "bg-riot text-ink",
  signal: "bg-signal text-ink",
  electric: "bg-electric text-paper",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
};

type StampProps = {
  children: ReactNode;
  tone?: Tone;
  rotate?: number;
  className?: string;
};

export function Stamp({
  children,
  tone = "paper",
  rotate = -6,
  className,
}: StampProps) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.15em] shadow-hard-sm",
        tones[tone],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
