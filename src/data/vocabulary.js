/**
 * Observation vocabulary — the shared language of the app.
 * Navigator chips, onboarding symptoms, and assessment evidence all reference
 * observations by `id`.
 *
 * `match` terms are used to extract observations from natural speech/text.
 * `redFlag` observations trigger an immediate clinician message. Some also
 * deterministically inform ranking when they map to a supported cause.
 *
 * Ids are stable identifiers: they persist in saved histories, so rename
 * labels freely but never reuse or change an id.
 */

export const CATEGORIES = [
  "Food",
  "Feeding",
  "Stool",
  "Sleep",
  "Symptoms",
  "Skin",
  "Body & Behavior",
  "Environment",
  "Interventions",
  "Fussiness",
];

export const OBSERVATIONS = [
  // ── Food (what baby — or a breastfeeding parent — took in) ──
  { id: "dairy", label: "Dairy", category: "Food", match: ["dairy", "milk", "cheese", "yogurt", "ice cream", "butter", "cream"] },
  { id: "soy", label: "Soy", category: "Food", match: ["soy", "tofu", "edamame"] },
  { id: "egg", label: "Egg", category: "Food", match: ["egg", "eggs"] },
  { id: "wheat-gluten", label: "Wheat / gluten", category: "Food", match: ["wheat", "gluten", "bread", "pasta"] },
  { id: "peanut", label: "Peanut", category: "Food", match: ["peanut", "peanut butter"] },
  { id: "tree-nuts", label: "Tree nuts", category: "Food", match: ["almond", "cashew", "walnut", "pecan", "tree nut", "pistachio"] },
  { id: "fish-shellfish", label: "Fish / shellfish", category: "Food", match: ["fish", "salmon", "tuna", "shrimp", "shellfish", "crab", "lobster"] },
  { id: "corn", label: "Corn", category: "Food", match: ["corn"] },
  { id: "chocolate", label: "Chocolate", category: "Food", match: ["chocolate", "cocoa"] },
  { id: "citrus-acidic", label: "Citrus / acidic foods", category: "Food", match: ["citrus", "orange", "lemon", "grapefruit", "tomato", "acidic"] },
  { id: "gassy-vegetables", label: "Gassy vegetables", category: "Food", match: ["broccoli", "cabbage", "cauliflower", "onion", "garlic", "brussels"] },
  { id: "legumes", label: "Beans / legumes", category: "Food", match: ["beans", "lentils", "legumes", "chickpea", "hummus"] },
  { id: "spicy-food", label: "Spicy food", category: "Food", match: ["spicy", "hot sauce", "chili"] },
  { id: "caffeine", label: "Caffeine", category: "Food", match: ["caffeine", "coffee", "energy drink", "black tea"] },
  { id: "alcohol", label: "Alcohol", category: "Food", match: ["alcohol", "wine", "beer", "cocktail"] },
  { id: "formula-change", label: "Formula change", category: "Food", match: ["formula change", "switched formula", "new formula", "changed formula"] },
  { id: "hypoallergenic-formula", label: "Hypoallergenic formula", category: "Food", match: ["hypoallergenic", "hydrolyzed", "nutramigen", "alimentum"] },
  { id: "new-food", label: "New food introduced", category: "Food", match: ["new food", "first time eating", "introduced", "started solids"] },

  // ── Feeding ──
  { id: "arching-during-feed", label: "Arching during feed", category: "Feeding", match: ["arching", "arched", "arches", "back arch"] },
  { id: "pulling-off", label: "Pulling off", category: "Feeding", match: ["pulling off", "pulled off", "pulls off", "popping off", "popped off"] },
  { id: "clicking", label: "Clicking", category: "Feeding", match: ["clicking", "clicks", "click sound", "clicky", "smacking"] },
  { id: "bottle-refusal", label: "Bottle refusal", category: "Feeding", match: ["refused the bottle", "bottle refusal", "refusing bottle", "won't take the bottle", "wouldn't take the bottle"] },
  { id: "breast-refusal", label: "Nursing strike / breast refusal", category: "Feeding", match: ["nursing strike", "refused the breast", "refusing to nurse", "won't nurse", "wouldn't nurse"] },
  { id: "gulping", label: "Gulping / coughing at letdown", category: "Feeding", match: ["gulping", "gulped", "choking", "coughing during feed", "sputtering"] },
  { id: "short-feeds", label: "Short feeds", category: "Feeding", match: ["short feed", "quick feed", "barely ate"] },
  { id: "frequent-feeds", label: "Feeding very frequently", category: "Feeding", match: ["cluster feeding", "constant feeding", "feeding all day", "frequent feeds"] },
  { id: "milk-leaking", label: "Milk leaking from mouth", category: "Feeding", match: ["milk leaking", "dribbling milk", "milk spills", "leaks milk"] },
  { id: "falling-asleep-feeds", label: "Falling asleep at feeds", category: "Feeding", match: ["falls asleep eating", "fell asleep feeding", "sleepy at the breast", "sleepy during feeds"] },
  { id: "distracted-feeding", label: "Distracted feeding", category: "Feeding", match: ["distracted", "looking around while eating", "won't focus on feeding"] },
  { id: "side-preference", label: "Prefers one side", category: "Feeding", match: ["prefers one side", "only nurses on one side", "refuses one side", "one breast"] },
  { id: "latch-pain", label: "Painful latch (parent)", category: "Feeding", match: ["painful latch", "nipple pain", "hurts to nurse", "lipstick nipple", "sore nipples"] },

  // ── Stool ──
  { id: "green-stool", label: "Green stool", category: "Stool", match: ["green stool", "green poop", "green diaper"] },
  { id: "mucus-stool", label: "Mucus in stool", category: "Stool", match: ["mucus", "mucousy", "stringy stool", "slimy stool"] },
  { id: "explosive-stool", label: "Explosive stool", category: "Stool", match: ["explosive", "blowout", "blow out"] },
  { id: "blood-stool", label: "Blood-streaked stool", category: "Stool", redFlag: true, match: ["blood", "bloody stool", "red streaks"] },
  { id: "watery-stool", label: "Watery stool", category: "Stool", match: ["watery stool", "runny poop", "liquid stool"] },
  { id: "foamy-stool", label: "Foamy / frothy stool", category: "Stool", match: ["foamy", "frothy", "bubbly stool"] },
  { id: "foul-stool", label: "Unusually foul-smelling stool", category: "Stool", match: ["foul smelling", "smells awful", "really smelly poop"] },
  { id: "pale-stool", label: "Pale / white stool", category: "Stool", redFlag: true, match: ["pale stool", "white stool", "clay colored", "chalky stool"] },
  { id: "black-stool", label: "Black / tarry stool", category: "Stool", redFlag: true, match: ["black stool", "black poop", "tarry stool", "tarry poop"] },
  { id: "constipation", label: "Constipation", category: "Stool", match: ["constipated", "constipation", "no poop", "hasn't pooped", "days without pooping"] },
  { id: "straining", label: "Straining to pass stool", category: "Stool", match: ["straining", "strains", "grunting to poop", "struggling to poop"] },

  // ── Sleep ──
  { id: "short-nap", label: "Short nap", category: "Sleep", match: ["short nap", "short naps", "catnap", "cat nap", "barely napped", "45 minute nap"] },
  { id: "night-waking", label: "Frequent night waking", category: "Sleep", match: ["woke up a lot", "night waking", "up all night", "waking frequently"] },
  { id: "trouble-settling", label: "Trouble settling", category: "Sleep", match: ["trouble settling", "hard to settle", "fighting sleep", "wouldn't settle", "won't settle"] },
  { id: "contact-naps", label: "Only naps when held", category: "Sleep", match: ["contact nap", "only sleeps on me", "won't nap in the crib", "naps in arms"] },
  { id: "sleeps-upright-only", label: "Only settles upright", category: "Sleep", match: ["only sleeps upright", "in the carrier", "hates lying flat", "won't lie flat", "in the car seat"] },
  { id: "long-nap", label: "Long restful nap", category: "Sleep", match: ["long nap", "great nap", "slept well"] },

  // ── Symptoms ──
  { id: "spit-up", label: "Spit up", category: "Symptoms", match: ["spit up", "spitup", "spat up", "spitting up"] },
  { id: "projectile-vomit", label: "Projectile vomiting", category: "Symptoms", redFlag: true, match: ["projectile", "forceful vomit", "vomited across"] },
  { id: "bilious-vomit", label: "Green / yellow-green vomit", category: "Symptoms", redFlag: true, match: ["green vomit", "green throw up", "yellow green vomit", "bilious vomit", "vomited bile"] },
  { id: "blood-vomit", label: "Blood in vomit", category: "Symptoms", redFlag: true, match: ["blood in vomit", "bloody vomit", "vomited blood"] },
  { id: "gas", label: "Gas", category: "Symptoms", match: ["gas", "gassy", "passing gas", "farting"] },
  { id: "hiccups", label: "Frequent hiccups", category: "Symptoms", match: ["hiccups", "hiccuping"] },
  { id: "wet-burps", label: "Wet burps", category: "Symptoms", match: ["wet burp", "wet burps", "burps up milk"] },
  { id: "congestion", label: "Congestion", category: "Symptoms", match: ["congested", "congestion", "stuffy nose"] },
  { id: "noisy-breathing", label: "Noisy breathing", category: "Symptoms", match: ["noisy breathing", "squeaky breathing", "wheezing", "stridor"] },
  { id: "breathing-trouble", label: "Trouble breathing", category: "Symptoms", redFlag: true, match: ["trouble breathing", "can't breathe", "struggling to breathe", "turned blue", "blue lips"] },
  { id: "swallowing-sounds", label: "Swallowing / gagging sounds", category: "Symptoms", match: ["gagging", "swallowing hard", "throat sounds", "gurgling"] },
  { id: "ear-pulling", label: "Ear pulling / rubbing", category: "Symptoms", match: ["pulling ears", "ear pulling", "rubbing ears", "grabbing ears"] },
  { id: "white-tongue", label: "White coating on tongue", category: "Symptoms", match: ["white tongue", "white coating", "thrush"] },
  { id: "fever", label: "Fever", category: "Symptoms", redFlag: true, match: ["fever", "temperature", "feverish", "hot to the touch"] },
  { id: "fewer-wet-diapers", label: "Fewer wet diapers", category: "Symptoms", redFlag: true, match: ["fewer wet diapers", "dry diapers", "not peeing much", "less pee"] },
  { id: "lethargy", label: "Unusually sleepy / hard to wake", category: "Symptoms", redFlag: true, match: ["lethargic", "hard to wake", "unusually sleepy", "floppy", "no energy"] },

  // ── Skin ──
  { id: "rash", label: "Rash", category: "Skin", match: ["rash"] },
  { id: "hives", label: "Hives", category: "Skin", redFlag: true, match: ["hives", "welts"] },
  { id: "facial-swelling", label: "Face / lip swelling", category: "Skin", redFlag: true, match: ["face swelling", "facial swelling", "swollen lips", "lip swelling", "swollen tongue"] },
  { id: "eczema", label: "Eczema flare", category: "Skin", match: ["eczema", "dry patches"] },
  { id: "facial-rash-feeds", label: "Rash around mouth after feeds", category: "Skin", match: ["rash around mouth", "red around the mouth", "face rash after feeding"] },
  { id: "red-ring", label: "Red ring around anus", category: "Skin", match: ["red ring", "red around the anus", "red bottom ring"] },
  { id: "diaper-rash", label: "Diaper rash", category: "Skin", match: ["diaper rash", "nappy rash", "red bottom"] },
  { id: "dry-skin", label: "Dry skin", category: "Skin", match: ["dry skin", "flaky skin", "peeling skin"] },
  { id: "cradle-cap", label: "Cradle cap", category: "Skin", match: ["cradle cap", "scaly scalp", "flaky scalp"] },

  // ── Body & Behavior ──
  { id: "knees-to-chest", label: "Pulling knees to chest", category: "Body & Behavior", match: ["knees to chest", "pulling legs up", "legs up", "squirming"] },
  { id: "body-tension", label: "Stiff / tense body", category: "Body & Behavior", match: ["stiff", "tense", "rigid", "whole body tight"] },
  { id: "swollen-belly", label: "Swollen / distended belly", category: "Body & Behavior", redFlag: true, match: ["swollen belly", "distended belly", "bloated hard belly", "hard swollen stomach"] },
  { id: "fist-clenching", label: "Fist clenching", category: "Body & Behavior", match: ["clenched fists", "fist clenching", "tight fists"] },
  { id: "red-face-grunting", label: "Red face, straining and grunting", category: "Body & Behavior", match: ["red face", "grunting", "bearing down", "turning red"] },
  { id: "head-side-preference", label: "Turns head to one side", category: "Body & Behavior", match: ["head to one side", "always looks one way", "favors one side", "tilted head"] },
  { id: "gum-rubbing", label: "Chewing hands / rubbing gums", category: "Body & Behavior", match: ["chewing hands", "chewing fists", "rubbing gums", "gumming", "everything in the mouth"] },
  { id: "heavy-drooling", label: "Heavy drooling", category: "Body & Behavior", match: ["drooling", "drool", "soaked bibs"] },

  // ── Environment ──
  { id: "high-stimulation", label: "High stimulation", category: "Environment", match: ["high stimulation", "overstimulated", "busy day", "lots of visitors", "loud"] },
  { id: "new-place", label: "New place", category: "Environment", match: ["new place", "travel", "traveling", "out all day"] },
  { id: "daycare-caregiver", label: "Daycare / new caregiver", category: "Environment", match: ["daycare", "day care", "new caregiver", "babysitter", "nanny"] },
  { id: "vaccination-day", label: "Vaccination day", category: "Environment", match: ["vaccine", "vaccination", "shots", "immunization"] },
  { id: "calm-day", label: "Calm, quiet day", category: "Environment", match: ["calm day", "quiet day", "stayed home"] },

  // ── Interventions ──
  { id: "extra-burping", label: "Extra burping", category: "Interventions", match: ["burping", "burped more", "extra burps"] },
  { id: "paced-feeding", label: "Paced bottle feeding", category: "Interventions", match: ["paced feeding", "paced bottle"] },
  { id: "upright-after-feed", label: "Upright after feeds", category: "Interventions", match: ["upright", "held up after", "kept vertical"] },
  { id: "slow-flow-nipple", label: "Slower-flow nipple", category: "Interventions", match: ["slow flow", "slower nipple", "changed nipple", "preemie nipple"] },
  { id: "position-change", label: "New feeding position", category: "Interventions", match: ["new position", "laid back nursing", "side lying", "football hold", "changed position"] },
  { id: "gas-drops", label: "Gas drops (simethicone)", category: "Interventions", match: ["gas drops", "simethicone", "mylicon"] },
  { id: "gripe-water", label: "Gripe water", category: "Interventions", match: ["gripe water"] },
  { id: "probiotic", label: "Probiotic", category: "Interventions", match: ["probiotic", "probiotics"] },
  { id: "elimination-diet", label: "Elimination diet", category: "Interventions", match: ["elimination diet", "cut dairy", "cut out dairy", "dairy free", "eliminated"] },
  { id: "bicycle-legs", label: "Bicycle legs / tummy massage", category: "Interventions", match: ["bicycle legs", "tummy massage", "belly massage"] },
  { id: "swaddling", label: "Swaddling", category: "Interventions", match: ["swaddle", "swaddled", "swaddling"] },
  { id: "white-noise", label: "White noise", category: "Interventions", match: ["white noise", "sound machine"] },
  { id: "pacifier", label: "Pacifier", category: "Interventions", match: ["pacifier", "paci", "dummy", "binky"] },
  { id: "reflux-med", label: "Reflux medication (prescribed)", category: "Interventions", match: ["reflux medication", "famotidine", "pepcid", "omeprazole"] },
  { id: "antibiotics", label: "Antibiotics (baby)", category: "Interventions", match: ["antibiotics", "amoxicillin"] },
  { id: "vitamin-drops", label: "Vitamin / iron drops", category: "Interventions", match: ["vitamin d", "vitamin drops", "iron drops", "iron supplement"] },

  // ── Fussiness ──
  { id: "fussy-during-feeds", label: "Fussiness during feeds", category: "Fussiness", match: ["fussy during feed", "fussy while eating", "crying at the breast", "fighting the bottle"] },
  { id: "fussy-after-feeds", label: "Fussiness after feeds", category: "Fussiness", match: ["fussy after feed", "fussy after eating", "cried after feed", "upset after feed"] },
  { id: "evening-fussiness", label: "Evening fussiness", category: "Fussiness", match: ["evening fussiness", "witching hour", "fussy in the evening", "fussy at night"] },
  { id: "inconsolable", label: "Inconsolable crying", category: "Fussiness", match: ["inconsolable", "couldn't calm", "screaming", "crying for hours"] },
  { id: "extended-crying", label: "Extended crying (hours)", category: "Fussiness", match: ["cried for hours", "hours of crying", "crying all afternoon", "colic"] },
  { id: "high-pitched-cry", label: "High-pitched cry", category: "Fussiness", redFlag: true, match: ["high pitched cry", "high-pitched", "shrieking cry", "piercing cry"] },
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

export function isRedFlag(id) {
  return Boolean(byId.get(id)?.redFlag);
}

/** Red-flag observation ids present in a list of log entries. */
export function redFlagsIn(entries) {
  return entries.filter((e) => isRedFlag(e));
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
