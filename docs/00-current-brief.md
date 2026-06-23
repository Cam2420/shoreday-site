# ShoreDay Decisions Draft

_Status: working decision brief. Evidence labels reflect the two source documents; ShoreDay-specific behavior still needs validation._

## 1) ICP & Segments

**Primary — “The Confident Planner”**

- U.S.-based cruise planner, likely a woman aged roughly 28–44, visiting Nassau for the first time or first time in years.
- Usually plans for a partner, friends, or a small family of 2–4 people.
- Researches on TikTok, Google, YouTube, and cruise communities after booking and before the port date.
- Wants a memorable day without wasting limited shore time, overpaying, being scammed, or getting back late.
- Highest fit when she has not finalized the port day and is comparing independent activities with cruise-line excursions.

**Secondary — “The Protective Parent”**

- Likely a mother aged roughly 33–48 planning for a family of 3–5 with school-age children.
- Needs age-appropriate options, simple logistics, credible reviews, and conservative return timing.
- Has higher excursion order value than couples, but also higher trust requirements and more group coordination.

**Later / lower priority — Repeat Cruiser or DIY Explorer**

- Experienced cruiser or repeat Nassau visitor who wants non-obvious local options and avoids cruise-line excursions.
- More skeptical of AI and less likely to pay for information available through Google, Reddit, or prior experience.
- Useful for affiliate revenue and insider content, but not the first segment to optimize around.

**Port decision**

- Prove the model in Nassau first. The research base, search demand, passenger volume, and VOC evidence are materially stronger for Nassau than for Freeport or Bimini.
- Do not assume Nassau’s ICP, content angles, conversion rates, or willingness to pay transfer unchanged to the other ports.
- A strict “2–4 weeks before sailing” window is **not verified**. The documents support a broader active-planning range of roughly 2–8 weeks, with timing varying by traveler and excursion type. Capture `days_to_port` rather than hard-coding one window.

## 2) Value Proposition & Offer

**Core promise**

ShoreDay helps Bahamas cruise passengers build a realistic port-day plan around their confirmed all-aboard time, choose activities that fit the available window, and manage the day from their phone. Its differentiation is cruise-specific timing and local decision support—not generic AI itinerary generation.

**Main benefits and proof points**

- Converts scheduled port time into a more realistic usable window that accounts for disembarkation, all-aboard, return travel, and contingency.
- Reduces planning overload by combining a timed plan, curated excursions, local knowledge, maps, and on-port assistance.
- Helps travelers compare independent options while preserving return-to-ship confidence.
- Addresses repeatedly observed concerns: missing the ship, wasting the day, aggressive vendors, inflated prices, family fit, and uncertainty about what is worth doing.
- Nassau is a large, growing cruise market; return-timing anxiety and pre-arrival excursion research are recurring behaviors in the source research.

**Current app offer**

- Before payment: excursion browsing plus three AI concierge responses.
- **Port Pass:** $9.99 one-time, intended to unlock one port.
- **Premium Explorer:** $19.99/year, intended to unlock all supported ports.
- Premium value stack: full itinerary generation, unlimited concierge, map/directions, insider tips, saved plans/places, countdown, and departure reminders.
- Planned acquisition layer: short web quiz → Back-to-Ship preview → email-saved plan → curated excursion recommendations → app handoff.

**Still hypotheses**

- That three free concierge responses are the optimal preview.
- That $9.99 is the strongest Port Pass price.
- That the hard paywall will convert meaningfully from cold social traffic.
- That users value a full hourly itinerary more than one well-chosen anchor activity.
- Whether the live Port Pass entitlement truly limits access to one port; this must be audited before scaling.

**Source disagreement:** usable-time estimates vary across the research sections. Do not publish one universal “you have X hours” rule; calculate from the actual call and user-confirmed all-aboard time.

## 3) GTM Strategy

**Operating rules from the books**

- Validate the customer and Jobs to Be Done before adding funnel complexity.
- Use one primary action per page, owned email, one-variable tests, and a single North Star metric.
- For cold traffic: bridge page → short quiz → useful result → relevant recommendation → email nurture → next offer.

**Priority channels**

