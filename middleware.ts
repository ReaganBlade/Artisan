/**
 * Next.js Middleware — lightweight auth/routing decisions only.
 *
 * Checks for the presence of session data in localStorage is NOT possible
 * from middleware (server-side). Instead, this middleware:
 *
 * 1. Redirects authenticated users away from /signin and /signup
 *    (client-side check happens in the forms themselves).
 * 2. Adds security headers.
 *
 * For true server-side protected routes (/checkout, /cart, etc.),
 * auth checks happen in Server Components or Server Actions, not here.
 * This keeps middleware lightweight as required.
 */

import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  // --- Security headers ---
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // CSP — keep permissive for dev, tighten in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: http: https:;",
    );
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
