import "./Sidebar.css";
import { configParams } from "../../config/esp32-web-config.json";

const menuItems = Object.values(configParams.menuItems).sort(
  (a, b) => a.position - b.position,
);

const menuIcons: { id: string; icon: string }[] = [
  { id: "overview", icon: "⌂" }, // Overview
  { id: "display", icon: "▣" }, // Display
  { id: "led", icon: "●" }, // LED
  { id: "sound", icon: "♫" }, // Sound
  { id: "buttons", icon: "▤" }, // Buttons
  { id: "battery", icon: "▰" }, // Battery
  { id: "settings", icon: "⚙" }, // Settings
  { id: "activity-log", icon: "▤" }, // Activity log
];

export type NavigationItemId =
  | "overview"
  | "display"
  | "led"
  | "sound"
  | "buttons"
  | "battery"
  | "settings"
  | "activity-log";

interface SidebarProps {
  activeItem: NavigationItemId;
  onNavigate: (item: NavigationItemId) => void;
}

const navigationItems: { id: NavigationItemId; label: string; icon: string }[] =
  menuItems.map((item) => ({
    id: item.id as NavigationItemId,
    label: item.label,
    icon: menuIcons.find((icon) => icon.id === item.id)?.icon || "☰", // Default icon if not found
  }));

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  console.log("ESP32 Web Config Params:", { configParams });

  return (
    <aside className="app-sidebar" aria-label="Main sidebar">
      <nav className="app-sidebar__nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`app-sidebar__item${activeItem === item.id ? " app-sidebar__item--active" : ""}`}
            onClick={() => onNavigate(item.id)}
            aria-current={activeItem === item.id ? "page" : undefined}
          >
            <span className="app-sidebar__icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="app-sidebar__footer">
        <span className="app-sidebar__connection-dot" aria-hidden="true" />
        <span>Device connection not configured</span>
      </div>
    </aside>
  );
}
