import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { StatRow } from "../components/data/StatRow.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore } from "../lib/store.jsx";
import { getInvestigation } from "../data/playbook.js";
import { getObservation } from "../data/vocabulary.js";
import { formatShort } from "../lib/dates.js";

export function Patterns({ navigate }) {
  const { state } = useStore();
  const id = state.currentInvestigationId;
  const investigation = id ? getInvestigation(id) : null;

  if (!investigation) {
    return (
      <Screen eyebrow="Guided investigation" title="Progress">
        <Card>
          <SectionLabel>Nothing active yet</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>Start with a Symptom Navigator assessment, then choose one possible contributor to investigate with short, focused check-ins.</div>
          <Button onClick={() => navigate("navigator")}>Open Symptom Navigator</Button>
        </Card>
      </Screen>
    );
  }

  const meta = state.investigations?.[id] ?? { reviewDays: investigation.reviewDays };
  const days = Object.entries(state.days)
    .filter(([, day]) => day.investigationIds?.includes(id))
    .map(([dateKey, day]) => ({ dateKey, ...day }))
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey));
  const ratedDays = days.filter((day) => day.fussiness != null);
  const average = ratedDays.length ? ratedDays.reduce((sum, day) => sum + day.fussiness, 0) / ratedDays.length : null;
  const counts = investigation.trackingSigns.map((sign) => ({ sign, count: days.filter((day) => day.observations.includes(sign)).length }));
  const reviewDays = meta.reviewDays ?? investigation.reviewDays;
  const checked = state.checklists?.[id]?.length ?? 0;
  let read = "Your first focused check-in creates the baseline.";
  if (days.length > 0 && days.length < 3) read = "You have a starting point. A few more check-ins will make the direction easier to interpret.";
  if (days.length >= 3) read = `You now have ${days.length} focused check-ins. Look for changes that repeat across days, not a single unusually easy or hard day.`;

  return (
    <Screen eyebrow="Guided investigation" title="Progress">
      <Card>
        <SectionLabel right={`${Math.min(days.length, reviewDays)} of ${reviewDays} days`}>Exploring</SectionLabel>
        <div style={{ fontSize: "var(--type-title-size)", fontWeight: "var(--type-title-weight)", color: "var(--text-primary)" }}>{investigation.title}</div>
        <div style={{ height: "7px", borderRadius: "99px", background: "var(--surface-inset)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.min(100, Math.round((days.length / reviewDays) * 100))}%`, background: "var(--accent-signal)", borderRadius: "99px" }} />
        </div>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)" }}>{read}</div>
        <Button onClick={() => navigate("detective", { investigationId: id })}>Check in today</Button>
        <Button variant="secondary" onClick={() => navigate("investigation", { id })}>Open investigation plan</Button>
      </Card>

      <Card>
        <SectionLabel>Signals you're watching</SectionLabel>
        {counts.map(({ sign, count }) => (
          <div key={sign} style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "baseline", padding: "5px 0" }}>
            <span style={{ fontSize: "13.5px", color: "var(--text-primary)" }}>{getObservation(sign)?.label ?? sign}</span>
            <span style={{ flex: "none", fontSize: "12.5px", color: "var(--text-muted)" }}>{count} of {days.length || 0}</span>
          </div>
        ))}
        {average != null && <StatRow label="Average fussiness" value={Math.round(average * 10) / 10} max={5} />}
      </Card>

      <Card>
        <SectionLabel right={`${checked} of ${investigation.checklist.length}`}>Investigation steps</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)" }}>Use the curated plan to change one thing at a time and give the observation window time to become informative.</div>
        <Button variant="secondary" onClick={() => navigate("investigation", { id })}>Review steps</Button>
      </Card>

      {days.length > 0 && (
        <Card>
          <SectionLabel>Focused check-ins</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>{days.map((day) => <Tag key={day.dateKey} tone="neutral">{formatShort(day.dateKey)}</Tag>)}</div>
        </Card>
      )}

      <div style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-muted)", textAlign: "center", padding: "0 8px" }}>Progress summarizes parent-approved observations. It does not confirm or rule out a diagnosis.</div>
    </Screen>
  );
}
