/**
 * Nassau Funnel V1 — Zod validation for all external / API-facing inputs.
 *
 * Blocks: malformed dates, malformed times, all-aboard before step-off
 * (overnight/impossible sequences), unsupported ports, invalid enum values, and
 * unexpected fields (every object is strict). Scope: Nassau only.
 *
 * The validated output of `planInputSchema` is kept structurally in sync with the
 * hand-authored `PlanInput` type via the compile-time `PlanInputParity` check.
 */

import { z } from 'zod';
import {
  BUDGET_PREFERENCES,
  FUNNEL_ANGLES,
  INDEPENDENCE_PREFERENCES,
  INTERESTS,
  PLANNING_STATES,
  PORTS,
  TRAVELER_GROUPS,
  type PlanInput,
} from '../types/funnel';
import { isValidDateString, isValidTimeString, timeToMinutes } from './time';

/* ───────────────────────── Primitives ───────────────────────── */

const timeString = z
  .string()
  .refine(isValidTimeString, { message: 'Expected a 24-hour HH:mm time' });

const dateString = z
  .string()
  .refine(isValidDateString, { message: 'Expected a real YYYY-MM-DD calendar date' });

const portSchema = z.enum(PORTS);

/** Attribution. Strict, all optional, never carries PII. */
export const sourceSchema = z
  .strictObject({
    utmSource: z.string().max(200).optional(),
    utmMedium: z.string().max(200).optional(),
    utmCampaign: z.string().max(200).optional(),
    utmContent: z.string().max(200).optional(),
    creativeId: z.string().max(200).optional(),
    angle: z.enum(FUNNEL_ANGLES).optional(),
  })
  .optional();

/* ───────────────────────── Plan input (quiz) ───────────────────────── */

export const planInputSchema = z
  .strictObject({
    port: portSchema,
    shipName: z.string().trim().min(1).max(120),
    portDate: dateString,
    expectedStepOffTime: timeString,
    allAboardTime: timeString,
    allAboardConfirmed: z.boolean(),
    partyType: z.enum(TRAVELER_GROUPS),
    partySize: z.number().int().min(1).max(10),
    childrenPresent: z.boolean(),
    youngestChildAge: z.number().int().min(0).max(17).optional(),
    mobilityNote: z.string().max(280).optional(),
    planningState: z.enum(PLANNING_STATES),
    // Spec §5: choose up to two; at least one required.
    interests: z.array(z.enum(INTERESTS)).min(1).max(2),
    budgetPreference: z.enum(BUDGET_PREFERENCES).optional(),
    independencePreference: z.enum(INDEPENDENCE_PREFERENCES).optional(),
    source: sourceSchema,
  })
  .refine(
    (v) => {
      // Field-shape errors are reported on the fields themselves; only run the
      // cross-field comparison when both times are well-formed.
      if (!isValidTimeString(v.expectedStepOffTime) || !isValidTimeString(v.allAboardTime)) {
        return true;
      }
      return timeToMinutes(v.allAboardTime) > timeToMinutes(v.expectedStepOffTime);
    },
    {
      message:
        'all_aboard_time must be later than expected_step_off_time; overnight or impossible sequences are not supported',
      path: ['allAboardTime'],
    },
  );

/* ───────────────────────── Port-math input (calculator) ───────────────────────── */

export const portMathInputSchema = z
  .strictObject({
    port: portSchema,
    portDate: dateString,
    expectedStepOffTime: timeString,
    allAboardTime: timeString,
    referenceDate: dateString.optional(),
  })
  .refine(
    (v) => {
      if (!isValidTimeString(v.expectedStepOffTime) || !isValidTimeString(v.allAboardTime)) {
        return true;
      }
      return timeToMinutes(v.allAboardTime) > timeToMinutes(v.expectedStepOffTime);
    },
    {
      message:
        'all_aboard_time must be later than expected_step_off_time; overnight or impossible sequences are not supported',
      path: ['allAboardTime'],
    },
  );

/* ───────────────────────── Email gate ───────────────────────── */

/**
 * Email gate (spec §7): email + delivery consent required; marketing consent is
 * separate and optional. No email is accepted without explicit delivery consent.
 */
export const emailGateSchema = z.strictObject({
  planId: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  deliveryConsent: z.literal(true),
  marketingConsent: z.boolean().optional().default(false),
});

/* ───────────────────────── Inferred types + parity ───────────────────────── */

export type ValidatedPlanInput = z.infer<typeof planInputSchema>;
export type ValidatedPortMathInput = z.infer<typeof portMathInputSchema>;
export type ValidatedEmailGate = z.infer<typeof emailGateSchema>;

/**
 * Compile-time guard: a successfully validated plan input must be assignable to
 * the canonical `PlanInput`. If the schema and type drift, this fails to compile.
 */
export type PlanInputParity = ValidatedPlanInput extends PlanInput ? true : never;

/* ───────────────────────── Convenience wrappers ───────────────────────── */

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: { path: string; message: string }[] };

function flatten(error: z.ZodError): { path: string; message: string }[] {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
}

/** Validate raw plan input; returns typed data or flat, claim-safe error list. */
export function validatePlanInput(input: unknown): ValidationResult<ValidatedPlanInput> {
  const parsed = planInputSchema.safeParse(input);
  return parsed.success
    ? { success: true, data: parsed.data }
    : { success: false, errors: flatten(parsed.error) };
}

/** Validate raw calculator input. */
export function validatePortMathInput(
  input: unknown,
): ValidationResult<ValidatedPortMathInput> {
  const parsed = portMathInputSchema.safeParse(input);
  return parsed.success
    ? { success: true, data: parsed.data }
    : { success: false, errors: flatten(parsed.error) };
}

/** Validate raw email-gate submission. */
export function validateEmailGate(input: unknown): ValidationResult<ValidatedEmailGate> {
  const parsed = emailGateSchema.safeParse(input);
  return parsed.success
    ? { success: true, data: parsed.data }
    : { success: false, errors: flatten(parsed.error) };
}
