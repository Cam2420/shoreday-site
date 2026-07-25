import { describe, expect, it } from 'vitest';
import { isTrackableEvent, track } from './analytics';
import {
  createFunnelEvent,
  FUNNEL_EVENTS,
  pickAllowedProperties,
  type FunnelEventProperties,
} from './funnel-events';
import { buildPartialResultView } from './funnel-plan';
import { computePortMath } from './port-math';
import type { PortConfig, PortMathInput } from '../types/funnel';

describe('analytics — canonical event construction', () => {
  it('constructs every canonical web event name', () => {
    for (const name of FUNNEL_EVENTS) {
      const e = createFunnelEvent(name, { port: 'nassau' });
      expect(e.name).toBe(name);
      expect(e.properties.port).toBe('nassau');
    }
  });

  it('accepts the new privacy-safe operational fields', () => {
    const props: FunnelEventProperties = {
      port: 'nassau',
      mode: 'default',
      result_type: 'Low-Stress Independent Planner',
      surface: 'home_hero',
      store: 'apple',
      step: 2,
      excursion_id: 'nassau_rum_tasting',
      offer_priority: '1',
    };
    const e = createFunnelEvent('app_store_click', props);
    expect(e.properties.store).toBe('apple');
    expect(e.properties.surface).toBe('home_hero');
    expect(e.properties.result_type).toBe('Low-Stress Independent Planner');
    expect(e.properties.mode).toBe('default');
  });
});

describe('analytics — runtime event-name allow-list (isTrackableEvent)', () => {
  it('accepts every canonical web event name', () => {
    for (const name of FUNNEL_EVENTS) {
      expect(isTrackableEvent(name)).toBe(true);
    }
  });

  it('rejects ad-hoc / non-canonical names (incl. the retired ones)', () => {
    // The old ad-hoc names that were removed must not be trackable, and a
    // homepage-specific CTA name has no canonical mapping either.
    for (const bad of [
      'quiz_start',
      'quiz_complete',
      'quiz_step_answered',
      'viator_click',
      'email_capture_completed',
      'home_cta_click',
      'planner_start_home',
      '',
    ]) {
      expect(isTrackableEvent(bad)).toBe(false);
    }
  });
});

describe('analytics — no homepage planner_start double-counting', () => {
  it('planner_start is a canonical planner event (fired by the planner, not the homepage CTA)', () => {
    // The homepage "Start My Nassau Plan" CTA is intentionally UNtracked (it is an
    // internal navigation). planner_start is emitted once, inside the planner. This
    // asserts the event identity the planner relies on; the homepage cannot emit a
    // competing planner_start because its CTA carries no analytics event.
    expect(isTrackableEvent('planner_start')).toBe(true);
    expect(FUNNEL_EVENTS.filter((e) => e === 'planner_start')).toHaveLength(1);
  });
});

describe('analytics — server property sanitisation (pickAllowedProperties)', () => {
  it('keeps allow-listed keys and drops unknown keys', () => {
    const cleaned = pickAllowedProperties({
      port: 'nassau',
      mode: 'times',
      surface: 'exact_timing_form',
      store: 'google',
      excursion_id: 'x1',
      step: 3,
      // Unknown / unsafe keys that must be dropped:
      email: 'a@b.com',
      ship_name: 'Carnival Celebration',
      question: 'group',
      answer: 'Family with kids',
      foo: 'bar',
    });
    expect(cleaned).toEqual({
      port: 'nassau',
      mode: 'times',
      surface: 'exact_timing_form',
      store: 'google',
      excursion_id: 'x1',
      step: 3,
    });
    expect('email' in cleaned).toBe(false);
    expect('ship_name' in cleaned).toBe(false);
    expect('answer' in cleaned).toBe(false);
  });

  it('does not mutate its input', () => {
    const input = { port: 'nassau', foo: 'bar' };
    pickAllowedProperties(input);
    expect(input).toEqual({ port: 'nassau', foo: 'bar' });
  });
});

describe('analytics — PII guard still enforced with new fields', () => {
  it('rejects an event that carries an email-like key', () => {
    expect(() =>
      // @ts-expect-error — email is not an allowed field; runtime guard must also reject it.
      createFunnelEvent('email_submitted', { port: 'nassau', email: 'a@b.com' }),
    ).toThrow();
  });

  it('rejects token-like keys alongside valid operational fields', () => {
    expect(() =>
      // @ts-expect-error — access_token is forbidden PII.
      createFunnelEvent('results_view', { surface: 'unlocked_result', access_token: 'xyz' }),
    ).toThrow();
  });
});

describe('analytics — track() is a safe SSR no-op', () => {
  it('does not throw when called without a window (server environment)', () => {
    // vitest's default environment is node (no `window`); track() must guard and
    // return without attempting any transport.
    expect(typeof window).toBe('undefined');
    expect(() => track('landing_view', { port: 'nassau', source: 'home' })).not.toThrow();
  });
});

// Config-driven fixture (round numbers), independent of the pending owner-locked
// production values in data/ports/nassau.ts — mirrors lib/port-math.test.ts.
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

describe('exact-time path — planner_complete / port_math_view gate', () => {
  it('a valid exact-time calculation produces a valid result view (events WOULD fire)', () => {
    // The result effect fires planner_complete + port_math_view only when
    // buildPartialResultView(result).valid is true.
    const input: PortMathInput = {
      port: 'nassau',
      portDate: '2026-07-15',
      expectedStepOffTime: '08:00',
      allAboardTime: '17:00',
    };
    const result = computePortMath(input, CONFIG);
    expect(result.valid).toBe(true);
    expect(buildPartialResultView(result).valid).toBe(true);
  });

  it('an invalid exact-time submission does NOT yield a valid view (events would NOT fire)', () => {
    // All-aboard before step-off — calculator must reject, so no completion event.
    const input: PortMathInput = {
      port: 'nassau',
      portDate: '2026-07-15',
      expectedStepOffTime: '17:00',
      allAboardTime: '08:00',
    };
    const result = computePortMath(input, CONFIG);
    expect(result.valid).toBe(false);
    expect(buildPartialResultView(result).valid).toBe(false);
  });
});
