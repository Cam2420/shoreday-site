interface FunnelProgressProps {
  current: number; // 1-based
  total: number;
}

/** Slim progress bar + "Step X of Y" label for the onboarding wizard. */
export default function FunnelProgress({ current, total }: FunnelProgressProps) {
  const pct = Math.max(0, Math.min(100, Math.round((current / total) * 100)));
  return (
    <div className="fn-progress">
      <div
        className="fn-progress-track"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${current} of ${total}`}
      >
        <div className="fn-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="fn-progress-label">
        Step {current} of {total}
      </span>
    </div>
  );
}
