"use client";

import { track } from "@/lib/analytics";
import type { FunnelEventProperties } from "@/lib/funnel-events";

/**
 * Thin client wrapper for the Viator storefront shortlink.
 * Fires the canonical excursion_click event and sets the correct rel value
 * (sponsored + noopener + noreferrer) without altering the href.
 */
export default function ViatorOutboundLink({
  surface,
  mode,
  children,
  className,
}: {
  surface: string;
  /**
   * Planner path. OPTIONAL: when omitted the payload is exactly
   * `{ port, surface }`, so the static Nassau pages keep their existing event
   * shape byte-for-byte. The planner passes its mode so planner clicks stay
   * segmentable by path.
   */
  mode?: FunnelEventProperties["mode"];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="https://vi.me/s/shoredayapp"
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={className}
      onClick={() =>
        // Branch rather than assigning `mode: undefined`: forwardToVendors pushes
        // this object straight into dataLayer/gtag/plausible, where an explicit
        // undefined key is observable via Object.keys(). Key order also matches
        // the planner's previous inline calls, so the JSON stays byte-identical.
        track(
          "excursion_click",
          mode === undefined
            ? { port: "nassau", surface }
            : { port: "nassau", mode, surface },
        )
      }
    >
      {children}
    </a>
  );
}
