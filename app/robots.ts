import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/shoreday";
export default function robots(): MetadataRoute.Robots {
  // Don't disallow noindex pages: crawlers must be able to see their noindex tags.
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
