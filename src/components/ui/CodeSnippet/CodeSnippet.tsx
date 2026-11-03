import { useState } from "react";

import "./CodeSnippet.css";

interface CodeSnippetProps {
  id: string;
  label: string;
  value: string;
  language?: string;
  disabled?: boolean;
  copyable?: boolean;
}

export function CodeSnippet({
  id,
  label,
  value,
  language = "text",
  disabled = false,
  copyable = true,
}: CodeSnippetProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <section className="code-snippet" aria-labelledby={`${id}-label`}>
      <div className="code-snippet__header">
        <div className="code-snippet__heading">
          <h3 className="code-snippet__label" id={`${id}-label`}>
            {label}
          </h3>
          <span className="code-snippet__language">{language}</span>
        </div>

        {copyable && (
          <button
            className="code-snippet__copy-button"
            type="button"
            onClick={handleCopy}
            disabled={disabled || !value}
            aria-label={`Copy ${label}`}
          >
            {copyStatus === "copied"
              ? "Copied"
              : copyStatus === "error"
                ? "Copy failed"
                : "Copy"}
          </button>
        )}
      </div>

      <pre className="code-snippet__code">
        <code>{value}</code>
      </pre>
    </section>
  );
}
