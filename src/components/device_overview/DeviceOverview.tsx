import { useDevicePolling } from "../../hooks/useDevicePolling";
import { useDevice } from "../../hooks/useDevice";
import type { DeviceOverviewConfig } from "../../types/device/DeviceOverviewConfig.types";
import "./DeviceOverview.css";

interface DeviceOverviewProps {
  config: DeviceOverviewConfig;
}

export function DeviceOverview({ config }: DeviceOverviewProps) {
  useDevicePolling(true);

  const {
    deviceStatus,
    connected,
    loading,
    error,
    lastUpdated,
    refreshStatus,
  } = useDevice();

  return (
    <section className="device-overview">
      <header className="device-overview__header">
        <div>
          <h2>{config.title}</h2>
          <p>{config.label} · ESP32 API Test</p>
        </div>

        <div className="device-overview__toolbar">
          <span>{connected ? "ESP32 connected" : "ESP32 disconnected"}</span>

          <button
            type="button"
            onClick={() => void refreshStatus()}
            disabled={loading}
          >
            {loading ? "Updating..." : "Refresh"}
          </button>
        </div>
      </header>

      {error && <div className="device-overview__error">{error}</div>}

      <article className="device-overview__card">
        <h3>Request Status</h3>

        <p>
          {loading
            ? "Loading..."
            : deviceStatus
              ? "Response received"
              : "No response available"}
        </p>

        {lastUpdated && <p>Last update: {lastUpdated.toLocaleTimeString()}</p>}
      </article>

      <article className="device-overview__card">
        <h3>ESP32 Response (JSON)</h3>

        <pre className="device-overview__json">
          {deviceStatus
            ? JSON.stringify(deviceStatus, null, 2)
            : "Waiting for ESP32 response..."}
        </pre>
      </article>
    </section>
  );
}
