import React, { useState } from "react";
import { Card } from "../components/core/Card.jsx";
import { Button } from "../components/core/Button.jsx";
import { SectionLabel } from "../components/core/SectionLabel.jsx";
import { Screen } from "../components/app/Screen.jsx";
import { SymptomPicker } from "../components/app/SymptomPicker.jsx";
import { useStore } from "../lib/store.jsx";

/**
 * What are you seeing? — the standing symptom list, editable any time.
 * This is the symptom-first front door after onboarding: change what
 * you're seeing and the suggested causes update instantly, no logging
 * required.
 */
export function Symptoms({ goBack }) {
  const { state, dispatch } = useStore();
  const [selected, setSelected] = useState(state.profile.onboardingSymptoms);

  const toggle = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const save = () => {
    dispatch({ type: "updateSymptoms", symptoms: selected });
    goBack();
  };

  return (
    <Screen eyebrow="Keep It Current" title="What are you seeing?" onBack={goBack}>
      <Card>
        <SectionLabel>Tap everything that applies</SectionLabel>
        <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>
          Not sure what "counts"? That's exactly why we list it all — plenty of real clues don't look like symptoms.
          If you've seen it, tap it, and we'll update what's worth exploring.
        </div>
        <SymptomPicker selected={selected} onToggle={toggle} />
      </Card>
      <Button onClick={save}>Update</Button>
    </Screen>
  );
}
