import type { Metadata } from "next";
import KitForm from "./KitForm";
import "./cheat.css";

export const metadata: Metadata = {
  title: { absolute: "Free Nassau Port Playbook | ShoreDay" },
  description:
    "Get the free Nassau Port Playbook with all-aboard timing, taxi-fare guidance, and practical tips for your cruise stop.",
  alternates: { canonical: "/nassau-cheat-sheet" },
  robots: { index: false, follow: false },
};

export default function NassauCheatSheet() {
  return (
    <div className="cheat">
      <div className="container">
        <div className="logo">
          Shore<span>Day</span>
        </div>

        <h1>The Nassau Port Playbook</h1>
        <div className="subtitle">Timing, Taxi Fares &amp; the Traps to Skip</div>

        <p className="description">
          Enter your email to get instant access to a practical one-page guide
          for planning around your all-aboard time and spending smarter in
          Nassau.
        </p>

        <div className="form-wrapper">
          <KitForm />
          <div
            style={{
              fontSize: 12,
              color: "#94a3b8",
              marginTop: -12,
              marginBottom: 20,
            }}
          >
            Free • No spam • Unsubscribe anytime
          </div>
        </div>

        <div className="floor-cta">
          Already have your day planned? <br />
          <a href="https://vi.me/s/shoredayapp" target="_blank" rel="noopener noreferrer">
            Browse &amp; Book Nassau Excursions Directly (Save up to 60%)
          </a>
          <p className="affiliate-disclosure">
            Disclosure: ShoreDay may earn a commission if you book through a Viator link.
          </p>
        </div>
      </div>
    </div>
  );
}
