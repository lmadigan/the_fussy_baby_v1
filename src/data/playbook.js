/**
 * The free Playbook has two related, but distinct, structures:
 * - causes explain the common contributors parents may want to understand;
 * - protocol steps provide a systematic path parents can follow on their own.
 *
 * AI may rank causes. It never invents or rewrites protocol content.
 */

export const PROTOCOL_STEPS = [
  {
    id: "structural-oral",
    number: 1,
    track: "core",
    timing: "Start here",
    title: "Rule Out Structural & Oral Issues",
    short: "Check whether latch, suction, bottle flow, or physical feeding mechanics are adding air or discomfort.",
    reviewAfterDays: 7,
    checklist: [
      "Watch one complete feed and note clicking, leaking, jaw tension, or a shallow latch.",
      "Confirm that bottle nipple flow is not faster than baby can comfortably manage.",
      "Try paced bottle feeding or a more supported feeding position when appropriate.",
      "Ask an IBCLC or feeding-qualified healthcare professional to observe a feed if concerns persist.",
      "Follow any provider-recommended correction long enough to reach the planned review date.",
    ],
    reviewQuestion: "After addressing feeding mechanics, is feeding more comfortable and is fussiness improving?",
    relatedCauseIds: ["tongue-tie", "structural-tension"],
  },
  {
    id: "feeding-dynamics",
    number: 2,
    track: "core",
    timing: "Next quick check",
    title: "Investigate Feeding Dynamics",
    short: "Fast flow and oversupply can resemble reflux or food sensitivity and are often quicker to explore.",
    reviewAfterDays: 7,
    checklist: [
      "Look for coughing, choking, gulping, pulling off, or distress in the first minutes of feeds.",
      "For nursing, try a laid-back position that may make a fast letdown easier to manage.",
      "For bottles, use paced feeding and confirm an appropriate nipple flow with a feeding professional.",
      "Notice whether green or foamy stools occur alongside fast, difficult feeds.",
      "Discuss supply-management changes with an IBCLC before making changes that could affect milk supply.",
    ],
    reviewQuestion: "After making the recommended feeding adjustment, are feeds calmer and is post-feed discomfort improving?",
    relatedCauseIds: ["forceful-letdown"],
  },
  {
    id: "food-protein",
    number: 3,
    track: "core",
    timing: "Defined review period",
    title: "Investigate Food Protein Sensitivity",
    short: "Use a clinician-supported feeding or elimination protocol, then review the original symptom cluster after enough time has passed.",
    reviewAfterDays: 14,
    checklist: [
      "Contact a healthcare professional promptly if blood-streaked stool or another red flag is present.",
      "Review the stool, skin, feeding, and reflux-like symptoms that led to this investigation.",
      "Agree on one defined feeding or elimination protocol with a pediatrician or dietitian before starting.",
      "Record the protocol start date and avoid adding unrelated dietary or formula changes during the review period.",
      "Follow the agreed protocol consistently until the outcome review unless a clinician advises otherwise.",
      "Use a clinician-guided reintroduction or next step when appropriate; improvement alone is not a diagnosis.",
    ],
    reviewQuestion: "After the agreed review period, are the original stool, skin, feeding, and fussiness symptoms clearly better?",
    relatedCauseIds: ["food-protein-sensitivity"],
  },
  {
    id: "reflux",
    number: 4,
    track: "core",
    timing: "If symptoms persist",
    title: "Investigate Silent Reflux",
    short: "Bring a specific symptom history to a clinician and test only safe, provider-supported feeding adjustments.",
    reviewAfterDays: 7,
    checklist: [
      "Write down the dominant symptoms and when they occur relative to feeds.",
      "Keep baby upright while awake after feeds when practical.",
      "Use a firm, flat, non-inclined sleep surface and place baby on their back for sleep.",
      "Discuss feeding volume, frequency, and technique with a pediatrician or feeding professional.",
      "Ask specifically about reflux if arching, feeding distress, or difficulty lying flat persists.",
      "Follow the clinician's plan until its stated review point before interpreting the outcome.",
    ],
    reviewQuestion: "After following the agreed reflux plan, are feeding comfort, settling, or sleep-related symptoms improving?",
    relatedCauseIds: ["silent-reflux"],
  },
  {
    id: "microbiome-support",
    number: 5,
    track: "parallel",
    timing: "Parallel support",
    title: "Support Digestive Health",
    short: "Discuss digestive and microbiome support alongside the core protocol rather than waiting for every other step.",
    reviewAfterDays: 14,
    checklist: [
      "Share relevant birth, antibiotic, feeding, stool, and growth history with the baby's clinician.",
      "Discuss whether any probiotic or feeding support is appropriate for this baby before starting it.",
      "Avoid starting multiple new products at once, so the outcome remains interpretable.",
      "Follow the selected plan until its recommended review point.",
    ],
    reviewQuestion: "After the planned support period, are digestive comfort and overall fussiness improving?",
    relatedCauseIds: ["microbiome", "digestive-immaturity"],
  },
  {
    id: "sensory-support",
    number: 6,
    track: "ongoing",
    timing: "Available anytime",
    title: "Sensory & Environmental Support",
    short: "Use calm, low-risk comfort measures while investigating contributors that may be driving the fussiness.",
    reviewAfterDays: 7,
    checklist: [
      "Reduce stimulation during the hardest part of the day with lower light, fewer transitions, and a quieter environment.",
      "Try a consistent calming sequence such as holding, shushing, rhythmic movement, and a pacifier when appropriate.",
      "Use babywearing only with a clear airway and according to the carrier's safety instructions.",
      "Keep white noise at a low volume and away from the baby's sleep space.",
      "Continue safe sleep practices for every sleep, even when comfort measures happen beforehand.",
    ],
    reviewQuestion: "Does the consistent calming routine make the hardest periods more manageable?",
    relatedCauseIds: ["sensory-overload"],
  },
];

