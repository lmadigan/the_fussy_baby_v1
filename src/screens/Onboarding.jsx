import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Tag } from "../components/core/Tag.jsx";
import { Input } from "../components/forms/Input.jsx";
import { useStore } from "../lib/store.jsx";
import { SymptomPicker } from "../components/app/SymptomPicker.jsx";

const AGE_OPTIONS = [
  { label: "0–6 weeks", months: 1 },
  { label: "6–12 weeks", months: 2 },
  { label: "3–6 months", months: 4 },
  { label: "6–12 months", months: 9 },
  { label: "12+ months", months: 14 },
];

/** Onboarding — welcome → baby info → current symptoms → disclaimer. Under 3 minutes. */
export function Onboarding() {
  const { dispatch } = useStore();
  const [step, setStep] = useState(0);
  const [babyName, setBabyName] = useState("");
  const [ageMonths, setAgeMonths] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [feedingMode, setFeedingMode] = useState("");

  const toggleSymptom = (id) =>
    setSymptoms((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const shell = (children) => (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px 24px",
        gap: "var(--gap-stack)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: i === step ? "20px" : "6px",
              height: "6px",
              borderRadius: "99px",
              background: i <= step ? "var(--accent-signal)" : "var(--border-default)",
              transition: "width .2s ease",
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );

  if (step === 0) {
    return shell(
      <>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 600, color: "var(--text-primary)" }}>
            The Fussy Baby
          </div>
        </div>
        <Card>
          <div style={{ fontSize: "17px", lineHeight: 1.5, fontWeight: 600, color: "var(--text-primary)", textWrap: "pretty" }}>
            Hey — you're doing great. But baby fussiness is no joke.
          </div>
          <div style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-primary)", textWrap: "pretty" }}>
            The free Playbook gives you the common causes and a systematic protocol. Premium Navigator helps organize
            which contributors fit what you're seeing, including when more than one may be involved.
          </div>
          <div style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", textWrap: "pretty" }}>
            It's not a medical diagnostic tool — your pediatrician stays in charge. We just help you show up with
            better notes.
          </div>
        </Card>
        <Button onClick={() => setStep(1)}>Get Started</Button>
      </>
    );
  }

  if (step === 1) {
    return shell(
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "var(--text-primary)" }}>
            Tell us about your baby
          </div>
          <div style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--text-muted)" }}>
            Age helps us give age-appropriate educational context.
          </div>
        </div>
        <Card>
          <Input label="Baby name (optional)" placeholder="e.g. Wren" value={babyName} onChange={(e) => setBabyName(e.target.value)} />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <SectionLabel>Baby age</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
              {AGE_OPTIONS.map((opt) => (
                <Tag key={opt.label} tone="neutral" selected={ageMonths === opt.months} onClick={() => setAgeMonths(opt.months)}>
                  {opt.label}
                </Tag>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <SectionLabel>Feeding (optional)</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-chips)" }}>
              {["Breastfeeding", "Formula", "Both"].map((option) => (
                <Tag key={option} tone="neutral" selected={feedingMode === option} onClick={() => setFeedingMode(feedingMode === option ? "" : option)}>
                  {option}
                </Tag>
              ))}
            </div>
          </div>
        </Card>
        <Button disabled={ageMonths == null} style={ageMonths == null ? { opacity: 0.4, cursor: "default" } : undefined} onClick={() => ageMonths != null && setStep(2)}>
          Continue
        </Button>
      </>
    );
  }

  if (step === 2) {
    return shell(
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "var(--text-primary)" }}>
            What have you been noticing?
          </div>
          <div style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
            Not sure what "counts"? That's exactly why we list it all — plenty of real clues don't look like symptoms.
            If you've seen it, tap it. You can always change this later.
          </div>
        </div>
        <Card>
          <SymptomPicker selected={symptoms} onToggle={toggleSymptom} />
        </Card>
        <Button onClick={() => setStep(3)}>{symptoms.length ? "Continue" : "Skip for now"}</Button>
      </>
    );
  }

  return shell(
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "var(--text-primary)" }}>
          One important note
        </div>
      </div>
      <Card>
        <div style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-primary)", textWrap: "pretty" }}>
          The Fussy Baby is an educational symptom-navigation and planning tool. It does not diagnose, treat, or
          replace medical advice.
        </div>
        <div style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", textWrap: "pretty" }}>
          Assessments organize possibilities to explore. Playbook outcomes should not be interpreted as medical
          conclusions. Always consult your pediatrician about your baby's health.
        </div>
      </Card>
      <Button
        onClick={() =>
          dispatch({ type: "completeOnboarding", babyName: babyName.trim(), babyAgeMonths: ageMonths, feedingMode, symptoms })
        }
      >
        Go to Home
      </Button>
    </>
  );
}
