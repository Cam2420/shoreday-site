# ShoreDay Nassau Funnel V1 — Build Specification

**Purpose:** Codex/Claude Code implementation brief  
**Sources of truth:**  
1. `ShoreDay Master Research Dump.gdoc`  
2. `claudecode+apifyresearch06-22-26.md`  
**Scope:** Nassau only. Prove the acquisition and monetization loop before cloning to Freeport or Bimini.

---

## 0. Evidence Reconciliation and Final Decisions

Use the two research sources for different jobs:

- **Master Research Dump:** market facts, Viator terms, port-time constraints, broad customer journey, economics, safety/trust boundaries.
- **Claude Code + Apify scrape:** direct VOC, pain ranking, content hooks, platform behavior, and current ShoreDay content signals.

Where they conflict, use these decisions:

1. **Do not target “women 28–44” in product copy.**  
   Use a gender-neutral planning role: one partner or parent drives the research. The scrape could not identify gender reliably; that means gender is unknown, not proven 50/50.

2. **Do not hard-code a 2–4 week planning window.**  
   Capture `days_to_port` and route offers dynamically. The evidence supports post-booking planning but not one universal window.

3. **Discovery and conversion use different fears.**
   - Discovery: cost/value, planning overwhelm, vendor pressure.
   - Conversion: realistic port math, schedule fit, return confidence.
   - Do not lead every piece of content with “miss the ship.”

4. **TikTok and Reddit have different roles.**
   - TikTok/Instagram: content-demand and scalable discovery.
   - Reddit/cruise communities: confirmed active research and trust.
   - Google SEO: high-intent compounding acquisition.
   Do not declare one universal “primary channel” until revenue attribution exists.

5. **One anchor activity beats a packed itinerary for V1.**  
   The planner should produce a simple day shape, three eligible excursion choices, and a return target—not a dense minute-by-minute schedule.

6. **Excursion-first is the default early monetization path.**  
   App-first applies when the traveler already booked, prefers DIY, or is close to port day.

7. **All safety-critical timing is deterministic.**  
   AI may explain or personalize. AI may not calculate the return target or eligibility window.

---

## 1. Final ICP

### Primary: First-Time Couple / Small-Group Planner

- First-time or near-first-time cruiser or Nassau visitor.
- Couple or small travel party, usually 2–4 people.
- One person owns research and coordination.
- Has booked the cruise but has not finalized Nassau.
- Wants independent value without unsafe logistics, wasted time, or an unrealistic plan.
- Searches Reddit, TikTok, Google, YouTube, and cruise communities.

### Secondary: Planning Parent

- Family of 3–5 with school-age children.
- Higher excursion order value and higher trust burden.
- Needs age fit, simple transport, contained environments, and conservative timing.

### Later: Repeat Cruiser / Budget Insider

- More experienced, skeptical, and price sensitive.
- Wants local alternatives and cost comparisons.
- Better affiliate prospect than app-paywall prospect unless ShoreDay delivers genuinely novel insider value.

---

## 2. Funnel Goal and North Star

### Funnel goal

Turn a qualified Nassau planner into one or both of:

1. An attributed Viator excursion click/booking.
2. A ShoreDay app user who reaches the concierge/paywall and purchases access.

### North Star

**Net revenue per verified port plan**

A `verified_port_plan` requires:

- Nassau port date captured.
- User confirms their official all-aboard time.
- Results page viewed.

### Core funnel

```text
TikTok / Instagram / Google / Reddit
        ↓
Channel-matched Nassau bridge page
        ↓
5-step planning quiz
        ↓
Deterministic “real usable window” preview
        ↓
Soft email gate
        ↓
Full day shape + 3 eligible excursions
        ↓
Intent/time-routed primary offer
        ├── Viator excursion
        └── ShoreDay app
                 ↓
        Excursion tab + 3 AI questions
                 ↓
        $9.99 Port Pass / $19.99 annual
```

---

## 3. Routes

Build these routes only:

```text
/nassau
/nassau/plan
/nassau/results/[planId]
/nassau/plan/[planId]        # saved email link
/api/plans
/api/plans/[planId]
/api/kit/subscribe
/api/events/excursion-click
/api/cron/lifecycle
```

Do not build Freeport/Bimini variants until Nassau produces verified plans and revenue.

