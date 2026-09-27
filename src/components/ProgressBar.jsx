import { useForm } from '../context/FormContext';
import schema from '../data/formSchema.json';

export default function ProgressBar() {
  const { state } = useForm();
  const total = schema.steps.length;
  const fillPct = Math.min(((state.currentStep + 1) / total) * 100, 100);

  return (
    <div className="progress-bar-wrapper" aria-label="Form progress">
      <div className="progress-bar-fill" style={{ width: `${fillPct}%` }} />
    </div>
  );
}
