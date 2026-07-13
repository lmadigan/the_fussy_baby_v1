import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { InsightRow } from "../components/data/InsightRow.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore } from "../lib/store.jsx";
import { generatePatterns } from "../lib/patterns.js";
import { formatShort } from "../lib/dates.js";

/** Patterns — evidence surfaced from approved observations, organized by investigation. Never a diagnosis. */
export function Patterns({ navigate }) {
  const { state } = useStore();
  const patterns = generatePatterns(state);
  const [evidenceOpen, setEvidenceOpen] = useState({});

  return (
    <Screen eyebrow="What We've Learned" title="Patterns">
      {patterns.length === 0 ? (
        <Card>
          <SectionLabel>Still Learning</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)", textWrap: "pretty" }}>
            We're still learning. Continue recording observations and we'll surface meaningful patterns as enough
            evidence becomes available.
          </div>
          <Button onClick={() => navigate("detective")}>Record Today's Observation</Button>
        </Card>
      ) : (
        patterns.map((p) => {
          const open = evidenceOpen[p.investigationId];
          return (
            <Card key={p.investigationId}>
              <SectionLabel right={`${p.dayCount} day${p.dayCount === 1 ? "" : "s"} of evidence`}>Pattern</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-card-text)" }}>
                <div style={{ fontSize: "var(--type-title-size)", fontWeight: "var(--type-title-weight)", letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                  {p.investigationTitle}
                </div>
                <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
                  {p.summary}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>
                  Supporting observations
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
                  {p.supporting.map((s) => (
                    <Tag key={s.id} tone="signal">
                      {s.label}
                      <span style={{ opacity: 0.6 }}>×{s.count}</span>
                    </Tag>
                  ))}
                </div>
              </div>
              {open && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "4px", borderTop: "1px solid var(--border-default)" }}>
                  {p.supporting.map((s) => (
                    <InsightRow key={s.id}>
                      <span style={{ fontWeight: 600 }}>{s.label}</span> — seen {s.count} time{s.count === 1 ? "" : "s"}{" "}
                      <span style={{ color: "var(--text-muted)" }}>
                        ({s.dates.map((d) => formatShort(d)).join(", ")})
                      </span>
                    </InsightRow>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  variant="secondary"
                  onClick={() => setEvidenceOpen((prev) => ({ ...prev, [p.investigationId]: !open }))}
                >
                  {open ? "Hide Evidence" : "View Evidence"}
                </Button>
                <Button variant="secondary" onClick={() => navigate("investigation", { id: p.investigationId })}>
                  Open Investigation
                </Button>
              </div>
            </Card>
          );
        })
      )}
      <div style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-muted)", textAlign: "center", textWrap: "pretty", padding: "0 8px" }}>
        Patterns describe your recorded observations only. They are not medical conclusions.
      </div>
    </Screen>
  );
}
