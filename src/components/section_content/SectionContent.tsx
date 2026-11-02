import { useState } from "react";

import { ToggleSwitch } from "../ui/ToggleSwitch/ToggleSwitch";
import { ColorPicker } from "../ui/ColorPicker/ColorPicker";
import { RangeSlider } from "../ui/RangeSlider/RangeSlider";
import { ActionButton } from "../ui/ActionButton/ActionButton";
import { TextInput } from "../ui/TextInput/TextInput";

import { configParams } from "../../config/esp32-web-config.json";

const menuItems = Object.values(configParams.menuItems).sort(
  (a, b) => a.position - b.position,
);

interface SectionContentProps {
  activeItem: string;
}

type ComponentType =
  | "textInput"
  | "button"
  | "toggleSwitch"
  | "colorPicker"
  | "rangeSlider";

type ComponentConfig = {
  type: ComponentType;
  id: string;
  label: string;
  size: number;
  position: number;
  action?: string;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  checked?: boolean;
  defaultValue?: string | number;
};

export function SectionContent({ activeItem }: SectionContentProps) {
  const sectionItemComponents = (menuItems.find(
    (item) => item.id === activeItem,
  )?.components || {}) as Record<string, ComponentConfig>;

  type ComponentValue = string | number | boolean;
  type SectionStates = Record<string, Record<string, ComponentValue>>;

  const [sectionStates, setSectionStates] = useState<SectionStates>({});

  const componentStates = sectionStates[activeItem] ?? {};

  function handleComponentChange(key: string, value: ComponentValue) {
    setSectionStates((previousStates) => ({
      ...previousStates,
      [activeItem]: {
        ...(previousStates[activeItem] ?? {}),
        [key]: value,
      },
    }));
  }

  return (
    <section className="app-section-content">
      {Object.values(sectionItemComponents).map(
        (component: ComponentConfig) => {
          switch (component.type) {
            case "textInput":
              return (
                <TextInput
                  key={component.id}
                  id={component.id}
                  label={component.label}
                  placeholder={component.placeholder ?? ""}
                  value={String(componentStates[component.id] ?? "")}
                  onChange={(value) =>
                    handleComponentChange(component.id, value)
                  }
                />
              );
            case "button":
              return (
                <ActionButton
                  label={component.label}
                  variant="primary"
                  onClick={() => {
                    if (component.action) {
                      // Handle the action
                    }
                  }}
                />
              );
            case "toggleSwitch":
              return (
                <ToggleSwitch
                  key={component.id}
                  id={component.id}
                  label={component.label}
                  checked={Boolean(componentStates[component.id] ?? false)}
                  onChange={(checked) =>
                    handleComponentChange(component.id, checked)
                  }
                />
              );
            case "colorPicker":
              return (
                <ColorPicker
                  key={component.id}
                  id={component.id}
                  label={component.label}
                  value={String(componentStates[component.id] ?? "#000000")}
                  onChange={(value) =>
                    handleComponentChange(component.id, value)
                  }
                />
              );
            case "rangeSlider":
              return (
                <RangeSlider
                  key={component.id}
                  id={component.id}
                  label={component.label}
                  value={Number(
                    componentStates[component.id] ?? component.min ?? 0,
                  )}
                  min={component.min ?? 0}
                  max={component.max ?? 100}
                  step={component.step ?? 1}
                  onChange={(value) =>
                    handleComponentChange(component.id, value)
                  }
                />
              );
          }
        },
      )}
    </section>
  );
}
