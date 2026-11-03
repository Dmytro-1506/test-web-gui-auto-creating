import { menuItems } from "../../config/appConfig";
import "./Sidebar.css";

// IDs come from the JSON configuration, so the navigation is not hard-coded.
export type NavigationItemId = string;

interface SidebarProps {
  activeItem: NavigationItemId;
  onNavigate: (item: NavigationItemId) => void;
}

const menuIcons: Record<string, string> = {
  overview: "⌂",
  display: "▣",
  led: "●",
  sound: "♫",
  buttons: "▤",
  battery: "▰",
  settings: "⚙",
  "activity-log": "▤",
};

const navigationItems = menuItems.map((item) => ({
  id: item.id,
  label: item.label,
  icon: menuIcons[item.id] ?? "☰",
}));

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
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
