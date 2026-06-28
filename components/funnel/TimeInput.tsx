interface TimeInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  error?: string;
}

/** Labelled 24-hour time field with required + error semantics for a11y. */
export default function TimeInput({
  id,
  label,
  value,
  onChange,
  hint,
  required = false,
  error,
}: TimeInputProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="fn-field">
      <label htmlFor={id} className="fn-label">
        {label}
        {required ? (
          <span className="fn-req">
            {" "}
            Required<span className="fn-sr-only"> field</span>
          </span>
        ) : null}
      </label>
      <span className="fn-input-wrap">
        <svg
          className="fn-input-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 7.5V12l3 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          id={id}
          type="time"
          className="fn-input fn-input-iconed"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      </span>
      {hint ? (
        <span id={hintId} className="fn-hint">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="fn-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
