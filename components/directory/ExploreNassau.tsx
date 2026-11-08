import Image from "next/image";
import Link from "next/link";
import { DIRECTORY_PATH } from "@/data/nassau-directory";

export default function ExploreNassau() {
  return (
    <section
      className="experience"
      aria-labelledby="explore-nassau-title"
    >
      <div className="experience-head">
        <p className="section-kicker">Find your kind of Nassau</p>
        <h2 id="explore-nassau-title">
          A beach. A good lunch.
          <br />A little local history.
        </h2>
        <Link href={DIRECTORY_PATH} className="text-link">
          Explore things to do in Nassau →
        </Link>
      </div>
      <div className="experience-grid">
        <Link className="exp-card" href={`${DIRECTORY_PATH}/beaches`} aria-label="Explore Nassau beaches">
          <Image
            src="/images/shoreday/nassau/nassau-beach.webp"
            alt="Turquoise water and white sand at a public beach in Nassau, Bahamas"
            width={640}
            height={480}
            sizes="(max-width: 600px) 88vw, (max-width: 1000px) 45vw, 290px"
            decoding="async"
          />
          <span className="exp-tag">Beach &amp; water</span>
          <span className="exp-caption">
            <span className="exp-copy">
              Easy beach time close to port — with room to get back calmly.
            </span>
          </span>
        </Link>

        <Link className="exp-card" href="/nassau-cruise-port-walking-distance" aria-label="Explore the Nassau port walking guide">
          <Image
            src="/images/shoreday/nassau/nassau-street.webp"
            alt="Cruise visitors walking a sunny, colorful street near the Nassau cruise port"
            width={640}
            height={480}
            sizes="(max-width: 600px) 88vw, (max-width: 1000px) 45vw, 290px"
            decoding="async"
          />
          <span className="exp-tag">Walkable</span>
          <span className="exp-caption">
            <span className="exp-copy">
              Know where to walk, what to skip, and when to head back.
            </span>
          </span>
        </Link>

        <Link className="exp-card" href={`${DIRECTORY_PATH}/food-drink`} aria-label="Explore Nassau food and drink">
          <Image
            src="/images/shoreday/nassau/bahamas-food.webp"
            alt="Bahamian cracked conch and fresh conch salad served beachside"
            width={640}
            height={480}
            sizes="(max-width: 600px) 88vw, (max-width: 1000px) 45vw, 290px"
            decoding="async"
          />
          <span className="exp-tag">Local food</span>
          <span className="exp-caption">
            <span className="exp-copy">
              Make room for local Bahamian food and a relaxed meal.
            </span>
          </span>
        </Link>

        <Link className="exp-card" href={`${DIRECTORY_PATH}/history-culture`} aria-label="Explore Nassau history and culture">
          <Image
            src="/images/shoreday/nassau/nassau-heritage.webp"
            alt="The Pirates of Nassau heritage museum in historic downtown Nassau"
            width={640}
            height={480}
            sizes="(max-width: 600px) 88vw, (max-width: 1000px) 45vw, 290px"
            decoding="async"
          />
          <span className="exp-tag">Heritage</span>
          <span className="exp-caption">
            <span className="exp-copy">
              Landmarks and shops on a simple route that fits your window.
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
