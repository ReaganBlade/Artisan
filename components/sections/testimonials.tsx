import { SectionHeading } from "../section-heading";
import { testimonials } from "../data";

export function Testimonials() {
  return (
    <section id="testimonials" className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          kicker="05 — The word"
          title="Collectors, saying things"
          note="4.8 average · 1,200+ reviews"
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="card-hover flex flex-col border-2 border-ink bg-paper p-4 shadow-hard"
            >
              <div
                aria-label={`${t.stars} out of 5 stars`}
                className="text-lg leading-none text-electric"
              >
                <span aria-hidden="true">
                  {"★".repeat(t.stars)}
                  {"☆".repeat(5 - t.stars)}
                </span>
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t-2 border-ink pt-3 font-mono text-[11px] uppercase tracking-wider">
                <span className="font-bold">{t.name}</span>
                <span className="text-ink/60"> — {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
