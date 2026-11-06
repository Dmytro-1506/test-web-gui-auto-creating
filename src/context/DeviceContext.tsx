import { createContext } from "react";

import type { DeviceStatus } from "../types/device/DeviceStatus.types";
import type { DeviceCommand } from "../types/api/DeviceCommand.types";
import type { ApiResponse } from "../types/api/ApiResponse.types";

export interface DeviceContextValue {
  /** Last successfully received status snapshot from the ESP32. */
  deviceStatus: DeviceStatus | null;
  /** True when the latest status request succeeded. */
  connected: boolean;
  loading: boolean;
  sending: boolean;
  error: string | null;
  lastUpdated: Date | null;

  refreshStatus: () => Promise<void>;
  sendCommand: (command: DeviceCommand) => Promise<ApiResponse>;
}

export const DeviceContext = createContext<DeviceContextValue | null>(null);
