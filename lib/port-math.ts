/**
 * Deterministic Nassau port-math engine (spec §6).
 *
 * Pure TypeScript. No React, no Firebase, no AI, no network, no Google APIs.
 * Every numeric constant is supplied via `PortConfig` — the engine invents none.
 *
 * Formulas (spec §6):
 *   scheduled_personal_window   = all_aboard − step_off
 *   recommended_terminal_return = all_aboard − terminal_buffer
 *   usable_planning_window      = recommended_terminal_return − step_off
 *   leave_final_stop_by         = recommended_terminal_return
 *                                 − conservative_return_travel − contingency
 *
 * Output is always a PLANNING RECOMMENDATION, never a guarantee. Original
 * user-entered values are retained. Overnight/impossible sequences are rejected,
 * not wrapped (see lib/time.ts for the single-day wall-clock assumption).
 */

import type {
  PortConfig,
  PortMathInput,
  PortMathResult,
} from '../types/funnel';
import {
  daysBetweenDates,
  isValidDateString,
  isValidTimeString,
  minutesToTime,
  timeToMinutes,
} from './time';

function invalid(
  input: PortMathInput,
  config: PortConfig,
  reason: NonNullable<PortMathResult['invalidReason']>,
): PortMathResult {
  return {
    port: config.port,
    timezone: config.timezone,
    calculationVersion: config.calculationVersion,
    isPlanningRecommendation: true,
    portDate: input.portDate,
    expectedStepOffTime: input.expectedStepOffTime,
    allAboardTime: input.allAboardTime,
    valid: false,
    invalidReason: reason,
    scheduledPersonalWindowMinutes: 0,
    terminalBufferMinutes: config.terminalBufferMinutes,
    contingencyMinutes: config.defaultContingencyMinutes,
    usablePlanningWindowMinutes: 0,
    minimumUsableMinutes: config.minimumUsableMinutes,
    belowMinimumUsable: false,
  };
}

/**
 * Compute the deterministic port-math result for a single Nassau port day.
 * Never throws for bad input — returns a structured `valid: false` result.
 */
export function computePortMath(
  input: PortMathInput,
  config: PortConfig,
): PortMathResult {
  if (input.port !== config.port) return invalid(input, config, 'unsupported_port');
  if (!isValidDateString(input.portDate)) return invalid(input, config, 'malformed_date');
  if (
    !isValidTimeString(input.expectedStepOffTime) ||
    !isValidTimeString(input.allAboardTime)
  ) {
    return invalid(input, config, 'malformed_time');
  }

  const stepOffMin = timeToMinutes(input.expectedStepOffTime);
  const allAboardMin = timeToMinutes(input.allAboardTime);
  const scheduledPersonalWindowMinutes = allAboardMin - stepOffMin;

  if (scheduledPersonalWindowMinutes <= 0) {
    return invalid(input, config, 'all_aboard_not_after_step_off');
  }

  const recommendedTerminalReturnMin = allAboardMin - config.terminalBufferMinutes;
  const usablePlanningWindowMinutes = recommendedTerminalReturnMin - stepOffMin;

  // The terminal buffer must leave a positive usable window; otherwise the day is
  // not plannable as entered.
  if (recommendedTerminalReturnMin < 0 || usablePlanningWindowMinutes <= 0) {
    const degenerate = invalid(input, config, 'no_usable_window');
    return {
      ...degenerate,
      scheduledPersonalWindowMinutes,
      usablePlanningWindowMinutes,
      recommendedTerminalReturn:
        recommendedTerminalReturnMin >= 0 && recommendedTerminalReturnMin <= 1439
          ? minutesToTime(recommendedTerminalReturnMin)
          : undefined,
    };
  }

  const daysToPort =
    input.referenceDate !== undefined
      ? daysBetweenDates(input.referenceDate, input.portDate)
      : undefined;

  return {
    port: config.port,
    timezone: config.timezone,
    calculationVersion: config.calculationVersion,
    isPlanningRecommendation: true,
    portDate: input.portDate,
    expectedStepOffTime: input.expectedStepOffTime,
    allAboardTime: input.allAboardTime,
    valid: true,
    scheduledPersonalWindowMinutes,
    terminalBufferMinutes: config.terminalBufferMinutes,
    contingencyMinutes: config.defaultContingencyMinutes,
    recommendedTerminalReturn: minutesToTime(recommendedTerminalReturnMin),
    usablePlanningWindowMinutes,
    minimumUsableMinutes: config.minimumUsableMinutes,
    belowMinimumUsable: usablePlanningWindowMinutes < config.minimumUsableMinutes,
    daysToPort,
  };
}

/**
 * Per-excursion deadline: the latest a final stop should end (spec §6).
 *   leave_final_stop_by = recommended_terminal_return − return_travel − contingency
 * Returns minutes-from-midnight, or `null` if the base result is invalid.
 */
export function computeLeaveFinalStopByMinutes(
  result: PortMathResult,
  returnTravelMinutes: number,
  config: PortConfig,
): number | null {
  if (!result.valid || result.recommendedTerminalReturn === undefined) return null;
  return (
    timeToMinutes(result.recommendedTerminalReturn) -
    returnTravelMinutes -
    config.defaultContingencyMinutes
  );
}
