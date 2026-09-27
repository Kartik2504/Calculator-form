import { createContext, useContext, useReducer } from 'react';

const initialState = {
  currentStep: 0,
  answers: {},
  errors: [],
  output: null,
};

const FormContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.value,
        },
        errors: state.errors.filter((id) => id !== action.questionId),
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: [],
      };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };

    case 'SET_OUTPUT':
      return {
        ...state,
        output: action.output,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useForm must be used within FormProvider');
  }

  return context;
}
