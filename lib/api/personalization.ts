/**
 * Personalization Service API module.
 *
 * Handles the personalized feed and interaction logging.
 */

import { apiFetch } from "@/lib/api";
import type { PersonalizedFeed } from "@/types";

export const personalizationApi = {
  /** Fetch the personalized feed. Requires authentication. */
  getFeed(accessToken: string): Promise<PersonalizedFeed> {
    return apiFetch<PersonalizedFeed>(
      "personalization",
      "/feed/personalized",
      {},
      accessToken,
    );
  },

  /** Log an interaction (fire-and-forget). */
  logInteraction(
    artworkId: string,
    interactionType: "view" | "like" | "add_to_cart" | "purchase",
    accessToken?: string,
  ): void {
    // Fire and forget — failures should not block UI
    apiFetch(
      "personalization",
      "/interactions",
      {
        method: "POST",
        body: JSON.stringify({
          artwork_id: artworkId,
          interaction_type: interactionType,
        }),
      },
      accessToken,
    ).catch(() => {
      // Silently swallow — interaction logging is best-effort
    });
  },
};
