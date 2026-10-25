import Link from "next/link";
import {
  DirectoryShell,
  DirectorySchema,
  DirectoryPhoto,
  CategoryNav,
  EntryCard,
  PlanningLinks,
  DirectoryCta,
} from "@/components/directory/Directory";
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_PATH,
  PUBLISHED_ENTRIES,
  PLACE_ENTRIES,
  entriesInCategory,
} from "@/data/nassau-directory";
import { pageMetadata } from "@/lib/seo";

const title = "Things to Do in Nassau for Cruise Visitors | ShoreDay";
const description =
  "Explore Nassau beaches, restaurants, museums, art and activities. Find location, access and booking notes to help plan your cruise port day.";
export const metadata = pageMetadata(title, description, DIRECTORY_PATH);

export default function NassauDirectoryPage() {
  const crumbs = [{ name: "Explore Nassau", path: DIRECTORY_PATH }];
  const hero = PLACE_ENTRIES.find(
    (entry) => entry.slug === "john-watlings-distillery",
  )!;
  return (
    <DirectoryShell crumbs={crumbs}>
      <DirectorySchema
        title={title}
        description={description}
        path={DIRECTORY_PATH}
        crumbs={crumbs}
        entries={PUBLISHED_ENTRIES}
      />
      <section className="directory-hero">
        <div>
          <p className="section-kicker">Your day ashore, your kind of Nassau</p>
          <h1>
            Things to do
            <br />
            in Nassau.
          </h1>
          <p className="directory-lead">
            A beach morning. A Bahamian lunch. A walk through history. Find the
            places that interest you, with the practical details to help make
            them fit.
          </p>
          <a className="directory-primary" href="#browse-interests">
            Find your next stop <span aria-hidden="true">↓</span>
          </a>
          <p className="directory-hero-note">
            Built for cruise visitors. Useful before you sail.
          </p>
        </div>
        <div className="directory-hero-image">
          <DirectoryPhoto entry={hero} priority />
          <Link
            href="/nassau-places/john-watlings-distillery"
            className="directory-image-link"
          >
            An afternoon at John Watling’s <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section
        className="directory-section directory-browse"
        id="browse-interests"
        aria-labelledby="interests-title"
      >
        <div className="directory-section-heading">
          <p className="section-kicker">Start with what you enjoy</p>
          <h2 id="interests-title">Which way will your day go?</h2>
        </div>
        <div className="directory-interest-grid">
          {DIRECTORY_CATEGORIES.map((category, i) => (
            <Link
              key={category.slug}
              href={`${DIRECTORY_PATH}/${category.slug}`}
            >
              <span className="directory-interest-number" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3>{category.name}</h3>
                <p>{category.short}</p>
                <small>
                  {entriesInCategory(category.slug).length} places & ideas
                </small>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="directory-section" aria-labelledby="featured-title">
        <div className="directory-section-heading">
          <p className="section-kicker">A few places to begin</p>
          <h2 id="featured-title">Get to know Nassau.</h2>
          <p>
            Choose a stop, check the details, then leave room for the journey
            back.
          </p>
        </div>
        <div className="directory-card-grid">
          {PLACE_ENTRIES.filter((entry) => entry.featured).map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>
      <div className="directory-editorial-note">
        <strong>A useful starting point, checked with care.</strong>
        <p>
          Original ShoreDay descriptions with linked visitor sources. Last
          checked October 24, 2026. Confirm current opening and access before
          you go; no listing promises live availability.
        </p>
      </div>
      <PlanningLinks />
      <DirectoryCta />
      <CategoryNav />
    </DirectoryShell>
  );
}
