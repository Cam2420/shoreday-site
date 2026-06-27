import { assertNoPii, FUNNEL_EVENTS, pickAllowedProperties } from "@/lib/funnel-events";

// Internal, same-origin analytics sink. It VALIDATES and acknowledges events but
// does NOT durably store them — durable reporting requires an approved
// provider/settings step later. No PII is stored or logged here.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENT_NAMES = new Set<string>(FUNNEL_EVENTS);
const isDev = process.env.NODE_ENV !== "production";

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
  const { name, properties } = raw as { name?: unknown; properties?: unknown };

  // 1. Event name must be one of the canonical web events.
  if (typeof name !== "string" || !EVENT_NAMES.has(name)) return noContent();

  // 2. Properties (if present) must be a plain object. Drop unknown keys FIRST so
  //    a stray/unexpected key never reaches a future durable store, then run the
  //    PII guard on what remains.
  const rawProps =
    properties && typeof properties === "object" && !Array.isArray(properties)
      ? (properties as Record<string, unknown>)
      : {};
  const safeProps = pickAllowedProperties(rawProps);
  try {
    assertNoPii(safeProps);
  } catch {
    // An allow-listed key still looked like PII — drop the event, never persist.
    return noContent();
  }

  // 3. Accept. We do NOT durably store, and we never log full payloads. In dev
  //    only, log the event NAME (not values) to confirm the layer is wired.
  //    `safeProps` is the sanitized payload a future durable sink would persist.
  if (isDev) {
    console.log(`[funnel-events] ${name}`);
  }

  return noContent();
}
