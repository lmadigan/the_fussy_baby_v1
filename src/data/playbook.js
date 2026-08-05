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
    title: "Check Feeding Function & Body Alignment",
    short: "Start with a full feed and look at comfort, milk transfer, flow, and symmetry. A tongue tie is a functional feeding question, not something the app can identify by appearance.",
    reviewAfterDays: 7,
    reviewWindow: "Review in 7 days, or sooner if intake or wet diapers decrease",
    checklist: [
      "Watch one complete feed and note clicking, leaking, coughing, fatigue, latch pain, and whether baby seems satisfied afterward.",
      "Check for a persistent side preference, head tilt, or difficulty feeding in one position.",
      "For bottles, confirm that the nipple flow is not faster than baby can comfortably manage and try paced feeding.",
      "For nursing, try a well-supported position and note whether pain or milk transfer improves.",
      "If concerns persist, ask a pediatrician plus an IBCLC or feeding-qualified clinician to observe a feed and review growth and milk transfer.",
      "Do not pursue a procedure, post-procedure stretches, or bodywork based on appearance or this checklist alone.",
    ],
    reviewQuestion: "After addressing feeding mechanics, is feeding more comfortable and is fussiness improving?",
    contactSooner: [
      "Baby is hard to wake, has fewer wet diapers, repeatedly coughs or chokes during feeds, or is taking much less milk.",
      "Weight gain, breathing, or persistent head and neck asymmetry is a concern.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the feeding changes that helped. If a clinician identified a functional issue, complete their follow-up rather than assuming a specific diagnosis from improvement alone.",
      somewhat_better: "Feeding mechanics may be one contributor. Keep the helpful adjustment and move to Step 2 to check flow and feeding dynamics.",
      unchanged: "A tongue tie or structural explanation is less convincing without a functional finding. Move to Step 2 or arrange a feeding assessment if milk transfer or growth still concerns you.",
      worse: "Stop the new adjustment and contact a pediatrician or feeding professional, especially if intake, wet diapers, breathing, or alertness changed.",
    },
    sources: [
      { label: "AAP: Tongue tie and breastfeeding", url: "https://www.healthychildren.org/English/ages-stages/baby/breastfeeding/Pages/tongue-tie-in-babies-how-ankyloglossia-affects-breastfeeding.aspx" },
    ],
    relatedCauseIds: ["tongue-tie", "structural-tension"],
  },
  {
    id: "feeding-dynamics",
    number: 2,
    track: "core",
    timing: "Next quick check",
    title: "Check Flow, Supply & Feeding Volume",
    short: "Fast flow, oversupply, bottle flow, and feeding volume can all create gulping, air intake, and reflux-like discomfort.",
    reviewAfterDays: 7,
    reviewWindow: "Try one feeding adjustment consistently for 3–7 days",
    checklist: [
      "Watch the first few minutes of a feed for coughing, gulping, pulling off, leaking, or distress.",
      "For nursing, try a laid-back position so baby can manage a fast letdown more easily.",
      "For bottles, use paced feeding and a nipple flow baby can manage without coughing or spilling milk.",
      "Review feed volume and frequency with a pediatrician or feeding professional if overfeeding may be adding discomfort.",
      "Change one thing at a time and note whether feeds become calmer across several days.",
      "Do not use block feeding or intentionally reduce milk supply without IBCLC or clinician guidance.",
    ],
    reviewQuestion: "After making the recommended feeding adjustment, are feeds calmer and is post-feed discomfort improving?",
    contactSooner: [
      "Baby repeatedly coughs, chokes, turns blue, struggles to breathe, or takes substantially less milk.",
      "Wet diapers decrease or weight gain is a concern.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the single feeding adjustment that helped. You may not need to change supply or formula if feeds and comfort remain improved.",
      somewhat_better: "Flow or volume may explain part of the pattern. Keep the helpful change and continue to Step 3 if stool, skin, or persistent reflux-like symptoms remain.",
      unchanged: "Fast flow or feeding volume is less likely to explain the full picture. Return to the original symptoms and continue to Step 3 when its symptom cluster fits.",
      worse: "Undo the new feeding change and contact a feeding professional if coughing, intake, wet diapers, or feeding distress worsened.",
    },
    sources: [
      { label: "ABM: Hyperlactation protocol", url: "https://www.bfmed.org/assets/32%20Management%20of%20Hyperlactation.pdf" },
      { label: "NASPGHAN: Infant reflux feeding measures", url: "https://naspghan.org/wp-content/uploads/2024/01/PedGERD-Summary-revised-January-2024.pdf" },
    ],
    relatedCauseIds: ["forceful-letdown"],
  },
  {
    id: "food-protein",
    number: 3,
    track: "core",
    timing: "Defined review period",
    title: "Investigate Food Protein Sensitivity",
    short: "When the stool, skin, feeding, and reflux-like cluster fits, use one defined three-protein trial and a planned reintroduction to learn what is truly contributing.",
    approachNote: "The Fussy Baby starts breastfeeding parents with cow's milk, soy, and egg together. This is broader than many clinical pathways, which begin with cow's milk alone, but it creates a fuller first test when the symptom cluster is strong.",
    reviewAfterDays: 14,
    reviewWindow: "First review at 2 weeks; complete the defined trial for up to 4 weeks",
    checklist: [
      "Contact a healthcare professional promptly for blood-streaked stool and review growth, feeding, skin, and stool symptoms together.",
      "Choose the specific symptoms you will judge at the end: for example visible blood or mucus, eczema, feeding pain, vomiting, or fussiness after feeds.",
      "If baby is breastfed, begin a 2–4 week trial without cow's milk protein, soy, and egg, ideally with pediatrician or dietitian support.",
      "If you have repeatedly noticed fussiness or another target symptom after a specific food, discuss adding that food to the defined trial. Do not add foods based on a single difficult day.",
      "If baby uses formula, ask the pediatrician whether a 2–4 week extensively hydrolyzed formula trial fits; amino-acid formula is generally reserved for severe or unresolved cases.",
      "Record the start date, check labels carefully, and avoid unrelated diet, formula, medication, or supplement changes during the trial.",
      "At 2 weeks, review the original symptoms. If partly improved, follow the agreed plan up to 4 weeks before interpreting it.",
      "Reintroduce cow's milk, soy, egg, and any parent-observed food one at a time using the clinician-agreed plan. Improvement during elimination alone does not identify the trigger.",
      "For a prolonged breastfeeding-parent elimination, ask about dietitian support and calcium and vitamin D needs.",
    ],
    reviewQuestion: "After the agreed review period, are the original stool, skin, feeding, and fussiness symptoms clearly better?",
    contactSooner: [
      "Blood increases, stool turns black, baby is pale or lethargic, vomiting is forceful or green, or feeding and wet diapers decrease.",
      "Hives, facial swelling, breathing trouble, or a rapid reaction occurs; do not attempt a home reintroduction after an immediate reaction.",
    ],
    outcomeGuidance: {
      clearly_better: "The response supports food protein sensitivity. Reintroduce cow's milk, soy, and egg one at a time so you can identify the trigger instead of keeping all three out unnecessarily.",
      somewhat_better: "Continue only to the agreed 2–4 week endpoint. Review consistency and any repeatedly observed food trigger before adding another restriction, because another contributor may also be involved.",
      unchanged: "This food-protein combination is less likely to explain the full pattern after a consistent 2–4 week trial. Reintroduce foods one at a time as planned and investigate the next contributor rather than broadening the diet.",
      worse: "Contact the clinician and reassess. Worsening is not a reason to remove more foods without reviewing other causes and the baby's growth and hydration.",
    },
    sources: [
      { label: "ESPGHAN: Cow's milk allergy position paper", url: "https://www.espghan.org/knowledge-center/publications/Gastroenterology/2024-Diagnois-and-Management-of-Cows-Milk-Alergy" },
      { label: "Academy of Breastfeeding Medicine: Allergic proctocolitis", url: "https://www.bfmed.org/assets/DOCUMENTS/PROTOCOLS/24-allergic-proctocolitis-protocol-english.pdf" },
      { label: "EAACI: Food proteins in breast milk", url: "https://eaaci.org/guidelines-position-papers/diagnosis-and-management-of-non-ige-gastrointestinal-allergies-in-breastfed-infants-an-eaaci-position-paper/" },
    ],
    relatedCauseIds: ["food-protein-sensitivity"],
  },
  {
    id: "reflux",
    number: 4,
    track: "core",
    timing: "If symptoms persist",
    title: "Investigate Reflux-Related Discomfort",
    short: "Spit-up is common; the useful question is whether reflux is paired with feeding pain, poor intake, poor growth, or persistent distress.",
    reviewAfterDays: 14,
    reviewWindow: "Review after 2 weeks of consistent feeding measures",
    checklist: [
      "Identify the dominant symptoms and whether they happen during feeds, immediately after, or much later.",
      "Review feeding volume, frequency, flow, and technique; avoid overfeeding and use clinician-guided changes.",
      "Keep baby upright while awake after feeds when practical, with the airway visible and supported.",
      "For every sleep, place baby on their back on a firm, flat, non-inclined surface; do not use wedges or positioners.",
      "Do not thicken feeds, change formula, or start acid-suppressing medicine unless the pediatrician recommends it for a defined reason.",
      "If feeding pain, refusal, poor growth, or distress persists, ask the pediatrician to distinguish normal reflux from GERD and other overlapping causes.",
      "Follow one agreed plan for 2 weeks before judging it unless symptoms worsen.",
    ],
    reviewQuestion: "After following the agreed reflux plan, are feeding comfort, settling, or sleep-related symptoms improving?",
    contactSooner: [
      "Vomiting is projectile, green or yellow-green, bloody, or paired with a swollen belly.",
      "Baby cannot feed, has fewer wet diapers, is hard to wake, has fever, or is not gaining weight.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the safe feeding measures that helped. Improvement supports reflux-related discomfort but does not show that acid medicine is needed.",
      somewhat_better: "Reflux may be one contributor. Keep the useful measures and review feeding mechanics or food-protein symptoms that remain.",
      unchanged: "Simple reflux measures did not explain the pattern. Ask the pediatrician to reassess before escalating to thickeners, formula changes, or medication.",
      worse: "Stop any new nonessential change and contact the pediatrician, especially for forceful or green vomit, poor intake, fewer wet diapers, or lethargy.",
    },
    sources: [
      { label: "NASPGHAN: Pediatric reflux guidance", url: "https://naspghan.org/wp-content/uploads/2024/01/PedGERD-Summary-revised-January-2024.pdf" },
      { label: "NICE: Reflux red flags", url: "https://www.nice.org.uk/guidance/ng1/ifp/chapter/reflux-in-babies" },
    ],
    relatedCauseIds: ["silent-reflux"],
  },
  {
    id: "microbiome-support",
    number: 5,
    track: "parallel",
    timing: "Supportive step",
    title: "Support Digestive Development",
    short: "Gas, grunting, and straining can reflect normal early coordination. Support comfort without turning nonspecific symptoms into a microbiome diagnosis.",
    reviewAfterDays: 7,
    reviewWindow: "Review after 7 days; stop sooner if concerning symptoms appear",
    checklist: [
      "Confirm that stool is soft and that baby is feeding, growing, and producing their usual wet diapers.",
      "Try one low-risk comfort measure at a time while baby is awake, such as gentle bicycle legs, tummy massage, or a warm bath.",
      "Avoid repeated rectal stimulation and do not treat straining with soft stool as constipation.",
      "Do not start gripe water, herbal products, or multiple supplements as a diagnostic test.",
      "If considering a probiotic, ask the pediatrician about the exact strain and whether evidence fits this baby's feeding context; probiotic effects are strain-specific.",
      "Share antibiotic, birth, feeding, stool, and growth history with the clinician if symptoms persist.",
    ],
    reviewQuestion: "After the planned support period, are digestive comfort and overall fussiness improving?",
    contactSooner: [
      "The belly is swollen, stool is bloody, black, pale, or hard, vomiting is green or forceful, or baby has fever.",
      "Baby feeds poorly, has fewer wet diapers, is hard to wake, or is not gaining weight.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the simple comfort measure that helped. This supports a developmental or comfort explanation, not a specific microbiome diagnosis.",
      somewhat_better: "Keep the helpful comfort measure while continuing the core protocol for any stronger feeding, stool, or skin pattern.",
      unchanged: "Stop adding digestive products. Reassess the symptom pattern and move to the contributor with more specific evidence.",
      worse: "Stop the new product or measure and contact the pediatrician about worsening pain, stool, vomiting, feeding, or hydration.",
    },
    sources: [
      { label: "ESPGHAN: Probiotics are strain-specific", url: "https://www.espghan.org/dam/jcr%3A299e3330-b1b6-4940-aa72-786501bffff1/2023_Probiotics%20for%20the%20Management%20of%20Pediatric%20Gastrointestinal%20Disorders%3A%20Position%20Paper%20of%20the%20ESPGHAN%20Special%20Interest%20Group%20on%20Gut%20Microbiota%20and%20Modifications.pdf" },
    ],
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
    reviewWindow: "Use consistently for 7 days; take a caregiver break whenever needed",
    checklist: [
      "First check feeding, diaper, temperature, clothing, and fingers and toes for anything wrapped tightly around them.",
      "Reduce stimulation during the hardest part of the day with lower light, fewer transitions, and a quieter environment.",
      "Try one or two calming inputs for about 5 minutes before switching, such as holding, gentle rocking, shushing, or a pacifier.",
      "Use babywearing only with a clear airway and according to the carrier's safety instructions.",
      "Use white noise softly and away from baby, and continue safe sleep practices for every sleep.",
      "If you feel overwhelmed, place baby on their back in an empty crib or other safe sleep space, step away, and call someone for support. Never shake a baby.",
    ],
    reviewQuestion: "Does the consistent calming routine make the hardest periods more manageable?",
    contactSooner: [
      "Crying is suddenly different, high-pitched, truly inconsolable, or paired with fever, breathing trouble, vomiting, poor feeding, lethargy, or injury.",
      "You are worried about your ability to keep baby or yourself safe; place baby in a safe sleep space and get immediate support.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the smallest calming routine that reliably helps. Sensory load may be part of the pattern even if another contributor also exists.",
      somewhat_better: "Keep the calming sequence as support and continue investigating any specific feeding, stool, skin, or growth concern.",
      unchanged: "A sensory explanation is less likely to be the main driver. Return to the specific physical signs and contact the pediatrician if crying remains unusual or severe.",
      worse: "Stop any stimulating technique, use a safe sleep space when you need a break, and contact the pediatrician for worsening or unusual crying.",
    },
    sources: [
      { label: "AAP: Calming a fussy baby safely", url: "https://www.healthychildren.org/english/ages-stages/baby/crying-colic/pages/Calming-A-Fussy-Baby.aspx" },
    ],
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
    whatIsIt: "Small amounts of dietary proteins such as cow's milk, soy, and egg can pass into breast milk. In some babies, the developing gut and immune system react to them. Blood or mucus in stool, eczema, and persistent feeding discomfort make the full cluster more informative than any single sign. Many delayed gut reactions improve during the first year, although the timing varies and a planned reintroduction is still needed.",
    signs: ["green-stool", "mucus-stool", "blood-stool", "eczema", "rash", "hives", "facial-rash-feeds", "diaper-rash", "fussy-after-feeds", "spit-up"],
    protocolStepId: "food-protein",
    related: ["silent-reflux", "microbiome"],
  },
  {
    id: "silent-reflux",
    rank: 2,
    title: "Reflux-Related Discomfort",
    evidenceLabel: "Commonly discussed",
    short: "Reflux can appear as discomfort during or after feeds even when very little milk is visibly spit up.",
    whatIsIt: "Reflux-like discomfort may include arching, wet burps, or feeding distress. These signs overlap with feeding mechanics and food protein sensitivity, and ordinary reflux is common, so feeding comfort and growth matter more than spit-up alone.",
    signs: ["arching-during-feed", "fussy-after-feeds", "wet-burps", "congestion", "sleeps-upright-only", "trouble-settling", "hiccups"],
    protocolStepId: "reflux",
    related: ["food-protein-sensitivity", "tongue-tie"],
  },
  {
    id: "tongue-tie",
    rank: 3,
    title: "Oral Function / Possible Tongue Tie",
    evidenceLabel: "Commonly discussed",
    short: "Feeding function can be affected by oral movement, flow, positioning, or coordination; a tongue tie is only one possibility.",
    whatIsIt: "A functional feeding assessment matters more than appearance alone. Clicking or latch pain does not confirm a tie, and procedures are generally reserved for significant functional problems that persist after feeding support.",
    signs: ["clicking", "milk-leaking", "short-feeds", "frequent-feeds", "latch-pain", "gas", "fussy-after-feeds"],
    protocolStepId: "structural-oral",
    related: ["structural-tension", "forceful-letdown"],
  },
  {
    id: "forceful-letdown",
    rank: 4,
    title: "Fast Flow / Oversupply",
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
    title: "Microbiome Context",
    evidenceLabel: "Limited / developing",
    short: "Antibiotic, birth, and feeding history may add context, but there is no symptom pattern that lets the app diagnose a disrupted microbiome.",
    whatIsIt: "Microbiome research is evolving, gas and crying are non-specific, and probiotic effects are strain-specific. This should usually be a supporting context rather than the strongest explanation.",
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
    title: "Body Asymmetry / Tension",
    evidenceLabel: "Limited evidence",
    short: "Head preference, body tension, or feeding asymmetry may warrant a conventional clinical assessment.",
    whatIsIt: "Some parents notice persistent asymmetry or head preference. The useful first step is evaluation by a pediatrician or appropriately licensed feeding or physical-therapy professional, not an assumption that birth trauma or bodywork explains fussiness.",
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
  if (step.track === "parallel") return `Step ${step.number} · Supportive step`;
  if (step.track === "ongoing") return `Step ${step.number} · Ongoing support`;
  return `Step ${step.number} of 4 core steps`;
}

export function reviewDate(startedAt, reviewAfterDays) {
  const date = new Date(`${startedAt}T12:00:00`);
  date.setDate(date.getDate() + reviewAfterDays);
  return date.toISOString().slice(0, 10);
}
