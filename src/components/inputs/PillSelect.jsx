export default function PillSelect({ question, value, onChange }) {
  return (
    <div className="pill-options">
      {question.options.map((option) => {
        const selected = value === option;

        return (
          <button
            key={option}
            type="button"
            className={`pill-option ${selected ? 'selected' : ''}`}
            onClick={() => onChange(question.id, option)}
            aria-pressed={selected}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
