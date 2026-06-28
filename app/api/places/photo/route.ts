import {
  type PlacePhotoAttribution,
  type PlacePhotoResponse,
  type PlacePhotoResult,
  type PlacePhotoUnavailable,
} from "@/lib/google-place-photo-types";
import { getNassauPlaceAsset, isNassauPlaceAssetKey } from "@/lib/nassau-place-assets";

/**
 * Server-side Google Places photo resolver for unlocked itinerary cards.
 *
 *   GET /api/places/photo?assetKey=<key>&maxWidthPx=<n>&maxHeightPx=<n>
 *
 * Behaviour & guardrails (see `lib/google-place-photo-types.ts`):
 *   - `assetKey` MUST be a known key from `lib/nassau-place-assets.ts`; anything
 *     else is rejected before any Google call (`invalid-request`).
 *   - The Places key is read from `process.env.GOOGLE_PLACES_API_KEY` and sent
 *     ONLY as the `X-Goog-Api-Key` request header — never in a URL, query string,
 *     log line, or any field of the JSON response. Request headers are never
 *     logged. If the key is absent, the route returns `not-configured`.
 *   - Lookup prefers a stored `placeId` (Place Details); otherwise it falls back
 *     to Text Search on the canonical `googlePlaceQuery`. Narrow field masks only.
 *   - A photo is returned only WITH its required `authorAttributions`; a photo
 *     whose attribution is missing is refused (`no-attribution`) so the card
 *     keeps its intentional placeholder rather than showing an unattributed image.
 *   - The resolved `photoUri` is short-lived and resolved per request. Nothing is
 *     persisted, cached to `public/`, committed, or re-hosted. `no-store` always.
 */

export const dynamic = "force-dynamic";

const PLACES_BASE = "https://places.googleapis.com/v1";

// Itinerary thumbnails are small; clamp hard so a crafted query can't request a
// huge (and costly) image. Google itself allows 1–4800px.
const MIN_PX = 120;
const MAX_PX = 1200;
const DEFAULT_WIDTH_PX = 400;
const DEFAULT_HEIGHT_PX = 320;

// Never let an upstream hang block the result render; the client falls back.
const UPSTREAM_TIMEOUT_MS = 4000;

function unavailable(
  reason: PlacePhotoUnavailable["reason"],
  message: string,
): Response {
  const body: PlacePhotoUnavailable = { kind: "unavailable", reason, message };
  return Response.json(body, { status: 200, headers: { "Cache-Control": "no-store" } });
}

function clampPx(raw: string | null, fallback: number): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(MAX_PX, Math.max(MIN_PX, Math.round(n)));
}

/** Minimal shapes of the Places API (New) responses we read. Narrow on purpose. */
interface GoogleAuthorAttribution {
  displayName?: string;
  uri?: string;
  photoUri?: string;
}
interface GooglePhoto {
  name?: string;
  authorAttributions?: GoogleAuthorAttribution[];
}
interface GooglePlace {
  id?: string;
  displayName?: { text?: string };
  photos?: GooglePhoto[];
}

function mapAttributions(photo: GooglePhoto): PlacePhotoAttribution[] {
  return (photo.authorAttributions ?? [])
    .filter((a): a is GoogleAuthorAttribution => Boolean(a && a.displayName))
    .map((a) => ({
      displayName: a.displayName as string,
      uri: a.uri,
      photoUri: a.photoUri,
    }));
}

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: "no-store" });
  } finally {
    clearTimeout(timer);
  }
}

/** Resolve the canonical place (by stored id, else Text Search). Returns the
 *  first place carrying at least one photo, or null. */
async function resolvePlace(
  apiKey: string,
  placeId: string | undefined,
  placeQuery: string,
): Promise<GooglePlace | null> {
  if (placeId) {
    const res = await fetchWithTimeout(
      `${PLACES_BASE}/places/${encodeURIComponent(placeId)}`,
      {
        method: "GET",
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "id,displayName,photos",
        },
      },
    );
    if (!res.ok) return null;
    return (await res.json()) as GooglePlace;
  }

  const res = await fetchWithTimeout(`${PLACES_BASE}/places:searchText`, {
    method: "POST",
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.photos",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ textQuery: placeQuery, pageSize: 1 }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { places?: GooglePlace[] };
  return data.places?.[0] ?? null;
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const assetKey = searchParams.get("assetKey") ?? "";

  // Allowlist gate — reject anything not in the code-defined registry.
  if (!isNassauPlaceAssetKey(assetKey)) {
    return unavailable("invalid-request", "Unknown or missing place assetKey.");
  }

  // Server-only key. Absent → graceful, honest fallback (no Google call).
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return unavailable(
      "not-configured",
      "Google Places is not configured; the itinerary card keeps its placeholder.",
    );
  }

  const asset = getNassauPlaceAsset(assetKey);
  const maxWidthPx = clampPx(searchParams.get("maxWidthPx"), DEFAULT_WIDTH_PX);
  const maxHeightPx = clampPx(searchParams.get("maxHeightPx"), DEFAULT_HEIGHT_PX);

  try {
    const place = await resolvePlace(apiKey, asset.placeId, asset.googlePlaceQuery);
    const photo = place?.photos?.find((p) => Boolean(p.name));
    if (!place || !photo || !photo.name) {
      return unavailable("not-found", "No usable place photo was found.");
    }

    // Attribution is mandatory — refuse rather than show an unattributed photo.
    const attributions = mapAttributions(photo);
    if (attributions.length === 0) {
      return unavailable(
        "no-attribution",
        "Photo found but required attribution was missing; showing placeholder instead.",
      );
    }

    // Place Photos with skipHttpRedirect=true returns JSON { name, photoUri }.
    // Key rides in the header only; never in this URL.
    const mediaRes = await fetchWithTimeout(
      `${PLACES_BASE}/${photo.name}/media` +
        `?maxWidthPx=${maxWidthPx}&maxHeightPx=${maxHeightPx}&skipHttpRedirect=true`,
      { method: "GET", headers: { "X-Goog-Api-Key": apiKey } },
    );
    if (mediaRes.status === 429) {
      return unavailable("rate-limited", "Places photo request was rate-limited.");
    }
    if (!mediaRes.ok) {
      return unavailable("error", "Places photo request failed.");
    }
    const media = (await mediaRes.json()) as { photoUri?: string };
    if (!media.photoUri) {
      return unavailable("not-found", "No photo URI was returned for this place.");
    }

    const result: PlacePhotoResult = {
      kind: "photo",
      photoUri: media.photoUri,
      displayName: place.displayName?.text ?? asset.placeName,
      widthPx: maxWidthPx,
      heightPx: maxHeightPx,
      attributions,
      source: "google_places",
    };
    const body: PlacePhotoResponse = result;
    return Response.json(body, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch {
    // Swallow details — never surface upstream errors, headers, or key material.
    return unavailable("error", "Could not resolve a place photo right now.");
  }
}
