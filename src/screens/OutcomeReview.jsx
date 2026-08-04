import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
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
    const interpretation = result === "clearly_better" && followed === "yes"
      ? "This result makes the contributor more consistent with what you observed. Follow the protocol's confirmation or clinician-guided next step rather than treating improvement as a diagnosis."
      : result === "somewhat_better"
        ? "This may explain part of the fussiness. Another contributor could still be involved."
        : result === "unchanged" && followed === "yes"
          ? "This contributor may be less likely to explain the full picture. Consider the next Playbook step or reassess with Navigator."
          : result === "worse"
            ? "Stop and reassess the plan. Contact a healthcare professional about worsening or concerning symptoms."
            : "The protocol was not completed consistently enough to interpret. Restart or discuss a different plan.";
    return (
      <Screen eyebrow="Outcome saved" title="What this means">
        <Card style={{ borderColor: "var(--accent-signal)" }}>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>{interpretation}</div>
          <Button onClick={() => navigate("plan")}>Return to My Plan</Button>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen eyebrow="One-time check-in" title="Did this help?" onBack={goBack}>
      <Card>
        <SectionLabel>{protocol.title}</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>{protocol.reviewQuestion}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{RESULTS.map(([id, label]) => <Tag key={id} tone="neutral" selected={result === id} onClick={() => setResult(id)}>{label}</Tag>)}</div>
      </Card>
      <Card>
        <SectionLabel>Were you able to follow the plan?</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{[["yes", "Yes"], ["partly", "Partly"], ["no", "No"]].map(([id, label]) => <Tag key={id} tone="neutral" selected={followed === id} onClick={() => setFollowed(id)}>{label}</Tag>)}</div>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Anything you want to remember (optional)" style={{ boxSizing: "border-box", width: "100%", minHeight: "80px", resize: "vertical", padding: "12px 14px", borderRadius: "var(--radius-button)", border: "1px solid var(--border-default)", background: "var(--surface-inset)", color: "var(--text-primary)", font: "inherit", lineHeight: 1.55 }} />
      </Card>
      <Button disabled={!result || !followed} style={!result || !followed ? { opacity: 0.45, cursor: "default" } : undefined} onClick={() => result && followed && save()}>Save outcome</Button>
    </Screen>
  );
}
