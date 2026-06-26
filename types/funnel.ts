/**
 * Nassau Funnel V1 — core domain types.
 *
 * Derived from `docs/funnel/ShoreDay-Nassau-Funnel-V1-Spec.md` (§5, §6, §11) and
 * the confirmed mobile source (`docs/funnel/ShoreDay-Nassau-V1-Mobile-Integration-Map.md`).
 *
 * Scope: Nassau only. No AI, no Google APIs, no live availability.
 */

/* ───────────────────────── Enumerations ─────────────────────────
 * Exported as `as const` tuples so both the type layer and the Zod
 * validation layer share a single source of truth. */

/** Supported ports. Nassau only in V1 (spec §0, §16). */
export const PORTS = ['nassau'] as const;
export type Port = (typeof PORTS)[number];

/** Quiz step 3 `party_type`. */
export const TRAVELER_GROUPS = ['solo', 'couple', 'family', 'friends'] as const;
export type TravelerGroup = (typeof TRAVELER_GROUPS)[number];

/**
 * Quiz step 5 priorities (spec §5). The funnel labels these "interests"; the
 * excursion catalog matches against the same values (`Excursion.priorities`).
 */
export const INTERESTS = [
  'budget',
  'beach',
  'local_food',
  'history',
  'nature',
  'family_easy',
  'adventure',
  'low_vendor_pressure',
  'easy_logistics',
] as const;
export type Interest = (typeof INTERESTS)[number];

/** Quiz step 4 `planning_state`. */
export const PLANNING_STATES = [
  'unbooked_anchor',
  'already_booked',
  'mostly_diy',
  'undecided',
] as const;
export type PlanningState = (typeof PLANNING_STATES)[number];

/**
 * User budget stance, aligned to `Excursion.budgetTier` for budget-fit scoring.
 * In V1 this is typically derived from quiz priorities rather than asked
 * directly (e.g. the `budget` priority → `low`).
 */
export const BUDGET_PREFERENCES = ['low', 'mid', 'premium', 'no_preference'] as const;
export type BudgetPreference = (typeof BUDGET_PREFERENCES)[number];

/**
 * Preference for guided vs. independent experiences. Captured for routing and
 * lifecycle context; the deterministic excursion score uses the spec §8 formula,
 * not this field.
 */
export const INDEPENDENCE_PREFERENCES = [
  'guided',
  'mixed',
  'independent',
  'no_preference',
] as const;
export type IndependencePreference = (typeof INDEPENDENCE_PREFERENCES)[number];

/** Landing-page message-match angle (spec §4). */
export const FUNNEL_ANGLES = ['budget', 'timing', 'family', 'overwhelm', 'local'] as const;
export type FunnelAngle = (typeof FUNNEL_ANGLES)[number];

/** Email-gate state. Email is never stored before the gate is completed. */
export const EMAIL_GATE_STATUSES = ['locked', 'unlocked'] as const;
export type EmailGateStatus = (typeof EMAIL_GATE_STATUSES)[number];

/* ───────────────────────── Source attribution ───────────────────────── */

/** Persisted UTM / creative attribution (spec §4, §11). Never carries PII. */
export interface FunnelSourceAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  creativeId?: string;
  angle?: FunnelAngle;
}

/* ───────────────────────── Plan input (quiz) ───────────────────────── */

/**
 * Validated onboarding input that produces a plan (spec §5). All clock times are
 * wall-clock `America/Nassau` `HH:mm`; `portDate` is `YYYY-MM-DD`.
 */
export interface PlanInput {
  port: Port;
  shipName: string;
  portDate: string;
  expectedStepOffTime: string;
  allAboardTime: string;
  allAboardConfirmed: boolean;
  partyType: TravelerGroup;
  partySize: number;
  childrenPresent: boolean;
  youngestChildAge?: number;
  mobilityNote?: string;
  planningState: PlanningState;
  /** Spec §5 "choose up to two"; at least one required. */
  interests: Interest[];
  budgetPreference?: BudgetPreference;
  independencePreference?: IndependencePreference;
  source?: FunnelSourceAttribution;
}

/* ───────────────────────── Port math ───────────────────────── */

/** Initial Nassau port-math configuration (spec §6). Values are config-driven. */
export interface PortConfig {
  port: Port;
  timezone: string;
  /** Geographic anchor (mobile `PortData`): Nassau → "Prince George Wharf". */
  terminalName: string;
  terminalBufferMinutes: number;
  defaultContingencyMinutes: number;
  minimumUsableMinutes: number;
  /** Provenance flag — `proposed` until the owner locks production values. */
  configStatus: 'proposed' | 'locked';
  calculationVersion: string;
}

/**
 * Deterministic block durations for the basic-itinerary engine. Supplied as
 * config so the engine invents no times of its own (spec §21.8). Values are
 * proposed until the owner locks them, mirroring `PortConfig`.
 */
