import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./nassau.css";

// Development route — keep out of search indexes until an SEO decision is approved.
export const metadata: Metadata = {
  title: { absolute: "Plan Your Nassau Cruise Port Day | ShoreDay" },
  description:
    "Turn your scheduled Nassau port call into a realistic plan built around your all-aboard time. Free preview, no app required to view.",
  alternates: { canonical: "/nassau" },
  robots: { index: false, follow: false },
};

export default function NassauLanding() {
  return (
    <main className="nassau-landing">
      <header className="nl-nav">
        <div className="nl-logo">
          Shore<span>Day</span>
        </div>
        <span className="nl-port-chip">Nassau · Bahamas</span>
      </header>

      <section className="nl-hero">
        <p className="nl-eyebrow">Nassau cruise port planner</p>
        <h1>Plan your Nassau day around the time you actually have.</h1>
        <p className="nl-sub">
          Your scheduled port call looks long on paper — but disembarkation, the
          all-aboard cut-off, and the trip back to the pier all take a bite out of
          it. ShoreDay turns the times you enter into a realistic usable window and
          a simple plan to match.
        </p>
        <Link href="/nassau/plan" className="nl-cta nl-cta-primary">
          Calculate My Port Window
        </Link>
        <ul className="nl-trust">
          <li>Free plan preview</li>
          <li>No app required to view your result</li>
          <li>Always follow your cruise line&rsquo;s official instructions</li>
        </ul>

        <div className="nl-hero-photo">
          <Image
            src="/nassau_aerial.jpg"
            alt="Aerial view of Nassau harbour and the turquoise Bahamian coastline"
            fill
            sizes="(max-width: 800px) 100vw, 760px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      <section className="nl-explainer">
        <h2>Your scheduled port call isn&rsquo;t your real beach time</h2>
        <div className="nl-explainer-grid">
          <div className="nl-explainer-card">
            <span className="nl-chip">After you dock</span>
            <p>
              It takes time before guests can step ashore, so your day starts later
              than the printed arrival time.
            </p>
          </div>
          <div className="nl-explainer-card">
            <span className="nl-chip">All-aboard, not departure</span>
            <p>
              You must be back by the all-aboard time, which is earlier than when the
              ship actually leaves.
            </p>
          </div>
          <div className="nl-explainer-card">
            <span className="nl-chip">The trip back</span>
            <p>
              Getting from your last stop to the terminal — plus a sensible buffer —
              comes off the top of your day, too.
            </p>
          </div>
        </div>
        <p className="nl-explainer-note">
          ShoreDay&rsquo;s estimate is a planning aid, not your cruise line&rsquo;s
          official schedule. Confirm your ship&rsquo;s all-aboard time and account
          for current conditions.
        </p>
      </section>

      <section className="nl-preview">
        <h2>What your free plan includes</h2>
        <ul className="nl-preview-list">
          <li>
            <strong>Your realistic usable window</strong> — calculated from the times
            you enter.
          </li>
          <li>
            <strong>A recommended return-to-pier target</strong> — so the trip back is
            built into the day.
          </li>
          <li>
            <strong>One simple day structure</strong> — orientation, one main
            activity, and your return.
          </li>
          <li>
            <strong>A few excursion ideas that fit your window</strong> — matched to
            your interests and time.
          </li>
          <li>
            <strong>A copy you can save</strong> — keep your plan and reopen it later.
          </li>
        </ul>
        <p className="nl-affiliate-disclosure">
          Disclosure: excursion ideas link to Viator, and ShoreDay may earn a
          commission if you book through one of those links. It doesn&rsquo;t change
          the price you pay.
        </p>
      </section>

      <section className="nl-final">
        <h2>Build your Nassau plan in about a minute</h2>
        <p>Enter your port date and times — we&rsquo;ll do the timing math for you.</p>
        <Link href="/nassau/plan" className="nl-cta nl-cta-primary">
          Calculate My Port Window
        </Link>
      </section>

      <footer className="nl-footer">
        <p>
          Planning recommendations only. ShoreDay does not monitor live schedule
          changes, traffic, or weather, and cannot guarantee a return to your ship.
          Your cruise line&rsquo;s official all-aboard time is the final authority.
        </p>
        <p className="nl-footer-links">
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
        </p>
      </footer>
    </main>
  );
}
