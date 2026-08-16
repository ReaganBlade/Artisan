This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Backend API mapping

All backend microservice URLs are configured in `.env` (template: `.env.example`)
and consumed through [`lib/api.ts`](lib/api.ts) — never hard-code a URL or read
`process.env` directly in components.

```ts
import { apiFetch } from "@/lib/api";
import { signIn } from "@/lib/auth";
import { fetchArtworks } from "@/lib/catalog";

const artworks = await apiFetch("media", "/artworks?limit=20"); // or fetchArtworks()
const me = await apiFetch("auth", "/auth/me", {
  headers: { Authorization: `Bearer ${token}` },
});
const session = await signIn(email, password);
```

| Service | Env var | Base URL (local) | Routes (`/api/v1`) |
| --- | --- | --- | --- |
| Auth | `NEXT_PUBLIC_AUTH_API_URL` | `http://localhost:8001/api/v1` | `/auth/signup`, `/auth/signin`, `/auth/refresh`, `/auth/logout`, `/auth/me` |
| Media | `NEXT_PUBLIC_MEDIA_API_URL` | `http://localhost:8002/api/v1` | `/artworks`, `/artworks/{id}`, `/artworks/{id}/media`, `/profiles`, `/profiles/{id}`, `/profiles/{id}/artworks` |
| Commerce | `NEXT_PUBLIC_COMMERCE_API_URL` | `http://localhost:8003/api/v1` | `/cart`, `/cart/items`, `/checkout`, `/checkout/{session_id}`, `/orders`, `/orders/{id}`, `/webhooks/stripe` |
| AI Discovery | `NEXT_PUBLIC_AI_DISCOVERY_API_URL` | `http://localhost:8004/api/v1` | `/search`, `/search/vibe`, `/search/log`, `/artworks/{id}/similar` |
| Moderation | `NEXT_PUBLIC_MODERATION_API_URL` | `http://localhost:8005/api/v1` | `/artworks/{id}/moderation`, `/artworks/{id}/signature`, `/moderation/flags`, `/moderation/flags/{id}` |
| Personalization | `NEXT_PUBLIC_PERSONALIZATION_API_URL` | `http://localhost:8006/api/v1` | `/feed`, `/interactions`, `/interactions/me` |

> Most non-auth routes currently return **dummy/mock data** — see the backend
> services for the payload shapes. Interactive docs for each service are served
> at `http://localhost:<port>/docs`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
