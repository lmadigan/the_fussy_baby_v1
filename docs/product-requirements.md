# The Fussy Baby PRD

Version: MVP v2 - AI Symptom Navigator and Guided Investigations

## 1. Product Decision

The Fussy Baby is an AI-first symptom navigation product with an optional longitudinal investigation layer.

The first job is immediate: help a parent describe what they are seeing, recognize observations they may not know are meaningful, and understand the most plausible contributors to their baby's fussiness. The second job is longitudinal: help the parent investigate one contributor with a short, focused plan and learn what changes over time.

The product is not a general baby tracker and is not a deterministic symptom-scoring tool. AI interprets the full picture and explains the strongest matches. Deterministic product rules handle red flags, allowed Playbook topics, output validation, and state transitions.

## 2. Product Overview

### Vision

Give parents a calm, practical way to move from "something is wrong" to "here is what may be contributing, why it fits, and what I can investigate next."

### Core promise

- Immediate value without requiring days of tracking.
- Recognition over recall: show parents observations they may not know count.
- More than one contributor may be relevant at the same time.
- Every suggested contributor explains what fits, what is less specific, and what information would make the picture clearer.
- Tracking is requested only when it can answer a specific investigation question.
- Red flags trigger the same immediate contact-healthcare-professional message and may also map to relevant Playbook investigations.

### Product principles

- AI leads interpretation; the Playbook constrains what the product can recommend.
- Surface contributors, not a single all-or-nothing answer.
- Give the parent a useful next step in the first session.
- Ask fewer, better questions.
- Never require a broad daily diary.
- Show the basis for every result.
- Preserve parent control over what is saved.
- Use plain, warm language suitable for a tired parent.

## 3. Target User and Jobs

### Primary user

A parent or caregiver of a baby approximately 0-6 months old who is dealing with persistent fussiness, feeding discomfort, stool changes, skin symptoms, sleep disruption, or several overlapping concerns.

### Core jobs

1. Help me name what I am seeing.
2. Tell me what combination of contributors best fits the whole picture.
3. Explain why each contributor fits and what does not fit.
4. Tell me what to investigate first without pretending only one thing can be happening.
5. Give me a short plan I can actually follow.
6. Help me see whether anything changed.
7. Give me a useful summary to bring to a healthcare professional.

## 4. Product Loop

The core loop is:

1. Describe what is happening.
2. Confirm the observations the app recognized.
3. Answer a few high-value context questions.
4. Review the contributor map.
5. Choose a guided investigation.
6. Complete short, targeted check-ins.
7. Review what changed and decide what to investigate next.

Parents may stop after the contributor map. Tracking is optional and should feel earned by the value of the initial assessment.

## 5. Information Architecture

### Primary navigation

- Home: current picture, active investigation, and next action.
- Navigator: symptom intake and AI contributor map.
- Progress: focused evidence from the active investigation.
- Guides: Playbook investigations and educational content.
- Journal: approved observations and check-ins.

### Supporting screens

- Investigation Detail
- Targeted Check-in
- Symptom Library
- Article Detail

## 6. AI Symptom Navigator

### Purpose

Provide an immediate, infant-specific interpretation of the parent's approved observations without requiring historical data.

### Inputs

- Baby age.
- Feeding mode when provided: breast, formula, or both.
- Parent's free-text or voice description for the current assessment.
- Parent-approved observation chips.
- Fussiness timing when provided: during feeds, after feeds, evening, or unpredictable.
- Relevant saved observations and active investigation context.
- Follow-up information entered during refinement.

Raw voice audio is never stored. Free-text assessment descriptions are processed for the current assessment and are not retained after approved observations and structured context are saved.

### Intake behavior

- The parent can speak, type, browse categories, or tap familiar examples.
- The app extracts possible observations and asks the parent to confirm them.
- The full vocabulary remains available because many parents do not know that clicking, milk leaking, mucus, foamy stool, arching, or short naps may be relevant.
- Red flags are evaluated immediately, before the model result is shown.
- The assessment can run with a small number of observations, but the output must identify missing information rather than manufacture certainty.

### Contributor map output

Return one strongest match and up to two additional contributors. Contributors are not mutually exclusive.

Each result includes:

- Contributor name.
- Plain-language description.
- Why it fits this baby's reported observations.
- Which observations are common or less specific.
- What information would make the assessment clearer.
- A link to the relevant Playbook investigation when one exists.

Preferred language:

- "The strongest match is..."
- "This could explain..."
- "This may be contributing alongside..."
- "These signs also overlap with..."

Do not use:

- "Your baby definitely has..."
- "This rules out..."
- A numeric AI confidence percentage.
- A treatment claim generated outside the Playbook.

### Follow-up behavior

The model may return up to three short follow-up questions when the answer could materially change the contributor map. Questions should focus on timing, feeding mode, stool appearance, skin changes, growth/feeding adequacy, and whether symptoms occur together.

