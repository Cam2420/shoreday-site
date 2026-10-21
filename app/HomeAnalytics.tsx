"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { landingContextProps } from "@/lib/attribution";
import {
  FUNNEL_EVENTS,
  type FunnelEventName,
  type FunnelEventProperties,
} from "@/lib/funnel-events";

const EVENT_NAMES = new Set<string>(FUNNEL_EVENTS);

/**
 * Marketing-page analytics. Keeps `app/page.tsx` a static server component: it only
 * fires `landing_view` on mount and listens (via event delegation) for clicks on
 * elements tagged with `data-analytics-event`. Visible copy and routing are
 * untouched — instrumentation rides on data attributes only.
 *
 * landing_view keeps its original three properties and adds page_path,
 * referrer_host and utm_* (same keys as the planner's landing_view), so
 * page arrivals are attributable. WhatsApp clicks also include page and position.
 */
export default function HomeAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    track("landing_view", {
      port: "nassau",
      source: pathname === "/" ? "home" : "guide",
      surface: pathname === "/" ? "home_page" : "guide_page",
      ...landingContextProps(),
    });

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-analytics-event]");
      if (!el) return;

      const name = el.dataset.analyticsEvent;
      if (!name || !EVENT_NAMES.has(name)) return;

      const props: FunnelEventProperties = { port: "nassau" };
      if (el.dataset.analyticsSurface)
        props.surface = el.dataset.analyticsSurface;
      const store = el.dataset.analyticsStore;
      if (store === "apple" || store === "google") props.store = store;

      track(name as FunnelEventName, props);
      // Keep the existing event for dashboards; add the requested cross-page event.
      if (name === "whatsapp_click") {
        track("whatsapp_cta_click", {
          ...props,
          page: pathname,
          position: props.surface ?? "unknown",
        });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
