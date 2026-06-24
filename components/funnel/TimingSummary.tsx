interface TimingSummaryProps {
  scheduledWindowLabel: string;
  usableWindowLabel: string;
  recommendedTerminalReturnLabel?: string;
}

/** Compact timing read-out used in the partial result. */
export default function TimingSummary({
  scheduledWindowLabel,
  usableWindowLabel,
  recommendedTerminalReturnLabel,
}: TimingSummaryProps) {
  return (
    <dl className="fn-timing">
      {recommendedTerminalReturnLabel ? (
        <div className="fn-timing-item fn-timing-hero">
          <dt className="fn-timing-k">Back at the pier by</dt>
          <dd className="fn-timing-v">{recommendedTerminalReturnLabel}</dd>
        </div>
      ) : null}
      <div className="fn-timing-item">
        <dt className="fn-timing-k">Scheduled window</dt>
        <dd className="fn-timing-v">{scheduledWindowLabel}</dd>
      </div>
      <div className="fn-timing-item">
        <dt className="fn-timing-k">Usable planning time</dt>
        <dd className="fn-timing-v">{usableWindowLabel}</dd>
      </div>
    </dl>
  );
}
