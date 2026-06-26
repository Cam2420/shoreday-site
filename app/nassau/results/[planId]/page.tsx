import { redirect } from "next/navigation";

// Legacy prototype route. The funnel now computes the timing result and reveals
// the full plan IN PLACE on /nassau/plan, so this saved-result route is retired.
// It previously rendered placeholder location cards with generic Nassau photos;
// to avoid any misleading imagery it now redirects to the canonical planner.
export default function NassauResultPage() {
  redirect("/nassau/plan");
}