1. **TikTok Search:** strongest current signal; use search-led utility content rather than broad entertainment.
2. **Direct Nassau planner + Google SEO:** highest-intent, measurable, and compounding; replace the Beacons hub once the planner is live.
3. **Kit email:** owns the audience and enables date-based progression from planning to port-day app use.
4. **Reddit and cruise communities:** high trust and planning intent; participate value-first before mentioning ShoreDay.
5. **YouTube Shorts/long-form and micro-creators:** repurpose proven TikTok topics and borrow trust after the core funnel works.
6. **Instagram:** repurposing and credibility layer, not a separate strategy initially.
7. **Paid acquisition:** defer until organic attribution and unit economics are proven.

**Sequence to the first 100 paying app users**

- **Foundation / users 0–10:** audit entitlements and Viator attribution; instrument the full funnel; interview 20 upcoming Nassau travelers; launch one Nassau planner with one CTA.
- **Organic proof / users 10–30:** publish three TikTok Search posts weekly, one high-intent SEO page weekly, value-first Reddit answers, and the minimum Kit sequence.
- **Optimization / users 30–60:** fix only the largest measured drop-off; test preview depth, excursion-card trust elements, paywall trigger, and Port Pass price.
- **Repeatable distribution / users 60–100:** expand winning ship-specific pages, secure a small number of cruise/family creator partnerships, repurpose into YouTube and Instagram, and repeat only content that produces verified plans or purchases.
- Count Port Pass and annual purchases as **paying users**; track attributed Viator orders separately as **monetized plans**.

**Content themes that should dominate**

- Port math: scheduled call vs usable time; all-aboard vs departure.
- First-timer mistakes, return timing, taxi pricing, scams, and vendor pressure.
- Cruise-line excursion vs independent option: cost, trust, and logistics.
- “One main activity that fits” and realistic itinerary examples.
- Nassau with children and group coordination.
- Real local food and places vs tourist traps.
- Product demonstrations close to the port date, when app value is highest.

## 4) Monetization Model

- **Stage 1 — Affiliate:** curated Viator excursions are the lower-friction early monetization path. Verified terms are 8% on completed bookings with a 30-day attribution window.
- **Stage 2 — App:** Port Pass nets about $8.49 and Premium Explorer about $16.99 after an assumed 15% app-store fee.
- **Dual monetization:** the same traveler may book an excursion and later purchase app access.

**Time-routed offer decision**

- `14+ days`: excursion-led.
- `7–13 days`: excursion and app side by side.
- `<7 days`: app-led.
- Port day: premium concierge/timing moment.

**Constraints**

- Standard Viator access provides aggregate reporting, not named-user booking confirmation.
- Commission is recognized after the experience is completed, creating revenue lag.
- Verify that in-app links preserve Viator cookies; raw iOS WebViews may break attribution.
- Do not buy traffic until organic excursion conversion, app conversion, and attribution are measurable.
- Modeled conversion rates and revenue projections are assumptions, not ShoreDay evidence.

**North Star decision**

Use **net revenue per verified port plan**, where a verified plan includes port/date, confirmed all-aboard time, and full results viewed. Treat TikTok profile conversion and revenue per 100 profile visits as channel diagnostics, not the company North Star.

## 5) Voice of Customer (VOC) Highlights

1. **[VERIFIED FACT]** “The posted port call is not the time I actually have ashore.”
2. **[STRONG INFERENCE]** “My biggest fear is getting back late or missing the ship.”
3. **[STRONG INFERENCE]** “Nassau has me overwhelmed; I do not know what to do.”
4. **[STRONG INFERENCE]** “I do not want aggressive vendors, scams, or inflated taxi prices.”
5. **[STRONG INFERENCE]** “Cruise-line excursions cost more, but the peace of mind matters.”
6. **[STRONG INFERENCE]** “Independent is cheaper, but what happens if it runs late?”
7. **[HYPOTHESIS]** “I want one worthwhile activity that fits—not a packed day.”
8. **[STRONG INFERENCE]** “Find something kid-friendly and reasonably close to port.”
9. **[STRONG INFERENCE]** “Show me real local food and places, not tourist traps.”
10. **[HYPOTHESIS]** “I can Google this for free; prove why ShoreDay is worth $9.99.”

**VOC conflict:** public conversations disagree on whether Nassau is unsafe or simply busy and unfamiliar. Messaging should reduce uncertainty and encourage planning without portraying Nassau as inherently dangerous.

## 6) Open Questions / Experiments

