import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore } from "../lib/store.jsx";
import { getCause, getProtocolStep, protocolPosition } from "../data/playbook.js";
import { formatShort } from "../lib/dates.js";

export function ProtocolDetail({ navigate, goBack, params }) {
  const { state, dispatch } = useStore();
  const protocol = getProtocolStep(params.id);
  if (!protocol) return <Screen title="Protocol" onBack={goBack}><Card>This protocol is not available yet.</Card></Screen>;
  const checked = new Set(state.protocolChecklists[protocol.id] ?? []);
  const plan = state.plans[protocol.id];
  const relatedCauses = protocol.relatedCauseIds.map(getCause).filter(Boolean);
  const done = checked.size;
  const percent = Math.round((done / protocol.checklist.length) * 100);

  const toggle = (index) => dispatch({ type: "toggleProtocolItem", protocolId: protocol.id, index });
  const start = () => dispatch({ type: "startPlan", protocolId: protocol.id });

  return (
    <Screen eyebrow={protocolPosition(protocol)} title={protocol.title} onBack={goBack}>
      <Card>
        <SectionLabel>About this step</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>{protocol.short}</div>
        {protocol.approachNote && (
          <div style={{ padding: "10px 12px", background: "var(--accent-signal-bg)", borderRadius: "var(--radius-field)", fontSize: "13px", lineHeight: 1.5, color: "var(--text-primary)" }}>
            {protocol.approachNote}
          </div>
        )}
        <div style={{ padding: "10px 12px", background: "var(--surface-inset)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-field)", fontSize: "13px", lineHeight: 1.5, color: "var(--text-brand)", fontWeight: 600 }}>
          {protocol.reviewWindow}
        </div>
      </Card>
      {protocol.fitGuidance && (
        <Card>
          <SectionLabel>Is this step for you?</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "13px", lineHeight: 1.4, fontWeight: 650, color: "var(--text-primary)", marginBottom: "3px" }}>Do this step if</div>
              <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{protocol.fitGuidance.doThis}</div>
            </div>
            <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border-default)" }}>
              <div style={{ fontSize: "13px", lineHeight: 1.4, fontWeight: 650, color: "var(--text-primary)", marginBottom: "3px" }}>If these signs are not present</div>
              <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{protocol.fitGuidance.ifNot}</div>
            </div>
          </div>
          {protocol.fitGuidance.nextProtocolId && (
            <Button variant="secondary" onClick={() => navigate("protocol", { id: protocol.fitGuidance.nextProtocolId })}>{protocol.fitGuidance.nextAction}</Button>
          )}
        </Card>
      )}
      {relatedCauses.length > 0 && (
        <Card>
          <SectionLabel>What this may relate to</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {relatedCauses.map((cause, index) => (
              <div key={cause.id} style={{ display: "flex", flexDirection: "column", gap: "6px", padding: index === 0 ? "0 0 14px" : "14px 0", borderBottom: index < relatedCauses.length - 1 ? "1px solid var(--border-default)" : "none" }}>
                <div style={{ fontSize: "12px", lineHeight: 1.4, fontWeight: 650, color: "var(--text-brand)" }}>#{cause.rank} in Causes</div>
                <div style={{ fontSize: "14px", lineHeight: 1.4, fontWeight: 650, color: "var(--text-primary)" }}>{cause.title}</div>
                <div style={{ fontSize: "13px", lineHeight: 1.45, color: "var(--text-muted)" }}>{cause.short}</div>
                <Button size="sm" variant="secondary" aria-label={`Read about ${cause.title}`} onClick={() => navigate("cause", { id: cause.id })}>Read about this cause</Button>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "12px", lineHeight: 1.45, color: "var(--text-muted)" }}>The number reflects the app's educational order, not how likely this cause is for your baby.</div>
        </Card>
      )}
      <Card>
        <SectionLabel right={<StatusBadge tone="calm">{done} of {protocol.checklist.length}</StatusBadge>}>{protocol.checklistLabel ?? "Checklist"}</SectionLabel>
        {protocol.checklistIntro && (
          <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{protocol.checklistIntro}</div>
        )}
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
      {protocol.helpfulResources?.length > 0 && (
        <Card>
          <SectionLabel>Helpful resources</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {protocol.helpfulResources.map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "12px", background: "var(--surface-inset)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-field)", color: "inherit", textDecoration: "none" }}
              >
                <span style={{ fontSize: "14px", lineHeight: 1.4, fontWeight: 650, color: "var(--text-primary)" }}>{resource.title}</span>
                <span style={{ fontSize: "13px", lineHeight: 1.45, color: "var(--text-muted)" }}>{resource.description}</span>
                <span style={{ fontSize: "13px", lineHeight: 1.4, fontWeight: 600, color: "var(--text-brand)" }}>{resource.action}</span>
              </a>
            ))}
          </div>
        </Card>
      )}
      {protocol.relatedSteps?.map((step) => (
        <Card key={step.protocolId}>
          <SectionLabel>Where to go next</SectionLabel>
          <div style={{ fontSize: "14px", lineHeight: 1.45, fontWeight: 650, color: "var(--text-primary)" }}>{step.title}</div>
          <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{step.description}</div>
          <Button variant="secondary" onClick={() => navigate("protocol", { id: step.protocolId })}>{step.action}</Button>
        </Card>
      ))}
      {protocol.contactSooner?.length > 0 && (
        <Card>
          <SectionLabel>Contact a healthcare professional sooner if</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {protocol.contactSooner.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13.5px", lineHeight: 1.5, color: "var(--text-primary)" }}>
                <span aria-hidden="true" style={{ color: "var(--text-brand)", fontWeight: 700 }}>!</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
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
      <details style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-card)", padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
        <summary style={{ cursor: "pointer", color: "var(--text-brand)", fontSize: "14px", fontWeight: 600 }}>Evidence behind this step</summary>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "14px" }}>
          {protocol.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer" style={{ color: "var(--text-brand)", fontSize: "13px", lineHeight: 1.45 }}>
              {source.label}
            </a>
          ))}
        </div>
      </details>
      <div style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-muted)", textAlign: "center" }}>Protocol content is educational and does not replace care from a healthcare professional.</div>
    </Screen>
  );
}
