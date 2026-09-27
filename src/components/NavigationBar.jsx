import { useForm } from '../context/FormContext';
import { computeOutput } from '../logic/computeOutput';
import formSchema from '../data/formSchema.json';

export default function NavigationBar() {
  const { state, dispatch } = useForm();
  const totalSteps = formSchema.steps.length;
  const isLastStep = state.currentStep === totalSteps - 1;

  const handleBack = () => {
    if (state.currentStep > 0) {
      dispatch({ type: 'CLEAR_ERRORS' });
      dispatch({ type: 'PREV_STEP' });
    }
  };

  const handleContinue = () => {
    const stepQuestions = formSchema.steps[state.currentStep].questions;
    const missingQuestions = stepQuestions.filter((question) => {
      const value = state.answers[question.id];
      return value === undefined || value === null || value === '';
    });

    if (missingQuestions.length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: missingQuestions.map((question) => question.id) });
      return;
    }

    dispatch({ type: 'CLEAR_ERRORS' });

    if (!isLastStep) {
      dispatch({ type: 'NEXT_STEP' });
      return;
    }

    dispatch({
      type: 'SET_OUTPUT',
      output: computeOutput(state.answers),
    });
  };

  return (
    <nav className="navigation-bar">
      <button
        type="button"
        className="nav-back"
        onClick={handleBack}
        disabled={state.currentStep === 0}
      >
        {state.currentStep === 0 ? '← Intro' : '← Back'}
      </button>

      <button type="button" className="nav-continue" onClick={handleContinue}>
        {isLastStep ? 'See Results →' : 'Continue →'}
      </button>
    </nav>
  );
}
