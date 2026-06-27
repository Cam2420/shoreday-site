/**
 * Server-side Mixpanel forwarding for the Nassau funnel.
 *
 * This module builds and POSTs canonical funnel events to the Mixpanel Track HTTP
 * API directly with `fetch` — no SDK, no client library, no autocapture. It is
 * called only from the internal `/api/funnel-events` route (server-side), where
 * the project token is read from the environment and never reaches the client.
 *
 * Privacy: only allow-listed, non-PII ShoreDay properties are forwarded (re-filtered
 * here as defence in depth). The anonymous distinct id is format-validated so no
 * free-text / PII-shaped value can ride through it. We send `ip=0` so Mixpanel does
 * not derive geo from the (server) request IP.
 */
import { pickAllowedProperties } from "./funnel-events";

/** Default Mixpanel ingestion host; override with the MIXPANEL_API_HOST env var. */
export const DEFAULT_MIXPANEL_HOST = "https://api.mixpanel.com";

// Anonymous ids are random, opaque tokens (UUIDs or `anon-…`). Constraining the
// shape rejects anything that could smuggle PII (emails, names, free text).
const ANON_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

/**
 * Return the value only if it is a safe, opaque anonymous id; otherwise undefined.
 * Never trusts arbitrary client strings as a Mixpanel distinct_id.
 */
export function sanitizeAnonymousId(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return ANON_ID_RE.test(value) ? value : undefined;
}

export interface MixpanelEvent {
  event: string;
  properties: Record<string, unknown>;
}

/**
 * Build a Mixpanel Track payload from a canonical event. `props` is re-filtered
 * through the property allow-list, so only known, non-PII ShoreDay dimensions can
 * be forwarded. The Mixpanel protocol fields (`token`, `time`, `$insert_id`,
 * `distinct_id`) are added after filtering and are not user data.
 */
export function buildMixpanelEvent(params: {
  name: string;
  token: string;
  distinctId?: string;
  props: Record<string, unknown>;
  insertId: string;
  timeMs: number;
}): MixpanelEvent {
  const { name, token, distinctId, props, insertId, timeMs } = params;
  const safe = pickAllowedProperties(props);
  const properties: Record<string, unknown> = {
    token,
    time: timeMs,
    $insert_id: insertId,
    ...safe,
  };
  if (distinctId) properties.distinct_id = distinctId;
  return { event: name, properties };
}

/**
 * POST events to the Mixpanel Track API. Returns true on a 2xx response, false on
 * any failure (network error, abort, non-2xx). Never throws — analytics transport
 * must not affect request handling.
 */
export async function forwardToMixpanel(
  events: MixpanelEvent[],
  options: { host?: string; signal?: AbortSignal } = {},
): Promise<boolean> {
  const host = (options.host && options.host.trim()) || DEFAULT_MIXPANEL_HOST;
  // ip=0: do not let Mixpanel infer geolocation from the request IP.
  const url = `${host.replace(/\/+$/, "")}/track?ip=0`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/plain" },
      body: JSON.stringify(events),
      cache: "no-store",
      signal: options.signal,
    });
    return res.ok;
  } catch {
    return false;
  }
}
