/**
 * Appearance preferences supported by the frontend.
 *
 * This file defines types and defaults only. Persisting preferences and
 * applying them to the DOM will be handled by the application layer.
 */

export const THEME_OPTIONS = ["light", "dark"] as const;
export type Theme = (typeof THEME_OPTIONS)[number];

export const LAYOUT_OPTIONS = ["modern", "classic"] as const;
export type LayoutStyle = (typeof LAYOUT_OPTIONS)[number];

export interface AppearanceSettings {
  theme: Theme;
  layout: LayoutStyle;
}

export const DEFAULT_APPEARANCE: Readonly<AppearanceSettings> = {
  theme: "dark",
  layout: "classic",
};
