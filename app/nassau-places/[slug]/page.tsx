import Link from "next/link";
import { notFound } from "next/navigation";
import WhatsAppCta from "@/app/WhatsAppCta";
import {
  DirectoryShell,
  DirectorySchema,
  DirectoryPhoto,
  DirectorySources,
  EntryCard,
  PlanningLinks,
  DirectoryCta,
} from "@/components/directory/Directory";
import {
  DIRECTORY_PATH,
  PLACE_ENTRIES,
  categoryBySlug,
  entryPath,
} from "@/data/nassau-directory";
import { DIRECTORY_IMAGES } from "@/data/nassau-directory-images";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return PLACE_ENTRIES.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = PLACE_ENTRIES.find((item) => item.slug === slug);
  if (!entry) notFound();
  const photo = entry.image ? DIRECTORY_IMAGES[entry.image] : undefined;
  return pageMetadata(
    `${entry.name}, Nassau: Plan Your Visit | ShoreDay`,
    entry.description,
    entryPath(entry),
    photo
      ? {
          url: photo.src,
          alt: photo.alt,
          width: photo.width,
          height: photo.height,
        }
      : undefined,
  );
}
export default async function NassauPlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = PLACE_ENTRIES.find((item) => item.slug === slug);
  if (!entry) notFound();
  const category = categoryBySlug(entry.categories[0])!;
  const path = entryPath(entry);
  const crumbs = [
    { name: "Explore Nassau", path: DIRECTORY_PATH },
    { name: category.name, path: `${DIRECTORY_PATH}/${category.slug}` },
    { name: entry.name, path },
  ];
  const related = PLACE_ENTRIES.filter(
    (item) =>
      item.slug !== slug &&
      item.status === "listed" &&
      item.categories.some((cat) => entry.categories.includes(cat)),
  ).slice(0, 3);
  return (
    <DirectoryShell crumbs={crumbs}>
      <DirectorySchema
        title={`${entry.name}: plan your visit`}
        description={entry.description}
        path={path}
        crumbs={crumbs}
        place={entry}
      />
      <article>
        <header className="directory-place-heading">
          <p className="section-kicker">
            {category.name} / {entry.area}
          </p>
          <h1>{entry.name}</h1>
          <p className="directory-lead">{entry.description}</p>
          {entry.notice ? (
            <p className="directory-status directory-status-large">
              {entry.notice}
            </p>
          ) : null}
        </header>
        <div className="directory-place-layout">
          <div className="directory-place-visual">
            <DirectoryPhoto entry={entry} priority />
          </div>
          <aside className="directory-visit-card" aria-label="Visit information">
            <dl>
              <div>
                <dt>Where</dt>
                <dd>{entry.area}</dd>
              </div>
              <div>
                <dt>Time at the stop</dt>
                <dd>
                  {entry.visitSuggestion}
                  <small>
                    ShoreDay planning suggestion. Travel and queues are extra.
                  </small>
                </dd>
              </div>
              <div>
                <dt>Cost to check</dt>
                <dd>{entry.cost}</dd>
              </div>
            </dl>
            <WhatsAppCta
              surface="directory_place_plan"
              className="directory-primary directory-concierge-button"
            >
              Plan my visit
            </WhatsAppCta>
            <p className="directory-concierge-note">
              ShoreDay’s WhatsApp concierge helps you fit this stop into your
              cruise day, with time to get back to your ship.
            </p>
          </aside>
        </div>
        <div className="directory-visit-details">
          <section>
            <h2>Getting there from the cruise port</h2>
            <p>{entry.gettingThere}</p>
            <p>
              Use the street exit of Nassau Cruise Port as your starting point.
              Allow separately for walking from your ship, security and
              reboarding.{" "}
              <Link href="/nassau-all-aboard-time">
                Plan your return time →
              </Link>
            </p>
          </section>
          <section>
            <h2>Booking & access</h2>
            <p>{entry.booking}</p>
            {entry.access ? <p>{entry.access}</p> : null}
            <a
              className="directory-source-link"
              href={entry.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check visitor information ↗
            </a>
          </section>
        </div>
        <DirectorySources entry={entry} />
      </article>
      {related.length ? (
        <section className="directory-section" aria-labelledby="related-title">
          <div className="directory-section-heading">
            <p className="section-kicker">Keep exploring</p>
            <h2 id="related-title">More places for your shortlist.</h2>
          </div>
          <div className="directory-card-grid">
            {related.map((item) => (
              <EntryCard key={item.slug} entry={item} />
            ))}
          </div>
        </section>
      ) : null}
      <PlanningLinks />
      <DirectoryCta />
    </DirectoryShell>
  );
}
