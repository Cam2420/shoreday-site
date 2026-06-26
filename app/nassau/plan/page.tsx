import type { Metadata } from "next";
import { parseMode } from "@/lib/funnel-plan";
import { isNassauPlanDeliveryConfigured } from "@/lib/kit-nassau-config";
import PlanBuilder from "./PlanBuilder";
import "./plan.css";

// Development route — keep out of search indexes until an SEO decision is approved.
export const metadata: Metadata = {
  title: { absolute: "Build Your Nassau Plan | ShoreDay" },
  description:
    "Answer a few quick questions and ShoreDay estimates your realistic Nassau port window — no app required to view your result.",
  alternates: { canonical: "/nassau/plan" },
  robots: { index: false, follow: false },
};

export default async function NassauPlanPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  // Server-side check: only enable email capture when Kit is fully wired for
  // delivery (API key + delivery sequence). Only this boolean reaches the client.
  return <PlanBuilder initialMode={parseMode(mode)} kitConfigured={isNassauPlanDeliveryConfigured()} />;
}
