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
  const body = JSON.stringify(event);
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
