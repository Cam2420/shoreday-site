import type { MetadataRoute } from "next";
import { GUIDES } from "@/data/guides";
import { SHIP_GUIDES } from "@/data/ships";
import { SITE_URL } from "@/data/shoreday";
export default function sitemap(): MetadataRoute.Sitemap {
  // Only canonical, indexable public pages; retain existing funnel noindex rules.
  return [
    "",
    ...GUIDES.map((g) => `/${g.slug}`),
    ...SHIP_GUIDES.map((g) => `/ships/${g.slug}`),
    "/concierge-terms",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: SITE_URL + path }));
}
