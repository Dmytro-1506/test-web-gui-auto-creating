import './ToggleSwitch.css'

interface ToggleSwitchProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function ToggleSwitch({ id, label, checked, onChange, disabled = false }: ToggleSwitchProps) {
  return (
    <label className={`toggle-switch ${disabled ? 'toggle-switch--disabled' : ''}`} htmlFor={id}>
      <span className="toggle-switch__label">{label}</span>
      <input
        id={id}
        className="toggle-switch__input"
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
      />
      <span className="toggle-switch__track" aria-hidden="true">
        <span className="toggle-switch__thumb" />
      </span>
    </label>
  )
}
