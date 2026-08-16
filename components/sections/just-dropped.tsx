import { ArtworkCard } from "../artwork-card";
import { Button } from "../button";
import { Stamp } from "../stamp";
import { SectionHeading } from "../section-heading";
import { fetchArtworks } from "@/lib/catalog";

const aspects = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
];

export async function JustDropped() {
  const artworks = await fetchArtworks({ status: "published" });
  const recent = artworks.slice(0, 5);

  return (
    <section id="just-dropped" className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          kicker="01 — Just dropped"
          title="New this week"
          note="Updated daily · 212 pieces"
        />

        <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {recent.map((artwork, i) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              aspect={aspects[i]}
              className="mb-5 break-inside-avoid"
            />
          ))}
        </div>

        <div className="mt-2 flex flex-col items-start justify-between gap-5 border-2 border-ink bg-acid px-5 py-6 shadow-hard sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-4">
            <Stamp tone="ink" rotate={-4}>
              Calling all artists
            </Stamp>
            <p className="font-display text-2xl uppercase leading-none tracking-tight sm:text-3xl">
              Want yours up here?
            </p>
          </div>
          <Button href="/signup" variant="ink" size="lg">
            Sell your work →
          </Button>
        </div>
      </div>
    </section>
  );
}
