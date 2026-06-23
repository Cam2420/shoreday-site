import { describe, expect, it } from 'vitest';
import type { ItineraryShapeConfig, PortConfig } from '../types/funnel';
import { buildBasicItinerary } from './basic-itinerary';
import { computePortMath } from './port-math';

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

const SHAPE: ItineraryShapeConfig = {
  orientationMinutes: 30,
  returnTransitionMinutes: 30,
  minAnchorMinutes: 60,
  configStatus: 'locked',
};

const portMath = (stepOff: string, allAboard: string) =>
  computePortMath(
    { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: stepOff, allAboardTime: allAboard },
    CONFIG,
  );

/** Shared invariant checks the spec requires of every produced itinerary. */
function assertWellFormed(
  blocks: { startMinute: number; endMinute: number }[],
  startMin: number,
  targetMin: number,
) {
  for (const b of blocks) {
    expect(b.startMinute).toBeGreaterThanOrEqual(startMin);
    expect(b.endMinute).toBeLessThanOrEqual(targetMin); // never beyond the return target
    expect(b.endMinute).toBeGreaterThanOrEqual(b.startMinute);
  }
  // No overlaps: each block starts at or after the previous block's end.
  for (let i = 1; i < blocks.length; i += 1) {
    expect(blocks[i].startMinute).toBeGreaterThanOrEqual(blocks[i - 1].endMinute);
  }
}

describe('buildBasicItinerary — standard day, no excursion', () => {
  const r = computePortMath(
    { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: '08:00', allAboardTime: '17:00' },
    CONFIG,
  );
  const it_ = buildBasicItinerary({ portMath: r, terminalName: 'Test Wharf' }, SHAPE);

  it('is a normal (non-fallback) plan', () => {
    expect(it_.conservativeFallback).toBe(false);
    expect(it_.isPlanningRecommendation).toBe(true);
  });

  it('produces the canonical block sequence', () => {
    expect(it_.blocks.map((b) => b.type)).toEqual([
      'orientation',
      'anchor_activity',
      'return_transition',
      'recommended_pier_target',
    ]);
  });

  it('keeps every block within the usable window and non-overlapping', () => {
    assertWellFormed(it_.blocks, 480, 975); // 08:00 → 16:15
  });

  it('ends exactly at the recommended terminal return', () => {
    const last = it_.blocks[it_.blocks.length - 1];
    expect(last.type).toBe('recommended_pier_target');
    expect(last.endMinute).toBe(975);
    const ret = it_.blocks.find((b) => b.type === 'return_transition')!;
    expect(ret.endMinute).toBe(975);
  });
});

describe('buildBasicItinerary — with a fitting anchor excursion', () => {
  const r = computePortMath(
    { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: '08:00', allAboardTime: '17:00' },
    CONFIG,
  );
  const it_ = buildBasicItinerary(
    {
      portMath: r,
      anchorExcursion: { id: 'nassau_rum_tasting', name: 'Rum Tasting Walking Tour', durationMinutes: 180 },
    },
    SHAPE,
  );

  it('places the excursion as the anchor with its catalog duration', () => {
    const anchor = it_.blocks.find((b) => b.type === 'anchor_activity')!;
    expect(anchor.excursionId).toBe('nassau_rum_tasting');
    expect(anchor.durationMinutes).toBe(180);
    expect(anchor.label).toBe('Rum Tasting Walking Tour');
  });

  it('fills remaining time with flexible local time and stays well-formed', () => {
    expect(it_.blocks.some((b) => b.type === 'flexible_local_time')).toBe(true);
    assertWellFormed(it_.blocks, 480, 975);
  });
});

describe('buildBasicItinerary — anchor excursion too long for the window', () => {
  const r = computePortMath(
    { port: 'nassau', portDate: '2026-07-15', expectedStepOffTime: '08:00', allAboardTime: '17:00' },
    CONFIG,
  );
  const it_ = buildBasicItinerary(
    {
      portMath: r,
      anchorExcursion: { id: 'too_long', name: 'All-Day Trip', durationMinutes: 600 },
    },
    SHAPE,
  );

  it('drops the excursion, keeps a generic anchor, and notes why', () => {
    const anchor = it_.blocks.find((b) => b.type === 'anchor_activity')!;
    expect(anchor.excursionId).toBeUndefined();
    expect(it_.notes.some((n) => n.toLowerCase().includes('longer than the usable window'))).toBe(true);
    assertWellFormed(it_.blocks, 480, 975);
  });
});

describe('buildBasicItinerary — short window fallback', () => {
  // 10:00 → 11:30 ⇒ return 10:45; usable 45 < 30+60+30.
  const r = portMath('10:00', '11:30');
  const it_ = buildBasicItinerary({ portMath: r }, SHAPE);

  it('returns a conservative near-pier fallback', () => {
    expect(r.valid).toBe(true);
    expect(it_.conservativeFallback).toBe(true);
    expect(it_.blocks.map((b) => b.type)).toEqual(['orientation', 'recommended_pier_target']);
    assertWellFormed(it_.blocks, 600, 645);
  });
});

describe('buildBasicItinerary — invalid / no usable window', () => {
  it('falls back with no blocks when port-math is invalid', () => {
    const r = portMath('17:00', '09:00'); // all-aboard before step-off
    const it_ = buildBasicItinerary({ portMath: r }, SHAPE);
    expect(it_.conservativeFallback).toBe(true);
    expect(it_.blocks).toHaveLength(0);
    expect(it_.notes.length).toBeGreaterThan(0);
  });

  it('falls back when the terminal buffer leaves no usable window', () => {
    const r = portMath('16:30', '17:00'); // no_usable_window
    const it_ = buildBasicItinerary({ portMath: r }, SHAPE);
    expect(it_.conservativeFallback).toBe(true);
    expect(it_.blocks).toHaveLength(0);
  });
});
