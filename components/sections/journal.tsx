import { SectionHeading } from "../section-heading";
import { journal } from "../data";

export function Journal() {
  return (
    <section id="journal" className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          kicker="06 — From the studio"
          title="The journal"
          note="New every week"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {journal.map((post, i) => (
            <article
              key={post.id}
              className="card-hover group flex flex-col border-2 border-ink bg-paper p-5 shadow-hard"
            >
              <div className="flex items-baseline justify-between border-b-2 border-ink pb-3 font-mono text-[11px] uppercase tracking-widest text-ink/60">
                <span>No. {String(i + 1).padStart(2, "0")}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl uppercase leading-[0.95] tracking-tight">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <a
                href="#"
                className="mt-4 inline-flex w-fit items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest underline-offset-4 decoration-riot decoration-2 group-hover:underline"
              >
                Read the piece →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
