/**
 * Pattern Engine simulation harness — synthetic families over time.
 *
 * Each persona is a baby with a known ground-truth cause. We generate
 * observations day by day (probabilistically, with noise and skipped
 * days, like a real tired parent), run the Pattern Engine after every
 * day, and measure:
 *
 *   - detection rate: did the true investigation surface within 28 days?
 *   - detection day: how quickly (median)?
 *   - rank-1 rate: was the true investigation the top pattern at day 28?
 *   - noise: how many patterns surfaced for a baby with NO underlying cause?
 *
 * Run: node sim/simulate.mjs [runs-per-persona]
 */

import { generatePatterns } from "../src/lib/patterns.js";

// ── deterministic RNG so results are reproducible ──
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Benign background observations any baby produces occasionally
const NOISE_POOL = [
  "hiccups", "spit-up", "long-nap", "content-day", "calm-day",
  "congestion", "extra-burping", "pacifier", "heavy-drooling", "gum-rubbing",
];

const PERSONAS = [
  {
    name: "Letdown baby",
    truth: "forceful-letdown",
    signals: { gulping: 0.45, "green-stool": 0.35, "foamy-stool": 0.2, "pulling-off": 0.25, gas: 0.3, "fussy-after-feeds": 0.25 },
    baseFussiness: 3,
  },
  {
    name: "Silent reflux baby",
    truth: "silent-reflux",
    signals: { "arching-during-feed": 0.4, "fussy-after-feeds": 0.35, congestion: 0.25, "wet-burps": 0.2, "sleeps-upright-only": 0.2, "trouble-settling": 0.3 },
    baseFussiness: 3,
  },
  {
    name: "Overtired baby",
    truth: "overtiredness",
    signals: { "short-nap": 0.5, "evening-fussiness": 0.4, "high-stimulation": 0.25, "trouble-settling": 0.3, "night-waking": 0.25 },
    baseFussiness: 3,
  },
  {
    name: "Dairy-sensitive baby",
    truth: "food-protein-sensitivity",
    signals: { dairy: 0.5, "mucus-stool": 0.3, "green-stool": 0.25, eczema: 0.2, "fussy-after-feeds": 0.3, rash: 0.15 },
    baseFussiness: 3,
  },
  {
    name: "Calm baby (control — no cause)",
    truth: null,
    signals: {},
    baseFussiness: 2,
  },
];

const DAYS = 28;
const LOG_PROBABILITY = 0.8; // parents skip days

function key(dayIndex) {
  const d = new Date(2026, 0, 1 + dayIndex);
  return d.toISOString().slice(0, 10);
}

function simulateRun(persona, rng) {
  const state = { days: {} };
  let detectionDay = null;
  let finalPatterns = [];

  for (let day = 0; day < DAYS; day++) {
    if (rng() > LOG_PROBABILITY) continue; // didn't log today

    const observations = [];
    for (const [sign, p] of Object.entries(persona.signals)) {
      if (rng() < p) observations.push(sign);
    }
    // background noise: 0–2 benign observations
    const noiseCount = rng() < 0.5 ? 1 : rng() < 0.25 ? 2 : 0;
    for (let i = 0; i < noiseCount; i++) {
      const pick = NOISE_POOL[Math.floor(rng() * NOISE_POOL.length)];
      if (!observations.includes(pick)) observations.push(pick);
    }
    if (observations.length === 0) observations.push("content-day");

    const fussiness = Math.max(1, Math.min(5, Math.round(persona.baseFussiness + (rng() * 2 - 1) + (observations.length > 3 ? 1 : 0))));
    state.days[key(day)] = { fussiness, observations };

    const patterns = generatePatterns(state);
    finalPatterns = patterns;
    if (persona.truth && detectionDay === null && patterns.some((p) => p.investigationId === persona.truth)) {
      detectionDay = day + 1;
    }
  }

  return {
    detected: detectionDay !== null,
    detectionDay,
    rankedFirst: persona.truth ? finalPatterns[0]?.investigationId === persona.truth : null,
    patternCount: finalPatterns.length,
  };
}

function median(nums) {
  if (nums.length === 0) return null;
  const s = [...nums].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

const RUNS = Number(process.argv[2]) || 50;
console.log(`Pattern Engine simulation — ${RUNS} runs per persona, ${DAYS} days each, ~${Math.round(LOG_PROBABILITY * 100)}% logging rate\n`);

for (const persona of PERSONAS) {
  const results = [];
  for (let run = 0; run < RUNS; run++) {
    results.push(simulateRun(persona, mulberry32(run * 7919 + 13)));
  }

  if (persona.truth) {
    const detected = results.filter((r) => r.detected);
    const rankedFirst = results.filter((r) => r.rankedFirst).length;
    const meanPatterns = (results.reduce((s, r) => s + r.patternCount, 0) / RUNS).toFixed(1);
    console.log(`${persona.name}  (truth: ${persona.truth})`);
    console.log(`  detected by day ${DAYS}:  ${detected.length}/${RUNS} (${Math.round((detected.length / RUNS) * 100)}%)`);
    console.log(`  median detection day:  ${median(detected.map((r) => r.detectionDay))}`);
    console.log(`  truth ranked #1 at day ${DAYS}:  ${rankedFirst}/${RUNS} (${Math.round((rankedFirst / RUNS) * 100)}%)`);
    console.log(`  mean patterns surfaced:  ${meanPatterns}\n`);
  } else {
    const meanPatterns = (results.reduce((s, r) => s + r.patternCount, 0) / RUNS).toFixed(2);
    const anyPattern = results.filter((r) => r.patternCount > 0).length;
    console.log(`${persona.name}`);
    console.log(`  runs with ANY pattern surfaced:  ${anyPattern}/${RUNS} (${Math.round((anyPattern / RUNS) * 100)}%)  ← want low`);
    console.log(`  mean patterns surfaced:  ${meanPatterns}  ← want ~0\n`);
  }
}
