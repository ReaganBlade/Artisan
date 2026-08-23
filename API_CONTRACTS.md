# API Contract Matrix

Single source of truth for frontend-to-backend routing.

| Frontend Route | Backend Endpoint | Service | Method | Auth | Execution Context |
|---|---|---|---|---|---|
| `/user/sign-in` | `POST /auth/signin` | Auth | POST | Public | Client (form action) |
| `/user/sign-up` | `POST /auth/signup` | Auth | POST | Public | Client (form action) |
| `GET /auth/me` (background) | `GET /auth/me` | Auth | GET | Bearer token | Client (session hook) |
| `POST /auth/logout` | `POST /auth/logout` | Auth | POST | Refresh token | Client (sign out) |
| `/` (personalized feed) | `GET /feed/personalized` | Personalization | GET | Bearer token | Client (section) |
| `/` (artworks) | `GET /artworks` | Media | GET | Public | Server Component |
| `/` (artists) | `GET /profiles` | Media | GET | Public | Server Component |
| `/product/[id]` | `GET /artworks/{id}` | Media | GET | Public | Server Component |
| `/product/[id]` | `GET /artworks/{id}/media` | Media | GET | Public | Server Component |
| `/product/[id]` | `POST /interactions` | Personalization | POST | Optional | Fire-and-forget |
| `/artist/[username]` | `GET /profiles/{username}` | Media | GET | Public | Server Component |
| `/artist/[username]` | `GET /artworks?profile_id={id}` | Media | GET | Public | Server Component |
| `/cart` | (client-side only) | — | — | — | Cookie state |
| `/checkout` | `POST /checkout` | Commerce | POST | Bearer token | Client (action) |
| `/search` | `GET /search?q=...` | AI Discovery | GET | Public | Client (action) |
| `/search` (vibe) | `GET /search/vibe?q=...` | AI Discovery | GET | Public | Client (action) |

## Service Base URLs

All configured via environment variables (server-side only):

```
AUTH_SERVICE_URL=http://localhost:8001/api/v1
MEDIA_SERVICE_URL=http://localhost:8002/api/v1
COMMERCE_SERVICE_URL=http://localhost:8003/api/v1
AI_DISCOVERY_SERVICE_URL=http://localhost:8004/api/v1
MODERATION_SERVICE_URL=http://localhost:8005/api/v1
PERSONALIZATION_SERVICE_URL=http://localhost:8006/api/v1
```

## Error Response Format

All FastAPI services return errors as:

```json
{
  "detail": "string message" | [{"loc": ["field"], "msg": "message", "type": "error_type"}]
}
```

The frontend normalizes these via `ApiError` in `lib/api.ts`.
