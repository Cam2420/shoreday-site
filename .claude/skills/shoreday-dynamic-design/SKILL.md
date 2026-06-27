---
name: shoreday-dynamic-design
description: ShoreDay web design doctrine — the "Calm Port-Day Control Tower" direction for the Nassau V1 marketing site and planner funnel. Use when designing, restyling, or polishing any customer-facing ShoreDay web UI (homepage hero, /nassau/plan funnel, result/payoff, email gate, excursion cards) so the work is premium-light, coastal, trustworthy, dynamic-but-calm, conversion-focused, and mobile-first — without breaking analytics, the Kit save flow, AM/PM times, accessibility, or reduced-motion.
---

# ShoreDay Dynamic Design

Design lead doctrine for ShoreDay's web surface. This skill encodes the brand
direction, the buyer's head-space, the conversion path it must protect, and the
quality bar every change is held to. Pair it with the global `frontend-design`
skill: that one supplies the general "make it distinctive, not templated"
craft; this one supplies ShoreDay's specific point of view and guardrails.

The companion long-form reference is
[`docs/design/ShoreDay-Web-Design-Doctrine.md`](../../../docs/design/ShoreDay-Web-Design-Doctrine.md).
Read it when you need the full rationale; this file is the working checklist.

## North star: "Calm Port-Day Control Tower"

ShoreDay is the calm control tower for a cruiser's one day in port. The feeling
is a well-run operations desk: confident, precise, unhurried. It hands an
anxious first-timer **one clear plan and one honest return time**, then gets out
of the way. Every design decision should make the user feel *more in control and
less rushed* — never more excited, more pressured, or more sold-to.

If a change makes the page louder, busier, or more "marketing-y," it is probably
wrong. If it makes the next decision more obvious and the timing more
trustworthy, it is probably right.

## Who we are designing for

First-time Nassau cruisers, usually on Royal Caribbean / Carnival / NCL. Their
state of mind:

- **Anxious** about missing the ship — fear of the worst-case dominates.
- **Time-conscious** — the port window is short and fixed.
- **Cost-conscious** — wary of overpaying and tourist-trap markup.
- **Wary of vendor pressure** near the pier.
- **Decision-fatigued** — they want *one* clear plan, not a checklist of 20
  options to research.

Design implication: reduce choices, lead with the answer (the return time),
state buffers and caveats honestly, and keep the path to "one good plan" short.
Calm authority converts here; hype repels.

## Vacation trust psychology (the feeling we are selling)

ShoreDay is a **calm port-day companion**, not a tech product. The UI's job is to
*reduce anxiety* and make the cruiser feel **taken care of** — the way a good
resort lobby, a cruise concierge desk, or a trusted excursion host makes you feel
the moment you arrive: relaxed, safe, confident, and comfortable spending money on
things that make the trip better.

Borrow emotional cues from trusted travel/hospitality brands (resorts, cruise
lines, hotels, premium island experiences): clean spacious layouts, a warm
neutral base, calm water colors, strong-but-friendly CTAs, editorial headings,
reassuring helper text, clear next steps, tasteful destination imagery, and
**zero pressure tactics**. ShoreDay still reads as *independent, practical, and
ship-time-aware* — never as a fake cruise-line partner.

Design to this emotional sequence, in order:

1. **"This feels like vacation."** — warm, spacious, calm-water first impression.
2. **"This understands Nassau."** — destination-specific, local, real.
3. **"This understands my ship time."** — timing is the spine of everything.
4. **"This feels safer than winging it."** — buffers and honesty visibly reduce risk.
5. **"This makes spending on an excursion/app feel reasonable."** — value first,
   then a calm, justified ask.

Never skip ahead in this sequence. Asking for money (excursion, app, Port Pass)
before steps 1–4 have landed reads as a tech product hustling, not a companion
helping.

## Resort / cruise / hotel trust cues

**Use (hospitality-grade reassurance):**
- A warm welcome and calm confidence in the first screen.
- A guided, concierge-like path — clear structure, one obvious next step.
- Destination-specific Nassau imagery (real, tasteful, never clip-art).
- Premium-light spacing — let the layout breathe like a resort brochure.
- Strong reassurance around timing and the planning buffer.
- Curated recommendations (a short, vetted set), not endless browsing.

