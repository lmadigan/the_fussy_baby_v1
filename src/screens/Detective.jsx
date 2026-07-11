import React, { useEffect, useRef, useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { RatingScale } from "../components/forms/RatingScale.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { useStore, commonObservationIds } from "../lib/store.jsx";
import { CATEGORIES, observationsInCategory, getObservation, extractObservations } from "../data/vocabulary.js";
import { speechSupported, createRecognizer } from "../lib/speech.js";
import { todayKey, formatLong } from "../lib/dates.js";

function labelFor(obs) {
  return obs.startsWith("custom:") ? obs.slice(7) : getObservation(obs)?.label ?? obs;
}

/** Detective — capture today's observations naturally and quickly. Voice is an input method only. */
export function Detective({ navigate }) {
  const { state, dispatch } = useStore();
  const [log, setLog] = useState([]); // observation ids + "custom:Label" entries awaiting approval
  const [fussiness, setFussiness] = useState(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [typedNote, setTypedNote] = useState("");
  const [openCategory, setOpenCategory] = useState(null);
  const [customText, setCustomText] = useState("");
  const [saved, setSaved] = useState(false);
  const recognizerRef = useRef(null);
  const canSpeak = speechSupported();

  const common = commonObservationIds(state);

  const addToLog = (obs) => setLog((prev) => (prev.includes(obs) ? prev : [...prev, obs]));
  const removeFromLog = (obs) => setLog((prev) => prev.filter((o) => o !== obs));
  const toggleLog = (obs) => (log.includes(obs) ? removeFromLog(obs) : addToLog(obs));

  const absorbText = (text) => {
    for (const id of extractObservations(text)) addToLog(id);
  };

  const startListening = () => {
    const rec = createRecognizer({
      onResult: (text) => {
        setTranscript(text);
        absorbText(text);
      },
      onEnd: () => setListening(false),
      onError: () => setListening(false),
    });
    if (!rec) return;
    recognizerRef.current = rec;
    setTranscript("");
    setListening(true);
    rec.start();
  };

  const stopListening = () => {
    recognizerRef.current?.stop();
    setListening(false);
    setTranscript(""); // transcripts are never stored
  };

  useEffect(() => () => recognizerRef.current?.stop(), []);

  const addCustom = () => {
    const text = customText.trim();
    if (!text) return;
    const matched = extractObservations(text);
    if (matched.length > 0) matched.forEach(addToLog);
    else addToLog(`custom:${text}`);
    setCustomText("");
  };

  const save = () => {
    if (log.length === 0 && fussiness == null) return;
    dispatch({ type: "saveDay", dateKey: todayKey(), observations: log, fussiness });
    setSaved(true);
  };

  if (saved) {
    return (
      <Screen eyebrow={formatLong(new Date())} title="Saved">
        <Card>
          <SectionLabel>Today's Observation</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)", textWrap: "pretty" }}>
            {log.length} observation{log.length === 1 ? "" : "s"} added to your history. Every entry strengthens the
            patterns we can surface.
          </div>
          <Button onClick={() => navigate("patterns")}>See Patterns</Button>
          <Button variant="secondary" onClick={() => navigate("home")}>Back to Home</Button>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen eyebrow={formatLong(new Date())} title="Tell me about today">
      <Card>
        <SectionLabel>{canSpeak ? "Tap to speak naturally" : "Describe the day"}</SectionLabel>
        {canSpeak ? (
          <>
            <button
              onClick={listening ? stopListening : startListening}
              style={{
                all: "unset",
                boxSizing: "border-box",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "16px",
                borderRadius: "var(--radius-button)",
                background: listening ? "var(--accent-signal-bg)" : "var(--action-primary)",
                color: listening ? "var(--text-brand)" : "var(--text-on-brand)",
                border: listening ? "1px solid var(--accent-signal)" : "1px solid transparent",
                fontSize: "var(--type-button-size)",
                fontWeight: 600,
                transition: "background .15s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3Zm-6 8a6 6 0 0 0 12 0M12 18v2.5" />
              </svg>
              {listening ? "Listening — tap when you're done" : "Record"}
            </button>
            {listening && transcript && (
              <div style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--text-muted)", fontStyle: "italic", textWrap: "pretty" }}>
                "{transcript}"
              </div>
            )}
            <div style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-muted)" }}>
              We pull observations out of what you say. Nothing is saved until you approve it below — recordings and
              transcripts are never stored.
            </div>
          </>
        ) : (
          <>
            <textarea
              value={typedNote}
              onChange={(e) => setTypedNote(e.target.value)}
              placeholder='e.g. "Fussy after the morning feed, green stool, short naps all day"'
              style={{
                boxSizing: "border-box",
                width: "100%",
                minHeight: "72px",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--type-body-size)",
                lineHeight: 1.55,
                color: "var(--text-primary)",
                background: "var(--surface-inset)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-button)",
                padding: "12px 14px",
                outline: "none",
                resize: "vertical",
              }}
            />
            <Button
              size="sm"
              onClick={() => {
                absorbText(typedNote);
                setTypedNote("");
              }}
            >
              Add to log
            </Button>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Your Common Observations</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
          {common.length === 0 ? (
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              As you log, your most-used observations will collect here for one-tap entry.
            </div>
          ) : (
            common.map((id) => (
              <Tag key={id} tone="calm" selected={log.includes(id)} onClick={() => toggleLog(id)}>
                {getObservation(id)?.label ?? id}
              </Tag>
            ))
          )}
        </div>
      </Card>

      <Card>
        <SectionLabel>Add Observations</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
          {CATEGORIES.map((cat) => (
            <Tag key={cat} tone="neutral" selected={openCategory === cat} onClick={() => setOpenCategory(openCategory === cat ? null : cat)}>
              {cat}
            </Tag>
          ))}
        </div>
        {openCategory && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)", paddingTop: "4px", borderTop: "1px solid var(--border-default)" }}>
            {observationsInCategory(openCategory).map((obs) => (
              <Tag key={obs.id} tone="signal" selected={log.includes(obs.id)} onClick={() => toggleLog(obs.id)}>
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
      </Card>

      <Card>
        <SectionLabel>How fussy was today?</SectionLabel>
        <RatingScale value={fussiness} onChange={setFussiness} />
      </Card>

      <Card>
        <SectionLabel right={`${log.length} item${log.length === 1 ? "" : "s"}`}>Today's Log</SectionLabel>
        {log.length === 0 ? (
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
            Observations you speak, tap, or type will collect here. Only what you approve gets saved.
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
            {log.map((obs) => (
              <Tag key={obs} tone="calm" onClick={() => removeFromLog(obs)}>
                {labelFor(obs)}
                <span aria-hidden style={{ fontWeight: 600, opacity: 0.55 }}>×</span>
              </Tag>
            ))}
          </div>
        )}
        <Button
          onClick={save}
          style={log.length === 0 && fussiness == null ? { opacity: 0.4, cursor: "default" } : undefined}
        >
          Save Observation
        </Button>
      </Card>
    </Screen>
  );
}
