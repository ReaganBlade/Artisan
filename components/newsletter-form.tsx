"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="border-2 border-ink bg-paper px-5 py-4 font-display text-2xl uppercase leading-none tracking-tight shadow-hard-sm">
        Got it. Check your inbox.
        <span className="mt-1 block font-mono text-xs font-bold uppercase tracking-widest text-ink/60">
          First issue lands Friday. No spam, ever.
        </span>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus("idle");
        }}
        placeholder="you@somewhere.com"
        aria-invalid={status === "error"}
        aria-describedby={status === "error" ? "newsletter-error" : undefined}
        className={`w-full flex-1 border-2 border-ink bg-paper px-4 py-3 font-mono text-sm outline-none transition-colors duration-100 placeholder:text-ink/40 ${
          status === "error"
            ? "border-signal shadow-[2px_2px_0_0_var(--signal-orange)]"
            : "shadow-hard-sm focus:border-electric focus:shadow-[2px_2px_0_0_var(--electric)]"
        }`}
      />
      <button
        type="submit"
        className="border-2 border-ink bg-ink px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-paper shadow-hard transition-[transform,box-shadow,background-color] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-electric hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
      >
        Sign me up
      </button>
      {status === "error" && (
        <p id="newsletter-error" className="w-full font-mono text-xs font-bold text-ink sm:hidden">
          That email won&apos;t reach you. Check it and try again.
        </p>
      )}
    </form>
  );
}
