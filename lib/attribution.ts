/**
 * Landing-page attribution context for analytics events.
 *
 * Same keys and semantics as the planner's own landing_view (see PlanBuilder):
 * utm_* copied from the URL (present, trimmed values only), the pathname only,
 * and the referrer's hostname only. Never a full URL, query string or user data.
 * Every key here is already on the FUNNEL_EVENT_PROPERTY_KEYS allow-list.
 */
import type { FunnelEventProperties } from "./funnel-events";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** utm_* properties from a query string, keeping only non-empty, trimmed values. */
export function utmPropsFromSearch(search: string): FunnelEventProperties {
  const q = new URLSearchParams(search);
  const props: FunnelEventProperties = {};
  for (const key of UTM_KEYS) {
    const value = q.get(key)?.trim();
    if (value) props[key] = value;
  }
  return props;
}

/** Hostname-only referrer (e.g. "l.instagram.com"), or undefined if none or unparseable. */
export function referrerHostFrom(referrer: string): string | undefined {
  if (!referrer) return undefined;
  try {
    return new URL(referrer).hostname || undefined;
  } catch {
    return undefined;
  }
}

/**
 * page_path, referrer_host (when there is one) and utm_* (when present) for the
 * current page. Browser-only; returns {} during SSR.
 */
export function landingContextProps(): FunnelEventProperties {
  if (typeof window === "undefined") return {};
  const host = referrerHostFrom(document.referrer);
  return {
    page_path: window.location.pathname,
    ...(host ? { referrer_host: host } : {}),
    ...utmPropsFromSearch(window.location.search),
  };
}