export const CAUSES = [
  {
    id: "food-protein-sensitivity",
    rank: 1,
    title: "Food Protein Sensitivity",
    evidenceLabel: "Commonly discussed",
    short: "A stool, skin, feeding, and reflux-like symptom cluster can sometimes point toward a food protein response.",
    whatIsIt: "Food protein sensitivity can overlap with reflux and ordinary newborn symptoms. Blood or mucus in stool, eczema, and persistent feeding discomfort make the full cluster more informative than any single sign.",
    signs: ["green-stool", "mucus-stool", "blood-stool", "eczema", "rash", "diaper-rash", "fussy-after-feeds", "spit-up"],
    protocolStepId: "food-protein",
    related: ["silent-reflux", "microbiome"],
  },
  {
    id: "silent-reflux",
    rank: 2,
    title: "Silent Reflux",
    evidenceLabel: "Commonly discussed",
    short: "Reflux can appear as discomfort during or after feeds even when very little milk is visibly spit up.",
    whatIsIt: "Reflux-like discomfort may include arching, wet burps, feeding distress, congestion, or difficulty settling flat. These signs overlap with feeding mechanics and food protein sensitivity, so context matters.",
    signs: ["arching-during-feed", "fussy-after-feeds", "wet-burps", "congestion", "sleeps-upright-only", "trouble-settling", "hiccups"],
    protocolStepId: "reflux",
    related: ["food-protein-sensitivity", "tongue-tie"],
  },
  {
    id: "tongue-tie",
    rank: 3,
    title: "Tongue Tie / Oral Restriction",
    evidenceLabel: "Commonly discussed",
    short: "Restricted oral movement may make feeding harder and contribute to clicking, leaking, or extra air intake.",
    whatIsIt: "A functional feeding assessment matters more than appearance alone. Not every clicking feed is a tie, and the app cannot confirm an oral restriction.",
    signs: ["clicking", "milk-leaking", "short-feeds", "frequent-feeds", "latch-pain", "gas", "fussy-after-feeds"],
    protocolStepId: "structural-oral",
    related: ["structural-tension", "forceful-letdown"],
  },
  {
    id: "forceful-letdown",
    rank: 4,
    title: "Oversupply / Forceful Letdown",
    evidenceLabel: "Commonly discussed",
    short: "Fast milk flow can make feeds gulping, sputtery, and uncomfortable and can overlap with other digestive signs.",
    whatIsIt: "A baby managing fast flow may cough, pull away, swallow air, or have green or foamy stools. This contributor is most relevant to breastfeeding and should be interpreted in feeding context.",
    signs: ["gulping", "pulling-off", "green-stool", "foamy-stool", "gas", "explosive-stool", "fussy-after-feeds"],
    protocolStepId: "feeding-dynamics",
    related: ["tongue-tie", "food-protein-sensitivity"],
  },
  {
    id: "microbiome",
    rank: 5,
    title: "Gut Microbiome Disruption",
    evidenceLabel: "Developing evidence",
    short: "Birth, antibiotics, feeding history, and the developing gut microbiome may influence digestive comfort.",
    whatIsIt: "Microbiome research is evolving, and symptoms such as gas or crying are non-specific. Product or probiotic decisions should be made with the baby's healthcare professional.",
    signs: ["gas", "explosive-stool", "antibiotics", "evening-fussiness", "trouble-settling"],
    protocolStepId: "microbiome-support",
    related: ["digestive-immaturity", "food-protein-sensitivity"],
  },
  {
    id: "digestive-immaturity",
    rank: 6,
    title: "Immature Digestive System",
    evidenceLabel: "Developmental",
    short: "Young babies may grunt, strain, and struggle with gas as digestion and coordination mature.",
    whatIsIt: "Digestive immaturity is common and often improves with development, but it should not automatically be used to dismiss persistent pain, poor feeding, growth concerns, or red flags.",
    signs: ["gas", "knees-to-chest", "straining", "red-face-grunting", "evening-fussiness", "hiccups"],
    protocolStepId: "microbiome-support",
    related: ["microbiome", "sensory-overload"],
  },
  {
    id: "sensory-overload",
    rank: 7,
    title: "Sensory Overload",
    evidenceLabel: "Commonly discussed",
    short: "Short naps and a busy day can build into difficult settling and evening fussiness.",
    whatIsIt: "Some babies reach their stimulation limit quickly. A quieter rhythm may reduce the intensity of hard periods even when another feeding or digestive contributor is also present.",
    signs: ["short-nap", "high-stimulation", "new-place", "evening-fussiness", "trouble-settling", "night-waking", "inconsolable"],
    protocolStepId: "sensory-support",
    related: ["digestive-immaturity"],
  },
  {
    id: "structural-tension",
    rank: 8,
    title: "Structural Tension",
    evidenceLabel: "Limited evidence",
    short: "Head preference, body tension, or feeding asymmetry may warrant a conventional clinical assessment.",
    whatIsIt: "Some parents notice persistent asymmetry after birth. Because evidence for many proposed treatments is limited, the useful first step is evaluation by a pediatrician or appropriately licensed feeding or physical-therapy professional.",
    signs: ["head-side-preference", "body-tension", "pulling-off", "latch-pain", "fussy-during-feeds"],
    protocolStepId: "structural-oral",
    related: ["tongue-tie"],
  },
];

const causeById = new Map(CAUSES.map((cause) => [cause.id, cause]));
const protocolById = new Map(PROTOCOL_STEPS.map((step) => [step.id, step]));

export function getCause(id) {
  return causeById.get(id);
}

export function getProtocolStep(id) {
  return protocolById.get(id);
}

export function protocolForCause(causeId) {
  const cause = getCause(causeId);
  return cause ? getProtocolStep(cause.protocolStepId) : null;
}

export function protocolPosition(step) {
  if (!step) return "Playbook";
  if (step.track === "parallel") return `Step ${step.number} · Parallel support`;
  if (step.track === "ongoing") return `Step ${step.number} · Ongoing support`;
  return `Step ${step.number} of 4 core steps`;
}

export function reviewDate(startedAt, reviewAfterDays) {
  const date = new Date(`${startedAt}T12:00:00`);
  date.setDate(date.getDate() + reviewAfterDays);
  return date.toISOString().slice(0, 10);
}
