"use client";

import Link from "next/link";
import { Artwork } from "@/components/artwork";
import { Stamp } from "@/components/stamp";
import type { Artwork as ArtworkType, ArtistProfile } from "@/types";

type Props = {
  profile: ArtistProfile;
  artworks: ArtworkType[];
};

const VARIANTS = [
  "sunburst",
  "stripes",
  "checker",
  "halftone",
  "blocks",
  "bars",
  "sun",
  "grid",
  "tri",
] as const;

const COLORS = ["acid", "riot", "electric", "signal"] as const;

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function ArtistPageClient({ profile, artworks }: Props) {
  const color = COLORS[hashId(profile.id) % COLORS.length];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Profile header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
        <div
          className={`flex h-20 w-20 flex-shrink-0 items-center justify-center border-2 border-ink bg-${color}`}
        >
          <span className="font-display text-3xl uppercase leading-none tracking-tight">
            {initials(profile.display_name)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-4xl uppercase leading-[0.85] tracking-tight sm:text-5xl">
              {profile.display_name}
            </h1>
            <Stamp tone="acid" rotate={-3}>
              On the wall
            </Stamp>
          </div>
          {profile.bio && (
            <p className="max-w-lg text-base leading-relaxed text-ink/80">
              {profile.bio}
            </p>
          )}
          <p className="font-mono text-xs uppercase tracking-wider text-ink/60">
            @{profile.username}
          </p>
        </div>
      </div>

      {/* Portfolio grid */}
      <div className="mt-10">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-tight">
          Portfolio
          <span className="ml-2 font-mono text-sm text-ink/60">
            ({artworks.length} {artworks.length === 1 ? "piece" : "pieces"})
          </span>
        </h2>

        {artworks.length === 0 ? (
          <div className="flex flex-col items-center border-2 border-ink bg-paper py-16 text-center shadow-hard">
            <Stamp tone="riot" rotate={-4}>
              Empty studio
            </Stamp>
            <p className="mt-4 font-display text-2xl uppercase tracking-tight">
              No work uploaded yet
            </p>
            <p className="mt-2 max-w-sm text-sm text-ink/70">
              This artist hasn&apos;t added anything to their portfolio. Check
              back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {artworks.map((artwork) => {
              const variant = VARIANTS[hashId(artwork.id) % VARIANTS.length];
              return (
                <Link
                  key={artwork.id}
                  href={`/product/${artwork.id}`}
                  className="card-hover group flex h-full flex-col border-2 border-ink bg-paper shadow-hard"
                >
                  <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink">
                    {artwork.primary_media_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={artwork.primary_media_url}
                        alt={artwork.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Artwork variant={variant} />
                    )}
                    {artwork.status === "sold" && (
                      <Stamp
                        tone="signal"
                        className="absolute left-2 top-2 z-10"
                      >
                        Sold out
                      </Stamp>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 p-3">
                    <h3 className="font-display text-lg uppercase leading-none tracking-tight">
                      {artwork.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-ink/70">
                      {artwork.art_type}
                      {artwork.price != null && ` · $${artwork.price}`}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
