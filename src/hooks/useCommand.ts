import { useCallback } from "react";

import { useDevice } from "./useDevice";

import { buildCommand } from "../commands/commandBuilder";
import { commandRegistry } from "../commands/commandRegistry";

import type { ComponentValues } from "../types/commands/CommandConfig.types";

export function useCommand() {
  const { sendCommand } = useDevice();

  /**
   * Creates a command without sending it.
   */
  const createCommand = useCallback(
    (commandRef: string, values: ComponentValues) => {
      const definition = commandRegistry[commandRef];

      if (!definition) {
        throw new Error(`Unknown command: ${commandRef}`);
      }

      return buildCommand(definition, values);
    },
    [],
  );

  /**
   * Creates and sends a command to the ESP32.
   */
  const executeCommand = useCallback(
    async (commandRef: string, values: ComponentValues) => {
      const command = createCommand(commandRef, values);
      // console.log("executeCommand", { commandRef, values, command });

      return await sendCommand(command);
    },
    [createCommand, sendCommand],
  );

  return {
    createCommand,
    executeCommand,
  };
}
