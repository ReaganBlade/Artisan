/**
 * Commerce Service API module.
 *
 * Handles checkout flow. Cart state is managed client-side via cookies;
 * only the final checkout submission hits the backend.
 */

import { apiFetch } from "@/lib/api";
import type { CheckoutRequest, CheckoutResponse } from "@/types";

export const commerceApi = {
  /** Submit a checkout request. Requires authentication. */
  checkout(
    payload: CheckoutRequest,
    accessToken: string,
  ): Promise<CheckoutResponse> {
    return apiFetch<CheckoutResponse>("commerce", "/checkout", {
      method: "POST",
      body: JSON.stringify(payload),
    }, accessToken);
  },
};
