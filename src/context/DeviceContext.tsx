import { createContext } from "react";

import type { DeviceStatus } from "../types/api/DeviceStatus.types";
import type { DeviceCommand } from "../types/api/DeviceCommand.types";
import type { ApiResponse } from "../types/api/ApiResponse.types";

export interface DeviceContextValue {
  deviceStatus: DeviceStatus | null;
  connected: boolean;
  loading: boolean;
  sending: boolean;
  error: string | null;
  lastUpdated: Date | null;

  refreshStatus: () => Promise<void>;
  sendCommand: (command: DeviceCommand) => Promise<ApiResponse>;
}

export const DeviceContext = createContext<DeviceContextValue | null>(null);
