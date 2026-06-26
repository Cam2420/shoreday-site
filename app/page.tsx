import type { Metadata } from "next";
import Link from "next/link";
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
      <nav>
        <Link href="/" className="logo">
          <img
            src="/logo_transparent.png"
            alt="ShoreDay Icon"
            style={{ height: 36, width: "auto" }}
          />
          <div>
            Shore<span>Day</span>
          </div>
        </Link>
      </nav>

      <main className="hero">
        <div className="hero-text-content">
          <div className="badge">Now Live On iOS &amp; Android</div>
          <h1>Your Bahamas Port Day, Perfectly Timed.</h1>
          <p className="subtitle">
            AI-powered itineraries, ship countdowns, and local secrets to make
            the most of your cruise stop, currently in Nassau, Freeport &amp;
            Bimini. Built around your exact all-aboard time.
          </p>

          <div className="hero-cta-stack" aria-label="Primary ShoreDay actions">
            <div className="hero-cta-group">
              <Link href="/nassau/plan" className="hero-primary-cta">
                Start My Nassau Plan
              </Link>
              <a
                href="https://vi.me/s/shoredayapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-secondary-cta"
              >
                Book Excursions ↗
              </a>
            </div>
            <p className="hero-microcopy">
              Takes about 60 seconds. Exact timing uses your actual all-aboard time.
            </p>
          </div>

          <div className="app-actions">
            <p className="app-actions-label">Port-day app companion</p>
            <div className="app-buttons">
              <a
                href="https://apps.apple.com/app/id6761083487"
                target="_blank"
                rel="noopener noreferrer"
                className="store-badge"
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
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                />
              </a>
            </div>
            <div className="trust-bar">
              Perfect for passengers on Royal Caribbean, Carnival &amp; NCL.
            </div>
          </div>
        </div>

        <div className="hero-mockups">
          <img src="/phone-left.png" alt="ShoreDay Itinerary" className="mockup-left" />
          <img src="/phone-right.png" alt="ShoreDay Notification" className="mockup-right" />
        </div>
      </main>

      <section className="features">
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
            Skip the tourist traps. Instantly discover and book the best-rated
            local experiences and walkable hidden gems.
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

        <h2>Book ShoreDay Curated Excursions</h2>
        <p>
          Skip the tourist traps. Browse our exclusive selection of top-rated
          Bahamas tours perfectly timed to your ship&rsquo;s schedule.{" "}
          <strong>Shop instantly via the link below</strong>, or download the
          ShoreDay app to book these same amazing experiences alongside our
          powerful AI concierge and ship countdowns for the ultimate port day.
        </p>

        <div className="cta-button-group">
          <a
            href="https://vi.me/s/shoredayapp"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn"
          >
            Shop Excursions Online
          </a>
          <a href="#top" className="secondary-btn">
            Get the ShoreDay App
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
