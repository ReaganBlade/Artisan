import { Artwork } from "../artwork";
import { Button } from "../button";
import { Stamp } from "../stamp";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-20">
        <div className="lg:col-span-7">
          <p className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
            <Stamp tone="riot" rotate={-3}>
              Est. 2026
            </Stamp>
            Marketplace for indie &amp; unknown artists
          </p>

          <h1 className="mt-6 font-display text-[15vw] uppercase leading-[0.85] tracking-tight sm:text-8xl lg:text-[7.5rem]">
            Art by people,
            <br />
            <span className="mr-2 inline-block -rotate-1 border-2 border-ink bg-acid px-3 text-ink shadow-hard-sm sm:mr-3">
              not platforms.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed sm:text-lg">
            Direct from the people who made it. 3,400+ artists, zero curatorial
            egos. Buy the piece, not the brand.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#just-dropped" size="lg">
              Browse the wall
            </Button>
            <Button href="/signup" variant="paper" size="lg">
              Sell your work
            </Button>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t-2 border-ink pt-6">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-ink/60">
                Artists on the wall
              </dt>
              <dd className="mt-1 font-display text-3xl uppercase leading-none tracking-tight">
                3,400+
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-ink/60">
                Goes to the artist
              </dt>
              <dd className="mt-1 font-display text-3xl uppercase leading-none tracking-tight">
                85%
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-ink/60">
                Pieces sold last week
              </dt>
              <dd className="mt-1 font-display text-3xl uppercase leading-none tracking-tight">
                212
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -top-3 left-1/2 z-10 h-7 w-32 -translate-x-1/2 -rotate-3 border-2 border-ink bg-acid/80 shadow-hard-sm"
            />
            <div className="card-hover relative -rotate-1 border-2 border-ink bg-paper shadow-hard">
              <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink">
                <Artwork variant="sunburst" />
                <Stamp tone="acid" className="absolute left-3 top-3 -rotate-6">
                  New
                </Stamp>
                <Stamp tone="ink" rotate={3} className="absolute bottom-3 right-3">
                  Ed. 12/25
                </Stamp>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-display text-xl uppercase leading-none tracking-tight">
                    Sunshower
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink/70">
                    Mara Villanueva · Screenprint
                  </p>
                </div>
                <p className="font-mono text-lg font-bold">$240</p>
              </div>
            </div>
            <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">
              Featured this week — from the studio floor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
