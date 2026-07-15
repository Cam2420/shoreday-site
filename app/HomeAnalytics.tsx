"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { FUNNEL_EVENTS, type FunnelEventName, type FunnelEventProperties } from "@/lib/funnel-events";

const EVENT_NAMES = new Set<string>(FUNNEL_EVENTS);

/**
 * Homepage analytics. Keeps `app/page.tsx` a static server component: it only
 * fires `landing_view` on mount and listens (via event delegation) for clicks on
 * elements tagged with `data-analytics-event`. Visible copy and routing are
 * untouched — instrumentation rides on data attributes only.
 */
export default function HomeAnalytics() {
  useEffect(() => {
    track("landing_view", { port: "nassau", source: "home", surface: "home_page" });

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-analytics-event]");
      if (!el) return;

      const name = el.dataset.analyticsEvent;
      if (!name || !EVENT_NAMES.has(name)) return;

      const props: FunnelEventProperties = { port: "nassau" };
      if (el.dataset.analyticsSurface) props.surface = el.dataset.analyticsSurface;
      const store = el.dataset.analyticsStore;
      if (store === "apple" || store === "google") props.store = store;

      track(name as FunnelEventName, props);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
