import React from "react";

/** Evidence bullet: dot + finding, with confidence expressed in words. */
export function InsightRow({ active = true, children }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
      <div
        style={{
          flex: "none",
          marginTop: "5px",
          width: "8px",
          height: "8px",
          borderRadius: "99px",
          background: active ? "var(--accent-signal)" : "var(--border-default)",
        }}
      />
      <div
        style={{
          fontSize: "var(--type-body-size)",
          lineHeight: "var(--type-body-line)",
          color: active ? "var(--text-primary)" : "var(--text-muted)",
          textWrap: "pretty",
        }}
      >
        {children}
      </div>
    </div>
  );
}
