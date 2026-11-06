import type { ComponentConfig } from "./ComponentConfig.types";
import type { DeviceOverviewConfig } from "./device/DeviceOverviewConfig.types";

export interface MenuItemConfig {
  id: string;
  label: string;
  title: string;
  defaultState?: Record<string, unknown>;
  components: Record<string, ComponentConfig>;
}

export interface AppConfig {
  configParams: {
    menuItems: {
      [key: string]: MenuItemConfig | DeviceOverviewConfig;
    };
  };
}
