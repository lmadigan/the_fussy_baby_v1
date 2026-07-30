/**
 * Differential engine — model-driven, replacing the old hand-coded
 * symptom→cause matrix.
 *
 * The parent's symptoms go to a small serverless proxy (see server/worker.js)
 * that asks Claude for a differential of common, benign infant-fussiness
 * causes and returns normalized JSON. The proxy holds the API key and the
 * prompt; this module is a thin, safe client.
 *
 * Two things stay OUT of the model's hands on purpose:
 *   1. Red flags — matched client-side from the vocabulary, deterministically,
 *      so a "call your pediatrician" nudge never depends on a model response.
 *   2. Ranking order — we render exactly the order the model returns; we do
 *      not re-sort or re-weight it.
 *
 * When no endpoint is configured (e.g. the static demo), we return a clearly
 * labelled example so the experience is still visible.
 */

import { getObservation, isRedFlag } from "../data/vocabulary.js";
import { INVESTIGATIONS } from "../data/playbook.js";

const ENDPOINT_KEY = "fussy-baby-differential-endpoint";

/** The differential proxy URL, from localStorage or a build-time default. */
export function getEndpoint() {
  try {
    const stored = localStorage.getItem(ENDPOINT_KEY);
    if (stored) return stored;
  } catch {
    /* localStorage unavailable */
  }
  return import.meta.env?.VITE_DIFFERENTIAL_ENDPOINT || "";
}

export function setEndpoint(url) {
  try {
    if (url) localStorage.setItem(ENDPOINT_KEY, url.trim());
    else localStorage.removeItem(ENDPOINT_KEY);
  } catch {
    /* ignore */
  }
}

export function hasEndpoint() {
  return Boolean(getEndpoint());
}

/** Map observation ids → human labels for the model prompt and for display. */
export function symptomLabels(ids) {
  return ids
    .filter((id) => !id.startsWith("custom:"))
    .map((id) => getObservation(id)?.label ?? id)
    .concat(ids.filter((id) => id.startsWith("custom:")).map((id) => id.slice(7)));
}

/** Red-flag labels present in a symptom list — computed here, never by the model. */
export function redFlagLabels(ids) {
  return ids.filter((id) => isRedFlag(id)).map((id) => getObservation(id)?.label ?? id);
}

/** Loosely match a model-named cause to a Playbook entry so we can reuse its care advice. */
export function matchPlaybookId(causeName) {
  if (!causeName) return null;
  const n = causeName.toLowerCase();
  for (const inv of INVESTIGATIONS) {
    const t = inv.title.toLowerCase();
    if (n.includes(t) || t.includes(n)) return inv.id;
  }
  // keyword fallbacks for common phrasings the model may use
  const keywords = [
    ["reflux", "silent-reflux"],
    ["milk protein", "food-protein-sensitivity"],
    ["cow", "food-protein-sensitivity"],
    ["allerg", "food-protein-sensitivity"],
    ["letdown", "forceful-letdown"],
    ["oversupply", "forceful-letdown"],
    ["latch", "feeding-mechanics"],
    ["tongue", "tongue-tie"],
    ["gas", "gas-digestion"],
    ["overtired", "overtiredness"],
    ["overstimul", "overtiredness"],
    ["colic", "gas-digestion"],
  ];
  for (const [kw, id] of keywords) if (n.includes(kw)) return id;
  return null;
}

/** Normalize whatever the proxy returns into a stable shape the UI can trust. */
function normalize(raw) {
  const causes = Array.isArray(raw?.causes) ? raw.causes : [];
  return {
    causes: causes.map((c) => ({
      name: String(c.name ?? "").trim() || "Possible cause",
      description: String(c.description ?? "").trim(),
      matching: Array.isArray(c.matching) ? c.matching.map(String) : [],
      notFitting: Array.isArray(c.notFitting) ? c.notFitting.map(String) : [],
      whatToTry: Array.isArray(c.whatToTry) ? c.whatToTry.map(String) : [],
      playbookId: matchPlaybookId(c.name),
    })),
    note: String(raw?.note ?? "").trim(),
    isExample: Boolean(raw?.isExample),
  };
}

/**
 * Ask the model for a differential. Returns a normalized result.
 * Throws on network / proxy errors so the caller can show a retry state.
 */
export async function requestDifferential({ symptoms, babyAgeMonths, signal }) {
  const endpoint = getEndpoint();
  const labels = symptomLabels(symptoms);

  if (!endpoint) {
    // No proxy connected — show a labelled example so the UX is still visible.
    return normalize({ ...exampleDifferential(labels), isExample: true });
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms: labels, babyAgeMonths }),
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Differential service returned ${res.status}. ${text.slice(0, 200)}`);
  }
  return normalize(await res.json());
}

/**
 * A canned, clearly-labelled example for the static demo and for when no
 * proxy is connected. This is NOT a fallback engine — it's one illustrative
 * result so the interface reads. Live reads come from the model.
 */
function exampleDifferential(labels) {
  const has = (kw) => labels.some((l) => l.toLowerCase().includes(kw));
  const causes = [];

  if (has("eczema") || has("rash") || has("hives") || has("mucus") || has("dairy")) {
    causes.push({
      name: "Cow's Milk Protein Allergy (food protein sensitivity)",
      description:
        "An immune reaction to proteins in cow's milk (via formula or a breastfeeding parent's diet) that can cause skin, gut, and reflux-like symptoms in infants.",
      matching: labels.filter((l) => /eczema|rash|hives|mucus|green|explosive|spit/i.test(l)),
      notFitting: ["Spit-up and explosive stool are common in healthy babies too, so on their own they're not specific."],
      whatToTry: [
        "Log skin changes and any unusual stool with photos.",
        "Note whether fussiness clusters in the hours after feeds.",
        "Bring 1–2 weeks of observations to your pediatrician before changing anyone's diet.",
      ],
    });
  }
  if (has("arch") || has("spit") || has("wet burp") || has("congestion")) {
    causes.push({
      name: "Infant reflux (GER / silent reflux)",
      description:
        "Stomach contents come back up the esophagus. Very common in young babies and usually improves with time; comfort measures often help.",
      matching: labels.filter((l) => /arch|spit|wet burp|congestion|fussy after/i.test(l)),
      notFitting: ["Reflux alone doesn't usually cause eczema or skin changes."],
      whatToTry: [
        "Keep baby upright 20–30 minutes after feeds for a few days.",
        "Watch whether discomfort comes during, right after, or ~30 min after feeds.",
      ],
    });
  }
  if (has("gulp") || has("green") || has("foamy") || has("pulling off")) {
    causes.push({
      name: "Forceful letdown / oversupply",
      description:
        "Milk flows faster than baby can comfortably swallow, so they gulp air and can get gassy, green-ish stools.",
      matching: labels.filter((l) => /gulp|green|foamy|pulling off|gas/i.test(l)),
      notFitting: ["Doesn't explain skin findings like eczema."],
      whatToTry: ["Try a laid-back nursing position so gravity slows the flow.", "Note what happens in the first 2 minutes of a feed."],
    });
  }
  if (causes.length === 0) {
    causes.push({
      name: "Gas & digestive immaturity",
      description:
        "A newborn's gut is still learning to move gas through, which is a very common source of fussiness — often peaking in the evening.",
      matching: labels,
      notFitting: [],
      whatToTry: ["Try bicycle legs and tummy massage between feeds.", "Track evening fussiness separately for a week."],
    });
  }

  return {
    causes: causes.slice(0, 4),
    note:
      "These are possible causes to explore and discuss with your pediatrician — not a diagnosis. This is a saved example; connect your model endpoint for a live read.",
  };
}
