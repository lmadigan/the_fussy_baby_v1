import React, { useState } from "react";
import { Card } from "../core/Card.jsx";
import { SectionLabel } from "../core/SectionLabel.jsx";
import { Button } from "../core/Button.jsx";
import { useStore } from "../../lib/store.jsx";
import { generatePatterns } from "../../lib/patterns.js";

/** Where feedback lands. Swap for a form URL when one exists. */
const FEEDBACK_EMAIL = "laurenmadigan51@gmail.com";

/**
 * Timed in-app feedback — one gentle question at natural milestones,
 * never framed as a study. Each prompt shows once; dismissing is a
 * first-class answer.
 */
const PROMPTS = [
  {
    id: "first-log",
    when: (state) => Object.keys(state.days).length >= 1,
    question: "You saved your first observation — was that quick and easy, or fiddly?",
  },
  {
    id: "one-week",
    when: (state) => Object.keys(state.days).length >= 5,
    question: "You've been logging for about a week. Is anything missing when you record a day?",
  },
  {
    id: "first-pattern",
    when: (state) => generatePatterns(state).length > 0,
    question: "The app has started surfacing patterns. Do they feel useful and trustworthy so far?",
  },
  {
    id: "two-weeks",
    when: (state) => Object.keys(state.days).length >= 12,
    question: "Two weeks in — would you recommend this to another mom? What would you change first?",
  },
];

export function FeedbackPrompt() {
  const { state, dispatch } = useStore();
  const [draft, setDraft] = useState("");

  const prompt = PROMPTS.find((p) => !state.feedback[p.id] && p.when(state));
  if (!prompt) return null;

  const send = () => {
    const subject = encodeURIComponent(`The Fussy Baby feedback — ${prompt.id}`);
    const body = encodeURIComponent(`${prompt.question}\n\n${draft}`);
    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
    dispatch({ type: "resolveFeedback", promptId: prompt.id, outcome: "sent" });
  };

  return (
    <Card style={{ borderColor: "var(--accent-signal)" }}>
      <SectionLabel
        right={
          <button
            onClick={() => dispatch({ type: "resolveFeedback", promptId: prompt.id, outcome: "dismissed" })}
            style={{ all: "unset", cursor: "pointer", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", padding: "2px 6px" }}
            aria-label="Dismiss"
          >
            Not now
          </button>
        }
      >
        A quick question
      </SectionLabel>
      <div style={{ fontSize: "var(--type-body-size)", lineHeight: 1.55, color: "var(--text-primary)", textWrap: "pretty" }}>
        {prompt.question}
      </div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="A sentence or two is plenty…"
        style={{
          boxSizing: "border-box",
          width: "100%",
          minHeight: "56px",
          fontFamily: "var(--font-ui)",
          fontSize: "13px",
          lineHeight: 1.5,
          color: "var(--text-primary)",
          background: "var(--surface-inset)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-button)",
          padding: "10px 12px",
          outline: "none",
          resize: "vertical",
        }}
      />
      <Button size="sm" onClick={send} style={draft.trim() ? undefined : { opacity: 0.4, cursor: "default" }}>
        Send
      </Button>
    </Card>
  );
}
