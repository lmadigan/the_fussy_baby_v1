# The Fussy Baby PRD - Legacy Additions

> Superseded by `docs/product-requirements.md`. This file is retained as historical context for the original deterministic Pattern Engine and is not the current product requirements document.

Version: MVP v1.1 (draft)

These sections extend the MVP PRD. Section 7 is new. Section 8 replaces
Section 5 (Pattern Engine) in full.

---

# 7. Observation Vocabulary

## Purpose

The vocabulary is the shared language of the app.

Every observation a parent can record is defined once, in one place, and
referenced everywhere by a stable id:

- Detective chips
- Onboarding symptoms
- The Pattern Engine
- The Interactive Symptom Matrix
- The Playbook's Common Signs

The vocabulary is content. Expanding it never requires product changes.

## Structure

Each observation defines:

| Field | Purpose |
| --- | --- |
| id | Stable identifier. Persists in saved histories. Never reused or renamed. |
| label | Parent-facing chip text. |
| category | One of the 10 categories below. |
| match | Natural-language terms used to extract the observation from voice or typed text. |
| redFlag | Optional. Marks observations that get an immediate pediatrician nudge and never feed patterns. |

## Principles

Use the parent's language, not clinical language.
One concept per chip.
Labels can change freely; ids cannot.
Capture the observation even when no investigation maps to it yet.
Red flags are observations, not patterns.

## Categories

103 observations across 10 categories.
`†` marks red-flag observations.

### Food
What baby — or a breastfeeding parent — took in.

Dairy · Soy · Egg · Wheat / gluten · Peanut · Tree nuts · Fish / shellfish ·
Corn · Chocolate · Citrus / acidic foods · Gassy vegetables · Beans / legumes ·
Spicy food · Caffeine · Alcohol · Formula change · Hypoallergenic formula ·
New food introduced

### Feeding

Arching during feed · Pulling off · Clicking · Bottle refusal ·
Nursing strike / breast refusal · Gulping / coughing at letdown · Short feeds ·
Feeding very frequently · Milk leaking from mouth · Falling asleep at feeds ·
Distracted feeding · Prefers one side · Painful latch (parent)

### Stool

Green stool · Mucus in stool · Explosive stool · Blood-streaked stool † ·
Watery stool · Foamy / frothy stool · Unusually foul-smelling stool ·
Pale / white stool † · Constipation · Straining to pass stool

### Sleep

Short nap · Frequent night waking · Trouble settling · Only naps when held ·
Only settles upright · Long restful nap

### Symptoms

Spit up · Projectile vomiting † · Gas · Frequent hiccups · Wet burps ·
Congestion · Noisy breathing · Swallowing / gagging sounds ·
Ear pulling / rubbing · White coating on tongue · Fever † ·
Fewer wet diapers † · Unusually sleepy / hard to wake †

### Skin

Rash · Hives · Eczema flare · Rash around mouth after feeds ·
Red ring around anus · Diaper rash · Dry skin · Cradle cap

### Body & Behavior

Pulling knees to chest · Stiff / tense body · Fist clenching ·
Red face, straining and grunting · Turns head to one side ·
Chewing hands / rubbing gums · Heavy drooling

### Environment

High stimulation · New place · Daycare / new caregiver · Vaccination day ·
Calm, quiet day

### Interventions

Extra burping · Paced bottle feeding · Upright after feeds ·
Slower-flow nipple · New feeding position · Gas drops (simethicone) ·
Gripe water · Probiotic · Elimination diet · Bicycle legs / tummy massage ·
Swaddling · White noise · Pacifier · Reflux medication (prescribed) ·
Antibiotics (baby) · Vitamin / iron drops

### Fussiness

Fussiness during feeds · Fussiness after feeds · Evening fussiness ·
Inconsolable crying · Extended crying (hours) · High-pitched cry † ·
Generally content

## Red Flags

Red-flag observations: Blood-streaked stool, Pale / white stool,
Projectile vomiting, Fever, Fewer wet diapers, Unusually sleepy / hard to
wake, High-pitched cry.

Behavior:
- When a red flag enters Today's Log, Detective shows a calm notice:
  worth raising with your pediatrician today, on its own, not because of
  any pattern.
- Red flags are saved to History like any observation.
- Red flags never feed the Pattern Engine.
- The notice never uses alarm language and never speculates about cause.

## Calm Days

The engine cannot distinguish "green stool on dairy days" from "green
stool every day" unless uneventful days are also logged.
The product should actively encourage logging calm days
("Generally content" · "Calm, quiet day" · a fussiness rating alone is
enough to count as a logged day).

## Custom Observations as Gap Detector

Anything a parent types that doesn't match the vocabulary is saved as a
custom observation. Recurring custom observations are the vocabulary's
backlog — they show exactly what parents are noticing that we haven't
named yet. Review them on a regular cadence.

## Out of Scope

- Free-text symptom interpretation
- Severity grading per observation (fussiness rating covers the day)
- Clinical terminology

## TODO

Clinical review of the full vocabulary (lactation consultant +
pediatric reviewer) before launch.

---

# 8. Pattern Engine

Replaces Section 5.

## Purpose

Analyze approved observations over time and surface meaningful patterns
that help guide future investigations.

The Pattern Engine powers the Patterns screen and the "What We've
Learned" section of Home.

## Position

The engine sits between History (its only data source) and the Patterns
screen (its only consumer).

Only observations approved and saved by the parent are evaluated.
Voice transcripts are never an input; they are discarded after
extraction.

## Inputs

