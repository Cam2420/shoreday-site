import { describe, expect, it } from 'vitest';
import { NASSAU_PORT_CONFIG } from '../data/ports/nassau';
import { validatePlanInput } from './funnel-validation';
import { computePortMath } from './port-math';
import {
  approxHoursLabel,
  buildPartialResultView,
  buildPlanInput,
  checkEmailGateSubmit,
  consentIsSeparate,
  DEFAULT_PLANNING_STATE,
  defaultPartySize,
  firstIncompleteStep,
  formatDurationLabel,
  FUNNEL_STEP_IDS,
  initialConsentState,
  initialFormState,
  INTEREST_OPTIONS,
  isPlanComplete,
  isStepComplete,
  isValidEmail,
  MAX_INTERESTS,
  PARTIAL_RESULT_CONTRACT,
  partialResultSections,
  selectShortWindowMessage,
  to12Hour,
  toggleInterest,
  type PlanFormState,
} from './funnel-plan';

function completeForm(): PlanFormState {
  return {
    port: 'nassau',
    shipName: 'Carnival Celebration',
    portDate: '2026-07-15',
    expectedStepOffTime: '08:00',
    allAboardTime: '17:00',
    allAboardConfirmed: true,
    partyType: 'couple',
    interests: ['beach', 'local_food'],
    budgetPreference: 'mid',
    independencePreference: 'mixed',
  };
}

const pm = (stepOff: string, allAboard: string) =>
  computePortMath(
    { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: stepOff, allAboardTime: allAboard },
    NASSAU_PORT_CONFIG,
  );

describe('step ordering and completion', () => {
  it('has the five onboarding steps in order', () => {
    expect(FUNNEL_STEP_IDS).toEqual(['basics', 'group', 'interests', 'budget', 'independence']);
  });

  it('starts with every step incomplete', () => {
    const f = initialFormState();
    expect(firstIncompleteStep(f)).toBe('basics');
    expect(isPlanComplete(f)).toBe(false);
  });

  it('requires date, both times, and the all-aboard confirmation for basics', () => {
    const f = initialFormState();
    f.portDate = '2026-07-15';
    f.expectedStepOffTime = '08:00';
    f.allAboardTime = '17:00';
    expect(isStepComplete('basics', f)).toBe(false); // confirmation unchecked
    f.allAboardConfirmed = true;
    expect(isStepComplete('basics', f)).toBe(true);
  });

  it('treats a fully filled form as complete', () => {
    expect(isPlanComplete(completeForm())).toBe(true);
    expect(firstIncompleteStep(completeForm())).toBeNull();
  });
});

describe('interest selection (cap at two)', () => {
  it('adds and removes interests', () => {
    expect(toggleInterest([], 'beach')).toEqual(['beach']);
    expect(toggleInterest(['beach'], 'beach')).toEqual([]);
  });

  it('never exceeds the max', () => {
    const two = toggleInterest(toggleInterest([], 'beach'), 'local_food');
    expect(two).toHaveLength(MAX_INTERESTS);
    expect(toggleInterest(two, 'history')).toEqual(two); // third is ignored
  });
});

describe('interest parity (Nature supported)', () => {
  it('offers the mobile-parity set plus spec-defined Adventure', () => {
    expect(INTEREST_OPTIONS.map((o) => o.value)).toEqual([
      'local_food',
      'beach',
      'history',
      'nature',
      'adventure',
    ]);
    expect(INTEREST_OPTIONS.map((o) => o.value)).toContain('nature');
  });

  it('lets Nature be selected and survive the mapping into a valid PlanInput', () => {
    const interests = toggleInterest([], 'nature');
    expect(interests).toEqual(['nature']);
    const input = buildPlanInput({ ...completeForm(), interests });
    expect(input.interests).toContain('nature');
    expect(validatePlanInput(input).success).toBe(true);
  });
});

describe('mapping form state into PlanInput', () => {
  it('produces a PlanInput that passes the canonical schema', () => {
    const result = validatePlanInput(buildPlanInput(completeForm()));
    expect(result.success).toBe(true);
  });

  it('derives party size and children flag from the group', () => {
    expect(defaultPartySize('solo')).toBe(1);
    expect(defaultPartySize('couple')).toBe(2);
    const family = buildPlanInput({ ...completeForm(), partyType: 'family' });
    expect(family.partySize).toBe(4);
    expect(family.childrenPresent).toBe(true);
  });

  it('uses the neutral default planning state, independent of independence preference', () => {
    const base = completeForm();
    const guided = buildPlanInput({ ...base, independencePreference: 'guided' });
    const independent = buildPlanInput({ ...base, independencePreference: 'independent' });
    const none = buildPlanInput({ ...base, independencePreference: 'no_preference' });
    expect(DEFAULT_PLANNING_STATE).toBe('undecided');
    expect(guided.planningState).toBe(DEFAULT_PLANNING_STATE);
    expect(independent.planningState).toBe(DEFAULT_PLANNING_STATE);
    expect(none.planningState).toBe(DEFAULT_PLANNING_STATE);
    // Regression: changing independence preference must NOT change planningState.
    expect(new Set([guided.planningState, independent.planningState, none.planningState]).size).toBe(1);
  });

  it('does not mask a missing ship name (schema catches it)', () => {
    const result = validatePlanInput(buildPlanInput({ ...completeForm(), shipName: '   ' }));
    expect(result.success).toBe(false);
  });
});

