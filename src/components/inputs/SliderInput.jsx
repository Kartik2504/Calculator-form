import { useEffect, useRef, useState } from 'react';
import { useForm } from '../../context/FormContext';

export default function SliderInput({ question }) {
  const { state, dispatch } = useForm();
  const value = state.answers[question.id] ?? question.default;
  const trackRef = useRef(null);
  const [bubbleLeft, setBubbleLeft] = useState('50%');

  function updateBubble(val) {
    const min = question.min;
    const max = question.max;
    const pct = ((val - min) / (max - min)) * 100;
    const thumbRadius = 9;

    if (trackRef.current) {
      const width = trackRef.current.offsetWidth;
      const px = (pct / 100) * (width - thumbRadius * 2) + thumbRadius;
      setBubbleLeft(`${px}px`);
    }
  }

  useEffect(() => {
    updateBubble(value);
  }, [value, question.min, question.max]);

  function handleChange(e) {
    const val = Number(e.target.value);
    dispatch({ type: 'SET_ANSWER', questionId: question.id, value: val });
    updateBubble(val);
  }

  const displayValue = question.unit ? `${value}${question.unit}` : `${value}`;

  return (
    <div className="slider-wrapper" ref={trackRef}>
      <span className="slider-value-bubble" style={{ left: bubbleLeft }}>
        {displayValue}
      </span>
      <input
        type="range"
        min={question.min}
        max={question.max}
        step="1"
        value={value}
        onChange={handleChange}
      />
      <div className="slider-labels">
        <span className="slider-label-text">{question.minLabel}</span>
        <span className="slider-label-text">{question.maxLabel}</span>
      </div>
    </div>
  );
}
