import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { SHIP_GUIDES } from "@/data/ships";
const LABELS: Record<string, string> = {
  "nassau-cruise-app": "One WhatsApp chat for Nassau",
  "nassau-cruise-port-walking-distance": "Walking from the cruise port",
  "nassau-all-aboard-time": "When to head back to the ship",
  "nassau-cruise-with-kids": "Nassau with kids",
  "is-nassau-worth-getting-off-the-ship": "Is it worth stepping ashore?",
  "nassau-cash-or-card": "Cash, cards and your budget",
};
export default function GuideLinks({ slugs }: { slugs?: string[] }) {
  return (
    <section
      className="section-wrap guide-links"
      id="guides"
      aria-labelledby="guides-title"
    >
      <p className="section-kicker">A little planning before you sail</p>
      <h2 id="guides-title">Make sense of your Nassau day.</h2>
      <div className="guide-link-grid">
        {GUIDES.filter((g) => !slugs || slugs.includes(g.slug)).map((g) => (
          <Link href={`/${g.slug}`} key={g.slug}>
            {LABELS[g.slug]}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
      {!slugs && (
        <div className="ship-links">
          <p>Find your ship</p>
          {SHIP_GUIDES.map((g) => (
            <Link href={`/ships/${g.slug}`} key={g.slug}>
              {g.ship} →
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
