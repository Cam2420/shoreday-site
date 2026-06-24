/**
 * Pure onboarding/calculator logic for the Nassau funnel UI (no React, no
 * network, no AI). The PlanBuilder client component holds state and renders;
 * all mapping/validation/formatting lives here so it is unit-testable and never
 * duplicated in the component. Validation reuses the canonical Zod schemas.
 */

import type {
  BudgetPreference,
  IndependencePreference,
  Interest,
  PlanInput,
  PlanningState,
  PortMathResult,
  TravelerGroup,
} from '../types/funnel';
import { emailFieldSchema } from './funnel-validation';

/* ───────────────────────── Step model ───────────────────────── */

export const FUNNEL_STEP_IDS = ['basics', 'group', 'interests', 'budget', 'independence'] as const;
export type FunnelStepId = (typeof FUNNEL_STEP_IDS)[number];

export const FUNNEL_STEP_TITLES: Record<FunnelStepId, string> = {
  basics: 'Your Nassau port day',
  group: "Who's going ashore?",
  interests: 'What are you most into?',
  budget: "What's your budget feel?",
  independence: 'How do you like to explore?',
};

/* ───────────────────────── Wizard form state ───────────────────────── */

export interface PlanFormState {
  port: 'nassau';
  shipName: string;
  portDate: string;
  expectedStepOffTime: string;
  allAboardTime: string;
  allAboardConfirmed: boolean;
  partyType: TravelerGroup | null;
  interests: Interest[];
  budgetPreference: BudgetPreference | null;
  independencePreference: IndependencePreference | null;
}

export function initialFormState(): PlanFormState {
  return {
    port: 'nassau',
    shipName: '',
    portDate: '',
    expectedStepOffTime: '',
    allAboardTime: '',
    allAboardConfirmed: false,
    partyType: null,
    interests: [],
    budgetPreference: null,
    independencePreference: null,
  };
}

/* ───────────────────────── Choice-card option metadata ───────────────────────── */

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  description: string;
}

export const TRAVELER_GROUP_OPTIONS: ChoiceOption<TravelerGroup>[] = [
  { value: 'solo', label: 'Solo', description: 'Just me' },
  { value: 'couple', label: 'Couple', description: 'Two of us' },
  { value: 'family', label: 'Family', description: 'With kids' },
  { value: 'friends', label: 'Friends', description: 'A small group' },
];

// Web onboarding interests = the mobile source-of-truth set (Local Food, Beaches,
// History, Nature) plus Adventure, which the canonical funnel spec §5 defines as a
// valid priority. All map to the canonical `Interest` type.
export const INTEREST_OPTIONS: ChoiceOption<Interest>[] = [
  { value: 'local_food', label: 'Local food', description: 'Bahamian flavors' },
  { value: 'beach', label: 'Beaches', description: 'Sand & water' },
  { value: 'history', label: 'History', description: 'Forts & old town' },
  { value: 'nature', label: 'Nature', description: 'Wildlife & the outdoors' },
  { value: 'adventure', label: 'Adventure', description: 'Active & on the move' },
];

/** Spec §5: choose up to two interests. */
export const MAX_INTERESTS = 2;

export const BUDGET_OPTIONS: ChoiceOption<BudgetPreference>[] = [
  { value: 'low', label: 'Budget-friendly', description: 'Keep it lean' },
  { value: 'mid', label: 'Mid-range', description: 'A balance' },
  { value: 'premium', label: 'Premium', description: 'Treat ourselves' },
  { value: 'no_preference', label: 'No preference', description: 'Show me everything' },
];

export const INDEPENDENCE_OPTIONS: ChoiceOption<IndependencePreference>[] = [
  { value: 'guided', label: 'Guided & easy', description: 'Hand me a plan' },
  { value: 'mixed', label: 'A mix', description: 'Some of both' },
  { value: 'independent', label: 'Independent', description: 'We do our own thing' },
  { value: 'no_preference', label: 'No preference', description: "Doesn't matter" },
];

/* ───────────────────────── Step completion & ordering ───────────────────────── */

export function toggleInterest(current: Interest[], value: Interest): Interest[] {
  if (current.includes(value)) return current.filter((i) => i !== value);
  if (current.length >= MAX_INTERESTS) return current; // cap at two (schema limit)
  return [...current, value];
}

