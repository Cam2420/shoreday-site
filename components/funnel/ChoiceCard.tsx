interface ChoiceCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
}

/** Large, keyboard-accessible selectable card. `aria-pressed` conveys selection. */
export default function ChoiceCard({ label, description, selected, onSelect }: ChoiceCardProps) {
  return (
    <button
      type="button"
      className={`fn-choice${selected ? " is-selected" : ""}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="fn-choice-text">
        <span className="fn-choice-label">{label}</span>
        {description ? <span className="fn-choice-desc">{description}</span> : null}
      </span>
      <span className="fn-choice-check" aria-hidden="true">
        {selected ? "✓" : ""}
      </span>
    </button>
  );
}
