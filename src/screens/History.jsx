import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { RatingScale } from "../components/forms/RatingScale.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore, sortedDays } from "../lib/store.jsx";
import { getObservation, CATEGORIES, observationsInCategory, extractObservations } from "../data/vocabulary.js";
import { formatShort, formatRelative } from "../lib/dates.js";

function labelFor(obs) {
  return obs.startsWith("custom:") ? obs.slice(7) : getObservation(obs)?.label ?? obs;
}

function Stars({ value }) {
  return (
    <div style={{ display: "flex", gap: "2px", fontSize: "15px", letterSpacing: "1px" }} aria-label={`Fussiness ${value} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ color: n <= value ? "var(--accent-signal)" : "var(--border-default)" }}>★</span>
      ))}
    </div>
  );
}

/** History — the source of truth for everything the parent has logged. Review, edit, delete. */
export function History({ navigate }) {
  const { state, dispatch } = useStore();
  const days = sortedDays(state);
  const [editing, setEditing] = useState(null); // dateKey being edited
  const [draftObs, setDraftObs] = useState([]);
  const [draftFussiness, setDraftFussiness] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [customText, setCustomText] = useState("");

  const startEdit = (day) => {
    setEditing(day.dateKey);
    setDraftObs(day.observations);
    setDraftFussiness(day.fussiness);
    setOpenCategory(null);
    setCustomText("");
  };

  const addObs = (obs) => setDraftObs((prev) => (prev.includes(obs) ? prev : [...prev, obs]));
  const toggleObs = (obs) => setDraftObs((prev) => (prev.includes(obs) ? prev.filter((o) => o !== obs) : [...prev, obs]));

  const addCustom = () => {
    const text = customText.trim();
    if (!text) return;
    const matched = extractObservations(text);
    if (matched.length > 0) matched.forEach(addObs);
    else addObs(`custom:${text}`);
    setCustomText("");
  };

  const saveEdit = () => {
    dispatch({ type: "updateDay", dateKey: editing, observations: draftObs, fussiness: draftFussiness });
    setEditing(null);
  };

  return (
    <Screen eyebrow="Your Observations" title="Journal">
      {days.length === 0 ? (
        <Card>
          <SectionLabel>Nothing Here Yet</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)", textWrap: "pretty" }}>
            Observations you approve and save will live here — the full record you can review, edit, or share with your
            pediatrician.
          </div>
          <Button onClick={() => navigate("detective")}>Record Today's Observation</Button>
        </Card>
      ) : (
        days.map((day) => {
          const isEditing = editing === day.dateKey;
          return (
            <Card key={day.dateKey}>
              <SectionLabel right={formatRelative(day.dateKey)}>{formatShort(day.dateKey)}</SectionLabel>
              {isEditing ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>Fussiness</div>
                    <RatingScale value={draftFussiness} onChange={setDraftFussiness} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>
                      Tap an observation to remove it
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
                      {draftObs.map((obs) => (
                        <Tag key={obs} tone="calm" onClick={() => setDraftObs((prev) => prev.filter((o) => o !== obs))}>
                          {labelFor(obs)}
                          <span aria-hidden style={{ fontWeight: 600, opacity: 0.55 }}>×</span>
                        </Tag>
                      ))}
                      {draftObs.length === 0 && (
                        <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          No observations left — saving will remove this day.
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "10px", borderTop: "1px solid var(--border-default)" }}>
                    <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>
                      Add an observation
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
                      {CATEGORIES.map((cat) => (
                        <Tag key={cat} tone="neutral" selected={openCategory === cat} onClick={() => setOpenCategory(openCategory === cat ? null : cat)}>
                          {cat}
                        </Tag>
                      ))}
                    </div>
                    {openCategory && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
                        {observationsInCategory(openCategory).map((obs) => (
                          <Tag key={obs.id} tone="signal" selected={draftObs.includes(obs.id)} onClick={() => toggleObs(obs.id)}>
                            {obs.label}
                          </Tag>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCustom()}
                        placeholder="Add your own…"
                        style={{
                          boxSizing: "border-box",
                          flex: 1,
                          minWidth: 0,
                          fontFamily: "var(--font-ui)",
                          fontSize: "13px",
                          color: "var(--text-primary)",
                          background: "var(--surface-inset)",
                          border: "1px solid var(--border-default)",
                          borderRadius: "var(--radius-pill)",
                          padding: "8px 14px",
                          outline: "none",
                        }}
                      />
                      <Button size="sm" onClick={addCustom}>Add</Button>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button size="sm" onClick={saveEdit}>Save Changes</Button>
                    <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
                  </div>
                </>
              ) : (
                <>
                  {day.fussiness != null && <Stars value={day.fussiness} />}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
                    {day.observations.map((obs) => (
                      <Tag key={obs}>{labelFor(obs)}</Tag>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button variant="secondary" onClick={() => startEdit(day)}>Edit Observation</Button>
                    <Button
                      variant="secondary"
                      style={{ color: "var(--text-muted)" }}
                      onClick={() => {
                        if (window.confirm(`Delete all observations for ${formatShort(day.dateKey)}?`)) {
                          dispatch({ type: "deleteDay", dateKey: day.dateKey });
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </Card>
          );
        })
      )}
    </Screen>
  );
}
