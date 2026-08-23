/**
 * Media Service API module.
 *
 * Handles artworks, profiles, and media files.
 */

import { apiFetch } from "@/lib/api";
import type {
  Artwork,
  ArtistProfile,
  MediaFile,
  PaginatedResponse,
} from "@/types";

export const mediaApi = {
  /** Fetch a single artwork by ID. */
  getArtwork(id: string): Promise<Artwork> {
    return apiFetch<Artwork>("media", `/artworks/${id}`);
  },

  /** Fetch artworks with optional filters. */
  getArtworks(
    params: Record<string, string | number> = {},
  ): Promise<PaginatedResponse<Artwork>> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)]),
    ).toString();
    return apiFetch<PaginatedResponse<Artwork>>(
      "media",
      `/artworks${query ? `?${query}` : ""}`,
    );
  },

  /** Fetch media files for an artwork. */
  getMediaFiles(artworkId: string): Promise<MediaFile[]> {
    return apiFetch<MediaFile[]>("media", `/artworks/${artworkId}/media`);
  },

  /** Fetch an artist profile by username. */
  getProfile(username: string): Promise<ArtistProfile> {
    return apiFetch<ArtistProfile>("media", `/profiles/${username}`);
  },

  /** Fetch artworks for a specific profile. */
  getProfileArtworks(
    profileId: string,
    params: Record<string, string | number> = {},
  ): Promise<PaginatedResponse<Artwork>> {
    const query = new URLSearchParams({
      profile_id: profileId,
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)]),
      ),
    }).toString();
    return apiFetch<PaginatedResponse<Artwork>>(
      "media",
      `/artworks?${query}`,
    );
  },
};
