import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import HomeAnalytics from "@/app/HomeAnalytics";
import WhatsAppCta from "@/app/WhatsAppCta";
import ShoreDayWordmark from "@/components/brand/ShoreDayWordmark";
import StructuredData from "@/components/marketing/StructuredData";
import { SITE_URL } from "@/data/shoreday";
import { DIRECTORY_IMAGES } from "@/data/nassau-directory-images";
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_GUIDES,
  DIRECTORY_PATH,
  DIRECTORY_CHECKED_ON,
  categoryBySlug,
  entryPath,
  mapsUrl,
  type DirectoryEntry,
} from "@/data/nassau-directory";
import "@/app/home.css";
import "@/app/marketing.css";
import "@/app/directory.css";

type Crumb = { name: string; path: string };

export function DirectoryShell({
  children,
  crumbs,
}: {
  children: ReactNode;
  crumbs: Crumb[];
}) {
  return (
    <div className="home marketing directory">
      <HomeAnalytics />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="logo">
          <Image src="/logo_transparent.png" width={28} height={36} alt="" />
          <ShoreDayWordmark />
        </Link>
        <Link href={DIRECTORY_PATH} className="header-guide">
          Explore Nassau
        </Link>
        <WhatsAppCta surface="directory_header" className="nav-cta" />
      </header>
      <main id="content" className="directory-main">
        <nav className="directory-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">ShoreDay</Link>
          {crumbs.map((crumb, i) => (
            <span key={crumb.path}>
              <span aria-hidden="true"> / </span>
              {i === crumbs.length - 1 ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link href={crumb.path}>{crumb.name}</Link>
              )}
            </span>
          ))}
        </nav>
        {children}
      </main>
      <footer className="directory-footer">
        <ShoreDayWordmark />
        <p>
          Independent Nassau planning. Your ship’s official all-aboard time
          comes first.
        </p>
        <div>
          <Link href={DIRECTORY_PATH}>Explore Nassau</Link>
          <Link href="/#guides">Planning guides</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/concierge-terms">Concierge terms</Link>
        </div>
      </footer>
    </div>
  );
}

export function DirectorySchema({
  title,
  description,
  path,
  crumbs,
  entries,
  place,
}: {
  title: string;
  description: string;
  path: string;
  crumbs: Crumb[];
  entries?: DirectoryEntry[];
  place?: DirectoryEntry;
}) {
  const photo = place?.image ? DIRECTORY_IMAGES[place.image] : undefined;
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [{ name: "ShoreDay", path: "/" }, ...crumbs].map(
              (crumb, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: crumb.name,
                item: SITE_URL + crumb.path,
              }),
            ),
          },
          {
            "@type": place ? "WebPage" : "CollectionPage",
            "@id": SITE_URL + path,
            url: SITE_URL + path,
            name: title,
            description,
            dateModified: DIRECTORY_CHECKED_ON,
            inLanguage: "en",
            ...(place
              ? {
                  mainEntity: {
                    "@type": "Place",
                    "@id": `${SITE_URL}${path}#place`,
                    name: place.name,
                    description: place.description,
                    hasMap: mapsUrl(place),
                    ...(photo ? { image: SITE_URL + photo.src } : {}),
                  },
                }
              : {
                  mainEntity: {
                    "@type": "ItemList",
                    itemListElement: (entries ?? []).map((entry, i) => ({
                      "@type": "ListItem",
                      position: i + 1,
                      name: entry.name,
                      url: SITE_URL + entryPath(entry),
                    })),
                  },
                }),
          },
        ],
      }}
    />
  );
}

export function DirectoryPhoto({
  entry,
  priority = false,
}: {
  entry: DirectoryEntry;
  priority?: boolean;
}) {
  const photo = entry.image ? DIRECTORY_IMAGES[entry.image] : undefined;
  return (
    <figure
      className={`directory-photo${photo ? "" : " directory-photo-empty"}`}
    >
      {photo ? (
        <>
          <div className="directory-photo-frame">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 650px) 90vw, (max-width: 980px) 45vw, 600px"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : undefined}
            />
          </div>
          <figcaption>
            <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">
              {photo.author}
            </a>{" "}
            ·{" "}
            <a
              href={photo.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {photo.license}
            </a>
            {photo.captured ? ` · Photo: ${photo.captured}` : ""}.
            <details>
              <summary>Photo details</summary>
              <p>
                {photo.title}. {photo.changes}
              </p>
            </details>
          </figcaption>
        </>
      ) : (
        <div className="directory-photo-placeholder">
          <span aria-hidden="true">◇</span>
          <span>Photo coming soon</span>
        </div>
      )}
    </figure>
  );
}

