import "./ActionButton.css";

interface ActionButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  onClick: () => void;
}

export function ActionButton({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  type = "button",
  ariaLabel,
}: ActionButtonProps) {
  return (
    <button
      className={`action-button action-button--${variant}`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
