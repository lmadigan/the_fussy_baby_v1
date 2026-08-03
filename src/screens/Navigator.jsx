import React, { useEffect, useRef, useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { SymptomPicker } from "../components/app/SymptomPicker.jsx";
import { DifferentialCard } from "../components/app/DifferentialCard.jsx";
import { useStore } from "../lib/store.jsx";
import { useDifferential } from "../lib/useDifferential.js";
import { extractObservations, getObservation, redFlagsIn } from "../data/vocabulary.js";
import { getInvestigation } from "../data/playbook.js";
import { createRecognizer, speechSupported } from "../lib/speech.js";
import { hasEndpoint, setEndpoint } from "../lib/differential.js";

const FEEDING_OPTIONS = ["Breastfeeding", "Formula", "Both"];
const TIMING_OPTIONS = ["During feeds", "Right after feeds", "Later after feeds", "Mostly evenings", "No clear timing"];

export function Navigator({ navigate }) {
  const { state, dispatch } = useStore();
  const [selected, setSelected] = useState(state.profile.onboardingSymptoms);
  const [context, setContext] = useState("");
  const [feedingMode, setFeedingMode] = useState(state.profile.feedingMode || "");
  const [fussinessTiming, setFussinessTiming] = useState(state.profile.fussinessTiming || "");
  const [listening, setListening] = useState(false);
  const recognizerRef = useRef(null);
  const assessment = useDifferential();
  const canSpeak = speechSupported();
  const flags = redFlagsIn(selected);

  useEffect(() => () => recognizerRef.current?.stop(), []);

  const toggle = (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const absorbContext = (text) => {
    setContext(text);
    const extracted = extractObservations(text);
    setSelected((current) => [...new Set([...current, ...extracted])]);
  };
  const toggleVoice = () => {
    if (listening) {
      recognizerRef.current?.stop();
      setListening(false);
      return;
    }
    const recognizer = createRecognizer({
      onResult: absorbContext,
      onEnd: () => setListening(false),
      onError: () => setListening(false),
    });
    if (!recognizer) return;
    recognizerRef.current = recognizer;
    setListening(true);
    recognizer.start();
  };

  const analyze = async () => {
    if (selected.length === 0) return;
    dispatch({ type: "updateSymptoms", symptoms: selected });
    dispatch({ type: "updateAssessmentContext", feedingMode, fussinessTiming });
    const result = await assessment.run({
      symptoms: selected,
      babyAgeMonths: state.profile.babyAgeMonths,
      feedingMode,
      fussinessTiming,
      additionalContext: context,
    });
    if (result) {
      dispatch({
        type: "saveAssessment",
        assessment: { ...result, symptomIds: selected, createdAt: new Date().toISOString() },
      });
    }
  };

  const startInvestigation = (id) => {
    const investigation = getInvestigation(id);
    dispatch({ type: "startInvestigation", investigationId: id, reviewDays: investigation?.reviewDays ?? 7 });
    navigate("investigation", { id });
  };

  const connectModel = () => {
    const url = window.prompt("Paste your deployed assessment endpoint URL. Leave blank to disconnect.", "");
    if (url !== null) setEndpoint(url);
  };

  return (
    <Screen eyebrow="AI Symptom Navigator" title="What are you noticing?">
      <Card>
        <SectionLabel>Describe it in your own words</SectionLabel>
        <textarea
          value={context}
          onChange={(event) => absorbContext(event.target.value)}
          placeholder="e.g. Explosive mucousy poops, eczema, lots of spit up, and crying after feeds"
          style={{ boxSizing: "border-box", width: "100%", minHeight: "96px", resize: "vertical", padding: "12px 14px", borderRadius: "var(--radius-button)", border: "1px solid var(--border-default)", background: "var(--surface-inset)", color: "var(--text-primary)", font: "inherit", lineHeight: 1.55, outline: "none" }}
        />
        {canSpeak && <Button variant="secondary" onClick={toggleVoice}>{listening ? "Stop listening" : "Speak instead"}</Button>}
        <div style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-muted)" }}>
          Your words help this assessment only. The app saves the observations you approve below, not the recording or transcript.
        </div>
      </Card>

      {selected.length > 0 && (
        <Card>
          <SectionLabel right={`${selected.length} selected`}>What the app heard</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
            {selected.map((id) => <Tag key={id} tone="signal" selected onClick={() => toggle(id)}>{getObservation(id)?.label ?? id} <span aria-hidden>×</span></Tag>)}
          </div>
        </Card>
      )}

      {flags.length > 0 && (
        <Card style={{ borderColor: "var(--accent-signal)" }}>
          <SectionLabel style={{ color: "var(--text-brand)" }}>Contact a healthcare professional</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)" }}>
            {flags.map((id) => getObservation(id)?.label ?? id).join(", ")} should be discussed with your baby's healthcare professional. The assessment will also use this as evidence where it meaningfully fits.
          </div>
        </Card>
      )}

      <Card>
        <SectionLabel>Helpful context</SectionLabel>
        <Choice label="Feeding" options={FEEDING_OPTIONS} value={feedingMode} onChange={setFeedingMode} />
        <Choice label="Fussiness is worst" options={TIMING_OPTIONS} value={fussinessTiming} onChange={setFussinessTiming} />
      </Card>

      <details style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-card)", padding: "14px 16px" }}>
        <summary style={{ cursor: "pointer", color: "var(--text-brand)", fontSize: "14px", fontWeight: 600 }}>Browse all observations</summary>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", paddingTop: "16px" }}>
          <SymptomPicker selected={selected} onToggle={toggle} />
        </div>
      </details>

      <Button disabled={selected.length === 0 || assessment.status === "loading"} style={selected.length === 0 ? { opacity: 0.4, cursor: "default" } : undefined} onClick={analyze}>
        {assessment.status === "loading" ? "Thinking through the clues..." : "Find possible contributors"}
      </Button>

      {assessment.status === "error" && (
        <Card>
          <SectionLabel>Couldn't complete the assessment</SectionLabel>
          <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{assessment.error}</div>
          <Button variant="secondary" onClick={analyze}>Try again</Button>
        </Card>
      )}

      {assessment.status === "ready" && assessment.result && (
        <>
          <SectionLabel right={assessment.result.isExample ? "Example mode" : null}>Possible contributors</SectionLabel>
          {assessment.result.summary && <div style={{ padding: "0 4px", fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>{assessment.result.summary}</div>}
          {assessment.result.causes.map((cause, index) => <DifferentialCard key={cause.playbookId} rank={index + 1} cause={cause} onExplore={startInvestigation} />)}
          {assessment.result.followUpQuestions.length > 0 && (
            <Card>
              <SectionLabel>Questions that would make this clearer</SectionLabel>
              {assessment.result.followUpQuestions.map((question) => <div key={question} style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--text-primary)" }}>• {question}</div>)}
            </Card>
          )}
          {assessment.result.note && <div style={{ padding: "0 4px", fontSize: "12.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{assessment.result.note}</div>}
          {assessment.result.isExample && <Button variant="secondary" onClick={connectModel}>{hasEndpoint() ? "Change live model endpoint" : "Connect live model"}</Button>}
        </>
      )}
    </Screen>
  );
}

function Choice({ label, options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ fontSize: "var(--type-meta-size)", fontWeight: 500, color: "var(--text-muted)" }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
        {options.map((option) => <Tag key={option} tone="neutral" selected={value === option} onClick={() => onChange(value === option ? "" : option)}>{option}</Tag>)}
      </div>
    </div>
  );
}