export function isStepComplete(step: FunnelStepId, f: PlanFormState): boolean {
  switch (step) {
    case 'basics':
      return (
        f.portDate.length > 0 &&
        f.expectedStepOffTime.length > 0 &&
        f.allAboardTime.length > 0 &&
        f.allAboardConfirmed
      );
    case 'group':
      return f.partyType !== null;
    case 'interests':
      return f.interests.length >= 1 && f.interests.length <= MAX_INTERESTS;
    case 'budget':
      return f.budgetPreference !== null;
    case 'independence':
      return f.independencePreference !== null;
    default:
      return false;
  }
}

export function firstIncompleteStep(f: PlanFormState): FunnelStepId | null {
  return FUNNEL_STEP_IDS.find((s) => !isStepComplete(s, f)) ?? null;
}

export function isPlanComplete(f: PlanFormState): boolean {
  return FUNNEL_STEP_IDS.every((s) => isStepComplete(s, f));
}

/* ───────────────────────── Mapping to canonical PlanInput ───────────────────────── */

/**
 * Default party size derived from travel group. Party size is not asked as a
 * step in this slice; this is a documented V1 default, not an external fact.
 */
export function defaultPartySize(group: TravelerGroup): number {
  switch (group) {
    case 'solo':
      return 1;
    case 'couple':
      return 2;
    case 'family':
      return 4;
    case 'friends':
      return 4;
  }
}

/**
 * Map wizard state to the canonical `PlanInput`. Faithful — it does not invent
 * times or ship names (a blank ship name stays blank and fails `planInputSchema`,
 * surfacing the missing field rather than masking it). `partySize` and
 * `childrenPresent` are derived V1 defaults from the chosen group.
 */
/**
 * Neutral, canonical default planning state. `planningState` and
 * `independencePreference` are INDEPENDENT concepts: planning state is NOT derived
 * from the independence choice. Slice A has no planning-state step, so every plan
 * uses this neutral default until a dedicated canonical step exists.
 */
export const DEFAULT_PLANNING_STATE: PlanningState = 'undecided';

export function buildPlanInput(f: PlanFormState): PlanInput {
  const partyType = f.partyType ?? 'solo';
  const input: PlanInput = {
    port: 'nassau',
    shipName: f.shipName.trim(),
    portDate: f.portDate,
    expectedStepOffTime: f.expectedStepOffTime,
    allAboardTime: f.allAboardTime,
    allAboardConfirmed: f.allAboardConfirmed,
    partyType,
    partySize: defaultPartySize(partyType),
    childrenPresent: partyType === 'family',
    planningState: DEFAULT_PLANNING_STATE,
    interests: f.interests,
  };
  if (f.budgetPreference !== null) input.budgetPreference = f.budgetPreference;
  if (f.independencePreference !== null) input.independencePreference = f.independencePreference;
  return input;
}

/* ───────────────────────── Partial-result formatting (claim-safe) ───────────────────────── */

