import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PLAN_MODE_LINKS } from "@/lib/funnel-plan";
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
        <h1>Your Nassau day, timed around your ship.</h1>
        <p className="nl-sub">
          Your printed port call isn&rsquo;t the time you actually get ashore.
          ShoreDay turns your step-off time and your official all-aboard time into a
          realistic usable window — with a return-to-pier buffer built in — so you
          can step off calm and head back with margin to spare.
        </p>
        <Link href="/nassau/plan" className="nl-cta nl-cta-primary">
          Calculate My Port Window
        </Link>
        <ul className="nl-trust">
          <li>Free plan preview</li>
          <li>No app required to view your result</li>
          <li>Always follow your cruise line&rsquo;s official instructions</li>
        </ul>

        <div className="nl-sample" aria-label="Example timing card">
          <span className="nl-sample-tag">Example</span>
          <div className="nl-sample-rows">
            <div className="nl-sample-row">
              <span>Scheduled stop</span>
              <span>8:00 AM &ndash; 5:00 PM</span>
            </div>
            <div className="nl-sample-row">
              <span>Real usable window</span>
              <span>about 8 hours</span>
            </div>
            <div className="nl-sample-row nl-sample-hero">
              <span>Back at pier by</span>
              <span>4:15 PM</span>
            </div>
          </div>
          <p className="nl-sample-note">
            Illustration only — your plan uses the times you enter.
          </p>
        </div>

        <div className="nl-paths">
          <Link href={PLAN_MODE_LINKS.times} className="nl-path-card">
            <span className="nl-path-title">I know my times</span>
            <span className="nl-path-copy">
              Enter your step-off and all-aboard time for the clearest plan.
            </span>
          </Link>
          <Link href={PLAN_MODE_LINKS.fast} className="nl-path-card">
            <span className="nl-path-title">Help me plan fast</span>
            <span className="nl-path-copy">
              Use a guided planner to turn your Nassau stop into one simple day.
            </span>
          </Link>
        </div>

        <div className="nl-hero-photo">
          <Image
            src="/nassau-aerial-web.jpg"
            alt="Nassau harbour and the turquoise Bahamian coastline in warm morning light"
            fill
            sizes="(max-width: 800px) 100vw, 760px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      <section className="nl-explainer">
        <h2>Your scheduled port call isn&rsquo;t your real beach time</h2>
        <div className="nl-explainer-cols">
          <div className="nl-explainer-main">
            <div className="nl-explainer-grid">
              <div className="nl-explainer-card">
                <span className="nl-chip">After you dock</span>
                <p>
                  It takes time before guests can step ashore, so your day starts
                  later than the printed arrival time.
                </p>
              </div>
              <div className="nl-explainer-card">
                <span className="nl-chip">All-aboard, not departure</span>
                <p>
                  You must be back by the all-aboard time, which is earlier than when
                  the ship actually leaves.
                </p>
              </div>
              <div className="nl-explainer-card">
                <span className="nl-chip">The trip back</span>
                <p>
                  Getting from your last stop to the terminal — plus a sensible buffer
                  — comes off the top of your day, too.
                </p>
              </div>
            </div>
            <p className="nl-explainer-note">
              ShoreDay&rsquo;s estimate is a planning aid, not your cruise line&rsquo;s
              official schedule. Confirm your ship&rsquo;s all-aboard time and account
              for current conditions.
            </p>
          </div>
          <div className="nl-explainer-media">
            <Image
              src="/nassau-people-web.jpg"
              alt="A street near the Nassau cruise port with everyday local movement"
              fill
              sizes="(max-width: 800px) 100vw, 360px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
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
            <strong>A claim-safe excursion availability step via Viator</strong> — a
            safe way to check Nassau options.
          </li>
          <li>
            <strong>A results page you can revisit</strong> — reopen your plan in this
            browser.
          </li>
        </ul>
        <p className="nl-affiliate-disclosure">
          Disclosure: the excursion step links to Viator, and ShoreDay may earn a
          commission if you book through a Viator link. It doesn&rsquo;t change the
          price you pay.
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
          Planning recommendations only. ShoreDay does not adjust for schedule
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
