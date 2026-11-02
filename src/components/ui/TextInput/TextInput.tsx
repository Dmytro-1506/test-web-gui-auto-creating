import "./TextInput.css";

interface TextInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({
  id,
  label,
  placeholder,
  value,
  onChange,
}: TextInputProps) {
  return (
    <div className="text-input">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
