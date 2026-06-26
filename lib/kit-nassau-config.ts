/**
 * Canonical Kit (formerly ConvertKit) asset identifiers for the Nassau Plan Save
 * funnel, in the ShoreDay Kit account (id 2772755, cam@shoredayapp.com).
 *
 * These IDs/keys are NON-SECRET account identifiers, created 2026-06-26. The only
 * secret is the Kit V4 API key, which is read server-side from `KIT_API_KEY`
 * (never committed, never exposed to the browser). If the Kit account changes,
 * update these IDs.
 *
 * FORM: Kit forms cannot be created via the API (UI-only). No dedicated
 * "Nassau Plan Save" form exists yet — the `Lead - Nassau Planner` tag is the
 * segmentation equivalent. To also attach subscribers to a real form, create one
 * in the Kit dashboard and set `KIT_NASSAU_PLAN_FORM_ID`.
 *
 * CONSENT: saving a plan creates/upserts a subscriber (transactional — the user
 * clicked "Save & Show"). Marketing consent is kept SEPARATE: the
 * `Consent - Nassau Tips` tag is applied ONLY when the optional checkbox is
 * checked. Owner responsibility: target marketing broadcasts/sequences at the
 * `Consent - Nassau Tips` tag, NOT at all subscribers, so plan-save never implies
 * marketing opt-in.
 */

export const KIT_API_BASE = 'https://api.kit.com/v4';

/** Server-only env var holding the secret Kit V4 API key. NEVER a NEXT_PUBLIC_* var. */
export const KIT_API_KEY_ENV = 'KIT_API_KEY';

/** Optional server-only env var: id of a "Nassau Plan Save" form created in the Kit UI. */
export const KIT_NASSAU_PLAN_FORM_ID_ENV = 'KIT_NASSAU_PLAN_FORM_ID';

/**
 * Server-only env var: id of the "Nassau Plan Delivery" Kit sequence (id 2807323
 * in the ShoreDay account, created 2026-06-26). Saved-plan subscribers are
 * enrolled into this sequence so the plan email is actually delivered. Without
 * it, the route cannot send anything, so the email gate stays in its honest
 * local-only mode and the route refuses to claim a save succeeded.
 */
export const KIT_NASSAU_PLAN_SEQUENCE_ID_ENV = 'KIT_NASSAU_PLAN_SEQUENCE_ID';

/** Tag ids in the ShoreDay Kit account (non-secret). */
export const KIT_TAGS = {
  /** Applied to every Nassau planner lead. */
  nassauPlanner: 20655658, // "Lead - Nassau Planner"
  /** Applied when the lead came through the exact-time calculator. */
  exactTimeCalculator: 20655659, // "Lead - Exact Time Calculator"
  /** Applied when the lead came through a starter plan (no exact times). */
  starterPlan: 20655660, // "Lead - Starter Plan"
  /** Applied ONLY when the optional "Nassau tips" checkbox is checked. */
  nassauTipsConsent: 20655661, // "Consent - Nassau Tips"
} as const;

/** Custom-field keys in the ShoreDay Kit account (non-secret). */
export const KIT_FIELD_KEYS = {
  planType: 'shoreday_plan_type',
  returnTarget: 'shoreday_return_target',
  allAboardTime: 'shoreday_all_aboard_time',
  stepOffTime: 'shoreday_step_off_time',
  groupType: 'shoreday_group_type',
  worry: 'shoreday_worry',
  budget: 'shoreday_budget',
  planMode: 'shoreday_plan_mode',
  source: 'shoreday_source',
  // Display fields — 12-hour AM/PM formatted versions of the three time fields,
  // written alongside the raw HH:mm fields so Kit email merge tags can show
  // "3:45 PM" instead of "15:45". Created 2026-06-26.
  returnTargetDisplay: 'shoreday_return_target_display',
  stepOffTimeDisplay: 'shoreday_step_off_time_display',
  allAboardTimeDisplay: 'shoreday_all_aboard_time_display',
} as const;

/** True when the server has a Kit API key configured. Server-only check. */
export function isKitConfigured(): boolean {
  return Boolean(process.env[KIT_API_KEY_ENV]);
}

/**
 * True only when Kit is fully wired for plan DELIVERY — both the API key AND the
 * delivery sequence id are present. The email gate shows its "we'll email your
 * return target" promise ONLY when this is true; otherwise it falls back to the
 * honest local-only reveal that collects no email. Server-only check.
 */
export function isNassauPlanDeliveryConfigured(): boolean {
  return (
    Boolean(process.env[KIT_API_KEY_ENV]) &&
    Boolean(process.env[KIT_NASSAU_PLAN_SEQUENCE_ID_ENV])
  );
}
