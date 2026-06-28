import type { Metadata } from "next";
import ViatorOutboundLink from "@/components/funnel/ViatorOutboundLink";
import "./survival.css";

export const metadata: Metadata = {
  title: { absolute: "Nassau Port Playbook | ShoreDay" },
  description:
    "A practical guide to all-aboard timing, taxi-fare guidance, and avoiding common tourist traps during a Nassau cruise stop.",
  alternates: { canonical: "/nassau-survival-card" },
  robots: { index: false, follow: false },
};

export default function NassauSurvivalCard() {
  return (
    <div className="survival">
      <main className="card">
        <span className="eyebrow">NASSAU PORT PLAYBOOK</span>
        <h1>Timing, Taxi Fares &amp; the Traps to Skip</h1>
        <p className="lede">
          A practical one-page guide to help you plan around your all-aboard time
          and spend smarter in Nassau.
        </p>

        <div className="rule">
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.85,
              fontWeight: 600,
            }}
          >
            The one rule that matters
          </div>
          <b>Be back onboard 45–60 minutes before all-aboard.</b>
          <p style={{ margin: "8px 0 0" }}>
            &quot;All-aboard&quot; is 30–60 minutes before the ship departs — and
            you must be on by <em>all-aboard</em>, not departure. Confirm the exact
            time on your daily planner.
          </p>
          <span className="ex">
            Ship leaves 5:00 PM → all-aboard ≈ 4:30 PM → you&apos;re back by ≈ 3:45 PM
          </span>
        </div>

        <h2>Run on ship time</h2>
        <p>
          Your phone may quietly switch to local time and put you an hour off. Set
          an alarm to <b>ship time</b>{" "}
          the moment you wake up, and judge every
          &quot;head back now&quot; decision against it.
        </p>

        <h2>Know who the ship waits for</h2>
        <p>
          On a <b>cruise-line excursion</b> and running late? The ship waits.{" "}
          <b>On your own</b>{" "}
          and late? It leaves — and you&apos;re responsible for
          catching up to it at the next port, at your own expense. Independent days
          are cheaper and better; they&apos;re only risky when you wing the timing.
        </p>

        <h2>Distance = risk</h2>
        <ul>
          <li>
            <b>Low risk:</b>{" "}
            downtown &amp; Junkanoo Beach — minutes from the ship.
          </li>
          <li>
            <b>Medium risk:</b> Paradise Island / Cabbage Beach — a bridge or ferry
            in between.
          </li>
          <li>
            <b>Highest risk:</b> Blue Lagoon, Rose Island, or Exuma day trips — boat-
            or flight-dependent. Give these the biggest buffer.
          </li>
        </ul>

        <h2>Taxi rules (don&apos;t get ripped off)</h2>
        <ul>
          <li>
            <b>Agree the fare before the wheels move.</b> No agreed price means an
            inflated one at the curb.
          </li>
          <li>
            Fares are government-regulated <b>for two passengers</b>; about{" "}
            <b>+$3 per extra person</b>; tip ~15%.
          </li>
          <li>
            Most port trips are flat zone fares — know the ballpark before you ride.
          </li>
        </ul>

        <h2>
          Typical regulated fares{" "}
          <span style={{ fontSize: 14, color: "#45586b", fontWeight: 400 }}>
            (2 passengers, one-way — confirm first)
          </span>
        </h2>
        <ul className="fares">
          <li>
            Around downtown Nassau / Junkanoo Beach — <b>~$6</b>
          </li>
          <li>
            Cruise port ⇄ Paradise Island (Atlantis) — <b>~$6–9</b> + ~$2 bridge toll
          </li>
          <li>
            Cruise port ⇄ Cable Beach — <b>~$15–20</b>
          </li>
          <li>
            Each extra passenger over two — <b>+$3</b> · tip ~15%
          </li>
        </ul>

        <h2>The 3 traps to avoid</h2>
        <div className="traps">
          <div className="trap">
            <div className="tn">Trap 1 — The unmetered &quot;sure, hop in&quot;</div>
            No agreed price = an inflated one when you arrive. Lock the fare first.
          </div>
          <div className="trap">
            <div className="tn">Trap 2 — The $150+ bus tour</div>
            The cruise line&apos;s package is the pricey option. Independent is
            cheaper and better — just manage the time.
          </div>
          <div className="trap">
            <div className="tn">Trap 3 — The &quot;free&quot; ride to a shop</div>
            A cheap lift that detours to a &quot;friend&apos;s&quot; store is a sales
            trap. Politely decline.
          </div>
        </div>

        <div className="miss">
          <h2 style={{ marginTop: 0, color: "#c2453a" }}>
            If you miss the ship (you won&apos;t, but just in case)
          </h2>
          <p style={{ margin: 0 }}>
            Call the ship&apos;s <b>port agent</b>{" "}
            — the number is on your daily
            planner (photo it every morning). You&apos;ll arrange and pay for travel
            to the next port, so keep your <b>passport or a photo of it</b>, a card,
            and a charged phone on you.
          </p>
        </div>

        <h2>Stop timing it by hand — let ShoreDay do it</h2>
        <p>
          ShoreDay builds your whole Nassau day around your ship&apos;s all-aboard
          time: a minute-by-minute plan with real local prices, insider stops, and
          the return-to-ship buffer baked in. Ask the in-app concierge anything,
          free, before any paywall.
        </p>

        <div className="cta">
          <a
            href="https://apps.apple.com/us/app/shoreday/id6761083487"
            target="_blank"
            rel="noopener noreferrer"
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
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
            />
          </a>
          <ViatorOutboundLink surface="survival_card" className="shop">
            Browse curated Nassau excursions →
          </ViatorOutboundLink>
        </div>
        <p className="affiliate-disclosure">
          Disclosure: ShoreDay may earn a commission if you book through a Viator link.
        </p>

        <p className="disclaimer">
          Government-regulated taxi fares shown are typical one-way prices for two
          passengers and can change — always confirm with your driver before you
          ride. All-aboard times vary by ship and date; your cruise line&apos;s
          daily planner is the final word. © ShoreDay · shoredayapp.com
        </p>
      </main>
    </div>
  );
}
