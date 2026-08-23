/**
 * Central mapping between the frontend and the backend microservices.
 *
 * Every service base URL is configured via `artisan-frontend/.env`
 * (see `.env.example`). Import the helpers from here instead of reading
 * `process.env` directly in components:
 *
 *   import { services, apiUrl, apiFetch } from "@/lib/api";
 *
 *   const artworks = await apiFetch<Artwork[]>(services.media, "/artworks");
 */

export type ServiceName = "auth" | "media" | "commerce" | "aiDiscovery" | "moderation" | "personalization";

const serviceEnvVar: Record<ServiceName, string | undefined> = {
  auth: process.env.NEXT_PUBLIC_AUTH_API_URL,
  media: process.env.NEXT_PUBLIC_MEDIA_API_URL,
  commerce: process.env.NEXT_PUBLIC_COMMERCE_API_URL,
  aiDiscovery: process.env.NEXT_PUBLIC_AI_DISCOVERY_API_URL,
  moderation: process.env.NEXT_PUBLIC_MODERATION_API_URL,
  personalization: process.env.NEXT_PUBLIC_PERSONALIZATION_API_URL,
};

// Local-development defaults, kept in sync with the backend service ports.
const serviceDefaultUrl: Record<ServiceName, string> = {
  auth: "http://localhost:8001/api/v1",
  media: "http://localhost:8002/api/v1",
  commerce: "http://localhost:8003/api/v1",
  aiDiscovery: "http://localhost:8004/api/v1",
  moderation: "http://localhost:8005/api/v1",
  personalization: "http://localhost:8006/api/v1",
};

export const services = Object.fromEntries(
  (Object.keys(serviceEnvVar) as ServiceName[]).map((name) => [
    name,
    serviceEnvVar[name] ?? serviceDefaultUrl[name],
  ]),
) as Record<ServiceName, string>;

/** Default timeout (ms) applied to every request made through `apiFetch`. */
export const API_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? 10000);

/** Build a full URL for a service path, e.g. apiUrl("media", "/artworks"). */
export function apiUrl(service: ServiceName, path: string): string {
  const base = services[service].replace(/\/+$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

/**
 * Error thrown for any non-2xx API response, with the human-readable message
 * extracted from the FastAPI error body (`{"detail": "..."}` or a 422
 * validation array).
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function messageFromBody(body: unknown, status: number): string {
  if (body && typeof body === "object" && "detail" in body) {
    const detail = (body as { detail: unknown }).detail;
    if (typeof detail === "string" && detail.length > 0) {
      return detail;
    }
    // FastAPI 422 validation errors: detail is an array of {loc, msg, type}.
    if (Array.isArray(detail)) {
      const parts = detail
        .map((entry) => {
          if (entry && typeof entry === "object" && "msg" in entry) {
            const msg = String((entry as { msg: unknown }).msg);
            const loc = (entry as { loc?: unknown[] }).loc ?? [];
            const field = loc.filter((part) => typeof part === "string").join(".");
            return field ? `${field}: ${msg}` : msg;
          }
          return null;
        })
        .filter(Boolean);
      if (parts.length > 0) {
        return parts.join("; ");
      }
    }
  }
  return `Request failed with status ${status}.`;
}

/** Typed fetch helper shared by all API calls (JSON in, JSON out). */
export async function apiFetch<T>(
  service: ServiceName,
  path: string,
  init: RequestInit = {},
  accessToken?: string,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const authHeaders: Record<string, string> = {};
    if (accessToken) {
      authHeaders["Authorization"] = `Bearer ${accessToken}`;
    }
    const response = await fetch(apiUrl(service, path), {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...(init.headers ?? {}),
      },
    });
    if (!response.ok) {
      let body: unknown = null;
      try {
        body = await response.json();
      } catch {
        // Non-JSON error body — fall through to the generic message.
      }
      throw new ApiError(response.status, messageFromBody(body, response.status));
    }
    if (response.status === 204) {
      return undefined as T;
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
