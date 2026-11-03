import type { ComponentDependency } from "../ComponentCommon.types";

export interface TextInputConfig {
  type: "textInput";
  id: string;
  position: number;
  params: {
    size: number;
    label: string;
    placeholder?: string;
    defaultValue?: string;
    dependency?: ComponentDependency;
  };
}
