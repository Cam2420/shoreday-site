import { z } from "zod";
import { emailFieldSchema } from "@/lib/funnel-validation";
import {
  KIT_API_BASE,
  KIT_API_KEY_ENV,
  KIT_FIELD_KEYS,
  KIT_NASSAU_PLAN_FORM_ID_ENV,
  KIT_NASSAU_PLAN_SEQUENCE_ID_ENV,
  KIT_TAGS,
} from "@/lib/kit-nassau-config";
import { to12Hour } from "@/lib/time";

// Server-only route. The Kit API key is read from server env and never returned
// to the client. No key in any response body, header, or log line.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PayloadSchema = z.object({
  email: emailFieldSchema,
  marketingConsent: z.boolean().default(false),
  planMode: z.enum(["exact-time", "starter"]),
  planType: z.string().trim().max(160).optional(),
  returnTarget: z.string().trim().max(40).optional(),
  stepOffTime: z.string().trim().max(40).optional(),
  allAboardTime: z.string().trim().max(40).optional(),
  groupType: z.string().trim().max(80).optional(),
  worry: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(80).optional(),
  source: z.string().trim().max(60).default("nassau-plan"),
  currentPath: z.string().trim().max(200).optional(),
});

type Payload = z.infer<typeof PayloadSchema>;

type RouteResult =
  | { ok: true }
  | { ok: false; error: string; message: string };

// Friendly, secret-free copy reused for every real save failure.
const SAVE_FAILED_MESSAGE = "We couldn’t save your plan just now. Please try again.";
// Truthful copy when the email feature simply isn't wired up server-side. The
// client treats this as "local fallback" and reveals the plan without claiming a
// save — so this must NOT promise an email or imply the save happened.
const NOT_CONFIGURED_MESSAGE = "Email saving is not configured yet. You can still view the plan locally.";

function json(body: RouteResult, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function kitHeaders(apiKey: string) {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Kit-Api-Key": apiKey,
  };
}

/** Only include non-empty custom fields. */
function buildFields(p: Payload): Record<string, string> {
  const fields: Record<string, string> = {};
  const set = (key: string, value?: string) => {
    if (value && value.length > 0) fields[key] = value;
  };
  const set12h = (key: string, value?: string) => {
    if (value && value.length > 0) fields[key] = to12Hour(value);
  };
  set(KIT_FIELD_KEYS.planType, p.planType);
  set(KIT_FIELD_KEYS.returnTarget, p.returnTarget);
  set12h(KIT_FIELD_KEYS.returnTargetDisplay, p.returnTarget);
  set(KIT_FIELD_KEYS.allAboardTime, p.allAboardTime);
  set12h(KIT_FIELD_KEYS.allAboardTimeDisplay, p.allAboardTime);
  set(KIT_FIELD_KEYS.stepOffTime, p.stepOffTime);
  set12h(KIT_FIELD_KEYS.stepOffTimeDisplay, p.stepOffTime);
  set(KIT_FIELD_KEYS.groupType, p.groupType);
  set(KIT_FIELD_KEYS.worry, p.worry);
  set(KIT_FIELD_KEYS.budget, p.budget);
  set(KIT_FIELD_KEYS.planMode, p.planMode);
  set(KIT_FIELD_KEYS.source, p.source);
  return fields;
}

