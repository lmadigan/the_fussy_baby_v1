import React from "react";

/** Screen scaffold: optional back row, date eyebrow + serif display title, stacked content. */
export function Screen({ title, eyebrow, onBack, action, children }) {
  return (
    <div
      style={{
        padding: "28px 24px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--gap-stack)",
        boxSizing: "border-box",
        fontFamily: "var(--font-ui)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              all: "unset",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-muted)",
              padding: "0 0 10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            ← Back
          </button>
        )}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
            {eyebrow && (
              <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>{eyebrow}</div>
            )}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--type-display-size)",
                fontWeight: "var(--type-display-weight)",
                letterSpacing: "var(--type-display-tracking)",
                color: "var(--text-primary)",
                textWrap: "balance",
              }}
            >
              {title}
            </div>
          </div>
          {action}
        </div>
      </div>
      {children}
    </div>
  );
}
