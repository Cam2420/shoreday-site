/**
 * Nassau port configuration for the deterministic port-math engine (spec §6).
 *
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │  ✅ LOCKED 2026-06-23 — OWNER-APPROVED ShoreDay Nassau V1 planning defaults.│
 * │                                                                            │
 * │  terminalBufferMinutes      = 45                                           │
 * │  defaultContingencyMinutes  = 15                                           │
 * │  minimumUsableMinutes       = 120                                          │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * These are ShoreDay PRODUCT-POLICY planning defaults — not external facts and
 * not guarantees:
 *  - They are planning recommendations, NOT guarantees of any kind.
 *  - Users must confirm the official ship-provided all-aboard time; it is the
 *    final authority.
 *  - V1 does NOT monitor live schedule changes, traffic, weather, or port
 *    conditions.
 *  - No itinerary or recommendation guarantees a return to the ship.
 *  - The 120-minute minimum-usable threshold is a ShoreDay CONSERVATIVE product
 *    threshold, not an externally verified universal rule.
 *
 * Contextual research only (NOT the locked configuration): broader cruise
 * guidance discusses ~45–60-minute pre-all-aboard return practices (e.g. Cruise
 * Critic). ShoreDay's approved default is 45 minutes. The §6 formulas live in
 * lib/port-math.ts; unit tests cover both fixture configs and this locked policy.
 */

import type { ItineraryShapeConfig, PortConfig } from '../../types/funnel';

export const NASSAU_PORT_CONFIG: PortConfig = {
  port: 'nassau',
  timezone: 'America/Nassau',
  terminalName: 'Prince George Wharf',
  terminalBufferMinutes: 45, // LOCKED — owner-approved ShoreDay product policy
  defaultContingencyMinutes: 15, // LOCKED — owner-approved ShoreDay product policy
  minimumUsableMinutes: 120, // LOCKED — ShoreDay conservative product threshold
  configStatus: 'locked',
  calculationVersion: 'nassau-portmath-2026-06-23-locked-v2',
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
