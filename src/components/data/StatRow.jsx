import React from "react";

/** Labeled stat — "Fussiness 3/5". */
export function StatRow({ label, value, max }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
      <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
      {value != null ? (
        <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-brand)" }}>
          {value}
          {max != null && <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>/{max}</span>}
        </div>
      ) : (
        <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>Not recorded</div>
      )}
    </div>
  );
}
