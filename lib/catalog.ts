/**
 * Catalog data layer — fetches artworks and artist profiles from the Media
 * Service (artisan-backend/services/media_service) and adapts its payloads to
 * the frontend's display types.
 *
 * If the backend is unreachable, every function falls back to the local
 * showcase data in `components/data.ts` so the site still renders.
 *
 * Used from server components (sections); keep this module free of browser
 * APIs so it stays server-safe.
 */

import { mediaApi } from "./api/media";
import { artworks as localArtworks, artists as localArtists } from "@/components/data";
import type { Artist, Artwork } from "@/components/data";
import type { ArtVariant } from "@/components/artwork";

// --- Backend payload shapes (mirror media_service dummy_data.py) -----------

export type ApiArtwork = {
  id: string;
  profile_id: string;
  title: string;
  description: string | null;
  art_type: string;
  price: number | null;
  status: string;
  primary_media_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ApiProfile = {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  cover_image_url: string | null;
  social_links: Record<string, string> | null;
  created_at: string;
  updated_at: string;
};

type Paginated<T> = { items: T[]; total: number; limit: number; offset: number };

// --- Deterministic decoration helpers --------------------------------------

const VARIANTS: ArtVariant[] = [
  "sunburst",
  "stripes",
  "checker",
  "halftone",
  "blocks",
  "bars",
  "sun",
  "grid",
  "tri",
];

const ARTIST_COLORS: Artist["color"][] = ["acid", "riot", "electric", "signal"];

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Map a backend artwork to the frontend display type. */
export function toArtwork(api: ApiArtwork, artistName: string): Artwork {
  const isNew =
    api.created_at &&
    Date.now() - Date.parse(api.created_at) < 30 * 24 * 60 * 60 * 1000;
  return {
    id: api.id,
    title: api.title,
    artist: artistName || "Artist",
    price: api.price ?? 0,
    medium: api.art_type,
    // The schema has no edition field yet — default to one-of-one until it does.
    edition: "1/1",
    isNew: isNew || undefined,
    isSold: api.status === "sold" ? true : undefined,
    art: VARIANTS[hashId(api.id) % VARIANTS.length],
  };
}

/** Map a backend profile to the frontend artist card type. */
export function toArtist(api: ApiProfile): Artist {
  const hash = hashId(api.id);
  return {
    id: api.id,
    name: api.display_name || api.username,
    bio: api.bio ?? "On the wall. Ask them about their process.",
    followers: 500 + (hash % 4000),
    sold: 10 + (hash % 90),
    color: ARTIST_COLORS[hash % ARTIST_COLORS.length],
  };
}

async function fetchArtworkList(
  params: Record<string, string | number> = {},
): Promise<ApiArtwork[]> {
  const page = await mediaApi.getArtworks(params);
  return page.items;
}

async function fetchProfileList(params: Record<string, string | number> = {}): Promise<ApiProfile[]> {
  const query = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  ).toString();
  // Profiles endpoint uses the same media service
  const { apiFetch } = await import("./api");
  const page = await apiFetch<Paginated<ApiProfile>>(
    "media",
    `/profiles${query ? `?${query}` : ""}`,
    { cache: "no-store" },
  );
  return page.items;
}

function warnFallback(source: string): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[catalog] Media Service unreachable — using local ${source} data.`);
  }
}

/**
 * Artworks for the wall/browse grids. Falls back to the local showcase data
 * when the backend is unavailable.
 */
export async function fetchArtworks(options: { limit?: number; status?: string } = {}): Promise<Artwork[]> {
  try {
    const [artworkItems, profileItems] = await Promise.all([
      fetchArtworkList({ limit: options.limit ?? 50, ...(options.status ? { status: options.status } : {}) }),
      fetchProfileList({ limit: 100 }),
    ]);
    const profileNames = new Map(profileItems.map((p) => [p.id, p.display_name]));
    return artworkItems.map((artwork) =>
      toArtwork(artwork, profileNames.get(artwork.profile_id) ?? ""),
    );
  } catch {
    warnFallback("artwork");
    return localArtworks;
  }
}

/** Artist profiles for the "scene" grid. Falls back to local data. */
export async function fetchArtists(options: { limit?: number } = {}): Promise<Artist[]> {
  try {
    const profiles = await fetchProfileList({ limit: options.limit ?? 50 });
    return profiles.map(toArtist);
  } catch {
    warnFallback("artist");
    return localArtists;
  }
}
