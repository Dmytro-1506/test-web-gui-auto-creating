export interface DeviceCommand {
  type: "command";
  command: string;
  parameters: Record<string, unknown>;
}
