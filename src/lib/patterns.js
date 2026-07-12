import { INVESTIGATIONS } from "../data/playbook.js";
import { getObservation, isRedFlag } from "../data/vocabulary.js";

/**
 * The Pattern Engine.
 *
 * Evaluates the complete history of parent-approved observations and
 * surfaces patterns organized by investigation. It surfaces evidence,
 * never conclusions: each pattern explains exactly which observations
 * contributed and how often they appeared.
 *
 * It never diagnoses, never ranks medical likelihood, and never rules
 * anything out — if there isn't enough evidence, it simply stays quiet.
 */

const MIN_DISTINCT_SIGNS = 2; // at least two different supporting observations
const MIN_TOTAL_SIGHTINGS = 3; // seen at least three times in total

export function generatePatterns(state) {
  const days = Object.entries(state.days);
  const patterns = [];

  for (const inv of INVESTIGATIONS) {
    const signSet = new Set(inv.signs);
    const evidence = new Map(); // obsId -> { count, dates: [] }
    const daysWithEvidence = new Set();

    for (const [dateKey, day] of days) {
      for (const obs of day.observations) {
        // Red flags never feed patterns — they get an immediate nudge instead.
        if (!signSet.has(obs) || isRedFlag(obs)) continue;
        const entry = evidence.get(obs) ?? { count: 0, dates: [] };
        entry.count += 1;
        entry.dates.push(dateKey);
        evidence.set(obs, entry);
        daysWithEvidence.add(dateKey);
      }
    }

    const distinct = evidence.size;
    const total = [...evidence.values()].reduce((sum, e) => sum + e.count, 0);
    if (distinct < MIN_DISTINCT_SIGNS || total < MIN_TOTAL_SIGHTINGS) continue;

    const supporting = [...evidence.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .map(([obsId, e]) => ({
        id: obsId,
        label: getObservation(obsId)?.label ?? obsId,
        count: e.count,
        dates: e.dates.sort(),
      }));

    patterns.push({
      investigationId: inv.id,
      investigationTitle: inv.title,
      summary: buildSummary(supporting, daysWithEvidence.size),
      supporting,
      dayCount: daysWithEvidence.size,
      strength: distinct + total, // ordering only — never shown as a score
    });
  }

  // Order by amount of evidence (organizational, not a medical ranking).
  return patterns.sort((a, b) => b.strength - a.strength);
}

function buildSummary(supporting, dayCount) {
  const names = supporting.slice(0, 3).map((s) => s.label.toLowerCase());
  const list =
    names.length === 1 ? names[0] : names.length === 2 ? `${names[0]} and ${names[1]}` : `${names[0]}, ${names[1]}, and ${names[2]}`;
  const dayWord = dayCount === 1 ? "day" : "days";
  return `We're noticing ${list} appearing together across ${dayCount} ${dayWord} of your observations. This combination may be worth investigating.`;
}
