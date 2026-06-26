# ShoreDay Nassau V1 — Mobile App Integration Map

**Status:** Implementation reference, subordinate to
`docs/funnel/ShoreDay-Nassau-Funnel-V1-Spec.md`.
**Method:** Read-only inspection of the shipped Flutter app. No files in the
mobile repository were modified; no branches checked out; no packages installed;
no builds run. **Contains no API keys, secrets, or credentials.**

## Source repository (confirmed, unambiguous)

| Field | Value |
|---|---|
| Local path | `/Users/digimotion/Projects/bahamas-app (ShoreDay)/trip_planner` |
| Git remote | `https://github.com/Cam2420/BAH-tourist-app.git` |
| Branch at audit | `feature/android-buildout` |
| HEAD at audit | `0706be1` (`fix(android): … restricted shoreday-android-maps-key + bump to v1.0.3+16`) |
| App name / version | `trip_planner` / `1.0.3+16` |
| Origin | FlutterFlow-generated scaffold + hand-written `lib/` services, pages, data |

Exactly one non-cache `pubspec.yaml` was found on the machine, so identification
is unambiguous. The working tree has unrelated local modifications (`.DS_Store`,
`.dart_tool/`, web splash assets); none were touched.

---

## A. Firebase

| Item | Finding | Source |
|---|---|---|
| Project ID | `bah-tourist-app` | `lib/firebase_options.dart` |
| messagingSenderId | `163629108646` | `lib/firebase_options.dart` |
| storageBucket | `bah-tourist-app.firebasestorage.app` | `lib/firebase_options.dart` |
| iOS / Android same project | **Yes** — all platform option blocks resolve to the same `projectId` (`bah-tourist-app`) | `lib/firebase_options.dart` |
| Auth methods (in code) | **Anonymous** (default) + **Email/Password** | `lib/main.dart`, `lib/services/auth_service.dart` |
| Anonymous-auth flow | On launch: if `currentUser == null` → `signInAnonymously()` (with timeout + graceful failure). If an existing **non-anonymous** user is present at launch, the app `signOut()`s them and resets the Adapty device profile. | `lib/main.dart:79–94` |
| Optional email signup | `AuthService.signUp(email, password, marketingOptIn, firstName)` → `createUserWithEmailAndPassword` then writes the user profile doc. Sign-in, password reset, and account deletion also implemented. | `lib/services/auth_service.dart` |
| Itinerary persistence model | **Hybrid.** Premium itineraries are generated in memory by `GeminiService` (`locationNotifier`); persistence to Firestore (`saveItinerary`) and favorites require a **non-anonymous** (email) user. Free users see a static partial preview. | `lib/services/firestore_service.dart`, `lib/components/favorite_spot_card.dart:114`, `lib/pages/generated_itinerary_page.dart:292`, `lib/data/preview_itinerary_data.dart` |
| Remote Config | `adapty_enabled` (default `true`) — a kill-switch read at call time that toggles paywall/premium gating. No evidence Remote Config influences excursion selection. | `lib/main.dart:43–49`, `lib/services/adapty_service.dart` |

### Firestore collections referenced by the shipped app

| Path | Purpose | Fields written (in code) |
|---|---|---|
| `users/{uid}` | Profile | `email`, `firstName`, `createdAt` (serverTimestamp), `marketingOptIn` |
| `users/{uid}/saved_itineraries/{autoId}` | Saved itinerary | `port`, `hours` (int), `companion`, `interests` (string[]), `stops` (array of stop JSON), `summary`, `mustBeBackBy`, `totalTime`, `title` (`"$port Day Trip"`), `createdAt` |
| `users/{uid}/favorites/{…}` | Saved/favorite spots | Managed by `favorites_manager.dart`; deleted as a batch on account deletion |

**Saved-itinerary `stops` schema** (`lib/models/itinerary_model.dart`,
`ItineraryStop`): `placeId?`, `time`, `endTime`, `activity`, `description`,
`category`, `latitude?`, `longitude?`, `cost?`, `travelTime?`, `rating?`,
`photoUrl?`, `photoUrls?`, `openingHours?`, `localSecret?`, `name?`,
`userRatingsTotal?`. The parent `Itinerary`: `port`, `totalTime`, `stops[]`,
`mustBeBackBy`, `summary`.

> **Web-funnel implication:** the spec §21.7 decision to use a **separate**
> `plans` collection is consistent with the mobile app, which namespaces all user
> data under `users/{uid}/…`. The web `plans` collection will not collide.
> The web funnel does not require Firebase Auth (server-side plan creation),
> whereas the mobile app gates persistence behind email auth.

---

## B. Excursion catalog

