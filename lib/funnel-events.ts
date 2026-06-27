/**
 * Nassau Funnel V1 — canonical analytics event contract (spec §12).
 *
 * This module DEFINES the typed event names and property shape only. It does NOT
 * send events anywhere (no GA4, no network, no transport). It must never carry
 * PII: no email, name, raw personal data, Firebase tokens, or affiliate
 * identifiers containing PII (spec §14).
 *
 * Count reconciliation: spec §12 defines exactly 14 WEB event names (below) and a
 * separate set of 12 APP events (`SPEC_APP_EVENTS`, verified in the mobile app,
 * not emitted here). The "17" referenced during authorization matches neither
 * list. The web funnel implements the spec's 14 web events; the app set is listed
 * only to account for the full analytics surface (14 + 12).
 *
 * Owner concept (Phase 10) → spec event name:
 *   landing viewed          → landing_view
 *   quiz started            → planner_start
 *   quiz step viewed        → planner_step_view
 *   quiz step completed     → planner_step_complete
 *   calculator completed    → planner_complete
 *   partial result viewed   → port_math_view
 *   email gate viewed       → email_gate_view
 *   email submitted         → email_submitted
 *   full result viewed      → results_view
 *   excursion impression    → excursion_card_view
 *   excursion clicked       → excursion_click
 *   app CTA viewed          → app_card_view
 *   app CTA clicked         → app_store_click
 *   saved plan viewed       → plan_share   (nearest spec event; saved-link views reuse it)
 */

/** The exact 14 web event names from spec §12, in funnel order. */
export const FUNNEL_EVENTS = [
  'landing_view',
  'planner_start',
  'planner_step_view',
  'planner_step_complete',
  'planner_complete',
  'port_math_view',
  'email_gate_view',
  'email_submitted',
  'results_view',
  'excursion_card_view',
  'excursion_click',
  'app_card_view',
  'app_store_click',
  'plan_share',
] as const;

export type FunnelEventName = (typeof FUNNEL_EVENTS)[number];

/**
 * Spec §12 "app events to verify already exist or add" — owned by the ShoreDay
 * mobile app and verified there, NOT emitted by the web funnel. Listed only to
 * reconcile the full analytics surface (14 web + 12 app).
 */
export const SPEC_APP_EVENTS = [
  'first_open',
  'onboarding_start',
  'onboarding_complete',
  'excursion_tab_view',
  'concierge_question_1',
  'concierge_question_2',
  'concierge_question_3',
  'paywall_view',
  'paywall_trigger',
  'port_pass_purchase',
  'annual_purchase',
  'departure_alert_set',
] as const;
export type SpecAppEventName = (typeof SPEC_APP_EVENTS)[number];

/** Coarse days-to-port buckets (avoids storing exact dates in analytics). */
export const DAYS_TO_PORT_BUCKETS = ['le_3', '4_7', '8_14', 'ge_15', 'unknown'] as const;
export type DaysToPortBucket = (typeof DAYS_TO_PORT_BUCKETS)[number];

/**
 * Allowed, non-PII event properties (spec §12). All optional. `excursion_id`,
 * `offer_priority`, etc. carry no personal data. Index signature is intentionally
 * absent so only declared keys are accepted.
 */
export interface FunnelEventProperties {
  plan_id?: string;
  port?: 'nassau';
  days_to_port_bucket?: DaysToPortBucket;
  party_type?: string;
  planning_state?: string;
  angle?: string;
  source?: string;
  campaign?: string;
  creative_id?: string;
  excursion_id?: string;
  offer_priority?: string;
  /** Step index for planner_step_view / planner_step_complete (1–5). */
  step?: number;
  /**
   * Privacy-safe operational dimensions for the web funnel instrumentation.
   * None of these carry PII — they are coarse, enumerable categories used to
   * segment funnel behaviour (not user identity).
   */
  /** Planner path the user is on. */
  mode?: 'default' | 'times' | 'fast';
  /** Derived plan-style bucket (e.g. "Low-Stress Independent Planner") — a category, never free user text. */
  result_type?: string;
  /** Where in the UI the event originated (e.g. "home_hero", "starter_card"). */
  surface?: string;
  /** App store for app_store_click. */
  store?: 'apple' | 'google';
}

export interface FunnelEvent {
  name: FunnelEventName;
  properties: FunnelEventProperties;
}

/**
 * The complete allow-list of property keys an event may carry. Anything not in
 * this set is an unknown key and must be dropped before storage. Kept in sync
 * with `FunnelEventProperties` above.
 */
export const FUNNEL_EVENT_PROPERTY_KEYS = [
  'plan_id',
  'port',
  'days_to_port_bucket',
  'party_type',
  'planning_state',
  'angle',
  'source',
  'campaign',
  'creative_id',
  'excursion_id',
  'offer_priority',
  'step',
  'mode',
  'result_type',
  'surface',
  'store',
] as const;

const ALLOWED_PROPERTY_KEYS: ReadonlySet<string> = new Set(FUNNEL_EVENT_PROPERTY_KEYS);

/**
 * Return a copy of `properties` containing only allow-listed keys. Unknown keys
 * are silently dropped — a defensive filter so an unexpected (or PII-shaped) key
 * never reaches a future durable store. Does NOT mutate the input.
 */
export function pickAllowedProperties(
  properties: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(properties)) {
    if (ALLOWED_PROPERTY_KEYS.has(key)) out[key] = properties[key];
  }
  return out;
}

/** Property keys that must never appear on an event (defensive PII guard). */
export const FORBIDDEN_PROPERTY_KEYS = [
  'email',
  'name',
  'first_name',
  'firstname',
  'last_name',
  'phone',
  'password',
  'token',
  'id_token',
  'access_token',
  'uid',
] as const;

function looksLikePii(key: string): boolean {
  const k = key.toLowerCase();
  return FORBIDDEN_PROPERTY_KEYS.some((bad) => k === bad || k.includes(bad));
}

/**
 * Defensive runtime guard: throws if a property key looks like PII. Useful when
 * properties originate from loosely-typed callers.
 * @throws if any forbidden key is present.
 */
export function assertNoPii(properties: Record<string, unknown>): void {
  for (const key of Object.keys(properties)) {
    if (looksLikePii(key)) {
      throw new Error(`Funnel event property "${key}" is not allowed (possible PII).`);
    }
  }
}

/**
 * Pure constructor for a typed funnel event. Validates the name and runs the PII
 * guard. Does NOT transmit anything — wiring to an analytics sink is a later gate.
 */
export function createFunnelEvent(
  name: FunnelEventName,
  properties: FunnelEventProperties = {},
): FunnelEvent {
  assertNoPii(properties as Record<string, unknown>);
  return { name, properties };
}

/** Bucket a `days_to_port` integer into a coarse, PII-free band. */
export function daysToPortBucket(daysToPort: number | undefined): DaysToPortBucket {
  if (daysToPort === undefined || !Number.isFinite(daysToPort)) return 'unknown';
  if (daysToPort <= 3) return 'le_3';
  if (daysToPort <= 7) return '4_7';
  if (daysToPort <= 14) return '8_14';
  return 'ge_15';
}
