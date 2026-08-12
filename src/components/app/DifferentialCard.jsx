import React from "react";
import { Card } from "../core/Card.jsx";
import { Button } from "../core/Button.jsx";
import { CardTitle } from "../core/CardTitle.jsx";
import { SectionLabel } from "../core/SectionLabel.jsx";
import { StatusBadge } from "../core/StatusBadge.jsx";
import { InsightRow } from "../data/InsightRow.jsx";
import { protocolForCause, protocolPosition } from "../../data/playbook.js";

export function DifferentialCard({ rank, cause, onExplore }) {
  const protocol = protocolForCause(cause.playbookId);
  return (
    <Card>
      <SectionLabel right={<StatusBadge tone={rank === 1 ? "warm" : "calm"}>{rank === 1 ? "Top match" : "May contribute"}</StatusBadge>}>
        AI assessment
      </SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-card-text)" }}>
        <CardTitle>{cause.name}</CardTitle>
        {protocol && <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 600, color: "var(--text-brand)" }}>{protocolPosition(protocol)}</div>}
        {cause.description && <div style={{ fontSize: "var(--type-body-size)", lineHeight: "var(--type-body-line)", color: "var(--text-muted)", textWrap: "pretty" }}>{cause.description}</div>}
      </div>

      {cause.matching.length > 0 && <EvidenceGroup label="What fits" items={cause.matching} tone="signal" />}
      {cause.notFitting.length > 0 && <EvidenceGroup label="Worth noting" items={cause.notFitting} tone="neutral" />}
      {cause.missingInformation?.length > 0 && <EvidenceGroup label="What would make this clearer" items={cause.missingInformation} tone="neutral" />}

      <Button variant="secondary" onClick={() => onExplore(cause.playbookId)}>View match in Playbook</Button>
    </Card>
  );
}

function EvidenceGroup({ label, items, tone }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ fontSize: "var(--type-label-size)", fontWeight: 600, letterSpacing: "var(--type-label-tracking)", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</div>
      {items.map((item) => <InsightRow key={item} tone={tone}>{item}</InsightRow>)}
    </div>
  );
}
