import type { JsonValue } from "../commands/CommandConfig.types";

export interface DeviceCommand {
  id: string;
  type: "command";
  command: string;
  parameters: Record<string, JsonValue>;
}
