import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { INVESTIGATIONS } from "../data/playbook.js";
import { CATEGORIES, observationsInCategory, getObservation } from "../data/vocabulary.js";

/**
 * Interactive Symptom Matrix — the educational version of the Playbook matrix.
 * Select symptoms, see which investigations relate. No AI, no personal data,
 * no ranking, no recommendations. Alphabetical, always the full picture.
 */
export function SymptomMatrix({ navigate, goBack, preselect }) {
  const [selected, setSelected] = useState(preselect ? [preselect] : []);

  const toggle = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const rows = [...INVESTIGATIONS]
    .map((inv) => ({
      investigation: inv,
      matches: inv.signs.filter((s) => selected.includes(s)),
    }))
    .sort((a, b) => a.investigation.title.localeCompare(b.investigation.title));

  // Only show categories that actually contain matrix-relevant symptoms
  const symptomCategories = CATEGORIES.filter((cat) =>
    observationsInCategory(cat).some((o) => INVESTIGATIONS.some((inv) => inv.signs.includes(o.id)))
  );

  return (
    <Screen eyebrow="Learn" title="Symptom Matrix" onBack={goBack}>
      <Card>
        <SectionLabel>How to use this</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
          Select one or more symptoms to highlight the investigations they commonly appear in. This is an educational
          map of relationships — it doesn't use your observations, rank anything, or make recommendations.
        </div>
      </Card>

      {symptomCategories.map((cat) => {
        const symptoms = observationsInCategory(cat).filter((o) => INVESTIGATIONS.some((inv) => inv.signs.includes(o.id)));
        if (symptoms.length === 0) return null;
        return (
          <Card key={cat} gap="10px">
            <SectionLabel>{cat}</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
              {symptoms.map((s) => (
                <Tag key={s.id} tone="neutral" selected={selected.includes(s.id)} onClick={() => toggle(s.id)}>
                  {s.label}
                </Tag>
              ))}
            </div>
          </Card>
        );
      })}

      <Card>
        <SectionLabel right={selected.length ? `${selected.length} selected` : undefined}>Investigations</SectionLabel>
        {selected.length === 0 && (
          <div style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--text-muted)" }}>
            Select symptoms above to see relationships light up.
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {rows.map(({ investigation, matches }) => {
            const lit = matches.length > 0;
            return (
              <div
                key={investigation.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-button)",
                  border: "1px solid " + (lit ? "var(--accent-signal)" : "var(--border-default)"),
                  background: lit ? "var(--accent-signal-bg)" : "var(--surface-inset)",
                  transition: "background .15s ease, border-color .15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: lit ? "var(--text-brand)" : "var(--text-muted)" }}>
                    {investigation.title}
                  </span>
                  {lit && (
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-brand)", whiteSpace: "nowrap" }}>
                      {matches.length} of {selected.length} selected
                    </span>
                  )}
                </div>
                {lit && (
                  <>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {matches.map((m) => (
                        <span key={m} style={{ fontSize: "11px", fontWeight: 500, color: "var(--text-brand)", background: "var(--surface-card)", borderRadius: "99px", padding: "2px 8px" }}>
                          {getObservation(m)?.label ?? m}
                        </span>
                      ))}
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => navigate("investigation", { id: investigation.id })}>
                      Open Investigation
                    </Button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </Screen>
  );
}
