import React from "react";

export function CardTitle({ children, style }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--type-title-size)",
        fontWeight: "var(--type-title-weight)",
        letterSpacing: "var(--type-title-tracking)",
        lineHeight: 1.4,
        color: "var(--text-primary)",
        textWrap: "balance",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
