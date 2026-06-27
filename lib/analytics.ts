/**
 * Client-side analytics dispatch for the Nassau funnel.
 *
 * Every event is validated through the canonical contract in
 * `lib/funnel-events.ts` (name allow-list + PII guard) BEFORE it leaves the
 * browser. Dispatch is best-effort and never throws into the UI — analytics
 * must never break the funnel.
 *
 * Transport order:
 *   1. Forward to any vendor hook that is ALREADY present on `window`
 *      (`dataLayer`, `gtag`, `plausible`). We never inject a vendor script.
 *   2. Send a same-origin beacon to the internal sink (`/api/funnel-events`)
 *      using `navigator.sendBeacon`, falling back to `fetch(keepalive)`.
 *
 * IMPORTANT: the internal sink validates and acknowledges events but does NOT
 * durably store them. Durable reporting still requires an approved
 * provider/settings step later (no env vars or vendor scripts are added here).
 */
import {
  createFunnelEvent,
  FUNNEL_EVENTS,
  type FunnelEvent,
  type FunnelEventName,
  type FunnelEventProperties,
} from "./funnel-events";

const INTERNAL_SINK = "/api/funnel-events";

// Privacy-safe, opaque per-browser analytics id. Persisted in localStorage so it
// is stable across sessions, sent to the internal sink as `anonymous_id`, and used
// server-side as the Mixpanel distinct_id. It is random and carries NO PII — never
// an email, name, or any user-entered value.
const ANON_ID_STORAGE_KEY = "shoreday_anon_id";
let cachedAnonymousId: string | undefined;

function getAnonymousId(): string | undefined {
  if (cachedAnonymousId) return cachedAnonymousId;
  try {
    const existing = window.localStorage.getItem(ANON_ID_STORAGE_KEY);
    if (existing) {
      cachedAnonymousId = existing;
      return existing;
    }
    const generated =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `anon-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
    window.localStorage.setItem(ANON_ID_STORAGE_KEY, generated);
    cachedAnonymousId = generated;
    return generated;
  } catch {
    // Storage blocked (e.g. private mode / disabled cookies). Proceed without an
    // id — events still forward, just without a stable distinct_id.
    return undefined;
  }
}

/** Runtime allow-list of canonical web event names (defence in depth vs. types). */
const VALID_EVENT_NAMES: ReadonlySet<string> = new Set(FUNNEL_EVENTS);

/** True only for a canonical web event name. Exported for focused tests. */
export function isTrackableEvent(name: string): name is FunnelEventName {
  return VALID_EVENT_NAMES.has(name);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

/**
 * Construct, validate, and dispatch a canonical funnel event. Safe to call from
 * anywhere on the client; a no-op during SSR. Returns nothing and never throws.
 */
export function track(
  name: FunnelEventName,
  properties: FunnelEventProperties = {},
): void {
  if (typeof window === "undefined") return;

  // Runtime allow-list check BEFORE any vendor forwarding. Defends against a
  // non-canonical name slipping past the type system (e.g. from a data-attribute).
  if (!isTrackableEvent(name)) return;

  let event: FunnelEvent;
  try {
    // Validates the event name and runs the PII guard. A throw here means the
    // event was malformed or carried PII — drop it silently, never transmit.
    event = createFunnelEvent(name, properties);
  } catch {
    return;
  }

  forwardToVendors(event);
  sendToInternalSink(event);
}

/** Forward to vendor hooks only when they already exist. Never injects a script. */
function forwardToVendors(event: FunnelEvent): void {
  try {
    const w = window;
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: event.name, ...event.properties });
    }
    if (typeof w.gtag === "function") {
      w.gtag("event", event.name, event.properties);
    }
    if (typeof w.plausible === "function") {
      w.plausible(event.name, { props: event.properties as Record<string, unknown> });
    }
  } catch {
    // A misbehaving vendor hook must never break the funnel.
  }
}

/** Beacon to the same-origin internal sink, falling back to keepalive fetch. */
function sendToInternalSink(event: FunnelEvent): void {
  // Attach the anonymous id as a top-level wire field (kept separate from the
  // canonical funnel properties). The server maps it to the Mixpanel distinct_id.
  const anonymousId = getAnonymousId();
  const payload = anonymousId ? { ...event, anonymous_id: anonymousId } : event;
  const body = JSON.stringify(payload);
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(INTERNAL_SINK, blob)) return;
    }
    void fetch(INTERNAL_SINK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      cache: "no-store",
    }).catch(() => {
      // Network failure for analytics is non-fatal and intentionally ignored.
    });
  } catch {
    // Never let transport errors surface to the UI.
  }
}
