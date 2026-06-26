import type { ReactNode } from "react";

interface FunnelStepShellProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  showBack?: boolean;
}

/** One onboarding step: title, body, and back/continue controls. */
export default function FunnelStepShell({
  title,
  children,
  onBack,
  onContinue,
  continueLabel = "Continue",
  continueDisabled = false,
  showBack = true,
}: FunnelStepShellProps) {
  return (
    <section className="fn-step" aria-labelledby="fn-step-title">
      <h2 id="fn-step-title" className="fn-step-title">
        {title}
      </h2>
      <div className="fn-step-body">{children}</div>
      <div className="fn-step-nav">
        {showBack ? (
          <button type="button" className="fn-btn fn-btn-ghost" onClick={onBack}>
            Back
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
        <button
          type="button"
          className="fn-btn fn-btn-primary"
          onClick={onContinue}
          disabled={continueDisabled}
        >
          {continueLabel}
        </button>
      </div>
    </section>
  );
}
