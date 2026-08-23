/** Auth Service API module */

import { apiFetch } from "@/lib/api";
import type { AuthResult, User } from "@/types";

export const authApi = {
  /** Create a new account. */
  signUp(email: string, password: string): Promise<AuthResult> {
    return apiFetch<AuthResult>("auth", "/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  /** Exchange credentials for a token pair. */
  signIn(email: string, password: string): Promise<AuthResult> {
    return apiFetch<AuthResult>("auth", "/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  /** Fetch the current user profile. */
  me(accessToken: string): Promise<User> {
    return apiFetch<User>("auth", "/auth/me", {}, accessToken);
  },

  /** Revoke the refresh token (best-effort). */
  logout(refreshToken: string): Promise<void> {
    return apiFetch<void>("auth", "/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },
};
