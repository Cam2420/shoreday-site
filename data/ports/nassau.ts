/**
 * Nassau port configuration for the deterministic port-math engine (spec §6).
 *
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │  ✅ LOCKED 2026-06-23 — approved Nassau timing policy.                      │
 * │                                                                            │
 * │  The §6 formulas live in lib/port-math.ts; the numeric values below are    │
 * │  now the approved policy (configStatus: 'locked'). Each is grounded in the │
 * │  Master Research Dump. These are PLANNING RECOMMENDATIONS, never a          │
 * │  guaranteed-return promise. Unit tests use their own fixture configs, so    │
 * │  changing these values does not affect test correctness.                   │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * Provenance of the locked numbers:
 *  - terminalBufferMinutes = 60
 *      The displayed "be back at the pier by" target = all_aboard − 60 min.
 *      Matches the strongest Nassau-specific recommendation in the research:
 *      Cruise Critic advises returning ~60 minutes before all-aboard for
 *      independent travelers (Master Research Dump Claim 6-C / fact #15:
 *      "minimum 60-min pre-all-aboard alert for independent bookings").
 *      (Revised up from the earlier proposed 20-min pier-walk-only figure so the
 *      headline pier-return target is appropriately conservative; per-excursion
 *      return travel + contingency are still applied on top via the §6
 *      leave_final_stop_by formula.)
 *  - defaultContingencyMinutes = 30
 *      Personal buffer line in the usable-window worksheet (Claim 6-D,
 *      "personal buffer (independent excursion) −30 min").
 *  - minimumUsableMinutes = 120
 *      Soft floor below which the usable window is flagged too short for a
 *      meaningful anchor activity (shortest catalog excursion is 60 min before
 *      travel). No direct research source — a conservative structural default,
 *      not a return-safety number. Adjust if the owner prefers a different floor.
 *
 * Verified (not derived):
 *  - timezone "America/Nassau" — spec §6/§11.
 *  - terminalName "Prince George Wharf" — mobile `PortData`.
 */

import type { ItineraryShapeConfig, PortConfig } from '../../types/funnel';

export const NASSAU_PORT_CONFIG: PortConfig = {
  port: 'nassau',
  timezone: 'America/Nassau',
  terminalName: 'Prince George Wharf',
  terminalBufferMinutes: 60, // LOCKED — Cruise Critic ~60-min pre-all-aboard return
  defaultContingencyMinutes: 30, // LOCKED — Claim 6-D personal buffer
  minimumUsableMinutes: 120, // LOCKED — soft floor (no research source)
  configStatus: 'locked',
  calculationVersion: 'nassau-portmath-2026-06-23-locked-v1',
};

/**
 * Itinerary shape config remains PROPOSED — these are structural block lengths,
 * not part of the locked return-timing policy. Unit tests use fixture shapes.
 */
export const NASSAU_ITINERARY_SHAPE: ItineraryShapeConfig = {
  orientationMinutes: 30, // PROPOSED — pending owner lock
  returnTransitionMinutes: 30, // PROPOSED — pending owner lock
  minAnchorMinutes: 60, // PROPOSED — pending owner lock
  configStatus: 'proposed',
};