/** "9h 0m", "45m". */
export function formatDurationLabel(minutes: number): string {
  const safe = Math.max(0, Math.round(minutes));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

/** Claim-safe approximate label, e.g. "about 5 hours", "about 4.5 hours". */
export function approxHoursLabel(minutes: number): string {
  if (minutes < 60) return 'under an hour';
  const halfHours = Math.round(minutes / 30) / 2; // nearest half hour
  const text = Number.isInteger(halfHours) ? String(halfHours) : halfHours.toFixed(1);
  return `about ${text} hours`;
}

/** Convert 24h `HH:mm` to a friendly 12-hour label, e.g. "3:45 PM". */
export function to12Hour(hhmm: string): string {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(hhmm);
  if (!m) return hhmm;
  const h = Number(m[1]);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m[2]} ${period}`;
}

export interface PartialResultView {
  valid: boolean;
  invalidMessage?: string;
  scheduledWindowLabel: string;
  usableWindowLabel: string;
  recommendedTerminalReturnLabel?: string;
  isShort: boolean;
  shortMessage?: string;
}

const INVALID_MESSAGES: Record<NonNullable<PortMathResult['invalidReason']>, string> = {
  unsupported_port: 'Only Nassau is supported right now.',
  malformed_time: 'Please enter valid step-off and all-aboard times.',
  malformed_date: 'Please enter a valid port date.',
  all_aboard_not_after_step_off:
    'Your all-aboard time needs to be later than your step-off time — please re-check them.',
  no_usable_window:
    "With these times there isn't a usable window to plan. Double-check your step-off and all-aboard times.",
};

const SHORT_WINDOW_MESSAGE =
  'Your usable window is on the short side. Consider a near-pier option and keep extra buffer to get back.';

/** The short-window warning, or null when the window is comfortable/invalid. */
export function selectShortWindowMessage(pm: PortMathResult): string | null {
  return pm.valid && pm.belowMinimumUsable ? SHORT_WINDOW_MESSAGE : null;
}

export function buildPartialResultView(pm: PortMathResult): PartialResultView {
  if (!pm.valid) {
    return {
      valid: false,
      invalidMessage: pm.invalidReason
        ? INVALID_MESSAGES[pm.invalidReason]
        : 'Please re-check the details you entered.',
      scheduledWindowLabel: formatDurationLabel(pm.scheduledPersonalWindowMinutes),
      usableWindowLabel: approxHoursLabel(Math.max(0, pm.usablePlanningWindowMinutes)),
      isShort: false,
    };
  }
  const view: PartialResultView = {
    valid: true,
    scheduledWindowLabel: formatDurationLabel(pm.scheduledPersonalWindowMinutes),
    usableWindowLabel: approxHoursLabel(pm.usablePlanningWindowMinutes),
    isShort: pm.belowMinimumUsable,
  };
  if (pm.recommendedTerminalReturn !== undefined) {
    view.recommendedTerminalReturnLabel = to12Hour(pm.recommendedTerminalReturn);
  }
  const short = selectShortWindowMessage(pm);
  if (short) view.shortMessage = short;
  return view;
}

/** Required, claim-safe disclaimer shown with every calculated result. */
export const PLANNING_DISCLAIMER =
  "Planning estimate only. Confirm your ship's official all-aboard time and account for current conditions.";

/* ───────────────────────── Pre-results phase composition ───────────────────────── */

/**
 * Ordered sections of the Slice-A pre-results experience. The email gate ALWAYS
 * follows the locked teaser. There is no app-download CTA, no Book Now, and no
 * real excursion record before the gate — those belong on
 * `/nassau/results/[planId]`, after the unlocked excursion recommendations. A
 * locked, non-interactive excursion skeleton may appear before the gate as a
 * preview only.
 */
export type ResultSectionId = 'timing_result' | 'locked_teaser' | 'excursion_skeleton' | 'email_gate';

export function partialResultSections(view: PartialResultView): ResultSectionId[] {
  if (!view.valid) return ['timing_result'];
  return ['timing_result', 'locked_teaser', 'excursion_skeleton', 'email_gate'];
}

/** Guarantees about the pre-gate experience (asserted in tests + verified in-DOM). */
export const PARTIAL_RESULT_CONTRACT = {
  hasAppCta: false,
  hasBookNowCta: false,
  rendersRealExcursion: false,
  excursionPreviewIsLockedSkeletonOnly: true,
} as const;

/** Copy for the single locked teaser shown before the email gate. */
export const LOCKED_TEASER = {
  heading: 'Unlock your full Nassau plan',
  body:
    'Your full plan unlocks a day-by-day itinerary built around your window, plus three excursion matches that fit — with a link you can save and reopen.',
} as const;

/* ───────────────────────── Email-gate consent (local only) ───────────────────────── */

export interface ConsentState {
  email: string;
  /** Submitting the gate IS the delivery action; this records that intent. */
  deliveryConsent: boolean;
  /** Marketing is a separate, independent opt-in. */
  marketingConsent: boolean;
}

export function initialConsentState(): ConsentState {
  return { email: '', deliveryConsent: false, marketingConsent: false };
}

export function isValidEmail(email: string): boolean {
  return emailFieldSchema.safeParse(email).success;
}

/**
 * Delivery and marketing consent are independent: a true marketing flag must
 * never imply delivery, and delivery must never imply marketing. Always true by
 * construction (separate booleans); asserted in tests as a guard.
 */
export function consentIsSeparate(c: ConsentState): boolean {
  return typeof c.deliveryConsent === 'boolean' && typeof c.marketingConsent === 'boolean';
}

export type EmailGateSubmitCheck =
  | { ok: true }
  | { ok: false; reason: 'invalid_email' | 'delivery_consent_required' };

/**
 * Local-only gate check (no network). Requires a valid email and explicit
 * delivery consent; marketing consent does not affect the result.
 */
export function checkEmailGateSubmit(c: ConsentState): EmailGateSubmitCheck {
  if (!isValidEmail(c.email)) return { ok: false, reason: 'invalid_email' };
  if (!c.deliveryConsent) return { ok: false, reason: 'delivery_consent_required' };
  return { ok: true };
}

/** Dev-only placeholder state — NOT a production submission, never sent anywhere. */
export const EMAIL_GATE_DEV_MESSAGE =
  'Email delivery will be connected in the next integration step.';
