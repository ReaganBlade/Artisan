import { ArtistCard } from "../artist-card";
import { SectionHeading } from "../section-heading";
import { fetchArtists } from "@/lib/catalog";

export async function Artists() {
  const artists = await fetchArtists();

  return (
    <section id="artists" className="border-b-2 border-ink bg-acid">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          kicker="02 — Meet the artists"
          title="The scene"
          note="3,400+ more inside"
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink/70">
          Every artist is vetted by a human. That&apos;s the only gate.
        </p>
      </div>
    </section>
  );
}