---

## 4. Landing / Bridge Page

### URL parameters

Persist these into the plan record:

```text
utm_source
utm_medium
utm_campaign
utm_content
creative_id
angle = budget | timing | family | overwhelm | local
```

### Message matching

Use one shared page with a small set of hero variants:

| Angle | Hero direction |
|---|---|
| `budget` | Nassau does not have to cost a cruise-line fortune. Build a plan that fits your time and budget. |
| `timing` | You do not actually have the full scheduled port call. See your realistic Nassau window. |
| `family` | Build a Nassau day that works for your family and your all-aboard time. |
| `overwhelm` | You just docked in Nassau. Turn limited time into one clear plan. |
| default | Build your Nassau port day around your confirmed all-aboard time. |

### Page structure

1. Eyebrow matching the source angle.
2. Outcome-focused headline.
3. One-sentence explanation.
4. Sample Back-to-Ship visual.
5. Three trust points:
   - Free plan preview.
   - No app required to view the web result.
   - Always follow official cruise-line instructions.
6. One primary CTA: **Build My Nassau Plan**
7. No full navigation and no competing store buttons above the fold.

### Do not claim

- “Never miss your ship.”
- “Guaranteed return.”
- “Official all-aboard verification.”
- “Live traffic-adjusted alerts.”
- “Offline AI concierge.”

---

## 5. Planning Quiz

Keep the experience to five screens. Nassau is preselected.

### Step 1 — Cruise context

Fields:

```text
ship_name: string
port_date: date
```

Copy must distinguish `port_date` from cruise departure date.

### Step 2 — Time inputs

Fields:

```text
expected_step_off_time: time
all_aboard_time: time
all_aboard_confirmed: boolean
```

Required checkbox:

> I entered the passenger all-aboard time from my cruise app or daily planner, not the scheduled ship departure time.

### Step 3 — Travel party

Fields:

```text
party_type: solo | couple | family | friends
party_size: integer 1–10
children_present: boolean
youngest_child_age: optional integer
mobility_note: optional enum
```

### Step 4 — Planning state

One required answer:

```text
planning_state:
  unbooked_anchor
  already_booked
  mostly_diy
  undecided
```

Question direction:

> What would make Nassau easier right now?

### Step 5 — Main priority

Choose up to two:

```text
priorities:
  budget
  beach
  local_food
  history
  family_easy
  adventure
  low_vendor_pressure
  easy_logistics
```

### Quiz progress

Track step views and completions. Allow back navigation without losing state.

---

## 6. Deterministic Port-Math Engine

Store all times in `America/Nassau` and retain the original user-entered values.

### Port configuration

```ts
type PortConfig = {
  timezone: string;
  terminalBufferMinutes: number;
  defaultContingencyMinutes: number;
  minimumUsableMinutes: number;
};
```

Initial Nassau defaults must be configuration values, not scattered constants.

### Core calculation

```text
scheduled_personal_window
= all_aboard_time - expected_step_off_time

recommended_terminal_return
= all_aboard_time - terminal_buffer

usable_planning_window
= recommended_terminal_return - expected_step_off_time
```

For a specific excursion or final stop:

```text
leave_final_stop_by
= recommended_terminal_return
  - conservative_return_travel_minutes
  - contingency_minutes
```

### Rules

- Reject impossible or overnight time sequences.
- Flag windows below the configured minimum.
- Never let an LLM produce these values.
- Label output as a planning recommendation.
- Tell the user to reconfirm all-aboard time after boarding.

---

## 7. Preview Before Email

The preview must be genuinely useful.

Display:

1. Ship and Nassau date.
2. User-confirmed all-aboard time.
3. Recommended terminal-return target.
4. Realistic usable planning window.
5. A simple three-block day shape:
   - Step ashore / transport.
   - One anchor experience.
   - Optional food/local stop and return.
6. One eligible excursion teaser.

Do not reveal only a persona label or blurred screen.

### Soft gate

Headline direction:

> Your Nassau plan is ready to save.

User receives after email:

- Full saved results link.
- All three excursion recommendations.
- Detailed day shape.
- Date-based reminders.

Required:

```text
email
delivery consent
```

Optional and separate:

```text
marketing consent
```

---

