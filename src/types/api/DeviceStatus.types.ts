export interface DeviceStatus {
  device: {
    id: string;
    name: string;
    uptime: number;
  };

  status: {
    led: {
      isOn: boolean;
      brightness: number;
      color: {
        red: number;
        green: number;
        blue: number;
      };
      effect: string;
    };

    display: {
      isOn: boolean;
      currentText: string;
    };

    sound: {
      isPlaying: boolean;
    };

    buttons: {
      button1: boolean;
      button2: boolean;
      button3: boolean;
    };

    battery: {
      voltage: number;
      percentage: number;
    };
  };
}
