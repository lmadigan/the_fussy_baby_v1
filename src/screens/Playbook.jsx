import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { CAUSES, PROTOCOL_STEPS, protocolPosition } from "../data/playbook.js";

export function Playbook({ navigate, params = {} }) {
  const [view, setView] = useState(params.view === "causes" ? "causes" : "protocol");
  const items = view === "protocol" ? PROTOCOL_STEPS : CAUSES;

  return (
    <Screen eyebrow="Free reference" title="The Fussy Baby Playbook">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "3px", borderRadius: "var(--radius-button)", background: "var(--surface-inset)", border: "1px solid var(--border-default)" }}>
        {[{ id: "protocol", label: "Protocol" }, { id: "causes", label: "Causes" }].map((option) => (
          <button
            key={option.id}
            onClick={() => setView(option.id)}
            style={{ border: 0, borderRadius: "7px", padding: "9px 10px", cursor: "pointer", font: "inherit", fontSize: "13px", fontWeight: 700, background: view === option.id ? "var(--surface-card)" : "transparent", color: view === option.id ? "var(--text-brand)" : "var(--text-muted)", boxShadow: view === option.id ? "0 1px 2px rgba(20, 20, 20, .08)" : "none" }}
          >
            {option.label}
          </button>
        ))}
      </div>

      {view === "protocol" ? (
        <>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>
            Four core steps create the investigation path. Digestive and sensory support can run alongside it.
          </div>
          {items.map((step) => (
            <Card key={step.id}>
              <SectionLabel right={step.timing}>{protocolPosition(step)}</SectionLabel>
              <div style={{ fontSize: "var(--type-title-size)", fontWeight: 700, color: "var(--text-primary)" }}>{step.title}</div>
              <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{step.short}</div>
              <Button variant="secondary" onClick={() => navigate("protocol", { id: step.id })}>Open checklist</Button>
            </Card>
          ))}
        </>
      ) : (
        <>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>
            Browse the contributors most often discussed in the original Playbook. Their order is educational, not a medical probability.
          </div>
          {items.map((cause) => (
            <Card key={cause.id}>
              <SectionLabel right={cause.evidenceLabel}>Cause {cause.rank}</SectionLabel>
              <div style={{ fontSize: "var(--type-title-size)", fontWeight: 700, color: "var(--text-primary)" }}>{cause.title}</div>
              <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{cause.short}</div>
              <Button variant="secondary" onClick={() => navigate("cause", { id: cause.id })}>Learn about this cause</Button>
            </Card>
          ))}
        </>
      )}
    </Screen>
  );
}
