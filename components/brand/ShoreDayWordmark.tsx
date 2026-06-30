/**
 * Canonical ShoreDay wordmark: "Shore" inherits the surrounding (navy) text
 * color and "Day" renders in the brand teal accent. Wordmark only — the brand
 * icon stays per-surface so each header keeps its own layout/spacing.
 *
 * Renders a fragment (bare "Shore" text + a single accent span) so existing
 * surface rules like `.home .logo span` / `.nl-logo span` keep styling "Day"
 * via specificity; the `.sd-day` class in globals.css is the shared default
 * (used where a surface has no override, e.g. the Nassau planner header).
 */
export default function ShoreDayWordmark() {
  return (
    <>
      Shore<span className="sd-day">Day</span>
    </>
  );
}
