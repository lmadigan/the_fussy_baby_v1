import React from "react";

export function InsightRow({ tone = "signal", children }) {
  const dot = tone === "signal"
    ? "var(--accent-signal)"
    : tone === "calm"
      ? "var(--accent-calm)"
      : "var(--border-default)";
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
      <span aria-hidden style={{ flex: "none", marginTop: "7px", width: "8px", height: "8px", borderRadius: "var(--radius-pill)", background: dot }} />
      <div style={{ fontSize: "var(--type-body-size)", lineHeight: "var(--type-body-line)", color: tone === "neutral" ? "var(--text-muted)" : "var(--text-primary)", textWrap: "pretty" }}>
        {children}
      </div>
    </div>
  );
}
