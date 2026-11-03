import "./Dropdown.css";

export interface DropdownOption {
  type: string;
  label: string;
}

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function Dropdown({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
}: DropdownProps) {
  return (
    <div className="dropdown">
      <label className="dropdown__label" htmlFor={id}>
        {label}
      </label>

      <select
        id={id}
        className="dropdown__select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.type} value={option.type}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
