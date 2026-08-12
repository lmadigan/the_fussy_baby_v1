# The Fussy Baby

A free, systematic Playbook for investigating common contributors to infant fussiness, with an optional paid AI Navigator that helps parents decide where they may fit within it.

**The app never diagnoses.** Safety alerts remain deterministic, AI is constrained to the published cause library, and every actionable protocol comes from controlled Playbook content.

## Running it

```bash
npm install
npm run dev
npm run build
```

Add `?demo` to the URL for a premium example assessment and an active plan whose outcome review is ready.

## Product model

The Playbook is free. AI personalization is premium.

| Screen | Purpose |
| --- | --- |
| Home | Premium assessment summary, free Playbook entry, and active-plan next action |
| Navigator | Paid symptom assessment with one strongest match, co-contributors, and Playbook mapping |
| Playbook | Free Protocol and Causes views |
| Cause | Explanation, common signs, personalized evidence when available, and protocol mapping |
| Protocol | Free checklist, review interval, and start-plan action |
| My Plan | Active checklist, return date, and saved outcome |
| Outcome Review | One-time better/same/worse review with deterministic interpretation |

Daily check-ins, Journal, Guides, and trend-based Progress are intentionally removed from MVP.

## Architecture

- `src/data/vocabulary.js` is the shared observation vocabulary and deterministic red-flag source.
- `src/data/playbook.js` separates eight causes from six protocol phases and maps them deterministically.
- `src/lib/store.jsx` persists membership, the latest assessment, one active plan, checklist completion, and one outcome review.
- `src/lib/differential.js` validates model output against the cause library and ensures blood-streaked stool informs Food Protein Sensitivity without suppressing the clinician message.
- `server/worker.js` ranks one strongest cause and up to two co-contributors. It cannot generate treatment or protocol content.
- Voice and narrative text are temporary inputs. The app stores only approved structured symptoms and the validated result.

The full product decisions are in `docs/product-requirements.md` and the latest formatted PRD is `docs/The Fussy Baby PRD - MVP v3.docx`.

## Design system

The approved **Quiet Gentle Intelligence: Navy Petal** direction uses Prata display type, Instrument Sans UI type, deep navy actions, and restrained rose/mint signals. Tokens live in `src/tokens/`; the implementation rules are in `docs/design-system.md`.
