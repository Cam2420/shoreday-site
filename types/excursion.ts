/**
 * Nassau Funnel V1 — excursion types.
 *
 * The `Excursion` shape is taken verbatim from the canonical spec §8. The
 * confirmed mobile catalog (`lib/data/excursions_data.dart`) does NOT yet supply
 * the scheduling/scoring fields (`outboundTravelMinutes`, `returnTravelMinutes`,
 * `startTimeFlexibility`, `partyTypes`, `minAge`, `familyFit`, `logisticsEase`,
 * `vendorPressureFit`, per-excursion `minimumUsableMinutes`) — see
 * `data/excursions/nassau.ts` and the Mobile Integration Map §B. Until the owner
 * curates those, the engine runs against test fixtures, not a production catalog.
 */

import type { Interest, Port, TravelerGroup } from './funnel';

export const START_TIME_FLEXIBILITIES = ['fixed', 'multiple', 'open'] as const;
export type StartTimeFlexibility = (typeof START_TIME_FLEXIBILITIES)[number];

export const BUDGET_TIERS = ['low', 'mid', 'premium'] as const;
export type BudgetTier = (typeof BUDGET_TIERS)[number];

/** 1–5 qualitative fit rating. */
export type FitScore = 1 | 2 | 3 | 4 | 5;

/** Curated, tagged excursion (spec §8). AI never selects from raw descriptions. */
export interface Excursion {
  id: string;
  viatorProductCode: string;
  name: string;
  /** Exact Viator affiliate URL, preserved verbatim (incl. `pid=`). Never mutated. */
  affiliateUrl: string;
  port: Port;
  durationMinutes: number;
  outboundTravelMinutes: number;
  returnTravelMinutes: number;
  startTimeFlexibility: StartTimeFlexibility;
  /** Matches quiz priorities / `Interest`. */
  priorities: Interest[];
  partyTypes: TravelerGroup[];
  minAge?: number;
  familyFit: FitScore;
  logisticsEase: FitScore;
  vendorPressureFit: FitScore;
  budgetTier: BudgetTier;
  minimumUsableMinutes: number;
  active: boolean;
}

export type ExcursionIneligibilityReason =
  | 'wrong_port'
  | 'inactive'
  | 'exceeds_window'
  | 'below_min_usable'
  | 'min_age_not_met'
  | 'fixed_start_unverifiable';

/** Result of the deterministic eligibility check (spec §8). */
export interface ExcursionEligibility {
  excursionId: string;
  eligible: boolean;
  /** duration + outbound + return + terminalBuffer + contingency. */
  requiredWindowMinutes: number;
  /** User's step-off → all-aboard window (scheduled personal window). */
  availableWindowMinutes: number;
  /** availableWindow − requiredWindow (estimated remaining return margin). */
  returnMarginMinutes: number;
  reasons: ExcursionIneligibilityReason[];
}

/** Spec §8 ranking components. */
export interface ExcursionScore {
  /** 0–6 */ priorityMatch: number;
  /** 0–4 */ partyFit: number;
  /** 0–4 */ scheduleFit: number;
  /** 0–3 */ logisticsEase: number;
  /** 0–3 (when children present) */ familyFit: number;
  /** 0–2 */ budgetFit: number;
  total: number;
}

/** The three displayed slots (spec §8). */
export const RECOMMENDATION_LABELS = [
  'best_value',
  'easiest_logistics',
  'best_fit_for_group',
] as const;
export type RecommendationLabel = (typeof RECOMMENDATION_LABELS)[number];

export interface ExcursionRecommendation {
  excursion: Excursion;
  label: RecommendationLabel;
  score: ExcursionScore;
  eligibility: ExcursionEligibility;
  /** Human-readable, claim-safe reason. No availability or guarantee claims. */
  fitReason: string;
  returnMarginMinutes: number;
  /** Exact affiliate URL, copied untouched from the excursion. */
  affiliateUrl: string;
}

/** Engine output: exactly three when possible, else a deterministic fallback. */
export interface ExcursionRecommendationResult {
  recommendations: ExcursionRecommendation[];
  /** True when fewer than three eligible excursions qualified. */
  fallback: boolean;
  eligibleCount: number;
  evaluated: ExcursionEligibility[];
}
