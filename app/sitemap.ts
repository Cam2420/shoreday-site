import type { MetadataRoute } from "next";
import { GUIDES } from "@/data/guides";
import { SHIP_GUIDES } from "@/data/ships";
import { SITE_URL } from "@/data/shoreday";
import {
  DIRECTORY_PATH,
  DIRECTORY_CATEGORIES,
  PLACE_ENTRIES,
  entryPath,
} from "@/data/nassau-directory";
export default function sitemap(): MetadataRoute.Sitemap {
  // Only canonical, indexable public pages; retain existing funnel noindex rules.
  return [
    "",
    ...GUIDES.map((g) => `/${g.slug}`),
    ...SHIP_GUIDES.map((g) => `/ships/${g.slug}`),
    "/concierge-terms",
    "/privacy",
    "/terms",
    DIRECTORY_PATH,
    ...DIRECTORY_CATEGORIES.map(
      (category) => `${DIRECTORY_PATH}/${category.slug}`,
    ),
    ...PLACE_ENTRIES.map(entryPath),
  ].map((path) => ({ url: SITE_URL + path }));
}
