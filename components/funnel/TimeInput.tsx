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
      <input
        id={id}
        type="time"
        className="fn-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
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
