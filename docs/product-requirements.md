# The Fussy Baby Product Requirements

Version: MVP v3 - Free Playbook + Premium AI Navigator

## 1. Product Definition

The Fussy Baby helps a parent move from an overwhelming symptom cluster to a systematic investigation plan.

The product has two complementary layers:

- **The Playbook:** a free educational cause library and step-by-step protocol that any parent can use independently.
- **AI Symptom Navigator:** a paid assessment that identifies the strongest matching contributor, allows for co-contributors, explains the evidence, and maps each result into the Playbook.

The product does not diagnose, prescribe medication, or replace a healthcare professional. It organizes possibilities and provides controlled educational protocols.

## 2. Product Promise

### Free promise

Understand the most common contributors discussed in the Fussy Baby Playbook and follow a complete, systematic protocol without paying or maintaining a daily journal.

### Paid promise

Reduce uncertainty about where to begin. Describe what is happening and receive a personalized contributor map showing what fits best and where each contributor appears in the Playbook.

### Product statement

The Playbook gives you the complete process. Navigator helps you understand where your baby may fit within it.

## 3. Source Methodology

The original Fussy Baby Playbook provides two related structures that must remain distinct.

### Ranked cause library

The Playbook describes eight contributors in the order they appear most frequently in its source material and parent discussions:

1. Food Protein Sensitivity.
2. Silent Reflux.
3. Tongue Tie or Oral Restriction.
4. Oversupply or Forceful Letdown.
5. Gut Microbiome Disruption.
6. Immature Digestive System.
7. Sensory Overload.
8. Structural Tension.

This order is educational. It is not a clinical prevalence estimate or a personalized probability.

### Systematic protocol

The Playbook also provides a six-phase protocol:

1. Rule Out Structural and Oral Issues.
2. Investigate Feeding Dynamics.
3. Investigate Food Protein Sensitivity.
4. Investigate Silent Reflux.
5. Support Digestive Health as a parallel track.
6. Use Sensory and Environmental Support as an ongoing track.

The eight causes do not map one-to-one to the six phases. The data model must explicitly connect each cause to its relevant protocol step.

### Content governance

The original Playbook is the methodology and content source, but it is not automatically publication-ready medical guidance. Every actionable protocol must be reviewed for current safety and evidence before launch.

For MVP:

- Do not recommend an inclined sleep surface. Safe-sleep language must require a firm, flat, non-inclined surface and back sleeping.
- Do not tell a breastfeeding parent to broadly eliminate dairy, soy, and egg without clinician or dietitian guidance.
- Do not prescribe medication, formula, supplements, probiotics, dosing, procedures, or supply-management changes.
- Do not present craniosacral therapy or chiropractic treatment as established care.
- Blood in stool and other red flags must surface the deterministic clinician message immediately.
- Improvement after an elimination or feeding change does not, by itself, confirm a diagnosis.

## 4. Business Model

### Free tier

Free access includes:

- All eight cause pages.
- The symptom relationship matrix when included.
- All six protocol steps.
- Every protocol checklist.
- Starting and saving one active plan.
- Checklist completion.
- Start date and return date.
- One structured outcome review.
- Deterministic red-flag messages.

Free access is a complete self-guided product, not a content teaser.

### Premium tier

Premium access includes:

- AI symptom assessment.
- One strongest match and up to two co-contributors.
- Explanation of supporting and non-specific evidence.
- Missing information and useful follow-up questions.
- Mapping from every contributor to its Playbook step.
- Personalized reassessment after a protocol outcome.

Initial pricing assumption: $5 per month. Pricing and billing implementation remain subject to validation.

### Paywall principle

The product should disclose that Navigator is premium before sending data to the model. Do not collect a full assessment and unexpectedly hide the result behind a paywall.

## 5. Information Architecture

The bottom navigation contains four destinations:

1. **Home**
2. **Navigator**
3. **Playbook**
4. **My Plan**

Journal, daily recording, Detective, Guides, and Progress are removed from the MVP information architecture.

Settings, membership, and account controls live behind a profile or settings control and do not occupy bottom navigation.

## 6. Core Product Loops

### Free loop

1. Browse the Playbook protocol or cause library.
2. Open a cause or protocol step.
3. Start a free plan.
4. Complete the checklist independently.
5. Wait until the protocol's review point.
6. Complete one outcome review.
7. Continue, repeat, or choose another Playbook step.

### Premium loop

