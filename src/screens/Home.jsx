import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { BabyFace } from "../components/app/BabyFace.jsx";
import { useStore } from "../lib/store.jsx";
import { getProtocolStep, protocolForCause, protocolPosition } from "../data/playbook.js";
import { getObservation, isRedFlag } from "../data/vocabulary.js";
import { formatLong, formatShort } from "../lib/dates.js";

export function Home({ navigate }) {
  const { state } = useStore();
  const name = state.profile.babyName;
  const assessment = state.assessment;
  const strongest = assessment?.causes?.[0];
  const strongestProtocol = strongest ? protocolForCause(strongest.playbookId) : null;
  const active = state.activePlanId ? getProtocolStep(state.activePlanId) : null;
  const plan = active ? state.plans[active.id] : null;
  const checked = active ? state.protocolChecklists[active.id]?.length ?? 0 : 0;
  const redFlags = state.profile.onboardingSymptoms.filter(isRedFlag);

  return (
    <Screen eyebrow={formatLong(new Date())} title={name ? `How's ${name} doing?` : "How's your baby doing?"} action={<BabyFace />}>
      {redFlags.length > 0 && (
        <Card style={{ borderColor: "var(--accent-signal)" }}>
          <SectionLabel style={{ color: "var(--text-brand)" }}>Contact a healthcare professional</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)" }}>
            {redFlags.map((id) => getObservation(id)?.label ?? id).join(", ")} should be discussed with your baby's healthcare professional.
          </div>
        </Card>
      )}

      {assessment ? (
        <Card style={{ borderColor: "var(--accent-signal)" }}>
          <SectionLabel right="Premium assessment">Strongest match</SectionLabel>
          <div style={{ fontSize: "var(--type-title-size)", fontWeight: 700, color: "var(--text-primary)" }}>{strongest?.name}</div>
          {strongestProtocol && <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-brand)" }}>{protocolPosition(strongestProtocol)}</div>}
          {strongest?.matching?.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{strongest.matching.slice(0, 4).map((label) => <Tag key={label} tone="signal">{label}</Tag>)}</div>}
          <Button variant="secondary" onClick={() => navigate("navigator")}>Review AI assessment</Button>
        </Card>
      ) : (
        <Card>
          <SectionLabel right="Premium">Need a personalized starting point?</SectionLabel>
          <div style={{ fontSize: "var(--type-title-size)", fontWeight: 700, color: "var(--text-primary)" }}>Find the strongest match</div>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>Describe what you are seeing and Navigator will organize the contributors that fit best.</div>
          <Button onClick={() => navigate("navigator")}>Open AI Navigator</Button>
        </Card>
      )}

      {active && plan ? (
        <Card>
          <SectionLabel right={protocolPosition(active)}>My current plan</SectionLabel>
          <div style={{ fontSize: "var(--type-title-size)", fontWeight: 700, color: "var(--text-primary)" }}>{active.title}</div>
          <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{checked} of {active.checklist.length} checklist items complete. Outcome review: {formatShort(plan.reviewDate)}.</div>
          <Button onClick={() => navigate("plan")}>Continue My Plan</Button>
        </Card>
      ) : (
        <Card>
          <SectionLabel>Free Playbook</SectionLabel>
          <div style={{ fontSize: "var(--type-title-size)", fontWeight: 700, color: "var(--text-primary)" }}>Follow the complete protocol yourself</div>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>Browse the top causes, open every checklist, and choose where to begin without a subscription.</div>
          <Button onClick={() => navigate("playbook")}>Open the Playbook</Button>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <button onClick={() => navigate("playbook", { view: "causes" })} style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-card)", background: "var(--surface-card)", padding: "14px", textAlign: "left", cursor: "pointer", font: "inherit", color: "var(--text-primary)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>Free reference</div>
          <div style={{ fontSize: "14px", fontWeight: 700 }}>Browse causes</div>
        </button>
        <button onClick={() => navigate("playbook")} style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-card)", background: "var(--surface-card)", padding: "14px", textAlign: "left", cursor: "pointer", font: "inherit", color: "var(--text-primary)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>Six phases</div>
          <div style={{ fontSize: "14px", fontWeight: 700 }}>View protocol</div>
        </button>
      </div>
    </Screen>
  );
}
