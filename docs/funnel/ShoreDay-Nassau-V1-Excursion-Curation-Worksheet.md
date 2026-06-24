# ShoreDay Nassau V1 — Excursion Curation Worksheet

**Status:** Manual, read-only curation for **owner review**. Nothing here is
production-ready. **No Viator API was used; the production key was not used; no
prices, ratings, or review counts are recorded as catalog values.**

## Method & sources

- **Source 1 (authoritative):** the shipped mobile-app extract
  `data/excursions/nassau.ts` (12 Nassau products) — supplies internal ID,
  product code, title, exact affiliate URL, category, duration string, mobile
  interest tags, mobile price tier.
- **Source 2:** the exact preserved affiliate URLs (incl. `pid=P00293644`).
- **Source 3 (public Viator product pages):** **inaccessible to automated
  read-only fetch — every page returned HTTP 403 (bot protection).** The fields
  that only the public product page can confirm (meeting point, transportation,
  pickup, check-in lead, minimum age, child/traveler restrictions, accessibility,
  physical demand, cancellation policy, reserve-now/pay-later, start-time type)
  are therefore recorded as **unknown**. They were **not** inferred from titles or
  images. The owner (or a later authorized step) must verify these directly on the
  public product pages or via Viator Partner tooling.

Because the §8 engine-critical and logistics-confirmation fields could not be
verified from an authoritative source, **all selected products are marked
`INCOMPLETE`** — the mobile-extract fields are complete, but public-page
enrichment is pending. No product is marked production-ready.

`source date: 2026-06-23`

## Selection rationale (8 of 12)

Balanced launch coverage across experience type and duration:

| Coverage need | Product(s) |
|---|---|
| beach / relaxation | Luxury Beach Massage |
| animals / swimming pigs | Rose Island Swimming Pigs; Exclusive Swimming Pigs |
| water activity | ATV + JetSki Bundle; Rose Island (snorkel) |
| island / city tour | Discover Nassau City Tour; Jeep + Lunch; Segway |
| food / culture | Rum Tasting & Food Walking Tour; Jeep + Lunch |
| adventure | ATV + JetSki Bundle; Segway |
| family / easier logistics | City Tour; Rum Walking Tour; Jeep + Lunch |
| short / medium / longer | 1h (Massage); 3h (Rum, City, Rose, Segway, Jeep); 4h (Swimming Pigs, ATV+JetSki) |

Not selected (held for a later pass): Pirate Jeep, ATV Tour (single), Bites
Walking Tour, Trike Tour — redundant with selected coverage.

Logistics class is a **proposal** (port-adjacent / road-transfer / bridge-or-ferry
/ boat-or-remote / unknown), not a verified fact and not a numeric buffer.

---

## Curated records

> Field legend per product. `unknown` = not confirmable from an authoritative
> source in this pass (public pages 403).

### 1. Luxury Beach Massage in Nassau Bahamas with Transportation
- **internal ID:** `nassau_beach_massage`
- **product code:** `d420-465758P4`
- **title:** Luxury Beach Massage in Nassau Bahamas with Transportation
- **exact affiliate URL:** `https://www.viator.com/tours/Nassau/Beachfront-Massage-in-Nassau-Bahamas-with-Transportation-1-Hour/d420-465758P4?pid=P00293644`
- **public product URL:** `https://www.viator.com/tours/Nassau/Beachfront-Massage-in-Nassau-Bahamas-with-Transportation-1-Hour/d420-465758P4`
- **category (mobile):** Nature
- **duration:** 1 Hour (mobile-listed single value; exact/range unverified)
- **start-time type:** unknown
- **meeting/departure location:** unknown
- **transportation included:** unknown (title references "with Transportation"; not recorded as fact)
- **pickup information:** unknown
- **check-in lead time:** unknown
- **minimum age:** unknown
- **child restrictions:** unknown
- **traveler restrictions:** unknown
- **accessibility information:** unknown
- **physical-demand information:** unknown
- **cancellation policy:** unknown
- **reserve-now/pay-later support:** unknown
- **mobile interest tags:** Beaches, Instagram Spots
- **mobile price tier:** `$$$$$`
- **unknown fields:** all public-page fields above
- **proposed logistics class (HYPOTHESIS_ONLY — OWNER REVIEW REQUIRED):** road-transfer (low confidence)
- **status:** `INCOMPLETE`

