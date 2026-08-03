import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { StatRow } from "../components/data/StatRow.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { BabyFace } from "../components/app/BabyFace.jsx";
import { useStore, lastObservationDay } from "../lib/store.jsx";
import { getInvestigation, statusInfo } from "../data/playbook.js";
import { getObservation, isRedFlag } from "../data/vocabulary.js";
import { formatLong, formatRelative } from "../lib/dates.js";

export function Home({ navigate }) {
  const { state } = useStore();
  const name = state.profile.babyName;
  const assessment = state.assessment;
  const strongest = assessment?.causes?.[0];
  const contributors = assessment?.causes?.slice(1) ?? [];
  const active = state.currentInvestigationId ? getInvestigation(state.currentInvestigationId) : null;
  const activeStatus = active ? statusInfo(state.statuses[active.id] ?? "in_progress") : null;
  const activeDays = active ? Object.values(state.days).filter((day) => day.investigationIds?.includes(active.id)).length : 0;
  const lastDay = lastObservationDay(state);
  const redFlags = [...new Set([
    ...state.profile.onboardingSymptoms.filter(isRedFlag),
    ...(lastDay?.observations?.filter(isRedFlag) ?? []),
  ])];

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

      {!assessment ? (
        <Card>
          <SectionLabel>Start with what you're seeing</SectionLabel>
          <div style={{ fontSize: "var(--type-title-size)", fontWeight: "var(--type-title-weight)", color: "var(--text-primary)" }}>Find the contributors that fit</div>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>
            Describe the stool, skin, feeds, sleep, and fussiness. The Navigator will organize the strongest possibilities and show what would make each one clearer.
          </div>
          <Button onClick={() => navigate("navigator")}>Open Symptom Navigator</Button>
        </Card>
      ) : (
        <Card>
          <SectionLabel right="Latest assessment">Strongest match</SectionLabel>
          <div style={{ fontSize: "var(--type-title-size)", fontWeight: "var(--type-title-weight)", color: "var(--text-primary)" }}>{strongest?.name}</div>
          {strongest?.matching?.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{strongest.matching.slice(0, 5).map((label) => <Tag key={label} tone="signal">{label}</Tag>)}</div>}
          {contributors.length > 0 && <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>May also contribute: {contributors.map((item) => item.name).join(" and ")}.</div>}
          <Button variant="secondary" onClick={() => navigate("navigator")}>Review or update assessment</Button>
        </Card>
      )}

      {active ? (
        <Card>
          <SectionLabel right={<StatusBadge tone={activeStatus.tone}>{activeStatus.label}</StatusBadge>}>Current investigation</SectionLabel>
          <div style={{ fontSize: "var(--type-title-size)", fontWeight: "var(--type-title-weight)", color: "var(--text-primary)" }}>{active.title}</div>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)" }}>{activeDays} targeted check-in{activeDays === 1 ? "" : "s"} saved. A few quick observations are enough to see whether the fit gets stronger or weaker.</div>
          <Button onClick={() => navigate("detective", { investigationId: active.id })}>Check in today</Button>
          <Button variant="secondary" onClick={() => navigate("patterns")}>View progress</Button>
        </Card>
      ) : assessment ? (
        <Card>
          <SectionLabel>Next step</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)" }}>Choose one contributor to investigate. The app will ask only about the few signs that matter for that possibility.</div>
          {strongest?.playbookId && <Button onClick={() => navigate("investigation", { id: strongest.playbookId })}>Explore {strongest.name}</Button>}
        </Card>
      ) : null}

      <Card>
        <SectionLabel>Recent journal</SectionLabel>
        {lastDay ? (
          <>
            <div style={{ fontSize: "var(--type-meta-size)", color: "var(--text-muted)" }}>Last recorded · {formatRelative(lastDay.dateKey)}</div>
            <StatRow label="Fussiness" value={lastDay.fussiness} max={5} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{lastDay.observations.slice(0, 5).map((id) => <Tag key={id}>{id.startsWith("custom:") ? id.slice(7) : getObservation(id)?.label ?? id}</Tag>)}</div>
          </>
        ) : <div style={{ fontSize: "var(--type-body-size)", color: "var(--text-muted)" }}>No check-ins saved yet.</div>}
        <Button variant="secondary" onClick={() => navigate("history")}>Open journal</Button>
      </Card>
    </Screen>
  );
}
