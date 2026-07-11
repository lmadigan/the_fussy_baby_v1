import React from "react";

/** Uppercase eyebrow label that opens every card. */
export function SectionLabel({ children, right, style }) {
  const label = (
    <div
      style={{
        fontSize: "var(--type-label-size)",
        fontWeight: "var(--type-label-weight)",
        letterSpacing: "var(--type-label-tracking)",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        ...style,
      }}
    >
      {children}
    </div>
  );
  if (right === undefined) return label;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
      {label}
      <div style={{ fontSize: "var(--type-meta-size)", fontWeight: "var(--type-meta-weight)", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>{right}</div>
    </div>
  );
}
