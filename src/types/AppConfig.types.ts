import type { ComponentConfig } from "./ComponentConfig.types";

export interface MenuItemConfig {
  id: string;
  label: string;
  title: string;
  defaultState?: Record<string, unknown>;
  components: Record<string, ComponentConfig>;
}

export interface AppConfig {
  configParams: { menuItems: Record<string, MenuItemConfig> };
}
