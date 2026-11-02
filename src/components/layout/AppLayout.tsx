import { useState, type ReactNode } from "react";
import type { AppearanceSettings } from "../../app/settings/appearance";
import { Header } from "./Header";
import { Sidebar, type NavigationItemId } from "./Sidebar";
import { SectionContent } from "../section_content/SectionContent";

import "./AppLayout.css";

import { configParams } from "../../config/esp32-web-config.json";

const menuItems = Object.values(configParams.menuItems).sort(
  (a, b) => a.position - b.position,
);

interface AppLayoutProps {
  appearance: AppearanceSettings;
  onAppearanceChange: (next: AppearanceSettings) => void;
  children?: ReactNode;
}

const sectionTitles: Record<NavigationItemId, string> = menuItems.reduce(
  (acc, item) => {
    acc[item.id as NavigationItemId] = item.title;
    return acc;
  },
  {} as Record<NavigationItemId, string>,
);

export function AppLayout({ appearance, onAppearanceChange }: AppLayoutProps) {
  const [activeItem, setActiveItem] = useState<NavigationItemId>("overview");

  return (
    <div className="app-shell">
      <Header appearance={appearance} onAppearanceChange={onAppearanceChange} />

      <div className="app-shell__body">
        <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />

        <main className="app-main" id="main-content">
          <p className="app-main__eyebrow">ESP32 Smart Panel</p>

          <h2 className="app-main__title">{sectionTitles[activeItem]}</h2>
          <SectionContent activeItem={activeItem} />
        </main>
      </div>
    </div>
  );
}
