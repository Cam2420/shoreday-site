interface EmailGateCardProps {
  email: string;
  marketingConsent: boolean;
  onEmailChange: (value: string) => void;
  onMarketingToggle: (value: boolean) => void;
  onSubmit: () => void;
  submitted: boolean;
  devMessage: string;
  error?: string;
}

/**
 * Email-gate UI shell. The submit button IS the (separate) plan-delivery action;
 * marketing consent is an independent checkbox. This shell does NOT call Kit,
 * create any record, or imply external delivery happened — on submit it enters
 * a clearly labelled development-only state.
 */
export default function EmailGateCard({
  email,
  marketingConsent,
  onEmailChange,
  onMarketingToggle,
  onSubmit,
  submitted,
  devMessage,
  error,
}: EmailGateCardProps) {
  return (
    <div className="fn-gate">
      <h3 className="fn-gate-title">Unlock Your Full Nassau Plan</h3>
      <p className="fn-gate-sub">
        Unlock your Nassau timing, a simple port-day structure, and a safe next step
        for checking excursion availability.
      </p>

      <div className="fn-field">
        <label htmlFor="fn-email" className="fn-label">
          Email
          <span className="fn-req">
            {" "}
            Required<span className="fn-sr-only"> field</span>
          </span>
        </label>
        <input
          id="fn-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="fn-input"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "fn-gate-error" : undefined}
        />
      </div>

      <label className="fn-checkbox">
        <input
          type="checkbox"
          checked={marketingConsent}
          onChange={(e) => onMarketingToggle(e.target.checked)}
        />
        <span>Send me occasional ShoreDay tips and Nassau ideas (optional).</span>
      </label>

      {error ? (
        <p id="fn-gate-error" className="fn-gate-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="button" className="fn-btn fn-btn-primary fn-btn-block" onClick={onSubmit}>
        View my full plan
      </button>

      {submitted ? (
        <p className="fn-gate-dev" role="status">
          {devMessage}
        </p>
      ) : null}

      <p className="fn-gate-fineprint">
        Viewing your plan is a separate action from the optional marketing opt-in
        above. We won&rsquo;t add you to marketing unless you check the box.
      </p>
    </div>
  );
}
