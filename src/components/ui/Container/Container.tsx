import "./Container.css";

interface ContainerProps {
  id: string;
  label: string;
  value: string[];
  maxItems: number;
  disabled?: boolean;
  onChange: (colors: string[]) => void;
}

export function Container({
  id,
  label,
  value,
  maxItems,
  disabled = false,
  onChange,
}: ContainerProps) {
  const canAddMore = value.length < maxItems;

  function handleAddColor() {
    if (!canAddMore || disabled) return;

    onChange([...value, "#FFFFFF"]);
  }

  function handleColorChange(index: number, color: string) {
    const updatedColors = value.map((currentColor, currentIndex) =>
      currentIndex === index ? color : currentColor,
    );

    onChange(updatedColors);
  }

  function handleRemoveColor(index: number) {
    if (disabled) return;

    onChange(value.filter((_, currentIndex) => currentIndex !== index));
  }

  return (
    <div className="colors-container">
      <label className="colors-container__label" id={`${id}-label`}>
        {label}
      </label>

      <div
        className="colors-container__control"
        id={id}
        role="group"
        aria-labelledby={`${id}-label`}
        aria-disabled={disabled}
      >
        {value.map((color, index) => (
          <div className="colors-container__item" key={`${id}-${index}`}>
            <span className="colors-container__item-label">
              Color {index + 1}
            </span>

            <input
              type="color"
              className="colors-container__color-picker"
              value={color}
              disabled={disabled}
              aria-label={`Color ${index + 1}`}
              onChange={(event) => handleColorChange(index, event.target.value)}
            />

            <span className="colors-container__color-value">
              {color.toUpperCase()}
            </span>

            <button
              type="button"
              className="colors-container__remove-button"
              aria-label={`Remove color ${index + 1}`}
              disabled={disabled}
              onClick={() => handleRemoveColor(index)}
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          className="colors-container__add-button"
          disabled={disabled || !canAddMore}
          onClick={handleAddColor}
        >
          + Add color
        </button>

        <span className="colors-container__counter">
          {value.length} / {maxItems} colors
        </span>
      </div>
    </div>
  );
}
