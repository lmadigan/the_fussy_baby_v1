# The Fussy Baby

An educational pattern-recognition app that helps parents investigate infant fussiness through
guided investigations, structured observation tracking, and personalized pattern surfacing.

**The app never diagnoses.** It organizes information, surfaces evidence, and helps parents
systematically investigate common causes of fussiness — always leaving conclusions to the
parent and their pediatrician.

## Running it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## Product structure

The core loop: **Investigate → Observe → Record → Patterns → Investigate again.**

| Screen | Purpose |
| --- | --- |
| Onboarding | Welcome, baby info, current symptoms, disclaimer — under 3 minutes |
| Home | Command center: current investigation, record CTA, learned patterns preview, last observation, Learn links |
| Investigation | One Playbook investigation: What is this? · Common Signs · Checklist · Learn More · Status |
| Detective | Capture today's observations — voice-first (Web Speech API) with chip and custom entry; parent approves everything before save |
| Patterns | Pattern Engine output: evidence organized by investigation, with the exact supporting observations |
| Learn | Static reference: investigations, Interactive Symptom Matrix, popular articles, investigation process |
| History | Source of truth for saved observations — review, edit, delete by day |

## Architecture

- **The Playbook is content; the app is the framework.** All investigations live in
  `src/data/playbook.js` and share one template — adding an investigation is a content edit only.
- **Shared vocabulary.** `src/data/vocabulary.js` defines every observation (with speech-match
  terms); Detective chips, onboarding symptoms, the Symptom Matrix, and the Pattern Engine all
  reference it by id.
- **Pattern Engine** (`src/lib/patterns.js`) evaluates the complete approved-observation history,
  organizes findings by investigation, explains every pattern, and never rules anything out —
  below the evidence threshold it simply stays quiet.
- **Privacy by design.** Voice is an input method only: transcripts are extracted into chips for
  approval and discarded, never stored. State persists locally (localStorage).

## Design system

Direction **1d — "Quiet Gentle Intelligence"** from the Claude Design project
(*Fussy Baby Directions*): quiet ink `#2C3440` on warm gray `#F7F7F5`, periwinkle `#A8B7F0`
as the only "pay attention" signal, mint/clay observation chips, Newsreader serif display
titles over Instrument Sans UI. Tokens live in `src/tokens/`; ported components in
`src/components/` mirror the design-system library (Card, Button, Tag, StatusBadge,
SectionLabel, Input, RatingScale, InsightRow, StatRow).
