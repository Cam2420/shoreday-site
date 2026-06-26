import { describe, expect, it } from 'vitest';
import {
  assertNoPii,
  createFunnelEvent,
  daysToPortBucket,
  FUNNEL_EVENTS,
  SPEC_APP_EVENTS,
} from './funnel-events';

describe('funnel events — canonical names (spec §12)', () => {
  it('defines exactly the 14 spec web events', () => {
    expect(FUNNEL_EVENTS).toHaveLength(14);
    expect(FUNNEL_EVENTS).toEqual([
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
    ]);
  });

  it('has no duplicate event names', () => {
    expect(new Set(FUNNEL_EVENTS).size).toBe(FUNNEL_EVENTS.length);
  });

  it('reconciles to 14 web + 12 app events (neither is 17)', () => {
    expect(FUNNEL_EVENTS).toHaveLength(14);
    expect(SPEC_APP_EVENTS).toHaveLength(12);
    expect(FUNNEL_EVENTS.length + SPEC_APP_EVENTS.length).toBe(26);
    // No overlap between web and app event names.
    const web = new Set<string>(FUNNEL_EVENTS);
    expect(SPEC_APP_EVENTS.some((e) => web.has(e))).toBe(false);
  });
});

describe('funnel events — PII guard', () => {
  it('accepts allowed, non-PII properties', () => {
    const e = createFunnelEvent('excursion_click', {
      plan_id: 'plan_123',
      excursion_id: 'nassau_rum_tasting',
      offer_priority: 'best_value',
    });
    expect(e.name).toBe('excursion_click');
    expect(e.properties.excursion_id).toBe('nassau_rum_tasting');
  });

  it('throws when a property key looks like PII', () => {
    expect(() => assertNoPii({ email: 'a@b.com' })).toThrow();
    expect(() => assertNoPii({ user_email: 'a@b.com' })).toThrow();
    expect(() => assertNoPii({ access_token: 'xyz' })).toThrow();
    expect(() => assertNoPii({ plan_id: 'ok', port: 'nassau' })).not.toThrow();
  });
});

describe('funnel events — daysToPortBucket', () => {
  it('buckets without leaking exact dates', () => {
    expect(daysToPortBucket(0)).toBe('le_3');
    expect(daysToPortBucket(3)).toBe('le_3');
    expect(daysToPortBucket(5)).toBe('4_7');
    expect(daysToPortBucket(10)).toBe('8_14');
    expect(daysToPortBucket(30)).toBe('ge_15');
    expect(daysToPortBucket(undefined)).toBe('unknown');
  });
});
