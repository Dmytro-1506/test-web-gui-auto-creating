import type { ComponentDependency } from "../ComponentCommon.types";

export interface InfoBoxConfig {
  type: "infoBox";
  id: string;
  position: number;
  params: {
    title: string;
    content: string;
    size: number;
    defaultValue?: string;
    dependency?: ComponentDependency;
  };
}
