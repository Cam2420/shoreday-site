interface FunnelProgressProps {
  current: number; // 1-based
  total: number;
  label?: string;
  showPercentage?: boolean;
}

/** Slim progress bar + "Step X of Y" label for the onboarding wizard. */
export default function FunnelProgress({
  current,
  total,
  label = "Step",
  showPercentage = false,
}: FunnelProgressProps) {
  const pct = Math.max(0, Math.min(100, Math.round((current / total) * 100)));
  return (
    <div className="fn-progress">
      <span className="fn-progress-question">
        {label} {current} of {total}
      </span>
      <div
        className="fn-progress-track"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`${label} ${current} of ${total}`}
      >
        <div className="fn-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="fn-progress-label">
        {showPercentage ? `${pct}%` : `${label} ${current} of ${total}`}
      </span>
    </div>
  );
}