| Item | Finding |
|---|---|
| Source file | `lib/data/excursions_data.dart` (`const allExcursions`) |
| Model | `ExcursionModel { id, port, title, duration (String), uiTabCategory, aiMatchTags (String[]), priceTier (String, `$`–`$$$$$`), price (String), affiliateUrl, imageUrls (String[]) }` |
| Nassau excursions | **12** (full table below) |
| Other ports (out of V1 scope) | Freeport ×6, Bimini ×4 |
| Affiliate URLs | All Viator, all with `?pid=P00293644`; preserved verbatim below |

### Nassau excursions (12) — verbatim extract

| id | title | duration | uiTabCategory | aiMatchTags | priceTier | price | viator product (from URL) |
|---|---|---|---|---|---|---|---|
| `nassau_swimming_pigs` | Nassau Swimming Pigs: Snorkeling, Lunch & Private Beach Club | 4 hours | Nature | Nature & Wildlife, Beaches, Local Food | `$$$` | $140.00 pp | `d420-52556P13` |
| `nassau_pirate_jeep` | Pirate Jeep Sightseeing Adventure | 3 hours | Island Tours | Culture & History, Instagram Spots | `$$$` | $165.00 pp | `d24115-252813P1` |
| `nassau_atv_tour` | Atv Tour of Nassau + Beach Break (Everyone Drive Their Own Atv) | 4 Hours | Adventure | Nature & Wildlife, Beaches | `$$$` | $99.00 pp | `d420-70706P11` |
| `nassau_rum_tasting` | Rum Tasting and Food Walking Tour in Nassau Bahamas | 3 Hours | Culture | Local Food, Culture & History | `$$$` | $98.00 pp | `d420-6558RUM` |
| `nassau_bites_walking` | Bites of Nassau Food and Walking Tour | 3 Hours | Culture | Local Food, Culture & History | `$$$` | $99.00 pp | `d420-5887SGBITES` |
| `nassau_trike_tour` | Nassau Trike Site and Beach Tour | 3 Hours | Island Tours | Culture & History, Beaches | `$$$$` | $100.00 pp | `d24115-429802P2` |
| `nassau_segway` | 3 Hour Smart Eco Segway Adventure in Nassau | 3 hours | Island Tours | Nature & Wildlife, Culture & History | `$$$` | $99.00 pp | `d24115-429802P1` |
| `nassau_atv_jetski` | FUN ATV Tour+JetSki Bundle with Beach Break Truly Sensational | 4 Hours | Water Sports | Water Sports, Adventure, Beaches | `$$$$$` | $249.00 pp | `d24115-70706P8` |
| `nassau_jeep_lunch` | Nassau Jeep tour with Full Bahamian Lunch and Drink | 3 hours | Island Tours | Local Food, Culture & History | `$$$$` | $150.00 pp | `d420-6917P11` |
| `nassau_city_tour` | Discover Nassau Bahamas Guided City Tour and Historic Sites | 3 Hours | Culture | Culture & History, Instagram Spots | `$$$$` | $120.00 pp | `d24115-195623P2` |
| `nassau_rose_island` | Rose Island Swimming Pigs & Beach Snorkeling Experience Nassau. | 3 hours | Water Sports | Nature & Wildlife, Beaches, Water Sports | `$$$` | $89.00 pp | `d24115-5574459P3` |
| `nassau_beach_massage` | Luxury Beach Massage in Nassau Bahamas with Transportation | 1 Hour | Nature | Beaches, Instagram Spots | `$$$$$` | $265.00 pp | `d420-465758P4` |

Exact affiliate URLs are preserved in `data/excursions/nassau.ts` (web repo);
they are not re-listed here to keep a single source of record.

### Fields the mobile catalog does NOT contain

The spec §8 `Excursion` type and eligibility/ranking math require fields that are
**absent** from `excursions_data.dart`:

`outboundTravelMinutes`, `returnTravelMinutes`, `startTimeFlexibility`
(`fixed`/`multiple`/`open`), `partyTypes`, `minAge`, `familyFit` (1–5),
`logisticsEase` (1–5), `vendorPressureFit` (1–5), per-excursion
`minimumUsableMinutes`, `active`, cancellation note, reserve-now/pay-later note.

`durationMinutes` and `viatorProductCode` are derivable from the existing string
fields; `budgetTier` and `priorities` could be mapped from `priceTier`/`aiMatchTags`
with owner-approved mapping rules. The scheduling- and scoring-critical fields
above have **no source** and must be curated by the owner. → **Phase 9 blocker.**

---

## C. App routing — “Book Now” (excursion → Viator)

Real Book Now control: `lib/widgets/excursion_card.dart` (≈ lines 152–190).

1. **Logs first:** `AnalyticsService.logExcursionTapBook(excursionId: e.id, name: e.title, partnerUrl: e.affiliateUrl)` is called **before** navigation.
2. **Android:** `Navigator.push` → `BookingWebViewScreen(url: e.affiliateUrl, tourTitle: e.title)` — a custom **in-app WebView** screen.
3. **iOS:** `launchUrl(Uri.parse(e.affiliateUrl), mode: LaunchMode.inAppWebView)` — system **in-app WebView**.
4. **URL:** the exact stored `affiliateUrl` (already carries `pid=P00293644`). No UTM/campaign/PII appended at launch time.
5. **Fallback:** on failure, a SnackBar (“Could not open booking link.”). No curated-shop fallback in this path; the `vi.me/s/shoredayapp` storefront is a separate marketing link, not the app’s Book Now route.

