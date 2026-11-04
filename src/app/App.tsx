import { useState } from "react";

import { AppLayout } from "../components/layout/AppLayout";
import { DeviceProvider } from "../context/DeviceProvider";
import { DEFAULT_APPEARANCE } from "./settings/appearance";
import type { AppearanceSettings } from "./settings/appearance";

function App() {
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    ...DEFAULT_APPEARANCE,
  });

  return (
    <DeviceProvider>
      <div data-theme={appearance.theme} data-layout={appearance.layout}>
        <AppLayout appearance={appearance} onAppearanceChange={setAppearance} />
      </div>
    </DeviceProvider>
  );
}

export default App;