## 8. Excursion Recommendation Engine

Use curated, tagged products. Do not let AI select from raw Viator descriptions.

### Excursion schema

```ts
type Excursion = {
  id: string;
  viatorProductCode: string;
  name: string;
  affiliateUrl: string;
  port: "nassau";
  durationMinutes: number;
  outboundTravelMinutes: number;
  returnTravelMinutes: number;
  startTimeFlexibility: "fixed" | "multiple" | "open";
  priorities: string[];
  partyTypes: string[];
  minAge?: number;
  familyFit: 1 | 2 | 3 | 4 | 5;
  logisticsEase: 1 | 2 | 3 | 4 | 5;
  vendorPressureFit: 1 | 2 | 3 | 4 | 5;
  budgetTier: "low" | "mid" | "premium";
  minimumUsableMinutes: number;
  active: boolean;
};
```

### Eligibility

An excursion is eligible only if:

```text
duration
+ outbound travel
+ return travel
+ terminal buffer
+ contingency
<= user’s step-off-to-all-aboard window
```

For fixed-start tours, also verify the user can reach the meeting point before start.

### Ranking

Suggested score:

```text
priority match           0–6
party/group fit          0–4
schedule fit             0–4
logistics ease           0–3
family fit, if relevant  0–3
budget fit               0–2
```

### Display exactly three

- **Best value**
- **Easiest logistics**
- **Best fit for your group**

Each card must show:

- Duration.
- Why it fits.
- Estimated remaining return margin.
- Meeting/logistics summary.
- Family fit when relevant.
- “Check availability” rather than fabricated availability.
- Affiliate disclosure.

Do not display “spots left” without live data.

---

## 9. Offer Router

Calculate:

```text
days_to_port = port_date - current_date
```

### Routing rules

| Condition | Primary CTA | Secondary CTA |
|---|---|---|
| Unbooked/undecided and `days_to_port > 7` | Check excursion availability | Try ShoreDay |
| Family and eligible family excursion exists | Check family-fit excursion | Try ShoreDay |
| Already booked | Manage the rest of my day in ShoreDay | Browse another activity |
| Mostly DIY | Try ShoreDay | Add one optional activity |
| `days_to_port <= 3` | Get ShoreDay ready for port day | Last-minute excursion options |
| Multi-port/repeat intent later | Annual plan framing | Excursion |

### App-card product truth

State clearly:

- Users can browse excursions and ask three AI concierge questions before purchase.
- Continued premium access is $9.99 for one port or $19.99/year for all supported ports.
- Do not describe the app as immediately unusable without payment.
- Do not promise automatic web-plan import until implemented.

---

## 10. Kit Lifecycle

### Contact fields/tags

```text
plan_id
port
ship_name
port_date
days_to_port_at_signup
party_type
party_size
planning_state
priority_1
priority_2
source
campaign
creative_id
angle
excursion_clicked
app_clicked
self_reported_booked
```

### Minimum sequence

1. **Immediate:** saved plan, return target, three eligible options, app preview.
2. **D-10:** excursion/decision message when the port date is more than 10 days away.
3. **D-3:** app-led port-day preparation; reconfirm all-aboard and set departure reminder.
4. **D+1:** feedback, review, and referral prompt.

Skip messages whose date has passed.

### Scheduling implementation

Use a daily Vercel Cron:

```text
/api/cron/lifecycle
```

It queries Firestore plans and applies Kit tags:

```text
lifecycle_d10
lifecycle_d3
lifecycle_post_port
```

Kit automations trigger from those tags.

Do not call an excursion click a booking. Use:

```text
excursion_clicked
self_reported_booked
```

Viator remains the official booking-confirmation source unless booking-level API access is implemented.

---

## 11. Data Model

### Firestore `plans/{planId}`

