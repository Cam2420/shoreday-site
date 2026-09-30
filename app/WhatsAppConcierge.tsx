import Link from "next/link";
import { WHATSAPP_CHAT_URL, WHATSAPP_PREFILL, WHATSAPP_QR_SRC } from "@/lib/whatsapp";

/**
 * Homepage section for the $15 ShoreDay Nassau Concierge on WhatsApp.
 *
 * Left: what you get, price, QR code (desktop) and an "Open on WhatsApp" button.
 * Right: a phone mockup of the real welcome card the chat sends first, so the
 * page shows exactly what a visitor will see (including the automated-assistant
 * line). The mockup is decorative (aria-hidden); the copy on the left carries
 * the same information for screen readers.
 *
 * Marketing copy sells the plan, not the technology: no "AI" wording here.
 */
export default function WhatsAppConcierge() {
  return (
    <section className="wa-concierge" id="whatsapp" aria-labelledby="wa-title">
      <div className="wa-copy">
        <p className="section-kicker">Nassau Concierge on WhatsApp</p>
        <h2 id="wa-title">Plan your Nassau day in one WhatsApp chat.</h2>
        <p className="wa-lead">
          Text ShoreDay your ship and all-aboard time. You get a personal plan built
          around it: where to go, what it costs, and when to head back to the pier.
        </p>

        <ul className="wa-list">
          <li>A personal plan built around your all-aboard time</li>
          <li>The offline Playbook kit (PDF)</li>
          <li>WhatsApp help all day ashore</li>
          <li>Human help daily 12&ndash;5 pm ET (type HUMAN)</li>
        </ul>

        <p className="wa-price">
          <strong>$15 one time for your whole group.</strong> Full refund any time
          before your plan is sent. <Link href="/concierge-terms">Terms</Link>
        </p>

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
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-button"
              data-analytics-event="whatsapp_click"
              data-analytics-surface="home_whatsapp"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path
                  fill="currentColor"
                  d="M12 3C6.9 3 3 6.6 3 11.1c0 2.3 1 4.4 2.7 5.9L5 21l4.2-2.1c.9.2 1.8.3 2.8.3 5.1 0 9-3.6 9-8.1S17.1 3 12 3Zm-4 9.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z"
                />
              </svg>
              Open on WhatsApp
            </a>
            <p className="wa-microcopy">Free to message. You only pay if you want the plan.</p>
          </div>
        </div>
      </div>

      <div className="wa-phone" aria-hidden="true">
        <div className="wa-screen">
          <div className="wa-chat-head">
            <img src="/shoreday_icon.png" alt="" width={34} height={34} />
            <div>
              <strong>ShoreDay</strong>
              <span>Business account</span>
            </div>
          </div>

          <div className="wa-chat-body">
            <div className="wa-bubble wa-bubble-out">
              {WHATSAPP_PREFILL}
              <time>9:02</time>
            </div>

            <div className="wa-card">
              <img
                src="/images/shoreday/whatsapp/wa-welcome-header.webp"
                alt=""
                width={600}
                height={314}
                loading="lazy"
                decoding="async"
              />
              <div className="wa-card-body">
                <p>Welcome to ShoreDay 👋</p>
                <p>Your Nassau port day, planned around your ship&rsquo;s all-aboard time.</p>
                <p>🗺️ A personal plan: where to go, what it costs, when to head back</p>
                <p>📘 The offline Playbook kit (PDF)</p>
                <p>💬 WhatsApp help all day ashore</p>
                <p>🤖 I&rsquo;m ShoreDay&rsquo;s automated assistant. Type HUMAN anytime to reach support.</p>
                <p>$15 one time for your whole group. About the price of one cruise cocktail 🍹</p>
                <p className="wa-card-footer">Independent · Nassau only · Not an emergency service</p>
              </div>
              <div className="wa-card-buttons">
                <span>🗺️ See a sample</span>
                <span>💬 How it works</span>
                <span>✅ Get my plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