export interface ItineraryShapeConfig {
  /** Step-ashore / orientation block length. */
  orientationMinutes: number;
  /** "Begin return" transition block before the pier target. */
  returnTransitionMinutes: number;
  /** Minimum anchor-region length; below it the engine falls back conservatively. */
  minAnchorMinutes: number;
  configStatus: 'proposed' | 'locked';
}

/** Raw inputs to the deterministic port-math engine. */
export interface PortMathInput {
  port: Port;
  portDate: string;
  expectedStepOffTime: string;
  allAboardTime: string;
  /** Optional `YYYY-MM-DD` "today" for `daysToPort`; supplied by the caller. */
  referenceDate?: string;
}

export type PortMathInvalidReason =
  | 'unsupported_port'
  | 'malformed_time'
  | 'malformed_date'
  | 'all_aboard_not_after_step_off'
  | 'no_usable_window';

/**
 * Deterministic port-math output (spec §6). Always labelled a planning
 * recommendation — never a guarantee. Original user-entered values are retained.
 */
export interface PortMathResult {
  port: Port;
  timezone: string;
  calculationVersion: string;
  isPlanningRecommendation: true;

  /** Echoed, original user-entered values. */
  portDate: string;
  expectedStepOffTime: string;
  allAboardTime: string;

  valid: boolean;
  invalidReason?: PortMathInvalidReason;

  /** all_aboard − step_off. */
  scheduledPersonalWindowMinutes: number;
  terminalBufferMinutes: number;
  contingencyMinutes: number;
  /** all_aboard − terminal_buffer (`HH:mm`). */
  recommendedTerminalReturn?: string;
  /** recommended_terminal_return − step_off. */
  usablePlanningWindowMinutes: number;
  minimumUsableMinutes: number;
  /** usable window > 0 but below the configured minimum. */
  belowMinimumUsable: boolean;

  daysToPort?: number;
}

/* ───────────────────────── Basic itinerary ───────────────────────── */

export const ITINERARY_BLOCK_TYPES = [
  'orientation',
  'anchor_activity',
  'flexible_local_time',
  'return_transition',
  'recommended_pier_target',
] as const;
export type BasicItineraryBlockType = (typeof ITINERARY_BLOCK_TYPES)[number];

export interface BasicItineraryBlock {
  type: BasicItineraryBlockType;
  label: string;
  startTime: string;
  endTime: string;
  startMinute: number;
  endMinute: number;
  durationMinutes: number;
  note?: string;
  /** Set when the anchor block is a selected excursion. */
  excursionId?: string;
}

/**
 * One deterministic, finite day shape (spec §21.8). Not AI-generated. Contains no
 * invented times beyond port-math output.
 */
export interface BasicItinerary {
  port: Port;
  calculationVersion: string;
  isPlanningRecommendation: true;
  /** True when a short window forced a conservative reduced plan. */
  conservativeFallback: boolean;
  usableWindowMinutes: number;
  recommendedTerminalReturn?: string;
  blocks: BasicItineraryBlock[];
  notes: string[];
}

/* ───────────────────────── Plan record (persisted) ───────────────────────── */

export interface ExcursionImpression {
  excursionId: string;
  /** ISO 8601 timestamp. */
  at: string;
}
export interface ExcursionClick {
  excursionId: string;
  at: string;
}
export interface AppCtaClick {
  placement: string;
  at: string;
}

/**
 * Persisted web-funnel plan (spec §11). Lives in a Firestore `plans` collection
 * keyed by `planId` — never by email. `email` stays optional until the gate is
 * completed; marketing consent is separate from delivery consent.
 */
export interface PlanRecord {
  schemaVersion: number;
  planId: string;

  port: Port;
  shipName: string;
  portDate: string;
  stepOffTime: string;
  allAboardTime: string;
  allAboardConfirmed: boolean;
  daysToPort?: number;

  travelerGroup: TravelerGroup;
  partySize: number;
  childrenPresent: boolean;
  youngestChildAge?: number;
  mobilityNote?: string;
  planningState: PlanningState;
  interests: Interest[];
  budgetPreference?: BudgetPreference;
  independencePreference?: IndependencePreference;

  portMath: PortMathResult;
  basicItinerary: BasicItinerary;
  excursionRecommendationIds: string[];

  emailGateStatus: EmailGateStatus;
  /** Optional until the email gate is completed. Never used as the document ID. */
  email?: string;
  marketingConsent?: boolean;
  deliveryConsentAt?: string;
  marketingConsentAt?: string;

  source?: FunnelSourceAttribution;

  excursionImpressions: ExcursionImpression[];
  excursionClicks: ExcursionClick[];
  appCtaClicks: AppCtaClick[];

  createdAt: string;
  updatedAt: string;
}

/** Current persisted-plan schema version. */
export const PLAN_SCHEMA_VERSION = 1;
