/**
 * Canonical Nassau itinerary place-image registry.
 *
 * IMAGE-HONESTY POLICY (see docs/assets/nassau-place-image-manifest.md)
 * -------------------------------------------------------------------
 * The ShoreDay mobile app fetches a place-specific photo for every itinerary
 * stop from Google Places at runtime (`getPhotoUrlForPlace(query, loc)`). The
 * web funnel has NO server-side Places photo endpoint yet (see
 * `lib/google-place-photo-types.ts` and the documented future route
 * `app/api/places/photo/route.ts`), so it must NOT invent place-specific photos.
 *
 * A slug therefore only receives a local `src` when ShoreDay genuinely owns or
 * licenses an image that ACTUALLY depicts that place. Everything else has no
 * `src` and `status: 'needs replacement'`; `ItineraryStopCard` then renders an
 * intentional "Photo coming soon" placeholder instead of a misleading stand-in.
 *
 * Owned-media audit (2026-06-25) — searched web `public/`, the mobile app
 * (`assets/images/`, `pubspec.yaml`), and the ShoreDay Drive Media Library for:
 * queen, staircase, junkanoo, pirates, cookin, bahamian, watlings, fort, fish,
 * nassau, beach, port. The ONLY owned images that truthfully depict a slug are
 * the Nassau port/harbor shots used by `nassau-cruise-port` and `return-buffer`.
 * No owned Pirates of Nassau, Queen's Staircase, Fort Fincastle, Junkanoo Beach,
 * Bahamian Cookin', John Watling's, Fish Fry, Pompey Square, or Straw Market
 * photo exists in any source. The mobile app supplies those dynamically.
 */

export type NassauPlaceAssetKey =
  | 'pirates-of-nassau'
  | 'queens-staircase'
  | 'fort-fincastle'
  | 'junkanoo-beach'
  | 'bahamian-cookin'
  | 'john-watlings'
  | 'fish-fry'
  | 'pompey-square'
  | 'straw-market'
  | 'nassau-cruise-port'
  | 'return-buffer';

/**
 * - `approved`          — ShoreDay owns/licenses an image that actually shows this place.
 * - `needs replacement` — no owned place-true image yet; web shows an intentional
 *                         placeholder. Production source is Google Places (mobile parity).
 * - `dynamic only`      — image is only ever served from a dynamic/remote source at
 *                         runtime and never stored locally (reserved for once the
 *                         server-side Places route exists; nothing uses it in web V1).
 */
export type NassauPlaceImageStatus = 'approved' | 'needs replacement' | 'dynamic only';

export interface NassauPlaceAsset {
  /** Human-readable place name (manifest + alt fallbacks). */
  placeName: string;
  /**
   * Local image path under `public/`. Present ONLY for an owned, approved image
   * that truthfully depicts the place. Absent → card shows the intentional
   * "Photo coming soon" placeholder.
   */
  src?: string;
  /** Alt text, used when `src` is present. */
  alt: string;
  /** Image-provenance state. */
  status: NassauPlaceImageStatus;
  /** Where the current (or intended) image comes from. */
  source: string;
  /** License / permission status. */
  license: string;
  /**
   * Canonical Google Places text query the mobile app already uses for this
   * place. Reused as the lookup key by the future web Places photo route so web
   * and app resolve the same canonical place.
   */
  googlePlaceQuery: string;
  /** Operator-facing provenance note. */
  notes: string;
}

const DYNAMIC_NOTE =
  'Mobile app loads this from Google Places at runtime. No owned web asset exists; ' +
  'the card shows the intentional "Photo coming soon" placeholder until the server-side ' +
  'Places photo route (see lib/google-place-photo-types.ts) is wired.';

