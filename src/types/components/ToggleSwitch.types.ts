import type { ComponentDependency } from "../ComponentCommon.types";

export interface ToggleSwitchConfig {
  type: "toggleSwitch";
  id: string;
  position: number;
  params: {
    size: number;
    label: string;
    checked?: boolean;
    dependency?: ComponentDependency;
  };
}
