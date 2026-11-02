import "./ColorPicker.css";

interface ColorPickerProps {
  id: string;
  label: string;
  value?: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

export function ColorPicker({
  id,
  label,
  value,
  onChange,
  disabled = false,
}: ColorPickerProps) {
  return (
    <div className="color-picker">
      <label className="color-picker__label" htmlFor={id}>
        {label}
      </label>
      <div className="color-picker__control">
        <input
          id={id}
          className="color-picker__input"
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
        />
        <span className="color-picker__value">
          {value && "HEX: " + value.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
