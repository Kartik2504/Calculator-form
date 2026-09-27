import { useForm } from '../context/FormContext';

export default function OutputCard({ output }) {
  const { dispatch } = useForm();

  const tierClass = {
    Advanced: 'advanced',
    Developing: 'developing',
    'Early Stage': 'early',
  }[output.tier] || 'early';

  return (
    <div className="output-wrapper">
      <div className={`output-tier-badge ${tierClass}`}>{output.tier}</div>

      <h1 className="output-title">{output.title}</h1>

      <p className="output-summary">{output.summary}</p>

      <hr className="output-divider" />

      <h3 className="output-rec-heading">Recommendations</h3>

      <ul className="output-rec-list">
        {output.recommendations.map((item) => (
          <li className="output-rec-item" key={item}>
            {item}
          </li>
        ))}
      </ul>

      <p className="output-score">Maturity Score: {output.score} / 14</p>

      <button
        type="button"
        className="output-restart"
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Start Over
      </button>
    </div>
  );
}
