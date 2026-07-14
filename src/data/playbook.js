/**
 * The Playbook — the source of truth for the investigation methodology.
 *
 * The Playbook is content; the app is the framework. Every investigation
 * uses the same template (What is it? · Common Signs · Investigation
 * Checklist · Learn More · Status), so adding an investigation is a
 * content update only.
 *
 * `signs` reference observation ids from vocabulary.js — they power the
 * Symptom Matrix and the Pattern Engine's evidence matching.
 */

export const STATUSES = [
  { id: "not_started", label: "Not started", tone: "neutral" },
  { id: "in_progress", label: "Exploring", tone: "signal" },
  { id: "complete", label: "Checked", tone: "calm" },
  { id: "low_priority", label: "Back burner", tone: "neutral" },
  { id: "revisit", label: "Come back later", tone: "warm" },
];

export function statusInfo(id) {
  return STATUSES.find((s) => s.id === id) ?? STATUSES[0];
}

export const INVESTIGATIONS = [
  {
    id: "feeding-mechanics",
    title: "Feeding Mechanics",
    short: "Small feeding issues can contribute to air intake, gas, spit up, and discomfort.",
    whatIsIt:
      "How a baby latches, sucks, and swallows affects how much air they take in during feeds. Small mechanical issues — a shallow latch, a fast-flow nipple, an awkward position — can add up to gas, spit up, and general discomfort. Feeding mechanics are one of the most common and most fixable contributors to fussiness.",
    signs: ["clicking", "milk-leaking", "gulping", "pulling-off", "gas", "spit-up", "hiccups", "fussy-after-feeds", "short-feeds"],
    checklist: [
      "Watch one full feed and note any clicking, gulping, or milk leaking from the corners of the mouth.",
      "Check the latch: lips flanged out, chin touching the breast or a deep reach onto the bottle nipple.",
      "If bottle feeding, try a slower-flow nipple for 2–3 days and note any change.",
      "Try paced bottle feeding: baby more upright, bottle horizontal, short pauses.",
      "Burp mid-feed as well as after, and log whether burps come up easily.",
      "Record fussiness after feeds for several days so patterns can emerge.",
    ],
    learnMore: ["paced-bottle-feeding", "tongue-ties-explained"],
    related: ["tongue-tie", "forceful-letdown"],
  },
  {
    id: "food-protein-sensitivity",
    title: "Food Protein Sensitivity",
    short: "Some babies react to proteins in milk, soy, or egg through fussiness, stool changes, skin changes, or reflux-like symptoms.",
    whatIsIt:
      "A small number of babies are sensitive to food proteins — most commonly cow's milk, and sometimes soy or egg — passed through breast milk or in formula. Reactions usually show up in the gut (mucus or blood-streaked stool, green stool), on the skin (rash, eczema), or as reflux-like discomfort. Investigating means observing carefully and discussing any elimination changes with your pediatrician.",
    signs: ["dairy", "soy", "egg", "wheat-gluten", "green-stool", "mucus-stool", "rash", "hives", "eczema", "facial-rash-feeds", "red-ring", "fussy-after-feeds", "spit-up"],
    checklist: [
      "Log what dairy, soy, and egg entered baby's day (directly, via formula, or via a breastfeeding parent's diet).",
      "Photograph and log any unusual stool — color, mucus, streaks.",
      "Note skin changes: new rashes, eczema flares, redness around the mouth.",
      "Track whether fussiness clusters in the hours after feeds.",
      "Bring 1–2 weeks of observations to your pediatrician before changing anyone's diet.",
      "If an elimination is recommended, log it as an intervention so changes can be compared.",
    ],
    learnMore: ["what-does-green-stool-mean"],
    related: ["silent-reflux", "gas-digestion"],
  },
  {
    id: "silent-reflux",
    title: "Silent Reflux",
    short: "Reflux can show up as discomfort during or after feeds, even without obvious spit up.",
    whatIsIt:
      "All babies reflux — milk comes partway up and usually back down. In silent reflux, the milk comes up but isn't spit out, so the discomfort is there without the visible spit up. It often looks like arching, crying during or after feeds, congestion, and trouble lying flat. Most reflux improves with time; the investigation is about understanding what makes your baby comfortable.",
    signs: ["arching-during-feed", "fussy-after-feeds", "congestion", "swallowing-sounds", "wet-burps", "sleeps-upright-only", "trouble-settling", "hiccups", "bottle-refusal", "night-waking"],
    checklist: [
      "Note when fussiness happens relative to feeds — during, right after, or 20–30 minutes later.",
      "Listen for wet swallowing, gagging, or gurgling sounds between feeds.",
      "Keep baby upright for 20–30 minutes after feeds for a few days and log any change.",
      "Log naps: does baby settle better upright (carrier, arms) than flat?",
      "Track congestion that isn't explained by a cold.",
      "Share the observation history with your pediatrician if discomfort persists.",
    ],
    learnMore: ["silent-reflux-explained"],
    related: ["feeding-mechanics", "food-protein-sensitivity"],
  },
  {
    id: "tongue-tie",
    title: "Oral Restrictions (Tongue Tie)",
    short: "A restricted tongue or lip can make feeding harder work — clicking, leaking, and extra air are common signs.",
    whatIsIt:
      "Some babies have a band of tissue under the tongue or upper lip that restricts movement. When the tongue can't move freely, the latch is shallower and the seal is weaker — feeds become louder (clicking), messier (leaking), longer, and gassier. Only a trained provider can assess a true restriction; your job in this investigation is to gather good observations.",
    signs: ["clicking", "milk-leaking", "pulling-off", "short-feeds", "frequent-feeds", "latch-pain", "gas", "fussy-after-feeds"],
    checklist: [
      "Record feed sounds for a few days: clicking, smacking, or lots of air swallowing.",
      "Note whether milk leaks from the corners of baby's mouth during feeds.",
      "Log feed lengths — very short or very long feeds are both worth noting.",
      "If nursing: note nipple pain or lipstick-shaped nipples after feeds.",
      "Ask a lactation consultant or pediatric provider for an oral assessment.",
    ],
    learnMore: ["tongue-ties-explained"],
    related: ["feeding-mechanics"],
  },
  {
    id: "forceful-letdown",
    title: "Forceful Letdown / Oversupply",
    short: "When milk flows faster than baby can comfortably swallow, feeds get gulpy, sputtery, and gassy.",
    whatIsIt:
      "Some parents' milk lets down fast enough that baby has to gulp to keep up — swallowing air along the way. Babies often cough, sputter, pull off at letdown, and then deal with gas and green-ish stools from getting proportionally more foremilk. It's very manageable once identified.",
    signs: ["gulping", "pulling-off", "green-stool", "foamy-stool", "gas", "spit-up", "explosive-stool", "fussy-after-feeds"],
    checklist: [
      "Note what happens in the first 2 minutes of a feed — coughing, gulping, or pulling off suggests fast flow.",
      "Try a laid-back nursing position for a few feeds so gravity slows the flow.",
      "Log stool color for a week — consistently green, frothy stool is a useful observation.",
      "If pumping before feeds or block feeding is suggested by a lactation consultant, log it as an intervention.",
      "Track whether gas and fussiness ease as flow-management changes are made.",
    ],
    learnMore: ["forceful-letdown-explained", "what-does-green-stool-mean"],
    related: ["feeding-mechanics", "gas-digestion"],
  },
  {
    id: "gas-digestion",
    title: "Gas & Digestive Immaturity",
    short: "Young digestive systems are still learning. Gas that builds during the day often peaks as evening fussiness.",
    whatIsIt:
      "A newborn's gut is brand new, and moving gas through it takes real effort — grunting, squirming, and pulling knees to chest are common. Gas builds over the day, which is one reason evening fussiness (the 'witching hour') is so widespread. The investigation is about spotting what makes gas better or worse for your baby.",
    signs: ["gas", "knees-to-chest", "straining", "red-face-grunting", "evening-fussiness", "explosive-stool", "trouble-settling", "inconsolable", "hiccups"],
    checklist: [
      "Log gas alongside the time of day it's worst.",
      "Try bicycle legs and clockwise tummy massage between feeds; log as an intervention.",
      "Burp thoroughly and log how easily burps come up.",
      "Note whether gassy days follow specific feeds, foods, or busy days.",
      "Track evening fussiness separately from daytime fussiness for a week.",
    ],
    learnMore: ["the-witching-hour"],
    related: ["feeding-mechanics", "food-protein-sensitivity"],
  },
  {
    id: "overtiredness",
    title: "Overtiredness & Overstimulation",
    short: "Fussy evenings often trace back to the day: short naps and big stimulation are a common combination.",
    whatIsIt:
      "Babies have small windows of comfortable wakefulness. When naps run short or the day runs loud, stress hormones build and babies get wired-but-exhausted — harder to settle, fussier, and quicker to cry. This investigation connects daytime rhythm to evening mood.",
    signs: ["short-nap", "high-stimulation", "new-place", "evening-fussiness", "trouble-settling", "night-waking", "inconsolable"],
    checklist: [
      "Log naps every day for a week — even rough lengths help.",
      "Note high-stimulation days: visitors, errands, travel, loud environments.",
      "Compare fussiness ratings on short-nap days versus good-nap days.",
      "Try one deliberately calm day and log how the evening goes.",
      "Watch for early tired cues (staring off, red eyebrows, jerky movements) and log when you catch them.",
    ],
    learnMore: ["the-witching-hour"],
    related: ["gas-digestion"],
  },
];