The parent may answer and request a refreshed assessment. The app stores the latest structured result, not a conversation transcript.

## 7. Contributor Model

### MVP Playbook contributors

- Feeding Mechanics
- Food Protein Sensitivity
- Silent Reflux
- Oral Restrictions (Tongue Tie)
- Forceful Letdown / Oversupply
- Gas and Digestive Immaturity
- Overtiredness and Overstimulation

The model may describe overlap among these contributors. It should prefer Playbook contributors so the result can lead directly into a guided investigation.

### Ranking

The model ranks contributors by how well they fit the complete approved input, not by counting raw symptom overlap. Specific observations should influence the explanation more than generic observations. Spit-up, gas, and fussiness are common and should not overpower more distinctive observations such as blood or mucus in stool, eczema, clicking, milk leaking, arching during feeds, or consistently foamy stool.

The app preserves the model order after validating the output. It does not calculate a second likelihood score.

### Coexisting contributors

The result should explicitly allow more than one contributor. When the symptom picture supports multiple explanations, the app should explain which observations each contributor may account for and recommend a sensible investigation sequence.

## 8. Guided Investigations

### Purpose

Turn a plausible contributor into a short, manageable learning plan.

### Starting an investigation

From any contributor card, the parent can open the Playbook topic and choose "Start this investigation." Starting an investigation records its start date, makes it the active investigation, and configures the targeted check-in.

Only one investigation is active at a time for MVP. Other contributors remain visible as possible co-contributors and can be revisited next.

### Investigation plan

Each Playbook investigation contains:

- What it is.
- Why it may fit the parent's observations.
- Common signs.
- Three to five observations to track.
- A sequence of practical investigation steps.
- What change would be informative.
- When to reassess.
- Related contributors.

AI selects and explains the relevant plan. The plan steps themselves come from the curated Playbook; the model does not invent a new treatment protocol.

### Duration

The default investigation window is 7-14 days. The Playbook may specify a different review point when the topic requires it.

## 9. Targeted Check-ins and Progress

### Targeted check-in

The active investigation determines which observations appear first. A check-in should usually contain:

- Daily fussiness rating.
- Three to five investigation-specific observations.
- One optional note or additional observation.

The parent can still browse the full vocabulary, but the primary surface stays focused. A check-in should take less than 30 seconds.

### Progress interpretation

Progress shows descriptive evidence, not a causal conclusion:

- Number of check-in days since the investigation started.
- Which target observations appeared and how often.
- Fussiness trend over the investigation window.
- Completed plan steps.
- A plain-language summary of what changed, stayed the same, or remains unclear.

Example:

"Mucus and skin symptoms appeared less often this week, while spit-up and discomfort after feeds stayed about the same. Food Protein Sensitivity may explain part of the picture, and Feeding Mechanics may still be worth exploring."

The MVP may generate the summary deterministically from recorded evidence. AI narration may be added when every stated count and date is validated against the saved evidence.

### Weekly behavior

Parents enter brief targeted observations; the product generates the weekly summary. Do not ask the parent to reconstruct an entire week from memory.

## 10. Safety and Red Flags

### Immediate behavior

When a red-flag observation is logged or selected, immediately show the existing contact-healthcare-professional message. This behavior never depends on a model response.

### Pattern and contributor behavior

Red flags may also map to Playbook investigations when relevant. They should remain visible in the evidence and can strongly influence which investigation is surfaced.

For MVP:

- Blood in stool maps to Food Protein Sensitivity.
- Other red flags remain safety-only unless a Playbook mapping is explicitly defined.

Example:

"Blood in stool is worth contacting your healthcare professional about today. It also strongly overlaps with Food Protein Sensitivity, so we have included that in the contributors worth exploring."

The safety message remains the same regardless of the contributor result.

## 11. Playbook and Protocol Content

The Playbook is the product's controlled content layer. Every investigation uses the same schema:

- Stable id.
- Parent-facing title.
- Short description.
- Full explanation.
- Mapped observations.
- Target tracking observations.
- Investigation steps.
- Review window.
- Related investigations.
- Educational articles.

AI may select, order, and explain Playbook content. It may not add unsupported treatments, medications, diagnoses, or new causes to an investigation plan.

## 12. AI System Contract

### Architecture

The browser sends the approved assessment input to a server-side proxy. The proxy holds the model API key, adds the system prompt and Playbook catalog, calls the model, validates the response shape, and returns normalized JSON.

### Required output schema

The model returns:

- Summary.
- One to three contributor objects.
- Playbook id for every mapped contributor.
- Matching observations.
- Less-specific or conflicting observations.
- Missing information.
- Up to three follow-up questions.
- A short exploration note.

### Validation rules

