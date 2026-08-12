import React, { useEffect, useRef, useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { CardTitle } from "../components/core/CardTitle.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { StatusBadge } from "../components/core/StatusBadge.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Input } from "../components/forms/Input.jsx";
import { InsightRow } from "../components/data/InsightRow.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { SymptomPicker } from "../components/app/SymptomPicker.jsx";
import { DifferentialCard } from "../components/app/DifferentialCard.jsx";
import { useStore } from "../lib/store.jsx";
import { useDifferential } from "../lib/useDifferential.js";
import { extractObservations, getObservation, redFlagsIn } from "../data/vocabulary.js";
import { createRecognizer, speechSupported } from "../lib/speech.js";

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

  if (state.membership !== "premium") {
    return (
      <Screen eyebrow="Premium · $5/month" title="AI Symptom Navigator">
        <Card>
          <SectionLabel right={<StatusBadge tone="warm">Premium</StatusBadge>}>Personalized starting point</SectionLabel>
          <CardTitle>Understand what fits best</CardTitle>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-muted)" }}>Describe what you are seeing and receive one strongest match, possible co-contributors, and the corresponding step in the free Playbook.</div>
          <Button onClick={() => dispatch({ type: "activateMembership" })}>Unlock Navigator · $5/month</Button>
        </Card>
        <Card>
          <SectionLabel>Always free</SectionLabel>
          <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.6, color: "var(--text-primary)" }}>Browse all eight causes and follow every protocol checklist without a subscription.</div>
          <Button variant="secondary" onClick={() => navigate("playbook")}>Open Playbook</Button>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen eyebrow="AI Symptom Navigator" title="What are you noticing?">
      <Card>
        <SectionLabel>Describe it in your own words</SectionLabel>
        <Input
          multiline
          value={context}
          onChange={(event) => absorbContext(event.target.value)}
          placeholder="e.g. Explosive mucousy poops, eczema, lots of spit up, and crying after feeds"
          style={{ minHeight: "96px" }}
        />
        {canSpeak && <Button variant="secondary" onClick={toggleVoice}>{listening ? "Stop listening" : "Speak instead"}</Button>}
        <div style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--text-muted)" }}>
          Your text is sent to the secure AI assessment service for this request. The app saves the observations you approve and the result, not an audio recording.
        </div>
      </Card>

      {selected.length > 0 && (
        <Card>
          <SectionLabel right={`${selected.length} selected`}>What the app heard</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
            {selected.map((id) => <Tag key={id} tone="warm" selected onClick={() => toggle(id)}>{getObservation(id)?.label ?? id}</Tag>)}
          </div>
        </Card>
      )}

      {flags.length > 0 && (
        <Card>
          <SectionLabel right={<StatusBadge tone="warm">Pay attention</StatusBadge>}>Contact a healthcare professional</SectionLabel>
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

      <details style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-card)", padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
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
          {assessment.result.causes.map((cause, index) => <DifferentialCard key={cause.playbookId} rank={index + 1} cause={cause} onExplore={(id) => navigate("cause", { id })} />)}
          {assessment.result.followUpQuestions.length > 0 && (
            <Card>
              <SectionLabel>Questions that would make this clearer</SectionLabel>
              {assessment.result.followUpQuestions.map((question) => <InsightRow key={question} tone="neutral">{question}</InsightRow>)}
            </Card>
          )}
          {assessment.result.note && <div style={{ padding: "0 4px", fontSize: "12.5px", lineHeight: 1.55, color: "var(--text-muted)" }}>{assessment.result.note}</div>}
          {assessment.result.isExample && (
            <Card>
              <SectionLabel>Preview result</SectionLabel>
              <div style={{ fontSize: "13px", lineHeight: 1.55, color: "var(--text-muted)" }}>This build is using a sample result until the production AI service is configured.</div>
            </Card>
          )}
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
