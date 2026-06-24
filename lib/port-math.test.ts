import { describe, expect, it } from 'vitest';
import type { PortConfig, PortMathInput } from '../types/funnel';
import { NASSAU_PORT_CONFIG } from '../data/ports/nassau';
import { computeLeaveFinalStopByMinutes, computePortMath } from './port-math';
import { minutesToTime } from './time';

/**
 * Explicit fixture config with round numbers. The engine is config-driven, so
 * these tests prove the spec §6 formulas independently of the PROPOSED production
 * values in data/ports/nassau.ts (which are pending owner lock).
 */
const CONFIG: PortConfig = {
  port: 'nassau',
  timezone: 'America/Nassau',
  terminalName: 'Test Wharf',
  terminalBufferMinutes: 45,
  defaultContingencyMinutes: 30,
  minimumUsableMinutes: 180,
  configStatus: 'locked',
  calculationVersion: 'test-1',
};

const base: PortMathInput = {
  port: 'nassau',
  portDate: '2026-07-15',
  expectedStepOffTime: '08:00',
  allAboardTime: '17:00',
};

describe('computePortMath — standard Nassau day', () => {
  const r = computePortMath(base, CONFIG);

  it('is valid and labelled a planning recommendation', () => {
    expect(r.valid).toBe(true);
    expect(r.isPlanningRecommendation).toBe(true);
    expect(r.invalidReason).toBeUndefined();
  });

  it('computes the scheduled personal window (all_aboard − step_off)', () => {
    expect(r.scheduledPersonalWindowMinutes).toBe(540); // 17:00 − 08:00
  });

  it('applies the terminal buffer to the recommended return', () => {
    expect(r.recommendedTerminalReturn).toBe('16:15'); // 17:00 − 45m
    expect(r.terminalBufferMinutes).toBe(45);
  });

  it('computes the usable window (recommended_return − step_off)', () => {
    expect(r.usablePlanningWindowMinutes).toBe(495); // 16:15 − 08:00
    expect(r.belowMinimumUsable).toBe(false);
  });

  it('retains the original user-entered values', () => {
    expect(r.expectedStepOffTime).toBe('08:00');
    expect(r.allAboardTime).toBe('17:00');
    expect(r.portDate).toBe('2026-07-15');
  });
});

describe('computePortMath — buffer application is exact', () => {
  it('recommended return always equals all_aboard minus the configured buffer', () => {
    for (const [allAboard, expected] of [
      ['17:00', '16:15'],
      ['16:30', '15:45'],
      ['18:45', '18:00'],
    ] as const) {
      const r = computePortMath({ ...base, allAboardTime: allAboard }, CONFIG);
      expect(r.recommendedTerminalReturn).toBe(expected);
    }
  });
});

describe('computePortMath — short window and minimum-usable flag', () => {
  it('flags a window below the configured minimum but stays valid', () => {
    // 10:00 → 13:00 ⇒ scheduled 180; return 12:15; usable 135 < 180.
    const r = computePortMath(
      { ...base, expectedStepOffTime: '10:00', allAboardTime: '13:00' },
      CONFIG,
    );
    expect(r.valid).toBe(true);
    expect(r.usablePlanningWindowMinutes).toBe(135);
    expect(r.belowMinimumUsable).toBe(true);
  });

  it('treats a usable window at the minimum as not below minimum', () => {
    // step 08:00, all-aboard 11:45 ⇒ return 11:00; usable 180 == min ⇒ not below.
    const r = computePortMath(
      { ...base, expectedStepOffTime: '08:00', allAboardTime: '11:45' },
      CONFIG,
    );
    expect(r.usablePlanningWindowMinutes).toBe(180);
    expect(r.belowMinimumUsable).toBe(false);
  });
});

describe('computePortMath — invalid inputs', () => {
  it('rejects a malformed all-aboard time', () => {
    const r = computePortMath({ ...base, allAboardTime: '25:00' }, CONFIG);
    expect(r.valid).toBe(false);
    expect(r.invalidReason).toBe('malformed_time');
  });

  it('rejects a malformed step-off time', () => {
    const r = computePortMath({ ...base, expectedStepOffTime: '8:00' }, CONFIG);
    expect(r.valid).toBe(false);
    expect(r.invalidReason).toBe('malformed_time');
  });

  it('rejects a non-real calendar date', () => {
    const r = computePortMath({ ...base, portDate: '2026-02-30' }, CONFIG);
    expect(r.valid).toBe(false);
    expect(r.invalidReason).toBe('malformed_date');
  });

  it('rejects all-aboard equal to or before step-off (overnight/impossible)', () => {
    const equal = computePortMath(
      { ...base, expectedStepOffTime: '12:00', allAboardTime: '12:00' },
      CONFIG,
    );
    expect(equal.invalidReason).toBe('all_aboard_not_after_step_off');

    const reversed = computePortMath(
      { ...base, expectedStepOffTime: '17:00', allAboardTime: '09:00' },
      CONFIG,
    );
    expect(reversed.invalidReason).toBe('all_aboard_not_after_step_off');
  });

  it('rejects a window the terminal buffer fully consumes (no usable window)', () => {
    // step 16:30, all-aboard 17:00 ⇒ return 16:15 < step ⇒ usable −15.
    const r = computePortMath(
      { ...base, expectedStepOffTime: '16:30', allAboardTime: '17:00' },
      CONFIG,
    );
    expect(r.valid).toBe(false);
    expect(r.invalidReason).toBe('no_usable_window');
    expect(r.usablePlanningWindowMinutes).toBeLessThanOrEqual(0);
  });

  it('rejects an unsupported port', () => {
    const r = computePortMath(
      { ...base, port: 'freeport' as unknown as PortMathInput['port'] },
      CONFIG,
    );
    expect(r.valid).toBe(false);
    expect(r.invalidReason).toBe('unsupported_port');
  });
});

