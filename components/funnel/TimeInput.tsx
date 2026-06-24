interface TimeInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}

/** Labelled 24-hour time field, mobile-friendly via the native time picker. */
export default function TimeInput({ id, label, value, onChange, hint }: TimeInputProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className="fn-field">
      <label htmlFor={id} className="fn-label">
        {label}
      </label>
      <input
        id={id}
        type="time"
        className="fn-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={hintId}
      />
      {hint ? (
        <span id={hintId} className="fn-hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
