import { SectionHeading } from "../section-heading";
import { categories } from "../data";
import { cn } from "../cn";

export function Categories() {
  return (
    <section id="categories" className="border-b-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          dark
          kicker="03 — Browse by medium"
          title="Find your obsession"
          note="Every medium, no filter"
        />

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className={cn(
                "card-hover group relative flex aspect-[4/3] flex-col justify-between border-2 border-ink p-4 text-ink shadow-hard sm:p-5",
                cat.color,
              )}
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink/70">
                {cat.count}
              </span>
              <span className="font-display text-3xl uppercase leading-none tracking-tight sm:text-4xl">
                {cat.name}
              </span>
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 font-mono text-xl font-bold transition-transform duration-100 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
