import { guideBySlug } from "@/data/guides";
import GuidePage from "@/components/marketing/GuidePage";
import { pageMetadata } from "@/lib/seo";
const guide = guideBySlug("is-nassau-worth-getting-off-the-ship")!;
export const metadata = pageMetadata(
  guide.title,
  guide.description,
  "/" + guide.slug,
);
export default function Page() {
  return <GuidePage guide={guide} />;
}
