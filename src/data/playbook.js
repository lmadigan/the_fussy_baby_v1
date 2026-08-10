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
    timing: "Days 1–7",
    title: "Rule Out Structural or Oral Issues",
    short: "Start here when feeding is painful, tiring, or difficult. Positioning and latch can often be improved, while persistent trouble may point to oral function, body alignment, or milk-flow issues that deserve a closer look.",
    reviewAfterDays: 7,
    reviewWindow: "Schedule a feeding assessment as soon as you can. Use the techniques and resources below while you wait.",
    checklistLabel: "Your next steps",
    checklistIntro: "Start with an assessment if one is available to you. The remaining steps help you prepare, try simple adjustments, and find the right follow-up.",
    checklist: [
      "Schedule a feeding assessment with a board-certified lactation consultant (IBCLC) as soon as you can. Ask them to watch a full feed and evaluate positioning, latch, milk transfer, oral movement, comfort, and milk flow.",
      "Before the appointment, note any leaking, coughing, fatigue, latch pain, or whether your baby seems satisfied after feeds. If these issues are intermittent or the appointment is virtual, record a feed to share.",
      "While you wait, try a deeper latch: hold your baby close with their nose level with your nipple, wait for a wide-open mouth, and bring them to the breast chin-first. If the latch stays painful after the first few sucks, gently break the seal and try again.",
      "Listen and look during a feed. Rounded cheeks, audible swallowing, and a comfortable latch are encouraging signs. If clicking, leaking, dimpled cheeks, or flared lips continue, show the IBCLC and ask them to check your baby's seal and oral movement.",
      "If your baby has a persistent head tilt, turns toward one side, or cannot feed comfortably in one position, contact the pediatrician and ask whether a pediatric physical therapy assessment is appropriate. Do not force neck stretches without guidance.",
      "If your baby takes a bottle, try paced feeding and a slower-flow nipple when they cough, gulp, pull away, or spill milk. Repeated coughing or choking needs pediatric evaluation and may need a feeding therapist.",
      "If feeding is still painful or milk transfer remains poor after positioning and latch support, ask the IBCLC and pediatrician for a coordinated oral-function evaluation. Decisions about a tongue-tie procedure should be based on feeding function, not appearance alone.",
    ],
    helpfulResources: [
      {
        title: "See the signs of a good latch",
        description: "A short USDA WIC video showing what to look and listen for during a feed.",
        action: "Watch the latch video",
        url: "https://wicbreastfeeding.fns.usda.gov/video-latching-tips",
      },
      {
        title: "Position and attach your baby",
        description: "A step-by-step guide with a video showing how positioning can create a deeper, more comfortable latch.",
        action: "Open the latch guide",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding/positioning-and-attachment/",
      },
      {
        title: "Try laid-back breastfeeding",
        description: "See how to use a supported, semi-reclined position that can give your baby more control during the feed.",
        action: "Open the position guide",
        url: "https://www.nhs.uk/best-start-in-life/baby/feeding-your-baby/breastfeeding/how-to-breastfeed/breastfeeding-positions/",
      },
      {
        title: "Find free or lower-cost support",
        description: "Explore WIC, peer counselors, hospital support groups, helplines, and other ways to get breastfeeding help.",
        action: "Find support",
        url: "https://womenshealth.gov/breastfeeding/learning-breastfeed/finding-breastfeeding-support-and-information",
      },
    ],
    relatedSteps: [
      {
        protocolId: "feeding-dynamics",
        title: "Spitting up frequently or in large amounts after feeds?",
        description: "Continue to Step 2 to look at fast milk flow, oversupply, bottle flow, and feeding volume.",
        action: "Continue to Step 2",
      },
    ],
    reviewQuestion: "After the feeding assessment or several feeds using the recommended technique, are feeds more comfortable and effective?",
    contactSooner: [
      "Your baby repeatedly coughs or chokes during feeds, struggles to breathe, turns blue or gray, or is taking much less milk.",
      "Your baby is hard to wake, has fewer wet diapers, is not gaining weight, or develops a sudden or painful head tilt.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the feeding changes that helped and complete any recommended follow-up. Improvement tells you feeding mechanics mattered, but it does not confirm a specific diagnosis on its own.",
      somewhat_better: "Feeding mechanics may be one part of the picture. Keep the helpful change and move to Step 2 to look at flow and milk supply.",
      unchanged: "Move to Step 2. If milk transfer, pain, or growth is still a concern, return to the pediatrician or feeding specialist rather than assuming a tongue tie is the answer.",
      worse: "Stop the new adjustment and contact the pediatrician or feeding specialist, especially if intake, wet diapers, breathing, or alertness changed.",
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
    timing: "Weeks 1–2",
    title: "Investigate Oversupply & Milk Balance",
    short: "If you're breastfeeding, making more milk than your baby needs or having a fast letdown can cause gas, green or foamy stools, and fussiness after feeds. Check for these feeding patterns before starting an elimination diet.",
    reviewAfterDays: 7,
    reviewWindow: "Try one agreed feeding change for 3–7 days",
    checklist: [
      "Look for signs of oversupply: your baby coughs, sputters, or pulls away when your milk lets down; spits up frequently or in large amounts; has green or frothy stools; or seems full but fussy. You may also notice that your breasts often feel very full or engorged.",
      "With guidance from an IBCLC, consider block feeding by offering one breast for a set period before switching sides. Agree on the timing and when to stop before you begin, because block feeding can lower supply quickly and raise the risk of plugged ducts or mastitis.",
      "Try a laid-back nursing position so gravity slows the flow and gives your baby more control.",
      "Notice whether green or frothy stools change as feeds become calmer. Stool color can be one clue, but it does not confirm oversupply by itself.",
      "If your baby takes a bottle, use paced feeding and a nipple flow they can manage without coughing, gulping, or spilling milk.",
      "If your baby is formula-fed, review feed volume and frequency with the pediatrician before changing formulas.",
      "Change one thing at a time so you can tell what actually helps.",
    ],
    reviewQuestion: "After 3–7 days, are feeds calmer, with less coughing, pulling away, spit-up, gas, or fussiness afterward?",
    contactSooner: [
      "Your baby repeatedly coughs, chokes, turns blue, struggles to breathe, or takes much less milk.",
      "Wet diapers decrease, weight gain is a concern, or you develop a painful breast lump, fever, or flu-like symptoms.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the one feeding change that helped. You may not need to change your diet or formula if feeds and comfort stay improved.",
      somewhat_better: "Flow or supply may explain part of the fussiness. Keep the helpful change and move to Step 3 if stool, skin, or reflux-like symptoms remain.",
      unchanged: "Oversupply or feeding volume is less likely to explain the full pattern. Move to Step 3 when the food-sensitivity symptom cluster fits.",
      worse: "Undo the new feeding change and contact the IBCLC or pediatrician if feeding distress, breast pain, intake, or wet diapers worsened.",
    },
    sources: [
      { label: "Academy of Breastfeeding Medicine: Hyperlactation", url: "https://www.breastfeedingmedicine.com/assets/DOCUMENTS/PROTOCOLS/Protocol%20%2332%20-%20English%20Translation.pdf" },
      { label: "NASPGHAN: Infant reflux feeding measures", url: "https://naspghan.org/wp-content/uploads/2024/01/PedGERD-Summary-revised-January-2024.pdf" },
    ],
    relatedCauseIds: ["forceful-letdown"],
  },
  {
    id: "food-protein",
    number: 3,
    track: "core",
    timing: "Weeks 2–6",
    title: "Maternal Elimination Diet",
    short: "When stool, skin, feeding, and reflux-like symptoms point toward food protein sensitivity, remove dairy, soy, and egg together for one defined trial. Starting with all three gives you a clearer answer faster than removing them one at a time.",
    approachNote: "This Playbook starts breastfeeding parents with dairy, soy, and egg together. That is broader than many clinical pathways, which begin with cow's milk alone, but it reflects the approach that worked for The Fussy Baby's founder and can create a fuller first test when the symptom cluster is strong.",
    reviewAfterDays: 14,
    reviewWindow: "First review after 2 weeks; continue for up to 4 weeks if symptoms are partly improving",
    checklist: [
      "Contact a healthcare professional promptly for blood-streaked stool and review growth, feeding, skin, and stool symptoms together.",
      "Choose the symptoms you will use to judge the trial, such as visible blood or mucus, eczema, feeding pain, vomiting, or fussiness after feeds.",
      "If your baby is breastfed, begin a 2–4 week trial without dairy, soy, and egg, ideally with support from the pediatrician or a dietitian.",
      "For dairy, check labels for milk, cheese, yogurt, butter, cream, whey, casein, and ghee.",
      "For soy, check labels for soy protein and other soy ingredients. Ask the dietitian how strict your trial needs to be for soybean oil or soy lecithin.",
      "For egg, check foods such as pasta, baked goods, dressings, and mayonnaise.",
      "If you have repeatedly noticed the same symptom after another specific food, discuss adding that food to the trial. Do not add foods because of one difficult day.",
      "If your baby uses formula, ask the pediatrician whether a 2–4 week extensively hydrolyzed formula trial makes sense. Amino-acid formula is usually reserved for severe or unresolved cases.",
      "Record the start date, read every label, and avoid unrelated diet, formula, medication, or supplement changes during the trial.",
      "Some symptoms may shift sooner, but wait 2 weeks before judging the full pattern. If symptoms are partly better, continue the agreed plan for up to 4 weeks.",
      "Reintroduce dairy, soy, egg, and any other removed food one at a time using the clinician-agreed plan. Improvement during elimination alone does not tell you which food was responsible.",
      "If the elimination continues beyond the initial trial, ask a dietitian about protein, calcium, vitamin D, and a varied diet.",
    ],
    reviewQuestion: "After the review period, are the original stool, skin, feeding, and fussiness symptoms clearly better?",
    contactSooner: [
      "Blood increases, stool turns black, your baby is pale or hard to wake, vomiting is forceful or green, or feeding and wet diapers decrease.",
      "Hives, facial swelling, breathing trouble, or another rapid reaction occurs. Do not attempt a home reintroduction after an immediate reaction.",
    ],
    outcomeGuidance: {
      clearly_better: "The response supports food protein sensitivity. Reintroduce dairy, soy, and egg one at a time so you can find the trigger instead of avoiding all three indefinitely.",
      somewhat_better: "Continue only to the agreed 2–4 week endpoint. Another food or another contributor may also be involved, but do not keep broadening the diet without a repeated pattern or professional guidance.",
      unchanged: "Food protein sensitivity is less likely to explain the full pattern after a consistent 2–4 week trial. Reintroduce foods one at a time as planned and move to Step 4 rather than removing more foods.",
      worse: "Contact the pediatrician and reassess. Worsening is not a reason to remove more foods without reviewing other causes, growth, and hydration.",
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
    timing: "Weeks 3–6",
    title: "Investigate Silent Reflux",
    short: "If the elimination diet helps only partly, or arching and feeding for comfort are still strong patterns, reflux-related discomfort may also be involved. Spit-up is common, so look at feeding comfort, intake, growth, and distress together.",
    reviewAfterDays: 14,
    reviewWindow: "Follow one agreed reflux plan for 2 weeks before judging it",
    checklist: [
      "Before the appointment, write down the clearest patterns: arching, feeding for comfort, spit-up or wet burps, crying after feeds, and difficulty settling.",
      "Ask the pediatrician to evaluate reflux-related discomfort and other causes that can look similar, especially food protein sensitivity and feeding-flow issues.",
      "Review feeding volume, frequency, flow, and technique. If the pediatrician recommends it, try smaller or more frequent feeds without reducing the total amount your baby needs.",
      "Hold your baby upright for 20–30 minutes after feeds when practical.",
      "For every sleep, place baby on their back on a firm, flat, non-inclined surface; do not use wedges or positioners.",
      "Only thicken feeds, change formula, or use acid-suppressing medicine when the pediatrician recommends it for a specific reason. Improvement with medicine does not confirm reflux by itself.",
      "If feeding pain, refusal, poor growth, or significant distress continues, ask for a pediatric gastroenterology referral or a second opinion.",
      "Stick with one agreed plan for 2 weeks unless symptoms worsen, so you can tell whether it helped.",
    ],
    reviewQuestion: "After 2 weeks, are feeding comfort, post-feed fussiness, and settling clearly improving?",
    contactSooner: [
      "Vomiting is projectile, green or yellow-green, bloody, or paired with a swollen belly.",
      "Your baby cannot feed, has fewer wet diapers, is hard to wake, has a fever, or is not gaining weight.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the feeding measures that helped and follow the pediatrician's plan. Improvement supports reflux-related discomfort, but it does not mean medicine is always needed.",
      somewhat_better: "Reflux may be one contributor. Keep what helped and revisit any feeding-flow or food-protein symptoms that remain.",
      unchanged: "The reflux plan did not explain the pattern. Ask the pediatrician to reassess before adding thickeners, formula changes, or medicine.",
      worse: "Stop any new nonessential change and contact the pediatrician, especially for forceful or green vomit, poor intake, fewer wet diapers, or unusual sleepiness.",
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
    timing: "Start alongside other steps",
    title: "Support the Gut Microbiome",
    short: "Birth, antibiotic, and feeding history can add useful context, but there is no symptom pattern that proves a baby's microbiome is out of balance. Use this step for low-risk digestive support while you investigate stronger clues.",
    reviewAfterDays: 7,
    reviewWindow: "Try one support at a time and review after 7 days",
    checklist: [
      "Note whether your baby was born by C-section or received antibiotics during birth or early infancy, and share that history with the pediatrician if digestive symptoms continue.",
      "Confirm that stool is soft and that your baby is feeding, growing, and producing their usual wet diapers.",
      "Try one simple comfort measure at a time, such as gentle bicycle legs, tummy massage, or a warm bath.",
      "Avoid repeated rectal stimulation and do not treat straining with soft stool as constipation.",
      "If your breastfed baby has colic-like crying, ask the pediatrician whether L. reuteri DSM 17938 is worth trying. Probiotic evidence is strain-specific and does not apply equally to every baby.",
      "Do not start gripe water, herbal products, or several supplements at once. One change at a time gives you a clearer answer.",
      "Use antibiotics when your baby's clinician determines they are needed. Ask questions about the reason and plan rather than avoiding necessary treatment.",
      "Breast milk contains prebiotics and beneficial bacteria, but do not change a feeding plan that is working solely to target the microbiome.",
    ],
    reviewQuestion: "After 7 days, is your baby more comfortable, with less straining, gas-related distress, or overall fussiness?",
    contactSooner: [
      "Your baby's belly is swollen, stool is bloody, black, pale, or hard, vomiting is green or forceful, or your baby has a fever.",
      "Your baby feeds poorly, has fewer wet diapers, is hard to wake, or is not gaining weight.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the one simple support that helped. Improvement does not prove a microbiome diagnosis, and you do not need to keep adding products.",
      somewhat_better: "Keep the helpful support while continuing the core protocol for any stronger feeding, stool, or skin pattern.",
      unchanged: "Stop adding digestive products and return to the clues with more specific evidence.",
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
    timing: "Use anytime",
    title: "Sensory & Environmental Management",
    short: "These steps will not fix an underlying feeding or dietary issue, but they can make the hardest periods more manageable while you investigate what is driving the fussiness.",
    reviewAfterDays: 7,
    reviewWindow: "Use anytime and review what helps after 7 days",
    checklist: [
      "First check feeding, diaper, temperature, clothing, and fingers and toes for anything wrapped tightly around them.",
      "Reduce stimulation during the hardest part of the day with dimmer light, fewer visitors or transitions, and a quieter environment.",
      "Try the 5 S's together: swaddle, side or stomach hold, shush, swing or rock gently, and suck. Side or stomach positioning is only for an awake baby being held; every sleep begins flat on the back.",
      "Use babywearing only with a clear airway and according to the carrier's safety instructions.",
      "Use white noise softly, place the machine away from your baby, and turn it off when it is no longer needed.",
      "Try gentle clockwise tummy massage or bicycle legs for gas-related discomfort.",
      "For a persistent head preference or body asymmetry, ask the pediatrician about a licensed pediatric physical therapist. Evidence for infant chiropractic and craniosacral therapy is limited.",
      "If you feel overwhelmed, place baby on their back in an empty crib or other safe sleep space, step away, and call someone for support. Never shake a baby.",
    ],
    reviewQuestion: "After trying a consistent calming routine, are the hardest periods shorter or more manageable?",
    contactSooner: [
      "Crying is suddenly different, high-pitched, truly inconsolable, or paired with fever, breathing trouble, vomiting, poor feeding, unusual sleepiness, or injury.",
      "You are worried about your ability to keep your baby or yourself safe. Place your baby in a safe sleep space and get immediate support.",
    ],
    outcomeGuidance: {
      clearly_better: "Keep the smallest calming routine that reliably helps. Sensory load may be part of the pattern even when another contributor also exists.",
      somewhat_better: "Keep the calming routine as support and continue investigating any feeding, stool, skin, or growth concern.",
      unchanged: "Sensory overload is less likely to be the main driver. Return to the specific physical clues and contact the pediatrician if crying remains unusual or severe.",
      worse: "Stop any overstimulating technique, use a safe sleep space when you need a break, and contact the pediatrician for worsening or unusual crying.",
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
