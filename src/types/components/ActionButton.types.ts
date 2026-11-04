import type { ComponentDependency } from "../ComponentCommon.types";

export interface ActionButtonConfig {
  type: "button";
  id: string;
  position: number;
  params: {
    size: number;
    label: string;
    action: string;
    commandRef?: string;
    dependency?: ComponentDependency;
  };
}