describe('computePortMath — days_to_port', () => {
  it('is undefined when no reference date is supplied', () => {
    expect(computePortMath(base, CONFIG).daysToPort).toBeUndefined();
  });

  it('is zero for a same-day calculation', () => {
    const r = computePortMath({ ...base, referenceDate: '2026-07-15' }, CONFIG);
    expect(r.daysToPort).toBe(0);
  });

  it('counts whole days forward', () => {
    const r = computePortMath(
      { ...base, portDate: '2026-07-25', referenceDate: '2026-07-15' },
      CONFIG,
    );
    expect(r.daysToPort).toBe(10);
  });

  it('handles month and year boundaries', () => {
    expect(
      computePortMath(
        { ...base, portDate: '2027-01-01', referenceDate: '2026-12-31' },
        CONFIG,
      ).daysToPort,
    ).toBe(1);
    // 2026 is not a leap year: Feb has 28 days.
    expect(
      computePortMath(
        { ...base, portDate: '2026-03-01', referenceDate: '2026-02-28' },
        CONFIG,
      ).daysToPort,
    ).toBe(1);
    // 2024 is a leap year: Feb 29 exists, so the gap is 2 days.
    expect(
      computePortMath(
        { ...base, portDate: '2024-03-01', referenceDate: '2024-02-28' },
        CONFIG,
      ).daysToPort,
    ).toBe(2);
  });
});

describe('computeLeaveFinalStopByMinutes', () => {
  it('subtracts return travel and contingency from the recommended return', () => {
    const r = computePortMath(base, CONFIG); // recommended return 16:15 = 975m
    // 975 − 60 return − 30 contingency = 885 (14:45).
    expect(computeLeaveFinalStopByMinutes(r, 60, CONFIG)).toBe(885);
  });

  it('returns null for an invalid base result', () => {
    const r = computePortMath({ ...base, allAboardTime: '25:00' }, CONFIG);
    expect(computeLeaveFinalStopByMinutes(r, 60, CONFIG)).toBeNull();
  });
});

describe('locked Nassau policy — NASSAU_PORT_CONFIG (45 / 15 / 120)', () => {
  it('uses the owner-approved locked values', () => {
    expect(NASSAU_PORT_CONFIG.configStatus).toBe('locked');
    expect(NASSAU_PORT_CONFIG.terminalBufferMinutes).toBe(45);
    expect(NASSAU_PORT_CONFIG.defaultContingencyMinutes).toBe(15);
    expect(NASSAU_PORT_CONFIG.minimumUsableMinutes).toBe(120);
  });

  it('all-aboard 4:30 PM produces a terminal target of 3:45 PM', () => {
    const r = computePortMath(
      { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: '08:00', allAboardTime: '16:30' },
      NASSAU_PORT_CONFIG,
    );
    expect(r.recommendedTerminalReturn).toBe('15:45');
  });

  it('with zero return travel, leave-final-stop deadline is 3:30 PM', () => {
    const r = computePortMath(
      { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: '08:00', allAboardTime: '16:30' },
      NASSAU_PORT_CONFIG,
    );
    const leaveBy = computeLeaveFinalStopByMinutes(r, 0, NASSAU_PORT_CONFIG)!;
    expect(minutesToTime(leaveBy)).toBe('15:30');
  });

  it('with 20 minutes return travel, leave-final-stop deadline is 3:10 PM', () => {
    const r = computePortMath(
      { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: '08:00', allAboardTime: '16:30' },
      NASSAU_PORT_CONFIG,
    );
    const leaveBy = computeLeaveFinalStopByMinutes(r, 20, NASSAU_PORT_CONFIG)!;
    expect(minutesToTime(leaveBy)).toBe('15:10');
  });

  it('classifies a usable window below 120 minutes as short', () => {
    // step 14:00, all-aboard 16:30 ⇒ return 15:45; usable 105 < 120.
    const r = computePortMath(
      { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: '14:00', allAboardTime: '16:30' },
      NASSAU_PORT_CONFIG,
    );
    expect(r.valid).toBe(true);
    expect(r.usablePlanningWindowMinutes).toBe(105);
    expect(r.belowMinimumUsable).toBe(true);
  });
});
