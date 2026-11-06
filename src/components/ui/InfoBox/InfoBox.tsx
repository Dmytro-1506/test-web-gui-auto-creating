import type { ReactNode } from "react";
import "./InfoBox.css";

export type InfoBoxVariant = "info" | "success" | "warning" | "error";

interface InfoBoxProps {
  title?: string;
  message?: string;
  variant?: InfoBoxVariant;
  children?: ReactNode;
  className?: string;
}

export function InfoBox({
  title,
  message,
  variant = "info",
  children,
  className = "",
}: InfoBoxProps) {
  const role = variant === "error" ? "alert" : "status";

  return (
    <section
      className={`info-box info-box--${variant} ${className}`.trim()}
      role={role}
      aria-live={variant === "error" ? "assertive" : "polite"}
    >
      {title && <h3 className="info-box__title">{title}</h3>}

      {message && <p className="info-box__message">{message}</p>}

      {children && <div className="info-box__content">{children}</div>}
    </section>
  );
}
