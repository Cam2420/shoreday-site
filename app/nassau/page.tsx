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

      <section className="nl-hero" aria-labelledby="nl-hero-title">
        <div className="nl-hero-grid">
          <div className="nl-hero-copy">
            <p className="nl-eyebrow">Nassau cruise port planner</p>
            <h1 id="nl-hero-title">Your Nassau day, timed around your ship.</h1>
            <p className="nl-sub">
              Start with what you know now. ShoreDay can calculate your exact
              return target when your official ship times are handy, or help you
              shape a starter plan first.
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
            <h2>Start your Nassau port window</h2>
            <p className="nl-funnel-copy">
              Choose the time-first calculator if your cruise details are ready,
              or use the fast planner for a starter plan.
            </p>

            <div className="nl-funnel-image">
              <Image
                src="/nassau-people-web.jpg"
                alt="Cruise passengers walking near ships at the Nassau cruise port"
                fill
                sizes="(max-width: 800px) 100vw, 430px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <Link href="/nassau/plan" className="nl-cta nl-cta-primary nl-cta-block">
              Calculate My Port Window
            </Link>
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
        <h2 id="nl-preview-title">A simple port-day plan built around your real time ashore.</h2>
        <div className="nl-preview-steps">
          <article className="nl-preview-step">
            <span className="nl-preview-num">1</span>
            <h3>Choose your starting point</h3>
            <p>Pick time-first if you know your schedule, or take the fast planner.</p>
          </article>
          <article className="nl-preview-step">
            <span className="nl-preview-num">2</span>
            <h3>Find your usable window</h3>
            <p>Use your Nassau date, step-off time, and all-aboard time.</p>
          </article>
          <article className="nl-preview-step">
            <span className="nl-preview-num">3</span>
            <h3>Protect your return</h3>
            <p>See the return-to-pier target before you choose an activity.</p>
          </article>
          <article className="nl-preview-step">
            <span className="nl-preview-num">4</span>
            <h3>Unlock your next steps</h3>
            <p>View the full result, location ideas, ShoreDay Excursions, and app CTA.</p>
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
