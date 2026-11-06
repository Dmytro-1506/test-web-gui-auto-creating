import type { ComponentDependency } from "../ComponentCommon.types";

export interface ContainerConfig {
  type: "container";
  id: string;
  position: number;
  params: {
    size: number;
    label: string;
    defaultValue?: string;
    maxItems: number;
    dependency?: ComponentDependency;
  };
}
