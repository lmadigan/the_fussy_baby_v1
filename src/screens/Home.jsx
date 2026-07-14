import React from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { InsightRow } from "../components/data/InsightRow.jsx";
import { StatRow } from "../components/data/StatRow.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { FeedbackPrompt } from "../components/app/FeedbackPrompt.jsx";
import { BabyFace } from "../components/app/BabyFace.jsx";
import { useStore, lastObservationDay } from "../lib/store.jsx";
import { generatePatterns } from "../lib/patterns.js";
import { INVESTIGATIONS, getInvestigation, matchInvestigations, statusInfo } from "../data/playbook.js";
import { getObservation, isRedFlag } from "../data/vocabulary.js";
import { formatLong, formatRelative, todayKey } from "../lib/dates.js";

/** Pick the investigation Home should feature, plus runner-up suggestions. */
export function homeInvestigation(state) {
  // Suggest from the standing symptom list + logged observations — most
  // overlapping signs, skipping anything the parent has checked or back-burnered.
  // Red flags never steer suggestions; they get their own pediatrician nudge.
  const seen = new Set(state.profile.onboardingSymptoms.filter((s) => !isRedFlag(s)));
  for (const day of Object.values(state.days))
    for (const o of day.observations) if (!o.startsWith("custom:") && !isRedFlag(o)) seen.add(o);
  const skip = new Set(
    Object.entries(state.statuses)
      .filter(([, s]) => s === "complete" || s === "low_priority")
      .map(([id]) => id)
  );
  const ranked = matchInvestigations([...seen])
    .filter((m) => !skip.has(m.investigation.id))
    .sort((a, b) => b.matches.length - a.matches.length)
    .map((m) => m.investigation);

  if (state.currentInvestigationId) {
    const current = getInvestigation(state.currentInvestigationId);
    return { investigation: current, suggested: false, alternates: ranked.filter((i) => i.id !== current.id).slice(0, 2) };
  }
  const pick = ranked[0] ?? INVESTIGATIONS.find((i) => !skip.has(i.id)) ?? INVESTIGATIONS[0];
  return { investigation: pick, suggested: true, alternates: ranked.filter((i) => i.id !== pick.id).slice(0, 2) };
}

