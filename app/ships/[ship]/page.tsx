import { notFound } from "next/navigation";
import { SHIP_GUIDES } from "@/data/ships";
import GuidePage from "@/components/marketing/GuidePage";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return SHIP_GUIDES.map((g) => ({ ship: g.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ ship: string }>;
}) {
  const { ship } = await params;
  const guide = SHIP_GUIDES.find((g) => g.slug === ship);
  if (!guide) notFound();
  return pageMetadata(guide.title, guide.description, `/ships/${guide.slug}`);
}
export default async function ShipPage({
  params,
}: {
  params: Promise<{ ship: string }>;
}) {
  const { ship } = await params;
  const guide = SHIP_GUIDES.find((g) => g.slug === ship);
  if (!guide) notFound();
  return <GuidePage guide={guide} ship={guide} />;
}
