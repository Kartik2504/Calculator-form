import { useForm } from '../context/FormContext';
import PillSelect from './inputs/PillSelect';
import SliderInput from './inputs/SliderInput';

export default function QuestionRenderer({ question, value, onChange }) {
  const { state } = useForm();
  const hasError = state.errors.includes(question.id);

  const renderInput = () => {
    if (question.type === 'pill_select') {
      return <PillSelect question={question} value={value} onChange={onChange} />;
    }

    if (question.type === 'slider') {
      return <SliderInput question={question} value={value} onChange={onChange} />;
    }

    return null;
  };

  return (
    <div className="question-block">
      <label className={`question-label ${hasError ? 'question-label--error' : ''}`}>
        {question.label}
      </label>

      {hasError && <p className="question-error">Please select an answer to continue.</p>}

      {question.subtitle && <p className="question-subtitle">{question.subtitle}</p>}

      {renderInput()}
    </div>
  );
}
