import type {
  AppearanceSettings,
  LayoutStyle,
  Theme,
} from "../../app/settings/appearance";
import "./Header.css";

interface HeaderProps {
  appearance: AppearanceSettings;
  onAppearanceChange: (next: AppearanceSettings) => void;
}

const COMPANY_WEBSITE_URL = "https://macontic.wpcomstaging.com";

export function Header({ appearance, onAppearanceChange }: HeaderProps) {
  const updateTheme = (theme: Theme) => {
    onAppearanceChange({ ...appearance, theme });
  };

  const updateLayout = (layout: LayoutStyle) => {
    onAppearanceChange({ ...appearance, layout });
  };

  return (
    <header className="app-header">
      <a className="app-header__brand" href="/" aria-label="Smart Remote home">
        <span className="app-header__logo" aria-hidden="true">
          SR
        </span>
        <span className="app-header__brand-text">
          <span className="app-header__brand-name">Smart Remote</span>
          <span className="app-header__brand-subtitle">ESP32 Web-GUI</span>
        </span>
      </a>

      <div className="app-header__actions">
        <label className="app-header__setting">
          <span>Theme</span>
          <select
            value={appearance.theme}
            onChange={(event) => updateTheme(event.target.value as Theme)}
            aria-label="Select color theme"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label className="app-header__setting">
          <span>Layout</span>
          <select
            value={appearance.layout}
            onChange={(event) =>
              updateLayout(event.target.value as LayoutStyle)
            }
            aria-label="Select layout style"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
        </label>

        <a
          className="app-header__website-link"
          href={COMPANY_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Macontic Smart Technologies website"
        >
          <span className="app-header__website-name">
            Macontic Smart Technologies
          </span>

          <img
            className="app-header__website-logo"
            src="/Macontic-Icon-128x128.svg"
            alt=""
            width={20}
            height={20}
          />
        </a>
      </div>
    </header>
  );
}
