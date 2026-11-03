export const API_BASE_URL = import.meta.env.VITE_ESP32_API_URL ?? "";

export const API_ENDPOINTS = {
  STATUS: "/api/status",
  COMMANDS: "/api/commands",
  CONFIG: "/api/config",
};
