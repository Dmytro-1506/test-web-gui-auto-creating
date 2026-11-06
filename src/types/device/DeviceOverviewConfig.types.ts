/**
 * Presentation configuration for the Device Overview menu.
 *
 * These are UI settings only. Live values (Wi-Fi state, battery voltage,
 * LED state, etc.) must come from GET /api/status, not from config.json.
 */

interface OverviewComponentBase {
  id: string;
  position: number;
  enabled: boolean;
}

export interface DisplayOverviewConfig extends OverviewComponentBase {
  width: number;
  height: number;
  unit: "px";
}

export interface LedOverviewConfig extends OverviewComponentBase {
  /** Optional fallback/design color; live colors come from DeviceStatus. */
  color?: string;
}

export interface SoundOverviewConfig extends OverviewComponentBase {
  /** Optional fallback/design volume; live volume comes from DeviceStatus. */
  volume?: number;
}

export type DeviceButtonId = "button1" | "button2" | "button3";

export interface ButtonOverviewItemConfig extends Omit<
  OverviewComponentBase,
  "id"
> {
  id: DeviceButtonId;
  color: string;
}

export interface ButtonsOverviewConfig {
  id: string;
  position: number;
  enabled: boolean;
  buttons: ButtonOverviewItemConfig[];
}

export interface SystemInfoOverviewConfig {
  id: string;
  label: string;
  position: number;
  title: string;
  enabled?: boolean;
}

export interface DeviceOverviewConfig {
  id: string;
  label: string;
  title: string;
  components: {
    display: DisplayOverviewConfig;
    led: LedOverviewConfig;
    sound: SoundOverviewConfig;
    buttonsSection: ButtonsOverviewConfig;
    systemInfo: SystemInfoOverviewConfig;
  };
}
