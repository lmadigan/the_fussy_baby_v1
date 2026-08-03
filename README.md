# The Fussy Baby

An AI-assisted symptom navigator that helps parents organize possible contributors to infant fussiness, then optionally test one possibility through a short guided investigation.

**The app never diagnoses.** It organizes parent-reported evidence, keeps safety alerts deterministic, and uses curated Playbook steps for investigations.

## Running it

```bash
npm install
npm run dev
npm run build
```

Add `?demo` to the URL for a complete example family and investigation.

## Product loop

**Describe symptoms -> Review possible contributors -> Choose one investigation -> Complete focused check-ins -> Review progress.**

| Screen | Purpose |
| --- | --- |
| Onboarding | Baby age, feeding mode, current observations, and disclaimer |
| Home | Latest assessment, current investigation, and next action |
| Navigator | Free-text or voice context, observation picker, safety alerts, and an AI-ranked contributor assessment |
| Investigation | Curated explanation, evidence, steps, and a 7- or 14-day observation window |
| Check-in | Three to five targeted signals plus a fussiness rating and optional additional observations |
| Progress | Investigation check-ins, signal counts, average fussiness, and plan progress |
| Guides | Playbook reference, symptom explorer, and educational articles |
| Journal | Parent-approved observation history |

## Architecture

- `src/data/vocabulary.js` is the shared observation vocabulary and deterministic red-flag source.
- `src/data/playbook.js` defines the seven supported contributors, curated investigation steps, targeted signs, and review windows.
- `src/lib/differential.js` validates model output against the Playbook, accepts only parent-reported evidence, and ensures blood-streaked stool also informs Food Protein Sensitivity.
- `server/worker.js` is the model proxy. It ranks one strongest contributor and up to two co-contributors, but cannot generate treatment or protocols.
- Voice and narrative text are temporary inputs. The app persists approved observation IDs, the validated assessment, and guided check-ins in local storage.

The full product decisions and model contract are in `docs/product-requirements.md`.

## Design system

Direction **1d - Quiet Gentle Intelligence** from the Claude Design project: quiet ink on warm gray, periwinkle as the main attention signal, and mint/clay observation chips. Tokens live in `src/tokens/`.
