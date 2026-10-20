import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  SITE_URL,
  type Faq,
} from "@/data/shoreday";
export default function StructuredData({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function FaqSchema({ items }: { items: Faq[] }) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }}
    />
  );
}
export function OfferSchema() {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "ShoreDay",
            legalName: "VMAManagement LLC",
            url: SITE_URL,
            logo: `${SITE_URL}/shoreday_icon.png`,
            email: "support@shoredayapp.com",
          },
          {
            "@type": "Product",
            "@id": `${SITE_URL}/#concierge`,
            name: "ShoreDay Nassau Concierge",
            description:
              "Personal Nassau port-day plan, 17-page offline PDF kit and WhatsApp help through the end of your port day. One payment for one group, one WhatsApp number and one Nassau port call.",
            image: `${SITE_URL}/opengraph-image`,
            brand: { "@id": `${SITE_URL}/#organization` },
            offers: {
              "@type": "Offer",
              price: "15",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: SITE_URL,
              seller: { "@id": `${SITE_URL}/#organization` },
            },
          },
          {
            "@type": "SoftwareApplication",
            name: "ShoreDay",
            applicationCategory: "TravelApplication",
            operatingSystem: "iOS, Android",
            url: `${SITE_URL}/nassau-cruise-app`,
            installUrl: [APP_STORE_URL, PLAY_STORE_URL],
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      }}
    />
  );
}
export function BreadcrumbSchema({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ShoreDay",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: SITE_URL + path,
          },
        ],
      }}
    />
  );
}
