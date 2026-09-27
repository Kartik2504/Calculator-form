import { FormProvider, useForm } from './context/FormContext';
import ProgressBar from './components/ProgressBar';
import StepRenderer from './components/StepRenderer';
import NavigationBar from './components/NavigationBar';
import OutputCard from './components/OutputCard';

function AppInner() {
  const { state } = useForm();

  if (state.output) {
    return <OutputCard output={state.output} />;
  }

  return (
    <>
      <ProgressBar />
      <main className="content-wrapper">
        <StepRenderer />
        <NavigationBar />
      </main>
    </>
  );
}

export default function App() {
  return (
    <FormProvider>
      <AppInner />
    </FormProvider>
  );
}
