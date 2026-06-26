# Kit integration — Nassau Plan Save

Wires the `/nassau/plan` email save gate to Kit (formerly ConvertKit) via a
server-only route. The Kit API key never reaches the browser.

## Required environment variables (server-only)

Set these in `.env.local` (gitignored) or the host's env. **Never** prefix with
`NEXT_PUBLIC_` and never commit real values.

| Env var | Required | Purpose |
| --- | --- | --- |
| `KIT_API_KEY` | **Yes** | Kit **V4** API key. Read only server-side in `app/api/kit/nassau-plan/route.ts`. When absent, the route returns `503 kit_not_configured`. |
| `KIT_NASSAU_PLAN_SEQUENCE_ID` | **Yes** | Id of the `Nassau Plan Delivery` sequence (**2807323**) that actually emails the saved plan — saved-plan subscribers are enrolled into it. When absent, the route returns `503 delivery_not_configured` and the email gate stays in its honest local-only mode. |
| `KIT_NASSAU_PLAN_FORM_ID` | Optional | Id of a "Nassau Plan Save" Kit form (see below). When set, subscribers are also attached to that form. When absent, the `Lead - Nassau Planner` tag is the segmentation. |

The email gate only collects an email when Kit is **fully wired for delivery**.
`isNassauPlanDeliveryConfigured()` (`lib/kit-nassau-config.ts`) returns `true`
only when BOTH `KIT_API_KEY` and `KIT_NASSAU_PLAN_SEQUENCE_ID` are set;
`app/nassau/plan/page.tsx` passes that boolean to the client as `kitConfigured`
(neither the key nor the sequence id crosses to the client — only the boolean).
`isKitConfigured()` (key only) remains for server-side checks.

## Kit assets (ShoreDay account 2772755, created 2026-06-26)

IDs are non-secret and live in `lib/kit-nassau-config.ts`.

**Tags**

| Name | Id | Applied when |
| --- | --- | --- |
| `Lead - Nassau Planner` | 20655658 | every save |
| `Lead - Exact Time Calculator` | 20655659 | `planMode === "exact-time"` |
| `Lead - Starter Plan` | 20655660 | `planMode === "starter"` |
| `Consent - Nassau Tips` | 20655661 | **only** if the optional tips checkbox is checked |

**Custom fields** (key = label): `shoreday_plan_type` (1297550),
`shoreday_return_target` (1297551), `shoreday_all_aboard_time` (1297552),
`shoreday_step_off_time` (1297553), `shoreday_group_type` (1297554),
`shoreday_worry` (1297555), `shoreday_budget` (1297556), `shoreday_plan_mode`
(1297557), `shoreday_source` (1297558).

**Form** — none created. Kit forms cannot be created via API. The older
`ShoreDay Nassau Port Playbook` form (id 9599500) is a different lead magnet and
is **not** reused. To attach a real form, create "Nassau Plan Save" in the Kit
dashboard and set `KIT_NASSAU_PLAN_FORM_ID`.

**Sequence (plan delivery)** — `Nassau Plan Delivery` (id **2807323**, sender
`cam@shoredayapp.com`, sends daily at 11:00 ET, repeat off). Contains one email
(id **10009134**, subject "Your Nassau return target is saved", delay 0h) that
thanks the saver, restates the recommended return target via the
`{{ subscriber.shoreday_return_target }}` Liquid tag (with a default fallback),
and links back to `https://shoredayapp.com/nassau/plan`. It does **not** claim to
contain the full itinerary (stops are computed client-side and not stored) and
makes no return guarantee.

> ⚠️ The email is created as an **unpublished draft**. Enrollment works as soon
> as `KIT_NASSAU_PLAN_SEQUENCE_ID` is set, but it **must be reviewed and published
> in Kit before production** (`https://app.kit.com/sequences/2807323`). Until it is
> published, **live delivery does not happen** — subscribers are captured and
> enrolled, but no email is sent.

## Route — `POST /api/kit/nassau-plan`

Accepts JSON: `email`, `marketingConsent`, `planMode` (`exact-time` | `starter`),
`planType`, `returnTarget`, `stepOffTime`, `allAboardTime`, `groupType`, `worry`,
`budget`, `source`, `currentPath`. Validates with Zod (`email` via
`emailFieldSchema`).

1. No `KIT_API_KEY` → `503 { ok:false, error:"kit_not_configured" }` (never fakes success).
2. No `KIT_NASSAU_PLAN_SEQUENCE_ID` → `503 { ok:false, error:"delivery_not_configured" }`,
   checked **before** any subscriber is created (never capture a lead we can't email).
   Both not-configured responses carry the truthful copy *"Email saving is not
   configured yet. You can still view the plan locally."* — the client treats them as
   the local fallback and reveals the plan **without** claiming a save.
3. **Required** — upserts the subscriber and writes the delivery custom fields.
4. **Best-effort** — optionally attaches to `KIT_NASSAU_PLAN_FORM_ID` if set; a
   failure is logged server-side (op + HTTP status, no secrets) and never blocks the save.
5. **Required** — applies `Lead - Nassau Planner` + the mode tag, plus `Consent -
   Nassau Tips` **only** when `marketingConsent` is true. Each tag is awaited and
   checked; any failure returns `502 kit_error` and never `ok:true`, so a saved
   subscriber can't silently be missing the tags delivery/marketing rely on. Consent
   stays separate — the Tips tag is required only when the box was checked.
6. **Required** — enrolls the subscriber into `KIT_NASSAU_PLAN_SEQUENCE_ID`. A
   failure returns `502 kit_error` and does **not** report success, so the
   "we'll email your return target" promise is never made unless delivery is wired.
7. Returns `{ ok:true }` **only after every required operation above succeeds**;
   otherwise `{ ok:false, error, message }` and the client keeps the plan hidden
   (except the not-configured local fallback in steps 1–2).

## Consent model

Saving a plan = a transactional subscriber upsert (the user clicked "Save & Show").
Marketing consent is **separate**: only the `Consent - Nassau Tips` tag indicates
opt-in. **Owner responsibility:** target marketing broadcasts/sequences at the
`Consent - Nassau Tips` tag — never at all subscribers — so saving a plan never
implies a marketing opt-in.

## Enabling in production

1. Create a V4 API key in Kit and set `KIT_API_KEY` in the server env.
2. Set `KIT_NASSAU_PLAN_SEQUENCE_ID=2807323` in the server env.
3. **Review and publish** the `Nassau Plan Delivery` email in Kit
   (`https://app.kit.com/sequences/2807323`) — enrollment captures subscribers,
   but nothing sends until the email is published.
4. (Optional) Create the "Nassau Plan Save" form in the Kit UI and set `KIT_NASSAU_PLAN_FORM_ID`.
5. (Optional) Add a separate automation that sends Nassau tips to the `Consent - Nassau Tips` tag.
6. The email gate activates automatically once both `KIT_API_KEY` and `KIT_NASSAU_PLAN_SEQUENCE_ID` are present.
