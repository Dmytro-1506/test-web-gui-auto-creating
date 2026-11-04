import { useContext } from "react";

import { DeviceContext } from "../context/DeviceContext";

export function useDevice() {
  const context = useContext(DeviceContext);

  if (context === null) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }

  return context;
}