1. Recruit and interview 20 upcoming Nassau planners, with quotas for couples, families, first-timers, repeaters, booked, unbooked, and DIY travelers.
2. Instrument: store view → install → onboarding → excursion tab → concierge Q1/Q3 → paywall → Port Pass/annual.
3. Audit whether Port Pass and Premium Explorer currently produce meaningfully different entitlements.
4. Measure who plans, who pays, and whether group approval is required before purchase.
5. Record actual `days_to_port` for every verified plan, excursion click, app install, and purchase.
6. Test excursion-first, app-first, and time-routed CTAs against revenue per verified plan.
7. Test how much itinerary value must appear before the email gate.
8. Test the three-field quiz against a version that adds ship/date; measure completion and recommendation quality.
9. Test one, three, and five free concierge responses before paywall.
10. Test Port Pass pricing and paywall framing without changing multiple variables simultaneously.
11. Identify which premium feature most predicts purchase and post-purchase use.
12. Verify Viator attribution on web, iOS, and Android and document exactly what booking data Basic Access exposes.
13. Test excursion cards with and without reviews, duration, meeting-point clarity, cancellation terms, and return-margin guidance.
14. Measure repeated-setup friction between the web planner and app onboarding; test plan import or prefill.
15. Compare couples vs families and ship-specific landing pages using purchases and affiliate revenue—not views or clicks.

## 7) Platform & Operational Decisions

2026-06-23 — Email platform cutover: The owner confirmed MailerLite has zero subscribers. MailerLite is retired immediately with no contact migration or coexistence period. New ShoreDay web captures use Kit. The Nassau Cheat Sheet signup redirects immediately to the existing Nassau Survival Card; M1 does not require an incentive email, sequence, or automation.

2026-06-23 — Nassau resource naming and visual system: The owner selected ‘The Nassau Port Playbook’ as the visible opt-in resource name and ‘Your Nassau Port Playbook’ as the resulting guide name. Existing route paths remain unchanged during M1. ShoreDay adopts the Lagoon + Sand visual system for its Nassau and primary web marketing surfaces, replacing dark navy as the dominant large-panel color.

2026-06-23 — Nassau Funnel V1 launch decisions (foundation gate): The owner locked the V1 funnel for the foundation build. Full detail is recorded in `docs/funnel/ShoreDay-Nassau-Funnel-V1-Spec.md` §21. Summary:

- **Funnel order:** Nassau onboarding → deterministic all-aboard calculator → partial preview → email gate → full results → three excursion recommendations → “Book Now” via the exact existing mobile-app Viator affiliate URL → action-based follow-up email → app download/upgrade after the excursion cards.
- **Free web value (finite):** usable port window, recommended return-to-pier target, one deterministic day structure, selected traveler profile/interests, three timing-eligible excursions, one saved-plan URL. It does **not** provide unlimited/AI itinerary generation, full concierge, full maps, full insider tips, guaranteed return, or booking confirmation.
- **App monetization:** premium value (multiple itinerary generations, regeneration/alternatives, full concierge, full map, complete insider tips) is whatever the live apps actually enforce. Do **not** market entitlement distinctions the live apps do not yet enforce. (Audit finding: the live app grants a single `premium` unlock — Port Pass and Premium Explorer flip the same flag; see Mobile Integration Map §E.)
- **App handoff:** web→app plan import and cross-device email auth are deferred to V1.1. V1 must **not** require app download, ShoreDay account creation, Firebase email auth, or password creation. The results page may promote the app after the excursion cards.
- **Excursion conversion is the primary V1 revenue objective.** CTA may read “Book Now” (need not say “Book on Viator”); affiliate disclosure stays visible adjacent to the CTA group. ShoreDay logs excursion impression, click, and outbound affiliate navigation, and must **not** claim a booking is confirmed. Lifecycle segmentation uses `excursion_clicked` / `did not click` — never automated `booked` / `did not book` states until verified booking data exists.
- **Google services deferred:** no Maps/Places/traffic/ETA. V1 excursion timing uses only deterministic all-aboard math, controlled excursion durations, and controlled transport/buffer classifications.
- **Firebase:** prefer sharing the existing mobile Firebase project (`bah-tourist-app`) if the read-only audit confirms it is appropriate; use a **separate** Firestore `plans` collection for the web funnel; favor server-side plan creation/retrieval; the browser does not require Firebase Auth in V1. No credentials in repo docs.
- **Basic itinerary:** deterministic and finite (step ashore/orientation → one anchor activity → optional flexible local time → begin return → recommended pier target). No invented exact times beyond port-math output.
- **Routes:** keep spec routes `/nassau`, `/nassau/plan`, `/nassau/results/[planId]`, `/nassau/plan/[planId]`. Existing route paths remain available until a separately approved production cutover.
