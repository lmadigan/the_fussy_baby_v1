/**
 * Observation vocabulary — the shared language of the app.
 * Detective chips, onboarding symptoms, the Pattern Engine, and the
 * Symptom Matrix all reference observations by `id`.
 *
 * `match` terms are used to extract observations from natural speech/text.
 */

export const CATEGORIES = [
  "Food",
  "Feeding",
  "Stool",
  "Sleep",
  "Symptoms",
  "Environment",
  "Interventions",
  "Fussiness",
];

export const OBSERVATIONS = [
  // Food (what baby — or a breastfeeding parent — took in)
  { id: "dairy", label: "Dairy", category: "Food", match: ["dairy", "milk", "cheese", "yogurt", "ice cream"] },
  { id: "soy", label: "Soy", category: "Food", match: ["soy"] },
  { id: "egg", label: "Egg", category: "Food", match: ["egg", "eggs"] },
  { id: "caffeine", label: "Caffeine", category: "Food", match: ["caffeine", "coffee"] },
  { id: "formula-change", label: "Formula change", category: "Food", match: ["formula"] },
  { id: "new-food", label: "New food introduced", category: "Food", match: ["new food", "first time eating", "introduced"] },

  // Feeding
  { id: "arching-during-feed", label: "Arching during feed", category: "Feeding", match: ["arching", "arched", "arches", "back arch"] },
  { id: "pulling-off", label: "Pulling off", category: "Feeding", match: ["pulling off", "pulled off", "pulls off", "popping off"] },
  { id: "clicking", label: "Clicking", category: "Feeding", match: ["clicking", "clicks", "click sound"] },
  { id: "bottle-refusal", label: "Bottle refusal", category: "Feeding", match: ["refused the bottle", "bottle refusal", "refusing bottle", "won't take the bottle"] },
  { id: "gulping", label: "Gulping / coughing at letdown", category: "Feeding", match: ["gulping", "gulped", "choking", "coughing during feed", "sputtering"] },
  { id: "short-feeds", label: "Short feeds", category: "Feeding", match: ["short feed", "quick feed", "barely ate"] },
  { id: "frequent-feeds", label: "Feeding very frequently", category: "Feeding", match: ["cluster feeding", "constant feeding", "feeding all day", "frequent feeds"] },
  { id: "milk-leaking", label: "Milk leaking from mouth", category: "Feeding", match: ["milk leaking", "dribbling milk", "milk spills"] },

  // Stool
  { id: "green-stool", label: "Green stool", category: "Stool", match: ["green stool", "green poop", "green diaper"] },
  { id: "mucus-stool", label: "Mucus in stool", category: "Stool", match: ["mucus", "mucousy", "stringy stool"] },
  { id: "explosive-stool", label: "Explosive stool", category: "Stool", match: ["explosive", "blowout", "blow out"] },
  { id: "blood-stool", label: "Blood-streaked stool", category: "Stool", match: ["blood", "bloody stool", "red streaks"] },
  { id: "watery-stool", label: "Watery stool", category: "Stool", match: ["watery stool", "runny poop", "liquid stool"] },
  { id: "constipation", label: "Constipation", category: "Stool", match: ["constipated", "constipation", "no poop", "hasn't pooped"] },

  // Sleep
  { id: "short-nap", label: "Short nap", category: "Sleep", match: ["short nap", "short naps", "catnap", "cat nap", "barely napped", "45 minute nap"] },
  { id: "night-waking", label: "Frequent night waking", category: "Sleep", match: ["woke up a lot", "night waking", "up all night", "waking frequently"] },
  { id: "trouble-settling", label: "Trouble settling", category: "Sleep", match: ["trouble settling", "hard to settle", "fighting sleep", "wouldn't settle", "won't settle"] },
  { id: "long-nap", label: "Long restful nap", category: "Sleep", match: ["long nap", "great nap", "slept well"] },

  // Symptoms
  { id: "spit-up", label: "Spit up", category: "Symptoms", match: ["spit up", "spitup", "spat up", "spitting up"] },
  { id: "gas", label: "Gas", category: "Symptoms", match: ["gas", "gassy", "passing gas", "farting"] },
  { id: "hiccups", label: "Frequent hiccups", category: "Symptoms", match: ["hiccups", "hiccuping"] },
  { id: "congestion", label: "Congestion", category: "Symptoms", match: ["congested", "congestion", "stuffy nose"] },
  { id: "rash", label: "Rash", category: "Symptoms", match: ["rash", "hives"] },
  { id: "eczema", label: "Eczema flare", category: "Symptoms", match: ["eczema", "dry patches"] },
  { id: "swallowing-sounds", label: "Swallowing / gagging sounds", category: "Symptoms", match: ["gagging", "swallowing hard", "throat sounds", "gurgling"] },
  { id: "knees-to-chest", label: "Pulling knees to chest", category: "Symptoms", match: ["knees to chest", "pulling legs up", "legs up", "squirming"] },

  // Environment
  { id: "high-stimulation", label: "High stimulation", category: "Environment", match: ["high stimulation", "overstimulated", "busy day", "lots of visitors", "loud"] },
  { id: "new-place", label: "New place", category: "Environment", match: ["new place", "travel", "traveling", "out all day"] },
  { id: "calm-day", label: "Calm, quiet day", category: "Environment", match: ["calm day", "quiet day", "stayed home"] },

  // Interventions
  { id: "extra-burping", label: "Extra burping", category: "Interventions", match: ["burping", "burped more", "extra burps"] },
  { id: "paced-feeding", label: "Paced bottle feeding", category: "Interventions", match: ["paced feeding", "paced bottle"] },
  { id: "upright-after-feed", label: "Upright after feeds", category: "Interventions", match: ["upright", "held up after", "kept vertical"] },
  { id: "probiotic", label: "Probiotic", category: "Interventions", match: ["probiotic", "probiotics"] },
  { id: "elimination-diet", label: "Elimination diet", category: "Interventions", match: ["elimination diet", "cut dairy", "cut out dairy", "dairy free"] },
  { id: "bicycle-legs", label: "Bicycle legs / tummy massage", category: "Interventions", match: ["bicycle legs", "tummy massage", "belly massage"] },

  // Fussiness
  { id: "fussy-after-feeds", label: "Fussiness after feeds", category: "Fussiness", match: ["fussy after feed", "fussy after eating", "cried after feed", "upset after feed"] },
  { id: "evening-fussiness", label: "Evening fussiness", category: "Fussiness", match: ["evening fussiness", "witching hour", "fussy in the evening", "fussy at night"] },
  { id: "inconsolable", label: "Inconsolable crying", category: "Fussiness", match: ["inconsolable", "couldn't calm", "screaming", "crying for hours"] },
  { id: "content-day", label: "Generally content", category: "Fussiness", match: ["content", "happy day", "good day", "calm baby"] },
];

/** Symptoms offered during onboarding — "What have you been noticing?" */
export const ONBOARDING_SYMPTOM_IDS = [
  "arching-during-feed",
  "spit-up",
  "green-stool",
  "mucus-stool",
  "explosive-stool",
  "gas",
  "clicking",
  "pulling-off",
  "short-nap",
  "bottle-refusal",
];

const byId = new Map(OBSERVATIONS.map((o) => [o.id, o]));

export function getObservation(id) {
  return byId.get(id);
}

export function observationsInCategory(category) {
  return OBSERVATIONS.filter((o) => o.category === category);
}

/** Extract known observations from free text (voice transcript or typed note). */
export function extractObservations(text) {
  const lower = ` ${text.toLowerCase()} `;
  const found = [];
  for (const obs of OBSERVATIONS) {
    if (obs.match.some((term) => lower.includes(term))) found.push(obs.id);
  }
  return found;
}
