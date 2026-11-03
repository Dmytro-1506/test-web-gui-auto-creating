import { useState } from "react";

import { AppLayout } from "../components/layout/AppLayout";
import { DEFAULT_APPEARANCE } from "./settings/appearance";
import type { AppearanceSettings } from "./settings/appearance";

function App() {
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    ...DEFAULT_APPEARANCE,
  });

  return (
    <div data-theme={appearance.theme} data-layout={appearance.layout}>
      <AppLayout appearance={appearance} onAppearanceChange={setAppearance} />
    </div>
  );
}

export default App;
