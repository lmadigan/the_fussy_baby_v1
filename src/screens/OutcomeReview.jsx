import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Input } from "../components/forms/Input.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore } from "../lib/store.jsx";
import { getProtocolStep } from "../data/playbook.js";

const RESULTS = [
  ["clearly_better", "Clearly better"],
  ["somewhat_better", "Somewhat better"],
  ["unchanged", "No meaningful change"],
  ["worse", "Worse"],
];

export function OutcomeReview({ navigate, goBack, params }) {
  const { dispatch } = useStore();
  const protocol = getProtocolStep(params.id);
  const [result, setResult] = useState("");
  const [followed, setFollowed] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  if (!protocol) return <Screen title="Outcome review" onBack={goBack}><Card>This plan is not available.</Card></Screen>;

  const save = () => {
    dispatch({ type: "saveOutcome", protocolId: protocol.id, result, followed, note });
    setSaved(true);
  };

  if (saved) {
    const interpretation = followed === "yes"
      ? protocol.outcomeGuidance[result]
      : "The plan was not followed consistently enough to interpret the result. Restart only if the plan still fits, or discuss a different next step with a healthcare professional.";
    return (
      <Screen eyebrow="Outcome saved" title="What this means">
        <Card>
          <SectionLabel right={<StatusBadge tone="calm">Saved</StatusBadge>}>Outcome review</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>{interpretation}</div>
          <Button onClick={() => navigate("plan")}>Return to My Plan</Button>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen eyebrow="Outcome review" title="Did this help?" onBack={goBack}>
      <Card>
        <SectionLabel>{protocol.title}</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>{protocol.reviewQuestion}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{RESULTS.map(([id, label]) => <Tag key={id} tone="neutral" selected={result === id} onClick={() => setResult(id)}>{label}</Tag>)}</div>
      </Card>
      <Card>
        <SectionLabel>Were you able to follow the plan?</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{[["yes", "Yes"], ["partly", "Partly"], ["no", "No"]].map(([id, label]) => <Tag key={id} tone="neutral" selected={followed === id} onClick={() => setFollowed(id)}>{label}</Tag>)}</div>
        <Input multiline value={note} onChange={(event) => setNote(event.target.value)} placeholder="Anything you want to remember (optional)" style={{ minHeight: "80px" }} />
      </Card>
      <Button disabled={!result || !followed} style={!result || !followed ? { opacity: 0.45, cursor: "default" } : undefined} onClick={() => result && followed && save()}>Save outcome</Button>
    </Screen>
  );
}
