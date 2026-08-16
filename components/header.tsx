"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import { cn } from "./cn";
import { useSession } from "@/lib/auth";

const navLinks = [
  { label: "Browse the wall", href: "/#just-dropped" },
  { label: "Artists", href: "/#artists" },
  { label: "Journal", href: "/#journal" },
  { label: "FAQ", href: "/#faq" },
];

function firstName(email: string): string {
  return email.split("@")[0] || email;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { status, user, signOut } = useSession();
  const signedIn = status === "authenticated" && user !== null;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-baseline gap-1.5 font-display text-2xl uppercase leading-none tracking-tight"
          onClick={() => setOpen(false)}
        >
          UNSIGNED
          <span className="align-super font-mono text-[10px] font-bold text-signal">
            ®
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs font-bold uppercase tracking-widest underline-offset-4 hover:underline hover:decoration-riot hover:decoration-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {signedIn ? (
            <>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70">
                Hi, {firstName(user!.email)}
              </span>
              <button
                type="button"
                onClick={() => void signOut()}
                className="font-mono text-xs font-bold uppercase tracking-widest underline-offset-4 hover:underline hover:decoration-electric hover:decoration-2"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="font-mono text-xs font-bold uppercase tracking-widest underline-offset-4 hover:underline hover:decoration-electric hover:decoration-2"
              >
                Sign in
              </Link>
              <Button href="/signup" size="sm">
                Join the wall
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border-2 border-ink bg-acid shadow-hard-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "h-0.5 w-5 bg-ink transition-transform duration-100",
              open && "translate-y-1 rotate-45",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-5 bg-ink transition-transform duration-100",
              open && "-translate-y-1 -rotate-45",
            )}
          />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t-2 border-ink bg-paper lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b-2 border-ink px-4 py-4 font-display text-xl uppercase tracking-tight hover:bg-acid"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 px-4 py-4">
              {signedIn ? (
                <>
                  <span className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm">
                    Hi, {firstName(user!.email)}
                  </span>
                  <button
                    type="button"
                    onClick={() => void signOut()}
                    className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-paper shadow-hard-sm"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Button
                    href="/signin"
                    variant="paper"
                    size="sm"
                    className="flex-1"
                  >
                    Sign in
                  </Button>
                  <Button href="/signup" size="sm" className="flex-1">
                    Join the wall
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
