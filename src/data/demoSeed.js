import { todayKey } from "../lib/dates.js";

/**
 * Demo mode seed — a complete example family so anyone can click through
 * the app without entering data. Loaded when the URL contains ?demo.
 * Nothing is persisted in demo mode; refreshing resets the story.
 *
 * The story: Wren, 8 weeks. Three distinct signals are planted so the
 * Pattern Engine demonstrably surfaces different kinds of patterns —
 * feeding mechanics (gulpy feeds, green/foamy stool), daytime rhythm
 * (short naps → rough evenings), and gas — not just one food storyline.
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
      onboardingSymptoms: ["gulping", "green-stool", "gas", "short-nap", "evening-fussiness"],
      onboarded: true,
    },
    currentInvestigationId: "forceful-letdown",
    statuses: {
      "feeding-mechanics": "complete",
      "forceful-letdown": "in_progress",
      "food-protein-sensitivity": "low_priority",
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
      },
      [daysAgo(5)]: {
        fussiness: 4,
        observations: ["short-nap", "new-place", "high-stimulation", "evening-fussiness", "night-waking"],
      },
      [daysAgo(4)]: {
        fussiness: 2,
        observations: ["paced-feeding", "upright-after-feed", "calm-day", "content-day"],
      },
      [daysAgo(3)]: {
        fussiness: 3,
        observations: ["gulping", "green-stool", "spit-up", "extra-burping", "trouble-settling"],
      },
      [daysAgo(2)]: {
        fussiness: 4,
        observations: ["short-nap", "evening-fussiness", "gas", "straining", "red-face-grunting"],
      },
      [daysAgo(1)]: {
        fussiness: 2,
        observations: ["paced-feeding", "long-nap", "content-day"],
      },
      [daysAgo(0)]: {
        fussiness: 3,
        observations: ["gulping", "green-stool", "short-nap", "arching-during-feed"],
      },
    },
  };
}
