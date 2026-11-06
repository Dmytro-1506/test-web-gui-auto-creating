export interface SystemInfoParams {
  title: string;
  label: string;

  wifi: {
    connected: boolean;
    ssid: string;
    ip: string;
    rssi: number;
  };

  bluetooth: {
    enabled: boolean;
    connected: boolean;
  };

  battery: {
    voltage: number;
    percentage: number;
  };
}

export interface SystemInfoConfig {
  type: "systemInfo";
  id: string;
  position: number;
  params: SystemInfoParams;
}
