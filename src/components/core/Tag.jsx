import React from "react";

/** Observation tag chip — mint by default, clay when softly notable, periwinkle when it's part of an active signal. */
export function Tag({ tone = "calm", selected = false, onClick, children }) {
  const tones = {
    calm: { bg: "var(--accent-calm-bg)", text: "var(--text-brand)" },
    warm: { bg: "var(--accent-warm-bg)", text: "var(--text-warm)" },
    signal: { bg: "var(--accent-signal-bg)", text: "var(--text-brand)" },
    neutral: { bg: "transparent", text: "var(--text-muted)" },
  };
  const t = tones[tone] ?? tones.calm;
  const interactive = typeof onClick === "function";
  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "var(--type-meta-size)",
        fontWeight: 500,
        color: selected ? "var(--text-on-brand)" : t.text,
        background: selected ? "var(--action-primary)" : t.bg,
        border: tone === "neutral" && !selected ? "1px solid var(--border-default)" : "1px solid transparent",
        borderRadius: "var(--radius-pill)",
        padding: "5px 12px",
        cursor: interactive ? "pointer" : "default",
        userSelect: "none",
        transition: "background .15s ease, color .15s ease",
      }}
    >
      {children}
    </div>
  );
}
