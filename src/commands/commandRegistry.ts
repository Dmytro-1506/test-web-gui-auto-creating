import setLEDJson from "./definitions/led/set_led.json";
import showTextJson from "./definitions/display/show_text.json";
import getDeviceStatusJson from "./definitions/system/get_status.json";

import type {
  CommandRegistry,
  CommandDefinition,
} from "../types/commands/CommandConfig.types";

export const commandRegistry: CommandRegistry = {
  setLED: setLEDJson as CommandDefinition,
  showText: showTextJson as CommandDefinition,
  getStatus: getDeviceStatusJson as CommandDefinition,
};
