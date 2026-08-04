import { todayKey } from "../lib/dates.js";
import { reviewDate } from "./playbook.js";

function daysAgo(count) {
  const date = new Date();
  date.setDate(date.getDate() - count);
  return todayKey(date);
}

export function buildDemoState() {
  const startedAt = daysAgo(14);
  return {
    profile: {
      babyName: "Wren",
      babyAgeMonths: 2,
      feedingMode: "Breastfeeding",
      fussinessTiming: "Right after feeds",
      onboardingSymptoms: ["blood-stool", "mucus-stool", "eczema", "spit-up", "fussy-after-feeds"],
      onboarded: true,
    },
    membership: "premium",
    assessment: {
      createdAt: new Date().toISOString(),
      symptomIds: ["blood-stool", "mucus-stool", "eczema", "spit-up", "fussy-after-feeds"],
      summary: "The stool, skin, and feeding cluster makes Food Protein Sensitivity the strongest match, while reflux may also be contributing.",
      causes: [
        {
          playbookId: "food-protein-sensitivity",
          name: "Food Protein Sensitivity",
          description: "The combination of stool, skin, and feeding signs is more informative than any one symptom alone.",
          matching: ["Blood-streaked stool", "Mucus in stool", "Eczema flare", "Spit up", "Fussiness after feeds"],
          notFitting: [],
          missingInformation: ["A clinician can help interpret the stool finding alongside feeding and growth history."],
        },
        {
          playbookId: "silent-reflux",
          name: "Silent Reflux",
          description: "Reflux-like discomfort may be overlapping with the food-related symptom cluster.",
          matching: ["Spit up", "Fussiness after feeds"],
          notFitting: ["Reflux alone would not usually explain blood-streaked stool or eczema."],
          missingInformation: [],
        },
      ],
      followUpQuestions: [],
      note: "This organizes possibilities for exploration and is not a diagnosis.",
      isExample: true,
    },
    activePlanId: "food-protein",
    plans: {
      "food-protein": {
        startedAt,
        reviewDate: reviewDate(startedAt, 14),
        status: "in_progress",
      },
    },
    protocolChecklists: {
      "food-protein": [0, 1, 2, 3],
    },
    outcomes: {},
  };
}
