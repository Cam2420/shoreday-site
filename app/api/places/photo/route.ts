import type { PlacePhotoUnavailable } from "@/lib/google-place-photo-types";

/**
 * FUTURE route — server-side Google Places photo resolver. DOCUMENTED STUB.
 *
 * This endpoint is intentionally inert: it performs NO Google call, reads NO API
 * key, stores NO imagery, and always returns 501. It exists to reserve the path
 * and record the production-safe shape so wiring it later is unambiguous.
 *
 * Intended implementation (see `lib/google-place-photo-types.ts`):
 *   1. Read the canonical place from the query — `?placeId=` (preferred) or
 *      `?placeQuery=` (mirrors `googlePlaceQuery` in `lib/nassau-place-assets.ts`),
 *      plus optional `maxWidthPx` / `maxHeightPx` (clamped to Google's limits).
 *   2. SERVER-SIDE ONLY, read `process.env.GOOGLE_PLACES_API_KEY` (never a
 *      `NEXT_PUBLIC_*` var). Call Place Details → Place Photos.
 *   3. Return a short-lived `photoUri` (or issue a server-side redirect) PLUS the
 *      required `authorAttributions`. Never download, cache to `public/`, commit,
 *      or re-host the photo — resolve per request and let it expire.
 *   4. If the place/photo is missing OR attribution cannot be shown, return an
 *      `unavailable` result so the card keeps its intentional placeholder. Never
 *      return an unattributed photo.
 *
 * Guardrail: the API key must never reach the browser (no key in any response
 * body, header, prop, or URL). If that cannot be guaranteed, do not implement.
 */

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  // Inputs are accepted in the URL but intentionally not acted on yet.
  const { searchParams } = new URL(request.url);
  void searchParams;

  const body: PlacePhotoUnavailable = {
    kind: "unavailable",
    reason: "not-configured",
    message:
      "Server-side Google Places photo resolution is not implemented in web V1. " +
      "Itinerary cards render an intentional placeholder; only ShoreDay-owned media is stored locally.",
  };

  // 501 Not Implemented — documented future endpoint, intentionally inert.
  return Response.json(body, {
    status: 501,
    headers: { "Cache-Control": "no-store" },
  });
}
