import { useEffect } from "react";
import { useDevice } from "./useDevice";

/**
 * Polls the ESP32 only while the component using this hook is mounted
 * and `enabled` is true. The next request starts after the previous one
 * has completed, so requests cannot overlap.
 */
export function useDevicePolling(enabled: boolean, intervalMs = 1000): void {
  const { refreshStatus } = useDevice();

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      await refreshStatus();

      if (!cancelled) {
        timeoutId = setTimeout(poll, intervalMs);
      }
    };

    void poll();

    return () => {
      cancelled = true;

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [enabled, intervalMs, refreshStatus]);
}
