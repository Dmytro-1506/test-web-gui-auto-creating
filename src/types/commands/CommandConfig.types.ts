export type JsonPrimitive = string | number | boolean | null;

export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue };

export type ParameterTransform = "booleanToState" | "hexToRgb";

export interface ComponentReference {
  $source: "component";
  componentId: string;
  transform?: ParameterTransform;
}

export type CommandTemplateValue =
  | JsonPrimitive
  | ComponentReference
  | CommandTemplateValue[]
  | { [key: string]: CommandTemplateValue };

export interface CommandDefinition {
  id: string;
  type: "command";
  command: string;
  parameters?: Record<string, CommandTemplateValue>;
}

export type ComponentValues = Record<string, JsonValue>;

export type CommandRegistry = Record<string, CommandDefinition>;
