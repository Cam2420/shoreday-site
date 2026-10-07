import { WHATSAPP_PREFILL, WHATSAPP_QR_SRC } from "@/lib/whatsapp";
import WhatsAppCta from "./WhatsAppCta";

/** Facts a buyer checks before tapping. Short on purpose: scannable at a glance. */
const TRUST_POINTS = [
  "Free to message first",
  "Refund before your plan is sent",
  "Nassau only",
  "Your ship’s official time is final",
];

/**
 * Homepage "How it works" section for the $15 ShoreDay Nassau Concierge.
 * Keeps id="whatsapp": cruise-buddy share links land on #whatsapp.
 *
 * Left: the three steps of the live flow (welcome card → "Get my plan" →
 * PDF, then the personal plan), QR code (desktop) and a "Start in WhatsApp"
 * button (surface home_whatsapp).
 * Right: an iPhone showing the real first exchange in the WhatsApp chat: the
 * pre-filled entry message and the welcome card it gets back (including the
 * automated-assistant line). The phone is decorative (aria-hidden); the copy on
 * the left carries the same information for screen readers.
 * Below both: a compact trust strip.
 *
 * Marketing copy sells the plan, not the technology: no "AI" wording here.
 * Price, what's included and limits live in the Price section further down.
 */
export default function WhatsAppConcierge() {
  return (
    <section className="wa-concierge" id="whatsapp" aria-labelledby="wa-title">
      <div className="wa-copy">
        <p className="section-kicker">ShoreDay Nassau Concierge</p>
        <h2 id="wa-title">Three steps, one WhatsApp chat.</h2>

        <ol className="port-control-steps wa-steps">
          <li>
            <span aria-hidden="true">1</span>
            <div>
              <strong>Message ShoreDay</strong>
              <p>
                Free to message. Tap &ldquo;See a sample&rdquo; or &ldquo;How it
                works&rdquo; to look first.
              </p>
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
                Your 17-page PDF arrives first. Send your ship, Nassau date,
                all-aboard time, group, and day style, and your personal plan
                follows.
              </p>
            </div>
          </li>
        </ol>

        <div className="wa-actions">
          <div className="wa-qr-card">
            <div className="wa-qr">
              <img
                src={WHATSAPP_QR_SRC}
                alt="QR code that opens a WhatsApp chat with ShoreDay"
                width={176}
                height={176}
                loading="lazy"
                decoding="async"
              />
              <img className="wa-qr-logo" src="/shoreday_icon.png" alt="" width={38} height={38} />
            </div>
            <p>Scan with your phone camera</p>
          </div>

          <div className="wa-cta">
            <WhatsAppCta surface="home_whatsapp" className="wa-button" />
            <p className="wa-microcopy">Free to message. You only pay if you want the plan.</p>
          </div>
        </div>

      </div>

      <div className="wa-mockup">
        <WhatsAppPhone />
        <p className="wa-mockup-caption">The first message you&rsquo;ll get on WhatsApp.</p>
      </div>

      <ul className="wa-trust" aria-label="Before you start">
        {TRUST_POINTS.map((point) => (
          <li key={point}>
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
              <path
                d="M3.5 8.5 6.5 11.5 12.5 4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* The welcome card the WhatsApp funnel sends in reply to the entry message.
   Keep in step with the live Funnel 1 Welcome message. The two \u00a0s (no-break
   spaces) only stop "support." and the 🍹 from wrapping onto a line alone. */
const WELCOME_TEXT = `Welcome to ShoreDay 👋
Your Nassau port day, planned around your ship's all-aboard time.
🗺️ A personal plan: where to go, what it costs, when to head back
📘 The offline Playbook kit (PDF)
💬 WhatsApp help all day ashore
🤖 I'm ShoreDay's automated assistant. Type HUMAN anytime to reach\u00a0support.
$15 one time for your whole group. About the price of one cruise cocktail\u00a0🍹`;

const WELCOME_REPLIES = ["🗺️ See a sample", "💬 How it works", "✅ Get my plan"];

/**
 * Decorative iPhone running a WhatsApp chat, drawn with divs and inline SVG
 * apart from the ShoreDay avatar and the welcome card's header image. The
 * screen is laid out in iPhone points (see .wa-screen in home.css), so every
 * size inside it scales with the phone. Messages start at the top of the chat,
 * and the whole first exchange fits on screen.
 */
function WhatsAppPhone() {
  return (
    <div className="wa-phone" aria-hidden="true">
      <span className="wa-hw wa-hw-action" />
      <span className="wa-hw wa-hw-vol-up" />
      <span className="wa-hw wa-hw-vol-down" />
      <span className="wa-hw wa-hw-power" />

      <div className="wa-screen">
        <span className="wa-island" />

        <div className="wa-status">
          <span className="wa-status-time">9:41</span>
          <span className="wa-status-icons">
            <svg className="wa-i-signal" viewBox="0 0 18 12">
              <rect x="0" y="7.5" width="3" height="4.5" rx="1" fill="currentColor" />
              <rect x="5" y="5" width="3" height="7" rx="1" fill="currentColor" />
              <rect x="10" y="2.5" width="3" height="9.5" rx="1" fill="currentColor" />
              <rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor" />
            </svg>
            <svg className="wa-i-wifi" viewBox="0 0 16 12">
              <path
                d="M1.3 4.4a9.6 9.6 0 0 1 13.4 0M3.8 6.9a6 6 0 0 1 8.4 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path d="M8 11.3 5.9 9.2a3 3 0 0 1 4.2 0Z" fill="currentColor" />
            </svg>
            <svg className="wa-i-battery" viewBox="0 0 27 13">
              <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" opacity="0.4" />
              <rect x="2" y="2" width="16.5" height="9" rx="2.3" fill="currentColor" />
              <path d="M25 4.4v4.2c.8-.3 1.4-1.1 1.4-2.1s-.6-1.8-1.4-2.1Z" fill="currentColor" opacity="0.45" />
            </svg>
          </span>
        </div>

        <div className="wa-chat-head">
          <span className="wa-back">
            <svg className="wa-i-back" viewBox="0 0 12 20">
              <path
                d="M10 2 2 10l8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            3
          </span>
          <img className="wa-avatar" src="/shoreday_icon.png" alt="" width={36} height={36} />
          <strong className="wa-contact">ShoreDay</strong>
        </div>

        <div className="wa-chat">
          {/* viewBox is in points: taller than the chat so "slice" scales by
              width, making one unit one point at any phone size. */}
          <svg className="wa-wallpaper" viewBox="0 0 393 900" preserveAspectRatio="xMidYMin slice">
            <defs>
              <pattern id="wa-doodles" width="180" height="180" patternUnits="userSpaceOnUse">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* sun */}
                  <circle cx="30" cy="30" r="8" />
                  <path d="M30 16v-5M30 44v5M16 30h-5M44 30h5M20.1 20.1l-3.5-3.5M39.9 20.1l3.5-3.5M20.1 39.9l-3.5 3.5M39.9 39.9l3.5 3.5" />
                  {/* palm tree on a little island */}
                  <path d="M140 77c2-12 5-26 6-39M146 38c-6-6-16-7-22-2M146 38c-8 0-15 5-17 12M146 38c6-7 16-8 22-3M146 38c8 1 14 7 15 14M146 38c-1-7 2-13 7-16M126 79c8-4 22-4 30 0" />
                  <circle cx="143.5" cy="42.5" r="2" />
                  <circle cx="149" cy="42" r="2" />
                  {/* curling wave */}
                  <path d="M66 92c6-10 16-14 26-10 6 3 7 10 2 12-4 2-8-2-5-5M62 97c8 3 16 3 24 0s16-3 24 0" />
                  {/* cruise ship */}
                  <path d="M18 128h62l-8 12H26ZM28 128v-9h40v9M36 119v-7h24v7M50 112v-7h7v7M14 147c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 12 0 8-3 12 0 8 3 12 0" />
                  <circle cx="34" cy="123.5" r="1.4" />
                  <circle cx="44" cy="123.5" r="1.4" />
                  <circle cx="54" cy="123.5" r="1.4" />
                  <circle cx="64" cy="123.5" r="1.4" />
                  {/* scallop shell */}
                  <path d="M140 150 121 129q19-24 38 0ZM140 150l-12-30M140 150v-35M140 150l12-30M135 150h10v5h-10Z" />
                </g>
              </pattern>
            </defs>
            <rect width="393" height="900" fill="url(#wa-doodles)" />
          </svg>

          <div className="wa-thread">
            <div className="wa-bubble wa-bubble-out">
              <p>
                {WHATSAPP_PREFILL}
                <span className="wa-meta-spacer" />
              </p>
              <span className="wa-meta">
                <time>9:02</time>
                <svg className="wa-ticks" viewBox="0 0 16 11">
                  <path
                    d="M1.2 5.8 4.1 8.7l6.3-7.2M6.6 8.1l.6.6 6.3-7.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="wa-bubble wa-bubble-in wa-card">
              <div className="wa-card-msg">
                <img
                  className="wa-card-img"
                  src="/images/shoreday/whatsapp/wa-welcome-header.webp"
                  alt=""
                  width={600}
                  height={314}
                  loading="lazy"
                  decoding="async"
                />
                <p className="wa-card-text">
                  {WELCOME_TEXT}
                  <span className="wa-meta-spacer" />
                </p>
                <span className="wa-meta">
                  <time>9:02</time>
                </span>
              </div>
              <div className="wa-card-replies">
                {WELCOME_REPLIES.map((label) => (
                  <span key={label}>
                    <svg className="wa-i-reply" viewBox="0 0 20 20">
                      <path
                        d="M8 4.5 3 9.5l5 5M3 9.5h8a6 6 0 0 1 6 6v.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="wa-input">
          <svg className="wa-i-input" viewBox="0 0 24 24">
            <path d="M12 4.5v15M4.5 12h15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="wa-field">
            <svg className="wa-i-sticker" viewBox="0 0 24 24">
              <path
                d="M13.5 3.5H7A3.5 3.5 0 0 0 3.5 7v10A3.5 3.5 0 0 0 7 20.5h6.5l7-7V7A3.5 3.5 0 0 0 17 3.5h-3.5M20.5 13.5H16a2.5 2.5 0 0 0-2.5 2.5v4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <svg className="wa-i-input" viewBox="0 0 24 24">
            <path
              d="M4 7.5h3.2l1.6-2.2h6.4l1.6 2.2H20a1.6 1.6 0 0 1 1.6 1.6v8.8a1.6 1.6 0 0 1-1.6 1.6H4a1.6 1.6 0 0 1-1.6-1.6V9.1A1.6 1.6 0 0 1 4 7.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="13.3" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <svg className="wa-i-input" viewBox="0 0 24 24">
            <path
              d="M12 3.2a3 3 0 0 0-3 3v5.6a3 3 0 0 0 6 0V6.2a3 3 0 0 0-3-3ZM6.2 11.4a5.8 5.8 0 0 0 11.6 0M12 17.2v3.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="wa-home-indicator" />
      </div>
    </div>
  );
}
