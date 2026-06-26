import { describe, expect, it } from 'vitest';
import type { PortConfig } from '../types/funnel';
import type { Excursion } from '../types/excursion';
import { computePortMath } from './port-math';
import {
  evaluateEligibility,
  recommendExcursions,
  scoreExcursion,
  type ExcursionEngineInput,
} from './excursion-engine';

const CONFIG: PortConfig = {
  port: 'nassau',
  timezone: 'America/Nassau',
  terminalName: 'Test Wharf',
  terminalBufferMinutes: 45,
  defaultContingencyMinutes: 30,
  minimumUsableMinutes: 60,
  configStatus: 'locked',
  calculationVersion: 'test-1',
};

// Standard day → scheduled personal window = 540 minutes (08:00 → 17:00).
const PM = computePortMath(
  { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: '08:00', allAboardTime: '17:00' },
  CONFIG,
);

function makeExc(over: Partial<Excursion> & { id: string }): Excursion {
  return {
    viatorProductCode: 'd420-0000',
    name: over.id,
    affiliateUrl: `https://www.viator.com/tours/Nassau/${over.id}/d420-0000?pid=P00293644`,
    port: 'nassau',
    durationMinutes: 180,
    outboundTravelMinutes: 30,
    returnTravelMinutes: 30,
    startTimeFlexibility: 'multiple',
    priorities: [],
    partyTypes: ['solo', 'couple', 'family', 'friends'],
    familyFit: 3,
    logisticsEase: 3,
    vendorPressureFit: 3,
    budgetTier: 'mid',
    minimumUsableMinutes: 60,
    active: true,
    ...over,
  };
}

function input(over: Partial<ExcursionEngineInput> = {}): ExcursionEngineInput {
  return {
    portMath: PM,
    config: CONFIG,
    partyType: 'couple',
    interests: ['beach', 'local_food'],
    childrenPresent: false,
    ...over,
  };
}

describe('evaluateEligibility — window math (spec §8)', () => {
  it('is eligible when required <= scheduled window', () => {
    // required = 120 + 15 + 15 + 45 + 30 = 225 <= 540
    const e = evaluateEligibility(
      makeExc({ id: 'a', durationMinutes: 120, outboundTravelMinutes: 15, returnTravelMinutes: 15 }),
      input(),
    );
    expect(e.eligible).toBe(true);
    expect(e.requiredWindowMinutes).toBe(225);
    expect(e.availableWindowMinutes).toBe(540);
    expect(e.returnMarginMinutes).toBe(315);
  });

  it('excludes an excursion that exceeds the window', () => {
    // required = 480 + 60 + 60 + 45 + 30 = 675 > 540
    const e = evaluateEligibility(
      makeExc({ id: 'big', durationMinutes: 480, outboundTravelMinutes: 60, returnTravelMinutes: 60 }),
      input(),
    );
    expect(e.eligible).toBe(false);
    expect(e.reasons).toContain('exceeds_window');
  });

  it('excludes inactive and wrong-port excursions', () => {
    expect(evaluateEligibility(makeExc({ id: 'x', active: false }), input()).reasons).toContain('inactive');
    expect(
      evaluateEligibility(makeExc({ id: 'y', port: 'freeport' as Excursion['port'] }), input()).reasons,
    ).toContain('wrong_port');
  });

  it('excludes when the youngest child is below the minimum age', () => {
    const e = evaluateEligibility(
      makeExc({ id: 'age', minAge: 12 }),
      input({ childrenPresent: true, youngestChildAge: 6 }),
    );
    expect(e.eligible).toBe(false);
    expect(e.reasons).toContain('min_age_not_met');
  });

  it('excludes fixed-start tours (fail-closed; meeting time unverifiable)', () => {
    const e = evaluateEligibility(makeExc({ id: 'fix', startTimeFlexibility: 'fixed' }), input());
    expect(e.eligible).toBe(false);
    expect(e.reasons).toContain('fixed_start_unverifiable');
  });

  it('excludes excursions with incomplete or out-of-range data (fail-closed)', () => {
    const zeroDuration = evaluateEligibility(makeExc({ id: 'z', durationMinutes: 0 }), input());
    expect(zeroDuration.eligible).toBe(false);
    expect(zeroDuration.reasons).toContain('incomplete_data');

    const negTravel = evaluateEligibility(makeExc({ id: 'n', outboundTravelMinutes: -5 }), input());
    expect(negTravel.eligible).toBe(false);
    expect(negTravel.reasons).toContain('incomplete_data');

    const badFit = evaluateEligibility(
      makeExc({ id: 'f', logisticsEase: 9 as unknown as Excursion['logisticsEase'] }),
      input(),
    );
    expect(badFit.eligible).toBe(false);
    expect(badFit.reasons).toContain('incomplete_data');
  });
});

