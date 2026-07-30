import React from "react";
import { Card } from "../core/Card.jsx";
import { Button } from "../core/Button.jsx";

/**
 * One possible cause from the model differential — DxGPT-style:
 * rank · name · plain description · what fits · what doesn't · care advice.
 * `rank` is 1-based; the model's order is preserved (we never re-sort).
 */
export function DifferentialCard({ rank, cause, onExplore }) {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <div
          aria-hidden
          style={{
            flex: "none",
            width: "26px",
            height: "26px",
            borderRadius: "8px",
            background: "var(--action-primary)",
            color: "var(--text-on-brand)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {rank}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
          <div style={{ fontSize: "16.5px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
            {cause.name}
          </div>
          {cause.description && (
            <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
              {cause.description}
            </div>
          )}
        </div>
      </div>

      {cause.matching.length > 0 && (
        <FitRow tone="fit" label="What fits" items={cause.matching} />
      )}
      {cause.notFitting.length > 0 && (
        <FitRow tone="against" label="Worth noting" items={cause.notFitting} />
      )}

      {cause.playbookId ? (
        <Button variant="secondary" onClick={() => onExplore(cause.playbookId)}>
          See care advice
        </Button>
      ) : cause.whatToTry.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 600, color: "var(--text-muted)" }}>
            Things you can try
          </div>
          {cause.whatToTry.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", fontSize: "13.5px", lineHeight: 1.5, color: "var(--text-primary)" }}>
              <span aria-hidden style={{ color: "var(--text-muted)" }}>•</span>
              <span style={{ textWrap: "pretty" }}>{t}</span>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

function FitRow({ tone, label, items }) {
  const fit = tone === "fit";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        <span
          aria-hidden
          style={{
            width: "17px",
            height: "17px",
            borderRadius: "50%",
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 700,
            color: fit ? "var(--text-brand)" : "var(--text-warm)",
            background: fit ? "var(--accent-calm-bg)" : "var(--accent-warm-bg)",
          }}
        >
          {fit ? "✓" : "!"}
        </span>
        <span style={{ fontSize: "var(--type-meta-size)", fontWeight: 600, color: "var(--text-muted)" }}>{label}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", paddingLeft: "24px" }}>
        {items.map((it, i) => (
          <div key={i} style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--text-primary)", textWrap: "pretty" }}>
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}
