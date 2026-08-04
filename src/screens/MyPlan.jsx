import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { CardTitle } from "../components/core/CardTitle.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore } from "../lib/store.jsx";
import { getProtocolStep, protocolPosition } from "../data/playbook.js";
import { formatShort, todayKey } from "../lib/dates.js";

const OUTCOME_LABELS = {
  clearly_better: "Clearly better",
  somewhat_better: "Somewhat better",
  unchanged: "No meaningful change",
  worse: "Worse",
};

export function MyPlan({ navigate }) {
  const { state } = useStore();
  const protocol = state.activePlanId ? getProtocolStep(state.activePlanId) : null;
  const plan = protocol ? state.plans[protocol.id] : null;
  const outcome = protocol ? state.outcomes[protocol.id] : null;

  if (!protocol || !plan) {
    return (
      <Screen eyebrow="Free planning" title="My Plan">
        <Card>
          <SectionLabel>No active plan</SectionLabel>
          <CardTitle>Choose a Playbook step</CardTitle>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>Every protocol checklist is free. Start with Step 1 or choose the cause you want to understand.</div>
          <Button onClick={() => navigate("playbook")}>Open Playbook</Button>
        </Card>
      </Screen>
    );
  }

  const done = state.protocolChecklists[protocol.id]?.length ?? 0;
  const reviewReady = todayKey() >= plan.reviewDate;

  return (
    <Screen eyebrow={protocolPosition(protocol)} title="My Plan">
      <Card>
        <SectionLabel right={<StatusBadge tone="calm">{plan.status === "reviewed" ? "Reviewed" : "In progress"}</StatusBadge>}>Current protocol</SectionLabel>
        <CardTitle>{protocol.title}</CardTitle>
        <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{done} of {protocol.checklist.length} checklist items complete.</div>
        <Button onClick={() => navigate("protocol", { id: protocol.id })}>Continue checklist</Button>
      </Card>

      <Card>
        <SectionLabel>Return point</SectionLabel>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "25px", fontWeight: 400, color: "var(--text-primary)" }}>{formatShort(plan.reviewDate)}</div>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)" }}>No daily logging. Follow the protocol consistently, then return once to review whether it helped.</div>
        {!outcome && <Button disabled={!reviewReady} style={!reviewReady ? { opacity: 0.45, cursor: "default" } : undefined} onClick={() => reviewReady && navigate("outcome", { id: protocol.id })}>{reviewReady ? "Review the outcome" : `Outcome review opens ${formatShort(plan.reviewDate)}`}</Button>}
      </Card>

      {outcome && (
        <Card>
          <SectionLabel right={<StatusBadge tone="calm">Saved</StatusBadge>}>Outcome</SectionLabel>
          <CardTitle>{OUTCOME_LABELS[outcome.result]}</CardTitle>
          <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{outcome.followed === "yes" ? "Protocol completed consistently." : outcome.followed === "partly" ? "Protocol completed only partly." : "Protocol was not completed consistently."}</div>
          <Button variant="secondary" onClick={() => navigate("navigator")}>{state.membership === "premium" ? "Reassess with Navigator" : "Get personalized help"}</Button>
        </Card>
      )}
    </Screen>
  );
}
