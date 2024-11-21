import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, initialMinValue, initialMaxValue, onChange }) => {
  const [minVal, setMinVal] = useState(initialMinValue);
  const [maxVal, setMaxVal] = useState(initialMaxValue);
  const minValRef = useRef(initialMinValue);
  const maxValRef = useRef(initialMaxValue);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const handleMinInputChange = (event) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
  };

  const handleMaxInputChange = (event) => {
    const value = Math.max(Number(event.target.value), minVal + 1);
    if (max >= value) {
      setMaxVal(value);
      maxValRef.current = value;
    } else {
      setMaxVal(max);
      maxValRef.current = max;
    }
  };

  return (
    <>
      <div className="slider__left-value"><input
        type="number"
        className="slider__left-input"
        value={minVal}
        onChange={handleMinInputChange}
        min={min}
        max={max - 1}
      /></div>
      <div className="slider__right-value"><input
        type="number"
        className="slider__right-input"
        value={maxVal}
        onChange={handleMaxInputChange}
        min={min + 1}
        max={max}
      /></div>
      <div className="containers">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />

        </div>
      </div>
    </>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  initialMinValue: PropTypes.number.isRequired,
  initialMaxValue: PropTypes.number.isRequired,
};

export default MultiRangeSlider;