/** Home — the command center. Helps parents know what to do next. */
export function Home({ navigate }) {
  const { state } = useStore();
  const { investigation, suggested, alternates } = homeInvestigation(state);
  const status = statusInfo(state.statuses[investigation.id] ?? "not_started");
  const patterns = generatePatterns(state);
  const lastDay = lastObservationDay(state);
  const name = state.profile.babyName;
  const loggedToday = Boolean(state.days[todayKey()]);
  const recentRedFlags = lastDay ? lastDay.observations.filter((o) => isRedFlag(o)) : [];

  // Care-advice progress + the literal next step for the featured cause
  const checkedSteps = new Set(state.checklists?.[investigation.id] ?? []);
  const stepsTotal = investigation.checklist.length;
  const stepsDone = checkedSteps.size;
  const nextStep = investigation.checklist.find((_, i) => !checkedSteps.has(i));

  // What matches what you're seeing, for the Top Causes list
  const seenNow = new Set(state.profile.onboardingSymptoms.filter((s) => !isRedFlag(s)));
  for (const day of Object.values(state.days))
    for (const o of day.observations) if (!o.startsWith("custom:") && !isRedFlag(o)) seenNow.add(o);
  const matchCounts = new Map(matchInvestigations([...seenNow]).map((m) => [m.investigation.id, m.matches.length]));

  return (
    <Screen
      eyebrow={formatLong(new Date())}
      title={name ? `How's ${name} doing today?` : "How's your baby doing today?"}
      action={<BabyFace />}
    >
      {recentRedFlags.length > 0 && (
        <Card style={{ borderColor: "var(--accent-signal)" }}>
          <SectionLabel style={{ color: "var(--text-brand)" }}>Worth a call today</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)", textWrap: "pretty" }}>
            {recentRedFlags.map((o) => getObservation(o)?.label ?? o).join(", ")} — observations like these are worth
            raising with your pediatrician on their own, whatever else you're exploring.
          </div>
        </Card>
      )}

      <Card>
        <SectionLabel
          right={<StatusBadge tone={suggested ? "neutral" : status.tone}>{suggested ? "Suggested" : status.label}</StatusBadge>}
        >
          {suggested ? "Here's What You Should Explore" : "What You're Exploring"}
        </SectionLabel>
        {suggested && (
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
            Based on what you've told us, we'd suggest starting here.
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-card-text)" }}>
          <div style={{ fontSize: "var(--type-title-size)", fontWeight: "var(--type-title-weight)", letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
            {investigation.title}
          </div>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
            {investigation.short}
          </div>
        </div>
        {!suggested && stepsTotal > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1, height: "6px", borderRadius: "99px", background: "var(--surface-inset)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round((stepsDone / stepsTotal) * 100)}%`, background: "var(--accent-signal)", borderRadius: "99px" }} />
              </div>
              <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                {stepsDone} of {stepsTotal}
              </div>
            </div>
            {nextStep && (
              <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)", textWrap: "pretty" }}>
                <span style={{ fontWeight: 600 }}>Your next step:</span> {nextStep}
              </div>
            )}
          </div>
        )}
        <Button onClick={() => navigate("investigation", { id: investigation.id })}>
          {suggested ? "Start Exploring" : "Keep Going"}
        </Button>
        {alternates.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>
              Also worth a look
            </div>
            {alternates.map((alt) => (
              <button
                key={alt.id}
                onClick={() => navigate("investigation", { id: alt.id })}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  padding: "10px 14px",
                  background: "var(--surface-inset)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-button)",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-brand)" }}>{alt.title}</span>
                <span aria-hidden style={{ color: "var(--text-muted)" }}>→</span>
              </button>
            ))}
          </div>
        )}
        <Button variant="secondary" onClick={() => navigate("symptoms")}>
          Update What You're Seeing
        </Button>
      </Card>

      <Card>
        <SectionLabel right={`${INVESTIGATIONS.length} total`}>Top Causes of Fussiness</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
          The most common reasons babies fuss — the whole playbook, always right here.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {INVESTIGATIONS.map((inv) => {
            const invStatus = state.statuses[inv.id];
            const matches = matchCounts.get(inv.id) ?? 0;
            return (
              <button
                key={inv.id}
                onClick={() => navigate("investigation", { id: inv.id })}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  padding: "10px 14px",
                  background: "var(--surface-inset)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-button)",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-brand)", minWidth: 0 }}>{inv.title}</span>
                {invStatus && invStatus !== "not_started" ? (
                  <StatusBadge tone={statusInfo(invStatus).tone}>{statusInfo(invStatus).label}</StatusBadge>
                ) : matches > 0 ? (
                  <span style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                    {matches} match{matches === 1 ? "" : "es"}
                  </span>
                ) : (
                  <span aria-hidden style={{ color: "var(--text-muted)" }}>→</span>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <FeedbackPrompt />

      <Card>
        <SectionLabel>What We've Learned</SectionLabel>
        {patterns.length === 0 ? (
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)", textWrap: "pretty" }}>
            We're still learning. Keep recording observations and we'll begin surfacing meaningful patterns.
          </div>
        ) : (
          patterns.slice(0, 2).map((p) => (
            <InsightRow key={p.investigationId}>
              <span style={{ fontWeight: 600 }}>{p.investigationTitle}:</span> {p.summary}
            </InsightRow>
          ))
        )}
        <Button variant="secondary" onClick={() => navigate("patterns")}>
          View All
        </Button>
      </Card>

      <Card>
        <SectionLabel>{loggedToday ? "Update Today's Observation" : "Record Today's Observation"}</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
          {loggedToday
            ? "Notice something new since you last logged? Add it to today."
            : `Totally optional, hugely helpful — ${name ? `a few taps about ${name}'s day` : "a few taps about today"} is what turns hunches into patterns.`}
        </div>
        <Button onClick={() => navigate("detective")}>{loggedToday ? "Edit Observation" : "Start Recording"}</Button>

        <div style={{ borderTop: "1px solid var(--border-default)", margin: "4px 0" }} />

        <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>
          {lastDay ? `Last recorded · ${formatRelative(lastDay.dateKey)}` : "Nothing recorded yet"}
        </div>
        {lastDay ? (
          <>
            <StatRow label="Fussiness" value={lastDay.fussiness} max={5} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
              {lastDay.observations.slice(0, 6).map((obs) => (
                <Tag key={obs}>{obs.startsWith("custom:") ? obs.slice(7) : getObservation(obs)?.label ?? obs}</Tag>
              ))}
              {lastDay.observations.length > 6 && <Tag tone="neutral">+{lastDay.observations.length - 6} more</Tag>}
            </div>
          </>
        ) : (
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
            Your first observation starts the picture.
          </div>
        )}
        <Button variant="secondary" onClick={() => navigate("history")}>
          Open Journal
        </Button>
      </Card>

      <Card>
        <SectionLabel>Guides</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
          <Tag tone="signal" onClick={() => navigate("learn", { section: "investigations" })}>Possible Causes</Tag>
          <Tag tone="signal" onClick={() => navigate("learn", { section: "matrix" })}>Symptom Explorer</Tag>
          <Tag tone="signal" onClick={() => navigate("learn", { section: "articles" })}>Good Reads</Tag>
        </div>
      </Card>
    </Screen>
  );
}