### 2. Rum Tasting and Food Walking Tour in Nassau Bahamas
- **internal ID:** `nassau_rum_tasting`
- **product code:** `d420-6558RUM`
- **title:** Rum Tasting and Food Walking Tour in Nassau Bahamas
- **exact affiliate URL:** `https://www.viator.com/tours/Nassau/Nassau-Rum-and-Food-Walking-Tour/d420-6558RUM?pid=P00293644`
- **public product URL:** `https://www.viator.com/tours/Nassau/Nassau-Rum-and-Food-Walking-Tour/d420-6558RUM`
- **category (mobile):** Culture
- **duration:** 3 Hours (mobile-listed single value)
- **start-time type:** unknown
- **meeting/departure location:** unknown
- **transportation included:** unknown
- **pickup information:** unknown
- **check-in lead time:** unknown
- **minimum age:** unknown (rum/alcohol tasting may imply an adult minimum — NOT recorded as fact)
- **child restrictions:** unknown
- **traveler restrictions:** unknown
- **accessibility information:** unknown
- **physical-demand information:** unknown (walking tour)
- **cancellation policy:** unknown
- **reserve-now/pay-later support:** unknown
- **mobile interest tags:** Local Food, Culture & History
- **mobile price tier:** `$$$`
- **unknown fields:** all public-page fields above
- **proposed logistics class (HYPOTHESIS_ONLY — OWNER REVIEW REQUIRED):** port-adjacent (downtown walking tour; low confidence)
- **status:** `INCOMPLETE`

### 3. Discover Nassau Bahamas Guided City Tour and Historic Sites
- **internal ID:** `nassau_city_tour`
- **product code:** `d24115-195623P2`
- **title:** Discover Nassau Bahamas Guided City Tour and Historic Sites
- **exact affiliate URL:** `https://www.viator.com/tours/New-Providence-Island/Historical-and-Cultural-Tour/d24115-195623P2?pid=P00293644`
- **public product URL:** `https://www.viator.com/tours/New-Providence-Island/Historical-and-Cultural-Tour/d24115-195623P2`
- **category (mobile):** Culture
- **duration:** 3 Hours (mobile-listed single value)
- **start-time type:** unknown
- **meeting/departure location:** unknown
- **transportation included:** unknown
- **pickup information:** unknown
- **check-in lead time:** unknown
- **minimum age:** unknown
- **child restrictions:** unknown
- **traveler restrictions:** unknown
- **accessibility information:** unknown
- **physical-demand information:** unknown
- **cancellation policy:** unknown
- **reserve-now/pay-later support:** unknown
- **mobile interest tags:** Culture & History, Instagram Spots
- **mobile price tier:** `$$$$`
- **unknown fields:** all public-page fields above
- **proposed logistics class (HYPOTHESIS_ONLY — OWNER REVIEW REQUIRED):** road-transfer (low confidence)
- **status:** `INCOMPLETE`

### 4. Rose Island Swimming Pigs & Beach Snorkeling Experience Nassau
- **internal ID:** `nassau_rose_island`
- **product code:** `d24115-5574459P3`
- **title:** Rose Island Swimming Pigs & Beach Snorkeling Experience Nassau.
- **exact affiliate URL:** `https://www.viator.com/tours/New-Providence-Island/Rose-Island-Swimming-Pigs-and-Beach-Snorkeling-Experience-Nassau/d24115-5574459P3?pid=P00293644`
- **public product URL:** `https://www.viator.com/tours/New-Providence-Island/Rose-Island-Swimming-Pigs-and-Beach-Snorkeling-Experience-Nassau/d24115-5574459P3`
- **category (mobile):** Water Sports
- **duration:** 3 hours (mobile-listed single value)
- **start-time type:** unknown
- **meeting/departure location:** unknown
- **transportation included:** unknown
- **pickup information:** unknown
- **check-in lead time:** unknown
- **minimum age:** unknown
- **child restrictions:** unknown
- **traveler restrictions:** unknown (boat + water)
- **accessibility information:** unknown
- **physical-demand information:** unknown (snorkeling)
- **cancellation policy:** unknown
- **reserve-now/pay-later support:** unknown
- **mobile interest tags:** Nature & Wildlife, Beaches, Water Sports
- **mobile price tier:** `$$$`
- **unknown fields:** all public-page fields above
- **proposed logistics class (HYPOTHESIS_ONLY — OWNER REVIEW REQUIRED):** boat-or-remote (Rose Island reached by boat; low confidence)
- **status:** `INCOMPLETE`

