import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { INVESTIGATIONS } from "../data/playbook.js";
import { ARTICLES } from "../data/articles.js";
import { OBSERVATIONS, getObservation } from "../data/vocabulary.js";
import { SymptomMatrix } from "./SymptomMatrix.jsx";

/** Learn — educational reference library. No personalization. */
export function Learn({ navigate, params }) {
  const [query, setQuery] = useState("");
  const section = params?.section ?? null;

  if (section === "matrix")
    return <SymptomMatrix navigate={navigate} goBack={() => navigate("learn")} preselect={params?.preselect} />;
  if (section === "process") return <Process goBack={() => navigate("learn")} />;

  const q = query.trim().toLowerCase();
  const hits = q
    ? {
        investigations: INVESTIGATIONS.filter(
          (i) => i.title.toLowerCase().includes(q) || i.short.toLowerCase().includes(q)
        ),
        articles: ARTICLES.filter((a) => a.title.toLowerCase().includes(q) || a.teaser.toLowerCase().includes(q)),
        symptoms: OBSERVATIONS.filter((o) => o.label.toLowerCase().includes(q)),
      }
    : null;

  return (
    <Screen eyebrow="Reference Library" title="Learn">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search investigations, symptoms, articles…"
        style={{
          boxSizing: "border-box",
          width: "100%",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--type-body-size)",
          color: "var(--text-primary)",
          background: "var(--surface-card)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-pill)",
          padding: "12px 18px",
          outline: "none",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}
      />

      {hits ? (
        <>
          {hits.investigations.length === 0 && hits.articles.length === 0 && hits.symptoms.length === 0 && (
            <Card>
              <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Nothing matches "{query}" yet.</div>
            </Card>
          )}
          {hits.investigations.map((inv) => (
            <Card key={inv.id}>
              <SectionLabel>Investigation</SectionLabel>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{inv.title}</div>
              <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>{inv.short}</div>
              <Button variant="secondary" onClick={() => navigate("investigation", { id: inv.id })}>Open Investigation</Button>
            </Card>
          ))}
          {hits.articles.map((a) => (
            <Card key={a.id}>
              <SectionLabel>Article</SectionLabel>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{a.title}</div>
              <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>{a.teaser}</div>
              <Button variant="secondary" onClick={() => navigate("article", { id: a.id })}>Read</Button>
            </Card>
          ))}
          {hits.symptoms.length > 0 && (
            <Card>
              <SectionLabel>Symptoms</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
                {hits.symptoms.map((s) => (
                  <Tag key={s.id} tone="signal" onClick={() => navigate("learn", { section: "matrix", preselect: s.id })}>
                    {s.label}
                  </Tag>
                ))}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Tap a symptom to explore it in the matrix.</div>
            </Card>
          )}
        </>
      ) : (
        <>
          <Card>
            <SectionLabel right={`${INVESTIGATIONS.length} total`}>Investigations</SectionLabel>
            {INVESTIGATIONS.map((inv) => (
              <button
                key={inv.id}
                onClick={() => navigate("investigation", { id: inv.id })}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  padding: "12px 14px",
                  background: "var(--surface-inset)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-button)",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-brand)" }}>{inv.title}</span>
                <span style={{ fontSize: "12.5px", lineHeight: 1.5, color: "var(--text-muted)", textWrap: "pretty" }}>{inv.short}</span>
                <span style={{ display: "flex", flexWrap: "wrap", gap: "4px", paddingTop: "4px" }}>
                  {inv.signs.slice(0, 3).map((s) => (
                    <span key={s} style={{ fontSize: "11px", fontWeight: 500, color: "var(--text-muted)", background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "99px", padding: "2px 8px" }}>
                      {getObservation(s)?.label ?? s}
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </Card>

          <Card>
            <SectionLabel>Interactive Symptom Matrix</SectionLabel>
            <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
              Select symptoms and see which investigations they commonly relate to. An educational exploration tool —
              it never uses your data and never recommends.
            </div>
            <Button onClick={() => navigate("learn", { section: "matrix" })}>Explore the Matrix</Button>
          </Card>

          <Card>
            <SectionLabel>Popular Articles</SectionLabel>
            {ARTICLES.map((a) => (
              <button
                key={a.id}
                onClick={() => navigate("article", { id: a.id })}
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
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-brand)" }}>{a.title}</span>
                <span style={{ fontSize: "12.5px", lineHeight: 1.5, color: "var(--text-muted)", textWrap: "pretty" }}>{a.teaser}</span>
              </button>
            ))}
          </Card>

          <Card>
            <SectionLabel>Investigation Process</SectionLabel>
            <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
              How investigations work, why observations matter, and why one symptom can have many causes.
            </div>
            <Button variant="secondary" onClick={() => navigate("learn", { section: "process" })}>How It Works</Button>
          </Card>
        </>
      )}
    </Screen>
  );
}

/** Investigation Process — static explainer of the core loop. */
function Process({ goBack }) {
  const steps = [
    {
      title: "Investigate",
      body: "Pick one investigation from the Playbook and work its checklist. Each one explains itself before asking you to act — you always know why you're observing something.",
    },
    {
      title: "Observe & Record",
      body: "Log what you notice each day in under a minute — by voice or by tapping chips. You approve everything before it's saved; nothing enters your history without you.",
    },
    {
      title: "Recognize Patterns",
      body: "As observations accumulate, the app surfaces combinations that repeat — always as evidence with the exact observations behind it, never as a conclusion.",
    },
    {
      title: "Investigate Again",
      body: "Patterns point to what may be worth investigating next. Mark investigations complete, low priority, or revisit — and keep narrowing in.",
    },
  ];
  return (
    <Screen eyebrow="Learn" title="How Investigations Work" onBack={goBack}>
      <Card>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)", textWrap: "pretty" }}>
          Fussiness is rarely explained by a single observation. Arching can be reflux, feeding mechanics, or an
          ordinary preference; green stool can be letdown speed, a sensitivity, or nothing at all. That's why this app
          is built around a loop instead of a lookup:
        </div>
      </Card>
      {steps.map((s, i) => (
        <Card key={s.title}>
          <SectionLabel>{`Step ${i + 1}`}</SectionLabel>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{s.title}</div>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)", textWrap: "pretty" }}>{s.body}</div>
        </Card>
      ))}
      <Card>
        <SectionLabel>Why multiple symptoms matter</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)", textWrap: "pretty" }}>
          A single symptom rarely distinguishes between causes — but combinations often do. Recording honestly, even on
          uneventful days, is what makes the difference between noise and signal. Bring what you learn to your
          pediatrician; your observation history makes those conversations concrete.
        </div>
      </Card>
    </Screen>
  );
}
