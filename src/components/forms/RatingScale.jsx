import React from "react";

/** 1–5 fussiness scale of tappable squares. */
export function RatingScale({ value, onChange, max = 5, style }) {
  return (
    <div style={{ display: "flex", gap: "8px", ...style }}>
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        const selected = value === n;
        return (
          <button
            key={n}
            onClick={() => onChange && onChange(n)}
            style={{
              boxSizing: "border-box",
              flex: 1,
              minWidth: "var(--hit-min)",
              height: "var(--hit-min)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-ui)",
              fontSize: "15px",
              fontWeight: 600,
              color: selected ? "var(--text-on-brand)" : "var(--text-primary)",
              background: selected ? "var(--action-primary)" : "var(--surface-inset)",
              border: "1px solid " + (selected ? "var(--action-primary)" : "var(--border-default)"),
              borderRadius: "var(--radius-button)",
              cursor: "pointer",
              transition: "background .15s ease",
            }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
