/**
 * Model-driven contributor assessment.
 *
 * Safety alerts remain deterministic in vocabulary.js. The model may rank and
 * explain only contributors represented in the Playbook; the client validates
 * that contract before anything reaches the UI.
 */

import { getObservation, isRedFlag } from "../data/vocabulary.js";
import { CAUSES, getCause } from "../data/playbook.js";

const PLAYBOOK_IDS = new Set(CAUSES.map((item) => item.id));
const DEFAULT_ENDPOINT = "https://fussy-baby-differential.laurenmadigan51.workers.dev";

export function getEndpoint() {
  return import.meta.env?.VITE_DIFFERENTIAL_ENDPOINT || DEFAULT_ENDPOINT;
}

export function symptomLabels(ids) {
  return ids
    .filter((id) => !id.startsWith("custom:"))
    .map((id) => getObservation(id)?.label ?? id)
    .concat(ids.filter((id) => id.startsWith("custom:")).map((id) => id.slice(7)));
}

export function redFlagLabels(ids) {
  return ids.filter((id) => isRedFlag(id)).map((id) => getObservation(id)?.label ?? id);
}

export function matchPlaybookId(causeName) {
  if (!causeName) return null;
  const name = causeName.toLowerCase();
  for (const cause of CAUSES) {
    const title = cause.title.toLowerCase();
    if (name.includes(title) || title.includes(name)) return cause.id;
  }
  const keywords = [
    ["reflux", "silent-reflux"],
    ["milk protein", "food-protein-sensitivity"],
    ["food protein", "food-protein-sensitivity"],
    ["allerg", "food-protein-sensitivity"],
    ["letdown", "forceful-letdown"],
    ["oversupply", "forceful-letdown"],
    ["latch", "tongue-tie"],
    ["tongue", "tongue-tie"],
    ["microbiome", "microbiome"],
    ["gut context", "microbiome"],
    ["digestive", "digestive-immaturity"],
    ["gas", "digestive-immaturity"],
    ["overtired", "sensory-overload"],
    ["overstimul", "sensory-overload"],
    ["structural", "structural-tension"],
  ];
  return keywords.find(([keyword]) => name.includes(keyword))?.[1] ?? null;
}

function cleanList(value) {
  return Array.isArray(value) ? value.map(String).map((item) => item.trim()).filter(Boolean) : [];
}

function normalize(raw, symptomIds) {
  const labels = symptomLabels(symptomIds);
  const reported = new Map(labels.map((label) => [label.toLowerCase(), label]));
  const seen = new Set();
  const causes = [];

  for (const candidate of Array.isArray(raw?.causes) ? raw.causes : []) {
    const requestedId = String(candidate?.playbookId ?? "").trim();
    const playbookId = PLAYBOOK_IDS.has(requestedId) ? requestedId : matchPlaybookId(candidate?.name);
    if (!playbookId || seen.has(playbookId)) continue;
    seen.add(playbookId);
    const playbook = getCause(playbookId);
    causes.push({
      playbookId,
      name: playbook.title,
      description: String(candidate?.description ?? playbook.short).trim() || playbook.short,
      matching: cleanList(candidate?.matching)
        .map((item) => reported.get(item.toLowerCase()))
        .filter(Boolean),
      notFitting: cleanList(candidate?.notFitting).slice(0, 3),
      missingInformation: cleanList(candidate?.missingInformation).slice(0, 3),
    });
    if (causes.length === 3) break;
  }

  // Blood-streaked stool is both an immediate safety alert and meaningful
  // evidence for the food-protein-sensitivity investigation.
  if (symptomIds.includes("blood-stool")) {
    const playbook = getCause("food-protein-sensitivity");
    const matching = playbook.signs
      .filter((id) => symptomIds.includes(id))
      .map((id) => getObservation(id)?.label)
      .filter(Boolean);
    const existingIndex = causes.findIndex((cause) => cause.playbookId === playbook.id);
    const existing = existingIndex >= 0 ? causes.splice(existingIndex, 1)[0] : null;
    causes.unshift(existing ? {
      ...existing,
      matching: [...new Set([...matching, ...existing.matching])],
    } : {
        playbookId: playbook.id,
        name: playbook.title,
        description: playbook.short,
        matching,
        notFitting: [],
        missingInformation: ["A clinician can help interpret the stool finding alongside feeding, skin, and growth history."],
      });
    if (causes.length > 3) causes.pop();
  }

  return {
    summary: String(raw?.summary ?? "").trim(),
    causes,
    followUpQuestions: cleanList(raw?.followUpQuestions).slice(0, 3),
    note: String(raw?.note ?? "").trim(),
    isExample: Boolean(raw?.isExample),
  };
}

