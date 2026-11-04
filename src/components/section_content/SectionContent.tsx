import { useMemo, useState } from "react";

import { useDevice } from "../../hooks/useDevice";
import { useCommand } from "../../hooks/useCommand";

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
  const { connected, loading, error } = useDevice();

  const { createCommand, executeCommand } = useCommand();

  const [sectionStates, setSectionStates] =
    useState<SectionStates>(createInitialStates);

  const activeSection = menuItems.find((section) => section.id === activeItem);

  // Combine all section states for command parameter resolution.
  const allComponentValues = useMemo(
    () => Object.assign({}, ...Object.values(sectionStates)),
    [sectionStates],
  );

  if (!activeSection) {
    return null;
  }

  const componentStates = sectionStates[activeItem] ?? {};

  function handleComponentChange(componentId: string, value: ComponentValue) {
    setSectionStates((previousStates) => ({
      ...previousStates,
      [activeItem]: {
        ...previousStates[activeItem],
        [componentId]: value,
      },
    }));
  }

  async function handleAction(component: ComponentConfig) {
    if (
      component.type !== "button" ||
      component.params.action !== "sendCommand"
    ) {
      return;
    }

    const commandRef = component.params.commandRef;

    if (!commandRef) {
      console.error(`No commandRef configured for button: ${component.id}`);
      return;
    }

    try {
      const response = await executeCommand(commandRef, allComponentValues);

      console.log("Command sent successfully:", response);
    } catch (error) {
      console.error("Command execution failed:", error);
    }
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
            onClick={() => handleAction(component)}
          />
        );

      case "toggleSwitch":
        return (
          <ToggleSwitch
            key={component.id}
            id={component.id}
            label={component.params.label}
            checked={Boolean(
              componentStates[component.id] ?? component.params.checked,
            )}
            disabled={component.params.dependency ? disabled : false}
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

      case "codeSnippet": {
        const preview = createCommand(
          component.params.commandRef,
          allComponentValues,
        );

        return (
          <CodeSnippet
            key={component.id}
            id={component.id}
            label={component.params.label}
            language={component.params.language}
            value={JSON.stringify(preview, null, 2)}
            disabled={disabled}
          />
        );
      }
    }
  }

  return (
    <section className="app-section-content">
      <div>
        <h2>Device status</h2>

        {!connected && (
          <p className="connection-warning">ESP32 not connected</p>
        )}

        {loading && <p>Device status is loading ...</p>}

        {error && <p className="error-message">{error}</p>}
      </div>

      {Object.values(activeSection.components)
        .sort((a, b) => a.position - b.position)
        .map(renderComponent)}
    </section>
  );
}
