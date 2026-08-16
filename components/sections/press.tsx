import { press } from "../data";

export function Press() {
  return (
    <section aria-label="As seen in" className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.35em] text-ink/60">
          As seen in
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {press.map((name) => (
            <li
              key={name}
              className="font-display text-xl uppercase tracking-tight text-ink/60 transition-colors duration-100 hover:text-ink sm:text-2xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
