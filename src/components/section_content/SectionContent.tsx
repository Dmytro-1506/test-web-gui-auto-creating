import { useState } from "react";

import { ActionButton } from "../ui/ActionButton/ActionButton";
import { CodeSnippet } from "../ui/CodeSnippet/CodeSnippet";
import { ColorPicker } from "../ui/ColorPicker/ColorPicker";
import { Dropdown } from "../ui/Dropdown/Dropdown";
import { RangeSlider } from "../ui/RangeSlider/RangeSlider";
import { TextInput } from "../ui/TextInput/TextInput";
import { ToggleSwitch } from "../ui/ToggleSwitch/ToggleSwitch";

import { menuItems } from "../../config/appConfig";
import type { ComponentConfig } from "../../types";

interface SectionContentProps {
  activeItem: string;
}

type ComponentValue = string | number | boolean;
type SectionStates = Record<string, Record<string, ComponentValue>>;

function getInitialValue(
  component: ComponentConfig,
): ComponentValue | undefined {
  switch (component.type) {
    case "toggleSwitch":
      return component.params.checked;
    case "button":
      return undefined;
    case "textInput":
    case "colorPicker":
    case "rangeSlider":
    case "dropdown":
    case "codeSnippet":
      return component.params.defaultValue;
  }
}

function createInitialStates(): SectionStates {
  const states: SectionStates = {};

  for (const section of menuItems) {
    states[section.id] = {};

    for (const component of Object.values(section.components)) {
      const initialValue = getInitialValue(component);

      if (initialValue !== undefined) {
        states[section.id][component.id] = initialValue;
      }
    }
  }

  return states;
}

function isComponentDisabled(
  component: ComponentConfig,
  componentStates: Record<string, ComponentValue>,
): boolean {
  const dependency = component.params.dependency;

  if (!dependency || dependency === "general") {
    return false;
  }

  switch (dependency.condition) {
    case "checked":
      return componentStates[dependency.componentId] !== true;
    default:
      return false;
  }
}

export function SectionContent({ activeItem }: SectionContentProps) {
  const [sectionStates, setSectionStates] =
    useState<SectionStates>(createInitialStates);

  const activeSection = menuItems.find((section) => section.id === activeItem);

  if (!activeSection) {
    return null;
  }

  const componentStates = sectionStates[activeItem] ?? {};

  function handleComponentChange(componentId: string, value: ComponentValue) {
    setSectionStates((previousStates) => ({
      ...previousStates,
      [activeItem]: {
        ...(previousStates[activeItem] ?? {}),
        [componentId]: value,
      },
    }));
  }

  function renderComponent(component: ComponentConfig) {
    const disabled = isComponentDisabled(component, componentStates);

    switch (component.type) {
      case "textInput":
        return (
          <TextInput
            key={component.id}
            id={component.id}
            label={component.params.label}
            placeholder={component.params.placeholder ?? ""}
            value={String(componentStates[component.id] ?? "")}
            onChange={(value) => handleComponentChange(component.id, value)}
          />
        );

      case "button":
        return (
          <ActionButton
            key={component.id}
            label={component.params.label}
            variant="primary"
            disabled={disabled}
            onClick={() => {
              if (component.params.action) {
                // TODO: Dispatch the configured action through an action handler.
                console.log("Configured action:", component.params.action);
              }
            }}
          />
        );

      case "toggleSwitch":
        return (
          <ToggleSwitch
            key={component.id}
            id={component.id}
            label={component.params.label}
            checked={Boolean(componentStates[component.id] ?? false)}
            disabled={disabled}
            onChange={(checked) => handleComponentChange(component.id, checked)}
          />
        );

      case "colorPicker":
        return (
          <ColorPicker
            key={component.id}
            id={component.id}
            label={component.params.label}
            value={String(
              componentStates[component.id] ??
                component.params.defaultValue ??
                "#000000",
            )}
            disabled={disabled}
            onChange={(value) => handleComponentChange(component.id, value)}
          />
        );

      case "rangeSlider":
        return (
          <RangeSlider
            key={component.id}
            id={component.id}
            label={component.params.label}
            value={Number(
              componentStates[component.id] ?? component.params.min,
            )}
            min={component.params.min}
            max={component.params.max}
            step={component.params.step ?? 1}
            unit={component.params.unit ?? ""}
            disabled={disabled}
            onChange={(value) => handleComponentChange(component.id, value)}
          />
        );

      case "dropdown":
        return (
          <Dropdown
            key={component.id}
            id={component.id}
            label={component.params.label}
            options={component.params.options}
            value={String(
              componentStates[component.id] ??
                component.params.defaultValue ??
                "",
            )}
            disabled={disabled}
            onChange={(value) => handleComponentChange(component.id, value)}
          />
        );

      case "codeSnippet":
        return (
          <CodeSnippet
            key={component.id}
            id={component.id}
            label={component.params.label}
            language={component.params.language}
            value={String(
              componentStates[component.id] ?? component.params.defaultValue,
            )}
            disabled={disabled}
          />
        );
    }
  }

  return (
    <section className="app-section-content">
      {Object.values(activeSection.components)
        .sort((a, b) => a.position - b.position)
        .map(renderComponent)}
    </section>
  );
}
