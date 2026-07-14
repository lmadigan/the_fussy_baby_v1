import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore } from "../lib/store.jsx";
import { getInvestigation, statusInfo, STATUSES } from "../data/playbook.js";
import { getObservation } from "../data/vocabulary.js";
import { getArticle } from "../data/articles.js";

/** Investigation — one Playbook investigation: What is this? · Common Signs · Checklist · Learn More · Status. */
export function InvestigationDetail({ navigate, goBack, params }) {
  const { state, dispatch } = useStore();
  const investigation = getInvestigation(params.id);
  const [choosingStatus, setChoosingStatus] = useState(false);

  if (!investigation) {
    return (
      <Screen title="Possible Cause" onBack={goBack}>
        <Card>
          <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>This one isn't in the Playbook yet.</div>
        </Card>
      </Screen>
    );
  }

  const status = statusInfo(state.statuses[investigation.id] ?? "not_started");

  // Signs the parent has already reported (onboarding + saved observations)
  const reported = new Set(state.profile.onboardingSymptoms);
  for (const day of Object.values(state.days)) for (const o of day.observations) if (!o.startsWith("custom:")) reported.add(o);
  const yourSigns = investigation.signs.filter((s) => reported.has(s));
  const otherSigns = investigation.signs.filter((s) => !reported.has(s));

  const setStatus = (statusId) => {
    dispatch({ type: "setStatus", investigationId: investigation.id, status: statusId });
    setChoosingStatus(false);
  };

  return (
    <Screen
      title={investigation.title}
      eyebrow="Possible Cause"
      onBack={goBack}
      action={<StatusBadge tone={status.tone}>{status.label}</StatusBadge>}
    >
      <Card>
        <SectionLabel>What is this?</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)", textWrap: "pretty" }}>
          {investigation.whatIsIt}
        </div>
      </Card>

      <Card>
        <SectionLabel>Common Signs</SectionLabel>
        {yourSigns.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>
              You've reported
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
              {yourSigns.map((s) => (
                <Tag key={s} tone="signal">{getObservation(s)?.label ?? s}</Tag>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {yourSigns.length > 0 && (
            <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>
              Other common signs
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
            {otherSigns.map((s) => (
              <Tag key={s}>{getObservation(s)?.label ?? s}</Tag>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <SectionLabel>What to Try</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {investigation.checklist.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div
                style={{
                  flex: "none",
                  width: "22px",
                  height: "22px",
                  borderRadius: "7px",
                  border: "1px solid var(--border-default)",
                  background: "var(--surface-inset)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)", textWrap: "pretty" }}>
                {item}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>See If It Holds Up</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
          Exploring works best with a little evidence. Log what you notice — even a few days helps — and we'll watch
          for signs of this in what you save.
        </div>
        <Button variant="secondary" onClick={() => navigate("detective")}>Track Today</Button>
      </Card>

      <Card>
        <SectionLabel>Learn More</SectionLabel>
        {investigation.learnMore.map((articleId) => {
          const article = getArticle(articleId);
          if (!article) return null;
          return (
            <button
              key={articleId}
              onClick={() => navigate("article", { id: articleId })}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                padding: "12px 14px",
                background: "var(--surface-inset)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-button)",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-brand)" }}>{article.title}</span>
              <span style={{ fontSize: "12.5px", lineHeight: 1.5, color: "var(--text-muted)" }}>{article.teaser}</span>
            </button>
          );
        })}
        {investigation.related.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>
              Related causes
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
              {investigation.related.map((rid) => (
                <Tag key={rid} tone="neutral" onClick={() => navigate("investigation", { id: rid })}>
                  {getInvestigation(rid)?.title ?? rid}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel right={<StatusBadge tone={status.tone}>{status.label}</StatusBadge>}>Status</SectionLabel>
        {choosingStatus ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
            {STATUSES.map((s) => (
              <Tag key={s.id} tone="neutral" selected={s.id === status.id} onClick={() => setStatus(s.id)}>
                {s.label}
              </Tag>
            ))}
          </div>
        ) : (
          <Button onClick={() => setChoosingStatus(true)}>Where Are You With This?</Button>
        )}
      </Card>
    </Screen>
  );
}
