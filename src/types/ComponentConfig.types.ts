import type { ActionButtonConfig } from "./components/ActionButton.types";
import type { CodeSnippetConfig } from "./components/CodeSnippet.types";
import type { ColorPickerConfig } from "./components/ColorPicker.types";
import type { DropdownConfig } from "./components/Dropdown.types";
import type { RangeSliderConfig } from "./components/RangeSlider.types";
import type { TextInputConfig } from "./components/TextInput.types";
import type { ToggleSwitchConfig } from "./components/ToggleSwitch.types";
import type { ContainerConfig } from "./components/Container.types";
import type { InfoBoxConfig } from "./components/InfoBox.types";
import type { SystemInfoConfig } from "./device/SystemInfo.types";

export type ComponentConfig =
  | TextInputConfig
  | ActionButtonConfig
  | ToggleSwitchConfig
  | ContainerConfig
  | ColorPickerConfig
  | RangeSliderConfig
  | DropdownConfig
  | CodeSnippetConfig
  | InfoBoxConfig
  | SystemInfoConfig;
