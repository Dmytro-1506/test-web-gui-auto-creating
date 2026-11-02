import "./RangeSlider.css";

interface RangeSliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function RangeSlider({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  disabled = false,
}: RangeSliderProps) {
  return (
    <div className="range-slider">
      <div className="range-slider__header">
        <label className="range-slider__label" htmlFor={id}>
          {label}
        </label>
        <output className="range-slider__value" htmlFor={id}>
          {value}
          {unit}
        </output>
      </div>
      <input
        id={id}
        className="range-slider__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        disabled={disabled}
      />
      <div className="range-slider__limits" aria-hidden="true">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
