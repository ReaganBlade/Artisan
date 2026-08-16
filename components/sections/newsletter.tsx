import { NewsletterForm } from "../newsletter-form";

export function Newsletter() {
  return (
    <section id="newsletter" className="border-b-2 border-ink bg-acid">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
            07 — Stay in the loop
          </p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
            Get the wall, weekly.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed sm:text-base">
            One email a week. New drops, artist interviews, and the occasional
            hot take. No spam — unsubscribe anytime, we mean it.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