**Avoid (kills the trust):**
- Fake luxury or fake exclusivity; "members only" theater.
- "Dark steakhouse" energy / moody dark galleries; AI-SaaS aesthetics.
- Overdone glassmorphism, neon, gimmicky tropical clip-art.
- Pressure-based urgency or fake scarcity.
- Fake ratings, reviews, or testimonials.
- Anything implying a cruise-line partnership or endorsement.

## The conversion path we must protect

This is the funnel the design exists to serve. Every screen should make the
*next* step the easy, obvious one — and must never break the analytics that
measure it.

```
homepage visitor
   → planner_start          (user begins the Nassau planner)
   → planner_complete       (a valid return target is calculated)
   → email_submitted        (Kit save, when configured)
   → excursion_click   OR   app_store_click   (monetization / activation)
```

Supporting impression/▸interaction events already in the funnel (do **not**
rename, drop, or change the semantics of any of these):
`planner_step_view`, `planner_step_complete`, `port_math_view`,
`email_gate_view`, `results_view`, `app_card_view`, `excursion_card_view`.

**The longer monetary arc.** Money should always follow trust, in this order:
`planner_start → planner_complete → email_submitted → excursion_click →
app_store_click → (eventually) Port Pass / annual subscription`. The app is the
*natural port-day continuation* after the web plan has already delivered value —
do **not** over-prioritize the app purchase, the Port Pass, or any subscription
ask before trust is built on the web. Each ask should feel earned by the value
already shown, never front-loaded.

Rules around analytics when designing:

- Never change event names or payload semantics.
- Never remove existing tracking or the Mixpanel forwarding.
- Keep `data-analytics-*` attributes intact when restyling markup.
- If a redesign moves an element, move its tracking with it — don't drop it and
  don't double-count (see the existing `planner_start` once-guard rationale in
  `PlanBuilder.tsx`).

## Website / funnel first, app later

**Redesign the homepage and the Nassau web funnel first. The app redesign comes
later.** The web funnel is the **trust-building layer** that must deliver value
before any app purchase. Rules:

- Excursion booking and app install are **earned after the planner gives value**
  — never the first ask.
- The app CTA should feel like the **natural continuation** of the trusted web
  plan (saved plan, departure reminders, map, in-app concierge for port day),
  not a pre-trust pop-up or interstitial.
- Do not redesign or re-prioritize the mobile app in this web work; keep scope to
  the homepage and `/nassau/plan` funnel (Nassau V1).
- Primary conversion metrics for this web work stay exactly: `planner_start`,
  `planner_complete`, `email_submitted`, `excursion_click`, `app_store_click`.

## The ShoreDay $10K checklist

The bar: would a studio charge $10K for this and the client feel it was a steal?
Each item is adapted to ShoreDay.

1. **Point of view, not template.** Lead with the most characteristic ShoreDay
   thing: a real return time and a real Nassau day shape — not a generic SaaS
   hero with a big number and a gradient. The "control tower" voice is the POV.
2. **Typography that does work.** Use the existing Plus Jakarta Sans with an
   intentional scale: large, confident result/return-time numerals; calm,
   readable body; clear labels/eyebrows. Type hierarchy should encode timing
   importance (the return time is the loudest element on the result screen).
3. **Restrained color system.** Lagoon + Sand only (tokens below). Color carries
   meaning: Deep Teal = primary/action, Lagoon = progress/positive accents,
   Coral = warnings/required only. No new hues without approval.
4. **Hierarchy that breathes.** Generous, consistent spacing; one primary action
   per screen; secondary actions visibly quieter. Don't crowd the return time or
   the CTA.
5. **Imagery with intent.** Real Nassau/port imagery and honest product mockups.
   Use the existing "Photo coming soon" placeholder rather than generic stock
   stand-ins. No decorative imagery that competes with the timing answer.
6. **Motion that whispers.** Motion confirms and guides; it never performs. A
   one-shot reveal of the return time, a calm itinerary stagger, restrained
   load hierarchy, smooth progress/press feedback. No count-ups, confetti,
   pulsing deadlines, slot-machine effects, looping, or scroll-jacking. All
   motion must degrade under `prefers-reduced-motion`.
7. **Mobile designed, not shrunk.** Design the phone layout first (most cruisers
   are on mobile in or before port). Thumb-reachable primary actions, ≥44px
   targets, no fixed-background jank, no horizontal scroll.
