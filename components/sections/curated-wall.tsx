import { Artwork } from "../artwork";
import { SectionHeading } from "../section-heading";
import type { ArtVariant } from "../artwork";

function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -top-2.5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 -rotate-2 border-2 border-ink bg-acid/80 shadow-hard-sm ${className}`}
    />
  );
}

function Piece({
  variant,
  aspect,
  title,
  price,
  rotate,
  className = "",
}: {
  variant: ArtVariant;
  aspect: string;
  title: string;
  price: string;
  rotate: string;
  className?: string;
}) {
  return (
    <figure className={`relative ${className}`}>
      <div
        className={`border-2 border-ink bg-paper shadow-hard-sm ${rotate}`}
      >
        <Artwork variant={variant} className={aspect} />
        <Tape />
        <figcaption className="flex items-center justify-between gap-2 border-t-2 border-ink bg-ink px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-paper">
          <span className="truncate">{title}</span>
          <span className="font-bold">{price}</span>
        </figcaption>
      </div>
    </figure>
  );
}

export function CuratedWall() {
  return (
    <section id="curated-wall" className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          kicker="04 — Curated wall"
          title="Loud, quiet"
          note="Wall no. 04 · 6 pieces, 3 artists"
        />

        {/* The room */}
        <div className="mt-8 flex flex-col border-2 border-ink bg-ink shadow-hard">
          {/* The wall */}
          <div className="m-3 border-2 border-ink bg-paper sm:m-5">
            <div className="grid grid-cols-2 gap-3 p-3 sm:gap-5 sm:p-5 lg:grid-cols-3">
              <Piece
                variant="sun"
                aspect="aspect-[4/5] sm:aspect-[3/4]"
                title="Parking Lot Sun"
                price="$320"
                rotate="rotate-[-1deg]"
                className="col-span-1 row-span-2"
              />
              <Piece
                variant="checker"
                aspect="aspect-square"
                title="Glass Teeth"
                price="$180"
                rotate="rotate-[1.5deg]"
                className="col-span-1"
              />
              <Piece
                variant="bars"
                aspect="aspect-[3/2] lg:aspect-[3/4]"
                title="Heavy Metal"
                price="$120"
                rotate="rotate-[-0.5deg]"
                className="col-span-1"
              />
              <div className="col-span-2 flex flex-col justify-between gap-4 border-2 border-ink bg-acid p-4 shadow-hard-sm sm:p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink/70">
                  6 pieces · 3 artists
                </p>
                <p className="font-display text-3xl uppercase leading-[0.9] tracking-tight sm:text-4xl">
                  Zero hanging fees.
                </p>
                <a
                  href="#"
                  className="inline-flex w-fit items-center gap-2 border-2 border-ink bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-paper shadow-hard-sm transition-[transform,box-shadow,background-color] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-electric hover:shadow-hard"
                >
                  See the full wall →
                </a>
              </div>
            </div>
          </div>

          {/* The floor */}
          <div className="relative flex h-14 items-center gap-4 border-t-2 border-paper/25 px-4 sm:px-6">
            <div
              aria-hidden="true"
              className="h-8 w-28 -rotate-2 border-2 border-ink bg-riot sm:w-36"
            />
            <p className="ml-auto font-mono text-[10px] uppercase tracking-widest text-paper/50 sm:text-xs">
              Hung by the Artisan crew
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