```ts
type Plan = {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  source: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    creativeId?: string;
    angle?: string;
  };

  port: "nassau";
  shipName: string;
  portDate: string;
  timezone: "America/Nassau";
  expectedStepOffTime: string;
  allAboardTime: string;
  allAboardConfirmed: boolean;

  partyType: "solo" | "couple" | "family" | "friends";
  partySize: number;
  childrenPresent: boolean;
  youngestChildAge?: number;
  mobilityNote?: string;

  planningState:
    | "unbooked_anchor"
    | "already_booked"
    | "mostly_diy"
    | "undecided";

  priorities: string[];

  calculations: {
    terminalBufferMinutes: number;
    contingencyMinutes: number;
    recommendedTerminalReturn: string;
    usablePlanningMinutes: number;
    calculationVersion: string;
  };

  recommendations: string[];

  email?: string;
  deliveryConsentAt?: Timestamp;
  marketingConsentAt?: Timestamp;

  lifecycle: {
    d10Sent?: boolean;
    d3Sent?: boolean;
    postPortSent?: boolean;
  };
};
```

Never include email or other PII in Viator campaign parameters.

---

## 12. Analytics

### Web events

```text
landing_view
planner_start
planner_step_view
planner_step_complete
planner_complete
port_math_view
email_gate_view
email_submitted
results_view
excursion_card_view
excursion_click
app_card_view
app_store_click
plan_share
```

Event properties:

```text
plan_id
port
days_to_port_bucket
party_type
planning_state
angle
source
campaign
creative_id
excursion_id
offer_priority
```

### App events to verify already exist or add

```text
first_open
onboarding_start
onboarding_complete
excursion_tab_view
concierge_question_1
concierge_question_2
concierge_question_3
paywall_view
paywall_trigger
port_pass_purchase
annual_purchase
departure_alert_set
```

### Dashboard cuts

- By source and creative.
- By days-to-port bucket.
- Couple vs family.
- Planning state.
- Excursion-first vs app-first.
- Revenue per verified plan.
- Dual monetization rate.

---

## 13. Technical Stack

Recommended implementation:

- **Frontend:** Next.js App Router + TypeScript on Vercel.
- **Validation:** Zod.
- **UI:** existing ShoreDay design system/Tailwind.
- **Database:** existing Firebase Firestore.
- **Web analytics:** GA4 or existing analytics plus server-side click logging.
- **Email:** Kit API.
- **Lifecycle:** Vercel Cron + server route.
- **Affiliate:** current Viator partner links with per-placement campaign identifiers.
- **Testing:** Vitest/Jest for logic, Playwright for funnel E2E.
- **Error monitoring:** existing Firebase/compatible logging.

Keep the calculation engine as a pure TypeScript module with unit tests.

---

## 14. Accessibility, Privacy, and Safety Acceptance Criteria

- Full keyboard navigation.
- Labels on every field.
- WCAG-compliant contrast.
- Time inputs usable on mobile.
- No email stored before consent.
- Marketing consent is not bundled with plan delivery.
- Affiliate disclosure appears before/near excursion CTAs.
- User-confirmed all-aboard status is visible.
- Official-instructions disclaimer is visible.
- No absolute safety guarantee.
- No raw PII in analytics or affiliate links.

---

## 15. V1 Acceptance Criteria

The funnel is ready to publish when:

1. A mobile user can finish the quiz in under two minutes.
2. Invalid time/date combinations are blocked with helpful errors.
3. Port math is deterministic and unit-tested.
4. The preview displays value before email.
5. A saved plan can be reopened by secure link.
6. Exactly three eligible excursions display or a safe fallback appears.
7. Viator clicks are logged before navigation.
8. Kit receives the contact and correct fields/tags.
9. D-10/D-3/D+1 jobs are idempotent.
10. UTM/source/creative persist through results.
11. App pricing and three-question preview are disclosed accurately.
12. The page never claims a verified booking or guaranteed ship return.
13. Core events appear in analytics.
14. Lighthouse mobile performance is acceptable and no blocking errors occur.
15. The page works on iOS Safari and Android Chrome.

---

## 16. Do Not Build in V1

- Freeport/Bimini clones.
- Full cruise-schedule API integration.
- Automatic “official” all-aboard verification.
- Weather personalization.
- Group voting/collaboration.
- Dynamic Viator inventory or spots-left claims.
- Ten persona-specific email trees.
- Automatic Viator booking confirmation.
- Deferred deep-link plan import.
- AI-generated safety times.
- Complex user accounts on the web.

---

## 17. Implementation Sequence

### Phase 1 — Core utility

- Create research decision document in repo.
- Build routes and design shell.
- Build five-step quiz.
- Build pure port-math engine and tests.
- Build useful preview.

