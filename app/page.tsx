import type { Metadata } from "next";
import Link from "next/link";
import HomeAnalytics from "./HomeAnalytics";
import ShoreDayWordmark from "@/components/brand/ShoreDayWordmark";
import "./home.css";

export const metadata: Metadata = {
  title: { absolute: "ShoreDay | Bahamas Cruise Port AI Concierge" },
  description:
    "AI-powered Bahamas cruise port itineraries built around your all-aboard time, with ship countdowns, local tips, and curated excursions for Nassau, Freeport & Bimini.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ShoreDay | Bahamas Cruise Port AI Concierge",
    description:
      "Plan your Bahamas cruise port day around your all-aboard time with AI itineraries, ship countdowns, and curated local excursions.",
    url: "/",
    siteName: "ShoreDay",
    type: "website",
    images: ["/shoreday_icon.png"],
  },
};

export default function Home() {
  return (
    <div className="home" id="top">
      <HomeAnalytics />
      <nav>
        <Link href="/" className="logo">
          <img
            src="/logo_transparent.png"
            alt="ShoreDay Icon"
            style={{ height: 36, width: "auto" }}
          />
          <div>
            <ShoreDayWordmark />
          </div>
        </Link>
      </nav>

      <main className="hero">
        {/* Real Nassau arrival photography — WebP with a mobile variant and a
            JPEG fallback. Eager + high priority because this is the LCP image. */}
        <div className="hero-media" aria-hidden="true">
          <picture>
            <source
              media="(max-width: 760px)"
              srcSet="/images/shoreday/nassau/hero-nassau-aerial-mobile.webp"
              type="image/webp"
            />
            <source
              srcSet="/images/shoreday/nassau/hero-nassau-aerial.webp"
              type="image/webp"
            />
            <img
              src="/images/shoreday/nassau/hero-nassau-aerial.jpg"
              alt=""
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="hero-scrim" />
        </div>

        <div className="hero-inner">
          <div className="hero-text-content">
            <h1>Your Bahamas Port Day, Perfectly Timed.</h1>

            <div className="hero-cta-stack" aria-label="Primary ShoreDay actions">
              <div className="hero-cta-group">
                {/* Intentionally untracked: this is an internal navigation to the
                    planner route, not the start of the planner flow. planner_start
                    is fired inside the planner itself (PlanBuilder) when the user
                    actually begins, so tracking the click here would double-count. */}
                <Link href="/nassau/plan" className="hero-primary-cta">
                  Start My Nassau Plan
                </Link>
                <a
                  href="https://vi.me/s/shoredayapp"
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="hero-excursions-link"
                  data-analytics-event="excursion_click"
                  data-analytics-surface="home_hero"
                >
                  Book Excursions ↗
                </a>
              </div>
              <p className="hero-microcopy">
                Takes about 60 seconds. Exact timing uses your actual all-aboard time.
              </p>
            </div>

            <div className="trust-bar">
              Perfect for passengers on Royal Caribbean, Carnival &amp; NCL.
            </div>
          </div>

          {/* Port-day control tower: a calm, concierge-style summary of how the
              planner works. Uses only existing, safe planner concepts. */}
          <aside className="port-control" aria-label="How ShoreDay plans your port day">
            <p className="port-control-kicker">Port-day control tower</p>
            <h2 className="port-control-title">One clear plan, built around your ship.</h2>
            <ol className="port-control-steps">
              <li>
                <span aria-hidden="true">1</span>
                <div>
                  <strong>Tell us your Nassau day</strong>
                  <p>Your port date and official all-aboard time.</p>
                </div>
              </li>
              <li>
                <span aria-hidden="true">2</span>
                <div>
                  <strong>Get your return-to-pier target</strong>
                  <p>A recommended time back at the pier, with a planning buffer.</p>
                </div>
              </li>
              <li>
                <span aria-hidden="true">3</span>
                <div>
                  <strong>See a calm, walkable plan</strong>
                  <p>One worthwhile day shape, plus curated excursions that fit.</p>
                </div>
              </li>
            </ol>
            <p className="port-control-note">
              Your ship&rsquo;s official all-aboard time is always the final word.
            </p>
          </aside>
        </div>
      </main>

      {/* Experience Nassau — real island photography so the page feels like a
          Bahamas vacation planner. Captions are day-type inspiration, never a
          claim about a specific bookable tour. */}
      <section className="experience" aria-labelledby="experience-title">
        <div className="experience-head">
          <p className="section-kicker">A real Nassau day</p>
          <h2 id="experience-title">Plan the day that fits your ship — not the brochure.</h2>
          <p className="section-lead">
            Calm beaches, walkable streets, local food, and easy water time —
            shaped around your return-to-pier target.
          </p>
        </div>

        <div className="experience-grid">
          <figure className="exp-card exp-card-wide">
            <img
              src="/images/shoreday/nassau/nassau-beach.webp"
              alt="Turquoise water and white sand at a public beach in Nassau, Bahamas"
              loading="lazy"
              decoding="async"
            />
            <span className="exp-tag">Beach &amp; water</span>
            <figcaption>
              <span className="exp-copy">
                Easy beach time close to port — with room to get back calmly.
              </span>
            </figcaption>
          </figure>

          <figure className="exp-card">
            <img
              src="/images/shoreday/nassau/nassau-street.webp"
              alt="Cruise visitors walking a sunny, colorful street near the Nassau cruise port"
              loading="lazy"
              decoding="async"
            />
            <span className="exp-tag">Walkable</span>
            <figcaption>
              <span className="exp-copy">
                Know where to walk, what to skip, and when to head back.
              </span>
            </figcaption>
          </figure>

          <figure className="exp-card">
            <img
              src="/images/shoreday/nassau/bahamas-food.webp"
              alt="Bahamian cracked conch and fresh conch salad served beachside"
              loading="lazy"
              decoding="async"
            />
            <span className="exp-tag">Local food</span>
            <figcaption>
              <span className="exp-copy">
                Real Bahamian food ideas — not another tourist-trap guess.
              </span>
            </figcaption>
          </figure>

          <figure className="exp-card">
            <img
              src="/images/shoreday/nassau/nassau-heritage.webp"
              alt="The Pirates of Nassau heritage museum in historic downtown Nassau"
              loading="lazy"
              decoding="async"
            />
            <span className="exp-tag">Heritage</span>
            <figcaption>
              <span className="exp-copy">
                Landmarks and shops on a simple route that fits your window.
              </span>
            </figcaption>
          </figure>

          <figure className="exp-card">
            <img
              src="/images/shoreday/nassau/nassau-watersports.webp"
              alt="Visitors riding jet skis on calm turquoise water in Nassau"
              loading="lazy"
              decoding="async"
            />
            <span className="exp-tag">Adventure</span>
            <figcaption>
              <span className="exp-copy">
                Water time and excursions filtered around your ship day.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* App companion — positioned after the web plan has shown value. Uses real
          app screenshots and only existing, safe feature claims. */}
      <section className="app-cta" id="app" aria-labelledby="app-title">
        <div className="app-cta-copy">
          <p className="section-kicker">Your port-day companion</p>
          <h2 id="app-title">Take the plan with you on port day.</h2>
          <p>
            The ShoreDay app keeps your saved plan, departure reminders, a
            port-day map, and an in-app concierge ready while you&rsquo;re
            actually in Nassau.
          </p>
          <ul className="app-feature-list">
            <li>Your saved Nassau plan</li>
            <li>Departure reminders &amp; ship alerts</li>
            <li>Port-day map</li>
            <li>In-app AI concierge</li>
          </ul>
          <div className="app-actions">
            <p className="app-actions-label">Download free</p>
            <div className="app-buttons">
              <a
                href="https://apps.apple.com/app/id6761083487"
                target="_blank"
                rel="noopener noreferrer"
                className="store-badge"
                data-analytics-event="app_store_click"
                data-analytics-store="apple"
                data-analytics-surface="home_app_badges"
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
                className="store-badge"
                data-analytics-event="app_store_click"
                data-analytics-store="google"
                data-analytics-surface="home_app_badges"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="app-cta-shots" aria-hidden="true">
          <img
            className="app-shot app-shot-front"
            src="/images/shoreday/app/itinerary.webp"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="app-shot app-shot-back"
            src="/images/shoreday/app/ship-alert.webp"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="features" aria-label="What ShoreDay does">
        <div className="feature-card">
          <div className="feature-icon">⏱️</div>
          <h3>Built Around Your All-Aboard Time</h3>
          <p>
            Our AI builds your entire port day around your exact &ldquo;All-Aboard&rdquo;
            time, including built-in buffer zones.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌴</div>
          <h3>Curated Excursions</h3>
          <p>
            Skip the tourist traps. Instantly discover and book
            traveler-friendly local experiences and walkable hidden gems.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>AI Concierge</h3>
          <p>
            Need a quick recommendation or looking for a hidden beach? Ask your
            pocket AI concierge for local recommendations.
          </p>
        </div>
      </section>

      <section className="excursions-cta">
        <div className="credibility-stack">
          <div className="viator-text">
            Excursions via <span>Viator</span>, a Tripadvisor company
          </div>
        </div>

        <h2>Browse ShoreDay Curated Excursions</h2>
        <p>
          Skip the tourist traps. Browse our curated selection of popular-style
          Bahamas tours perfectly timed to your ship&rsquo;s schedule.{" "}
          <strong>Shop instantly via the link below</strong>, or download the
          ShoreDay app to book these same amazing experiences alongside our
          powerful AI concierge and ship countdowns for the ultimate port day.
        </p>

        <div className="cta-button-group">
          <a
            href="https://vi.me/s/shoredayapp"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="primary-btn"
            data-analytics-event="excursion_click"
            data-analytics-surface="home_excursions_cta"
          >
            Shop Excursions Online
          </a>
        </div>
        <p className="affiliate-disclosure">
          Disclosure: ShoreDay may earn a commission if you book through a Viator link.
        </p>
      </section>

      <footer>
        <div style={{ marginBottom: "1rem" }}>
          <Link href="/privacy">Privacy Policy</Link> |{" "}
          <Link href="/terms">Terms of Service</Link>
        </div>
        <p>&copy; 2026 VMAManagement LLC - ShoreDay. All rights reserved.</p>
      </footer>
    </div>
  );
}