> A separate button in `lib/pages/excursion_detail_screen.dart` (≈ line 615)
> opens **Google Maps search** for the activity — that is a directions helper,
> **not** the affiliate Book Now.
>
> **Web-funnel implication:** the brief flags that raw in-app WebViews can break
> Viator cookie attribution. The web funnel should route Book Now as a normal
> outbound navigation (new tab / top-level) to the exact affiliate URL, logging
> the click server-side first (spec §21.5). Do not append PII.

---

## D. Port-day data

Mobile onboarding model `OnboardingData` (`lib/models/onboarding_data.dart`) and
the `ff_onboardingData` SharedPreferences blob (`lib/app_state.dart`):

| Field | Type | Notes |
|---|---|---|
| `selectedPort` | String | e.g. `Nassau` |
| `startTime` | String | step-off / day start |
| `allAboardTime` | String / `TimeOfDay?` | captured directly from the user |
| `travelCompanion` | String | |
| `selectedInterests` | String[] | |
| `otherInterests` | String | free text |

Derived/persisted on save: `hours` (int usable hours), `companion`, `interests`,
`mustBeBackBy` (String), `totalTime`, `summary`, `stops` (see §A).

Port geography: `lib/services/port_data.dart` (`PortData`) holds **only**
`portName`, `fullName`, `lat`, `lng`, `mapCenter` per port. Nassau →
**Prince George Wharf** (`25.0780, -77.3390`).

**Departure reminders:** present as an app concept (`departure_alert_set` event
in spec §12; notifications UI exists); details out of scope for this map.

> **Critical for Phase 7:** the mobile app captures `startTime` and
> `allAboardTime` and surfaces them in copy / feeds them to Gemini, but performs
> **no deterministic terminal-buffer / contingency / minimum-usable-window
> calculation**. There is no `terminalBufferMinutes`, `contingencyMinutes`, or
> `minimumUsableMinutes` anywhere in the mobile code. The web port-math engine is
> genuinely new and cannot inherit these constants from the app. → **Phase 7
> blocker** (numeric `PortConfig` values require owner lock).

---

## E. Entitlements

Entitlement logic: `lib/services/adapty_service.dart`; paywall:
`lib/screens/paywall_screen.dart`; placement id `cruise_itinerary_gate`.

| Tier | Code-enforced behavior |
|---|---|
| **Free** (anonymous or non-premium) | Excursion browsing; static **partial** itinerary preview (`preview_itinerary_data.dart`); limited concierge (spec: 3 AI questions). Cannot persist itineraries/favorites to Firestore (requires email auth). |
| **Port Pass** | Detected as Adapty **non-subscription** `app.shoreday.portpass`. Flips the single `premium` unlock. |
| **Premium Explorer** | Detected as Adapty **access level** `premium` (`accessLevels['premium'].isActive`). Flips the same `premium` unlock. |

`checkPremiumAccess()` returns premium if **either** the `premium` access level is
active **or** the `app.shoreday.portpass` non-subscription exists →
`isPremiumNotifier` (a single boolean). Therefore:

> **Port Pass and Premium Explorer grant identical access in code.** There is
> **no** code-enforced “one port vs all ports” distinction. This answers the open
> audit question in `docs/00-current-brief.md` §6.3 and §2 (“Verify the live Port
> Pass entitlement truly limits access to one port”): it does **not**. Spec §21.3
> therefore forbids marketing a Port-Pass-vs-Premium entitlement distinction the
> app does not enforce.

Additional enforced behavior:

- **Remote kill-switch:** if Remote Config `adapty_enabled` is `false`,
  `checkPremiumAccess()` returns `false` (everyone treated as free; paywall
  effectively disabled). Defaults to `true`/enabled on any read failure.
- **App-review bypass:** a signed-in user with email `review@shoreday.app` is
  always granted premium (precedes the kill-switch).
- Subscription prices are sourced from Adapty/the stores, not hardcoded in `lib/`
  (consistent with the brief: Port Pass $9.99 one-time, Premium Explorer
  $19.99/yr).

---

## Secret handling

All third-party keys are environment-managed via `flutter_dotenv` (`.env`,
`.env.example` present in the mobile repo): `ADAPTY_PUBLIC_SDK_KEY`,
`GOOGLE_MAPS_STATIC_KEY`, `GOOGLE_PLACES_API_KEY` / `SHOREDAY_PLACES_KEY`.
No key values were read or copied into this document. Firebase identifiers
(`projectId`, `messagingSenderId`, `storageBucket`) are non-secret client config
and are recorded above for integration planning only.