### 5. Exclusive Swimming Pigs: Snorkeling, Lunch & Private Beach Club
- **internal ID:** `nassau_swimming_pigs`
- **product code:** `d420-52556P13`
- **title:** Nassau Swimming Pigs: Snorkeling, Lunch & Private Beach Club
- **exact affiliate URL:** `https://www.viator.com/tours/Nassau/Exclusive-Swimming-Pigs-Speed-Boat-Snorkeling-Beach-Bar-and-Grill-Package/d420-52556P13?pid=P00293644`
- **public product URL:** `https://www.viator.com/tours/Nassau/Exclusive-Swimming-Pigs-Speed-Boat-Snorkeling-Beach-Bar-and-Grill-Package/d420-52556P13`
- **category (mobile):** Nature
- **duration:** 4 hours (mobile-listed single value)
- **start-time type:** unknown
- **meeting/departure location:** unknown
- **transportation included:** unknown
- **pickup information:** unknown
- **check-in lead time:** unknown
- **minimum age:** unknown
- **child restrictions:** unknown
- **traveler restrictions:** unknown (speed boat + water)
- **accessibility information:** unknown
- **physical-demand information:** unknown (snorkeling)
- **cancellation policy:** unknown
- **reserve-now/pay-later support:** unknown
- **mobile interest tags:** Nature & Wildlife, Beaches, Local Food
- **mobile price tier:** `$$$`
- **unknown fields:** all public-page fields above
- **proposed logistics class (HYPOTHESIS_ONLY — OWNER REVIEW REQUIRED):** boat-or-remote (speed-boat package; low confidence)
- **status:** `INCOMPLETE`

### 6. FUN ATV Tour + JetSki Bundle with Beach Break
- **internal ID:** `nassau_atv_jetski`
- **product code:** `d24115-70706P8`
- **title:** FUN ATV Tour+JetSki Bundle with Beach Break Truly Sensational
- **exact affiliate URL:** `https://www.viator.com/tours/New-Providence-Island/3-Hour-3-passenger-ATV-Tour-of-Nassau-and-Paradise-Island-Inclusive-of-Lunch/d24115-70706P8?pid=P00293644`
- **public product URL:** `https://www.viator.com/tours/New-Providence-Island/3-Hour-3-passenger-ATV-Tour-of-Nassau-and-Paradise-Island-Inclusive-of-Lunch/d24115-70706P8`
- **category (mobile):** Water Sports
- **duration:** 4 Hours (mobile-listed single value)
- **start-time type:** unknown
- **meeting/departure location:** unknown
- **transportation included:** unknown
- **pickup information:** unknown
- **check-in lead time:** unknown
- **minimum age:** unknown (ATV + JetSki commonly age/license-restricted — NOT recorded as fact)
- **child restrictions:** unknown
- **traveler restrictions:** unknown (ATV/JetSki may restrict by age, license, weight)
- **accessibility information:** unknown
- **physical-demand information:** unknown (active)
- **cancellation policy:** unknown
- **reserve-now/pay-later support:** unknown
- **mobile interest tags:** Water Sports, Adventure, Beaches
- **mobile price tier:** `$$$$$`
- **note:** mobile title vs. URL slug differ (bundle title vs. 3-passenger ATV slug) — owner to confirm the product on the public page.
- **unknown fields:** all public-page fields above
- **proposed logistics class (HYPOTHESIS_ONLY — OWNER REVIEW REQUIRED):** road-transfer (low confidence)
- **status:** `INCOMPLETE`

