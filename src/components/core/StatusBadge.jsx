import React from "react";

/** Status pill with a signal dot — "In Progress". */
export function StatusBadge({ tone = "calm", children }) {
  const tones = {
    calm: { bg: "var(--accent-calm-bg)", dot: "var(--accent-calm)", text: "var(--text-calm)" },
    warm: { bg: "var(--accent-signal-bg)", dot: "var(--accent-signal)", text: "var(--text-warm)" },
    neutral: { bg: "var(--surface-inset)", dot: "var(--gray-500)", text: "var(--text-muted)" },
  };
  const t = tones[tone] ?? tones.calm;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "var(--type-label-size)",
        fontWeight: 600,
        color: t.text,
        background: t.bg,
        borderRadius: "var(--radius-pill)",
        padding: "4px 10px",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "99px", background: t.dot }} />
      {children}
    </div>
  );
}
