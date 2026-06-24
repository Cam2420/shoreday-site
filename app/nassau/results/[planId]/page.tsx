import type { Metadata } from "next";
import PrototypeResult from "./PrototypeResult";
import "./results.css";

// Prototype-only route — keep out of search indexes.
export const metadata: Metadata = {
  title: { absolute: "Your Nassau Plan | ShoreDay" },
  description: "Your saved Nassau port-day plan.",
  robots: { index: false, follow: false },
};

export default async function NassauResultPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  return <PrototypeResult planId={planId} />;
}
