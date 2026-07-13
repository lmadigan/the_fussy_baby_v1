import React from "react";
import { Card } from "../core/Card.jsx";
import { SectionLabel } from "../core/SectionLabel.jsx";
import { Button } from "../core/Button.jsx";
import { useStore } from "../../lib/store.jsx";
import { generatePatterns } from "../../lib/patterns.js";

/**
 * Feedback questionnaire URL. The prompt stays hidden until this is set —
 * point it at the accuracy questionnaire when one exists.
 */
const FEEDBACK_FORM_URL = "";

/**
 * One feedback prompt, focused on accuracy: once patterns have started
 * surfacing, ask whether they match reality and link out of the app to a
 * short questionnaire. Shows once; dismissable.
 */
export function FeedbackPrompt() {
  const { state, dispatch } = useStore();

  if (!FEEDBACK_FORM_URL) return null;
  if (state.feedback["pattern-accuracy"]) return null;
  if (generatePatterns(state).length === 0) return null;

  return (
    <Card style={{ borderColor: "var(--accent-signal)" }}>
      <SectionLabel
        right={
          <button
            onClick={() => dispatch({ type: "resolveFeedback", promptId: "pattern-accuracy", outcome: "dismissed" })}
            style={{ all: "unset", cursor: "pointer", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", padding: "2px 6px" }}
          >
            Not now
          </button>
        }
      >
        How are we doing?
      </SectionLabel>
      <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)", textWrap: "pretty" }}>
        Patterns have started appearing. Do they match what you're actually seeing? A 2-minute questionnaire helps us
        get the accuracy right.
      </div>
      <Button
        size="sm"
        onClick={() => {
          window.open(FEEDBACK_FORM_URL, "_blank", "noopener");
          dispatch({ type: "resolveFeedback", promptId: "pattern-accuracy", outcome: "sent" });
        }}
      >
        Open Questionnaire
      </Button>
    </Card>
  );
}
