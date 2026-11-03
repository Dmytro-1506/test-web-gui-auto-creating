import type { ComponentDependency } from "../ComponentCommon.types";

export interface RangeSliderConfig {
  type: "rangeSlider";
  id: string;
  position: number;
  params: {
    size: number;
    label: string;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    defaultValue?: number;
    dependency?: ComponentDependency;
  };
}