export function CategoryNav({ current }: { current?: string }) {
  return (
    <nav
      className="directory-categories"
      aria-label="Explore Nassau by interest"
    >
      <Link href={DIRECTORY_PATH} aria-current={!current ? "page" : undefined}>
        All interests
      </Link>
      {DIRECTORY_CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`${DIRECTORY_PATH}/${category.slug}`}
          aria-current={current === category.slug ? "page" : undefined}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}

export function EntryCard({ entry }: { entry: DirectoryEntry }) {
  const category = categoryBySlug(entry.categories[0]);
  return (
    <article
      className="directory-card"
      id={entry.kind === "place" ? undefined : entry.slug}
    >
      {entry.kind === "place" ? <DirectoryPhoto entry={entry} /> : null}
      <div className="directory-card-body">
        <p className="directory-eyebrow">
          {category?.name} <span aria-hidden="true">/</span> {entry.area}
        </p>
        <h3>
          {entry.kind === "place" ? (
            <Link href={entryPath(entry)} prefetch={false}>
              {entry.name}
              <span aria-hidden="true"> ↗</span>
            </Link>
          ) : (
            entry.name
          )}
        </h3>
        {entry.notice ? (
          <p className="directory-status">{entry.notice}</p>
        ) : null}
        <p>{entry.description}</p>
        {entry.kind === "place" ? (
          <p className="directory-card-note">
            {entry.visitSuggestion} <span>ShoreDay planning suggestion.</span>
          </p>
        ) : (
          <>
            <p className="directory-card-note">{entry.booking}</p>
            <a
              className="directory-source-link"
              href={entry.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {entry.sources[0].title} ↗
            </a>
            <p className="directory-checked">
              Source checked October 24, 2026.
            </p>
          </>
        )}
      </div>
    </article>
  );
}

export function PlanningLinks() {
  return (
    <section
      className="directory-section"
      aria-labelledby="directory-guides-title"
    >
      <div className="directory-section-heading">
        <p className="section-kicker">Make it fit your port day</p>
        <h2 id="directory-guides-title">A little planning goes a long way.</h2>
      </div>
      <div className="directory-guide-grid">
        {DIRECTORY_GUIDES.map((guide) => (
          <Link href={`/${guide.slug}`} key={guide.slug}>
            <h3>
              {guide.title}
              <span aria-hidden="true"> ↗</span>
            </h3>
            <p>{guide.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DirectoryCta() {
  return (
    <aside className="directory-cta">
      <div>
        <p className="section-kicker">
          Bring your ideas. We’ll help with the plan.
        </p>
        <h2>Make Nassau fit your day.</h2>
        <p>
          Send your ship, Nassau date, group and official all-aboard time. We’ll
          help you put the stops together.
        </p>
        <p className="directory-offer">
          <strong>$9.99 once for your whole group.</strong> Food, rides,
          admission and tours cost extra.
        </p>
      </div>
      <WhatsAppCta surface="directory_plan" className="wa-button">
        Plan my Nassau day
      </WhatsAppCta>
    </aside>
  );
}

export function DirectorySources({ entry }: { entry: DirectoryEntry }) {
  return (
    <section className="directory-sources" aria-labelledby="sources-title">
      <h2 id="sources-title">Sources & visit notes</h2>
      <p>
        Details checked October 24, 2026. Opening, prices and access can change.
        Visit lengths are ShoreDay planning suggestions; they exclude travel and
        queues.
      </p>
      <ul>
        {entry.sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title} ↗
            </a>
            <span>{source.supports}</span>
          </li>
        ))}
      </ul>
      <p>
        Accessibility details are included only where a source confirms them. A
        missing detail does not establish step-free access. Your ship’s official
        all-aboard time remains final.
      </p>
    </section>
  );
}
