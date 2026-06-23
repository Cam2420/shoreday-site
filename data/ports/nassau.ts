/**
 * Nassau port configuration for the deterministic port-math engine (spec §6).
 *
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │  ⚠  PROPOSED VALUES — PENDING OWNER LOCK BEFORE PRODUCTION USE.             │
 * │                                                                            │
 * │  The §6 *formulas* are fully specified and implemented in lib/port-math.ts.│
 * │  The numeric PortConfig *values* below are NOT specified by any canonical  │
 * │  source (spec, brief, or the mobile app — `PortData` holds only geography).│
 * │  They are derived from ranges in docs/research/ShoreDay-Master-Research-    │
 * │  Dump.md and are flagged `configStatus: 'proposed'`. Unit tests use their  │
 * │  own explicit fixture configs and do NOT depend on these numbers, so       │
 * │  correctness is proven independently of the eventual locked values.        │
 * │                                                                            │
 * │  These are PLANNING RECOMMENDATIONS, never a guaranteed-return promise.     │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * Provenance of the proposed numbers (all from the Master Research Dump):
 *  - terminalBufferMinutes = 20
 *      Pier walk + terminal re-entry only (the gap from recommended return to
 *      all-aboard). Cruise Critic budgeted ~15 min to walk Nassau's pier/terminal
 *      (Claim 6-C); terminal re-entry is reported at 5–20 min and "not separately
 *      quantified" (Claim 6-E). 20 min is the conservative upper-pier estimate.
 *      Per-excursion return travel and contingency are applied separately by the
 *      engine, so this buffer is intentionally NOT the full 60-min cushion.
 *  - defaultContingencyMinutes = 30
 *      The "personal buffer (independent excursion) −30 min" line in the usable-
 *      window worksheet (Claim 6-D). Cruise Critic recommends a ≥60-min total
 *      independent cushion (Claim 6-C / fact #15); here that splits across
 *      terminal buffer + return travel + this contingency.
 *  - minimumUsableMinutes = 120
 *      ⚠ NO RESEARCH SOURCE. Placeholder floor below which the usable window is
 *      flagged as too short for a meaningful anchor activity (shortest catalog
 *      excursion is 60 min before travel). Pure proposal — owner must decide.
 *
 * timezone and terminalName are VERIFIED, not proposed:
 *  - timezone "America/Nassau" — spec §6/§11.
 *  - terminalName "Prince George Wharf" — mobile `PortData` (`lib/services/port_data.dart`).
 */

import type { ItineraryShapeConfig, PortConfig } from '../../types/funnel';

export const NASSAU_PORT_CONFIG: PortConfig = {
  port: 'nassau',
  timezone: 'America/Nassau',
  terminalName: 'Prince George Wharf',
  terminalBufferMinutes: 20, // PROPOSED — pending owner lock
  defaultContingencyMinutes: 30, // PROPOSED — pending owner lock
  minimumUsableMinutes: 120, // PROPOSED — no research source; pending owner lock
  configStatus: 'proposed',
  calculationVersion: 'nassau-portmath-2026-06-23-proposed',
};

/**
 * ⚠ PROPOSED itinerary shape — pending owner lock. No research source pins these
 * block lengths; they are reasonable structural defaults so the basic-itinerary
 * engine can partition the usable window deterministically. Unit tests use their
 * own fixture shapes and do not depend on these values.
 */
export const NASSAU_ITINERARY_SHAPE: ItineraryShapeConfig = {
  orientationMinutes: 30, // PROPOSED — pending owner lock
  returnTransitionMinutes: 30, // PROPOSED — pending owner lock
  minAnchorMinutes: 60, // PROPOSED — pending owner lock
  configStatus: 'proposed',
};
