import React, { useState } from "react";

const RangeSlider = ({min , max , step}) => {
  const [value, setValue] = useState(50);

 

  const handleSliderChange = (event) => {
    setValue(parseInt(event.target.value));
  };

  const renderStepLabels = () => {
    const numSteps = Math.floor((max - min) / step) + 1;
    const labels = [];

    for (let i = 0; i < numSteps; i++) {
      const stepValue = min + i * step;
      labels.push(
        <span
          key={stepValue}
          className={`step-label ${value === stepValue ? "active" : ""}`}
        >
          {stepValue}
        </span>
      );
    }

    return labels;
  };

  return (
    <div className="range-slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
      />
      <div className="step-labels">{renderStepLabels()}</div>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default RangeSlider;
