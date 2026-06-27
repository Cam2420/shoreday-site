import { assertNoPii, FUNNEL_EVENTS, pickAllowedProperties } from "@/lib/funnel-events";
import { buildMixpanelEvent, forwardToMixpanel, sanitizeAnonymousId } from "@/lib/mixpanel";

// Internal, same-origin analytics sink. It validates + sanitizes events and, when
// Mixpanel is configured (MIXPANEL_PROJECT_TOKEN), forwards the sanitized event to
// Mixpanel server-side. The project token is read from the environment and never
// leaves the server. No PII and no raw request body are forwarded or logged.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENT_NAMES = new Set<string>(FUNNEL_EVENTS);
const isDev = process.env.NODE_ENV !== "production";
// Cap the Mixpanel forward so a slow upstream can never hang the route.
const MIXPANEL_FORWARD_TIMEOUT_MS = 2500;

// 204 No Content. Analytics responses carry no body and are never cached. We
// return a safe success even for rejected events so a malformed beacon can never
// surface an error to the funnel UI or leak validation detail.
function noContent() {
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return noContent();
  }

  if (typeof raw !== "object" || raw === null) return noContent();
  const { name, properties, anonymous_id } = raw as {
    name?: unknown;
    properties?: unknown;
    anonymous_id?: unknown;
  };

  // 1. Event name must be one of the canonical web events.
  if (typeof name !== "string" || !EVENT_NAMES.has(name)) return noContent();

  // 2. Properties (if present) must be a plain object. Drop unknown keys FIRST so
  //    a stray/unexpected key never reaches the provider, then run the PII guard
  //    on what remains.
  const rawProps =
    properties && typeof properties === "object" && !Array.isArray(properties)
      ? (properties as Record<string, unknown>)
      : {};
  const safeProps = pickAllowedProperties(rawProps);
  try {
    assertNoPii(safeProps);
  } catch {
    // An allow-listed key still looked like PII — drop the event, never forward.
    return noContent();
  }

  // 3. Forward to Mixpanel ONLY when configured. If the token is missing we keep
  //    the prior behavior: validate/sanitize and return safe success, no forward.
  const token = process.env.MIXPANEL_PROJECT_TOKEN;
  if (token) {
    // Map the privacy-safe anonymous id (if any, and only if well-formed) to the
    // Mixpanel distinct_id. Never an email/name/raw value.
    const distinctId = sanitizeAnonymousId(anonymous_id);
    const event = buildMixpanelEvent({
      name,
      token,
      distinctId,
      props: safeProps,
      insertId: crypto.randomUUID(),
      timeMs: Date.now(),
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), MIXPANEL_FORWARD_TIMEOUT_MS);
    try {
      // forwardToMixpanel never throws; a failed forward must not affect the user.
      await forwardToMixpanel([event], {
        host: process.env.MIXPANEL_API_HOST,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  }

  // We never log full payloads. In dev only, log the event NAME (not values, not
  // the token) to confirm the layer is wired.
  if (isDev) {
    console.log(`[funnel-events] ${name}`);
  }

  return noContent();
}
