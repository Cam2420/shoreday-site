# ShoreDay Web Design Doctrine

**Status:** Source of truth for ShoreDay web (marketing site + Nassau planner funnel).
**Scope:** Nassau V1.
**Direction:** "Calm Port-Day Control Tower" with a warm Bahamas-resort trust feel.
**Companion skill:** [`.claude/skills/shoreday-dynamic-design/SKILL.md`](../../.claude/skills/shoreday-dynamic-design/SKILL.md)
(working checklist) and the global Anthropic `frontend-design` skill (general craft).

This document is the readable rationale behind ShoreDay's web design decisions.
The skill is the quick checklist you apply while building; this is the "why" you
read when a decision is non-obvious or contested.

---

## 1. Brand north star

ShoreDay is the **calm control tower for one day in port** — and, just as
importantly, a **calm port-day companion**, not a tech product. A first-time
cruiser has a few hours in Nassau and one real fear: missing the ship. ShoreDay
answers that fear with **one clear plan and one honest return time**, delivered
with the unhurried confidence of a well-run operations desk and the warm welcome
of a good resort lobby.

The feeling we design for is *control without stress, and care without pressure*.
Confident, precise, quiet, and warm. We are not a hype-driven travel brand, a
gamified quiz app, or a generic AI SaaS. We are the trustworthy companion who
already did the timing math and hands the cruiser a plan they can relax into.

ShoreDay should feel like it belongs **near trusted vacation brands** — cruise
lines, resorts, hotels, guided excursions, premium island travel — while staying
**independent, practical, and ship-time-aware**. We are not a cruise-line partner
and never imply we are.

**Litmus test:** if a change makes the page louder, busier, or more "sales-y," it
is probably wrong. If it makes the next decision more obvious, the timing more
trustworthy, and the user more relaxed, it is probably right.

---

## 2. Buyer psychology

Primary user: a first-time Nassau cruiser, typically sailing Royal Caribbean,
Carnival, or NCL. Their head-space:

- **Anxious** — fear of missing the ship overrides everything; worst-case
  thinking dominates.
- **Time-conscious** — the port window is short and fixed; wasted time stings.
- **Cost-conscious** — wary of overpaying and tourist-trap markup.
- **Vendor-wary** — uncomfortable with pier-side pressure and upsells.
- **Decision-fatigued** — wants *one* good plan, not 20 options to research.

Design implications: lead with the answer (the return time), reduce choices, make
the recommended path obvious, state buffers/caveats plainly (honesty *is* the
trust mechanism), and keep the path to "one good plan" short. Calm authority
converts; hype and urgency repel.

---

## 3. Vacation trust psychology

The deeper job of the UI is to **reduce anxiety and make the cruiser feel taken
care of** — the way a trusted resort, cruise concierge, or excursion host makes
you feel on arrival: relaxed, safe, confident, and comfortable spending money on
things that genuinely improve the trip.

Borrow emotional cues from trusted travel/hospitality brands: clean spacious
layouts, a warm neutral base, calm water colors, strong-but-friendly CTAs,
editorial headings, reassuring helper text, clear next steps, tasteful
destination imagery, and **no pressure tactics**.

Design to this emotional sequence, in order — never skip ahead:

1. **"This feels like vacation."** — warm, spacious, calm-water first impression.
2. **"This understands Nassau."** — destination-specific, local, real.
3. **"This understands my ship time."** — timing is the spine of everything.
4. **"This feels safer than winging it."** — buffers and honesty visibly reduce risk.
5. **"This makes spending on an excursion/app feel reasonable."** — value first,
   then a calm, justified ask.

Asking for money or email before steps 1–4 have landed reads as a tech product
hustling, not a companion helping.

---

## 4. Resort / cruise / hotel trust cues

**Use (hospitality-grade reassurance):**

- A warm welcome and calm confidence in the first screen.
- A guided, concierge-like path: clear structure, one obvious next step.
- Destination-specific Nassau imagery — real and tasteful, never clip-art.
- Premium-light spacing: let the layout breathe like a resort brochure.
- Strong reassurance around timing and the planning buffer.
- Curated recommendations (a short, vetted set), not endless browsing.

**Avoid (kills the trust):**

