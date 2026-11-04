import type { ComponentDependency } from "../ComponentCommon.types";

export interface CodeSnippetConfig {
  type: "codeSnippet";
  id: string;
  position: number;
  params: {
    size: number;
    label: string;
    language: string;
    commandRef: string;
    defaultValue: string;
    dependency?: ComponentDependency;
  };
}
