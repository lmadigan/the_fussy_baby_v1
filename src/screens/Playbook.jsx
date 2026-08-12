import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { CardTitle } from "../components/core/CardTitle.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { CAUSES, PROTOCOL_STEPS, protocolPosition } from "../data/playbook.js";

export function Playbook({ navigate, params = {} }) {
  const [view, setView] = useState(params.view === "causes" ? "causes" : "protocol");
  const items = view === "protocol" ? PROTOCOL_STEPS : CAUSES;

  return (
    <Screen title="The Fussy Baby Playbook">
      <div role="tablist" aria-label="Playbook view" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "3px", borderRadius: "var(--radius-pill)", background: "var(--surface-inset)", border: "1px solid var(--border-default)" }}>
        {[{ id: "protocol", label: "Protocol" }, { id: "causes", label: "Causes" }].map((option) => (
          <button
            key={option.id}
            role="tab"
            aria-selected={view === option.id}
            onClick={() => setView(option.id)}
            style={{ border: 0, borderRadius: "var(--radius-pill)", minHeight: "var(--hit-min)", padding: "9px 10px", cursor: "pointer", font: "inherit", fontSize: "13px", fontWeight: 600, background: view === option.id ? "var(--surface-card)" : "transparent", color: view === option.id ? "var(--text-brand)" : "var(--text-muted)", boxShadow: view === option.id ? "var(--shadow-card)" : "none" }}
          >
            {option.label}
          </button>
        ))}
      </div>

      {view === "protocol" ? (
        <>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>
            Use these four core steps to explore why your baby may seem fussier than usual. Along the way, try the digestive and sensory support steps that seem helpful for your baby.
          </div>
          {items.map((step) => (
            <Card key={step.id}>
              <SectionLabel right={step.timing}>{protocolPosition(step)}</SectionLabel>
              <CardTitle>{step.title}</CardTitle>
              <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{step.short}</div>
              <Button variant="secondary" onClick={() => navigate("protocol", { id: step.id })}>Open checklist</Button>
            </Card>
          ))}
        </>
      ) : (
        <>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>
            Browse possible causes of baby fussiness, ordered by how often they appeared in our research across parenting blogs, public forums, and moms' groups.
          </div>
          {items.map((cause) => (
            <Card key={cause.id}>
              <SectionLabel right={cause.evidenceLabel}>Cause {cause.rank}</SectionLabel>
              <CardTitle>{cause.title}</CardTitle>
              <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{cause.short}</div>
              <Button variant="secondary" onClick={() => navigate("cause", { id: cause.id })}>Learn about this cause</Button>
            </Card>
          ))}
        </>
      )}
    </Screen>
  );
}
