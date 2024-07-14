import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import './RDRSF.css'; // Ensure the correct path to your CSS file

const RDRSF = ({ label, min, max, range, onRangeChange, unit = '' }) => {
  const [minValue, setMinValue] = useState(range[0]);
  const [maxValue, setMaxValue] = useState(range[1]);

  // Update slider values when range prop changes
  useEffect(() => {
    setMinValue(range[0]);
    setMaxValue(range[1]);
  }, [range]);

  const handleMinChange = (event) => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) {
      value = min;
    } else if (value < min) {
      value = min;
    } else if (value > maxValue) {
      value = maxValue;
    }
    setMinValue(value);
    onRangeChange([value, maxValue]);
  };

  const handleMaxChange = (event) => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) {
      value = max;
    } else if (value > max) {
      value = max;
    } else if (value < minValue) {
      value = minValue;
    }
    setMaxValue(value);
    onRangeChange([minValue, value]);
  };

  const handleChange = (values) => {
    setMinValue(values[0]);
    setMaxValue(values[1]);
    onRangeChange(values);
  };

  return (
    <div className="horizontal-slider range-slider-container max-w-md mx-auto mb-8">
      <h3 className="range-title text-lg font-semibold mb-2">{label}</h3>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={[minValue, maxValue]}
        min={min}
        max={max}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        minDistance={10}
        onChange={handleChange}
      />
      <div className="input-box flex justify-between mt-2">
        <div className="input-wrap flex items-center">
          <span className="input-addon font-semibold">{unit}</span>
          <input
            type="number"
            className="input-field"
            value={minValue}
            min={min}
            max={max}
            onChange={handleMinChange}
          />
        </div>
        <div className="input-wrap flex items-center ml-4">
          <span className="input-addon font-semibold">{unit}</span>
          <input
            type="number"
            className="input-field"
            value={maxValue}
            min={min}
            max={max}
            onChange={handleMaxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RDRSF;
