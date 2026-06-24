"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  loadPlanPayload,
  PLANNING_DISCLAIMER,
  type PlanPrototypePayload,
} from "@/lib/funnel-plan";

// Canonical, public ShoreDay Viator storefront already used across the site.
const VIATOR_STOREFRONT = "https://vi.me/s/shoredayapp";
const APP_STORE_URL = "https://apps.apple.com/app/id6761083487";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.vmamanagement.shoreday";
const APPLE_BADGE = "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";
const PLAY_BADGE = "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";

export default function PrototypeResult({ planId }: { planId: string }) {
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [plan, setPlan] = useState<PlanPrototypePayload | null>(null);

  useEffect(() => {
    // Read browser-only storage after mount; defer the state update off the
    // synchronous effect body to avoid a cascading render.
    const payload = loadPlanPayload(planId);
    queueMicrotask(() => {
      setPlan(payload);
      setStatus(payload ? "ready" : "missing");
    });
  }, [planId]);

  if (status === "loading") {
    return (
      <main className="nassau-result">
        <div className="nr-shell">
          <p className="nr-loading" role="status">
            Loading your plan…
          </p>
        </div>
      </main>
    );
  }

  if (status === "missing" || !plan) {
    return (
      <main className="nassau-result">
        <div className="nr-shell nr-recovery">
          <h1 className="nr-h1">We couldn&rsquo;t find that plan</h1>
          <p>
            Prototype plans are saved only in this browser, so this link may have
            expired or been opened on another device. You can build a fresh plan in
            about a minute.
          </p>
          <Link href="/nassau/plan" className="nr-cta">
            Build a new plan
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="nassau-result">
      <div className="nr-shell">
        <header className="nr-head">
          <h1 className="nr-h1">Your Nassau plan</h1>
          <p className="nr-ship">{plan.shipName ? `${plan.shipName} · ${plan.portDate}` : plan.portDate}</p>
        </header>

        <section className="nr-timing" aria-label="Timing summary">
          {plan.recommendedTerminalReturnLabel ? (
            <div className="nr-hero-metric">
              <span className="nr-hero-k">Back at the pier by</span>
              <span className="nr-hero-v">{plan.recommendedTerminalReturnLabel}</span>
            </div>
          ) : null}
          <dl className="nr-stats">
            <div>
              <dt>Scheduled window</dt>
              <dd>{plan.scheduledWindowLabel}</dd>
            </div>
            <div>
              <dt>Usable planning window</dt>
              <dd>{plan.usableWindowLabel}</dd>
            </div>
          </dl>
          {plan.isShort && plan.shortMessage ? <p className="nr-warn">{plan.shortMessage}</p> : null}
          <p className="nr-disclaimer">{PLANNING_DISCLAIMER}</p>
        </section>

        <section className="nr-dayshape" aria-label="Your day shape">
          <h2 className="nr-h2">Your basic day shape</h2>
          <ol className="nr-blocks">
            {plan.dayShape.map((b, i) => (
              <li key={`${b.type}-${i}`} className="nr-block">
                <span className="nr-block-time">
                  {b.endTime && b.endTime !== b.startTime
                    ? `${b.startTime}–${b.endTime}`
                    : b.startTime}
                </span>
                <span className="nr-block-label">{b.label}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="nr-viator" aria-label="Excursions via Viator">
          <h2 className="nr-h2">Excursions via Viator</h2>
          <p>Browse Nassau excursions if you&rsquo;d like one anchor activity for your day.</p>
          <a
            className="nr-cta"
            href={VIATOR_STOREFRONT}
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Nassau excursion availability
          </a>
          <p className="nr-disclosure">
            Disclosure: ShoreDay may earn a commission if you book through a Viator link.
          </p>
        </section>

        <section className="nr-app" aria-label="ShoreDay app">
          <div className="nr-app-media">
            <Image
              className="nr-app-phone"
              src="/app-front.png"
              alt="The ShoreDay app on a phone screen"
              width={180}
              height={391}
              sizes="180px"
            />
          </div>
          <div className="nr-app-body">
            <h2 className="nr-h2">Want ShoreDay in your pocket on port day?</h2>
            <p>
              Plan your port day, set a departure reminder, and ask the in-app concierge
              for local ideas — right in the ShoreDay app.
            </p>
            <div className="nr-badges">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                <img src={APPLE_BADGE} alt="Download ShoreDay on the App Store" height={44} />
              </a>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                <img src={PLAY_BADGE} alt="Get ShoreDay on Google Play" height={44} />
              </a>
            </div>
          </div>
        </section>

        <footer className="nr-footer">
          <p>
            Planning recommendations only. ShoreDay does not adjust for schedule
            changes, traffic, or weather. Your cruise line&rsquo;s official all-aboard
            time is the final authority.
          </p>
          <Link href="/nassau/plan" className="nr-edit-link">
            Edit my times
          </Link>
        </footer>
      </div>
    </main>
  );
}