### 7. 3 Hour Smart Eco Segway Adventure in Nassau
- **internal ID:** `nassau_segway`
- **product code:** `d24115-429802P1`
- **title:** 3 Hour Smart Eco Segway Adventure in Nassau
- **exact affiliate URL:** `https://www.viator.com/tours/New-Providence-Island/Bahamas-Eco-glide-Adventures/d24115-429802P1?pid=P00293644`
- **public product URL:** `https://www.viator.com/tours/New-Providence-Island/Bahamas-Eco-glide-Adventures/d24115-429802P1`
- **category (mobile):** Island Tours
- **duration:** 3 hours (mobile-listed single value)
- **start-time type:** unknown
- **meeting/departure location:** unknown
- **transportation included:** unknown
- **pickup information:** unknown
- **check-in lead time:** unknown
- **minimum age:** unknown (Segway tours commonly have age/weight limits — NOT recorded as fact)
- **child restrictions:** unknown
- **traveler restrictions:** unknown (Segway may restrict by age/weight)
- **accessibility information:** unknown
- **physical-demand information:** unknown
- **cancellation policy:** unknown
- **reserve-now/pay-later support:** unknown
- **mobile interest tags:** Nature & Wildlife, Culture & History
- **mobile price tier:** `$$$`
- **unknown fields:** all public-page fields above
- **proposed logistics class (HYPOTHESIS_ONLY — OWNER REVIEW REQUIRED):** port-adjacent (low confidence; Nassau Segway routes are often near the waterfront)
- **status:** `INCOMPLETE`

### 8. Nassau Jeep Tour with Full Bahamian Lunch and Drink
- **internal ID:** `nassau_jeep_lunch`
- **product code:** `d420-6917P11`
- **title:** Nassau Jeep tour with Full Bahamian Lunch and Drink
- **exact affiliate URL:** `https://www.viator.com/tours/Nassau/2-Hour-Jeep-Island-Tour/d420-6917P11?pid=P00293644`
- **public product URL:** `https://www.viator.com/tours/Nassau/2-Hour-Jeep-Island-Tour/d420-6917P11`
- **category (mobile):** Island Tours
- **duration:** 3 hours (mobile-listed; note URL slug says "2-Hour" — owner to confirm exact duration)
- **start-time type:** unknown
- **meeting/departure location:** unknown
- **transportation included:** unknown
- **pickup information:** unknown
- **check-in lead time:** unknown
- **minimum age:** unknown
- **child restrictions:** unknown
- **traveler restrictions:** unknown
- **accessibility information:** unknown
- **physical-demand information:** unknown
- **cancellation policy:** unknown
- **reserve-now/pay-later support:** unknown
- **mobile interest tags:** Local Food, Culture & History
- **mobile price tier:** `$$$$`
- **unknown fields:** all public-page fields above; duration discrepancy (mobile 3h vs URL slug 2h)
- **proposed logistics class (HYPOTHESIS_ONLY — OWNER REVIEW REQUIRED):** road-transfer (low confidence)
- **status:** `INCOMPLETE`

---

## Summary

| Metric | Value |
|---|---|
| Products reviewed | 12 (all Nassau mobile products) |
| Products curated | 8 |
| `COMPLETE_FOR_OWNER_REVIEW` | 0 |
| `INCOMPLETE` | 8 |
| `EXCLUDE_FROM_V1` | 0 |

**Proposed logistics classes (8):** port-adjacent ×2 (Rum, Segway), road-transfer
×4 (Massage, City, ATV+JetSki, Jeep), boat-or-remote ×2 (Rose Island, Swimming
Pigs). No numeric travel buffers assigned.

> **Every logistics class above is `HYPOTHESIS_ONLY — OWNER REVIEW REQUIRED`.**
> These are unverified proposals, not facts, and **must not be imported into
> production ranking data**. Affiliate URLs are unchanged. No new Viator research
> was performed in this pass.

**Blocker:** public Viator product pages are not accessible to automated read-only
fetch (HTTP 403). The §8 engine-critical fields (travel minutes,
start-time/meeting verification, min age, etc.) and the listed enrichment fields
remain `unknown` until the owner verifies them directly on the public product
pages or via authorized Viator Partner tooling. Until then, the production ranking
catalog cannot be finalized and the funnel shows neutral skeleton cards only.
