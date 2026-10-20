import Image from "next/image";
import Link from "next/link";
import HomeAnalytics from "./HomeAnalytics";
import HomeFaq from "./HomeFaq";
import StickyWhatsAppCta from "./StickyWhatsAppCta";
import ShoreDayWordmark from "@/components/brand/ShoreDayWordmark";
import { WHATSAPP_QR_SRC } from "@/lib/whatsapp";
import WhatsAppCta from "./WhatsAppCta";
import WhatsAppShare from "./WhatsAppShare";
import ChatPreview, {
  ChatCard,
  ChatExcerpt,
  ChatBubble,
  MenuPhoto,
  GoldiesReply,
} from "@/components/marketing/ChatPreview";
import TimingExample from "@/components/marketing/TimingExample";
import { OfferSchema } from "@/components/marketing/StructuredData";
import FinalCta from "@/components/marketing/FinalCta";
import GuideLinks from "@/components/marketing/GuideLinks";
import { CRUISE_LINE_COPY, INDEPENDENCE } from "@/data/cruise-lines";
import { pageMetadata } from "@/lib/seo";
import "./home.css";
import "./marketing.css";

export const metadata = pageMetadata(
  "Nassau Cruise Port Day Plan | ShoreDay",
  "Your Nassau day in one WhatsApp chat: a personal plan, offline PDF, photo answers and voice notes. $15 once for your whole group.",
  "/",
);

const FEATURES = [
  {
    type: "photo",
    icon: "📸",
    title: "Snap it. Ask it.",
    copy: "Send a menu, price board or recognizable landmark. Get help understanding what’s in front of you.",
    caption:
      "Government House photo and reply · Oct 2026. Supplied chat excerpt, shortened and adapted to light mode.",
  },
  {
    type: "voice",
    icon: "🎙️",
    title: "Too hot to type? Just talk.",
    copy: "Send a voice note and get one back. You can also ask ShoreDay to reply in voice.",
    caption:
      "Voice-note receipt · Oct 2026. Adapted to light mode with an illustrated waveform.",
  },
  {
    type: "location",
    icon: "📍",
    title: "A place. A link. Your next stop.",
    copy: "Ask for an ATM, pharmacy or beach. Get a Google Maps link for directions, hours and reviews.",
    caption:
      "Location reply excerpt · Oct 2026. Adapted to light mode; confirm details before going.",
  },
  {
    type: "countdown",
    icon: "⏳",
    title: "How much time do I have?",
    copy: "Ask for your leave-by time, back-at-pier target and exact time left. Your ship’s clock comes first.",
    caption:
      "Illustrative countdown using example times. Your ship’s own all-aboard time always comes first.",
  },
] as const;