export const nassauPlaceAssets: Record<NassauPlaceAssetKey, NassauPlaceAsset> = {
  'pirates-of-nassau': {
    placeName: 'Pirates of Nassau',
    alt: 'Pirates of Nassau museum in downtown Nassau',
    status: 'needs replacement',
    source: 'None — no owned photo of this venue',
    license: 'N/A (no stored asset)',
    googlePlaceQuery: 'Pirates of Nassau',
    notes: DYNAMIC_NOTE,
  },
  'queens-staircase': {
    placeName: "Queen's Staircase & Fort Fincastle",
    alt: "Queen's Staircase carved limestone steps in Nassau",
    status: 'needs replacement',
    source: 'None — no owned photo of this landmark',
    license: 'N/A (no stored asset)',
    googlePlaceQuery: "Queen's Staircase",
    notes: DYNAMIC_NOTE,
  },
  'fort-fincastle': {
    placeName: 'Fort Fincastle',
    alt: 'Fort Fincastle lookout above Nassau',
    status: 'needs replacement',
    source: 'None — no owned photo of this landmark',
    license: 'N/A (no stored asset)',
    googlePlaceQuery: 'Fort Fincastle Nassau',
    notes: `${DYNAMIC_NOTE} Registry-only slug (not currently rendered by a blueprint stop).`,
  },
  'junkanoo-beach': {
    placeName: 'Junkanoo Beach',
    alt: 'Junkanoo Beach near the Nassau cruise port',
    status: 'needs replacement',
    source: 'None — a generic Bahamian-beach fallback was previously reused here',
    license: 'N/A (no stored asset)',
    googlePlaceQuery: 'Junkanoo Beach Nassau',
    notes:
      `${DYNAMIC_NOTE} A generic beach photo would be category-plausible but is NOT this beach, ` +
      'so it is intentionally not used.',
  },
  'bahamian-cookin': {
    placeName: "Bahamian Cookin' Restaurant & Bar",
    alt: "Bahamian Cookin' Restaurant in downtown Nassau",
    status: 'needs replacement',
    source: 'None — no owned photo of this venue',
    license:
      'N/A (no stored asset). A candidate owned category image exists in Drive ' +
      '(Bahamasfoodfull.jpg, conch) but it is NOT this venue, so it is not wired.',
    googlePlaceQuery: "Bahamian Cookin' Restaurant Nassau",
    notes: DYNAMIC_NOTE,
  },
  'john-watlings': {
    placeName: "John Watling's Distillery",
    alt: "John Watling's Distillery courtyard in Nassau",
    status: 'needs replacement',
    source: 'None — no owned photo of this venue',
    license: 'N/A (no stored asset)',
    googlePlaceQuery: "John Watling's Distillery",
    notes: DYNAMIC_NOTE,
  },
  'fish-fry': {
    placeName: 'Arawak Cay (Fish Fry)',
    alt: 'Arawak Cay Fish Fry food district in Nassau',
    status: 'needs replacement',
    source: 'None — no owned photo of this district',
    license: 'N/A (no stored asset)',
    googlePlaceQuery: 'Arawak Cay Fish Fry Nassau',
    notes: `${DYNAMIC_NOTE} Registry-only slug (not currently rendered by a blueprint stop).`,
  },
  'pompey-square': {
    placeName: 'Pompey Square',
    alt: 'Pompey Square gathering spot in downtown Nassau',
    status: 'needs replacement',
    source: 'None — no owned photo of this square',
    license: 'N/A (no stored asset)',
    googlePlaceQuery: 'Pompey Square Nassau',
    notes: DYNAMIC_NOTE,
  },
  'straw-market': {
    placeName: 'Nassau Straw Market',
    alt: 'Nassau Straw Market stalls in downtown Nassau',
    status: 'needs replacement',
    source: 'None — no owned photo of this market',
    license: 'N/A (no stored asset)',
    googlePlaceQuery: 'Nassau Straw Market',
    notes: DYNAMIC_NOTE,
  },
  'nassau-cruise-port': {
    placeName: 'Nassau Cruise Port',
    src: '/nassau-aerial-web.jpg',
    alt: 'Aerial view of Nassau cruise port, harbor, and cruise terminal',
    status: 'approved',
    source: 'ShoreDay Media Library — nassau_aerial.jpg, web-optimized as nassau-aerial-web.jpg',
    license: 'Owned/licensed ShoreDay media',
    googlePlaceQuery: 'Nassau Cruise Port',
    notes:
      'Owned aerial that truthfully shows the port and cruise terminal. Already optimized in public/.',
  },
  'return-buffer': {
    placeName: 'Return to the pier',
    src: '/images/nassau/places/nassau-harbor-approach.jpg',
    alt: 'Nassau harbor and pier seen on the approach back to the ship',
    status: 'approved',
    source: 'ShoreDay Media Library — Nassau harbor approach',
    license: 'Owned/licensed ShoreDay media',
    googlePlaceQuery: 'Prince George Wharf Nassau',
    notes: 'Owned harbor/pier image, contextually correct for the return-buffer bookend.',
  },
};

export function getNassauPlaceAsset(key: NassauPlaceAssetKey): NassauPlaceAsset {
  return nassauPlaceAssets[key];
}

/**
 * Slugs whose card has no owned, place-true photo yet. Drives the QA report and
 * the manifest. Anything here renders the intentional "Photo coming soon" state.
 */
export const nassauPlaceImagesNeedingReplacement = (
  Object.entries(nassauPlaceAssets) as [NassauPlaceAssetKey, NassauPlaceAsset][]
)
  .filter(([, asset]) => asset.status !== 'approved')
  .map(([key, asset]) => ({
    key,
    placeName: asset.placeName,
    status: asset.status,
    notes: asset.notes,
  }));
