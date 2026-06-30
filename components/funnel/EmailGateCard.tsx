interface EmailGateCardProps {
  /**
   * True when the server has a Kit API key configured. Drives whether we collect
   * an email (real save) or fall back to a truthful local-only reveal.
   */
  kitConfigured: boolean;
  email: string;
  marketingConsent: boolean;
  onEmailChange: (value: string) => void;
  onMarketingToggle: (value: boolean) => void;
  onSubmit: () => void;
  submitting?: boolean;
  error?: string;
}

/**
 * Email save gate.
 *
 * When Kit is configured server-side, this captures the email (a transactional
 * "save my plan" action) plus an OPTIONAL, separate marketing-tips consent, and
 * the submit POSTs to /api/kit/nassau-plan. When Kit is NOT configured, it falls
 * back to a truthful local-only reveal that collects no email — we never ask for
 * an email that would go nowhere.
 */
export default function EmailGateCard({
  kitConfigured,
  email,
  marketingConsent,
  onEmailChange,
  onMarketingToggle,
  onSubmit,
  submitting = false,
  error,
}: EmailGateCardProps) {
  if (!kitConfigured) {
    return (
      <div className="fn-gate">
        <h3 className="fn-gate-title">See your full Nassau plan</h3>
        <p className="fn-gate-sub">
          Your full plan lays out the timeline, return buffer, and Nassau options
          that fit your ship time.
        </p>

        <button type="button" className="fn-btn fn-btn-primary fn-btn-block" onClick={onSubmit}>
          Show My Full Plan
        </button>

        <p className="fn-gate-fineprint">
          Email saving is coming soon. You can view the full plan here for now.
        </p>
      </div>
    );
  }

  return (
    <div className="fn-gate">
      <h3 className="fn-gate-title">Unlock your full Nassau plan</h3>
      <p className="fn-gate-sub">
        Enter your email to unlock the full timeline now. We&rsquo;ll also send
        your Nassau Port Playbook with timing tips, taxi basics, and port-day
        recommendations so you can find it before you dock.
      </p>

      <div className="fn-field">
        <label htmlFor="fn-email" className="fn-label">
          Where should we send your Playbook?
          <span className="fn-sr-only"> Required field</span>
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
          disabled={submitting}
        />
      </div>

      <label className="fn-checkbox">
        <input
          type="checkbox"
          checked={marketingConsent}
          onChange={(e) => onMarketingToggle(e.target.checked)}
          disabled={submitting}
        />
        <span>Send me Nassau port-day tips, timing reminders, and excursion ideas before my cruise. Optional.</span>
      </label>

      {error ? (
        <p id="fn-gate-error" className="fn-gate-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        className="fn-btn fn-btn-primary fn-btn-block"
        onClick={onSubmit}
        disabled={submitting}
      >
        {submitting ? "Unlocking…" : "Unlock My Full Plan"}
      </button>

      <p className="fn-gate-fineprint">
        We&rsquo;ll email your return target and Nassau Playbook once. If you
        don&rsquo;t see it in your main inbox, check Promotions. Nassau tips only
        if you check the box.
      </p>
    </div>
  );
}
