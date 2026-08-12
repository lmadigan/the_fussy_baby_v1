import React from "react";

/** Observation tag chip: mint is calm, rose is noteworthy, and navy is selected. */
export function Tag({ tone = "calm", selected = false, onClick, children }) {
  const tones = {
    calm: { bg: "var(--accent-calm-bg)", text: "var(--text-calm)" },
    warm: { bg: "var(--accent-signal-bg)", text: "var(--text-warm)" },
    neutral: { bg: "transparent", text: "var(--text-muted)" },
  };
  const t = tones[tone] ?? tones.calm;
  const interactive = typeof onClick === "function";
  const style = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "var(--type-meta-size)",
        fontWeight: 500,
        fontFamily: "var(--font-ui)",
        color: selected ? "var(--text-on-brand)" : t.text,
        background: selected ? "var(--action-primary)" : t.bg,
        border: tone === "neutral" && !selected ? "1px solid var(--border-default)" : "1px solid transparent",
        borderRadius: "var(--radius-pill)",
        padding: interactive ? "8px 12px" : "5px 12px",
        minHeight: interactive ? "var(--hit-min)" : undefined,
        boxSizing: "border-box",
        cursor: interactive ? "pointer" : "default",
        userSelect: "none",
        transition: "background .15s ease, color .15s ease",
  };
  if (interactive) {
    return <button type="button" aria-pressed={selected} onClick={onClick} style={style}>{children}</button>;
  }
  return <span style={style}>{children}</span>;
}