const byId = new Map(INVESTIGATIONS.map((i) => [i.id, i]));

export function getInvestigation(id) {
  return byId.get(id);
}

/**
 * How many investigations list each sign. A sign that points at only one
 * cause (eczema → food protein) is far more discriminating than one shared
 * across many (spit-up appears under feeding mechanics, food protein, and
 * forceful letdown). We use this to weight matches by specificity so a
 * single high-signal sign outranks a pile of generic ones — the same reason
 * a differential like DxGPT lands on cow's-milk protein over letdown.
 */
const signFrequency = (() => {
  const freq = new Map();
  for (const inv of INVESTIGATIONS)
    for (const s of inv.signs) freq.set(s, (freq.get(s) ?? 0) + 1);
  return freq;
})();

/** A sign's weight: 1.0 if unique to one cause, less as it gets more generic. */
export function signWeight(sign) {
  return 1 / (signFrequency.get(sign) ?? 1);
}

/**
 * Investigations whose signs overlap the given observation ids. Each result
 * carries the raw overlap (`matches`) for display and a specificity-weighted
 * `score` for ranking. Sorted strongest-first by score, then by overlap count.
 */
export function matchInvestigations(observationIds) {
  const set = new Set(observationIds);
  return INVESTIGATIONS.map((inv) => {
    const matches = inv.signs.filter((s) => set.has(s));
    const score = matches.reduce((sum, s) => sum + signWeight(s), 0);
    return { investigation: inv, matches, score };
  })
    .filter((m) => m.matches.length > 0)
    .sort((a, b) => b.score - a.score || b.matches.length - a.matches.length);
}
