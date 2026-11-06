import { useState, useCallback, useMemo, useRef } from "react";

import { getDeviceStatus, sendDeviceCommand } from "../api/deviceApi";
import { DeviceContext } from "./DeviceContext";

import type { DeviceContextValue } from "./DeviceContext";
import type { DeviceStatus } from "../types/device/DeviceStatus.types";
import type { DeviceCommand } from "../types/api/DeviceCommand.types";
import type { ApiResponse } from "../types/api/ApiResponse.types";

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus | null>(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Keep refreshStatus stable so useDevicePolling does not restart on every update.
  const hasCompletedInitialRequest = useRef(false);

  /**
   * Requests one status snapshot.
   * Polling is deliberately not started here: DeviceOverview controls it.
   */
  const refreshStatus = useCallback(async (): Promise<void> => {
    if (!hasCompletedInitialRequest.current) {
      setLoading(true);
    }

    try {
      const result = await getDeviceStatus();

      setDeviceStatus(result);
      setConnected(true);
      setError(null);
      setLastUpdated(new Date());
    } catch (requestError) {
      setConnected(false);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unknown device connection error",
      );
    } finally {
      hasCompletedInitialRequest.current = true;
      setLoading(false);
    }
  }, []);

  const sendCommand = useCallback(
    async (command: DeviceCommand): Promise<ApiResponse> => {
      setSending(true);
      setError(null);

      try {
        const response = await sendDeviceCommand(command);

        if (!response.success) {
          throw new Error(
            response.message || "The device rejected the command",
          );
        }

        // Fetch the actual hardware state after a successful command.
        await refreshStatus();

        return response;
      } catch (requestError) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : "Unknown command error";

        setError(message);
        throw requestError;
      } finally {
        setSending(false);
      }
    },
    [refreshStatus],
  );

  const contextValue = useMemo<DeviceContextValue>(
    () => ({
      deviceStatus,
      connected,
      loading,
      sending,
      error,
      lastUpdated,
      refreshStatus,
      sendCommand,
    }),
    [
      deviceStatus,
      connected,
      loading,
      sending,
      error,
      lastUpdated,
      refreshStatus,
      sendCommand,
    ],
  );

  return (
    <DeviceContext.Provider value={contextValue}>
      {children}
    </DeviceContext.Provider>
  );
}
