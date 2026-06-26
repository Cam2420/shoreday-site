# ShoreDay Nassau V1 — External Integration Preflight

**Status:** Read-only preflight, subordinate to
`docs/funnel/ShoreDay-Nassau-Funnel-V1-Spec.md`. **No external system was
created or modified.** Contains no API keys, secrets, or credentials.
**Date:** 2026-06-23.

---

## Firebase

Source: mobile code configuration only. **No Firebase MCP connector is connected
in this session**, so console-level checks (Web App registration, security-rule
contents) could not be performed and remain owner/console tasks.

| Check | Finding |
|---|---|
| Project name / ID | `bah-tourist-app` (`lib/firebase_options.dart`) |
| Firestore in use | **Yes** — mobile app reads/writes `users/{uid}` + subcollections via `cloud_firestore` |
| iOS/Android same project | Yes (single `projectId` across platform option blocks) |
| Web App registered? | **Unknown / not verifiable here** — requires Firebase console; no connected tooling |
| Separate `plans` collection safe to introduce? | **Yes, structurally** — all mobile user data is namespaced under `users/{uid}/…`; a top-level `plans` collection does not collide. (Security rules unverified — see below.) |
| Security rules | **Not inspected** — no connected Firebase tooling; do not assume. Must be reviewed in console before the web funnel writes to Firestore |

**Blockers / required owner actions (no changes made):** register a Web App (or
confirm one exists), author security rules for a top-level `plans` collection
(server-side writes via Admin SDK recommended per spec §21.7), and provision a
service account for server-side plan creation. None performed.

---

## Kit (ConvertKit)

Source: connected Kit MCP (read-only). **Nothing created or modified.**

| Item | Finding |
|---|---|
| Account | `ShoreDay` (account id `2772755`), plan `creator`, created 2026-06-14 |
| Auth user | `cam@shoredayapp.com` (user id `2860982`) |
| Sending address | `cam@shoredayapp.com` — confirmed + verified; **DMARC not configured** |
| Timezone | America/New_York (ET) |
| API access | Available via this connector (Kit v4). Read calls succeeded. |
| Connector write capability | Exposes the calls the funnel needs: `create_subscriber`, `add_subscriber_to_form`, `create_tag` / `tag_subscriber`, `create_custom_field` / `bulk_update_subscriber_custom_field_values`, `create_webhook`. (None were called.) |

**Forms (2):**

| Name | UID | Type/format | Note |
|---|---|---|---|
| ShoreDay Nassau Port Playbook | `140b41e206` | embed / inline | Live opt-in form; matches locked UID |
| Creator Profile | `1e63b53665` | embed | Default Kit creator profile form |

**Custom fields (6 existing):** `planning_intent`, `nassau_priority`,
`traveler_type`, `sail_timing`, `cruise_line`, `nassau_day_match`.

**Tags (8 existing):** `nassau`, `bahamas-cruise`, `excursion-shopper`,
`anxious-planner`, `family-travel`, `budget-traveler`, `first-time-cruiser`,
`itinerary-change`.

**Sequences:** **none** (empty). **Automations:** not enumerable via this
connector (no automations endpoint exposed); only sequences (none) and tags are
visible.

**Gap vs spec §10 (no changes made — Kit work is a later gate):**

- Lifecycle tags `lifecycle_d10`, `lifecycle_d3`, `lifecycle_post_port` do **not**
  exist yet.
- Spec contact fields not yet present as custom fields: `plan_id`, `port`,
  `ship_name`, `port_date`, `days_to_port_at_signup`, `party_type`, `party_size`,
  `planning_state`, `priority_1`, `priority_2`, `source`, `campaign`,
  `creative_id`, `angle`, `excursion_clicked`, `app_clicked`,
  `self_reported_booked`. (The 6 existing fields partially overlap intent but use
  different keys.)
- No sequences/automations exist (consistent with the M1 decision to defer
  incentive emails, sequences, and automations).

These are **not** created now — Kit lifecycle wiring is part of a later
implementation gate, and creating fields/tags/sequences is explicitly out of
scope for this foundation build.

---

## Viator

- Use only the **exact affiliate URLs** from the mobile source
  (`lib/data/excursions_data.dart`) — all 12 Nassau URLs carry `?pid=P00293644`
  and are preserved verbatim in `data/excursions/nassau.ts`.
- Do **not** replace product URLs with the generic `vi.me/s/shoredayapp`
  storefront. Do **not** append PII to affiliate URLs.
- Affiliate economics (from `docs/00-current-brief.md` §4): ~8% commission on
  completed bookings, 30-day attribution window; Standard/Basic access provides
  aggregate reporting, **not** named-user booking confirmation — hence spec §21.5
  forbids automated `booked` states.
- No Viator API integration is required or in scope for the V1 funnel logic (no
  booking-level data); affiliate links alone drive conversion.

### Viator Basic Sandbox API — status (2026-06-23)

Viator Basic Sandbox access is unresolved. The documented sandbox host and
endpoint were used, but the request returned HTTP 404. The Viator dashboard
states that key activation can take up to 24 hours. No additional retries or
production-key fallback were attempted. Retest once after the activation window;
if 404 persists, validate through Viator's official Postman collection or Partner
Support.

Secret handling for the diagnosis: the sandbox key (`.env.local` →
`VIATOR_API_KEY`, git-ignored and untracked) was never printed in any form (no
value, prefix, suffix, or hash); no raw headers were logged; the raw API response
was stored only under `/tmp` and is not in Git.

---

## Vercel

Owner-verified state (read-only; nothing deployed, Git not connected, no domains
changed). **Corrected 2026-06-23.**

| Check | Finding |
|---|---|
| Team | `ShoreDay` (slug `shore-day`, id `team_DgC2UEutGZTvXZ3wjT6JqRFN`) |
| `shoreday-site` project | **Exists** — `prj_bdEVOQRilc2EsKtJNEDyAtuUeFVo`, framework **Next.js** |
| `live` | `false` |
| Latest deployment | **None** |
| Custom domains | **None** |
| `shoredayapp.com` host | Remains on **GitHub Pages** (DNS unchanged) |
| Other team project | `shoreday-marketing` (`prj_TDRiW8NehLEtS9mvQDLPi0ODkVxC`) — separate marketing project |

> **Note:** the connected Vercel MCP token could not fetch `shoreday-site`
> (returned 404 — a connector access/scope limitation, **not** a deletion). The
> owner-verified state above is authoritative: the `shoreday-site` project exists
> and is the intended Next.js host. No Vercel work is authorized in this pass.

**Vercel GitHub App authorization** for `Cam2420/shoreday-site` is still
outstanding (carried over from M1) and remains required before Git-connected
preview deployments are possible. Not performed.

---

## Summary

| System | Confirmed | Missing capability / blocker |
|---|---|---|
| Firebase | Project `bah-tourist-app`, Firestore in use; separate `plans` collection structurally safe | Web App registration + security rules unverified (no connector); server-side credentials not provisioned |
| Kit | Account ShoreDay, API + write capability available, Playbook form `140b41e206` live | Lifecycle tags + most spec custom fields absent; no sequences/automations (deferred) |
| Viator | 12 exact Nassau affiliate URLs (`pid=P00293644`) preserved | No booking-level data (aggregate only) — automated `booked` states forbidden |
| Vercel | Team `shore-day`; `shoreday-site` project exists (Next.js, `live: false`, no deployment, no custom domains) | GitHub App auth outstanding; shoredayapp.com still on GitHub Pages until a separately approved cutover |
