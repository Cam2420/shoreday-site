import Link from "next/link";
import WhatsAppCta from "@/app/WhatsAppCta";
import { entryPath, PLACE_ENTRIES } from "@/data/nassau-directory";

const staircase = PLACE_ENTRIES.find((entry) => entry.slug === "queens-staircase")!;
const beach = PLACE_ENTRIES.find((entry) => entry.slug === "junkanoo-beach")!;

export default function WalkingComparison() {
  return (
    <>
      <p>
        <a className="underline" href="https://nassaucruiseport.com/destination/top-attractions/">
          Nassau Cruise Port
        </a>{" "}
        estimates about 13 minutes on foot from the port to either stop, one way.
        Start your street walk at the port exit. Allow extra time to disembark
        and walk from the gangway through the port to that exit.
      </p>

      <h3><Link className="font-bold underline" href={entryPath(staircase)}>Queen’s Staircase</Link></h3>
      <p>
        For a heritage outing, ShoreDay suggests 20–40 minutes at the limestone
        staircase. Choose your approach before setting off: Elizabeth Avenue
        leads to the lower approach, while the upper approach is near Fort
        Fincastle. A route through the staircase involves steps.
      </p>

      <h3><Link className="font-bold underline" href={entryPath(beach)}>Junkanoo Beach</Link></h3>
      <p>
        For a beach outing, ShoreDay suggests 1–2 hours for a beach break, with
        time for the walk back. Public access to Junkanoo Beach is free.
        Chairs, food, equipment rentals and optional facilities such as beach clubs may cost extra.
      </p>

      <p>
        For either outing, work backward from your ship’s official all-aboard
        time. Leave room for the return walk at your group’s pace, port security
        and the walk back to your gangway.
      </p>
      <WhatsAppCta className="wa-button text-center" surface="guide_walking_comparison" icon={false}>
        Want this walk timed to your ship? Get your Nassau plan on WhatsApp — $9.99 per group.
      </WhatsAppCta>
    </>
  );
}
