import React from "react";

/** White surface card — the only container in the app. */
export function Card({ children, gap, style, ...rest }) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-card)",
        padding: "var(--space-5)",
        display: "flex",
        flexDirection: "column",
        gap: gap ?? "var(--gap-card-internal)",
        boxShadow: "var(--shadow-card)",
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