1. Open Navigator.
2. Describe symptoms and approve structured observations.
3. Receive a personalized contributor map.
4. See both the AI rank and the contributor's Playbook position.
5. Open the mapped free protocol.
6. Complete the plan and outcome review.
7. Reassess with Navigator when the outcome is mixed, unchanged, or suggests co-contributors.

## 7. Cause and Protocol Relationship

Every cause object contains:

- Stable cause id.
- Educational order.
- Parent-facing title.
- Evidence label.
- Short and long explanation.
- Common signs.
- Related causes.
- Mapped protocol step id.

Every protocol object contains:

- Stable protocol id.
- Step number.
- Track type: core, parallel, or ongoing.
- Parent-facing title.
- Short explanation.
- Controlled checklist.
- Review interval.
- Outcome question.
- Related cause ids.

### Personalized display example

**Strongest AI match:** Food Protein Sensitivity

**Playbook position:** Step 3 of 4 core steps

The UI explains that Steps 1 and 2 cover faster feeding and structural checks with overlapping signs. It does not claim the AI result overrides medical judgment or confirms a condition.

## 8. Outcome Review Instead of Daily Tracking

MVP does not include daily check-ins, symptom journaling, trend charts, or a historical observation log.

Starting a protocol records:

- Protocol id.
- Start date.
- Expected review date.
- Checklist state.
- Status.

At the review point, ask:

- Were you able to follow the protocol consistently?
- Is the baby clearly better, somewhat better, unchanged, or worse?
- Which original symptoms improved, when useful?
- Is there anything the parent wants to remember?

The review should take approximately one minute.

### Deterministic interpretation

- **Clearly better and protocol followed:** the contributor is more consistent with what the parent observed. Show the protocol's confirmation or clinician-guided next step.
- **Somewhat better:** the contributor may explain part of the fussiness. Keep co-contributors visible.
- **Unchanged, protocol followed, full interval reached:** the contributor may be less likely to explain the full picture. Suggest the next Playbook step or premium reassessment.
- **Protocol not followed consistently:** do not interpret the result. Offer to restart or discuss another plan.
- **Worse:** stop and reassess. Surface clinician guidance for worsening or concerning symptoms.
- **Red flag:** immediately show the deterministic clinician message regardless of plan timing or outcome.

Use relative language such as more consistent, less likely to explain the full picture, or still unclear. Do not say confirmed, cured, or ruled out.

## 9. Screen Requirements

### Onboarding

Collect baby name, age, feeding mode, and optional initial observations. Explain that the Playbook is free and Navigator provides paid personalization.

### Home

Home is the decision center.

Without an active plan, show:

- Premium Navigator entry.
- Free Playbook entry.
- Browse Causes shortcut.
- View Protocol shortcut.

With an AI assessment, show:

- Strongest match.
- Matching observations.
- Playbook position.
- Review-assessment action.

With an active plan, show:

- Protocol title.
- Protocol position.
- Checklist completion.
- Return date.
- Continue My Plan action.

### Navigator

Navigator is visibly premium.

Free state shows:

- What personalization provides.
- Price or membership action.
- Direct route to the free Playbook.

Premium state provides:

- Free text or voice input.
- Structured observation approval.
- Feeding and timing context.
- Deterministic red-flag message.
- Loading, error, and retry states.
- Strongest match and co-contributors.
- Supporting, non-specific, and missing evidence.
- Playbook position for every result.
- Route to the free cause and protocol content.

### Playbook

Playbook replaces Guides.

Use a segmented control with:

- **Protocol:** four core steps plus parallel and ongoing support tracks.
- **Causes:** all eight educational cause pages.

### Cause Detail

Show:

- Cause order and evidence label.
- Explanation.
- Common signs.
- Premium assessment evidence when available.
- Mapped protocol step.
- Route to the free protocol.

### Protocol Detail

Show:

- Step number and track type.
- Controlled checklist.
- Checklist completion.
- Review interval.
- Outcome question.
- Start or continue action.
- Educational and safety framing.

### My Plan

My Plan replaces Progress.

Show:

- Current protocol step.
- Checklist completion.
- Start date and return date.
- No-daily-logging message.
- Outcome-review availability.
- Saved outcome when complete.
- Route to premium reassessment.

### Outcome Review

Collect consistency, outcome, and an optional note. Interpret the result deterministically and route the parent back to My Plan or Navigator.

## 10. AI System Contract

### Allowed cause catalog

The model may select only the eight published cause ids. It may not generate an open-ended diagnosis or a new protocol.

### Required output

Return:

