/**
 * AI Discovery Service API module.
 *
 * Handles standard search and AI-powered "vibe" search.
 */

import { apiFetch } from "@/lib/api";
import type { PaginatedResponse, SearchResult } from "@/types";

export const discoveryApi = {
  /** Standard keyword search. */
  search(
    query: string,
    params: Record<string, string | number> = {},
  ): Promise<PaginatedResponse<SearchResult>> {
    const searchParams = new URLSearchParams({
      q: query,
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)]),
      ),
    }).toString();
    return apiFetch<PaginatedResponse<SearchResult>>(
      "aiDiscovery",
      `/search?${searchParams}`,
    );
  },

  /** AI-powered semantic "vibe" search. */
  vibeSearch(
    query: string,
    params: Record<string, string | number> = {},
  ): Promise<PaginatedResponse<SearchResult>> {
    const searchParams = new URLSearchParams({
      q: query,
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)]),
      ),
    }).toString();
    return apiFetch<PaginatedResponse<SearchResult>>(
      "aiDiscovery",
      `/search/vibe?${searchParams}`,
    );
  },
};
