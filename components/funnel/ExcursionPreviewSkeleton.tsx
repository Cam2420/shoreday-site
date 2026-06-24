/**
 * Neutral, locked placeholder for the three excursion matches. Intentionally uses
 * NO real titles, images, prices, or Book Now buttons — production excursion cards
 * appear only once the curated catalog reaches owner-approved production status.
 */
export default function ExcursionPreviewSkeleton() {
  return (
    <div className="fn-skel-wrap">
      <div className="fn-skel-grid" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div className="fn-skel-card" key={i}>
            <div className="fn-skel-img" />
            <div className="fn-skel-line" />
            <div className="fn-skel-line short" />
            <div className="fn-skel-chip" />
          </div>
        ))}
      </div>
      <p className="fn-skel-note">
        Three excursion matches that fit your window will appear here once your plan
        is unlocked.
      </p>
      <p className="fn-affiliate-disclosure">
        Disclosure: excursion matches link to Viator, and ShoreDay may earn a
        commission if you book through one of those links. It doesn&rsquo;t change
        the price you pay.
      </p>
    </div>
  );
}
