import ItineraryStopCard from "@/components/funnel/ItineraryStopCard";
import ItineraryTimeChip from "@/components/funnel/ItineraryTimeChip";
import type { WebItineraryStop } from "@/lib/nassau-web-itinerary";

interface ItineraryTimelineProps {
  stops: WebItineraryStop[];
  lockedTeaser?: string;
  compact?: boolean;
}

export default function ItineraryTimeline({
  stops,
  lockedTeaser,
  compact = false,
}: ItineraryTimelineProps) {
  return (
    <div className={`np-itinerary-timeline${compact ? " is-compact" : ""}`}>
      {stops.map((stop, index) => (
        <div className="np-itinerary-row" key={stop.id}>
          <div className="np-itinerary-time">
            <ItineraryTimeChip timeLabel={stop.timeLabel} />
          </div>
          <ItineraryStopCard stop={stop} index={index} preview={compact} />
        </div>
      ))}

      {lockedTeaser ? (
        <div className="np-itinerary-row np-itinerary-row-locked">
          <div className="np-itinerary-time">
            <span className="np-time-chip np-time-chip-muted">Locked</span>
          </div>
          <div className="np-locked-timeline-card" aria-label="Locked plan preview">
            <span className="np-lock-badge">Full timeline</span>
            <p>{lockedTeaser}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