- Summary.
- One strongest cause and no more than two co-contributors.
- Valid cause id for each contributor.
- Supporting observations copied exactly from approved input.
- Non-specific or conflicting evidence.
- Missing information.
- Up to three follow-up questions.
- Exploration note.

### Validation rules

- Reject malformed JSON.
- Remove duplicate or unsupported cause ids.
- Never display an unreported observation as matching evidence.
- Never allow model output to suppress a red-flag message.
- If blood in stool is reported, deterministically rank Food Protein Sensitivity first and retain the clinician message.
- Map causes to protocol steps in trusted application code, not model output.
- Never let the model create or rewrite checklist instructions.
- Clearly label example mode when a live endpoint is not connected.

### Provider independence

The client contract remains model-provider neutral. The initial Worker calls the OpenAI Responses API, but model selection is not part of the user-facing product identity.

## 11. Safety

### Deterministic red flags

Red-flag observations include:

- Blood in stool.
- Pale or white stool.
- Projectile vomiting.
- Fever.
- Fewer wet diapers.
- Unusually sleepy or hard to wake.
- High-pitched cry.

Selecting a red flag immediately surfaces the contact-healthcare-professional message. This never depends on AI or plan status.

Blood in stool also maps to Food Protein Sensitivity as supporting evidence. Other red flags remain safety-only unless a reviewed mapping is explicitly added.

### Controlled protocol content

Protocol changes require content review and versioning. AI cannot add treatment instructions. The product should retain a source and review record for every actionable checklist.

## 12. Data and Privacy

### Stored locally for MVP

- Baby profile and age.
- Feeding mode and structured context.
- Approved symptom ids used in the latest assessment.
- Membership state for the prototype.
- Latest validated contributor map.
- Active protocol id.
- Protocol start and review dates.
- Checklist completion.
- Structured outcome and optional note.

### Not stored

- Voice audio.
- Raw speech transcript.
- Unapproved extracted observations.
- Daily symptom history.
- Journal entries.
- Model chain-of-thought.

The UI must state when approved structured symptoms are sent to the configured model service.

## 13. MVP Scope

### Included

- Four-destination navigation.
- Free eight-cause library.
- Free six-phase Playbook protocol.
- One active plan.
- Checklist completion and return date.
- One outcome review.
- Premium gate and AI Navigator experience.
- One strongest match plus up to two co-contributors.
- Deterministic safety handling.
- Server-side model proxy and example mode.

### Deferred

- Real billing and account management.
- Push or email reminders.
- Multiple simultaneous plans.
- Daily symptom logging and Journal.
- Trend charts.
- Photo or image interpretation.
- Medication guidance.
- Open-ended diagnoses.
- Model-generated protocols.
- Automated clinician messaging.
- Community advice or social features.

## 14. Success Metrics

### Free value

- Percentage of new users who open a cause or protocol.
- Percentage who start a free plan.
- Checklist completion rate.
- Percentage returning for the outcome review.

### Premium conversion

- Percentage of free users who open Navigator.
- Paywall-to-membership conversion.
- Assessment completion rate.
- Percentage of assessments that open the mapped cause or protocol.
- Percentage that return for premium reassessment after an outcome.

### Quality and safety

- Parents report that the strongest match feels relevant and understandable.
- Every matching observation exists in approved input.
- Every AI contributor maps to a published cause id.
- Every displayed protocol comes from reviewed Playbook content.
- Red-flag message recall is 100% in automated safety tests.
- No removed Journal or daily-tracking path remains reachable.

## 15. Implementation Notes

- Keep the React and Vite client.
- Keep local-first storage for the prototype.
- Keep the Cloudflare Worker model proxy.
- Separate cause content from protocol content in code.
- Map cause ids to protocol ids deterministically.
- Replace investigations, daily observations, and progress summaries with plan, checklist, review date, and outcome state.
- Keep the UI compact and mobile-first.
- Keep membership activation local in the prototype until billing is selected.

## 16. Launch Decisions

- The Playbook is free.
- AI personalization is paid.
- The free product remains useful without AI.
- Navigator is the premium front door for parents who want help choosing where to begin.
- Cause rank and protocol order remain separate concepts.
- Protocol Steps 1-4 form the core path.
- Digestive support is parallel.
- Sensory support is ongoing.
- Daily check-ins, Journal, and trend-based Progress are removed.
- My Plan contains checklists, timing, and one outcome review.
- Safety handling is deterministic.
- Protocol content is controlled and never generated by AI.