- The complete observation history, all categories evaluated together
- Daily fussiness ratings
- Interventions and their start dates
- Investigation statuses
- The Playbook's investigation → signs mapping
- Timing metadata, when captured (see Dependencies)

## Architecture

Three layers. Every number is computed in Layer 1. Layers 2 and 3 may
organize and phrase, never calculate or invent.

### Layer 1 — Evidence (deterministic)

Computes four kinds of evidence:

**Co-occurrence.**
Which observations appear, how often, on how many distinct days.

**Fussiness-anchored lift.**
Is fussiness meaningfully higher on days with input X than on days
without it? Anchoring on the fussiness rating — the one outcome parents
care about — contains the multiple-comparisons problem that comes with
100+ observation types. v1 computes lift against fussiness only, not
between arbitrary observation pairs.

**Temporal association.**
Exposure → response inside a window (food exposures: 24–72h;
feed-related responses: same day). Requires timing capture; deferred
until that ships.

**Intervention response.**
For each intervention logged on 3+ days: compare mean fussiness in the
days before its first appearance to the days after. Surfaced
descriptively ("Fussiness has averaged lower since paced feeding
appeared in your log"), never causally.

### Layer 2 — Classification

Evidence is sorted into three tiers. Nothing is filtered out for being
unexplained; the Playbook constrains *naming*, not *surfacing*.

**Tier 1 — Investigation Patterns.**
Supporting observations map to a Playbook investigation's signs.

Threshold: ≥ 3 distinct signs, ≥ 5 total sightings, ≥ 3 distinct days.
(Tuned with the simulation harness: at these values, synthetic babies
with a known cause are detected 100% of the time by median day 4 with
the true investigation ranked first, while a control baby with no
underlying cause surfaces zero patterns across 50 simulated months.
The looser 2/3/2 thresholds produced a false pattern for 74% of
control babies.)

Card: investigation title · what we're noticing · supporting
observations with counts · View Evidence · Open Investigation.

**Tier 2 — Unmapped Correlations.**
A robust association exists but no investigation claims it.

Because no prior knowledge backs these, the bar is higher:
≥ 10 logged days overall · the input present on ≥ 4 days ·
≥ 3 days without the input for comparison · mean fussiness on days-with
at least 1.0 higher than days-without.

Card: what we're noticing (descriptive only) · supporting observations
with counts · View Evidence. No investigation CTA. Includes: "This
doesn't match one of our investigations — it may be worth mentioning to
your pediatrician."

Example:
> Fussiness tends to be higher on days with long car rides — seen on
> 4 of 5 such days.

**Tier 3 — Red Flags.**
Never patterns. Surfaced immediately in Detective at logging time
(see Section 7). The Patterns screen never displays them as evidence.

### Layer 3 — Language (AI-assisted)

An LLM is used in three seats, all optional enhancements to a
deterministic core that works without them:

**Extraction.** Map natural speech onto the vocabulary
("she kept doing that clicky thing" → Clicking). Replaces keyword
matching. Output is chips the parent approves — extraction errors are
correctable at the approval step, by design.

**Narration.** Compose the "We're noticing…" text from Layer 1's
evidence JSON.

**Prioritization.** Given Tier 1 patterns, suggest which investigation
may be worth starting next, with rationale drawn only from the evidence.

Hard rules for every AI seat:

1. Every number, date, and observation in AI output must exist in the
   Layer 1 evidence it was given. The AI never generates quantities.
2. The AI may never name a cause outside the Playbook.
3. On Tier 2 patterns the AI describes the association only. No
   speculation about what it means — that is where a model would
   volunteer "this could be motion sensitivity," and it must not.
4. AI output that violates 1–3 is dropped and the deterministic fallback
   text is used instead.

## Principles

Evaluate all observations together.
Organize by investigation; evidence the Playbook can't explain is still
surfaced, generically.
Surface evidence, not conclusions — "We're noticing…", never "Your baby
has…" or "This is causing…".
Never rule anything out. Not enough evidence means silence, not
absence.
Explain every pattern: the exact observations, counts, and dates behind
it are always one tap away.
Prefer silence over noise: a wrong pattern costs trust that a missing
pattern does not.

## The Playbook Feedback Loop

Tier 2 is how the Playbook grows. A recurring unmapped correlation is a
content gap announcing itself: if parents keep surfacing an association
we can't name, that's the next investigation to write. Persistent
unmapped patterns (3+ weeks) should be tracked as Playbook backlog.
The Playbook evolves without product redesigns; Tier 2 tells it where.

## Evaluation

"Useful and accurate" is a testable claim:

- **Golden histories.** ~20 synthetic observation histories with planted
  patterns and planted decoys. The engine must surface every planted
  pattern (recall) and no decoys (precision). Runs on every change to
  engine thresholds or Playbook signs.
- **Extraction set.** Transcript samples with expected observation ids;
  extraction accuracy measured per release.
- **Language audit.** Every AI narration checked against hard rules 1–3
  automatically before display.

## Out of Scope

The Pattern Engine does not:

- Diagnose
- Rank medical conditions or state probabilities
- Recommend treatments
- Generate educational content
- Correlate arbitrary observation pairs (v1 anchors on fussiness)

## Dependencies & Open Decisions

- **Timing capture.** Temporal association needs when-relative-to-feeds
  or time-of-day on observations. Product decision: lightweight
  (morning/afternoon/evening/night) vs. feed-relative.
- **Backend.** AI seats require an API key and therefore a small
  backend or proxy; the app is currently fully client-side.
- **Privacy wording.** With AI extraction, "transcripts never leave
  your device" becomes "processed then discarded." The disclaimer and
  onboarding copy must say so plainly.
