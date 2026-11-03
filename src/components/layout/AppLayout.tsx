import { useState } from "react";

import type { AppearanceSettings } from "../../app/settings/appearance";
import { menuItems } from "../../config/appConfig";
import { Header } from "./Header";
import { Sidebar, type NavigationItemId } from "./Sidebar";
import { SectionContent } from "../section_content/SectionContent";

import "./AppLayout.css";

interface AppLayoutProps {
  appearance: AppearanceSettings;
  onAppearanceChange: (next: AppearanceSettings) => void;
}

export function AppLayout({ appearance, onAppearanceChange }: AppLayoutProps) {
  // Start with the first section that actually exists in the JSON config.
  const [activeItem, setActiveItem] = useState<NavigationItemId>(
    menuItems[0]?.id ?? "",
  );

  const activeSection = menuItems.find((item) => item.id === activeItem);

  return (
    <div className="app-shell">
      <Header appearance={appearance} onAppearanceChange={onAppearanceChange} />

      <div className="app-shell__body">
        <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />

        <main className="app-main" id="main-content">
          <p className="app-main__eyebrow">ESP32 Smart Panel</p>
          <h2 className="app-main__title">
            {activeSection?.title ?? "Section not found"}
          </h2>
          <SectionContent activeItem={activeItem} />
        </main>
      </div>
    </div>
  );
}
