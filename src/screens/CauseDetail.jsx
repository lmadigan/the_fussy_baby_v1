import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { CardTitle } from "../components/core/CardTitle.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore } from "../lib/store.jsx";
import { getCause, protocolForCause, protocolPosition } from "../data/playbook.js";
import { getObservation } from "../data/vocabulary.js";

export function CauseDetail({ navigate, goBack, params }) {
  const { state } = useStore();
  const cause = getCause(params.id);
  if (!cause) return <Screen title="Cause" onBack={goBack}><Card>This cause is not in the Playbook yet.</Card></Screen>;
  const protocol = protocolForCause(cause.id);
  const assessmentCause = state.assessment?.causes?.find((item) => item.playbookId === cause.id);

  return (
    <Screen eyebrow={`Cause ${cause.rank} · ${cause.evidenceLabel}`} title={cause.title} onBack={goBack}>
      {assessmentCause && (
        <Card>
          <SectionLabel right={<StatusBadge tone="warm">Matched</StatusBadge>}>From your premium assessment</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)" }}>{assessmentCause.description}</div>
          {assessmentCause.matching.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{assessmentCause.matching.map((item) => <Tag key={item} tone="warm">{item}</Tag>)}</div>}
        </Card>
      )}
      <Card>
        <SectionLabel>What it means</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>{cause.whatIsIt}</div>
      </Card>
      {cause.commonFoods?.length > 0 && (
        <Card>
          <SectionLabel>Foods most often involved</SectionLabel>
          <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{cause.foodListIntro}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {cause.commonFoods.map((food, index) => (
              <div key={food.name} style={{ display: "grid", gridTemplateColumns: "24px minmax(0, 1fr)", gap: "10px", padding: "12px 0", borderBottom: index < cause.commonFoods.length - 1 ? "1px solid var(--border-default)" : "none" }}>
                <div style={{ fontSize: "13px", lineHeight: 1.5, fontWeight: 700, color: "var(--text-brand)" }}>{index + 1}</div>
                <div>
                  <div style={{ fontSize: "14px", lineHeight: 1.45, fontWeight: 650, color: "var(--text-primary)" }}>{food.name}</div>
                  <div style={{ marginTop: "2px", fontSize: "13.5px", lineHeight: 1.5, color: "var(--text-muted)" }}>{food.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {cause.ourApproach && (
        <Card>
          <SectionLabel>Our approach</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>{cause.ourApproach}</div>
        </Card>
      )}
      <Card>
        <SectionLabel>Common signs</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{cause.signs.map((id) => <Tag key={id}>{getObservation(id)?.label ?? id}</Tag>)}</div>
      </Card>
      {protocol && (
        <Card>
          <SectionLabel>{protocolPosition(protocol)}</SectionLabel>
          <CardTitle>{protocol.title}</CardTitle>
          <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{protocol.short}</div>
          <Button onClick={() => navigate("protocol", { id: protocol.id })}>View free protocol</Button>
        </Card>
      )}
      <div style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-muted)", textAlign: "center" }}>This educational page does not diagnose a condition.</div>
    </Screen>
  );
}
