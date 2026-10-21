/**
 * Canonical ShoreDay wordmark: "Shore" inherits the surrounding (navy) text
 * color and "Day" renders in the brand teal accent. Wordmark only — the brand
 * icon stays per-surface so each header keeps its own layout/spacing.
 *
 * Keeps the full name in one inline element so flex layouts apply their gap
 * between the icon and wordmark, never between "Shore" and "Day". Surface
 * accent rules target `.sd-day`; the surrounding text color stays inherited.
 */
export default function ShoreDayWordmark() {
  return (
    <span className="sd-wordmark">
      Shore<span className="sd-day">Day</span>
    </span>
  );
}
