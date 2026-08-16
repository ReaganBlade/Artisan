"use client";

/**
 * Client-side auth for the Auth Service (artisan-backend/services/auth_service).
 *
 * Tokens and the current user are kept in localStorage so the session survives
 * reloads. The Auth Service issues a short-lived access token plus a
 * long-lived refresh token; refresh/rotation is not wired up yet, so a session
 * expires with the access token.
 */

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "./api";

export type UserRole = "CUSTOMER" | "ARTIST" | "ADMIN";

/** Shape of `GET /auth/me` and the `user` object in auth results. */
export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
};

/** Shape of `POST /auth/signup` and `POST /auth/signin` responses. */
export type AuthResult = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: AuthUser;
};

const ACCESS_TOKEN_KEY = "artisan.access_token";
const REFRESH_TOKEN_KEY = "artisan.refresh_token";
const USER_KEY = "artisan.user";

/** Fired on window when the session changes, so hooks stay in sync. */
const AUTH_CHANGE_EVENT = "artisan:auth-change";

function readStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}

function writeStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
}

function clearStorage(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}

function readUser(): AuthUser | null {
  const raw = readStorage(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/** Persist a token pair + user and notify subscribers. */
export function saveSession(result: AuthResult): void {
  writeStorage(ACCESS_TOKEN_KEY, result.access_token);
  writeStorage(REFRESH_TOKEN_KEY, result.refresh_token);
  writeStorage(USER_KEY, JSON.stringify(result.user));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
}

/** Clear the local session and notify subscribers. */
export function clearSession(): void {
  clearStorage(ACCESS_TOKEN_KEY);
  clearStorage(REFRESH_TOKEN_KEY);
  clearStorage(USER_KEY);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
}

/** Synchronous snapshot of the local session (no network). */
export function getSession(): { user: AuthUser | null; accessToken: string | null } {
  return {
    user: readUser(),
    accessToken: readStorage(ACCESS_TOKEN_KEY),
  };
}

/** Create an account and sign in immediately. */
export async function signUp(email: string, password: string): Promise<AuthResult> {
  const result = await apiFetch<AuthResult>("auth", "/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveSession(result);
  return result;
}

/** Exchange email + password for a token pair. */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const result = await apiFetch<AuthResult>("auth", "/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveSession(result);
  return result;
}

/** Fetch the authenticated user profile (`GET /auth/me`). */
export async function fetchMe(accessToken: string): Promise<AuthUser> {
  return apiFetch<AuthUser>("auth", "/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

/** Revoke the refresh token on the server (best effort) and clear locally. */
export async function signOut(): Promise<void> {
  const refreshToken = readStorage(REFRESH_TOKEN_KEY);
  if (refreshToken) {
    try {
      await apiFetch<void>("auth", "/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    } catch {
      // Best effort — local sign-out must succeed even if the backend is down.
    }
  }
  clearSession();
}

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

/**
 * Reactive session hook for client components (header, profile menus).
 * Returns the cached user immediately and validates it against
 * `GET /auth/me` in the background.
 */
export function useSession() {
  const [status, setStatus] = useState<SessionStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      const session = getSession();
      if (!session.user || !session.accessToken) {
        if (!cancelled) {
          setUser(null);
          setStatus("unauthenticated");
        }
        return;
      }
      setUser(session.user);
      setStatus("authenticated");
      // Background re-validation so deactivated/expired sessions drop out.
      try {
        const fresh = await fetchMe(session.accessToken);
        if (!cancelled) setUser(fresh);
      } catch {
        if (!cancelled) {
          setUser(null);
          setStatus("unauthenticated");
          clearSession();
        }
      }
    };

    refresh();
    window.addEventListener(AUTH_CHANGE_EVENT, refresh);
    return () => {
      cancelled = true;
      window.removeEventListener(AUTH_CHANGE_EVENT, refresh);
    };
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  return { status, user, signOut: logout };
}
