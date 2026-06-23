/**
 * Deterministic basic-itinerary engine (spec §7, §21.8).
 *
 * Produces ONE simple, finite day shape from validated inputs + port-math output
 * + an optional selected anchor excursion. This is NOT an AI itinerary. It
 * invents no place names, prices, travel times, or safety claims: the day's
 * anchors (start, pier-return target) come from port-math; block lengths come
 * from the supplied `ItineraryShapeConfig`; an anchor's duration is used only
 * when the caller passes a catalog-confirmed value.
 *
 * Day shape: orientation → anchor activity → optional flexible local time →
 * return transition → recommended pier target.
 */

import type {
  BasicItinerary,
  BasicItineraryBlock,
  BasicItineraryBlockType,
  ItineraryShapeConfig,
  PortMathResult,
} from '../types/funnel';
import { minutesToTime, timeToMinutes } from './time';

/** Minimal anchor shape — keeps the itinerary engine decoupled from `Excursion`. */
export interface ItineraryAnchorExcursion {
  id: string;
  name: string;
  /** Catalog-confirmed duration in minutes. */
  durationMinutes: number;
}

export interface BuildItineraryArgs {
  portMath: PortMathResult;
  /** Display name for the pier-return block; defaults to a generic label. */
  terminalName?: string;
  anchorExcursion?: ItineraryAnchorExcursion | null;
}

function makeBlock(
  type: BasicItineraryBlockType,
  label: string,
  startMinute: number,
  endMinute: number,
  extra?: Partial<Pick<BasicItineraryBlock, 'note' | 'excursionId'>>,
): BasicItineraryBlock {
  return {
    type,
    label,
    startTime: minutesToTime(startMinute),
    endTime: minutesToTime(endMinute),
    startMinute,
    endMinute,
    durationMinutes: endMinute - startMinute,
    ...extra,
  };
}

const CONFIRM_NOTE =
  'Times are planning recommendations, not your cruise line’s official schedule. Always confirm your all-aboard time.';

/**
 * Build the deterministic day shape. Never throws; for invalid or zero-usable
 * windows it returns a conservative fallback with an explanatory note.
 */
export function buildBasicItinerary(
  args: BuildItineraryArgs,
  shape: ItineraryShapeConfig,
): BasicItinerary {
  const { portMath } = args;
  const pierName = args.terminalName ?? 'the cruise pier';

  const head = {
    port: portMath.port,
    calculationVersion: portMath.calculationVersion,
    isPlanningRecommendation: true as const,
    recommendedTerminalReturn: portMath.recommendedTerminalReturn,
  };

  // Invalid / no usable window → minimal, conservative plan.
  if (
    !portMath.valid ||
    portMath.recommendedTerminalReturn === undefined ||
    portMath.usablePlanningWindowMinutes <= 0
  ) {
    return {
      ...head,
      conservativeFallback: true,
      usableWindowMinutes: Math.max(0, portMath.usablePlanningWindowMinutes),
      blocks: [],
      notes: [
        'The entered times do not leave a usable window to plan an activity. Reconfirm your all-aboard time with your cruise line.',
      ],
    };
  }

  const startMin = timeToMinutes(portMath.expectedStepOffTime);
  const targetMin = timeToMinutes(portMath.recommendedTerminalReturn);
  const usable = targetMin - startMin;
  const pierTarget = makeBlock(
    'recommended_pier_target',
    `Be back at ${pierName} by ${portMath.recommendedTerminalReturn}`,
    targetMin,
    targetMin,
  );

  // Too short to hold orientation + a minimum anchor + return → conservative.
  if (usable < shape.orientationMinutes + shape.minAnchorMinutes + shape.returnTransitionMinutes) {
    return {
      ...head,
      conservativeFallback: true,
      usableWindowMinutes: usable,
      blocks: [
        makeBlock('orientation', 'Step ashore and stay near the pier', startMin, targetMin, {
          note: 'Short usable window — we kept the plan close to the ship.',
        }),
        pierTarget,
      ],
      notes: [
        'Short usable window: this is a conservative, near-pier plan. Consider a walkable downtown option and confirm your all-aboard time.',
        CONFIRM_NOTE,
      ],
    };
  }

  // Normal shape.
  const orientationEnd = startMin + shape.orientationMinutes;
  const returnStart = targetMin - shape.returnTransitionMinutes;
  const anchorRegion = returnStart - orientationEnd;

  const blocks: BasicItineraryBlock[] = [
    makeBlock('orientation', 'Step ashore and get oriented', startMin, orientationEnd),
  ];
  const notes: string[] = [];

  const anchor = args.anchorExcursion ?? null;
  if (anchor && anchor.durationMinutes > 0 && anchor.durationMinutes <= anchorRegion) {
    const anchorEnd = orientationEnd + anchor.durationMinutes;
    blocks.push(makeBlock('anchor_activity', anchor.name, orientationEnd, anchorEnd, {
      excursionId: anchor.id,
    }));
    if (anchorEnd < returnStart) {
      blocks.push(
        makeBlock(
          'flexible_local_time',
          'Flexible local time (food, beach, or browsing)',
          anchorEnd,
          returnStart,
        ),
      );
    }
  } else {
    if (anchor && anchor.durationMinutes > anchorRegion) {
      notes.push(
        'Your selected excursion is longer than the usable window allows, so the plan shows open anchor time instead.',
      );
    }
    blocks.push(
      makeBlock('anchor_activity', 'One main activity that fits your window', orientationEnd, returnStart),
    );
  }

  blocks.push(makeBlock('return_transition', 'Begin heading back to the ship', returnStart, targetMin));
  blocks.push(pierTarget);
  notes.push(CONFIRM_NOTE);

  return {
    ...head,
    conservativeFallback: false,
    usableWindowMinutes: usable,
    blocks,
    notes,
  };
}
