import { useMemo, useState } from "react";

import { useDevice } from "../../hooks/useDevice";
import { useCommand } from "../../hooks/useCommand";
import { useDevicePolling } from "../../hooks/useDevicePolling";

import { ActionButton } from "../ui/ActionButton/ActionButton";
import { CodeSnippet } from "../ui/CodeSnippet/CodeSnippet";
import { ColorPicker } from "../ui/ColorPicker/ColorPicker";
import { Container } from "../ui/Container/Container";
import { Dropdown } from "../ui/Dropdown/Dropdown";
import { RangeSlider } from "../ui/RangeSlider/RangeSlider";
import { TextInput } from "../ui/TextInput/TextInput";
import { ToggleSwitch } from "../ui/ToggleSwitch/ToggleSwitch";
import { InfoBox } from "../ui/InfoBox/InfoBox";

import { menuItems } from "../../config/appConfig";
import type { ComponentConfig } from "../../types";
import type { DeviceStatus } from "../../types/device/DeviceStatus.types";

import "./SectionContent.css";

interface SectionContentProps {
  activeItem: string;
}

type ComponentValue = string | number | boolean | string[];
type SectionStates = Record<string, Record<string, ComponentValue>>;

function getInitialValue(
  component: ComponentConfig,
): ComponentValue | undefined {
  switch (component.type) {
    case "toggleSwitch":
      return component.params.checked;

    case "button":
      return undefined;

    case "container":
      return component.params.defaultValue
        ? [component.params.defaultValue]
        : [];

    case "textInput":
    case "colorPicker":
    case "rangeSlider":
    case "dropdown":
    case "codeSnippet":
      return component.params.defaultValue;

    case "infoBox":
      return component.params.content;
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
  const params = component.params;

  // Not every component supports dependencies.
  if (!("dependency" in params)) {
    return false;
  }

  const dependency = params.dependency;

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
  const isDeviceOverview = activeItem === "deviceOverview";

  // Polling only while Device Overview is active.
  useDevicePolling(isDeviceOverview);

  const { deviceStatus, connected, loading, error, refreshStatus } =
    useDevice();

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

  function getDeviceInfoMessage(
    componentId: string,
    deviceStatus: DeviceStatus | null,
  ): string {
    if (!deviceStatus) {
      return "No device status available.";
    }

    switch (componentId) {
      case "displayOverview": {
        const display = deviceStatus.display;

        return [
          `Backlight: ${display.backlightEnabled ? "Enabled" : "Disabled"}`,
          `WiFi: ${display.wifiConnected ? "Connected" : "Disconnected"}`,
          `WiFi signal: ${display.wifiSignalStrength} dBm`,
          `Battery: ${display.batteryPercentage}%`,
          `Time: ${String(display.hours).padStart(2, "0")}:${String(display.minutes).padStart(2, "0")}`,
        ].join("\n");
      }

      case "ledOverview": {
        const led = deviceStatus.led;

        return [
          `Status: ${led.isOn ? "ON" : "OFF"}`,
          `RGB: ${led.red}, ${led.green}, ${led.blue}`,
          `Brightness: ${led.brightness}%`,
          `Color switching: ${led.effects.colorSwitching ? "Active" : "Inactive"}`,
          `Blinking: ${led.effects.blinking ? "Active" : "Inactive"}`,
          `Pulsing: ${led.effects.pulsing ? "Active" : "Inactive"}`,
          `Blink interval: ${led.blinkInterval} ms`,
          `Pulse interval: ${led.pulseInterval} ms`,
          `Color switch interval: ${led.colorSwitchInterval} ms`,
          `Colors: ${led.colorCount}`,
          `Current color index: ${led.currentColorIndex}`,
        ].join("\n");
      }

      case "soundOverview": {
        const sound = deviceStatus.sound;

        return [
          `Initialized: ${sound.initialized ? "Yes" : "No"}`,
          `Melody playing: ${sound.melodyPlaying ? "Yes" : "No"}`,
        ].join("\n");
      }

      case "buttonsSection": {
        const buttons = deviceStatus.buttons;

        return Object.entries(buttons)
          .map(([name, button]) => {
            const pressed = button.pressed
              ? "Pressed"
              : button.pressed === false
                ? "Released"
                : "Unknown";

            return [
              `${name.toUpperCase()}:`,
              `  State: ${pressed}`,
              `  Was pressed: ${button.wasPressed ?? "Unknown"}`,
              `  Pin: ${button.pin ?? "Unknown"}`,
            ].join("\n");
          })
          .join("\n\n");
      }

      case "systemInfo": {
        return [
          `Device: ${deviceStatus.device}`,
          `Connected: ${deviceStatus.connected ? "Yes" : "No"}`,
          `Signal strength: ${deviceStatus.signalStrength} dBm`,
          `Battery: ${deviceStatus.batteryPercentage}%`,
          `Battery voltage: ${deviceStatus.batteryVoltage} V`,
          `Mode: ${deviceStatus.mode}`,
          `Success: ${deviceStatus.success ? "Yes" : "No"}`,
          `Message: ${deviceStatus.message}`,
        ].join("\n");
      }

      default:
        return deviceStatus.message;
    }
  }

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
    // console.log("handleAction", { component, commandRef, allComponentValues });

    if (!commandRef) {
      console.error(`No commandRef configured for button: ${component.id}`);
      return;
    }

    try {
      if (commandRef === "getStatus") {
        await refreshStatus();
        return;
      }

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

      case "infoBox": {
        const isOverview = activeItem === "deviceOverview";

        const message = isOverview
          ? getDeviceInfoMessage(component.id, deviceStatus)
          : component.params.content;

        return (
          <InfoBox
            key={component.id}
            title={component.params.title}
            message={message}
            variant="info"
          />
        );
      }

      case "button":
        return (
          <ActionButton
            key={component.id}
            label={component.params.label}
            variant="primary"
            disabled={false}
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

      case "container": {
        const storedColors = componentStates[component.id];

        return (
          <Container
            key={component.id}
            id={component.id}
            label={component.params.label}
            value={
              Array.isArray(storedColors) ? (storedColors as string[]) : []
            }
            maxItems={component.params.maxItems}
            disabled={disabled}
            onChange={(updatedColors) =>
              handleComponentChange(component.id, updatedColors)
            }
          />
        );
      }
    }
  }

  const sortedComponents = Object.values(activeSection.components).sort(
    (a, b) => a.position - b.position,
  );

  return (
    <section className="app-section-content">
      <div className="app-section-content__status">
        <div className="app-section-content__status-header">
          <h2 className="app-section-content__status-title">Device status</h2>

          <span
            className={`app-section-content__connection ${
              connected
                ? "app-section-content__connection--connected"
                : "app-section-content__connection--disconnected"
            }`}
          >
            <span className="app-section-content__connection-dot" />
            {connected ? "ESP32 connected" : "ESP32 not connected"}
          </span>
        </div>

        {loading && (
          <p className="app-section-content__status-message">
            Device status is loading ...
          </p>
        )}

        {error && (
          <p className="app-section-content__status-message app-section-content__status-message--error">
            {error}
          </p>
        )}
      </div>

      <div className="app-section-content__grid">
        {sortedComponents.map((component) => (
          <div
            key={component.id}
            className={`app-section-content__component app-section-content__component--${component.type}`}
          >
            {renderComponent(component)}
          </div>
        ))}
      </div>
    </section>
  );
}
