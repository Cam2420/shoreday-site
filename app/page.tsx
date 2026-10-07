import type { Metadata } from "next";
import Link from "next/link";
import HomeAnalytics from "./HomeAnalytics";
import ShoreDayWordmark from "@/components/brand/ShoreDayWordmark";
import { WHATSAPP_CHAT_URL } from "@/lib/whatsapp";
import WhatsAppConcierge, { WhatsAppIcon } from "./WhatsAppConcierge";
import "./home.css";

export const metadata: Metadata = {
  title: { absolute: "ShoreDay Nassau Concierge | Your Nassau Port Day on WhatsApp" },
  description:
    "Plan your Nassau cruise port day in one WhatsApp chat: a personal plan built around your ship's all-aboard time, plus a 17-page PDF. $15 one time for your whole group.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ShoreDay Nassau Concierge | Your Nassau Port Day on WhatsApp",
    description:
      "A personal Nassau port-day plan in one WhatsApp chat, built around your ship's all-aboard time. $15 one time for your whole group. Free to message first.",
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
            <h1>
              Your Nassau port day, planned around your ship&rsquo;s{" "}
              <span className="nowrap">all-aboard time.</span>
            </h1>
            <p className="subtitle">
              Send your ship and all-aboard time. You get a personal Nassau plan,
              the 17-page PDF kit, and answers in the same chat through your port
              day.
            </p>

            {/* The ONE primary action: the $15 ShoreDay Nassau Concierge, straight
                into the live WhatsApp entry link (same URL and prefill as the
                section below). Tracked as whatsapp_click, surface home_hero. */}
            <div className="hero-cta-stack" aria-label="Start ShoreDay Nassau Concierge">
              <div className="hero-cta-group">
                <a
                  href={WHATSAPP_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-primary-cta"
                  data-analytics-event="whatsapp_click"
                  data-analytics-surface="home_hero"
                >
                  <WhatsAppIcon />
                  Start in WhatsApp
                </a>
              </div>
              <p className="hero-price">
                <strong>$15 one time for your whole group.</strong> Free to message
                first.
              </p>
              <p className="hero-microcopy">
                Nassau only. Your ship&rsquo;s official all-aboard time is final.
              </p>
            </div>

            <div className="trust-bar">
              Perfect for passengers on Royal Caribbean, Carnival &amp; NCL.
            </div>
          </div>

          {/* Port-day control tower: how the live WhatsApp concierge works, in the
              order it happens (welcome card buttons → checkout → PDF + plan). */}
          <aside className="port-control" aria-label="How ShoreDay Nassau Concierge works">
            <p className="port-control-kicker">How it works</p>
            <h2 className="port-control-title">One chat, from hello to head-back time.</h2>
            <ol className="port-control-steps">
              <li>
                <span aria-hidden="true">1</span>
                <div>
                  <strong>Message ShoreDay on WhatsApp</strong>
                  <p>Free to message. Tap &ldquo;See a sample&rdquo; or &ldquo;How it works&rdquo; first.</p>
                </div>
              </li>
              <li>
                <span aria-hidden="true">2</span>
                <div>
                  <strong>Tap &ldquo;Get my plan&rdquo;</strong>
                  <p>$15 one time for your whole group, paid at checkout.</p>
                </div>
              </li>
              <li>
                <span aria-hidden="true">3</span>
                <div>
                  <strong>Get your plan in the same chat</strong>
                  <p>
                    A 17-page PDF arrives first. Send your ship, Nassau date,
                    all-aboard time, and group, and your personal plan follows.
                  </p>
                </div>
              </li>
            </ol>
            <p className="port-control-note">
              Your ship&rsquo;s official all-aboard time is always the final word.
            </p>
          </aside>
        </div>
      </main>

      {/* Paid offer: the $15 ShoreDay Nassau Concierge on WhatsApp. Placed right
          after the hero so the price, what's included and the terms are one
          scroll from the hero CTA. */}
      <WhatsAppConcierge />

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

      {/* Self-serve alternatives to the concierge, shown after the WhatsApp
          section: the app, then the free web planner as a quiet text link. Uses
          real app screenshots and only existing, safe app feature claims (these
          are app features, not concierge features). */}
      <section className="app-cta" id="app" aria-labelledby="app-title">
        <div className="app-cta-copy">
          <p className="section-kicker">Prefer to plan it yourself?</p>
          <h2 id="app-title">Keep your port day in your pocket.</h2>
          <p>
            Plan your Nassau day yourself, any time you like, then keep it on your
            phone while you&rsquo;re ashore.
          </p>
          <ul className="app-feature-list">
            <li>All-aboard countdown</li>
            <li>Head-back reminders</li>
            <li>Your day at a glance</li>
            <li>A map back to the pier</li>
          </ul>
          <div className="app-actions">
            <p className="app-actions-label">Get the app</p>
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
          {/* Intentionally untracked: this is an internal navigation to the
              planner route, not the start of the planner flow. planner_start
              is fired inside the planner itself (PlanBuilder) when the user
              actually begins, so tracking the click here would double-count. */}
          <p className="app-planner-link">
            <Link href="/nassau/plan">Or try the free Nassau web planner &rarr;</Link>
          </p>
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
            ShoreDay builds your entire port day around your exact &ldquo;All-Aboard&rdquo;
            time, including built-in buffer zones.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Help in the Same Chat</h3>
          <p>
            Questions after your plan arrives? Ask in the same WhatsApp chat through
            the end of your Nassau port day. Automated replies anytime. Human help
            daily 12–5 pm ET.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌴</div>
          <h3>Optional Tours</h3>
          <p>
            Want a tour too? Once your plan is set, browse a short list of Nassau
            tours that could fit your day. Entirely optional.
          </p>
        </div>
      </section>

      {/* Excursions are an optional add-on after the plan, not a co-primary
          offer. Affiliate disclosure stays adjacent to the link. */}
      <section className="excursions-cta">
        <div className="credibility-stack">
          <div className="viator-text">
            Excursions via <span>Viator</span>, a Tripadvisor company
          </div>
        </div>

        <h2>Optional: add a Nassau tour</h2>
        <p>
          Already have your plan and want a tour? Browse a short list of Nassau
          tours on Viator. Check your ship&rsquo;s official all-aboard time before
          booking anything far from port.
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
            Browse Nassau Tours
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