export default function Home() {
  return (
    <div className="home marketing" id="top">
      <HomeAnalytics />
      <OfferSchema />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="logo">
          <Image src="/logo_transparent.png" width={28} height={36} alt="" />
          <ShoreDayWordmark />
        </Link>
        <Link href="#guides" className="header-guide">
          Nassau guides
        </Link>
        <WhatsAppCta surface="home_header" className="nav-cta" />
      </header>
      <main id="content">
        <section className="hero" aria-labelledby="home-title">
          <div className="hero-media">
            <Image
              src="/images/shoreday/nassau/hero-nassau-aerial.webp"
              alt="Nassau harbor and the turquoise coastline beside the cruise port"
              fill
              sizes="(max-width: 760px) 100vw, 1240px"
              loading="eager"
              fetchPriority="high"
              quality={40}
            />
            <div className="hero-scrim" />
          </div>
          <div className="hero-inner">
            <div className="hero-text-content">
              <p className="hero-eyebrow">
                Booked your cruise? Let’s plan Nassau.
              </p>
              <h1 id="home-title">
                Your Nassau port day, planned around your ship’s all-aboard
                time.
              </h1>
              <p className="subtitle">
                Your Nassau cruise port day plan, saved in one WhatsApp chat. A
                personal plan and offline PDF before you step off. Photo answers
                and voice notes when you’re connected ashore.
              </p>
              <p className="hero-human">
                An automated assistant. A real person daily 12–5 PM ET.
              </p>
              <div className="hero-cta-stack">
                <WhatsAppCta surface="home_hero" className="hero-primary-cta">
                  Start in WhatsApp <span>(free to message)</span>
                </WhatsAppCta>
                <p className="hero-microcopy">
                  <strong>$15 once for your whole group.</strong> Food, rides
                  and tours extra.
                </p>
              </div>
              <p className="hero-reassurance">
                Refund before your plan is sent. Save it before going offline.
              </p>
            </div>
            <aside className="port-control" aria-labelledby="hero-offer-title">
              <p className="port-control-kicker">One chat. Your whole day.</p>
              <h2 id="hero-offer-title" className="port-control-title">
                Step ashore with a plan.
              </h2>
              <ul className="hero-offer-list">
                <li>Your ship’s clock, your group’s pace</li>
                <li>A 17-page offline Playbook</li>
                <li>Photo, voice and map answers</li>
                <li>Help through your Nassau port day</li>
              </ul>
              <a href="#one-chat" className="text-link">
                Take a look inside the chat ↓
              </a>
            </aside>
          </div>
        </section>
        <div className="cruise-fit">
          <p>{CRUISE_LINE_COPY}</p>
          <small>{INDEPENDENCE}</small>
        </div>

        <section
          className="story-section one-chat-section"
          id="one-chat"
          aria-labelledby="one-chat-title"
        >
          <div className="story-copy">
            <p className="section-kicker">
              A little less searching. A lot more Nassau.
            </p>
            <h2 id="one-chat-title">
              Your Nassau day,
              <br />
              in one chat.
            </h2>
            <p className="section-lead">
              Your plan is just the beginning. Keep the PDF, voice notes, photo
              questions and answers together in WhatsApp.
            </p>
            <ol className="chat-benefits">
              <li>
                <span>01</span>
                <div>
                  <h3>Already on your phone: it’s WhatsApp.</h3>
                  <p>
                    No separate ShoreDay account or password. Start before you
                    sail.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Too hot to type? Just talk.</h3>
                  <p>
                    Hands full? Send a voice note. ShoreDay replies in voice
                    when you speak first or ask.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Scroll back anytime.</h3>
                  <p>
                    It’s your Nassau day, saved. Keep the chat or share parts
                    with your group.
                  </p>
                </div>
              </li>
            </ol>
            <WhatsAppCta surface="home_one_chat" className="wa-button" />
            <p className="section-note">
              Nassau only. Your ship’s official all-aboard time is final.
            </p>
          </div>
          <ChatPreview />
        </section>

        <section
          className="feature-section section-wrap"
          aria-labelledby="features-title"
        >
          <div className="section-heading">
            <p className="section-kicker">See what the chat can do</p>
            <h2 id="features-title">Ask it anything in port.</h2>
            <p>
              Menus, directions, time checks. One place for the questions that
              come up.
            </p>
          </div>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <article className="feature-card" key={f.type}>
                <div className="feature-copy">
                  <span className="feature-icon" aria-hidden="true">
                    {f.icon}
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.copy}</p>
                </div>
                <ChatCard type={f.type} />
                <p className="proof-caption">{f.caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="story-section vendor-section"
          aria-labelledby="vendor-title"
        >
          <figure className="vendor-proof">
            <ChatExcerpt
              id="vendor-menu"
              label="Goldie’s menu chat example in light mode"
            >
              <ChatBubble sent>
                <MenuPhoto />
                <p>Is this a fair price?</p>
              </ChatBubble>
              <ChatBubble>
                <GoldiesReply />
              </ChatBubble>
            </ChatExcerpt>
            <figcaption>
              Goldie’s menu chat · prices as of Oct 2026. Light-mode adaptation,
              shortened for readability. Confirm current prices.
            </figcaption>
          </figure>
          <div className="story-copy">
            <p className="section-kicker">Choose your day with confidence</p>
            <h2 id="vendor-title">Walk off the ship with a plan.</h2>
            <p className="section-lead">
              Step off with a plan, so “no thanks, we’re all set” comes easy.
            </p>
            <p>
              Got an offer at the pier? Snap the price board and ask whether it
              fits your day and budget.
            </p>
            <p>
              Make room for local food. Agree the fare before taking a taxi.
              Check every tour against your leave-by time.
            </p>
            <Link href="/nassau-cash-or-card" className="text-link">
              Plan your spending →
            </Link>
          </div>
        </section>

        <section
          className="story-section timing-section"
          aria-labelledby="problem-title"
        >
          <div className="story-copy">
            <p className="section-kicker">Why timing matters</p>
            <h2 id="problem-title">Your port call isn’t your port day.</h2>
            <p className="section-lead">
              Docking, walking off and getting back all use time. Build your day
              backward from all-aboard.
            </p>
            <p>
              Start with your back-at-pier target. Subtract the trip back. That
              gives you a leave-by time to plan around.
            </p>
            <p>
              Ask for two alarm times to set yourself. The WhatsApp concierge
              does not send automatic reminders.
            </p>
            <Link href="/nassau-all-aboard-time" className="text-link">
              See how the timing works →
            </Link>
          </div>
          <TimingExample />
        </section>

        <section
          className="offline-section section-wrap"
          aria-labelledby="offline-title"
        >
          <div>
            <p className="section-kicker">Download before you step ashore</p>
            <h2 id="offline-title">Works in airplane mode.</h2>
            <p className="section-lead">
              Your saved plan and downloaded PDF stay readable without signal.
            </p>
            <p>
              Play voice notes once on ship Wi-Fi so downloaded notes replay
              ashore. New questions, photos and replies need internet.
            </p>
            <p>Check your phone plan’s Bahamas coverage before you sail.</p>
          </div>
          <div className="offline-checklist">
            <h3>Your before-you-go checklist</h3>
            <ul>
              <li>Save your plan in the chat.</li>
              <li>Download and open the 17-page PDF.</li>
              <li>Play voice notes once while connected.</li>
              <li>Keep the page 17 back-to-ship card handy.</li>
            </ul>
            <span>Phone ready. Day ready.</span>
          </div>
        </section>

        <section
          className="how-section section-wrap"
          id="whatsapp"
          aria-labelledby="how-title"
        >
          <div className="section-heading">
            <p className="section-kicker">Before you sail</p>
            <h2 id="how-title">Three steps, one WhatsApp chat.</h2>
          </div>
          <ol className="how-grid">
            <li>
              <span>01</span>
              <h3>Message ShoreDay</h3>
              <p>It’s free to look around and ask how it works.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Get your plan</h3>
              <p>
                Pay once for your group. Send your ship, date, all-aboard time
                and what your group enjoys.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Take Nassau with you</h3>
              <p>
                Save your plan and PDF. Come back to the chat with questions
                through your port day.
              </p>
            </li>
          </ol>
          <div className="how-action">
            <WhatsAppCta surface="home_whatsapp" className="wa-button" />
            <Image
              src={WHATSAPP_QR_SRC}
              width={112}
              height={112}
              alt="Scan to open ShoreDay in WhatsApp"
            />
            <p>
              On a computer?
              <br />
              Scan with your phone.
            </p>
          </div>
        </section>
        <section className="experience" aria-labelledby="experience-title">
          <div className="experience-head">
            <p className="section-kicker">A real Nassau day</p>
            <h2 id="experience-title">
              One realistic day, not a packed checklist.
            </h2>
            <p className="section-lead">
              Beach time, a walkable downtown loop, or local food and history.
              Your plan is shaped around your hours, your group, and the kind of
              day you want.
            </p>
          </div>

          <div className="experience-grid">
            <figure className="exp-card">
              <Image
                src="/images/shoreday/nassau/nassau-beach.webp"
                alt="Turquoise water and white sand at a public beach in Nassau, Bahamas"
                width={640}
                height={480}
                sizes="(max-width: 600px) 88vw, (max-width: 1000px) 45vw, 290px"
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
              <Image
                src="/images/shoreday/nassau/nassau-street.webp"
                alt="Cruise visitors walking a sunny, colorful street near the Nassau cruise port"
                width={640}
                height={480}
                sizes="(max-width: 600px) 88vw, (max-width: 1000px) 45vw, 290px"
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
              <Image
                src="/images/shoreday/nassau/bahamas-food.webp"
                alt="Bahamian cracked conch and fresh conch salad served beachside"
                width={640}
                height={480}
                sizes="(max-width: 600px) 88vw, (max-width: 1000px) 45vw, 290px"
                decoding="async"
              />
              <span className="exp-tag">Local food</span>
              <figcaption>
                <span className="exp-copy">
                  Make room for local Bahamian food and a relaxed meal.
                </span>
              </figcaption>
            </figure>

            <figure className="exp-card">
              <Image
                src="/images/shoreday/nassau/nassau-heritage.webp"
                alt="The Pirates of Nassau heritage museum in historic downtown Nassau"
                width={640}
                height={480}
                sizes="(max-width: 600px) 88vw, (max-width: 1000px) 45vw, 290px"
                decoding="async"
              />
              <span className="exp-tag">Heritage</span>
              <figcaption>
                <span className="exp-copy">
                  Landmarks and shops on a simple route that fits your window.
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="return-section section-wrap">
          <p className="section-kicker">Been to Nassau before?</p>
          <h2>
            You’ve been to Nassau.
            <br />
            You haven’t done Nassau with ShoreDay.
          </h2>
          <p>
            A different ship’s clock. Local food you skipped. A beach or
            heritage stop that fits this visit.
          </p>
          <p>
            Come back to the same chat next time. Each Nassau port call is a
            separate $15 for your group.
          </p>
          <Link
            href="/is-nassau-worth-getting-off-the-ship"
            className="text-link"
          >
            Find your reason to step ashore →
          </Link>
        </section>

        <section className="price" id="price" aria-labelledby="price-title">
          <div className="price-head">
            <p className="section-kicker">One group. One Nassau port call.</p>
            <h2 id="price-title">$15 once. Your whole group.</h2>
            <p className="price-lead">
              One payment. One WhatsApp number. Food, rides and tours are paid
              separately.
            </p>
          </div>
          <div className="price-columns">
            <div className="wa-included">
              <h3 className="wa-included-title">Inside your chat</h3>
              <ul className="wa-included-list">
                <li>A plan shaped around your ship, group and budget.</li>
                <li>A 17-page offline PDF kit.</li>
                <li>Photo, video, PDF and voice-note questions.</li>
                <li>Help through the end of your Nassau port day.</li>
                <li>
                  Automated replies any time during access. Human help daily
                  12–5 PM ET.
                </li>
                <li>ShoreDay app premium for the purchaser.</li>
              </ul>
            </div>
            <div className="wa-included price-isnt">
              <h3 className="wa-included-title">Before you buy</h3>
              <p>
                Free to message first. Full refund before your personalized plan
                is sent.
              </p>
              <p>
                After delivery, non-refundable unless ShoreDay fails to provide
                the described service.
              </p>
              <p>
                Planning guidance, with estimated times and recommendations.
                Your ship’s official all-aboard time is final.
              </p>
              <Link href="/concierge-terms" className="text-link">
                Read the Concierge Terms →
              </Link>
            </div>
          </div>
          <div className="price-cta">
            <WhatsAppCta surface="home_pricing" className="wa-button" />
          </div>
        </section>
        {/* Real reviews may be added here after Cam supplies permission and original customer wording. No fabricated social proof. */}
        <GuideLinks />
        <HomeFaq />
        <aside className="wa-share" aria-labelledby="wa-share-title">
          <p className="section-kicker">For your cruise buddy</p>
          <h3 id="wa-share-title">
            Don&rsquo;t let your cruise buddy wing Nassau.
          </h3>
          <p className="wa-share-lead">
            Send them ShoreDay: a plan built around their ship&rsquo;s
            all-aboard time.
          </p>
          <WhatsAppShare />
          <p className="wa-share-qr-label">Or let them scan this</p>
          <div className="wa-share-qr">
            <img
              src={WHATSAPP_QR_SRC}
              alt="QR code that opens ShoreDay on WhatsApp"
              width={150}
              height={150}
              loading="lazy"
              decoding="async"
            />
          </div>
        </aside>

        {/* The app bonus remains separate from the WhatsApp concierge. */}
        <section className="app-cta" id="app" aria-labelledby="app-title">
          <div className="app-cta-copy">
            <p className="section-kicker">A bonus for the purchaser</p>
            <h2 id="app-title">Your concierge comes with an app bonus.</h2>
            <p>
              ShoreDay app premium is included for the person who pays, on iOS
              and Android. It is separate from your WhatsApp concierge. Your
              chat plan does not automatically transfer into the app.
            </p>
            <ul className="app-feature-list">
              <li>Separate iOS and Android app</li>
              <li>Premium access for the purchaser</li>
              <li>No extra app needed for the WhatsApp concierge</li>
            </ul>
            <Link href="/nassau-cruise-app" className="text-link">
              How the app and chat fit together →
            </Link>
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
                    width={135}
                    height={40}
                    loading="lazy"
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
                    width={135}
                    height={40}
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="app-cta-shots">
            <Image
              className="app-shot app-shot-front"
              src="/images/shoreday/app/itinerary.webp"
              alt="ShoreDay app itinerary screen"
              width={300}
              height={650}
              sizes="(max-width: 600px) 55vw, 300px"
              loading="lazy"
              decoding="async"
            />
            <Image
              className="app-shot app-shot-back"
              src="/images/shoreday/app/ship-alert.webp"
              alt="ShoreDay app head-back reminder screen"
              width={300}
              height={650}
              sizes="(max-width: 600px) 55vw, 300px"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        {/* Excursions are an optional add-on after the plan, not a co-primary
          offer: a light card near the end of the page. Affiliate disclosure
          stays adjacent to the link. */}
        <section className="tours" aria-labelledby="tours-title">
          <div className="viator-text">
            Excursions via <span>Viator</span>, a Tripadvisor company
          </div>

          <h2 id="tours-title">Optional: add a Nassau tour</h2>
          <p>
            Already have your plan and want a tour? Browse a short list of
            Nassau tours on Viator. Check your ship&rsquo;s official all-aboard
            time before booking anything far from port.
          </p>

          <div className="cta-button-group">
            <a
              href="https://vi.me/s/shoredayapp"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="tours-btn"
              data-analytics-event="excursion_click"
              data-analytics-surface="home_excursions_cta"
            >
              Browse Nassau Tours
            </a>
          </div>
          <p className="affiliate-disclosure">
            Disclosure: ShoreDay may earn a commission if you book through a
            Viator link.
          </p>
        </section>

        <FinalCta surface="home_final" />
      </main>
      <footer>
        <div className="footer-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/concierge-terms">Concierge Terms</Link>
          <a href="mailto:support@shoredayapp.com">support@shoredayapp.com</a>
        </div>
        <p className="footer-note">
          Independent planning service, not affiliated with any cruise line or
          the Nassau Cruise Port.
        </p>
        <p>&copy; 2026 VMAManagement LLC - ShoreDay. All rights reserved.</p>
      </footer>

      <StickyWhatsAppCta />
    </div>
  );
}