- Fake luxury or fake exclusivity; "members only" theater.
- "Dark steakhouse" energy / moody dark galleries; AI-SaaS aesthetics.
- Overdone glassmorphism, neon, gimmicky tropical clip-art.
- Pressure-based urgency or fake scarcity.
- Fake ratings, reviews, or testimonials.
- Anything implying a cruise-line partnership or endorsement.

---

## 5. Conversion metrics

The design exists to move users along this funnel without ever breaking the
analytics that measure it (events forwarded to Mixpanel via `/api/funnel-events`):

```
homepage visitor
   → planner_start          user begins the Nassau planner
   → planner_complete       a valid return target is calculated
   → email_submitted        Kit save (when configured)
   → excursion_click  OR  app_store_click   monetization / app activation
```

Supporting events already instrumented (do not rename, drop, or alter payload
semantics): `planner_step_view`, `planner_step_complete`, `port_math_view`,
`email_gate_view`, `results_view`, `app_card_view`, `excursion_card_view`.

Design rules tied to metrics:

- Every screen should make the *next funnel step* the single easy action.
- Restyling must preserve `data-analytics-*` attributes and the existing
  `planner_start` once-guard logic (no double-counting, no dropped events).
- Don't add friction before `planner_complete`; don't bury the email gate; keep
  excursion and app CTAs reachable on the result screen.

---

## 6. Spending comfort & ShoreDay's monetary path

Make spending feel *comfortable and reasonable*, never pressured. Earn each ask
by showing value first:

- **Clear value before the ask** — the plan/return time visibly works before any
  email or money request.
- **Exact timing payoff** — the recommended return target is the proof of real,
  useful work.
- **Curated, not endless** — a short vetted set ("this fits your ship window"),
  so choosing feels safe rather than overwhelming.
- **App as continuation** — the port-day companion *after* the web plan has
  already delivered value, not the first ask.
- **Calm, clear disclosure** — the Viator / excursion affiliate disclosure stated
  plainly; honesty is part of the comfort.
- **No surprise pressure, no fake scarcity** — no countdowns, "only X left," or
  "most people pick this."

**The longer monetary arc** (money always follows trust):

```
planner_start → planner_complete → email_submitted → excursion_click
   → app_store_click → (eventually) Port Pass / annual subscription
```

Do **not** over-prioritize the app purchase, Port Pass, or subscription before
trust is built on the web. The app and any paid tier should feel like the natural
port-day continuation, earned by the value already shown.

---

## 6A. Website / funnel first, app later

**Redesign the homepage and the Nassau web funnel first; the app redesign comes
later.** The web funnel is the **trust-building layer** that earns the right to
ask for money.

- The web plan must deliver value **before** any app purchase or excursion
  booking — those asks are earned after the planner gives value, never first.
- The app CTA is the **natural continuation** of the trusted web plan (saved
  plan, departure reminders, map, in-app concierge for port day) — not a
  pre-trust pop-up, gate, or interstitial.
- Scope for this web work is the homepage and `/nassau/plan` funnel (Nassau V1).
  Do not redesign or re-prioritize the mobile app here.
- Primary conversion metrics remain exactly: `planner_start`,
  `planner_complete`, `email_submitted`, `excursion_click`, `app_store_click`.

---

## 7. Visual principles

- **Restrained, warm coastal system.** Sand/shell-dominant light surfaces (~80%),
  with at most a couple of deliberate Deep Teal / Harbor anchor panels (~20%:
  footer, excursions CTA). Color carries meaning, not decoration.
- **Tokens, not raw hex.** Current implemented tokens live in `app/globals.css`
  `@theme` (see §8 for the warm evolution direction):

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

- **Hierarchy that breathes.** Generous, consistent, brochure-like spacing; one
  primary action per screen; secondary actions visibly quieter. The return time
  is the loudest element on the result screen.
- **Imagery with intent.** Real Nassau/port imagery and honest product mockups;
  use the existing "Photo coming soon" placeholder over generic stock. Soft,
  coastal, Deep-Teal-tinted depth instead of harsh near-black shadows.
