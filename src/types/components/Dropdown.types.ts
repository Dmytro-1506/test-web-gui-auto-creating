import type {
  ComponentDependency,
  ComponentOption,
} from "../ComponentCommon.types";

export interface DropdownConfig {
  type: "dropdown";
  id: string;
  position: number;
  params: {
    size: number;
    label: string;
    options: ComponentOption[];
    defaultValue?: string;
    dependency?: ComponentDependency;
  };
}
