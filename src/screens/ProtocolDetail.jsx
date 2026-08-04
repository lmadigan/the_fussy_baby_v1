import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore } from "../lib/store.jsx";
import { getProtocolStep, protocolPosition } from "../data/playbook.js";
import { formatShort } from "../lib/dates.js";

export function ProtocolDetail({ navigate, goBack, params }) {
  const { state, dispatch } = useStore();
  const protocol = getProtocolStep(params.id);
  if (!protocol) return <Screen title="Protocol" onBack={goBack}><Card>This protocol is not available yet.</Card></Screen>;
  const checked = new Set(state.protocolChecklists[protocol.id] ?? []);
  const plan = state.plans[protocol.id];
  const done = checked.size;
  const percent = Math.round((done / protocol.checklist.length) * 100);

  const toggle = (index) => dispatch({ type: "toggleProtocolItem", protocolId: protocol.id, index });
  const start = () => dispatch({ type: "startPlan", protocolId: protocol.id });

  return (
    <Screen eyebrow={protocolPosition(protocol)} title={protocol.title} onBack={goBack}>
      <Card>
        <SectionLabel right={`${protocol.reviewAfterDays}-day review point`}>About this step</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>{protocol.short}</div>
      </Card>
      <Card>
        <SectionLabel right={`${done} of ${protocol.checklist.length}`}>Checklist</SectionLabel>
        <div style={{ height: "6px", borderRadius: "99px", background: "var(--surface-inset)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${percent}%`, background: "var(--accent-signal)", borderRadius: "99px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {protocol.checklist.map((item, index) => {
            const complete = checked.has(index);
            return (
              <button key={item} onClick={() => toggle(index)} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span aria-hidden style={{ flex: "none", width: "22px", height: "22px", borderRadius: "6px", border: `1px solid ${complete ? "var(--accent-signal)" : "var(--border-hover)"}`, background: complete ? "var(--accent-signal-bg)" : "var(--surface-card)", color: "var(--text-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{complete ? "✓" : ""}</span>
                <span style={{ fontSize: "13.5px", lineHeight: 1.5, color: complete ? "var(--text-muted)" : "var(--text-primary)" }}>{item}</span>
              </button>
            );
          })}
        </div>
      </Card>
      <Card>
        <SectionLabel>Outcome review</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)" }}>{protocol.reviewQuestion}</div>
        {plan ? (
          <>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Return on {formatShort(plan.reviewDate)}. No daily check-ins required.</div>
            <Button onClick={() => navigate("plan")}>Open My Plan</Button>
          </>
        ) : <Button onClick={start}>Start this free plan</Button>}
      </Card>
      <div style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-muted)", textAlign: "center" }}>Protocol content is educational and does not replace care from a healthcare professional.</div>
    </Screen>
  );
}
