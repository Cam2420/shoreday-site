import type { Metadata } from "next";
import KitForm from "./KitForm";
import "./cheat.css";

export const metadata: Metadata = {
  title: { absolute: "Nassau Port-Day Survival Guide | ShoreDay" },
  description:
    "Get your free Nassau port-day survival guide: regulated taxi rates, the all-aboard buffer rule, and the 3 tourist traps to avoid.",
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

        <h1>The Nassau Port Day Survival Guide</h1>
        <div className="subtitle">Don&apos;t Get Ripped Off. Don&apos;t Miss Your Ship.</div>

        <p className="description">
          Enter your email below to get instant access to your{" "}
          <strong>free digital survival guide</strong>. Get regulated taxi rates,
          the mathematical &quot;all-aboard&quot; buffer rule, and the 3 tourist
          traps to completely avoid this week.
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
