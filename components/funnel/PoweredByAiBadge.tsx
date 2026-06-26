interface PoweredByAiBadgeProps {
  label?: string;
}

// The web timeline is built from deterministic templates fitted to the cruiser's
// real ship times — it is NOT AI-generated, so the badge avoids an "AI"/"generated"
// claim and simply signals the plan is an illustrative sample, not a booked itinerary.
export default function PoweredByAiBadge({ label = "Sample plan" }: PoweredByAiBadgeProps) {
  return <span className="np-ai-badge">{label}</span>;
}