### Phase 2 — Lead capture and saved result

- Create Firestore plan record.
- Add email gate and Kit integration.
- Add secure saved-plan URL.
- Add consent handling.

### Phase 3 — Monetization

- Add tagged excursion catalog.
- Add eligibility/ranking engine and tests.
- Add three-card results.
- Add Viator click tracking and affiliate disclosure.
- Add time/intent offer router and app card.

### Phase 4 — Lifecycle and analytics

- Add all web events.
- Add Vercel Cron/Kit lifecycle tags.
- Verify app events and Adapty purchase events.
- Build minimal reporting query/dashboard.

### Phase 5 — Launch tests

Test one variable at a time:

1. Hero: value vs real-window framing.
2. Preview depth.
3. Excursion-first vs time-routed offer.
4. Three vs one free concierge response later in the app.
5. Native video vs slideshow traffic quality.

---

## 18. Claude Code Prompt

```text
You are the lead engineer and product designer for ShoreDay.

Read these repo documents first:
- docs/research/ShoreDay-Master-Research-Dump.md
- docs/research/claudecode-apify-research-2026-06-22.md
- docs/00-current-brief.md
- docs/funnel/ShoreDay-Nassau-Funnel-V1-Spec.md

Task:
Implement the Nassau funnel exactly as specified in
docs/funnel/ShoreDay-Nassau-Funnel-V1-Spec.md.

Before changing code:
1. Inspect the existing repository, framework, design system, Firebase setup,
   analytics, and Kit integrations.
2. Produce a short implementation plan listing:
   - files to create/change
   - data migrations/config needed
   - risks or conflicts with the existing architecture
   - assumptions that require confirmation
3. Do not invent product behavior or claims.
4. Do not build Freeport/Bimini, weather, group collaboration, schedule APIs,
   or deferred deep linking.
5. Keep safety-critical timing in a pure deterministic TypeScript module.
6. Use the existing visual language and mobile-first responsive patterns.
7. Add unit tests for all time calculations and excursion eligibility.
8. Add Playwright coverage for the happy path and invalid-time path.
9. Preserve all UTMs and creative identifiers.
10. Never put PII into analytics or Viator parameters.

After the plan, implement in small, reviewable commits on:
feat/nassau-funnel-v1

At completion, report:
- changed files
- tests run and results
- environment variables required
- manual setup required in Firebase, Kit, Vercel, and Viator
- known limitations
- screenshots or local routes to review
```

---

## 19. Codex Review Prompt

```text
Act as ShoreDay’s senior code reviewer, analytics engineer, and QA lead.

Review the branch feat/nassau-funnel-v1 against:
docs/funnel/ShoreDay-Nassau-Funnel-V1-Spec.md

Do not redesign the product. Audit whether the implementation matches the
research-backed decisions and acceptance criteria.

Check:
1. Deterministic port-math correctness, timezone handling, midnight/date edge
   cases, invalid inputs, and calculation-version storage.
2. Excursion eligibility and ranking logic, including fixed start times,
   return travel, contingency, family age limits, and safe fallback states.
3. Email/Kit consent separation, field mapping, retries, and duplicate handling.
4. Vercel Cron idempotency and missed-date behavior.
5. Analytics event names, required properties, UTM persistence, and PII leakage.
6. Viator click logging, campaign parameters, affiliate disclosure, and external
   navigation behavior.
7. Mobile accessibility and keyboard/screen-reader usability.
8. Security rules and plan-link exposure.
9. Claims that overpromise safety, verification, live availability, weather,
   offline behavior, or automatic booking confirmation.
10. Test coverage and production error handling.

Then:
- give a severity-ranked issue list
- patch critical/high issues
- add missing tests
- run typecheck, lint, unit, integration, and Playwright tests
- provide a concise ship/no-ship verdict with remaining manual checks
```

---

## 20. Launch Decision Rule

Do not scale content or paid traffic based on views.

Launch is validated only when the funnel produces:

- Verified port plans.
- Attributed excursion clicks.
- At least one confirmed Viator booking.
- App-store clicks and measurable app activation.
- Paid Port Pass or annual conversions.
- Enough data to compare revenue per verified plan by source and intent.

The first optimization target is the largest measured drop-off, not the feature
that feels most exciting.
