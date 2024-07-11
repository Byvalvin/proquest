// DualRangeSliderFilter.js
import React, { useState, useEffect } from 'react';
import styles from './DualRangeSliderFilter.module.css'; // Import CSS module for styling

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
    <div className={styles['double-slider-box']}>
      <h3 className={styles['range-title']}>{label}</h3>
      <div className={styles['range-slider']}>
        <span className={styles['slider-track']} style={{ left: `${((minValue - min) / (max - min)) * 100}%`, width: `${((maxValue - minValue) / (max - min)) * 100}%` }}></span>
        <input type="range" className={styles['min-val']} min={min} max={max} value={minValue} onChange={handleMinSliderChange} />
        <input type="range" className={styles['max-val']} min={min} max={max} value={maxValue} onChange={handleMaxSliderChange} />
        <div className={`${styles['tooltip']} ${styles['min-tooltip']}`}>{unit}{minValue}</div>
        <div className={`${styles['tooltip']} ${styles['max-tooltip']}`}>{unit}{maxValue}</div>
      </div>
      <div className={styles['input-box']}>
        <div className={styles['min-box']}>
          <div className={styles['input-wrap']}>
            <span className={styles['input-addon']}>{unit}</span>
            <input type="text" className={styles['input-field']} value={minValue} onChange={handleMinChange} />
          </div>
        </div>
        <div className={styles['max-box']}>
          <div className={styles['input-wrap']}>
            <span className={styles['input-addon']}>{unit}</span>
            <input type="text" className={styles['input-field']} value={maxValue} onChange={handleMaxChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualRangeSliderFilter;
