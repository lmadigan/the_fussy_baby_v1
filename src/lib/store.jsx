import React, { createContext, useContext, useEffect, useReducer } from "react";
import { todayKey } from "./dates.js";
import { buildDemoState } from "../data/demoSeed.js";

/**
 * App state, persisted to localStorage.
 *
 * profile:   { babyName, babyAgeMonths, feedingMode, fussinessTiming, onboardingSymptoms: [obsId], onboarded }
 * days:      { [dateKey]: { fussiness: 1–5|null, observations: [obsId|"custom:Label"], investigationIds: [id] } }
 *            — only parent-approved observations are ever stored.
 * statuses:  { [investigationId]: statusId }
 * checklists:{ [investigationId]: [stepIndex] } — care-advice steps checked off
 * feedback:  { [promptId]: "dismissed" | "sent" } — timed in-app feedback prompts
 * currentInvestigationId: string|null
 * investigations: { [id]: { startedAt, reviewDays } }
 * assessment: latest validated contributor map, or null
 *
 * Demo mode (?demo in the URL) loads a seeded example family and never
 * persists — refreshing the page resets the story.
 */

const STORAGE_KEY = "fussy-baby-v1";

export const IS_DEMO =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("demo");

const initialState = {
  profile: {
    babyName: "",
    babyAgeMonths: null,
    feedingMode: "",
    fussinessTiming: "",
    onboardingSymptoms: [],
    onboarded: false,
  },
  days: {},
  statuses: {},
  checklists: {},
  feedback: {},
  currentInvestigationId: null,
  investigations: {},
  assessment: null,
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
      checklists: parsed.checklists ?? {},
      feedback: parsed.feedback ?? {},
      investigations: parsed.investigations ?? {},
      assessment: parsed.assessment ?? null,
    };
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "completeOnboarding": {
      const { babyName, babyAgeMonths, feedingMode = "", symptoms } = action;
      return {
        ...state,
        profile: {
          ...state.profile,
          babyName,
          babyAgeMonths,
          feedingMode,
          onboardingSymptoms: symptoms,
          onboarded: true,
        },
      };
    }
    case "updateSymptoms": {
      // The standing "what you're seeing" list — editable any time, drives suggestions.
      return { ...state, profile: { ...state.profile, onboardingSymptoms: action.symptoms } };
    }
    case "updateAssessmentContext": {
      return {
        ...state,
        profile: {
          ...state.profile,
          feedingMode: action.feedingMode ?? state.profile.feedingMode,
          fussinessTiming: action.fussinessTiming ?? state.profile.fussinessTiming,
        },
      };
    }
    case "saveAssessment": {
      return { ...state, assessment: action.assessment };
    }
    case "startInvestigation": {
      const { investigationId, reviewDays, startedAt = todayKey() } = action;
      return {
        ...state,
        currentInvestigationId: investigationId,
        statuses: { ...state.statuses, [investigationId]: "in_progress" },
        investigations: {
          ...state.investigations,
          [investigationId]: {
            ...(state.investigations[investigationId] ?? {}),
            startedAt: state.investigations[investigationId]?.startedAt ?? startedAt,
            reviewDays,
          },
        },
      };
    }
    case "saveDay": {
      // Merge approved observations into the day's record (dedupe, keep order).
      const { dateKey, observations, fussiness, investigationId } = action;
      const existing = state.days[dateKey] ?? { fussiness: null, observations: [], investigationIds: [] };
      const merged = [...existing.observations];
      for (const obs of observations) if (!merged.includes(obs)) merged.push(obs);
      const investigationIds = [...(existing.investigationIds ?? [])];
      if (investigationId && !investigationIds.includes(investigationId)) investigationIds.push(investigationId);
      return {
        ...state,
        days: {
          ...state.days,
          [dateKey]: { fussiness: fussiness ?? existing.fussiness, observations: merged, investigationIds },
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
      const existing = state.days[dateKey] ?? {};
      return {
        ...state,
        days: {
          ...state.days,
          [dateKey]: { fussiness, observations, investigationIds: existing.investigationIds ?? [] },
        },
      };
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
    case "toggleChecklistStep": {
      const { investigationId, index } = action;
      const current = new Set(state.checklists[investigationId] ?? []);
      const checking = !current.has(index);
      if (checking) current.add(index);
      else current.delete(index);
      // Checking your first step means you're exploring this — promote it.
      let statuses = state.statuses;
      let currentInvestigationId = state.currentInvestigationId;
      let investigations = state.investigations;
      if (checking && (state.statuses[investigationId] ?? "not_started") === "not_started") {
        statuses = { ...state.statuses, [investigationId]: "in_progress" };
        currentInvestigationId = investigationId;
        investigations = {
          ...state.investigations,
          [investigationId]: {
            ...(state.investigations[investigationId] ?? {}),
            startedAt: state.investigations[investigationId]?.startedAt ?? todayKey(),
          },
        };
      }
      return {
        ...state,
        checklists: { ...state.checklists, [investigationId]: [...current].sort((a, b) => a - b) },
        statuses,
        currentInvestigationId,
        investigations,
      };
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
