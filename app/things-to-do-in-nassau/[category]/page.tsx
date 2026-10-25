import { notFound } from "next/navigation";
import {
  DirectoryShell,
  DirectorySchema,
  CategoryNav,
  EntryCard,
  PlanningLinks,
  DirectoryCta,
} from "@/components/directory/Directory";
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_PATH,
  categoryBySlug,
  entriesInCategory,
} from "@/data/nassau-directory";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return DIRECTORY_CATEGORIES.map(({ slug }) => ({ category: slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  return pageMetadata(
    `${category.name} in Nassau: Cruise Visitor Guide | ShoreDay`,
    category.description,
    `${DIRECTORY_PATH}/${category.slug}`,
  );
}
export default async function NassauCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  const path = `${DIRECTORY_PATH}/${slug}`;
  const entries = entriesInCategory(category.slug);
  const crumbs = [
    { name: "Explore Nassau", path: DIRECTORY_PATH },
    { name: category.name, path },
  ];
  return (
    <DirectoryShell crumbs={crumbs}>
      <DirectorySchema
        title={`${category.name} in Nassau`}
        description={category.description}
        path={path}
        crumbs={crumbs}
        entries={entries}
      />
      <header className="directory-category-heading">
        <p className="section-kicker">Explore Nassau / {category.short}</p>
        <h1>
          {category.name}
          <br />
          in Nassau.
        </h1>
        <p className="directory-lead">{category.intro}</p>
        <p className="directory-count">
          {entries.length} places & ideas
        </p>
      </header>
      <CategoryNav current={slug} />
      <section
        aria-label={`${category.name} listings`}
        className={`directory-card-grid${slug === "events" ? " directory-topic-grid" : ""}`}
      >
        <h2 className="sr-only">{category.name} places and ideas</h2>
        {entries.map((entry) => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </section>
      <PlanningLinks />
      <DirectoryCta />
    </DirectoryShell>
  );
}
