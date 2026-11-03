export type ComponentDependency =
  | "general"
  | { componentId: string; condition: "checked" };

export interface ComponentOption {
  type: string;
  label: string;
}