function kitPost(apiKey: string, path: string, body: unknown) {
  return fetch(`${KIT_API_BASE}${path}`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

/**
 * POST a REQUIRED Kit operation. Throws (with a secret-free label) on any non-2xx
 * so the caller's catch turns it into a single honest failure response. Used for
 * every operation the saved-plan promise depends on — subscriber upsert + custom
 * fields, the planner tag, the mode tag, the (consent-gated) tips tag, and the
 * delivery-sequence enrollment.
 */
async function kitRequire(apiKey: string, path: string, body: unknown, op: string) {
  const res = await kitPost(apiKey, path, body);
  if (!res.ok) {
    // Label carries the op + status only — never the key, email, or response body.
    throw new Error(`kit_required_failed:${op}:${res.status}`);
  }
  return res;
}

export async function POST(request: Request) {
  // 1. Parse JSON.
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json", message: "Request body must be JSON." }, 400);
  }

  // 2. Validate email + consent + plan fields.
  const parsed = PayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return json(
      { ok: false, error: "invalid_input", message: "Please enter a valid email address." },
      422,
    );
  }
  const payload = parsed.data;

  // 3. Config check — read the secret key server-side only. Never fake success.
  const apiKey = process.env[KIT_API_KEY_ENV];
  if (!apiKey) {
    return json({ ok: false, error: "kit_not_configured", message: NOT_CONFIGURED_MESSAGE }, 503);
  }

  // 3b. Delivery requires the plan-delivery sequence. Without it we cannot send
  //     the saved-plan email, so fail honestly BEFORE creating a subscriber we
  //     can't serve — never capture a lead the delivery email can't reach.
  const sequenceId = process.env[KIT_NASSAU_PLAN_SEQUENCE_ID_ENV];
  if (!sequenceId) {
    return json({ ok: false, error: "delivery_not_configured", message: NOT_CONFIGURED_MESSAGE }, 503);
  }
  const formId = process.env[KIT_NASSAU_PLAN_FORM_ID_ENV];

  try {
    // 4. REQUIRED — create/update the subscriber and write the delivery custom
    //    fields. Everything the saved-plan email and segmentation rely on starts
    //    here, so a failure must return ok:false (handled by the catch below).
    await kitRequire(
      apiKey,
      "/subscribers",
      { email_address: payload.email, fields: buildFields(payload) },
      "subscriber_upsert",
    );

    // 5. OPTIONAL — attach to a "Nassau Plan Save" form if one is configured.
    //    Best-effort: a form hiccup must NOT fail the save. Logged server-side
    //    only (op + status, never the key/email) so it stays visible to ops.
    if (formId) {
      try {
        const formRes = await kitPost(apiKey, `/forms/${encodeURIComponent(formId)}/subscribers`, {
          email_address: payload.email,
        });
        if (!formRes.ok) {
          console.error(`[kit/nassau-plan] optional form attach failed (HTTP ${formRes.status})`);
        }
      } catch {
        console.error("[kit/nassau-plan] optional form attach threw");
      }
    }

    // 6. REQUIRED — segmentation tags, each awaited and checked. A tag failure
    //    must NOT return ok:true: the delivery/marketing automations key off these
    //    tags, so a "saved" subscriber without them is a silent data gap. Marketing
    //    consent stays separate — the Nassau Tips tag is in this REQUIRED set ONLY
    //    when the optional checkbox was checked, so it is never over-applied.
    const requiredTagIds: number[] = [
      KIT_TAGS.nassauPlanner,
      payload.planMode === "exact-time" ? KIT_TAGS.exactTimeCalculator : KIT_TAGS.starterPlan,
    ];
    if (payload.marketingConsent) requiredTagIds.push(KIT_TAGS.nassauTipsConsent);

    for (const tagId of requiredTagIds) {
      await kitRequire(apiKey, `/tags/${tagId}/subscribers`, { email_address: payload.email }, "tag");
    }

    // 7. REQUIRED — enroll into the plan-delivery sequence. This is what actually
    //    emails the saved plan, so a failure here must not claim success.
    await kitRequire(
      apiKey,
      `/sequences/${encodeURIComponent(sequenceId)}/subscribers`,
      { email_address: payload.email },
      "sequence_enroll",
    );

    // Every required CRM operation succeeded — only now do we report success.
    return json({ ok: true }, 200);
  } catch (err) {
    // Secret-free server log for ops; the client only ever sees the friendly copy.
    console.error(
      "[kit/nassau-plan] required Kit operation failed:",
      err instanceof Error ? err.message : "unknown_error",
    );
    return json({ ok: false, error: "kit_error", message: SAVE_FAILED_MESSAGE }, 502);
  }
}
