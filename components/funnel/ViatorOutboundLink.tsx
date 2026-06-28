"use client";

import { track } from "@/lib/analytics";

/**
 * Thin client wrapper for the Viator storefront shortlink.
 * Fires the canonical excursion_click event and sets the correct rel value
 * (sponsored + noopener + noreferrer) without altering the href.
 */
export default function ViatorOutboundLink({
  surface,
  children,
  className,
}: {
  surface: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="https://vi.me/s/shoredayapp"
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={className}
      onClick={() => track("excursion_click", { port: "nassau", surface })}
    >
      {children}
    </a>
  );
}
