import type { PartialResultView } from "@/lib/funnel-plan";
import TimingSummary from "./TimingSummary";

interface PartialResultCardProps {
  view: PartialResultView;
  disclaimer: string;
}

/** Claim-safe partial result: either the timing estimate or a friendly error. */
export default function PartialResultCard({ view, disclaimer }: PartialResultCardProps) {
  if (!view.valid) {
    return (
      <div className="fn-result fn-result-invalid" role="alert">
        <p>{view.invalidMessage}</p>
      </div>
    );
  }

  return (
    <div className="fn-result">
      <p className="fn-result-lead">
        Based on the times you entered, ShoreDay estimates{" "}
        <strong>{view.usableWindowLabel}</strong> of usable planning time.
      </p>
      <TimingSummary
        scheduledWindowLabel={view.scheduledWindowLabel}
        usableWindowLabel={view.usableWindowLabel}
        recommendedTerminalReturnLabel={view.recommendedTerminalReturnLabel}
      />
      {view.shortMessage ? <p className="fn-result-warn">{view.shortMessage}</p> : null}
      <p className="fn-result-disclaimer">{disclaimer}</p>
    </div>
  );
}
