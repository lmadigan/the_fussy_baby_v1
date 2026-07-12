import React, { createContext, useContext, useEffect, useReducer } from "react";
import { todayKey } from "./dates.js";
import { buildDemoState } from "../data/demoSeed.js";

/**
 * App state, persisted to localStorage.
 *
 * profile:   { babyName, babyAgeMonths, onboardingSymptoms: [obsId], onboarded }
 * days:      { [dateKey]: { fussiness: 1–5|null, observations: [obsId|"custom:Label"] } }
 *            — only parent-approved observations are ever stored.
 * statuses:  { [investigationId]: statusId }
 * feedback:  { [promptId]: "dismissed" | "sent" } — timed in-app feedback prompts
 * currentInvestigationId: string|null
 *
 * Demo mode (?demo in the URL) loads a seeded example family and never
 * persists — refreshing the page resets the story.
 */

const STORAGE_KEY = "fussy-baby-v1";

export const IS_DEMO =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("demo");

const initialState = {
  profile: { babyName: "", babyAgeMonths: null, onboardingSymptoms: [], onboarded: false },
  days: {},
  statuses: {},
  feedback: {},
  currentInvestigationId: null,
};

function load() {
  if (IS_DEMO) return buildDemoState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    return {
      ...initialState,
      ...parsed,
      profile: { ...initialState.profile, ...parsed.profile },
      feedback: parsed.feedback ?? {},
    };
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "completeOnboarding": {
      const { babyName, babyAgeMonths, symptoms } = action;
      return {
        ...state,
        profile: { babyName, babyAgeMonths, onboardingSymptoms: symptoms, onboarded: true },
      };
    }
    case "saveDay": {
      // Merge approved observations into the day's record (dedupe, keep order).
      const { dateKey, observations, fussiness } = action;
      const existing = state.days[dateKey] ?? { fussiness: null, observations: [] };
      const merged = [...existing.observations];
      for (const obs of observations) if (!merged.includes(obs)) merged.push(obs);
      return {
        ...state,
        days: {
          ...state.days,
          [dateKey]: { fussiness: fussiness ?? existing.fussiness, observations: merged },
        },
      };
    }
    case "updateDay": {
      const { dateKey, observations, fussiness } = action;
      if (observations.length === 0 && fussiness == null) {
        const days = { ...state.days };
        delete days[dateKey];
        return { ...state, days };
      }
      return { ...state, days: { ...state.days, [dateKey]: { fussiness, observations } } };
    }
    case "deleteDay": {
      const days = { ...state.days };
      delete days[action.dateKey];
      return { ...state, days };
    }
    case "setStatus": {
      const statuses = { ...state.statuses, [action.investigationId]: action.status };
      let current = state.currentInvestigationId;
      if (action.status === "in_progress") current = action.investigationId;
      else if (current === action.investigationId) current = null;
      return { ...state, statuses, currentInvestigationId: current };
    }
    case "resolveFeedback": {
      return { ...state, feedback: { ...state.feedback, [action.promptId]: action.outcome } };
    }
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  useEffect(() => {
    if (IS_DEMO) return; // demo edits live in memory only
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable — the session still works in memory
    }
  }, [state]);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

/** Days sorted newest first: [{ dateKey, fussiness, observations }] */
export function sortedDays(state) {
  return Object.entries(state.days)
    .map(([dateKey, day]) => ({ dateKey, ...day }))
    .sort((a, b) => (a.dateKey < b.dateKey ? 1 : -1));
}

export function lastObservationDay(state) {
  const days = sortedDays(state);
  return days.length ? days[0] : null;
}

/** Observation labels the parent uses most, seeded from onboarding. */
export function commonObservationIds(state, limit = 8) {
  const counts = new Map();
  for (const id of state.profile.onboardingSymptoms) counts.set(id, 1);
  for (const day of Object.values(state.days)) {
    for (const obs of day.observations) {
      if (obs.startsWith("custom:")) continue;
      counts.set(obs, (counts.get(obs) ?? 0) + 2);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id);
}
