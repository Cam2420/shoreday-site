import { describe, expect, it } from 'vitest';
import {
  assertNoPii,
  createFunnelEvent,
  daysToPortBucket,
  FUNNEL_EVENTS,
  pickAllowedProperties,
  SPEC_APP_EVENTS,
  type FunnelEventProperties,
} from './funnel-events';

/** The 14 web events defined by spec §12, in funnel order. */
const SPEC_WEB_EVENTS = [
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

/** Web events added after spec §12 (paid Etsy Playbook card in the unlocked result). */
const POST_SPEC_WEB_EVENTS = ['playbook_card_view', 'playbook_click'] as const;

describe('funnel events — canonical names (spec §12 + post-spec additions)', () => {
  it('keeps the 14 spec web events as a stable prefix, in funnel order', () => {
    expect(SPEC_WEB_EVENTS).toHaveLength(14);
    expect(FUNNEL_EVENTS.slice(0, SPEC_WEB_EVENTS.length)).toEqual([...SPEC_WEB_EVENTS]);
  });

  it('defines exactly the 14 spec events plus the 2 post-spec playbook events', () => {
    expect(FUNNEL_EVENTS).toHaveLength(16);
    expect(FUNNEL_EVENTS).toEqual([...SPEC_WEB_EVENTS, ...POST_SPEC_WEB_EVENTS]);
  });

  it('has no duplicate event names', () => {
    expect(new Set(FUNNEL_EVENTS).size).toBe(FUNNEL_EVENTS.length);
  });

  it('reconciles to 16 web (14 spec + 2 added) + 12 app events (neither is 17)', () => {
    expect(POST_SPEC_WEB_EVENTS).toHaveLength(2);
    expect(SPEC_APP_EVENTS).toHaveLength(12);
    expect(FUNNEL_EVENTS.length + SPEC_APP_EVENTS.length).toBe(28);
    // No overlap between web and app event names.
    const web = new Set<string>(FUNNEL_EVENTS);
    expect(SPEC_APP_EVENTS.some((e) => web.has(e))).toBe(false);
  });
});

describe('funnel events — property allow-list stays in sync with the interface', () => {
  it('allow-lists every key declared on FunnelEventProperties', () => {
    // `satisfies` makes TS fail if a key is dropped from the interface, and the
    // runtime round-trip fails if a key is missing from FUNNEL_EVENT_PROPERTY_KEYS
    // — the exact failure mode where the client sends a prop that the server
    // silently strips before it ever reaches Mixpanel.
    const sample = {
      plan_id: 'plan_1',
      port: 'nassau',
      destination: 'nassau',
      days_to_port_bucket: 'le_3',
      party_type: 'couple',
      planning_state: 'booked_times',
      angle: 'timing',
      source: 'home',
      campaign: 'c1',
      creative_id: 'cr1',
      excursion_id: 'x1',
      offer_priority: '1',
      step: 1,
      mode: 'default',
      result_type: 'Budget-Savvy Explorer',
      plan_type: 'Budget-Savvy Explorer',
      surface: 'unlocked_result',
      store: 'apple',
      utm_source: 's',
      utm_medium: 'm',
      utm_campaign: 'c',
      utm_content: 'ct',
      utm_term: 't',
    } satisfies Required<FunnelEventProperties>;

    expect(pickAllowedProperties(sample)).toEqual(sample);
  });

  it('carries the playbook card properties through the server sanitiser', () => {
    const props = {
      surface: 'unlocked_result',
      destination: 'nassau',
      plan_type: 'Budget-Savvy Explorer',
      utm_source: 'pinterest',
    };
    expect(pickAllowedProperties(props)).toEqual(props);
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