- **Structure encodes truth.** Eyebrows, numbered steps, and dividers reflect a
  real sequence (the day's timeline, the funnel steps), not decoration.

---

## 8. Palette direction (warm coastal evolution)

The §7 table is the **current implemented** system. The **direction** for the
redesign warms it toward a Bahamas resort mood, inspired by the founder's
moodboard (reference only — never copy its image, layout, or artwork). Treat
these as *directional targets, not rigid tokens*: tune for contrast and
readability, and only promote them to real `@theme` tokens at implementation time
(with approval).

| Role | Direction | Approx hex |
|---|---|---|
| Shell / cream base | warm paper background | `#F8F4EA` / `#F1E9DF` |
| Sand neutral | warm beige / soft stone | warm beige |
| Soft blush accent | muted blush — **accent only** | ~`#F4B7C3` |
| Aqua mist | soft water tone — supports calm | ~`#BFECEC` |
| Lagoon teal | calm island teal | ~`#4F8D90` |
| Harbor blue/teal | grounded decision tone | ~`#455F76` |
| Deep CTA teal | keep/refine current Deep Teal **only if** contrast holds | current `#0e5a67` |
| Cream cards | card surfaces lift gently off the shell base | cream |

Palette rules (non-negotiable):

- **Restraint over a rainbow** — a few harmonized tones used with meaning, never
  a tropical rainbow.
- **CTA contrast must stay strong** — decision moments carry Deep Teal / Harbor,
  never blush or pale aqua.
- **Body-text readability wins** over palette fidelity, always.
- **Blush is an accent, not a conversion color** — never the primary CTA, never
  load-bearing for meaning.
- **Aqua mist + Lagoon teal support trust and calm** (backgrounds, chips, soft
  accents); they don't drive actions.
- **Deep teal + harbor carry decision moments** (primary CTAs, the return-time
  emphasis, key confirmations).

---

## 9. Motion principles

Motion **whispers**; it confirms and guides, it never performs.

- **Allowed:** one-shot reveal of the return-time payoff; a calm itinerary-row
  stagger when the full plan unlocks; a restrained homepage load hierarchy
  (badge → headline → subcopy → CTA); smooth progress-bar and button-press
  feedback; quiet hover lifts.
- **Forbidden:** count-ups, confetti, pulsing/countdown deadlines, slot-machine
  number rolls, looping animation, scroll-jacking, heavy parallax, video
  backgrounds, `background-attachment: fixed` on mobile.
- **Technique:** prefer opacity + small transform; keep it GPU-friendly,
  one-shot, sub-second. Don't delay primary-CTA usability.
- **Reduced motion is mandatory.** Every animation must have a
  `@media (prefers-reduced-motion: reduce)` path that disables or neutralizes it;
  programmatic scrolling must honor the preference (pattern already in
  `PlanBuilder.tsx`).

"Dynamic" for ShoreDay means *purposeful orchestration and a strong hero thesis*,
not animation density.

---

## 10. Typography direction

Move away from pure SaaS typography toward a warm, editorial resort feel — but
only where it adds reassurance, never at the cost of legibility.

- **One display face, maximum**, used with restraint for *selective* headings
  (hero headline, result/section titles). Evaluate in order of safety:
  Fraunces-style warm editorial → Cormorant Garamond-style resort editorial →
  Playfair/Cormorant mood *only if* readability holds → a safe **system serif
  fallback** if adding a webfont is too risky. No new font dependency without
  approval, and respect the performance budget.
- **Body / UI text stays practical and high-trust** — keep Plus Jakarta Sans (or
  an equally legible humanist sans) for everything functional.
- **Numeric timing results stay highly readable and confidence-building** — the
  return time is an operations readout, not a decorative flourish; never set it
  in a thin or italic display weight that weakens it.
- Don't let the planner drift into **wedding-moodboard or fashion-magazine**
  territory. Editorial warmth, yes; precious, no.

---

## 10A. Media library strategy

ShoreDay should use **real Nassau/Bahamas imagery and video from the ShoreDay
Media Library** to make cruisers feel like they are *already there* — the trusted
vacation-brand / resort / cruise-excursion / island-hospitality feeling — while
staying independent, practical, and ship-time-aware.

Source of truth is the **ShoreDay Media Library** Google Drive (owner
`cam@shoredayapp.com`), inventoried in
[`ShoreDay-Media-Asset-Map.md`](./ShoreDay-Media-Asset-Map.md). Known subfolders:
`01_Nassau_Images`, `02_App_Screenshots_UI`, `03_Nassau_Videos`.

Guidance:

- Use **real Nassau** harbor / beach / street / taxi / water / excursion imagery
  where it fits the context.
- Use **app screenshots only where they prove product utility** (itinerary,
  ship-alert, excursion, AI concierge, map, notifications) near a real claim.
- **Avoid generic random stock** when ShoreDay-owned/licensed media already
  covers the need.
- **Do not imply a specific experience** unless the image actually matches that
  context.
- Use imagery to **lower anxiety and make spending feel safer**, not as
  decoration.
- **Final asset selection requires a human visual review before copying anything
  into the repo.** Drive is reference; nothing is auto-imported.

---

## 10B. Image use rules

- **Homepage hero:** use the strongest real Nassau **harbor / aerial** image if
  it improves trust, contrast, and conversion — it must never fight headline or
  CTA legibility (apply an overlay/scrim and test contrast).
- **Planner / timeline:** small contextual imagery is fine **only when it
  clarifies the plan** (e.g. a stop's category), never as filler. The existing
  "Photo coming soon" placeholder is preferred over a mismatched stand-in.
- **Excursion cards:** use real excursion / category images where available.
- Keep all images **optimized** (WebP/AVIF or well-compressed JPEG). Library
  source files are very large (many 3–35MB) and must be resized/recompressed.
- Use **descriptive alt text** for every meaningful image.
- **Avoid image clutter** — each image earns its place.
- The **LCP image** (usually the hero) must be carefully optimized, correctly
  sized, and prioritized; everything else lazy-loads.

---

## 10C. Video use rules

- Video can create an "already there" feeling but **must not slow the funnel**.
- **Never** use raw large MOV/MP4 directly in production — library clips run from
  tens of MB up to ~2.5GB and must be compressed first.
- Any production video must be **compressed, muted, short, non-essential, and
  have a static poster/fallback image**.
- **No autoplay sound.**
- **No video that competes with CTA clarity** or the timing answer.
- **Avoid video on mobile** unless performance is proven (prefer a static poster
  there).
- **Respect `prefers-reduced-motion`** — show the static poster instead of
  playing.
- Adding video is "needs explicit approval + performance review," not a default.

---

## 11. Copy principles

- Write from the user's side of the screen: plain verbs, sentence case, active
  voice, no filler. Name things by what the cruiser controls and recognizes.
- An action keeps its name through the flow (the button that says "Calculate
  recommended return target" leads to a screen about that return target).
- Treat errors and empty states as direction, not mood: say what happened and
  what to do next, in ShoreDay's calm voice.
- Honesty as a feature: always frame timing as a *planning buffer* with the
  cruise line's official all-aboard time as the final authority.
- Reassuring, concierge-like helper text near decisions — warm, not pushy.
- No generic AI marketing voice ("Revolutionize...", "Unlock the power of...").
- **All customer-facing times stay in AM/PM format.**

---

## 12. Mobile-first rules

- Design the phone layout first; most cruisers are on mobile before/at port.
- Primary action thumb-reachable; touch targets ≥44px.
- No horizontal scroll; no fixed-background repaint jank on touch devices
  (restore any parallax only on large, pointer-capable screens).
- Test the funnel end-to-end at ~360–390px width.
- Keep payloads light: optimized images, lean JS, server-render where possible.

---

## 13. 21st.dev usage rules

- Use https://21st.dev for **inspiration and component-pattern reference only.**
- **Do not** paste third-party component code into production unless it is:
  reviewed, dependency-free (or dependency-approved), accessible, mobile-safe,
  and compatible with the current Next.js app.
- **Do not** add shadcn/ui, Radix, animation libraries, or component packages
  without explicit approval. Anything that pulls a new dependency is "needs
  sign-off first," not "install and see."

---

## 14. Accessibility & performance rules

- Semantic HTML first; ARIA only to fill genuine gaps.
- Visible keyboard focus on every interactive control (the global focus ring in
  `globals.css` is the floor — don't remove it).
- WCAG 2.1 AA contrast for text and meaningful UI (re-check any warm-palette
  surface/text pairing — warm tones can quietly fail contrast).
- Respect `prefers-reduced-motion` everywhere (see §9).
- Keep the homepage server-rendered; don't convert it into a heavy client
  component just to add motion.
- Lean JS, optimized imagery, minimal layout shift; protect Core Web Vitals.
- **Preserve analytics and the Kit save flow as a performance/behavior
  invariant** — they are part of "it works," not optional polish.

---

## 15. Anti-slop checklist

Run before calling any change done:

- [ ] First impression lands "this feels like vacation" before any time/email/
      money ask (emotional sequence respected).
- [ ] Reads as a calm port-day companion / concierge, not a tech product.
- [ ] Hero/result leads with a ShoreDay truth (return time / real plan), not a
      templated pattern.
- [ ] Exactly one obvious primary action per screen.
- [ ] All motion one-shot, calm, and reduced-motion-safe.
- [ ] Mobile-first verified: no fixed-bg jank, no h-scroll, thumb-reachable CTA,
      ≥44px targets.
- [ ] Palette restrained and coastal (no rainbow); blush an accent only;
      decision moments carry Deep Teal / Harbor; CTA contrast strong.
- [ ] Editorial display used sparingly; body + timing numerals stay highly legible.
- [ ] The ask is earned by value shown — no front-loaded app/Port Pass push, no
      pressure, no fake scarcity.
- [ ] Web funnel first: scoped to homepage / `/nassau/plan` (not an app
      redesign); app CTA framed as natural continuation.
- [ ] Imagery is real Nassau/ShoreDay media (not generic stock where owned media
      exists), context-accurate, optimized, with descriptive alt text.
- [ ] Any video is compressed, muted, short, has a static poster, no autoplay
      sound, reduced-motion-safe, not on mobile unless proven.
- [ ] LCP image optimized and prioritized; no image clutter.
- [ ] No purple/neon gradients, no dark-mode-gallery look, no gamified effects.
- [ ] No fabricated proof or new claims (see §16).
- [ ] Times still AM/PM.
- [ ] Analytics events/payloads and `data-analytics-*` untouched; Mixpanel
      forwarding intact.
- [ ] Kit save flow untouched.
- [ ] No new dependencies / no `package.json` or lockfile change.
- [ ] Keyboard focus visible and contrast AA on every new/changed control.

---

## 16. "Do not invent claims" rules

ShoreDay never asserts, implies, or designs UI around:

- "Guaranteed return" / "you'll never miss your ship." We provide a **planning
  buffer**, and the cruise line's official all-aboard time is always the final
  word.
- "Live AI generation," "live port conditions," or any real-time data we do not
  actually have — and never imply the web planner is live AI generation.
- Ratings, star counts, review numbers, testimonials, or cruise-line
  endorsements/partnerships we do not have.
- Any new customer-facing claim not already approved in the current production
  copy.

When a section feels like it wants social proof, use honest, already-approved
framing only (e.g., "Perfect for passengers on Royal Caribbean, Carnival & NCL,"
the Viator / Tripadvisor sourcing disclosure). Never fabricate proof or urgency.

---

## Appendix: design tooling notes

- **Installed (global):** Anthropic `frontend-design` skill
  (`~/.claude/skills/frontend-design/`) — general "distinctive, not templated"
  design craft. Apache-2.0.
- **Evaluated, not installed:** `ui-ux-pro-max` (nextlevelbuilder). Its core
  workflow requires running bundled Python scripts (`scripts/search.py`) over
  bundled databases, and its recommended install is an npm/npx CLI or a
  third-party marketplace plugin that bundles ~67 executable scripts and requires
  trust. Under ShoreDay's no-scripts / no-npm / no-broad-trust rules it was **not
  installed**; its safe, generic design principles (token discipline, type scale,
  accessibility, stack-aware patterns) are folded into this doctrine and the
  ShoreDay skill instead.
- **Moodboard reference:** the founder's Bahamas palette/typography moodboard is
  used for color, type, and emotional direction only — never copied as image,
  layout, or artwork.
