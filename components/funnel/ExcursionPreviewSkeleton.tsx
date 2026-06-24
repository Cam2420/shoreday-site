/**
 * Neutral, locked placeholder for the excursion-availability step. Intentionally
 * uses NO real titles, images, prices, ratings, availability, or purchase CTA,
 * and promises no specific number of matches. Real excursion cards appear only
 * once a production-safe catalog exists.
 */
export default function ExcursionPreviewSkeleton() {
  return (
    <div className="fn-skel-wrap">
      <div className="fn-skel-card" aria-hidden="true">
        <div className="fn-skel-img" />
        <div className="fn-skel-line" />
        <div className="fn-skel-line short" />
        <div className="fn-skel-chip" />
      </div>
      <p className="fn-skel-note">
        A safe next step for checking Nassau excursion availability appears once your
        plan is unlocked.
      </p>
      <p className="fn-affiliate-disclosure">
        Disclosure: excursion availability is checked via Viator, and ShoreDay may
        earn a commission if you book through a Viator link. It doesn&rsquo;t change
        the price you pay.
      </p>
    </div>
  );
}