8. **Invisible expensive stuff.** Server-render what can be server-rendered;
   keep JS lean; semantic HTML; visible keyboard focus on every control;
   WCAG-AA contrast; and — non-negotiable — preserve analytics, the Kit save
   flow, and AM/PM time formatting.

## ShoreDay design tokens (single source of truth)

Defined in `app/globals.css` under `@theme`. Use the tokens, not raw hex.

| Token | Hex | Role |
|---|---|---|
| `--color-sand` | `#fff8ee` | Dominant light surface |
| `--color-sea-glass` | `#eaf7f5` | Soft secondary surface / chips |
| `--color-ocean-ink` | `#17324d` | Primary text |
| `--color-ocean-ink-muted` | `#45586b` | Secondary text |
| `--color-deep-teal` | `#0e5a67` | Primary action / brand |
| `--color-lagoon` | `#2cc8b7` | Progress + positive accent |
| `--color-coral` | `#f46f61` | Warning accent |
| `--color-coral-strong` | `#c2453a` | Required / error text |

Type: `--font-plus-jakarta` (Plus Jakarta Sans), system-ui fallback. ~80/20
light-to-dark surface balance: Sand-dominant pages with at most a couple of
deliberate Deep Teal / Ocean Ink anchor panels (footer, excursions CTA).

## Vacation palette direction (warm coastal evolution)

The table above is the **current implemented** system. The **direction** for the
redesign warms it toward a Bahamas resort mood. These are *directional targets,
not rigid tokens* — tune for contrast and readability, and only promote them to
real `@theme` tokens when implementing (with approval). Inspired by the founder's
Bahamas moodboard (reference only — never copy its image, layout, or artwork).

| Role | Direction | Approx hex |
|---|---|---|
| Shell / cream base | warm paper background | `#F8F4EA` / `#F1E9DF` |
| Sand neutral | warm beige / soft stone | warm beige |
| Soft blush accent | muted blush — **accent only** | ~`#F4B7C3` |
| Aqua mist | soft water tone — supports calm | ~`#BFECEC` |
| Lagoon teal | calm island teal | ~`#4F8D90` |
| Harbor blue/teal | grounded decision tone | ~`#455F76` |
| Deep CTA teal | keep/refine current Deep Teal **only if** contrast stays strong | current `#0e5a67` |
| Cream cards | card surfaces lift gently off the shell base | cream |

Palette rules (non-negotiable):

- **Restraint over a rainbow.** This is a calm coastal set, not a tropical
  rainbow. A few harmonized tones, used with meaning.
- **CTA contrast must stay strong** — decision moments carry Deep Teal / Harbor
  tone, never blush or pale aqua.
- **Body-text readability wins** over palette fidelity, always.
- **Blush is an accent, not a conversion color.** Never the primary CTA, never
  load-bearing for meaning.
- **Aqua mist + Lagoon teal support trust and calm** (backgrounds, chips, soft
  accents), they don't drive actions.
- **Deep teal + harbor carry decision moments** (primary CTAs, the return-time
  emphasis, key confirmations).

## Typography direction (editorial vacation, practical core)

Move away from pure SaaS typography toward a warm, editorial resort feel — but
only where it adds reassurance, never at the cost of legibility.

- **One display face, maximum**, used with restraint for *selective* headings
  (hero headline, result/section titles). Evaluate, in order of safety:
  Fraunces-style warm editorial → Cormorant Garamond-style resort editorial →
  Playfair/Cormorant mood *only if* readability holds → a safe **system serif
  fallback** if adding a webfont is too risky (no new dependency without
  approval; respect performance budget).
- **Body / UI text stays practical and high-trust** — keep Plus Jakarta Sans (or
  an equally legible humanist sans) for everything functional.
- **Numeric timing results stay highly readable and confidence-building** — the
  return time is an operations readout, not a decorative flourish. Never set the
  return time in a thin/italic display weight that weakens it.
- Do **not** let the planner drift into wedding-moodboard or fashion-magazine
  territory. Editorial warmth, yes; precious, no.

## Media library strategy

ShoreDay should use **real Nassau/Bahamas imagery and video from the ShoreDay
Media Library** to make cruisers feel like they are *already there* — the trusted
vacation-brand / resort / cruise-excursion / island-hospitality feeling — while
staying independent, practical, and ship-time-aware.

