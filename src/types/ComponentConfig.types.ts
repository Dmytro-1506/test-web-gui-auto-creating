import type { ActionButtonConfig } from "./components/ActionButton.types";
import type { CodeSnippetConfig } from "./components/CodeSnippet.types";
import type { ColorPickerConfig } from "./components/ColorPicker.types";
import type { DropdownConfig } from "./components/Dropdown.types";
import type { RangeSliderConfig } from "./components/RangeSlider.types";
import type { TextInputConfig } from "./components/TextInput.types";
import type { ToggleSwitchConfig } from "./components/ToggleSwitch.types";

export type ComponentConfig =
  | TextInputConfig
  | ActionButtonConfig
  | ToggleSwitchConfig
  | ColorPickerConfig
  | RangeSliderConfig
  | DropdownConfig
  | CodeSnippetConfig;
