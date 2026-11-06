export interface DeviceStatus {
  type: string;
  success: boolean;
  device: string;

  connected: boolean;
  signalStrength: number;

  batteryPercentage: number;
  batteryVoltage: number;

  display: DisplayStatus;
  led: LedStatus;
  sound: SoundStatus;
  buttons: ButtonsStatus;

  mode: string;
  message: string;
}

export interface DisplayStatus {
  backlightEnabled: boolean;
  batteryPercentage: number;
  wifiConnected: boolean;
  wifiSignalStrength: number;
  hours: number;
  minutes: number;
}

export interface LedStatus {
  isOn: boolean;
  red: number;
  green: number;
  blue: number;
  brightness: number;

  effects: {
    colorSwitching: boolean;
    blinking: boolean;
    pulsing: boolean;
  };

  blinkInterval: number;
  pulseInterval: number;
  colorSwitchInterval: number;
  colorCount: number;
  currentColorIndex: number;

  // Vorläufig, da dein Beispiel keine Einträge enthält.
  colors: unknown[];
}

export interface SoundStatus {
  initialized: boolean;
  melodyPlaying: boolean;
}

export interface ButtonsStatus {
  red: ButtonStatus;
  green: ButtonStatus;
  blue: ButtonStatus;
}

export interface ButtonStatus {
  pressed?: boolean;
  wasPressed?: boolean;
  color?: string;
  pin?: number;
}
