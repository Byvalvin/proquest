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
    <div className="dual-range-slider-container">
      <h3 className="range-title">{label}</h3>
      <div className="range-slider">
        <div className="slider-track" style={{ left: `${((minValue - min) / (max - min)) * 100}%`, width: `${((maxValue - minValue) / (max - min)) * 100}%` }}></div>
        <input type="range" className="min-slider" min={min} max={max} value={minValue} onChange={handleMinSliderChange} />
        <input type="range" className="max-slider" min={min} max={max} value={maxValue} onChange={handleMaxSliderChange} />
        <div className="tooltip min-tooltip">${minValue}</div>
        <div className="tooltip max-tooltip">${maxValue}</div>
      </div>
      <div className="input-box">
        <div className="min-box">
          <div className="input-wrap">
            <span className="input-addon">{unit}</span>
            <input type="text" className="input-field min-input" value={minValue} onChange={handleMinChange} />
          </div>
        </div>
        <div className="max-box">
          <div className="input-wrap">
            <span className="input-addon">{unit}</span>
            <input type="text" className="input-field max-input" value={maxValue} onChange={handleMaxChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualRangeSliderFilter;
