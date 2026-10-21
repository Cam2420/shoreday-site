# ShoreDay SEO and conversion review — October 20, 2026

Visitors now see the $9.99 group offer, offline backup, human support window and refund condition before the longer homepage story. The page presents one WhatsApp conversation, with a realistic iPhone and light-mode adaptations of Cam’s supplied chats. All chat excerpts share WhatsApp headers, message bubbles and composer controls. The photo feature uses the supplied Government House recognition exchange. Six Nassau guides and three ship pages lead to the same unchanged WhatsApp entry point.

Draft for Cam’s claims and visual review. No production deployment or merge. `vercel.json` disables automatic Git deployment only for `codex/shoreday-live-edits`, following [Vercel’s branch deployment setting](https://vercel.com/docs/project-configuration/git-configuration#git.deploymentenabled). Production remains on `main`.

## Pages and metadata

| Page | Title | Meta description | H1 | Primary keyword |
|---|---|---|---|---|
| / | Nassau Cruise Port Day Plan \| ShoreDay | Your Nassau day in one WhatsApp chat: a personal plan, offline PDF, photo answers and voice notes. $9.99 once for your whole group. | Your Nassau port-day concierge, built around your ship’s all-aboard time. | nassau cruise port day plan |
| /nassau-cruise-app | Nassau Cruise App: One WhatsApp Chat \| ShoreDay | Your Nassau cruise app can be a WhatsApp chat. Keep your plan, PDF, voice notes and photo answers together. $9.99 once for your whole group. | Your Nassau cruise app is a WhatsApp chat. | nassau cruise app |
| /nassau-cruise-port-walking-distance | Things to Do Near Nassau Cruise Port Walking Distance | Plan a walk from Nassau cruise port around your group, a food or heritage stop and your return time. $9.99 once for your whole group. | Things to do near Nassau cruise port, within walking distance. | things to do near nassau cruise port walking distance |
| /nassau-all-aboard-time | What Time Do I Need to Be Back on the Ship in Nassau? | Understand Nassau all-aboard, back-at-pier and leave-by times. Work backward from your ship’s own deadline. $9.99 once for your whole group. | What time do I need to be back on the ship in Nassau? | what time do I need to be back on the ship in nassau |
| /nassau-cruise-with-kids | Nassau Cruise Port With Kids \| ShoreDay | Build a Nassau cruise port day around your kids’ ages, walking preferences and ship’s return time. $9.99 once for your whole group. | Nassau cruise port with kids: plan for your family’s pace. | nassau cruise port with kids |
| /is-nassau-worth-getting-off-the-ship | Is It Worth Getting Off the Ship in Nassau? \| ShoreDay | First Nassau visit or repeat cruise? Choose a short day for your interests, group and ship’s clock. $9.99 once for your whole group. | Is it worth getting off the ship in Nassau? | is it worth getting off the ship in nassau |
| /nassau-cash-or-card | How Much Cash Do I Need in Nassau? \| ShoreDay | Plan Nassau spending around food, rides and tours. Ask about payment, extra charges and menu photos. $9.99 once for your whole group. | How much cash do I need in Nassau? | how much cash do I need in nassau |
| /ships/wonder-of-the-seas-nassau | Wonder of the Seas Nassau Itinerary \| ShoreDay | Plan your Wonder of the Seas Nassau itinerary around your ship’s all-aboard time, group and budget. $9.99 once for your whole group. | Your Wonder of the Seas Nassau itinerary, at your pace. | wonder of the seas nassau itinerary |
| /ships/disney-wish-nassau | Disney Wish Nassau Itinerary \| ShoreDay | Plan your Disney Wish Nassau itinerary with children’s ages, walking preferences and return time in mind. $9.99 once for your whole group. | Your Disney Wish Nassau itinerary, built for your group. | disney wish nassau itinerary |
| /ships/msc-seaside-nassau | MSC Seaside Nassau Itinerary \| ShoreDay | Shape your MSC Seaside Nassau itinerary around local food, a walk or a beach and your ship’s return time. $9.99 once for your whole group. | Your MSC Seaside Nassau itinerary, in one chat. | msc seaside nassau itinerary |
| /concierge-terms | ShoreDay Nassau Concierge — Terms | What the $9.99 ShoreDay Nassau Concierge includes, refunds, and support. | ShoreDay Nassau Concierge — Terms | Existing legal/resource page; no new target |
| /privacy | ShoreDay – Privacy Policy | How VMAManagement LLC (ShoreDay) collects, uses, and protects your personal information. | ShoreDay Privacy Policy | Existing legal/resource page; no new target |
| /terms | ShoreDay – Terms of Service | The Terms of Service governing your use of the ShoreDay app by VMAManagement LLC. | ShoreDay Terms of Service | Existing legal/resource page; no new target |
| /nassau-cheat-sheet | Free Nassau Survival Card \| ShoreDay | Get the free Nassau Survival Card with all-aboard timing, taxi-fare guidance, and practical tips for your cruise stop. | The Nassau Survival Card | Existing legal/resource page; no new target |
| /nassau-survival-card | Nassau Survival Card \| ShoreDay | Plan your Nassau port day around all-aboard timing, local food and a realistic return window. $9.99 once for your whole group. | Make Nassau feel simple before you step off the ship | Existing legal/resource page; no new target |

Additional changes: `/concierge-terms`, `/privacy` and `/terms` gain shared social imagery and breadcrumb schema; their legal bodies are unchanged. `/nassau-survival-card` loses unsupported fare tables and negative vendor language. `/nassau-cheat-sheet` loses “traps” and unverified savings copy; it remains noindex and unlinked. Existing planner, results, checkout and PDF-delivery flows are preserved.

The 13 indexable canonical pages appear in `sitemap.xml`. `robots.txt` permits page crawling, excludes `/api/`, and points to the sitemap. Noindex funnel routes are excluded from the sitemap without blocking crawlers from reading their noindex tags. `/llms.txt` summarizes the same offer and limits.

## Claim-to-source mapping

“Brief” means Cam’s supplied **SEO + conversion update v2, October 20, 2026**. The rows below cover factual claims introduced or retained in this marketing update, including equivalent FAQ, structured-data and llms.txt statements. Unchanged legal documents remain their own source; this update does not certify their legal or technical assertions.

| Claim or factual family | Source | Treatment / locations |
|---|---|---|
| $9.99 USD once, whole group, one WhatsApp number, one Nassau port call | Owner’s latest October 20 price update; Concierge Terms “What you get” as updated | Home, every final CTA, guides, FAQ, chat offer/checkout previews, Product/Offer schema, social previews and llms.txt |
| Free to message before purchase | Brief §1 offer; existing Home FAQ | Hero, CTA notes, FAQ and guides |
| Full refund before the personalized plan is sent; non-refundable afterward unless described service is not provided | Concierge Terms “Refunds” | Home pricing, FAQ, llms.txt and checkout chat excerpt; terms wording wins |
| Food, rides, activities, admissions and tours cost extra | Brief §1 offer; supplied IMG_1732/1733 | Home, guide FAQs and chat; no bundled tour purchase implied |
| Independent; unaffiliated with cruise lines or Nassau Cruise Port | Brief §1 offer; Concierge Terms “Important” | Cruise fit line, guides, footer, llms.txt |
| Nassau only; no planning for other ports or private-island stops | Brief §1 offer | Home and all ship FAQs |
| Personal plan uses ship, Nassau date, all-aboard, group, budget and day preferences | Brief §1 definition and feature table; §2 audience | Home, guides and llms.txt |
| Plan works backward from all-aboard; leave-by and back-at-pier targets | Brief §1 planning and countdown rows; §4 timing example | Home, timing guide, ship pages, example chat |
| Ship’s official all-aboard and onboard instructions take priority; times/recommendations are estimates | Concierge Terms “Important”; Brief §1 prohibited claims | Home, timing guide, FAQ and ship pages |
| All-aboard differs from scheduled departure; pier target is earlier | Brief §3 timing page requirements; §4 worked example | Timing guide; no schedule departure is labeled all-aboard |
| 7:00 PM minus 60 minutes = 6:00 PM pier; minus 30-minute ride = 5:30 PM leave-by | Brief §4 worked example; arithmetic | Explicit illustrative allowances, not a universal buffer or actual route estimate |
| At 11:36 AM, 5:30 PM is 5 hours 54 minutes away | Brief §1 countdown; arithmetic | Explicit illustration in chat and timing guide |
| Exact countdown requested in chat | Brief §1 countdown row; arithmetic worked example | Removed unverified implementation detail about the external engine |
| Day shapes: beach/water, walkable downtown, local food, heritage | Brief §1 day-shapes row | Home experience cards and guides; no distances, access or venue hours promised |
| Send menus, price boards, signs and recognizable landmarks; ask for more detail when unclear | Brief §1 photo row and prohibited claims | Home, FAQ, guides; no location inference from generic scenes |
| Government House on Mount Fitzwilliam in downtown Nassau; statue on front steps | Cam’s supplied `Screenshot 2026-10-20 at 1.38.04 PM.png`, showing both photo and recognition reply | “Snap it. Ask it.” feature tile, shortened light-mode excerpt. No added residence or access claims |
| Short videos and PDFs, including excursion confirmations, can be sent | Brief §1 video/PDF row; IMG_1725 | Home, app guide, FAQ and llms.txt |
| 17-page Playbook: orientation map, timing worksheet, day shapes, page 17 back-to-ship card | Brief §1 offline row; IMG_1725 | Home, PDF card, FAQ and guides |
| Voice replies when guest speaks first or requests one | Brief §1 voice row; §2A.2; IMG_1705; supplied 3:29 PM screenshot | Feature tile and scrolling phone now include the received 0:10 audio reply and transcript. Audio controls are a labeled visual preview, with no fabricated recording |
| Google Maps links for ATM, pharmacy or beach, with directions/hours/reviews | Brief §1 maps row; IMG_1707/1708; supplied 3:29 PM screenshot | Feature tile recreates the supplied Scotiabank thumbnail, place title, Maps link and dated reply. Confirm on arrival; the excerpt is not a current availability guarantee |
| Weather questions in the same chat | Owner-supplied IMG_1736 | Weather exchange replaces the ATM question in the scrolling phone only. Explicitly labeled an October 2026 example, not a live forecast |
| Scotiabank at Rawson Square and Bay Street | Supplied IMG_1707/1708 | Dated, shortened chat excerpt only; no current hours, fees or “closest” guarantee |
| Goldie’s Conch House at Arawak Cay; pictured conch salad $15, cracked conch $16, banner 10% VAT + 15% gratuity | Brief §1 photo row; IMG_1721/1722 | Dated October 2026 proof caption. Confirm current prices. No general price list or rule for other businesses |
| Automated answers during access; real person available daily 12–5 PM ET; type HUMAN | Owner’s latest October 20 support-hours instruction; Concierge Terms “Support” | Hero, pricing, FAQ, Concierge Terms “Support” and llms.txt use 12–5 PM ET; no 24-hour human claim |
| Included assistance through the end of the Nassau port day | Concierge Terms “What you get” | Terms override the brief’s next-morning cutoff |
| Spanish questions receive Spanish answers | Brief §1 Spanish row | FAQ, app and MSC guides, llms.txt |
| Tours optional; check fit before leave-by; commission may be earned | Brief §1 optional tours; §2B; IMG_1730 | Home tour section, tour chat excerpt, guides and llms.txt |
| Preview welcome and checkout wording, no subscription, same WhatsApp number at checkout | IMG_1731/1732/1733 | Shortened light-mode excerpts. Buttons are illustrated options, not a checkout integration |
| WhatsApp is free to download; no separate ShoreDay account/password needed for concierge | Brief §2A.1 and §4 FAQ | Home and app guide. This does not promise WhatsApp itself needs no account |
| Saved plan and downloaded PDF readable offline; downloaded voice notes replay after playing once while connected | Brief §1 offline; §2 data objection | Home, FAQs and guides; new requests require internet |
| Check Bahamas coverage before sailing | Brief §2 data objection | Advice only. No carriers, prices or claim that “many US plans” include coverage |
| Plan, PDF, voice notes and photos remain in WhatsApp history unless deleted; return to same conversation for another $9.99 call | Brief §2A.4–5 | Home, FAQ, app guide and llms.txt; no cloud backup guarantee |
| Concierge engine does not store media, while service providers process messages/media | Brief §2A privacy assertion + existing Privacy Policy §§1, 4, 8 | Scoped to engine; avoids promising all providers retain nothing |
| Parent/adult plans for family; share children’s ages, stroller needs and walking preferences | Brief §2 family audience and §3 kids page; Privacy Policy §10 | Kids and ship guides. Venue access and age rules require confirmation |
| Re-plan when preferences or ship times change | Brief §2 generic-plan comparison; §4 FAQ | Home and guides; onboard instructions remain final |
| App premium included for purchaser on iOS/Android; app separate from concierge | Brief §1 app bonus; existing app section/FAQ | Cam-provided entitlement claim; purchaser unlock not independently tested. No automatic plan transfer promised |
| All 11 cruise lines and any Nassau-calling ship | Brief §2C supplied schedule summary | One data file; no call counts or endorsement imagery in fit list |
| Specific October docking and departure patterns | TODO(Cam): original port schedule PDF | Removed from public timing guide pending the primary document |
| Repeat visitors may choose different food, beach or heritage stops for this sailing | Brief §2 repeat audience; §2A.5 | Positioning and advice, no secret-access claim |
| A plan and budget help guests evaluate offers and agree taxi fares in advance | Brief §2B | Respectful confidence framing; no claims about vendor dishonesty or safety |
| Wonder short Miami itineraries can include Nassau and CocoCay | [Royal Caribbean’s Wonder itinerary results](https://www.royalcaribbean.com/cruises?country=USA&search=ship%3AWN&shipCode_WN=true), checked Oct 20 | Unique ship context; conditional on guest’s booking, not a fixed schedule |
| Disney Wish three-/four-night Port Canaveral sailings visit Nassau and Castaway Cay on most sailings | [Disney Cruise Line](https://disneycruise.disney.go.com/en-gb/featured/3-vacations-in-1/), checked Oct 20 | Unique family/private-island context; booking controls |
| MSC Seaside listed among Caribbean ships; Nassau and Ocean Cay listed as destinations | [MSC Cruises](https://www.msccruisesusa.com/destinations/caribbean), checked Oct 20 | Unique route context; Ocean Cay conditional, no universal itinerary implied |
| Operator VMAManagement LLC, support email and existing app store destinations | Existing Concierge Terms and Privacy Policy; existing site links | Exact legal spelling retained; Organization schema and footer |
| Existing Nassau and app imagery descriptions | Existing site media and `docs/design/ShoreDay-Media-Asset-Map.md` | Retained assets; improved descriptive alt text; no new testimonial or customer proof |
| Viator tour link and commission disclosure | Existing homepage, Terms §8; Brief §1 | Retained; no booking or payment performed |

Other route planning, breaks, cash/card confirmation, small bills and shorter-day suggestions are advice, not verified business hours, fares, step-free access or payment-acceptance claims. No current Nassau price tables are published.

## Screenshot treatment and remaining proof

All chat UI is light mode. Every rendered excerpt now shares the same contact header, doodle wallpaper, outgoing/received bubble tails and message composer (plus, rounded field, sticker, camera and green microphone). Feature panels use supplied or labeled illustrative message times. At the owner’s request, the scrollable phone uses a coherent example timeline; these timestamps do not claim to reproduce the original sessions or guarantee response times. Delivery ticks are illustrative UI. The full iPhone uses the same controls as the smaller panels. The original site’s iPhone proportions, titanium edge, black bezel, side buttons, Dynamic Island, status icons, doodle background and composer are reused. Chat text is HTML, so it remains readable and keyboard-scrollable rather than a stack of tiny phone screenshots.

The scrollable customer journey is ordered as one example day: greeting and welcome at 9:02 AM (IMG_1731/1732) → get-plan/checkout at 9:04 AM (IMG_1733) → PDF at 9:05 AM → guest preferences at 9:08 AM and illustrative plan at 9:12 AM → weather at 10:26–10:27 AM (IMG_1736) → tours at 10:30–10:31 AM (IMG_1730) → illustrative countdown at 11:36 AM → voice exchange at the retained 3:35 PM (IMG_1705 and 3:29 PM screenshot) → Goldie’s menu at 4:15–4:16 PM (IMG_1721/1722). The PDF arrives before the personal plan, matching the described delivery flow. The countdown’s leave-by, back-at-pier and all-aboard times remain 5:30 PM, 6:00 PM and 7:00 PM. The ATM conversation remains in the maps feature tile. The caption identifies example times; reply-option rows are not separate messages. Message timestamps appear above the welcome, checkout and tours reply options, as in the supplied WhatsApp cards. The Government House reply now carries 4:17 PM, matching its question. The vendor and guide menu excerpts use the same 4:15–4:16 PM timestamps as the scrollable menu exchange.

Timeline verification: production build, TypeScript, changed-file ESLint and whitespace checks passed. A browser check confirmed the message timestamps never move backward, all three card timestamps precede their reply options, and the afternoon voice exchange and ship deadlines are preserved. Desktop and mobile layouts were inspected with no horizontal page overflow or browser console errors. Evidence: `outputs/seo-review/scroll-timeline-welcome-desktop.png` and `scroll-timeline-welcome-mobile.png`.

Missing-timestamp follow-up: the greeting, Government House reply and both vendor/guide menu messages now display times. Browser checks found no missing timestamps across all 31 homepage bubbles or the cash guide’s two menu bubbles. The app kicker reads “Prefer the app instead?”; desktop and mobile layouts were checked, with no horizontal page overflow or console errors. Build, TypeScript, changed-file lint and whitespace checks passed. Evidence: `outputs/seo-review/hi-timestamp.png`, `feature-chat-timestamps.png`, `menu-chat-timestamps.png`, `prefer-app-heading.png` and `prefer-app-heading-mobile.png`.

Welcome follow-up: the opening message now uses the existing `WHATSAPP_PREFILL` value, “Hi ShoreDay! My cruise stops in Nassau,” matching the supplied reference and preserving the real WhatsApp destination and prefill. The three welcome reply options use the original site’s curved SVG arrow path instead of a font-dependent arrow character. Desktop and mobile browser checks confirmed the full entry text, three arrow icons, preserved timestamps and no horizontal page overflow or console errors. Build, TypeScript, changed-file lint and whitespace checks passed. Evidence: `outputs/seo-review/full-welcome-message.png`, `welcome-reply-arrows.png` and `welcome-reply-arrows-mobile.png`.

The menu, landmark photo, bank thumbnail and welcome thumbnail use optimized source screenshots and CSS image windows. Full source screenshots are retained in these image files; only the relevant picture appears in the UI:

- `public/images/shoreday/chat/government-house-source.webp` — newly supplied Government House photo and recognition reply; the photo appears in “Snap it. Ask it.”
- `public/images/shoreday/chat/menu-source.webp` — supplied IMG_1721, photographed menu.
- `public/images/shoreday/chat/welcome-source.webp` — supplied IMG_1731, static video thumbnail. No video file or playable audio was supplied.
- `public/images/shoreday/chat/voice-atm-source.webp` — supplied “Screenshot 2026-10-20 at 3.29.33 PM.png,” showing the returned voice note/transcript and Scotiabank Maps preview. Only the building thumbnail is cropped into the UI; the transcript and map title remain HTML.

The returned voice card follows the supplied play icon, seek bar, 0:10 duration, 1× speed label, transcript feedback and 3:35 PM timestamp. The transcript lightly corrects the apparent “at 10 minutes” transcription error to “Add 10 minutes,” consistent with the pier-walk caveat in IMG_1705. Playback and feedback controls are decorative screenshot previews. The weather excerpt is shortened from IMG_1736; the follow-up timing option omits that other session’s 4:30 PM all-aboard time so it does not conflict with the clearly labeled 7:00 PM illustrative plan.

The jet-ski/emergency advice above the tour card in IMG_1730 is outside the marketing excerpt. The Cayman menu in IMG_1720 is not presented as Nassau pricing. The additional Government House screenshot supplied at 1:38 PM includes the recognition reply. Its first paragraph now appears with the photo in the feature tile, replacing the repeated Goldie’s example.

Optional replacements needed from Cam before converting illustrations into documented product proof:

| Needed evidence | Intended repository path | Current treatment |
|---|---|---|
| Personal plan message | `public/images/shoreday/chat/plan-proof.webp` | Labeled illustrative plan |
| Exact countdown reply and its context | `public/images/shoreday/chat/countdown-proof.webp` | Labeled 11:36 AM / 5:30 PM example |
| Actual outgoing voice recording, if a playable demo is wanted | `public/audio/shoreday/voice-reply.m4a` | Supplied voice-reply screenshot and transcript recreated in light mode; no invented audio |
| Welcome video, if playback is wanted | `public/videos/shoreday/welcome.mp4` | Screenshot thumbnail labeled as a preview |

These paths are review destinations, not broken image references shipped to visitors.

## WhatsApp link invariant

No attribution codes are shipped or proposed. All chat CTAs and the QR retain the exact prefill “Hi ShoreDay! My cruise stops in Nassau”. Tracking stays in the existing website event pipeline, outside the message text.

## Validation

| Mobile Lighthouse run | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| Home — existing production | 76 | 100 | 75 | 100 | 7.28 s | 0.0000 |
| Home — unchanged local main baseline | 83 | 100 | 75 | 100 | 4.73 s | 0.0000 |
| Home — updated local production build | 95 | 100 | 100 | 100 | 2.91 s | 0.0040 |
| New timing guide — local production build | 98 | 100 | 100 | 100 | 2.39 s | 0.0037 |

Lighthouse 12.8.2, default mobile simulation and throttling, Chrome headless, Next production builds. Runs performed sequentially. The new timing route did not exist before this work: its baseline is **N/A**, not an invented score. Local before/after is the closest comparison; production CDN/network conditions differ. These are lab measurements, not field Core Web Vitals.

Both updated pages meet Performance ≥90, SEO 100 and CLS <0.1. The timing guide also meets LCP <2.5 s. **Homepage LCP is 2.91 s, above the requested 2.5 s target**, although improved from 4.73 s on unchanged local main. Further speed work remains measurable rather than claimed complete. The hero has high fetch priority, responsive WebP delivery and no delayed entrance; the old 1 MB footer background now uses a lazy Next Image.

- Production build with `npm run build -- --webpack`: passed, including TypeScript and all static routes.
- `npm run typecheck`: passed. ESLint on changed source files: passed.
- `npm test`: **556 tests passed across 37 files**, including the new analytics payload forwarding test and existing WhatsApp/QR invariants.
- Built HTML audit: all ten marketing pages have one H1, valid title/description lengths, canonical/social metadata, FAQ schema, breadcrumb schema on subpages, unchanged WhatsApp hrefs, no review/rating schema and no links to the noindex cheat sheet. Internal destination files resolve.
- Browser checks: desktop, tablet (768 px), mobile (390 px), narrow mobile (320 px), no horizontal page or chat overflow. Keyboard chat scrolling, FAQ disclosure, guide sticky CTA and its page/position attributes checked. No browser console errors in the verification tab.
- New ship paths are statically generated; unknown ship paths return 404. Sitemap, robots, llms.txt and OG image return successfully.
- Screenshots and full Lighthouse HTML/JSON reports are saved locally in `outputs/seo-review/` (ignored generated evidence). Key views: `chat-desktop.png`, `chat-mobile.png`, `chat-checkout-desktop.png`, `home-mobile.png`, `home-desktop.png`, `timing-mobile.png`.
- Local preview uses an empty Mixpanel server token for final browser audits. No checkout submission, WhatsApp message, tour booking, premium unlock or GHL workflow mutation was performed.
- The environment’s stale Webpack cache required regenerating build cache between builds. No dependency changes or cache files are committed. No new runtime libraries.


## Decisions and items for Cam

- **Current price and support hours:** Cam’s latest instruction sets the Nassau concierge offer to $9.99 per group and restores local human support to daily 12–5 PM ET. These values supersede earlier price and support-hour instructions. The update covers homepage/guide/ship copy, FAQs, the chat offer and checkout previews, sticky/final CTAs, concierge terms, structured data, metadata, social images and llms.txt. Goldie’s photographed menu prices, third-party excursion prices and separate native-app purchase options are unchanged.
- **Separate hosted checkout:** the existing payment link displays the product, subtotal and total as $9.99. Its consent sentence below the payment button still uses the former group price. That sentence belongs to the live GoHighLevel payment-link settings, outside this repository, and was not edited or published. Remaining change in GoHighLevel: Payments → Payment Links → open the ShoreDay Nassau Concierge payment link → Add Terms and Conditions → replace the former group price with “$9.99/group,” keeping the policy and Terms link. [Official HighLevel instructions](https://help.gohighlevel.com/support/solutions/articles/155000005547). No payment details were entered and no purchase was performed.
- **Access duration:** the brief says approximately 8 AM ET the next morning; Concierge Terms say through the end of the Nassau port day. The terms’ access-duration wording is retained and used everywhere.
- **Legal name:** the brief says “VMA Management LLC”; existing legal pages say “VMAManagement LLC.” Structured data uses the existing legal spelling.
- **Privacy:** “photos stay only on your phone” would overstate the policy. Copy scopes non-storage to the concierge engine and acknowledges processing by service providers. TODO(Cam): confirm this engine assertion against the deployed media pipeline before publication.
- **Closing card:** Cam requested removal of the repeated full service definition from the shared final CTA. It now contains the short heading, WhatsApp action and group-price note. This supersedes the brief’s requirement to repeat the definition in every final CTA.
- **Headline:** “Your Nassau port-day concierge, built around your ship’s all-aboard time.” The supporting line reads “A Nassau trained assistant. A real person available daily 12–5 PM ET.” This owner-selected wording supersedes the brief’s keep-the-existing-H1 rule. The primary keyword remains in the title and one-chat introduction. Requested route slugs are retained where they differ from a full question keyword.
- **Price comparisons:** omitted “less than most excursions” and the beach-club comparison because no current comparable-price evidence was supplied. The $9.99 group price stands on its own.
- **Staying aboard:** omitted “a packed ship,” which is not established for a specific sailing. The worth-getting-off guide gives both choices fairly.
- **Local details:** no invented walking distances, venue hours, bank fees, taxi fares, accessibility guarantees, fixed berths or ship-specific all-aboard times. TODO(Cam): provide the original Oct 3–Nov 3 schedule and verify ship berth/time patterns before adding them. The three ship pages use sourced itinerary context instead.
- **App entitlement:** the app section’s kicker is “Prefer the app instead?” at Cam’s request. Its purchaser-premium entitlement copy remains in place. The app-premium bonus is in the brief but was not exercised with a purchase. TODO(Cam): confirm purchaser unlock works on both platforms before publication. The separate app Terms retain their existing standalone pricing.
- **Chat media:** these are labeled adaptations of owner-supplied conversations, not testimonials or untouched screenshots. No playable recording or video is fabricated. Checkout/tour choices inside the phone are preview artwork; real “Start in WhatsApp” buttons remain outside it.
- **Reviews:** no testimonials, counts, stars, AggregateRating or Review schema. A comment reserves a future place for permissioned real reviews.
- **Indexing:** metadata, FAQ markup and llms.txt make the pages readable to crawlers; no claim is made that Google or an AI system will rank, cite or show a rich result.
- **Next approval:** review the draft, the claims above and missing evidence. No merge, payment, workflow change or deployment is part of this delivery.

## Government House and WhatsApp controls — visual verification

“Snap it. Ask it.” uses Cam’s supplied Government House recognition exchange. The shared composer follows the supplied close-up. Goldie’s remains in the menu-specific vendor proof, scrollable journey and cash guide. A shared WhatsApp chrome component keeps every visible chat excerpt in the same light-mode style.

Validation for this follow-up: production build, TypeScript, changed-file lint and browser checks at desktop and mobile sizes. Saved evidence: `outputs/seo-review/chat-excerpts-desktop.png` and `outputs/seo-review/chat-excerpts-mobile.png`. The Lighthouse numbers above belong to the initial SEO review build and were not rerun for this visual follow-up.

## Chat proportions and unobstructed closing photo

Chat excerpt windows are capped at 300 px wide with a 560 px minimum height. Received text bubbles use at most 86% of the thread width; outgoing text uses at most 82%. Photo bubbles retain more room for the image. This keeps the examples portrait-shaped across desktop, tablet and mobile while preserving every message bar.

The closing card places its copy beside the pig-and-bird photograph on desktop, then below the image on screens up to 760 px wide. The photograph has its own layout area, full opacity and descriptive alt text. The mobile image keeps the original aspect ratio so neither animal is hidden behind text or controls.

Validation: production build, changed-component lint, desktop and mobile browser checks, plus a narrow 320 px overflow check. Saved views: `outputs/seo-review/narrow-chat-desktop.png`, `narrow-chat-mobile.png`, `final-cta-photo-desktop.png` and `final-cta-photo-mobile.png`.

## Returned voice reply, realistic Maps preview and weather exchange

Cam’s additional screenshots supply the received ten-second voice reply with transcript and a richer Scotiabank Maps preview. Both replace the simplified treatments in the feature tiles; the voice reply also appears in the scrolling iPhone. At Cam’s request, IMG_1736’s weather conversation replaces the ATM exchange in that iPhone only. All examples retain the shared light-mode WhatsApp header, message shapes and composer. The scrolling conversation now uses the chronological example timeline documented above; separate feature panels retain their existing timestamps.

The voice heading now reads “Too tired and hot to type? Just talk.” in both page locations, with 🗣️🎙️ together as the feature icon. No audio file was supplied, so the playback bar remains an explicitly labeled screenshot preview. The Maps card links to the place URL supplied in IMG_1708.

Validation: production build and TypeScript passed; changed-file ESLint and diff whitespace checks passed. Desktop and mobile rendering were checked, including no horizontal page overflow, the phone’s weather question in place of the ATM question, both updated headings and no browser console errors. Saved evidence: `outputs/seo-review/voice-map-desktop.png`, `voice-reply-mobile.png`, `atm-reply-mobile.png` and `weather-phone-desktop.png`. No deployment or runtime dependency changes.

## $9.99 offer and restored support hours — validation

Production build and TypeScript passed; changed-file ESLint and whitespace checks passed. Existing WhatsApp/QR invariant checks passed (12 tests). A built-page audit covered 13 routes, confirming no stale concierge offer copy, only the restored support window, descriptions within 160 characters, and a USD 9.99 structured offer. Remaining $15 references on those pages are only the supplied Goldie’s menu price. Browser checks covered desktop, the updated chat offer, a 320 px mobile layout/sticky CTA, concierge terms, both social images and the separate hosted checkout. No horizontal page overflow or browser console errors. Evidence is saved in outputs/seo-review/nine-ninety-nine-audit.json and nine-ninety-nine-*.png; the separate hosted-checkout note is recorded in connected-checkout-price-note.png. No deployment or hosted-payment mutation.

## Prepublication audit supersedes earlier checks

See [2026-10-20-prepublish-audit.md](2026-10-20-prepublish-audit.md) for the current claim register, privacy changes, exact-link checks, screenshot fidelity inventory and fresh Lighthouse results. Earlier metrics above are historical comparisons. No deployment.
