import type { ComponentDependency } from "../ComponentCommon.types";

export interface CodeSnippetConfig {
  type: "codeSnippet";
  id: string;
  position: number;
  params: {
    size: number;
    label: string;
    language: string;
    defaultValue: string;
    dependency?: ComponentDependency;
  };
}
