/**
 * Deterministic Nassau excursion eligibility + ranking engine (spec §8).
 *
 * Pure TypeScript. No live Google traffic, weather, AI timing, dynamic Viator
 * inventory, unsupported price claims, or inferred cancellation policies. Uses
 * only curated, tagged excursion fields + deterministic port math.
 *
 * Eligibility (spec §8):
 *   duration + outbound + return + terminal_buffer + contingency
 *     <= user's step-off → all-aboard window
 *
 * Ranking (spec §8):
 *   priority match 0–6 · party/group fit 0–4 · schedule fit 0–4 ·
 *   logistics ease 0–3 · family fit (if relevant) 0–3 · budget fit 0–2
 *
 * Output: exactly three labelled cards (Best value / Easiest logistics / Best
 * fit for your group) when possible, else a deterministic fallback.
 *
 * FAIL-CLOSED: an excursion is recommended only when it can be POSITIVELY
 * verified. Any reason at all makes it ineligible — including a fixed start time
 * we cannot verify (no meeting-time data) or incomplete/out-of-range catalog
 * fields. Invalid port-math yields zero recommendations. The engine never pads
 * results with ineligible options and never invents missing catalog values.
 */

import type {
  BudgetPreference,
  Interest,
  PortConfig,
  PortMathResult,
  TravelerGroup,
} from '../types/funnel';
import type {
  Excursion,
  ExcursionEligibility,
  ExcursionIneligibilityReason,
  ExcursionRecommendation,
  ExcursionRecommendationResult,
  ExcursionScore,
  RecommendationLabel,
} from '../types/excursion';

export interface ExcursionEngineInput {
  portMath: PortMathResult;
  config: PortConfig;
  partyType: TravelerGroup;
  interests: Interest[];
  childrenPresent: boolean;
  youngestChildAge?: number;
  budgetPreference?: BudgetPreference;
}

/** Map a 1–5 fit rating onto a 0–`max` point band, monotonic and deterministic. */
function scaleFit(fit: number, max: number): number {
  const clamped = Math.min(5, Math.max(1, fit));
  return Math.round(((clamped - 1) / 4) * max);
}

const BUDGET_TIER_INDEX = { low: 0, mid: 1, premium: 2 } as const;

function isFiniteNonNeg(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n) && n >= 0;
}
function isFitScore(n: unknown): boolean {
  return typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= 5;
}

/**
 * Fail-closed completeness check: every field the engine relies on must be
 * present and in range. Incomplete/malformed entries are excluded rather than
 * ranked from partial data (defends against an under-curated production catalog).
 */
function hasCompleteData(e: Excursion): boolean {
  return (
    typeof e.id === 'string' &&
    e.id.length > 0 &&
    typeof e.affiliateUrl === 'string' &&
    e.affiliateUrl.length > 0 &&
    isFiniteNonNeg(e.durationMinutes) &&
    e.durationMinutes > 0 &&
    isFiniteNonNeg(e.outboundTravelMinutes) &&
    isFiniteNonNeg(e.returnTravelMinutes) &&
    isFiniteNonNeg(e.minimumUsableMinutes) &&
    isFitScore(e.familyFit) &&
    isFitScore(e.logisticsEase) &&
    isFitScore(e.vendorPressureFit) &&
    (e.budgetTier === 'low' || e.budgetTier === 'mid' || e.budgetTier === 'premium') &&
    Array.isArray(e.priorities) &&
    Array.isArray(e.partyTypes) &&
    (e.startTimeFlexibility === 'fixed' ||
      e.startTimeFlexibility === 'multiple' ||
      e.startTimeFlexibility === 'open')
  );
}

/* ───────────────────────── Eligibility (fail-closed) ───────────────────────── */

export function evaluateEligibility(
  excursion: Excursion,
  input: ExcursionEngineInput,
): ExcursionEligibility {
  const { portMath, config } = input;
  const availableWindowMinutes = portMath.valid
    ? portMath.scheduledPersonalWindowMinutes
    : 0;

  // Fail-closed: incomplete/malformed data is excluded immediately.
  if (!hasCompleteData(excursion)) {
    return {
      excursionId: typeof excursion.id === 'string' ? excursion.id : '',
      eligible: false,
      requiredWindowMinutes: 0,
      availableWindowMinutes,
      returnMarginMinutes: 0,
      reasons: ['incomplete_data'],
    };
  }

  const reasons: ExcursionIneligibilityReason[] = [];
  const requiredWindowMinutes =
    excursion.durationMinutes +
    excursion.outboundTravelMinutes +
    excursion.returnTravelMinutes +
    config.terminalBufferMinutes +
    config.defaultContingencyMinutes;

  if (excursion.port !== portMath.port) reasons.push('wrong_port');
  if (!excursion.active) reasons.push('inactive');
  if (!portMath.valid || requiredWindowMinutes > availableWindowMinutes) {
    reasons.push('exceeds_window');
  }
  if (
    portMath.valid &&
    portMath.usablePlanningWindowMinutes < excursion.minimumUsableMinutes
  ) {
    reasons.push('below_min_usable');
  }
  if (
    input.childrenPresent &&
    input.youngestChildAge !== undefined &&
    excursion.minAge !== undefined &&
    input.youngestChildAge < excursion.minAge
  ) {
    reasons.push('min_age_not_met');
  }
  // Fail-closed: a fixed start time cannot be verified without meeting-time data
  // (absent from the catalog, spec §8), so such tours are excluded — not surfaced
  // with an advisory.
  if (excursion.startTimeFlexibility === 'fixed') {
    reasons.push('fixed_start_unverifiable');
  }

  // Any reason at all makes the excursion ineligible (fail-closed).
  return {
    excursionId: excursion.id,
    eligible: reasons.length === 0,
    requiredWindowMinutes,
    availableWindowMinutes,
    returnMarginMinutes: availableWindowMinutes - requiredWindowMinutes,
    reasons,
  };
}

