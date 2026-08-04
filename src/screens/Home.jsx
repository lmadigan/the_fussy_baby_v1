import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { CardTitle } from "../components/core/CardTitle.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Screen } from "../components/app/Screen.jsx";
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
    <Screen eyebrow={name ? `${formatLong(new Date())} · For ${name}` : formatLong(new Date())} title="The Fussy Baby" brand>
      {redFlags.length > 0 && (
        <Card>
          <SectionLabel right={<StatusBadge tone="warm">Pay attention</StatusBadge>}>Contact a healthcare professional</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)" }}>
            {redFlags.map((id) => getObservation(id)?.label ?? id).join(", ")} should be discussed with your baby's healthcare professional.
          </div>
        </Card>
      )}

      {assessment ? (
        <Card>
          <SectionLabel right={<StatusBadge tone="warm">Premium</StatusBadge>}>Strongest match</SectionLabel>
          <CardTitle>{strongest?.name}</CardTitle>
          {strongestProtocol && <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 600, color: "var(--text-brand)" }}>{protocolPosition(strongestProtocol)}</div>}
          {strongest?.matching?.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{strongest.matching.slice(0, 4).map((label) => <Tag key={label} tone="warm">{label}</Tag>)}</div>}
          <Button variant="secondary" onClick={() => navigate("navigator")}>Review AI assessment</Button>
        </Card>
      ) : (
        <Card>
          <SectionLabel right={<StatusBadge tone="warm">Premium</StatusBadge>}>Personalized starting point</SectionLabel>
          <CardTitle>Find the strongest match</CardTitle>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>Describe what you are seeing and Navigator will organize the contributors that fit best.</div>
          <Button onClick={() => navigate("navigator")}>Open AI Navigator</Button>
        </Card>
      )}

      {active && plan ? (
        <Card>
          <SectionLabel right={<StatusBadge tone="calm">In progress</StatusBadge>}>My current plan</SectionLabel>
          <CardTitle>{active.title}</CardTitle>
          <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 600, color: "var(--text-brand)" }}>{protocolPosition(active)}</div>
          <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{checked} of {active.checklist.length} checklist items complete. Outcome review: {formatShort(plan.reviewDate)}.</div>
          <Button onClick={() => navigate("plan")}>Continue My Plan</Button>
        </Card>
      ) : (
        <Card>
          <SectionLabel>Free Playbook</SectionLabel>
          <CardTitle>Follow the complete protocol yourself</CardTitle>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>Browse the top causes, open every checklist, and choose where to begin without a subscription.</div>
          <Button onClick={() => navigate("playbook")}>Open the Playbook</Button>
        </Card>
      )}

      <Card>
        <SectionLabel>Explore the Playbook</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
          <Button size="sm" variant="secondary" onClick={() => navigate("playbook", { view: "causes" })}>Browse causes</Button>
          <Button size="sm" variant="secondary" onClick={() => navigate("playbook")}>View six phases</Button>
        </div>
      </Card>
    </Screen>
  );
}
