import type { Metadata } from "next";
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

export default function NassauPlanPage() {
  return <PlanBuilder />;
}