Source of truth: the **ShoreDay Media Library** Google Drive (owner
`cam@shoredayapp.com`), inventoried in
[`docs/design/ShoreDay-Media-Asset-Map.md`](../../../docs/design/ShoreDay-Media-Asset-Map.md).
Known subfolders:

- `01_Nassau_Images` — real Nassau harbor / aerial / beach / street / culture /
  cruise-terminal / excursion stills.
- `02_App_Screenshots_UI` — product screenshots (itinerary, ship alerts,
  excursions, AI concierge, map, notifications).
- `03_Nassau_Videos` — raw Nassau/Bahamas video clips (large MOV/MP4 — compress
  before any production use).

Guidance:

- Use **real Nassau** harbor / beach / street / taxi / water / excursion imagery
  where it fits the context.
- Use **app screenshots only where they prove product utility** (e.g. the
  itinerary, ship-alert, or excursion screen near a feature claim).
- **Avoid generic random stock** when ShoreDay-owned/licensed media already
  covers the need.
- **Do not imply a specific experience** unless the image actually matches that
  context (don't caption an Atlantis tower shot as a "downtown walk," etc.).
- Use imagery to **lower anxiety and make spending feel safer**, not as
  decoration.
- **Asset selection requires a human visual review** before any file is copied
  into the repo (Drive is reference; nothing is auto-imported).

## Image use rules

- **Homepage hero:** use the strongest real Nassau **harbor / aerial** image if
  it improves trust, contrast, and conversion (it must not fight the headline or
  CTA legibility). Candidates live in `01_Nassau_Images` (see the asset map).
- **Planner / timeline:** small contextual imagery is fine **only when it
  clarifies the plan** (e.g. a stop's category), never as filler. The existing
  "Photo coming soon" placeholder is preferred over a mismatched stand-in.
- **Excursion cards:** use real excursion / category images where available.
- Keep all images **optimized** (WebP/AVIF, or well-compressed JPEG); the source
  library files are very large (many 3–35MB) and must be resized/recompressed
  before use.
- Use **descriptive alt text** for every meaningful image.
- **Avoid image clutter** — each image earns its place.
- The **LCP image** (typically the hero) must be carefully optimized, correctly
  sized, and prioritized; everything else lazy-loads.

## Video use rules

- Video can create an "already there" feeling but **must not slow the funnel**.
- **Never** use raw large MOV/MP4 directly in production — the library clips run
  from tens of MB up to ~2.5GB. They must be compressed first.
- Any production video must be **compressed, muted, short, non-essential, and
  have a static poster/fallback image**.
- **No autoplay sound**, ever.
- **No video that competes with CTA clarity** or the timing answer.
- **Avoid video on mobile** unless performance is proven (prefer a static poster
  there).
- **Respect `prefers-reduced-motion`** — show the static poster instead of
  playing video.
- Adding video is "needs explicit approval + performance review," not a default.

## Forbidden ShoreDay patterns

Do not introduce any of these — they break the brand or the trust:

- AI-SaaS **purple gradients**; crypto/neon palettes; glassy "dark-mode gallery"
  aesthetics.
- Heavy **parallax**, `background-attachment: fixed` on mobile, or **video
  backgrounds**.
- Gamified quiz effects: confetti, count-ups, slot-machine number rolls,
  pulsing countdowns, achievement badges, progress "celebrations."
- **Fake testimonials, fake ratings/star counts, fabricated review numbers, or
  cruise-line endorsements/partnership claims.**
- Generic AI marketing copy ("Revolutionize your...", "Unlock the power of...").
- Any urgency/scarcity manipulation ("only 3 left", "most people pick this").

## Forbidden claims (never invent these)

Never add, imply, or design UI that asserts:

- "Guaranteed return" / "you'll never miss your ship" (we provide a *planning
  buffer* and always defer to the cruise line's official all-aboard time).
- "Live AI generation" or "live port conditions" / real-time data we don't have.
- Ratings, testimonials, or cruise-line endorsements we don't have.
- Any new customer-facing claim not already approved in the current copy.

When a section feels like it "needs" social proof, use honest, already-approved
framing (e.g., "Perfect for passengers on Royal Caribbean, Carnival & NCL",
Viator/Tripadvisor sourcing disclosure) — never fabricated proof.

## Approved direction (what "good" looks like)

Premium-light · coastal · trustworthy · dynamic-but-calm · conversion-focused ·
mobile-first. Dynamic means *purposeful, well-orchestrated* motion and a strong
hero thesis — not animation density. The return time is the hero; the plan is
the proof; the CTA is the calm next step.

## Spending comfort & conversion psychology

Make spending feel *comfortable and reasonable*, never pressured. The design
earns each ask by showing value first:

- **Clear value before the ask** — the user sees the plan/return time working
  before any money or email request.
- **Exact timing payoff** — the recommended return target is the proof that
  ShoreDay did real, useful work.
- **Curated, not endless** — a short, vetted set of options ("this fits your ship
  window"), so choosing feels safe rather than overwhelming.
- **The app as continuation** — framed as the natural port-day companion *after*
  the web plan has already delivered value, not as the first ask.
- **Calm, clear disclosure** — the Viator / excursion affiliate disclosure is
  stated plainly and unapologetically; honesty is part of the comfort.
- **No surprise pressure, no fake scarcity** — no countdowns, "only X left,"
  "most people pick this," or manufactured urgency anywhere.

## Implementation guardrails (hard rules)

- **No new dependencies** unless explicitly approved. No shadcn/ui, Radix,
  Framer Motion, or any animation/component library without sign-off. No
  `package.json` / lockfile changes.
- **Prefer existing CSS files** (`app/home.css`, `app/nassau/plan/plan.css`,
  `app/globals.css` tokens) and existing components in `components/funnel/`.
- **Preserve analytics**: event names, payloads, `data-analytics-*`, Mixpanel
  forwarding all intact.
- **Preserve the Kit save flow**: don't touch `/api/kit/nassau-plan`, the email
  gate submit handler, or the `kitConfigured` honest-fallback behavior.
- **Respect reduced motion**: every animation needs a
  `@media (prefers-reduced-motion: reduce)` path that disables/neutralizes it.
- **Protect AM/PM**: all customer-facing times stay in AM/PM format.
- **Scope = Nassau V1.** Don't expand to other ports or invent new routes.
- **Accessibility floor**: semantic HTML, visible focus, AA contrast, ≥44px
  touch targets, keyboard operability.
- Keep the homepage server-rendered; don't convert it into a heavy client
  component for the sake of motion.

## 21st.dev usage rule

Use https://21st.dev for **inspiration and pattern reference only**. Do not paste
third-party component code into production unless it is reviewed, dependency-free
(or dependency-approved), accessible, mobile-safe, and compatible with the
current Next.js app. Treat anything pulling in shadcn/ui, Radix, or animation
packages as "needs explicit approval first."

## Anti-slop checklist (run before calling a change done)

- [ ] Does the first impression land "this feels like vacation" before anything
      asks for time, email, or money (emotional sequence respected)?
- [ ] Does it feel like a calm port-day companion / concierge, not a tech product?
- [ ] Does the hero/result lead with a ShoreDay-specific truth (return time /
      real plan), not a templated pattern?
- [ ] Is there exactly one obvious primary action per screen?
- [ ] Is all motion one-shot, calm, and reduced-motion-safe?
- [ ] Mobile-first verified: no fixed-bg jank, no h-scroll, thumb-reachable CTA,
      ≥44px targets?
- [ ] Palette stays restrained and coastal (no rainbow); blush is an accent only;
      decision moments carry Deep Teal / Harbor; CTA contrast strong?
- [ ] Editorial display used sparingly; body + timing numerals stay highly legible?
- [ ] Is the ask earned by value already shown — no front-loaded app/Port Pass
      push, no pressure, no fake scarcity?
- [ ] Web funnel first: is this scoped to homepage / `/nassau/plan` (not an app
      redesign), with the app CTA framed as the natural continuation?
- [ ] Imagery is real Nassau/ShoreDay media (not generic stock where owned media
      exists), context-accurate, optimized, with descriptive alt text?
- [ ] Any video is compressed, muted, short, has a static poster, no autoplay
      sound, reduced-motion-safe, and not on mobile unless proven?
- [ ] LCP image optimized and prioritized; no image clutter?
- [ ] No fabricated proof or new claims introduced?
- [ ] Times still AM/PM?
- [ ] Analytics events/payloads and `data-analytics-*` untouched?
- [ ] Kit save flow untouched?
- [ ] No new dependencies / no lockfile change?
- [ ] Keyboard focus visible and contrast AA on every new/changed control?
