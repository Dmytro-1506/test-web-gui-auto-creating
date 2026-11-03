import rawConfig from "./esp32-web-config.json";
import type { AppConfig } from "../types";

// The JSON file is the source of truth for the GUI configuration.
// This assertion provides compile-time types; it does not validate JSON at runtime.
export const appConfig = rawConfig as AppConfig;

export const menuItems = Object.values(appConfig.configParams.menuItems).sort(
  (a, b) => a.id.localeCompare(b.id),
);
