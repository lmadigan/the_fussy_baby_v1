import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
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
        <SectionLabel right={<StatusBadge tone="calm">{done} of {protocol.checklist.length}</StatusBadge>}>Checklist</SectionLabel>
        <div style={{ height: "6px", borderRadius: "99px", background: "var(--surface-inset)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${percent}%`, background: "var(--accent-calm)", borderRadius: "99px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {protocol.checklist.map((item, index) => {
            const complete = checked.has(index);
            return (
              <label key={item} style={{ cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "12px", minHeight: "var(--hit-min)" }}>
                <input type="checkbox" checked={complete} onChange={() => toggle(index)} style={{ flex: "none", width: "20px", height: "20px", margin: "1px 0 0", accentColor: "var(--navy-800)" }} />
                <span style={{ fontSize: "13.5px", lineHeight: 1.5, color: complete ? "var(--text-muted)" : "var(--text-primary)" }}>{item}</span>
              </label>
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
