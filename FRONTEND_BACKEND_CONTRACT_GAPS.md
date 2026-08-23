# Frontend-Backend Contract Gaps

Items that must be confirmed or implemented in the backend before the frontend can fully function.

## Auth Service

- [ ] **Token storage model**: Currently stores tokens in localStorage. The spec recommends HttpOnly cookies. **Decision needed**: Should the backend set cookies directly, or should the frontend continue using localStorage until cookie-based auth is implemented?
- [ ] **Refresh token flow**: `POST /auth/refresh` exists but is not wired up in the frontend. Need backend confirmation of the refresh endpoint contract.
- [ ] **Role-based registration**: The frontend captures role selection (collector/artist) but the `POST /auth/signup` endpoint only accepts `email` + `password`. **Backend needs**: Accept optional `role` parameter in signup, or provide a separate artist application endpoint.
- [ ] **User profile endpoint**: `GET /auth/me` returns the current user. Confirm response shape matches the `User` type (id, email, role, is_active, created_at).

## Media Service

- [ ] **`GET /media_files` endpoint**: The frontend uses `GET /artworks/{id}/media` based on the .env.example comment. Confirm this is the correct endpoint for fetching artwork media files.
- [ ] **Pagination format**: Frontend assumes `{ items: T[], total: number, limit: number, offset: number }`. Confirm this matches the Media Service response.
- [ ] **Artwork `status` values**: Frontend uses `active`, `sold`, `reserved`, `draft`, `archived`. Confirm these match the backend enum.
- [ ] **Missing `artist_name` on artwork**: The frontend needs artist names for artwork cards, but the Artwork schema has `profile_id` not `artist_name`. The catalog layer does a separate profile lookup. **Consider**: Adding an `artist_name` field to the artwork response, or a batch endpoint for profile hydration.

## Personalization Service

- [ ] **`GET /feed/personalized` authentication**: The frontend sends a Bearer token. Confirm this is the expected auth mechanism for the feed endpoint.
- [ ] **Feed response shape**: Frontend expects `{ artwork_ids: string[] }`. Confirm this is the exact response format.
- [ ] **`POST /interactions` payload**: Frontend sends `{ artwork_id: string, interaction_type: "view"|"like"|"add_to_cart"|"purchase" }`. Confirm field names and enum values.
- [ ] **Interaction logging auth**: Is authentication required for interaction logging, or is it optional (anonymous tracking)?

## Commerce Service

- [ ] **`POST /checkout` authentication**: The frontend sends a Bearer token. Confirm authentication is required.
- [ ] **Checkout request shape**: Frontend sends `{ items: [{ artwork_id: string, quantity: number }] }`. Confirm this matches the backend model.
- [ ] **Checkout response shape**: Frontend expects `{ session_id: string, checkout_url: string }`. Confirm this is the Stripe Checkout Session redirect URL.
- [ ] **Cart validation**: The backend must validate artwork existence, pricing, availability, and sales state. This is assumed but not yet verified.

## AI Discovery Service

- [ ] **`GET /search` vs `GET /search/vibe`**: Confirm both endpoints exist and accept a `q` query parameter.
- [ ] **Search response shape**: Frontend expects `{ items: SearchResult[], total: number, limit: number, offset: number }` where each result has `id, title, description, art_type, price, primary_media_url, artist_name, score?`.
- [ ] **Vibe search `score` field**: Is a relevance score returned in the response? Frontend displays it as a percentage match.
- [ ] **Fallback behavior**: When `/search/vibe` fails, should the frontend automatically fall back to `/search`, or display an error?

## Missing Backend Endpoints

- [ ] **Batch artwork hydration**: For personalized feed and search results, the frontend needs to fetch multiple artworks by ID. Currently does individual requests. A `GET /artworks?ids=a,b,c` batch endpoint would reduce requests.
- [ ] **Artist follower/sold counts**: The frontend generates mock values. The backend should provide real follower counts and pieces sold per artist.
- [ ] **Categories endpoint**: The homepage shows category cards with counts. No categories endpoint exists in the backend yet.
- [ ] **Image upload**: `POST /media/upload` is referenced but not yet implemented in the frontend. Need the signed URL or multipart upload contract.

## Security Considerations

- [ ] **CORS**: When the frontend runs on port 3000 and services on 8001-8006, CORS must be configured. This is a backend responsibility but affects frontend development.
- [ ] **Rate limiting**: No rate limiting endpoints are visible. Frontend handles 429 errors in the error model but this should be verified.
- [ ] **CSRF protection**: If moving to cookie-based auth, CSRF tokens may be needed for state-changing operations.