describe('scoreExcursion — components (spec §8)', () => {
  it('interest/priority match: 3 per match, capped at 6', () => {
    const e = (exc: Excursion) => scoreExcursion(exc, evaluateEligibility(exc, input()), input());
    expect(e(makeExc({ id: '0', priorities: ['history'] })).priorityMatch).toBe(0);
    expect(e(makeExc({ id: '1', priorities: ['beach'] })).priorityMatch).toBe(3);
    expect(e(makeExc({ id: '2', priorities: ['beach', 'local_food'] })).priorityMatch).toBe(6);
    expect(
      e(makeExc({ id: '3', priorities: ['beach', 'local_food', 'adventure'] })).priorityMatch,
    ).toBe(6);
  });

  it('party fit: 4 when matched, 0 when not, 2 when unspecified', () => {
    const e = (exc: Excursion) => scoreExcursion(exc, evaluateEligibility(exc, input()), input()).partyFit;
    expect(e(makeExc({ id: 'm', partyTypes: ['couple'] }))).toBe(4);
    expect(e(makeExc({ id: 'n', partyTypes: ['family'] }))).toBe(0);
    expect(e(makeExc({ id: 'o', partyTypes: [] }))).toBe(2);
  });

  it('budget fit: 2 exact, 1 adjacent, 0 opposite, 1 when no preference', () => {
    const e = (budgetTier: Excursion['budgetTier'], pref: ExcursionEngineInput['budgetPreference']) => {
      const exc = makeExc({ id: `b-${budgetTier}`, budgetTier });
      return scoreExcursion(exc, evaluateEligibility(exc, input({ budgetPreference: pref })), input({ budgetPreference: pref })).budgetFit;
    };
    expect(e('low', 'low')).toBe(2);
    expect(e('mid', 'low')).toBe(1);
    expect(e('premium', 'low')).toBe(0);
    expect(e('premium', 'no_preference')).toBe(1);
    expect(e('premium', undefined)).toBe(1);
  });

  it('family fit only contributes when children are present', () => {
    const exc = makeExc({ id: 'fam', familyFit: 5 });
    expect(scoreExcursion(exc, evaluateEligibility(exc, input()), input()).familyFit).toBe(0);
    const withKids = input({ childrenPresent: true, youngestChildAge: 8 });
    expect(scoreExcursion(exc, evaluateEligibility(exc, withKids), withKids).familyFit).toBe(3);
  });
});

describe('recommendExcursions — normal three-card result', () => {
  const catalog = [
    makeExc({ id: 'cheap', budgetTier: 'low', logisticsEase: 2, priorities: ['beach'], partyTypes: ['couple'], durationMinutes: 120, outboundTravelMinutes: 15, returnTravelMinutes: 15 }),
    makeExc({ id: 'easy', budgetTier: 'premium', logisticsEase: 5, priorities: ['history'], partyTypes: ['solo'] }),
    makeExc({ id: 'fit', budgetTier: 'mid', logisticsEase: 4, priorities: ['beach', 'local_food'], partyTypes: ['couple', 'family'] }),
    makeExc({ id: 'extra', budgetTier: 'mid', logisticsEase: 3, priorities: ['adventure'], partyTypes: ['friends'], durationMinutes: 240 }),
  ];
  const result = recommendExcursions(catalog, input({ budgetPreference: 'low' }));

  it('returns exactly three, not a fallback', () => {
    expect(result.recommendations).toHaveLength(3);
    expect(result.fallback).toBe(false);
    expect(result.eligibleCount).toBe(4);
  });

  it('assigns the three distinct labels in spec order', () => {
    expect(result.recommendations.map((r) => r.label)).toEqual([
      'best_value',
      'easiest_logistics',
      'best_fit_for_group',
    ]);
    const ids = result.recommendations.map((r) => r.excursion.id);
    expect(new Set(ids).size).toBe(3);
  });

  it('selects the expected winner per label', () => {
    const byLabel = Object.fromEntries(result.recommendations.map((r) => [r.label, r.excursion.id]));
    expect(byLabel.best_value).toBe('cheap'); // highest budget fit
    expect(byLabel.easiest_logistics).toBe('easy'); // highest logistics ease
    expect(byLabel.best_fit_for_group).toBe('fit'); // highest total
  });

  it('emits claim-safe fit reasons (no guarantee/spots-left language)', () => {
    for (const r of result.recommendations) {
      expect(r.fitReason).not.toMatch(/guarantee|spots left|sold out/i);
      expect(r.fitReason.length).toBeGreaterThan(0);
    }
  });
});

