# ShoreDay Media Asset Map

**Status:** Planning / reference only. **No media files are stored in the repo.**
This document maps the ShoreDay Media Library (Google Drive) and how its assets
should be used in the web redesign. It is paired with the design doctrine
([`ShoreDay-Web-Design-Doctrine.md`](./ShoreDay-Web-Design-Doctrine.md), §10A–10C)
and the project skill (`.claude/skills/shoreday-dynamic-design/SKILL.md`).

> **Read-only inventory.** This map was built from a read-only Drive listing on
> 2026-06-27. No files were downloaded, moved, renamed, deleted, edited, or
> re-shared, and nothing was copied into the repo. File counts/sizes reflect that
> snapshot and may drift. **Final asset selection requires a human visual review
> before any asset is optimized and copied into the repo.**

---

## Google Drive: ShoreDay Media Library

- **Library root:** `ShoreDay Media Library` — owner `cam@shoredayapp.com`
  ([folder](https://drive.google.com/drive/folders/1F_c7sBiItnJZDuWgW5_E1uF2OeBRlsQT))
- **Subfolders:**
  - `01_Nassau_Images` — ~55 real Nassau/Bahamas stills (mostly large JPG)
    ([folder](https://drive.google.com/drive/folders/1c27OuuLML137ochdujoVLeXQpEoLI-EZ))
    — also contains a nested `Shutterstock` subfolder.
  - `02_App_Screenshots_UI` — ~40 product screenshots (JPG/PNG)
    ([folder](https://drive.google.com/drive/folders/12DVkxJEpKmXuIfQWNvTseIx9wMoaRMro))
    — also contains a nested `03_Generated_Content` subfolder.
  - `03_Nassau_Videos` — ~60 raw clips (MP4/MOV), **tens of MB up to ~2.5GB each**
    ([folder](https://drive.google.com/drive/folders/1L4Usb4ObfFVZmKUkSKY9PFouiMiMzJQw))

Licensing note: most images/videos are Shutterstock-sourced (filenames
`shutterstock_*`), with some Pexels/Unsplash. **Confirm each chosen asset's
license covers ShoreDay's web/marketing use before publishing.**

---

## Initial asset strategy

Candidates below are starting points from the inventory, by intended slot. Names
are Drive titles; treat them as a shortlist to review visually, not a final pick.

### Homepage hero candidates (strong real Nassau harbor / aerial)
- `nassau_aerial.jpg` — Nassau cityscape + port + cruise terminal + Paradise
  Island (already used in-repo at a smaller size; the library copy is ~16.8MB).
- `shutterstock_2731164081.jpg` — aerial port with multiple cruise ships lined up.
- `shutterstock_2731164047.jpg` — aerial beaches + waterfront promenade by the port.
- `shutterstock_2155156285.jpg` / `shutterstock_2143214365.jpg` — downtown aerial,
  Paradise Island Bridge + Potters Cay.
- `01_Nassau_Images.jpg` — pastel-pink Bay Street buildings + docked cruise ships.

Hero requires an overlay/scrim + contrast test so the headline and primary CTA
stay legible; pick the crop that supports text, not the busiest frame.

### Homepage support imagery (warm, trust-building, coastal)
- Streets/culture: `shutterstock_2596372491.jpg` (tourist in colorful streets),
  `shutterstock_2137204119.jpg` (Bay Street saxophonist).
- Cruise terminal / arrival: `shutterstock_2634928733.jpg`,
  `shutterstock_2632961065.jpg`, `shutterstock_2633460329.jpg` (cruise ships in Nassau).
- Resort/island mood (use sparingly, only if context-true): Atlantis / Paradise
  Island shots (`shutterstock_2140827895.jpg`, `shutterstock_2715971793.jpg`).

### Planner / timeline candidates (small, context-clarifying only)
- Beach/water stop: `shutterstock_2600990071.jpg` (Goodmans Bay public beach,
  turquoise water).
- Culture/history stop: `shutterstock_2422234633.jpg` (Pirates of Nassau museum),
  `shutterstock_2422229805.jpg` (Heritage Village / Gray Cliff).
- Use only where it clarifies a stop's category; otherwise keep the existing
  "Photo coming soon" placeholder.

### Excursion card candidates (real excursion / category images)
- Water/boating: `shutterstock_1169294410.jpg`, `shutterstock_1426775630.jpg`
  (boats / jet ski / boating).
- Beach: `shutterstock_2600990071.jpg`, `shutterstock_2140827895.jpg` (Paradise Beach).
- Note: production excursion cards already render Viator catalog images; library
  shots are for category/hero framing, not for misrepresenting a specific tour.

### App CTA screenshot candidates (prove product utility only)
From `02_App_Screenshots_UI`:
- `Itinerary Screenshot.jpg` — the core plan/itinerary view.
- `ShipAlertScreenshot.jpg` — ship/departure alert (timing reassurance).
- `Excursion_Screenshot.jpg` / `ExcursionImage_Screenshot*.jpg` — in-app excursions.
- `AIConcierge_Screenshot.jpg` — in-app concierge.
- `Map_Screenshot.jpg` / `Map_LocationPins_Screenshot.jpg` — port-day map.
- `Notifications_Screenshot.jpg` — departure reminders.
- Use near a matching feature claim only; do not decorate with screenshots.

### Video candidates — only after compression / performance review
All clips are raw and large; **none may be used as-is.** Smaller/likelier
starting points if (and only if) a compressed, muted, short loop is approved:
- `shutterstock_26225141.mov` (~16.8MB), `shutterstock_1109272589.mp4` (~21MB),
  `shutterstock_32593639.mp4` (~37MB), `shutterstock_27718750.mov` (~29MB).
- Avoid the multi-hundred-MB and GB-scale files for web entirely
  (e.g. `shutterstock_26463116.mov` ~2.57GB).

---

## Assets to avoid (off-brand / context mismatch)

Flagged during inventory — do **not** use on the trust-first web surface:
- `shutterstock_2789439165.jpg` — MSC Meraviglia pool **in Barcelona** (not Nassau).
- `shutterstock_2736966259.jpg` — vector "ship icons" set (clip-art, not a photo).
- `shutterstock_1495289183.jpg` / `_1495289216.jpg` / `shutterstock_1599524398.jpg`
  — **Hurricane Dorian damage/aftermath** (anxiety-inducing, off-message).
- Any Atlantis/resort interior implying an experience ShoreDay doesn't deliver
  unless captioned truthfully.

---

## Performance notes

- Prefer **optimized WebP/AVIF** (or well-compressed JPEG) for all stills; resize
  to the actual rendered dimensions. Source files are large (many 3–35MB) and
  must never ship unprocessed.
- **Avoid raw large video.** Library videos run from tens of MB to ~2.5GB — they
  must be compressed (and muted, short) before any web use.
- Provide **poster images and a static fallback** for any video; never rely on
  video to convey essential content.
- Keep the **LCP image** (typically the hero) carefully optimized, correctly
  sized, prioritized; lazy-load everything else.
- **Do not harm mobile performance** — prefer static posters on mobile; gate any
  video behind a proven performance budget and `prefers-reduced-motion`.

---

## Decision rule

**Final asset selection requires a human visual review before copying assets into
the repo.** This document records what exists and how assets *should* be used; it
does not authorize importing any specific file. When an asset is approved:
verify license → visually review → optimize/resize/transcode → add descriptive
alt text → only then place it in the repo and reference it.
