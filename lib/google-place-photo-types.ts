/**
 * Contract for SERVER-SIDE Google Places photo resolution.
 *
 * STATUS: WIRED. The server route at `app/api/places/photo/route.ts` resolves a
 * canonical place to a short-lived Google photo URI plus its required
 * attribution. The unlocked, post-email itinerary cards request it client-side
 * (`components/funnel/GooglePlacePhoto.tsx`) and receive only that resolved
 * result — never the API key. Preview/locked cards never request it.
 *
 * Why this exists
 * ---------------
 * The ShoreDay mobile app shows a place-specific photo per itinerary stop by
 * querying Google Places at runtime. The web funnel reaches parity the same safe
 * way: a SERVER route resolves the place, and the client only ever receives the
 * resolved photo URI + attribution.
 *
 * Hard guardrails (enforced by the wired implementation)
 * ------------------------------------------------------
 * 1. KEY STAYS SERVER-SIDE. The Places key (env `GOOGLE_PLACES_API_KEY`, NOT a
 *    `NEXT_PUBLIC_*` var) is read only inside the route handler / server code.
 *    It never appears in a client bundle, prop, URL, or response body.
 * 2. NO PERMANENT STORAGE OF GOOGLE IMAGERY. Google Places photos are licensed
 *    for on-the-fly display only. The route does not download, cache to
 *    `public/`, commit, or re-host them — it resolves a short-lived URI per
 *    request and lets it expire. Only ShoreDay-owned/licensed media is stored
 *    locally (see `lib/nassau-place-assets.ts`).
 * 3. ATTRIBUTION IS MANDATORY. Google returns `authorAttributions`; they are
 *    rendered with the photo (all of them). A place whose attribution cannot be
 *    shown falls back to the intentional placeholder, never an unattributed photo.
 * 4. CANONICAL PLACE IDS. Prefer a stable Google `placeId` per location over
 *    re-querying by text. `lib/nassau-place-assets.ts` carries a `googlePlaceQuery`
 *    per slug (and an optional `placeId`, currently unset) to resolve the place;
 *    deriving/storing verified ids offline is a later hardening step.
 *
 * If any guardrail cannot be met for a place, the card keeps its placeholder.
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
  /** Resolved place display name (safe, non-secret) for alt/labelling. */
  displayName: string;
  widthPx: number;
  heightPx: number;
  /** Non-empty by contract — a result without attribution must not be returned. */
  attributions: PlacePhotoAttribution[];
  /** Provenance of the resolved photo. Always 'google_places' for this resolver. */
  source: 'google_places';
  /** Optional hint (epoch ms) after which the URI should be treated as stale. */
  expiresAtMs?: number;
}

/** No usable, attributable photo — the caller must show the placeholder. */
export interface PlacePhotoUnavailable {
  kind: 'unavailable';
  /** Machine-readable reason for logs/metrics (never leaks key material). */
  reason:
    | 'not-configured' // no server key set
    | 'invalid-request' // unknown/unsupported assetKey or bad params
    | 'not-found' // place or photo missing
    | 'no-attribution' // photo exists but attribution missing → refuse
    | 'rate-limited'
    | 'error';
  message: string;
}

export type PlacePhotoResponse = PlacePhotoResult | PlacePhotoUnavailable;

/**
 * Server-only provider contract. Lives on the server (route handler / server
 * action) and MUST honour the four guardrails above. The wired resolver in
 * `app/api/places/photo/route.ts` satisfies this shape; this interface stays
 * available for a shared/server-action implementation.
 */
export interface ServerPlacePhotoProvider {
  resolvePhoto(request: PlacePhotoRequest): Promise<PlacePhotoResponse>;
}

/** Env var name (NOT a value, NOT a `NEXT_PUBLIC_*` var) the server route reads server-side. */
export const PLACES_API_KEY_ENV = 'GOOGLE_PLACES_API_KEY' as const;