describe('recommendExcursions — determinism and tie-breaks', () => {
  const catalog = [
    makeExc({ id: 'bbb', priorities: ['beach', 'local_food'] }),
    makeExc({ id: 'aaa', priorities: ['beach', 'local_food'] }),
    makeExc({ id: 'ccc', priorities: ['beach', 'local_food'] }),
  ];

  it('is stable across repeated runs', () => {
    const a = recommendExcursions(catalog, input());
    const b = recommendExcursions(catalog, input());
    expect(a.recommendations.map((r) => r.excursion.id)).toEqual(
      b.recommendations.map((r) => r.excursion.id),
    );
  });

  it('breaks exact ties by ascending id', () => {
    // All three are identical except id ⇒ best_value should take "aaa".
    const r = recommendExcursions(catalog, input());
    expect(r.recommendations[0].excursion.id).toBe('aaa');
  });
});

describe('recommendExcursions — fallback behavior', () => {
  it('returns no recommendations when none are eligible', () => {
    const catalog = [
      makeExc({ id: 'p', port: 'freeport' as Excursion['port'] }),
      makeExc({ id: 'big', durationMinutes: 600, outboundTravelMinutes: 60, returnTravelMinutes: 60 }),
    ];
    const r = recommendExcursions(catalog, input());
    expect(r.recommendations).toHaveLength(0);
    expect(r.eligibleCount).toBe(0);
    expect(r.fallback).toBe(true);
  });

  it('returns fewer than three labelled cards when fewer qualify', () => {
    const catalog = [
      makeExc({ id: 'one', priorities: ['beach'] }),
      makeExc({ id: 'two', priorities: ['local_food'] }),
    ];
    const r = recommendExcursions(catalog, input());
    expect(r.recommendations).toHaveLength(2);
    expect(r.recommendations.map((x) => x.label)).toEqual(['best_value', 'easiest_logistics']);
    expect(r.fallback).toBe(true);
  });

  it('produces no eligible excursions when port-math is invalid', () => {
    const invalidPM = computePortMath(
      { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: '17:00', allAboardTime: '09:00' },
      CONFIG,
    );
    const r = recommendExcursions([makeExc({ id: 'a' })], input({ portMath: invalidPM }));
    expect(r.eligibleCount).toBe(0);
    expect(r.fallback).toBe(true);
  });

  it('fail-closed: excludes fixed-start and incomplete entries from recommendations', () => {
    const catalog = [
      makeExc({ id: 'good', priorities: ['beach'] }),
      makeExc({ id: 'fixed', startTimeFlexibility: 'fixed', priorities: ['beach'] }),
      makeExc({ id: 'incomplete', durationMinutes: 0, priorities: ['beach'] }),
    ];
    const r = recommendExcursions(catalog, input());
    expect(r.eligibleCount).toBe(1);
    expect(r.recommendations.map((x) => x.excursion.id)).toEqual(['good']);
    expect(r.fallback).toBe(true);
  });
});

describe('recommendExcursions — affiliate URL preservation', () => {
  it('copies the exact affiliate URL untouched (incl. pid, no appended params)', () => {
    const url =
      'https://www.viator.com/tours/Nassau/Exclusive-Swimming-Pigs-Speed-Boat-Snorkeling-Beach-Bar-and-Grill-Package/d420-52556P13?pid=P00293644';
    const r = recommendExcursions(
      [makeExc({ id: 'pigs', affiliateUrl: url, priorities: ['beach'] })],
      input(),
    );
    expect(r.recommendations[0].affiliateUrl).toBe(url);
    expect(r.recommendations[0].affiliateUrl).toContain('pid=P00293644');
  });
});