- Reject malformed JSON.
- Reject or remove unrecognized Playbook ids from guided-investigation actions.
- Never display an observation the parent did not report as matching evidence.
- Never allow model output to suppress a deterministic red-flag message.
- If blood in stool is present and Food Protein Sensitivity is missing, add the deterministic Playbook mapping before display.
- If the service is unavailable, show a clearly labeled example or retry state; never present cached example content as a live result.

### Model independence

The client contract is provider-neutral. The initial server implementation may use Claude, but the product should be able to evaluate or replace the model without changing the user experience or stored data.

## 13. Data and Privacy

### Stored locally for MVP

- Baby profile and age.
- Feeding mode and structured context when provided.
- Parent-approved observation ids.
- Daily fussiness ratings.
- Active and past investigation status.
- Investigation start dates.
- Completed Playbook steps.
- Latest validated contributor map.

### Not stored

- Voice audio.
- Raw speech transcripts.
- Unapproved extracted observations.
- Model chain-of-thought or hidden reasoning.

The app should plainly state when structured symptoms are sent to the configured model service for assessment.

## 14. Screen Requirements

### Onboarding

Collect baby name, age, feeding mode, and initial observations. End with a direct CTA to get the first contributor map.

### Home

Show the latest strongest match, possible co-contributors, active investigation progress, and one primary next action. Do not duplicate the full Navigator result.

### Navigator

Provide free-text/voice entry, structured context, the symptom library, red-flag messaging, assessment loading/error states, contributor cards, follow-up questions, and start-investigation actions.

### Investigation Detail

Show why the contributor may fit, the controlled investigation plan, target observations, progress, related contributors, and start/continue actions.

### Targeted Check-in

Prioritize the active investigation's observations, collect fussiness, allow optional additions, show red-flag messaging immediately, and save approved data to the Journal.

### Progress

Show days tracked, target-observation counts, fussiness trend, completed steps, and a descriptive learning summary. Provide a clear route to continue tracking or reassess in Navigator.

### Guides

Provide the full Playbook and supporting education without presenting generic content as personalized assessment.

### Journal

Remain the source of truth for approved saved observations. Allow review, edit, and delete.

## 15. MVP Scope

### Included

- AI symptom intake using approved structured observations.
- One strongest match plus up to two co-contributors.
- Explanations of fit, limitations, and missing information.
- Deterministic red-flag messages and the blood-stool mapping.
- Seven Playbook contributors.
- One active guided investigation.
- Investigation-specific target observations.
- Short daily check-ins.
- Progress summary and Journal.
- Server-side model proxy with local example mode.

### Deferred

- Multiple simultaneous active investigations.
- Photos or image interpretation.
- Automated clinician messaging.
- Medication guidance.
- Open-ended diagnoses outside the Playbook.
- Model-generated treatment plans.
- Population-level probability scores.
- Numeric AI confidence percentages.
- Community or peer advice.

## 16. Success Metrics

### Activation

- Parent completes the first contributor map in under five minutes.
- At least 70% of completed assessments open a contributor explanation.
- At least 35% start a guided investigation.

### Engagement

- At least 50% of started investigations record three check-in days.
- Median check-in completion time is under 30 seconds.
- At least 30% of started investigations reach a progress review.

### Quality

- Parents report that the strongest match feels relevant.
- Every displayed matching observation exists in the approved input.
- Red-flag message recall is 100% in automated test histories.
- No model response can create an unsupported guided-investigation id.
- Example-mode results are always visibly labeled.

### Learning

- Track which follow-up questions most often change the contributor order.
- Track which contributors commonly appear together.
- Track where parents abandon an investigation plan.
- Use repeated unmapped model language to identify future Playbook topics without automatically publishing them.

## 17. Out of Scope and Positioning

The Fussy Baby does not replace physical examination, testing, or professional judgment. The MVP does not provide a definitive diagnosis, prescribe medication, or claim that a recorded intervention caused improvement.

The product may clearly state which contributor is the strongest match to the approved information. It must also show the supporting observations, relevant alternatives, and missing information so the parent can understand the basis of the result.

## 18. Implementation Notes

- Keep the existing React/Vite client and local-first store.
- Keep the Cloudflare Worker model proxy and evolve its output contract.
- Replace automatic all-history model calls with an explicit assessment action and persist the latest validated result.
- Rename the daily Record tab to Navigator; targeted recording becomes a context-specific route.
- Replace the old Patterns destination with Progress.
- Add investigation start metadata and target-observation definitions to the Playbook.
- Retain the existing Journal and educational content where they support the new flow.
- Keep the UI quiet, compact, and mobile-first.

## 19. Launch Decisions

- One product, not separate symptom-checker and tracking products.
- AI assessment is the front door.
- Guided investigations create continuity and differentiation.
- Tracking is targeted and optional.
- Contributor results allow overlap.
- Safety handling remains deterministic.
- Protocol steps come from the Playbook.
- The initial model provider is an implementation detail, not the product identity.
