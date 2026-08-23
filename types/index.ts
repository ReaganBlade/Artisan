/* ------------------------------------------------------------------ */
/* Shared TypeScript types for the Artisan frontend                    */
/* Derived from the FastAPI service contracts in artisan-backend.      */
/* ------------------------------------------------------------------ */

// --- Auth Service ---------------------------------------------------

export type UserRole = "CUSTOMER" | "ARTIST" | "ADMIN";

export type User = {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
};

export type AuthResult = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
};

// --- Media Service --------------------------------------------------

export type ArtworkStatus = "active" | "sold" | "reserved" | "draft" | "archived";

export type Artwork = {
  id: string;
  profile_id: string;
  title: string;
  description: string | null;
  art_type: string;
  price: number | null;
  status: ArtworkStatus;
  primary_media_url: string | null;
  created_at: string;
  updated_at: string;
};

export type MediaFile = {
  id: string;
  artwork_id: string;
  url: string;
  media_type: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
};

export type ArtistProfile = {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  cover_image_url: string | null;
  social_links: Record<string, string> | null;
  created_at: string;
  updated_at: string;
};

// --- Commerce Service -----------------------------------------------

export type CartItem = {
  artwork_id: string;
  title: string;
  price: number;
  primary_media_url: string | null;
  artist_name: string;
  quantity: number;
};

export type CheckoutItem = {
  artwork_id: string;
  quantity: number;
};

export type CheckoutRequest = {
  items: CheckoutItem[];
};

export type CheckoutResponse = {
  session_id: string;
  checkout_url: string;
};

// --- AI Discovery Service -------------------------------------------

export type SearchResult = {
  id: string;
  title: string;
  description: string | null;
  art_type: string;
  price: number | null;
  primary_media_url: string | null;
  artist_name: string;
  score?: number;
};

// --- Personalization Service ----------------------------------------

export type PersonalizedFeed = {
  artwork_ids: string[];
};

export type InteractionLog = {
  artwork_id: string;
  interaction_type: "view" | "like" | "add_to_cart" | "purchase";
};

// --- Generic API types ----------------------------------------------

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

export type ApiErrorDetail = {
  loc: (string | number)[];
  msg: string;
  type: string;
};

export type ApiErrorResponse = {
  detail: string | ApiErrorResponse[];
};

// --- Frontend display types (adapted from API) ----------------------

export type DisplayArtwork = {
  id: string;
  title: string;
  artist: string;
  price: number;
  medium: string;
  edition: string;
  isNew?: boolean;
  isSold?: boolean;
  art: ArtVariant;
  primary_media_url?: string | null;
};

export type DisplayArtist = {
  id: string;
  name: string;
  username?: string;
  bio: string;
  avatar_url?: string | null;
  followers: number;
  sold: number;
  color: "acid" | "riot" | "electric" | "signal";
};

// Re-export ArtVariant for convenience
export type ArtVariant =
  | "sunburst"
  | "stripes"
  | "checker"
  | "halftone"
  | "blocks"
  | "bars"
  | "sun"
  | "grid"
  | "tri";
