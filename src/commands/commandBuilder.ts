import type { DeviceCommand } from "../types/api/DeviceCommand.types";

import type {
  CommandDefinition,
  CommandTemplateValue,
  ComponentReference,
  ComponentValues,
  JsonValue,
} from "../types/commands/CommandConfig.types";

function isComponentReference(
  value: CommandTemplateValue,
): value is ComponentReference {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "$source" in value &&
    value.$source === "component"
  );
}

function transformValue(value: JsonValue, transform?: string): JsonValue {
  switch (transform) {
    case "booleanToState":
      if (typeof value !== "boolean") {
        throw new Error("Expected boolean value.");
      }

      return value ? "on" : "off";

    case "hexToRgb": {
      if (typeof value !== "string" || !/^#[0-9a-fA-F]{6}$/.test(value)) {
        throw new Error("Invalid HEX color value.");
      }

      return {
        red: parseInt(value.slice(1, 3), 16),
        green: parseInt(value.slice(3, 5), 16),
        blue: parseInt(value.slice(5, 7), 16),
      };
    }

    case "hexArrayToRgb": {
      if (!Array.isArray(value)) {
        throw new Error("hexArrayToRgb expects an array");
      }

      return value.map((color) => {
        if (typeof color !== "string" || !/^#[0-9a-fA-F]{6}$/.test(color)) {
          throw new Error(`Invalid hex color: ${color}`);
        }

        return {
          red: parseInt(color.slice(1, 3), 16),
          green: parseInt(color.slice(3, 5), 16),
          blue: parseInt(color.slice(5, 7), 16),
        };
      });
    }

    default:
      return value;
  }
}

function resolveValue(
  value: CommandTemplateValue,
  componentValues: ComponentValues,
): JsonValue {
  if (isComponentReference(value)) {
    const componentValue = componentValues[value.componentId];

    if (componentValue === undefined) {
      throw new Error(`Missing component value: ${value.componentId}`);
    }

    return transformValue(componentValue, value.transform);
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveValue(item, componentValues));
  }

  if (typeof value === "object" && value !== null) {
    const result: Record<string, JsonValue> = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      result[key] = resolveValue(nestedValue, componentValues);
    }

    return result;
  }

  return value;
}

export function buildCommand(
  definition: CommandDefinition,
  componentValues: ComponentValues,
): DeviceCommand {
  const parameters: Record<string, JsonValue> = {};

  for (const [key, value] of Object.entries(definition.parameters ?? {})) {
    parameters[key] = resolveValue(value, componentValues);
  }

  return {
    id: definition.id,
    type: definition.type,
    command: definition.command,
    parameters,
  };
}
