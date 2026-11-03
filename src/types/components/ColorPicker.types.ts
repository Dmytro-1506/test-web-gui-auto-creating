import type { ComponentDependency } from "../ComponentCommon.types";

export interface ColorPickerConfig {
  type: "colorPicker";
  id: string;
  position: number;
  params: {
    size: number;
    label: string;
    defaultValue?: string;
    dependency?: ComponentDependency;
  };
}
