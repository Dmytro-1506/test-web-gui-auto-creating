import { useState, useEffect, useCallback, useMemo } from "react";

import { getDeviceStatus, sendDeviceCommand } from "../api/deviceApi";
import { DeviceContext } from "./DeviceContext";

import type { DeviceContextValue } from "./DeviceContext";
import type { DeviceStatus } from "../types/api/DeviceStatus.types";
import type { DeviceCommand } from "../types/api/DeviceCommand.types";
import type { ApiResponse } from "../types/api/ApiResponse.types";

// Polling interval: 3 seconds
const POLL_INTERVAL = 3000;

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus | null>(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // --------------------------------------------
  // Refresh Device Status
  // --------------------------------------------

  const refreshStatus = useCallback(async (): Promise<void> => {
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
      setLoading(false);
    }
  }, []);

  // --------------------------------------------
  // Send Device Command
  // --------------------------------------------

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

        // Read the real hardware state after the ESP32 confirms the command.
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

  // --------------------------------------------
  // Automatic Status Polling
  // --------------------------------------------

  useEffect(() => {
    let active = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      await refreshStatus();

      if (active) {
        timeoutId = setTimeout(poll, POLL_INTERVAL);
      }
    };

    // Initial status request.
    void poll();

    // Cleanup
    return () => {
      active = false;

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [refreshStatus]);

  // --------------------------------------------
  // Context Value
  // --------------------------------------------

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
