import type { Metadata } from "next";
import { SITE_URL } from "@/data/shoreday";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: { url: string; alt: string; width: number; height: number },
): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "ShoreDay",
      type: "website",
      images: [
        {
          url: image?.url ?? "/opengraph-image",
          width: image?.width ?? 1200,
          height: image?.height ?? 630,
          alt: image?.alt ?? "ShoreDay — Your Nassau day, in one WhatsApp chat",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${image?.url ?? "/opengraph-image"}`],
    },
  };
}
