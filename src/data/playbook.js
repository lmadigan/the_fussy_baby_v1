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
    short: "Start here to check how your baby is latching and feeding. Latch pain, clicking, leaking, gulping, swallowing air, or a strong preference for one feeding position can all signal that positioning, oral function, body alignment, or milk flow deserves a closer look.",
    fitGuidance: {
      doThis: "You notice clicking, leaking, gulping, swallowed air, latch pain, coughing during feeds, very long or tiring feeds, or a persistent head or side preference.",
      ifNot: "Continue to Step 2. It is especially relevant if your main concern is frequent or large spit-up after feeds.",
      nextProtocolId: "feeding-dynamics",
      nextAction: "Continue to Step 2",
    },
    reviewAfterDays: 7,
    reviewWindow: "Schedule a feeding assessment as soon as you can, if possible. The free resources below can help while you wait or if an assessment is not possible for you.",
    checklistLabel: "Your next steps",
    checklistIntro: "Start with an assessment if one is available to you. The remaining steps help you prepare, try simple adjustments, and find the right follow-up.",
    checklist: [
      "Schedule a feeding assessment with a board-certified lactation consultant (IBCLC) as soon as you can. Ask them to watch a full feed and evaluate positioning, latch, milk transfer, oral movement, comfort, and milk flow.",
      "Before the appointment, note any leaking, coughing, fatigue, latch pain, or whether your baby seems satisfied after feeds. If these issues are intermittent or the appointment is virtual, record a feed to share.",
      "While you wait, try a deeper latch: hold your baby close with their nose level with your nipple, wait for a wide-open mouth, and bring them to the breast chin-first. If the latch stays painful after the first few sucks, gently break the seal and try again.",
      "Listen and look during a feed. Healthy milk transfer often has a steady suck-swallow-breathe rhythm, deeper jaw movements, brief pauses for swallowing, rounded cheeks, and little leaking. Clicking, smacking, losing the seal, coughing, pulling away, or frantic gulping can mean your baby is swallowing air or struggling with the milk flow. Show these signs to the IBCLC if they continue.",
      "Ask the IBCLC to assess your baby's tongue movement as part of the full feeding evaluation. A tongue tie matters when it limits feeding function, such as maintaining a latch or transferring milk, after positioning and latch have been addressed. If it is suspected, review next steps with the pediatrician before pursuing a procedure.",
      "If your baby has a persistent head tilt, turns toward one side, or cannot feed comfortably in one position, contact the pediatrician and ask whether a pediatric physical therapy assessment is appropriate. Do not force neck stretches without guidance.",
      "If your baby takes a bottle, try paced feeding and a slower-flow nipple when they cough, gulp, pull away, or spill milk. Repeated coughing or choking needs pediatric evaluation and may need a feeding therapist.",
      "If feeding concerns continue after positioning and latch support, ask the IBCLC and pediatrician to coordinate the next evaluation rather than assuming one sign points to a single cause.",
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
    fitGuidance: {
      doThis: "Your baby coughs, sputters, gulps, or pulls away as milk starts flowing; spits up frequently or in large amounts; has green or frothy stools; or seems full but fussy after feeds. Very full or frequently engorged breasts can be another clue.",
      ifNot: "Continue to Step 3.",
      nextProtocolId: "food-protein",
      nextAction: "Continue to Step 3",
    },
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
    short: "Small amounts of food proteins can pass into breast milk. Most babies tolerate them, but dairy, soy, and egg are among the food proteins most often linked to reactions in breastfed babies. When stool, skin, feeding, and reflux-like symptoms point toward food protein sensitivity, these are the three foods this Playbook investigates first.",
    fitGuidance: {
      doThis: "Your baby has blood or persistent mucus in stool, or a repeated cluster of eczema or skin flares with vomiting, spit-up, feeding discomfort, or fussiness after feeds. Discuss blood in stool with your baby's healthcare professional.",
      ifNot: "Do not start an elimination trial. Continue to Step 4 if reflux-like discomfort is still a concern.",
      nextProtocolId: "reflux",
      nextAction: "Continue to Step 4",
    },
    approachNote: "Because dairy and soy sensitivities can overlap, and egg is another food protein linked to reactions through breast milk, this Playbook recommends removing all three together. If symptoms improve, add them back one at a time to learn which food or foods were contributing. If you have a strong hunch about another food because you have noticed the same symptoms after eating it more than once, add it to the trial as well. This can feel like a lot, but the goal is a short, structured trial that gives you a clearer answer, not a permanently restricted diet.",
    reviewAfterDays: 14,
    reviewWindow: "First review after 2 weeks; continue for up to 4 weeks if symptoms are partly improving",
    checklist: [
      "Contact a healthcare professional promptly for blood-streaked stool and review growth, feeding, skin, and stool symptoms together.",
      "Choose the symptoms you will use to judge the trial, such as visible blood or mucus, eczema, feeding pain, vomiting, or fussiness after feeds.",
      "If your baby is breastfed, begin a 2–4 week trial with dairy, soy, and egg fully eliminated, ideally with support from the pediatrician or a dietitian. This is an all-or-nothing trial: simply eating less of these foods will not give you a clear result.",
      "For dairy, check labels for milk, cheese, yogurt, butter, cream, whey, casein, and ghee.",
      "For soy, read the full ingredient list for soy protein and other soy ingredients. Soy can show up in unexpected places, including sauces, breads, dressings, and restaurant cooking oils. When eating out, ask whether the vegetable oil contains soybean oil.",
      "For egg, check foods such as pasta, baked goods, dressings, and mayonnaise.",
      "If you have repeatedly noticed the same symptoms after eating another specific food, add that food to the trial and include it in your one-at-a-time reintroduction plan. Do not broaden the diet because of one difficult day.",
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
      { label: "FDA: Reading food-allergen labels", url: "https://www.fda.gov/consumers/consumer-updates/have-food-allergies-read-label" },
    ],
    relatedCauseIds: ["food-protein-sensitivity"],
  },
  {
    id: "reflux",
    number: 4,
    track: "core",
    timing: "Weeks 3–6",
    title: "Investigate Silent Reflux",
    short: "Consider this step when arching, feeding for comfort, crying after feeds, or difficulty settling forms a repeated pattern. Spit-up alone is common. Look more closely when it comes with discomfort, feeding difficulty, poor intake, or growth concerns.",
    fitGuidance: {
      doThis: "Arching, wet burps or spit-up, feeding for comfort, crying after feeds, feeding pain or refusal, and difficulty settling form a repeated pattern. Spit-up without pain or feeding difficulty does not automatically require a reflux investigation.",
      ifNot: "Continue to Step 5 for optional digestive support.",
      nextProtocolId: "microbiome-support",
      nextAction: "Continue to Step 5",
    },
    reviewAfterDays: 14,
    reviewWindow: "Follow one agreed reflux plan for 2 weeks before judging it",
    checklist: [
      "Write down the clearest patterns to share with your pediatrician: arching, feeding for comfort, spit-up or wet burps, crying after feeds, and difficulty settling.",
      "Ask the pediatrician to evaluate reflux-related discomfort and other causes that can look similar, especially food protein sensitivity and feeding-flow issues.",
      "Review feeding volume, frequency, flow, and technique. If the pediatrician recommends it, try smaller or more frequent feeds without reducing the total amount your baby needs.",
      "Hold your baby upright for 20–30 minutes after feeds when practical.",
      "For every sleep, place baby on their back on a firm, flat, non-inclined surface; do not use wedges or positioners.",
      "Talk with your pediatrician before thickening feeds, changing formula, or trying reflux medicine. These options are not needed for most babies with ordinary reflux, and the right choice depends on your baby's symptoms, feeding, and growth.",
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
    short: "Your baby's digestive system and gut microbiome are still developing. This step focuses on gentle comfort measures and, in some cases, a pediatrician-guided probiotic trial. Gas, crying, or stool changes alone cannot tell us that the microbiome is out of balance.",
    fitGuidance: {
      doThis: "Your baby has ongoing gas-related discomfort, strains with soft stool, or has colic-like crying. Some breastfed babies with colic-like crying may benefit from a specific probiotic strain, but probiotics are not a one-size-fits-all treatment.",
      ifNot: "Skip this step and continue to Step 6 for optional calming support.",
      nextProtocolId: "sensory-support",
      nextAction: "Continue to Step 6",
    },
    reviewAfterDays: 7,
    reviewWindow: "Try one support at a time and review after 7 days",
    checklist: [
      "First, confirm that your baby's stool is soft and that they are feeding, growing, and producing their usual wet diapers. Contact the pediatrician if any of these have changed.",
      "For gas discomfort, try burping at natural pauses during feeds, gentle bicycle legs, clockwise tummy massage, or a warm bath.",
      "Try one comfort measure at a time for a few days so you can tell whether it helps.",
      "If your baby still seems uncomfortable, ask the pediatrician whether simethicone gas drops are worth a short trial. They are commonly used, but studies have not shown consistent relief for infant colic.",
      "Skip gripe water and herbal colic products during this trial. Ingredients vary, evidence is limited, and adding several products makes it harder to know what helped.",
      "If your breastfed baby has colic-like crying, ask the pediatrician whether a strain-specific probiotic such as L. reuteri DSM 17938 is worth trying. Evidence for one strain does not apply to every probiotic.",
      "Avoid repeated rectal stimulation. Straining, grunting, or turning red while passing soft stool is not the same as constipation.",
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
      { label: "AAP: Helping a baby with gas", url: "https://www.healthychildren.org/English/ages-stages/baby/diapers-clothing/Pages/Breaking-Up-Gas.aspx" },
      { label: "Cochrane: Pain-relieving agents for infant colic", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6457752/" },
    ],
    relatedCauseIds: ["microbiome", "digestive-immaturity"],
  },
  {
    id: "sensory-support",
    number: 6,
    track: "ongoing",
    timing: "Use anytime",
    title: "Sensory & Environmental Management",
    short: "Some babies are especially sensitive to sensory and environmental stimulation, particularly in the first two months of life. Try these soothing techniques to help your baby settle. If they do not make a difference, continue through the core steps to investigate other possible causes of fussiness.",
    fitGuidance: {
      doThis: "Fussiness builds after a busy day, short naps, visitors, noise, or frequent transitions, or your baby has difficulty settling and you need a safe calming routine.",
      ifNot: "Skip this step for now and return to it whenever calming support would be useful.",
    },
    reviewAfterDays: 7,
    reviewWindow: "Use anytime and review what helps after 7 days",
    checklist: [
      "First check feeding, diaper, temperature, clothing, and fingers and toes for anything wrapped tightly around them.",
      "Reduce stimulation during the hardest part of the day with dimmer light, fewer visitors or transitions, and a quieter environment.",
      "Try the 5 S's together: swaddle, side or stomach hold, shush, swing or rock gently, and suck. Side or stomach positioning is only for an awake baby being held; every sleep begins flat on the back.",
      "Use babywearing with a clear airway and follow the carrier's safety instructions. The carrier should hold your baby snugly, like a hug. Because it is a new sensation, your baby may need a few tries or a couple of minutes of gentle movement before settling.",
      "Use white noise softly, place the machine away from your baby, and turn it off when it is no longer needed.",
      "Try gentle clockwise tummy massage or bicycle legs for gas-related discomfort.",
      "If it fits your budget and lifestyle, you may choose to try gentle bodywork from a licensed chiropractor or craniosacral therapist with infant experience. For many babies, this feels more like a gentle massage than an adult chiropractic adjustment. Some families report that it helps with physical tightness or fussiness, although clinical research is still limited. Ask the provider to explain the techniques they use before beginning.",
    ],
    reviewQuestion: "After trying a consistent calming routine, are the hardest periods shorter or more manageable?",
    contactSooner: [],
    outcomeGuidance: {
      clearly_better: "Keep the smallest calming routine that reliably helps. Sensory load may be part of the pattern even when another contributor also exists.",
      somewhat_better: "Keep the calming routine as support and continue investigating any feeding, stool, skin, or growth concern.",
      unchanged: "Sensory overload is less likely to be the main driver. Return to the specific physical clues and contact the pediatrician if crying remains unusual or severe.",
      worse: "Stop any overstimulating technique, use a safe sleep space when you need a break, and contact the pediatrician for worsening or unusual crying.",
    },
    sources: [
      { label: "AAP: Calming a fussy baby safely", url: "https://www.healthychildren.org/english/ages-stages/baby/crying-colic/pages/Calming-A-Fussy-Baby.aspx" },
      { label: "Cochrane: Manipulative therapies for infant colic", url: "https://www.cochrane.org/evidence/CD004796_manipulative-therapies-infantile-colic" },
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
    short: "Some babies react to proteins in breast milk or formula. This may show up as blood or mucus in poop, eczema, spit-up, or fussiness after feeding.",
    whatIsIt: "Small amounts of dietary proteins such as cow's milk, soy, and egg can pass into breast milk. In some babies, the developing gut and immune system react to them. One symptom alone may have many explanations, but food protein sensitivity becomes more likely when several signs appear together, such as blood or mucus in poop, eczema, and ongoing discomfort during or after feeds. Many delayed gut reactions improve during the first year, although the timing varies and a planned reintroduction is still needed.",
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
    whatIsIt: "Reflux is when milk moves back up from the stomach into the esophagus, the tube between the mouth and stomach. With normal infant reflux, milk may come out as spit-up, but the baby is generally comfortable and continues feeding and growing well. Silent reflux is an informal name for the same movement when milk does not reach the mouth or is swallowed again, so there may be little or no visible spit-up. Silent does not mean more severe. Reflux needs a closer look when it repeatedly comes with pain, feeding refusal or difficulty, poor intake, or growth concerns. Arching or fussiness alone does not prove reflux because fast milk flow, latch problems, and food protein sensitivity can look similar.",
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
    title: "Developing Gut Microbiome",
    evidenceLabel: "Limited / developing",
    short: "Your baby's gut microbiome is still developing. Birth, antibiotic, and feeding history add context, but gas, crying, or stool changes cannot tell us on their own that it is out of balance.",
    whatIsIt: "The gut microbiome is the community of bacteria and other microorganisms living in the digestive tract. It changes quickly during infancy. Birth, antibiotics, and feeding can influence it, but no single symptom or symptom pattern shows that it is disrupted. Probiotic effects are strain-specific, which means evidence for one strain does not apply to every probiotic product.",
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
