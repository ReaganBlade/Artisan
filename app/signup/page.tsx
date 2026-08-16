import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Stamp } from "@/components/stamp";
import { SignUpForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Join UNSIGNED — Pick your side",
  description:
    "Join UNSIGNED as a collector or an artist. Buy direct from indie artists, or sell your own work and keep 85%.",
};

export default function SignUpPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <p className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
            <Stamp tone="acid" rotate={-3}>
              No gatekeepers
            </Stamp>
            Join unsigned
          </p>
          <h1 className="mt-5 font-display text-6xl uppercase leading-[0.85] tracking-tight sm:text-7xl">
            Pick your side.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed sm:text-lg">
            Two doors in, no wrong answer — you can be both. Collectors get the
            wall. Artists get the 85%.
          </p>

          <SignUpForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
