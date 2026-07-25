import type { Metadata } from "next";
import ViatorOutboundLink from "@/components/funnel/ViatorOutboundLink";
import "./survival.css";

export const metadata: Metadata = {
  title: { absolute: "Nassau Survival Card | ShoreDay" },
  description:
    "A practical guide to all-aboard timing, taxi-fare guidance, and avoiding common tourist traps during a Nassau cruise stop.",
  alternates: { canonical: "/nassau-survival-card" },
  robots: { index: false, follow: false },
};

export default function NassauSurvivalCard() {
  return (
    <div className="survival">
      <main className="card">
        <span className="eyebrow">NASSAU SURVIVAL CARD</span>
        <h1>Make Nassau feel simple before you step off the ship</h1>
        <p className="lede">
          A practical one-page guide to timing, taxis, and choosing one good thing
          to do — without turning your port day into a race.
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
            The rule that protects the day
          </div>
          <b>Aim to be back at the pier 45–60 minutes before all-aboard.</b>
          <p style={{ margin: "8px 0 0" }}>
            Your ship&apos;s all-aboard time is the passenger deadline — not the
            departure time. Use your cruise line&apos;s official time as the final
            word, then build your day with margin.
          </p>
          <span className="ex">
            Example: all-aboard 4:30 PM → aim for the pier around 3:45 PM
          </span>
        </div>

        <h2>Run on ship time</h2>
        <p>
          Your phone may quietly switch to local time and put you an hour off. Set
          an alarm to <b>ship time</b>{" "}
          the moment you wake up, and judge every
          &quot;head back now&quot; decision against it.
        </p>

        <h2>Choose your booking style before you book</h2>
        <p>
          Cruise-line excursions buy convenience and coordination. Independent
          excursions can offer better value, smaller groups, and more flexibility.
          Neither is automatically right. The smart move is choosing the option
          that fits your group, distance from port, and return buffer.
        </p>

        <h2>Pick one anchor activity</h2>
        <p>
          Most bad port days come from trying to do too much. Choose the one thing
          you would be glad you did — beach, food tour, history stop, snorkel,
          resort day — then leave room for walking, photos, food, and getting back
          calmly.
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

        <h2>Taxi basics (agree the fare first)</h2>
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
            <div className="tn">Trap 2 — The overpriced group tour</div>
            Big, generic group tours can run $150+. Compare your options on value,
            group size, and timing before you commit.
          </div>
          <div className="trap">
            <div className="tn">Trap 3 — The &quot;free&quot; ride to a shop</div>
            A cheap lift that detours to a &quot;friend&apos;s&quot; store is a sales
            trap. Politely decline.
          </div>
        </div>

        <div className="miss">
          <h2 style={{ marginTop: 0, color: "#c2453a" }}>
            If plans start slipping
          </h2>
          <p style={{ margin: 0 }}>
            Take a photo of your ship&apos;s daily planner each morning, including
            the port agent number. Keep your <b>passport or a passport photo</b>, a
            payment card, and a charged phone with you. You probably will not need
            this — but prepared travelers make calmer decisions.
          </p>
        </div>

        <h2>Turn this into a port-day plan</h2>
        <p>
          ShoreDay builds your Nassau day around your ship time, group, budget, and
          return buffer — so you can choose one good activity without guessing if
          it fits.
        </p>

        {/* Primary CTA — Viator storefront (affiliate). */}
        <div className="cta">
          <ViatorOutboundLink surface="survival_card" className="shop">
            Browse curated Nassau excursions →
          </ViatorOutboundLink>
        </div>
        <p className="affiliate-disclosure">
          Disclosure: ShoreDay may earn a commission if you book through a Viator link.
        </p>

        {/* Secondary CTA — download the app. */}
        <p style={{ fontWeight: 600, margin: "8px 0 12px" }}>
          Download ShoreDay before your port day
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
        </div>

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