export async function requestDifferential({
  symptoms,
  babyAgeMonths,
  feedingMode,
  fussinessTiming,
  additionalContext,
  signal,
}) {
  const endpoint = getEndpoint();
  const labels = symptomLabels(symptoms);

  if (!endpoint) return normalize({ ...exampleDifferential(labels), isExample: true }, symptoms);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      symptoms: labels,
      babyAgeMonths,
      feedingMode: feedingMode || "not provided",
      fussinessTiming: fussinessTiming || "not provided",
      additionalContext: String(additionalContext || "").slice(0, 2000),
    }),
    signal,
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error || "The assessment service is temporarily unavailable. Please try again.");
  }
  const result = normalize(await response.json(), symptoms);
  if (result.causes.length === 0) throw new Error("The assessment did not return a supported contributor. Please try again.");
  return result;
}

function exampleDifferential(labels) {
  const has = (pattern) => labels.some((label) => pattern.test(label));
  const matching = (pattern) => labels.filter((label) => pattern.test(label));
  const causes = [];

  if (has(/eczema|rash|hives|mucus|blood|green|explosive/i)) {
    causes.push({
      playbookId: "food-protein-sensitivity",
      description: "Food proteins can sometimes contribute to a combination of stool, skin, feeding, and reflux-like symptoms.",
      matching: matching(/eczema|rash|hives|mucus|blood|green|explosive|spit/i),
      notFitting: ["Many stool and spit-up changes are common in young babies, so the overall symptom cluster matters."],
      missingInformation: ["Whether symptoms change consistently with feeding exposures would make this possibility clearer."],
    });
  }
  if (has(/arch|spit|wet burp|congestion|after feed/i)) {
    causes.push({
      playbookId: "silent-reflux",
      description: "Reflux can cause discomfort during or after feeds even when very little milk is visibly spit up.",
      matching: matching(/arch|spit|wet burp|congestion|after feed/i),
      notFitting: ["Reflux by itself would not usually explain eczema or blood-streaked stool."],
      missingInformation: ["The timing of discomfort relative to feeds would help separate reflux from other contributors."],
    });
  }
  if (has(/gulp|foamy|pulling off|green/i)) {
    causes.push({
      playbookId: "forceful-letdown",
      description: "A fast milk flow can make a baby gulp, pull away, take in air, and become uncomfortable after feeds.",
      matching: matching(/gulp|foamy|pulling off|green|gas/i),
      notFitting: ["Fast flow would not usually explain skin changes."],
      missingInformation: ["What happens during the first two minutes of a feed would help test this possibility."],
    });
  }
  if (causes.length === 0) {
    causes.push({
      playbookId: "digestive-immaturity",
      description: "Young babies often work hard to move gas through a still-maturing digestive system.",
      matching: labels,
      notFitting: ["Gas is common and non-specific, so it should not be treated as a complete explanation without a clearer pattern."],
      missingInformation: ["Time of day and relation to feeds would make this possibility clearer."],
    });
  }

  return {
    summary: "This symptom cluster may have more than one contributor. The strongest match shows where personalized evidence intersects with the free Playbook.",
    causes: causes.slice(0, 3),
    followUpQuestions: ["When is fussiness worst relative to feeds?", "Have the stool or skin changes been consistent across several days?"],
    note: "This is an example assessment for exploration, not a diagnosis. The production AI service has not been configured in this build.",
  };
}
