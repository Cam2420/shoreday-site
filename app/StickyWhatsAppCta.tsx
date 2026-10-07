"use client";

import { useEffect, useState } from "react";
import WhatsAppCta from "./WhatsAppCta";

/**
 * Mobile-only sticky "Start in WhatsApp" bar (hidden above 720px in CSS).
 *
 * Shows only once the hero button has scrolled above the viewport AND no other
 * WhatsApp button (`data-wa-cta`) is on screen, so it never appears on first
 * load and never doubles up with a visible button. While hidden it uses
 * visibility:hidden, which also takes its link out of the tab order.
 *
 * Tracked by HomeAnalytics as whatsapp_click, surface home_sticky.
 */
export default function StickyWhatsAppCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero-primary-cta[data-wa-cta]");
    const buttons = document.querySelectorAll<HTMLElement>("[data-wa-cta]");
    if (!hero || typeof IntersectionObserver === "undefined") return;

    const onScreen = new Set<Element>();
    let heroPassed = false;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
        if (entry.target === hero) {
          heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        }
      }
      setVisible(heroPassed && onScreen.size === 0);
    });

    buttons.forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="wa-sticky" data-visible={visible ? "true" : "false"} aria-hidden={!visible}>
      <WhatsAppCta surface="home_sticky" className="wa-sticky-btn" watched={false} />
      <span className="wa-sticky-price">$15 per group</span>
    </div>
  );
}
