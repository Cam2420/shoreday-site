import type { ReactNode } from "react";

interface FunnelStepShellProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  showBack?: boolean;
  /** Keep the title for screen readers (aria-labelledby) but hide it visually,
   *  e.g. when the surrounding page already shows a single branded heading. */
  hideTitle?: boolean;
  /** Optional content rendered inside the card above the title (e.g. progress
   *  bar or an intro block), so the step stays a single card. */
  header?: ReactNode;
}

/** One onboarding step: an optional header, title, and body inside a single
 *  card, followed by the back/continue controls as a sibling *outside* the card.
 *  Keeping the nav outside lets it sit in normal document flow beneath the card
 *  on mobile (no fixed bar overlapping the last answer). */
export default function FunnelStepShell({
  title,
  children,
  onBack,
  onContinue,
  continueLabel = "Continue",
  continueDisabled = false,
  showBack = true,
  hideTitle = false,
  header,
}: FunnelStepShellProps) {
  return (
    <>
      <section className="fn-step" aria-labelledby="fn-step-title">
        {header}
        <h2 id="fn-step-title" className={hideTitle ? "fn-step-title fn-sr-only" : "fn-step-title"}>
          {title}
        </h2>
        <div className="fn-step-body">{children}</div>
      </section>
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
    </>
  );
}
