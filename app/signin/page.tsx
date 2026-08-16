import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Stamp } from "@/components/stamp";
import { SignInForm } from "@/components/signin-form";

export const metadata: Metadata = {
  title: "Sign in — UNSIGNED",
  description: "Sign back in to UNSIGNED and get to the wall.",
};

export default function SignInPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-xl px-4 py-14 sm:px-6">
          <p className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
            <Stamp tone="riot" rotate={-3}>
              The wall misses you
            </Stamp>
            Welcome back
          </p>
          <h1 className="mt-5 font-display text-6xl uppercase leading-[0.85] tracking-tight sm:text-7xl">
            Sign in.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed sm:text-lg">
            Email, password, done. No captcha theater, no &quot;verify it&apos;s
            really you&quot; slideshows.
          </p>

          <div className="mt-10">
            <SignInForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
