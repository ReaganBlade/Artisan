"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Artwork } from "@/components/artwork";
import { Stamp } from "@/components/stamp";
import { SectionHeading } from "../section-heading";
import { useSession } from "@/lib/auth";
import { personalizationApi } from "@/lib/api/personalization";
import { mediaApi } from "@/lib/api/media";
import type { Artwork as ArtworkType } from "@/types";

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

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Personalized feed section.
 *
 * Fetches artwork IDs from the Personalization Engine, then hydrates
 * each ID through the Media Service. Falls back silently if the
 * personalization service is unavailable.
 */
export function PersonalizedFeed() {
  const { status, user } = useSession();
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated" || !user) return;

    let cancelled = false;

    async function fetchFeed() {
      try {
        // Step 1: Get personalized artwork IDs
        const feed = await personalizationApi.getFeed(user!.id);
        if (!feed.artwork_ids?.length || cancelled) return;

        // Step 2: Hydrate IDs through Media Service
        // Fetch each artwork individually (batch endpoint not available)
        const hydrated = await Promise.allSettled(
          feed.artwork_ids.slice(0, 8).map((id) => mediaApi.getArtwork(id)),
        );

        if (cancelled) return;

        // Step 3: Collect successful results, preserve order, handle partial failures
        const valid = hydrated
          .filter(
            (r): r is PromiseFulfilledResult<ArtworkType> =>
              r.status === "fulfilled",
          )
          .map((r) => r.value)
          .filter((a) => a.status === "active");

        setArtworks(valid);
      } catch {
        // Personalization service unavailable — section simply doesn't render
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFeed();
    return () => {
      cancelled = true;
    };
  }, [status, user]);

  // Don't render anything if not authenticated or no results
  if (status !== "authenticated" || (!loading && artworks.length === 0)) {
    return null;
  }

  return (
    <section className="border-b-2 border-ink bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex items-center gap-3">
          <SectionHeading
            kicker="For you"
            title="Your feed"
            note="Based on your activity"
          />
          <Stamp tone="acid" rotate={-3}>
            Personalized
          </Stamp>
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse border-2 border-paper/20 bg-paper/5"
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {artworks.map((artwork) => {
              const variant =
                VARIANTS[hashId(artwork.id) % VARIANTS.length];
              return (
                <Link
                  key={artwork.id}
                  href={`/product/${artwork.id}`}
                  className="card-hover group flex h-full flex-col border-2 border-paper/20 bg-paper/5 shadow-hard"
                >
                  <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-paper/20">
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
                    <h3 className="font-display text-lg uppercase leading-none tracking-tight text-paper">
                      {artwork.title}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-paper/60">
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
    </section>
  );
}