/* ───────────────────────── Scoring ───────────────────────── */

export function scoreExcursion(
  excursion: Excursion,
  eligibility: ExcursionEligibility,
  input: ExcursionEngineInput,
): ExcursionScore {
  const matches = excursion.priorities.filter((p) => input.interests.includes(p)).length;
  const priorityMatch = Math.min(6, matches * 3);

  const partyFit = excursion.partyTypes.includes(input.partyType)
    ? 4
    : excursion.partyTypes.length === 0
      ? 2
      : 0;

  const margin = eligibility.returnMarginMinutes;
  const scheduleFit = margin >= 120 ? 4 : margin >= 60 ? 3 : margin >= 30 ? 2 : margin >= 0 ? 1 : 0;

  const logisticsEase = scaleFit(excursion.logisticsEase, 3);
  const familyFit = input.childrenPresent ? scaleFit(excursion.familyFit, 3) : 0;

  let budgetFit: number;
  if (input.budgetPreference === undefined || input.budgetPreference === 'no_preference') {
    budgetFit = 1;
  } else {
    const diff = Math.abs(
      BUDGET_TIER_INDEX[input.budgetPreference] - BUDGET_TIER_INDEX[excursion.budgetTier],
    );
    budgetFit = diff === 0 ? 2 : diff === 1 ? 1 : 0;
  }

  const total = priorityMatch + partyFit + scheduleFit + logisticsEase + familyFit + budgetFit;
  return { priorityMatch, partyFit, scheduleFit, logisticsEase, familyFit, budgetFit, total };
}

/* ───────────────────────── Fit reason (claim-safe) ───────────────────────── */

function hoursMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

function buildFitReason(
  excursion: Excursion,
  score: ExcursionScore,
  eligibility: ExcursionEligibility,
  input: ExcursionEngineInput,
): string {
  const parts: string[] = [];
  if (eligibility.returnMarginMinutes >= 0) {
    parts.push(
      `Fits your window with about ${hoursMinutes(eligibility.returnMarginMinutes)} of return margin`,
    );
  }
  const matched = excursion.priorities.filter((p) => input.interests.includes(p));
  if (matched.length > 0) {
    parts.push(`matches your interest in ${matched.map((m) => m.replace(/_/g, ' ')).join(' and ')}`);
  }
  if (score.logisticsEase >= 3) parts.push('straightforward logistics');
  if (input.childrenPresent && score.familyFit >= 2) parts.push('a good family fit');
  return parts.length > 0
    ? `${parts.join('; ')}. Check availability on the booking page.`
    : 'A solid option for your day. Check availability on the booking page.';
}

/* ───────────────────────── Selection ───────────────────────── */

interface Ranked {
  excursion: Excursion;
  eligibility: ExcursionEligibility;
  score: ExcursionScore;
}

/** Pick the best remaining item by a comparator, excluding already-chosen ids. */
function pick(
  pool: Ranked[],
  chosen: Set<string>,
  compare: (a: Ranked, b: Ranked) => number,
): Ranked | undefined {
  const available = pool.filter((r) => !chosen.has(r.excursion.id));
  if (available.length === 0) return undefined;
  return [...available].sort(compare)[0];
}

const byTotalThenId = (a: Ranked, b: Ranked): number =>
  b.score.total - a.score.total || a.excursion.id.localeCompare(b.excursion.id);

/**
 * Produce up to three labelled recommendations from a catalog. Returns exactly
 * three when at least three excursions are eligible; otherwise returns the
 * eligible ones (in label order) with `fallback: true`.
 */
export function recommendExcursions(
  catalog: readonly Excursion[],
  input: ExcursionEngineInput,
): ExcursionRecommendationResult {
  const evaluated: ExcursionEligibility[] = [];
  const ranked: Ranked[] = [];

  for (const excursion of catalog) {
    const eligibility = evaluateEligibility(excursion, input);
    evaluated.push(eligibility);
    if (eligibility.eligible) {
      ranked.push({ excursion, eligibility, score: scoreExcursion(excursion, eligibility, input) });
    }
  }

  const eligibleCount = ranked.length;

  // Selection comparators per label (all deterministic; ties broken by id).
  const selectors: { label: RecommendationLabel; compare: (a: Ranked, b: Ranked) => number }[] = [
    {
      label: 'best_value',
      compare: (a, b) =>
        b.score.budgetFit - a.score.budgetFit || byTotalThenId(a, b),
    },
    {
      label: 'easiest_logistics',
      compare: (a, b) =>
        b.score.logisticsEase - a.score.logisticsEase || byTotalThenId(a, b),
    },
    {
      label: 'best_fit_for_group',
      compare: (a, b) =>
        b.score.total - a.score.total ||
        b.score.partyFit - a.score.partyFit ||
        a.excursion.id.localeCompare(b.excursion.id),
    },
  ];

  const chosen = new Set<string>();
  const recommendations: ExcursionRecommendation[] = [];

  for (const { label, compare } of selectors) {
    const winner = pick(ranked, chosen, compare);
    if (!winner) break; // fewer eligible than labels → fallback
    chosen.add(winner.excursion.id);
    recommendations.push({
      excursion: winner.excursion,
      label,
      score: winner.score,
      eligibility: winner.eligibility,
      fitReason: buildFitReason(winner.excursion, winner.score, winner.eligibility, input),
      returnMarginMinutes: winner.eligibility.returnMarginMinutes,
      affiliateUrl: winner.excursion.affiliateUrl, // exact, untouched
    });
  }

  return {
    recommendations,
    fallback: eligibleCount < 3,
    eligibleCount,
    evaluated,
  };
}
