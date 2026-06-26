/**
 * Future-ready contract for SERVER-SIDE Google Places photo resolution.
 *
 * STATUS: types + documentation only. NOT wired. There is intentionally no
 * client that calls Google from the browser and no implementation that stores
 * Google imagery. See the stub route at `app/api/places/photo/route.ts`.
 *
 * Why this exists
 * ---------------
 * The ShoreDay mobile app shows a place-specific photo per itinerary stop by
 * querying Google Places at runtime. The web funnel should reach parity the same
 * safe way: a SERVER route resolves a canonical place to a short-lived Google
 * photo URI and the required attribution, and the client only ever receives that
 * resolved result — never an API key.
 *
 * Hard guardrails (must hold before this is implemented)
 * ------------------------------------------------------
 * 1. KEY STAYS SERVER-SIDE. The Places key (env `GOOGLE_PLACES_API_KEY`, NOT a
 *    `NEXT_PUBLIC_*` var) is read only inside the route handler / server code.
 *    It must never appear in a client bundle, prop, URL, or response body.
 * 2. NO PERMANENT STORAGE OF GOOGLE IMAGERY. Google Places photos are licensed
 *    for on-the-fly display only. Do not download, cache to `public/`, commit,
 *    or re-host them. Resolve per request (a short-lived URI or a server-side
 *    redirect) and let it expire. Only ShoreDay-owned/licensed media is stored
 *    locally (see `lib/nassau-place-assets.ts`).
 * 3. ATTRIBUTION IS MANDATORY. Google returns `authorAttributions` /
 *    `flagContentUri`. They must be rendered with the photo. A place whose
 *    attribution cannot be shown must fall back to the intentional placeholder,
 *    never to an unattributed photo.
 * 4. CANONICAL PLACE IDS. Prefer storing a stable Google `placeId` per location
 *    over re-querying by text. `lib/nassau-place-assets.ts` already carries a
 *    `googlePlaceQuery` per slug to derive/verify those ids once, offline.
 *
 * If any guardrail cannot be met, keep the placeholder. Do not implement.
 */

/** A canonical Google Places identifier, e.g. "ChIJ...". */
export type GooglePlaceId = string;

/** Request a photo for one canonical place. Resolved entirely server-side. */
export interface PlacePhotoRequest {
  /**
   * Preferred lookup: a stored canonical `placeId`. If absent, the server may
   * resolve `placeQuery` via Place Search FIRST, then fetch the photo — but a
   * stored id is cheaper and avoids ambiguous matches.
   */
  placeId?: GooglePlaceId;
  /** Fallback lookup: the canonical text query (mirrors `googlePlaceQuery`). */
  placeQuery?: string;
  /** Max rendered width in CSS px; clamped server-side to Google's limits. */
  maxWidthPx?: number;
  /** Max rendered height in CSS px; clamped server-side to Google's limits. */
  maxHeightPx?: number;
}

/**
 * Attribution that MUST be displayed alongside the photo. Mirrors the shape of
 * Google's `authorAttributions` entries.
 */
export interface PlacePhotoAttribution {
  displayName: string;
  uri?: string;
  photoUri?: string;
}

/** A successfully resolved, ready-to-display photo reference. */
export interface PlacePhotoResult {
  kind: 'photo';
  /** Short-lived photo URI to render directly (never persisted). */
  photoUri: string;
  widthPx: number;
  heightPx: number;
  /** Non-empty by contract — a result without attribution must not be returned. */
  attributions: PlacePhotoAttribution[];
  /** Optional hint (epoch ms) after which the URI should be treated as stale. */
  expiresAtMs?: number;
}

/** No usable, attributable photo — the caller must show the placeholder. */
export interface PlacePhotoUnavailable {
  kind: 'unavailable';
  /** Machine-readable reason for logs/metrics (never leaks key material). */
  reason:
    | 'not-configured' // no server key set
    | 'not-found' // place or photo missing
    | 'no-attribution' // photo exists but attribution missing → refuse
    | 'rate-limited'
    | 'error';
  message: string;
}

export type PlacePhotoResponse = PlacePhotoResult | PlacePhotoUnavailable;

/**
 * Server-only provider contract a future implementation would satisfy. Lives on
 * the server (route handler / server action). Implementations MUST honour the
 * four guardrails above. Deliberately unimplemented here.
 */
export interface ServerPlacePhotoProvider {
  resolvePhoto(request: PlacePhotoRequest): Promise<PlacePhotoResponse>;
}

/** Env var name (NOT a value, NOT a `NEXT_PUBLIC_*` var) a future impl reads server-side. */
export const PLACES_API_KEY_ENV = 'GOOGLE_PLACES_API_KEY' as const;
