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

      <section className="nl-hero" aria-labelledby="nl-hero-title">
        <div className="nl-hero-grid">
          <div className="nl-hero-copy">
            <p className="nl-eyebrow">Nassau cruise port planner</p>
            <h1 id="nl-hero-title">Your Nassau day, timed around your ship.</h1>
            <p className="nl-sub">
              Turn your step-off time and official all-aboard time into a realistic
              port window, a return-to-pier target, and a simple day shape before you
              head ashore.
            </p>
            <ul className="nl-trust" aria-label="Planning notes">
              <li>Free timing preview</li>
              <li>No app required to view your result</li>
              <li>Your cruise line&rsquo;s all-aboard time stays final</li>
            </ul>
          </div>

          <div className="nl-funnel-card" aria-label="Port-window calculator start">
            <div className="nl-card-topline">
              <span className="nl-step-pill">Start here</span>
              <span>About a minute</span>
            </div>
            <h2>Calculate your real Nassau window</h2>
            <p className="nl-funnel-copy">
              Start with your times, or let ShoreDay guide you through the fast path.
            </p>

            <Link href="/nassau/plan" className="nl-cta nl-cta-primary nl-cta-block">
              Calculate My Port Window
            </Link>

            <div className="nl-paths" aria-label="Choose your planning path">
              <Link href={PLAN_MODE_LINKS.times} className="nl-path-card">
                <span className="nl-path-index">Path 1</span>
                <span className="nl-path-title">I know my times</span>
                <span className="nl-path-copy">
                  Enter your step-off and all-aboard time for the clearest plan.
                </span>
              </Link>
              <Link href={PLAN_MODE_LINKS.fast} className="nl-path-card">
                <span className="nl-path-index">Path 2</span>
                <span className="nl-path-title">Help me plan fast</span>
                <span className="nl-path-copy">
                  Use a guided planner to turn your Nassau stop into one simple day.
                </span>
              </Link>
            </div>

            <div className="nl-sample" aria-label="Example timing result">
              <span className="nl-sample-tag">Example result</span>
              <div className="nl-sample-rows">
                <div className="nl-sample-row">
                  <span>Scheduled stop</span>
                  <span>8:00 AM &ndash; 5:00 PM</span>
                </div>
                <div className="nl-sample-row">
                  <span>Usable window</span>
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
          </div>
        </div>

        <div className="nl-hero-photo">
          <Image
            src="/nassau-aerial-web.jpg"
            alt="Nassau harbour and the turquoise Bahamian coastline in warm morning light"
            fill
            sizes="(max-width: 800px) 100vw, 1060px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      <section className="nl-proof" aria-labelledby="nl-proof-title">
        <div className="nl-proof-media">
          <Image
            src="/nassau-people-web.jpg"
            alt="Cruise passengers walking near ships at the Nassau cruise port"
            fill
            sizes="(max-width: 800px) 100vw, 430px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="nl-proof-copy">
          <p className="nl-section-kicker">Why the timing math matters</p>
          <h2 id="nl-proof-title">Your scheduled port call is not your real beach time.</h2>
          <div className="nl-proof-grid">
            <div className="nl-proof-card">
              <span className="nl-chip">After you dock</span>
              <p>
                It takes time before guests can step ashore, so your day starts later
                than the printed arrival time.
              </p>
            </div>
            <div className="nl-proof-card">
              <span className="nl-chip">All-aboard first</span>
              <p>
                Your ship&rsquo;s all-aboard time is earlier than departure, and it is
                the final authority.
              </p>
            </div>
            <div className="nl-proof-card">
              <span className="nl-chip">Return margin</span>
              <p>
                The trip back to Prince George Wharf and a sensible buffer come off
                the top of your day.
              </p>
            </div>
          </div>
          <p className="nl-explainer-note">
            ShoreDay&rsquo;s estimate is a planning aid, not your cruise line&rsquo;s
            official schedule. Confirm your ship&rsquo;s all-aboard time and account for
            current conditions.
          </p>
        </div>
      </section>

      <section className="nl-preview" aria-labelledby="nl-preview-title">
        <p className="nl-section-kicker">What happens next</p>
        <h2 id="nl-preview-title">A quiz funnel built for one decision: how much time you really have.</h2>
        <div className="nl-preview-steps">
          <article className="nl-preview-step">
            <span className="nl-preview-num">1</span>
            <h3>Calculate your port window</h3>
            <p>Enter your date, step-off time, and all-aboard time.</p>
          </article>
          <article className="nl-preview-step">
            <span className="nl-preview-num">2</span>
            <h3>See the timing answer</h3>
            <p>Get your usable planning window and return-to-pier target first.</p>
          </article>
          <article className="nl-preview-step">
            <span className="nl-preview-num">3</span>
            <h3>Unlock the full plan</h3>
            <p>Email is required to view the full result; optional tips stay separate.</p>
          </article>
          <article className="nl-preview-step">
            <span className="nl-preview-num">4</span>
            <h3>Choose your next step</h3>
            <p>After unlock, check Nassau excursion availability via Viator if you want one anchor activity.</p>
          </article>
        </div>
        <p className="nl-affiliate-disclosure">
          Disclosure: the excursion step links to Viator, and ShoreDay may earn a
          commission if you book through a Viator link. It doesn&rsquo;t change the
          price you pay.
        </p>
      </section>

      <section className="nl-final" aria-labelledby="nl-final-title">
        <p className="nl-section-kicker">Ready when you are</p>
        <h2 id="nl-final-title">Build your Nassau plan before you step off the ship.</h2>
        <p>Start with the times printed in your cruise app or daily planner.</p>
        <Link href="/nassau/plan" className="nl-cta nl-cta-primary">
          Calculate My Port Window
        </Link>
      </section>

      <footer className="nl-footer">
        <p>
          Planning recommendations only. ShoreDay does not adjust for schedule
          changes, traffic, or weather. Your cruise line&rsquo;s official all-aboard
          time is the final authority.
        </p>
        <p className="nl-footer-links">
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
        </p>
      </footer>
    </main>
  );
}
