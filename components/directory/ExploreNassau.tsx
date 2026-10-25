import Link from "next/link";
import { DIRECTORY_CATEGORIES, DIRECTORY_PATH } from "@/data/nassau-directory";

export default function ExploreNassau() {
  return (
    <section
      className="section-wrap explore-nassau"
      aria-labelledby="explore-nassau-title"
    >
      <div>
        <p className="section-kicker">Find your kind of Nassau</p>
        <h2 id="explore-nassau-title">
          A beach. A good lunch.
          <br />A little local history.
        </h2>
        <p>
          Explore places to visit, then shape the day around your ship’s time.
          Find location, access and booking notes before you set off.
        </p>
        <Link href={DIRECTORY_PATH} className="text-link">
          Explore things to do in Nassau →
        </Link>
      </div>
      <nav aria-label="Nassau experience categories">
        {DIRECTORY_CATEGORIES.map((category) => (
          <Link href={`${DIRECTORY_PATH}/${category.slug}`} key={category.slug}>
            <span>{category.name}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
