import Image from "next/image";
import GooglePlacePhoto from "@/components/funnel/GooglePlacePhoto";
import type { WebItineraryCategory, WebItineraryStop } from "@/lib/nassau-web-itinerary";

function travelLabel(stop: WebItineraryStop) {
  if (!stop.travelMinutes) return null;
  const mode = stop.travelMode === 'taxi' ? 'Taxi' : stop.travelMode === 'drive' ? 'Drive' : stop.travelMode === 'bus' ? 'Bus' : 'Walk';
  return `${mode} ${stop.travelMinutes} min`;
}

// Per-category glyph for the intentional "Photo coming soon" placeholder. Gives
// unrelated stops a distinct look so the timeline never reuses one generic image.
const CATEGORY_FALLBACK_ICON: Record<WebItineraryCategory, string> = {
  Culture: "🏛️",
  Beach: "🏝️",
  Food: "🍽️",
  Nature: "🌿",
  Shopping: "🛍️",
  Return: "⚓",
};

interface ItineraryStopCardProps {
  stop: WebItineraryStop;
  index: number;
  preview?: boolean;
  /**
   * Only true on the unlocked, post-email timeline. Gates the (non-blocking)
   * Google Places photo enhancement — never set in preview/locked states.
   */
  enableGooglePlacePhoto?: boolean;
}

export default function ItineraryStopCard({
  stop,
  index,
  preview = false,
  enableGooglePlacePhoto = false,
}: ItineraryStopCardProps) {
  const trip = travelLabel(stop);
  const hasDetails = Boolean(stop.description || stop.safetyNote);
  const categorySlug = stop.category.toLowerCase();
  // Enhance only stops that lack an owned, place-true photo (those currently
  // showing the "Photo coming soon" placeholder). Owned/approved imagery is left
  // untouched to preserve image honesty.
  const showGooglePhoto = enableGooglePlacePhoto && !stop.imageSrc;

  return (
    <article className="np-stop-card" aria-label={`${stop.title} itinerary stop`}>
      <div className={`np-stop-thumb${stop.imageSrc ? "" : " np-stop-thumb-empty"}`}>
        {stop.imageSrc ? (
          <Image
            src={stop.imageSrc}
            alt={stop.imageAlt ?? `${stop.title} in Nassau`}
            fill
            sizes="(min-width: 760px) 180px, (min-width: 520px) 34vw, 100vw"
          />
        ) : (
          // Intentional placeholder — ShoreDay shows this rather than a generic
          // stand-in when no owned, place-true photo exists yet. See
          // lib/nassau-place-assets.ts and docs/assets/nassau-place-image-manifest.md.
          <div
            className={`np-stop-fallback np-stop-fallback-${categorySlug}`}
            role="img"
            aria-label={`Photo coming soon for ${stop.title}`}
          >
            <span className="np-stop-fallback-icon" aria-hidden="true">
              {CATEGORY_FALLBACK_ICON[stop.category]}
            </span>
            <span className="np-stop-fallback-cat" aria-hidden="true">
              {stop.category}
            </span>
            <span className="np-stop-fallback-soon" aria-hidden="true">
              Photo coming soon
            </span>
          </div>
        )}

        {showGooglePhoto ? (
          <GooglePlacePhoto
            assetKey={stop.assetKey}
            alt={stop.imageAlt ?? `${stop.title} in Nassau`}
          />
        ) : null}
      </div>

      <div className="np-stop-body">
        <div className="np-stop-heading">
          <span className="np-stop-index">{index + 1}</span>
          <div>
            <h3>{stop.title}</h3>
            <div className="np-stop-meta" aria-label="Stop details">
              <span className="np-stop-pill">{stop.category}</span>
              {trip ? <span className="np-travel-badge">{trip}</span> : null}
              {stop.rating ? <span className="np-rating">Rated {stop.rating.toFixed(1)}</span> : null}
            </div>
          </div>
        </div>

        {stop.description ? <p className="np-stop-description">{stop.description}</p> : null}

        <div className="np-stop-actions">
          {stop.directionsUrl ? (
            <a
              className="np-directions-link"
              href={stop.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions
            </a>
          ) : null}

          {hasDetails && !preview ? (
            <details className="np-stop-details">
              <summary>ShoreTip</summary>
              {stop.safetyNote ? <p>{stop.safetyNote}</p> : null}
            </details>
          ) : null}
        </div>
      </div>
    </article>
  );
}
