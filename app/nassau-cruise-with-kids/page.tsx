import { guideBySlug } from "@/data/guides";
import GuidePage from "@/components/marketing/GuidePage";
import { pageMetadata } from "@/lib/seo";
const guide = guideBySlug("nassau-cruise-with-kids")!;
export const metadata = pageMetadata(
  guide.title,
  guide.description,
  "/" + guide.slug,
);
export default function Page() {
  return <GuidePage guide={guide} />;
}
