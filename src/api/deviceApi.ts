import { apiRequest } from "./apiRequest";
import { API_ENDPOINTS } from "./endpoints";

import type { DeviceStatus } from "../types/device/DeviceStatus.types";
import type { DeviceCommand } from "../types/api/DeviceCommand.types";
import type { ApiResponse } from "../types/api/ApiResponse.types";

export async function getDeviceStatus() {
  return apiRequest<DeviceStatus>(API_ENDPOINTS.STATUS);
}

export function sendDeviceCommand(
  command: DeviceCommand,
): Promise<ApiResponse> {
  return apiRequest<ApiResponse>(API_ENDPOINTS.COMMANDS, {
    method: "POST",
    body: JSON.stringify(command),
  });
}
