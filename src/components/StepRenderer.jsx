import { useForm } from '../context/FormContext';
import formSchema from '../data/formSchema.json';
import QuestionRenderer from './QuestionRenderer';

export default function StepRenderer() {
  const { state, dispatch } = useForm();
  const step = formSchema.steps[state.currentStep];
  const totalSteps = formSchema.steps.length;

  const handleAnswer = (questionId, value) => {
    dispatch({ type: 'SET_ANSWER', questionId, value });
  };

  return (
    <section className="step-renderer">
      <div className="step-counter">Step {step.stepNumber} / {String(totalSteps).padStart(2, '0')}</div>

      <h1 className="step-heading">{step.heading}</h1>

      {step.subtitle && <p className="step-subtitle">{step.subtitle}</p>}

      {step.questions.map((question) => (
        <QuestionRenderer
          key={question.id}
          question={question}
          value={state.answers[question.id]}
          onChange={handleAnswer}
        />
      ))}
    </section>
  );
}
