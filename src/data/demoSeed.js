import { todayKey } from "../lib/dates.js";

/**
 * Demo mode seed — a complete example family so anyone can click through
 * the app without entering data. Loaded when the URL contains ?demo.
 * Nothing is persisted in demo mode; refreshing resets the story.
 *
 * The story: Wren, 8 weeks. The assessment highlights feeding flow first,
 * with digestive immaturity and overtiredness as possible co-contributors.
 * A focused investigation is already in progress so Progress has useful data.
 */

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return todayKey(d);
}

export function buildDemoState() {
  return {
    profile: {
      babyName: "Wren",
      babyAgeMonths: 2,
      feedingMode: "Breastfeeding",
      fussinessTiming: "Right after feeds",
      onboardingSymptoms: ["gulping", "green-stool", "gas", "short-nap", "evening-fussiness"],
      onboarded: true,
    },
    currentInvestigationId: "forceful-letdown",
    investigations: {
      "forceful-letdown": { startedAt: daysAgo(6), reviewDays: 7 },
    },
    assessment: {
      createdAt: new Date().toISOString(),
      symptomIds: ["gulping", "green-stool", "gas", "short-nap", "evening-fussiness"],
      summary: "Feeding flow looks like the strongest contributor, while digestive immaturity and overtiredness may be adding to harder evenings.",
      causes: [
        { playbookId: "forceful-letdown", name: "Forceful Letdown / Oversupply", description: "Fast milk flow can make feeds gulpy and add air.", matching: ["Gulping", "Green stool", "Gas"], notFitting: [], missingInformation: [] },
        { playbookId: "gas-digestion", name: "Gas & Digestive Immaturity", description: "Gas can build through the day and make evenings harder.", matching: ["Gas", "Evening fussiness"], notFitting: [], missingInformation: [] },
        { playbookId: "overtiredness", name: "Overtiredness & Overstimulation", description: "Short naps can make evening settling harder.", matching: ["Short nap", "Evening fussiness"], notFitting: [], missingInformation: [] },
      ],
      followUpQuestions: [],
      note: "This organizes possibilities for exploration and is not a diagnosis.",
      isExample: true,
    },
    statuses: {
      "feeding-mechanics": "complete",
      "forceful-letdown": "in_progress",
      "food-protein-sensitivity": "low_priority",
    },
    checklists: {
      "feeding-mechanics": [0, 1, 2, 3, 4, 5],
      "forceful-letdown": [0, 1],
    },
    feedback: {},
    days: {
      [daysAgo(13)]: {
        fussiness: 4,
        observations: ["gulping", "pulling-off", "green-stool", "gas", "evening-fussiness"],
      },
      [daysAgo(12)]: {
        fussiness: 3,
        observations: ["short-nap", "high-stimulation", "evening-fussiness", "trouble-settling"],
      },
      [daysAgo(11)]: {
        fussiness: 2,
        observations: ["calm-day", "long-nap", "content-day", "extra-burping"],
      },
      [daysAgo(10)]: {
        fussiness: 4,
        observations: ["gulping", "foamy-stool", "green-stool", "gas", "knees-to-chest", "fussy-after-feeds"],
      },
      [daysAgo(9)]: {
        fussiness: 3,
        observations: ["spit-up", "hiccups", "short-nap", "evening-fussiness"],
      },
      [daysAgo(8)]: {
        fussiness: 5,
        observations: ["gulping", "pulling-off", "explosive-stool", "gas", "straining", "inconsolable", "short-nap"],
      },
      [daysAgo(7)]: {
        fussiness: 2,
        observations: ["paced-feeding", "extra-burping", "long-nap", "content-day"],
      },
      [daysAgo(6)]: {
        fussiness: 3,
        observations: ["green-stool", "foamy-stool", "gas", "knees-to-chest", "custom:Loud restaurant dinner"],
        investigationIds: ["forceful-letdown"],
      },
      [daysAgo(5)]: {
        fussiness: 4,
        observations: ["short-nap", "new-place", "high-stimulation", "evening-fussiness", "night-waking"],
      },
      [daysAgo(4)]: {
        fussiness: 2,
        observations: ["paced-feeding", "upright-after-feed", "calm-day", "content-day"],
        investigationIds: ["forceful-letdown"],
      },
      [daysAgo(3)]: {
        fussiness: 3,
        observations: ["gulping", "green-stool", "spit-up", "extra-burping", "trouble-settling"],
        investigationIds: ["forceful-letdown"],
      },
      [daysAgo(2)]: {
        fussiness: 4,
        observations: ["short-nap", "evening-fussiness", "gas", "straining", "red-face-grunting"],
      },
      [daysAgo(1)]: {
        fussiness: 2,
        observations: ["paced-feeding", "long-nap", "content-day"],
        investigationIds: ["forceful-letdown"],
      },
      [daysAgo(0)]: {
        fussiness: 3,
        observations: ["gulping", "green-stool", "short-nap", "arching-during-feed"],
        investigationIds: ["forceful-letdown"],
      },
    },
  };
}
