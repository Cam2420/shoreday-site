"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import WhatsAppCta from "./WhatsAppCta";

/**
 * Mobile-only sticky "Start in WhatsApp" bar (hidden above 720px in CSS).
 *
 * Shows only once the hero button has scrolled above the viewport AND no other
 * WhatsApp button (`data-wa-cta`) is on screen, so it never appears on first
 * load and never doubles up with a visible button. While hidden it uses
 * visibility:hidden, which also takes its link out of the tab order.
 *
 * Tracked with the page's home_sticky or guide_sticky position.
 */
export default function StickyWhatsAppCta() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const pageKind = pathname === "/" ? "home" : "guide";

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(
      `[data-analytics-surface="${pageKind}_hero"][data-wa-cta]`,
    );
    const buttons = document.querySelectorAll<HTMLElement>("[data-wa-cta]");
    if (!hero || typeof IntersectionObserver === "undefined") return;

    const onScreen = new Set<Element>();
    let heroPassed = false;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
        if (entry.target === hero) {
          heroPassed =
            !entry.isIntersecting && entry.boundingClientRect.top < 0;
        }
      }
      setVisible(heroPassed && onScreen.size === 0);
    });

    buttons.forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, [pathname, pageKind]);

  return (
    <div
      className="wa-sticky"
      data-visible={visible ? "true" : "false"}
      aria-hidden={!visible}
    >
      <WhatsAppCta
        surface={`${pageKind}_sticky`}
        className="wa-sticky-btn"
        watched={false}
      />
      <span className="wa-sticky-price">$9.99 per group</span>
    </div>
  );
}
