import type { Metadata } from "next";
import ViatorOutboundLink from "@/components/funnel/ViatorOutboundLink";
import "./survival.css";

export const metadata: Metadata = {
  title: { absolute: "Nassau Survival Card | ShoreDay" },
  description:
    "Plan your Nassau port day around all-aboard timing, local food and a realistic return window. $9.99 once for your whole group.",
  alternates: { canonical: "/nassau-survival-card" },
  robots: { index: false, follow: false },
};

export default function NassauSurvivalCard() {
  return (
    <div className="survival">
      <main className="card">
        <span className="eyebrow">NASSAU SURVIVAL CARD</span>
        <h1>Make Nassau feel simple before you step off the ship</h1>
        <p className="lede">
          A practical one-page guide to timing, taxis, and choosing one good thing
          to do — without turning your port day into a race.
        </p>

        <div className="rule">
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.85,
              fontWeight: 600,
            }}
          >
            Build backward from all-aboard
          </div>
          <b>Set a back-at-pier target before all-aboard.</b>
          <p style={{ margin: "8px 0 0" }}>
            Your ship&apos;s all-aboard time is the passenger deadline — not the
            departure time. Use your ship’s official all-aboard time as the final
            word, then build your day with margin.
          </p>
          <span className="ex">
            Example only: all-aboard 7:00 PM → pier 6:00 PM → leave by 5:30 PM
          </span>
        </div>

        <h2>Use your ship’s own time</h2>
        <p>Confirm your ship’s official all-aboard time. Follow onboard instructions if the schedule changes.</p>
        <h2>Pick one anchor activity</h2>
        <p>Choose beach time, a downtown walk, local food or heritage. Leave room for the trip back.</p>
        <h2>Agree the fare first</h2>
        <p>Confirm the fare with your driver before the ride. Ask about any extra charges and payment methods.</p>
        <h2>Choose offers that fit your day</h2>
        <p>Compare each activity with your group’s budget and leave-by time. Food, rides and tours are paid separately.</p>
        <h2>Save your plan before going offline</h2>
        <p>Download and open your PDF while connected. New WhatsApp questions and replies need internet.</p>

        <h2>Turn this into a port-day plan</h2>
        <p>
          ShoreDay builds your Nassau day around your ship time, group, budget, and
          return buffer — so you can choose one good activity without guessing if
          it fits.
        </p>

        {/* Primary CTA — Viator storefront (affiliate). */}
        <div className="cta">
          <ViatorOutboundLink surface="survival_card" className="shop">
            Browse curated Nassau excursions →
          </ViatorOutboundLink>
        </div>
        <p className="affiliate-disclosure">
          Disclosure: ShoreDay may earn a commission if you book through a Viator link.
        </p>

        {/* Secondary CTA — download the app. */}
        <p style={{ fontWeight: 600, margin: "8px 0 12px" }}>
          Download ShoreDay before your port day
        </p>
        <div className="cta">
          <a
            href="https://apps.apple.com/us/app/shoreday/id6761083487"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.vmamanagement.shoreday"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
            />
          </a>
        </div>

        <p className="disclaimer">
          Times and recommendations are estimates. Your ship’s official all-aboard time is final. © ShoreDay · shoredayapp.com
        </p>
      </main>
    </div>
  );
}
