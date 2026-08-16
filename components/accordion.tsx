"use client";

import { useState } from "react";
import { cn } from "./cn";

export function Accordion({
  items,
}: {
  items: Array<{ q: string; a: string }>;
}) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="border-2 border-ink bg-paper shadow-hard">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn("border-ink", i > 0 && "border-t-2")}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className={cn(
                  "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors duration-100 sm:px-5",
                  isOpen ? "bg-acid" : "bg-paper hover:bg-riot/15",
                )}
              >
                <span className="font-mono text-xs font-bold tracking-widest text-ink/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-xl uppercase leading-none tracking-tight sm:text-2xl">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-2xl font-bold leading-none"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
              className="border-t-2 border-ink bg-paper px-5 py-4 sm:px-6"
            >
              <p className="max-w-2xl text-sm leading-relaxed sm:text-base">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
