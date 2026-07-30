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
import { DifferentialCard } from "../components/app/DifferentialCard.jsx";
import { useStore, lastObservationDay } from "../lib/store.jsx";
import { useDifferential } from "../lib/useDifferential.js";
import { setEndpoint, hasEndpoint } from "../lib/differential.js";
import { generatePatterns } from "../lib/patterns.js";
import { getInvestigation, statusInfo } from "../data/playbook.js";
import { getObservation, isRedFlag } from "../data/vocabulary.js";
import { formatLong, formatRelative, todayKey } from "../lib/dates.js";

/** The symptoms the differential runs on: standing list + logged, minus red flags & custom. */
export function activeSymptoms(state) {
  const seen = new Set(state.profile.onboardingSymptoms.filter((s) => !isRedFlag(s)));
  for (const day of Object.values(state.days))
    for (const o of day.observations) if (!o.startsWith("custom:") && !isRedFlag(o)) seen.add(o);
  return [...seen];
}

/** Home — symptom-first. Your symptoms → a live differential of possible causes. */
export function Home({ navigate }) {
  const { state } = useStore();
  const name = state.profile.babyName;
  const symptoms = activeSymptoms(state);
  const { status, result, error, reload } = useDifferential(symptoms, state.profile.babyAgeMonths);

  const patterns = generatePatterns(state);
  const lastDay = lastObservationDay(state);
  const loggedToday = Boolean(state.days[todayKey()]);
  const recentRedFlags = lastDay ? lastDay.observations.filter((o) => isRedFlag(o)) : [];

  // A cause the parent is actively working through (checklist started)
  const exploring = state.currentInvestigationId ? getInvestigation(state.currentInvestigationId) : null;
  const exploringStatus = exploring ? statusInfo(state.statuses[exploring.id] ?? "not_started") : null;

  const connectModel = () => {
    const url = window.prompt(
      "Paste your differential endpoint URL (your deployed proxy). Leave blank to disconnect."
    );
    if (url !== null) {
      setEndpoint(url);
      reload();
    }
  };

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

      {exploring && (
        <Card>
          <SectionLabel right={<StatusBadge tone={exploringStatus.tone}>{exploringStatus.label}</StatusBadge>}>
            You're exploring
          </SectionLabel>
          <div style={{ fontSize: "var(--type-title-size)", fontWeight: "var(--type-title-weight)", letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
            {exploring.title}
          </div>
          <Button variant="secondary" onClick={() => navigate("investigation", { id: exploring.id })}>
            Keep going
          </Button>
        </Card>
      )}

      {/* Possible causes — the model differential */}
      <Card>
        <SectionLabel>Based on what you're seeing</SectionLabel>
        {symptoms.length === 0 ? (
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
            Tell us what you've noticed and we'll suggest possible causes to look into.
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
            {symptoms.slice(0, 8).map((s) => (
              <Tag key={s} tone="signal">{getObservation(s)?.label ?? s}</Tag>
            ))}
            {symptoms.length > 8 && <Tag tone="neutral">+{symptoms.length - 8} more</Tag>}
          </div>
        )}
        <Button variant="secondary" onClick={() => navigate("symptoms")}>
          Update what you're seeing
        </Button>
      </Card>

      {symptoms.length > 0 && (
        <>
          {status === "loading" && <SkeletonCauses />}

          {status === "error" && (
            <Card>
              <SectionLabel>Couldn't reach the model</SectionLabel>
              <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>{error}</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <Button size="sm" onClick={reload}>Try again</Button>
                <Button size="sm" variant="secondary" onClick={connectModel}>Change endpoint</Button>
              </div>
            </Card>
          )}

          {status === "ready" && result && (
            <>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px", padding: "0 4px" }}>
                <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Possible causes
                </div>
                {result.isExample && (
                  <button
                    onClick={connectModel}
                    style={{ all: "unset", cursor: "pointer", fontSize: "12px", fontWeight: 600, color: "var(--text-brand)" }}
                  >
                    Connect live model →
                  </button>
                )}
              </div>

              {result.causes.map((cause, i) => (
                <DifferentialCard key={i} rank={i + 1} cause={cause} onExplore={(id) => navigate("investigation", { id })} />
              ))}

              {result.note && (
                <div style={{ fontSize: "12.5px", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty", padding: "0 4px" }}>
                  {result.note}
                </div>
              )}
            </>
          )}
        </>
      )}

      <FeedbackPrompt />

      <Card>
        <SectionLabel>What you've noticed over time</SectionLabel>
        {patterns.length === 0 ? (
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)", textWrap: "pretty" }}>
            Keep recording observations and we'll begin surfacing patterns that repeat over days.
          </div>
        ) : (
          patterns.slice(0, 2).map((p) => (
            <InsightRow key={p.investigationId}>
              <span style={{ fontWeight: 600 }}>{p.investigationTitle}:</span> {p.summary}
            </InsightRow>
          ))
        )}
        <Button variant="secondary" onClick={() => navigate("patterns")}>
          View all
        </Button>
      </Card>

      <Card>
        <SectionLabel>{loggedToday ? "Update today's observation" : "Record today's observation"}</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
          {loggedToday
            ? "Notice something new since you last logged? Add it to today."
            : `Totally optional, hugely helpful — ${name ? `a few taps about ${name}'s day` : "a few taps about today"} is what turns hunches into patterns.`}
        </div>
        <Button onClick={() => navigate("detective")}>{loggedToday ? "Edit observation" : "Start recording"}</Button>

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
          Open journal
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

/** Loading placeholder while the model thinks. */
function SkeletonCauses() {
  return (
    <>
      <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase", padding: "0 4px" }}>
        Thinking through possible causes…
      </div>
      {[0, 1, 2].map((i) => (
        <Card key={i}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "8px", background: "var(--surface-inset)" }} />
            <div className="fb-shimmer" style={{ height: "15px", width: "55%", borderRadius: "6px", background: "var(--surface-inset)" }} />
          </div>
          <div className="fb-shimmer" style={{ height: "11px", width: "100%", borderRadius: "6px", background: "var(--surface-inset)" }} />
          <div className="fb-shimmer" style={{ height: "11px", width: "80%", borderRadius: "6px", background: "var(--surface-inset)" }} />
        </Card>
      ))}
    </>
  );
}
