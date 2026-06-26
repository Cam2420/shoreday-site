# Nassau Place-Image Manifest

Source of truth for **itinerary place-card imagery** on the Nassau web funnel
(`/nassau/plan`). It records, per place, what image (if any) is shown, where it
came from, and whether it is production-ready.

- **Code:** [`lib/nassau-place-assets.ts`](../../lib/nassau-place-assets.ts) — the registry these rows mirror.
- **Render:** [`components/funnel/ItineraryStopCard.tsx`](../../components/funnel/ItineraryStopCard.tsx) — shows the owned image, or the intentional placeholder. These cards render only on `/nassau/plan`; the legacy `/nassau/results/[planId]` route (which previously used generic location photos) is retired and now redirects to `/nassau/plan`.
- **Future dynamic source:** [`lib/google-place-photo-types.ts`](../../lib/google-place-photo-types.ts) + `app/api/places/photo/route.ts`.

## Image-honesty policy

The web funnel **never invents a place-specific photo**. A place gets a stored
local image only when ShoreDay genuinely owns/licenses a photo that **actually
depicts that place**. Otherwise the card renders an intentional
**"Photo coming soon"** placeholder (soft ShoreDay gradient + category icon).
Showing an honest placeholder is required behaviour — a generic stand-in
(beach, cruise ship, street scene) for an unrelated venue is **not** allowed.

The ShoreDay mobile app fills these same places from **Google Places at runtime**
(`getPhotoUrlForPlace(query, loc)`); the web funnel has no server-side Places
endpoint yet, so those places stay on the placeholder until that route exists.

### Status legend

| Status | Meaning |
| --- | --- |
| `approved` | ShoreDay owns/licenses an image that truthfully shows this place. Safe for production. |
| `needs replacement` | No owned place-true image yet. Web shows the intentional placeholder. Production source is Google Places (mobile parity). |
| `dynamic only` | Served only from a dynamic/remote source at runtime, never stored locally. Reserved for once the server-side Places route exists — **nothing uses it in web V1.** |

## Manifest

| Place name | Slug | Current image path | Source | License / permission | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Pirates of Nassau | `pirates-of-nassau` | _(placeholder — no file)_ | None owned | N/A (no stored asset) | `needs replacement` | Rendered stop. Mobile uses Google Places (`Pirates of Nassau`). |
| Queen's Staircase & Fort Fincastle | `queens-staircase` | _(placeholder — no file)_ | None owned | N/A (no stored asset) | `needs replacement` | Rendered stop. Mobile uses Google Places (`Queen's Staircase`). |
| Fort Fincastle | `fort-fincastle` | _(placeholder — no file)_ | None owned | N/A (no stored asset) | `needs replacement` | Registry-only (not currently rendered; reserved for future itineraries). |
| Junkanoo Beach | `junkanoo-beach` | _(placeholder — no file)_ | None owned (a generic beach was previously reused here) | N/A (no stored asset) | `needs replacement` | Rendered stop. A generic beach photo is category-plausible but is **not** this beach, so it is intentionally not used. |
| Bahamian Cookin' Restaurant & Bar | `bahamian-cookin` | _(placeholder — no file)_ | None owned | N/A. Candidate owned **category** image in Drive (`Bahamasfoodfull.jpg`, conch) is **not** this venue → not wired. | `needs replacement` | Rendered stop. Mobile uses Google Places. |
| John Watling's Distillery | `john-watlings` | _(placeholder — no file)_ | None owned | N/A (no stored asset) | `needs replacement` | Rendered stop. Mobile uses Google Places (`John Watling's Distillery`). |
| Arawak Cay (Fish Fry) | `fish-fry` | _(placeholder — no file)_ | None owned | N/A (no stored asset) | `needs replacement` | Registry-only (not currently rendered). |
| Pompey Square | `pompey-square` | _(placeholder — no file)_ | None owned | N/A (no stored asset) | `needs replacement` | Rendered stop (family/low-stress variant). |
| Nassau Straw Market | `straw-market` | _(placeholder — no file)_ | None owned | N/A (no stored asset) | `needs replacement` | Rendered stop (food/culture variant). |
| Nassau Cruise Port | `nassau-cruise-port` | `public/nassau-aerial-web.jpg` | ShoreDay Media Library (`nassau_aerial.jpg` → web-optimized) | Owned / licensed ShoreDay media | `approved` | Owned aerial that truthfully shows the port + cruise terminal. Registry-only today. |
| Return to the pier | `return-buffer` | `public/images/nassau/places/nassau-harbor-approach.jpg` | ShoreDay Media Library (Nassau harbor approach) | Owned / licensed ShoreDay media | `approved` | Rendered as the final bookend stop. Owned harbor/pier image, contextually correct. |

**Summary:** 2 `approved` (owned port/harbor images) · 9 `needs replacement` · 0 `dynamic only`.

## Owned-media search (2026-06-25)

Searched for the terms `queen, staircase, junkanoo, pirates, cookin, bahamian,
watlings, fort, fish, nassau, beach, port` across:

| Location | Result |
| --- | --- |
| Web repo `public/` (incl. `public/images/nassau/places/`) | General Nassau assets: `nassau-aerial-web.jpg`, `nassau-people-web.jpg`, `Nassau_people.full.jpg`, `nassau_aerial.jpg`, `swimmingpig_bird.jpg`, plus the owned harbor fallback `nassau-harbor-approach.jpg` (used by `return-buffer`). No place-specific landmark/venue photos. The two unused generic fallbacks (`bahamas-beach-fallback.jpg`, `itinerary-desk-fallback.jpg`) were **deleted** in the 2026-06-26 corrective pass. |
| Mobile app `assets/images/` + `pubspec.yaml` | Only generic/stock (`bg_imag.jpeg`, `trip1–7.png`, `Gallery5.png`, `love_bahamas_beach_original.jpeg`, `nassau_hero_fallback.jpg`) and app UI icons. **No bundled place photos** — the app fetches them from Google Places at runtime (`getPhotoUrlForPlace`), even falling back to an Unsplash URL. |
| ShoreDay Drive Media Library (`cam@shoredayapp.com`) | Place-term query returned **nothing**. Only general Nassau imagery: `nassau_aerial.jpg` (port/terminal aerial — already in repo), `Nassau_people.full.jpg` (already in repo), street/jitney shots (`NassauTraffic2`, `Nassau_Jitney`), and one food photo (`Bahamasfoodfull.jpg`, conch). Two **Hurricane Dorian** disaster photos (`Welcome2Nassau.jpg`, `NassauTaxi1full.jpg`) are explicitly **excluded**. |

**Conclusion:** No owned/approved photo exists for any of the nine activity
places. Only the Nassau **port/harbor** shots truthfully depict a slug, so only
`nassau-cruise-port` and `return-buffer` are `approved`. Everything else uses the
intentional placeholder until the server-side Google Places route is built.

## Related: excursion imagery

Excursion cards (`data/excursions/nassau.ts`) carry remote TripAdvisor CDN
`imageUrls` from the mobile catalog. Those are **`dynamic only`** (remote, not
owned, never stored locally) and are out of scope for this place-image manifest.
