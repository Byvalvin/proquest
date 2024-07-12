import React, { useState, useEffect } from 'react';

const DualRangeSliderFilter = ({ label, min, max, range, onRangeChange, unit }) => {
  const [minValue, setMinValue] = useState(range[0]);
  const [maxValue, setMaxValue] = useState(range[1]);

  // Update component state if props change
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

  const handleMinSliderChange = (event) => {
    let value = parseInt(event.target.value);
    if (value > maxValue) {
      value = maxValue;
    }
    setMinValue(value);
    onRangeChange([value, maxValue]);
  };

  const handleMaxSliderChange = (event) => {
    let value = parseInt(event.target.value);
    if (value < minValue) {
      value = minValue;
    }
    setMaxValue(value);
    onRangeChange([minValue, value]);
  };

  return (
    <div className="dual-range-slider-container max-w-md mx-auto mb-8">
      <h3 className="range-title text-lg font-semibold mb-2">{label}</h3>
      <div className="range-slider relative bg-gray-300 h-8 rounded-full overflow-hidden">
        <span
          className="slider-track absolute bg-blue-500 h-full"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            width: `${((maxValue - minValue) / (max - min)) * 100}%`,
          }}
        ></span>
        <input
          type="range"
          className="min-slider absolute h-full appearance-none w-full bg-transparent"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinSliderChange}
        />
        <input
          type="range"
          className="max-slider absolute h-full appearance-none w-full bg-transparent"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxSliderChange}
        />
        <div className="tooltip min-tooltip absolute top-0 left-0 -mt-8 bg-blue-500 text-white px-2 py-1 text-xs rounded">
          {`${unit}${minValue}`}
        </div>
        <div className="tooltip max-tooltip absolute top-0 right-0 -mt-8 bg-blue-500 text-white px-2 py-1 text-xs rounded">
          {`${unit}${maxValue}`}
        </div>
      </div>
      <div className="input-box flex justify-between mt-2">
        <div className="min-box">
          <div className="input-wrap flex items-center">
            <span className="input-addon font-semibold">{unit}</span>
            <input
              type="text"
              className="input-field w-16 px-2 py-1 text-center border rounded"
              value={minValue}
              min={min}
              max={max}
              onChange={handleMinChange}
            />
          </div>
        </div>
        <div className="max-box">
          <div className="input-wrap flex items-center">
            <span className="input-addon font-semibold">{unit}</span>
            <input
              type="text"
              className="input-field w-16 px-2 py-1 text-center border rounded"
              value={maxValue}
              min={min}
              max={max}
              onChange={handleMaxChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualRangeSliderFilter;