describe('partial-result formatting', () => {
  it('formats exact durations', () => {
    expect(formatDurationLabel(540)).toBe('9h');
    expect(formatDurationLabel(545)).toBe('9h 5m');
    expect(formatDurationLabel(45)).toBe('45m');
  });

  it('formats claim-safe approximate hours', () => {
    expect(approxHoursLabel(300)).toBe('about 5 hours');
    expect(approxHoursLabel(270)).toBe('about 4.5 hours');
    expect(approxHoursLabel(45)).toBe('under an hour');
  });

  it('converts to a 12-hour label', () => {
    expect(to12Hour('16:15')).toBe('4:15 PM');
    expect(to12Hour('00:30')).toBe('12:30 AM');
    expect(to12Hour('12:00')).toBe('12:00 PM');
  });

  it('builds a valid partial-result view from real port-math', () => {
    // 08:00 → 17:00 with locked 45-min buffer ⇒ return 16:15, usable 495.
    const view = buildPartialResultView(pm('08:00', '17:00'));
    expect(view.valid).toBe(true);
    expect(view.scheduledWindowLabel).toBe('9h');
    expect(view.recommendedTerminalReturnLabel).toBe('4:15 PM');
    expect(view.isShort).toBe(false);
    expect(view.shortMessage).toBeUndefined();
  });

  it('maps an invalid result to a friendly message', () => {
    const view = buildPartialResultView(pm('17:00', '09:00')); // all-aboard before step-off
    expect(view.valid).toBe(false);
    expect(view.invalidMessage).toMatch(/later than your step-off/i);
  });
});

describe('short-window messaging', () => {
  it('selects the warning only when below the minimum usable window', () => {
    expect(selectShortWindowMessage(pm('08:00', '17:00'))).toBeNull(); // comfortable
    // 14:00 → 16:30 ⇒ return 15:45, usable 105 < 120.
    const short = pm('14:00', '16:30');
    expect(short.belowMinimumUsable).toBe(true);
    expect(selectShortWindowMessage(short)).not.toBeNull();
    expect(buildPartialResultView(short).isShort).toBe(true);
  });
});

describe('email-gate consent separation', () => {
  it('validates email locally via the shared schema', () => {
    expect(isValidEmail('cruiser@example.com')).toBe(true);
    expect(isValidEmail('not-an-email')).toBe(false);
  });

  it('keeps delivery and marketing consent independent', () => {
    const c = { ...initialConsentState(), email: 'a@b.com', marketingConsent: true };
    expect(consentIsSeparate(c)).toBe(true);
    // Marketing true but delivery (the submit action) not yet taken ⇒ not submittable.
    expect(checkEmailGateSubmit(c)).toEqual({ ok: false, reason: 'delivery_consent_required' });
  });

  it('requires a valid email and the delivery action', () => {
    expect(checkEmailGateSubmit({ email: 'bad', deliveryConsent: true, marketingConsent: false })).toEqual({
      ok: false,
      reason: 'invalid_email',
    });
    expect(checkEmailGateSubmit({ email: 'a@b.com', deliveryConsent: true, marketingConsent: false })).toEqual({
      ok: true,
    });
  });
});

describe('pre-results phase composition (email gate before app upsell)', () => {
  const validView = buildPartialResultView(pm('08:00', '17:00'));
  const invalidView = buildPartialResultView(pm('17:00', '09:00'));

  it('orders the partial result: timing → locked teaser → skeleton → email gate', () => {
    expect(partialResultSections(validView)).toEqual([
      'timing_result',
      'locked_teaser',
      'excursion_skeleton',
      'email_gate',
    ]);
  });

  it('places the email gate after the locked teaser', () => {
    const s = partialResultSections(validView);
    expect(s.indexOf('email_gate')).toBeGreaterThan(s.indexOf('locked_teaser'));
    expect(s).toContain('timing_result');
  });

  it('shows only the timing result for an invalid window (no gate, no teaser)', () => {
    expect(partialResultSections(invalidView)).toEqual(['timing_result']);
  });

  it('renders no app upsell, no Book Now, and no real excursion before the gate', () => {
    expect((partialResultSections(validView) as string[])).not.toContain('app_upsell');
    expect(PARTIAL_RESULT_CONTRACT.hasAppCta).toBe(false);
    expect(PARTIAL_RESULT_CONTRACT.hasBookNowCta).toBe(false);
    expect(PARTIAL_RESULT_CONTRACT.rendersRealExcursion).toBe(false);
    expect(PARTIAL_RESULT_CONTRACT.excursionPreviewIsLockedSkeletonOnly).toBe(true);
  });
});
