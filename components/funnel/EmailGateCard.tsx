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
 * create any record, or claim an email was sent — on submit it enters a clearly
 * labelled development-only state.
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
        Save your timing, basic itinerary and excursion matches, and receive a link
        you can reopen later.
      </p>

      <div className="fn-field">
        <label htmlFor="fn-email" className="fn-label">
          Email
        </label>
        <input
          id="fn-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="fn-input"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
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
        Save my plan &amp; email me a link
      </button>

      {submitted ? (
        <p className="fn-gate-dev" role="status">
          {devMessage}
        </p>
      ) : null}

      <p className="fn-gate-fineprint">
        Saving your plan is a separate action from the optional marketing opt-in
        above. We won&rsquo;t add you to marketing unless you check the box.
      </p>
    </div>
  );
}
