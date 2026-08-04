import React, { createContext, useContext, useEffect, useReducer } from "react";
import { todayKey } from "./dates.js";
import { buildDemoState } from "../data/demoSeed.js";
import { getProtocolStep, reviewDate } from "../data/playbook.js";

/**
 * Local MVP state.
 *
 * profile: baby context and approved symptom ids
 * membership: "free" or "premium"
 * assessment: latest validated AI contributor map
 * activePlanId: current free Playbook protocol step
 * plans: start date, review date, and status by protocol id
 * protocolChecklists: completed checklist indexes by protocol id
 * outcomes: one structured outcome review by protocol id
 */

const STORAGE_KEY = "fussy-baby-v2";

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
  membership: "free",
  assessment: null,
  activePlanId: null,
  plans: {},
  protocolChecklists: {},
  outcomes: {},
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
      plans: parsed.plans ?? {},
      protocolChecklists: parsed.protocolChecklists ?? {},
      outcomes: parsed.outcomes ?? {},
      assessment: parsed.assessment ?? null,
    };
  } catch {
    return initialState;
  }
}

function beginPlan(state, protocolId, startedAt = todayKey()) {
  const protocol = getProtocolStep(protocolId);
  if (!protocol) return state;
  const existing = state.plans[protocolId];
  return {
    ...state,
    activePlanId: protocolId,
    plans: {
      ...state.plans,
      [protocolId]: {
        startedAt: existing?.startedAt ?? startedAt,
        reviewDate: existing?.reviewDate ?? reviewDate(startedAt, protocol.reviewAfterDays),
        status: existing?.status ?? "in_progress",
      },
    },
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "completeOnboarding":
      return {
        ...state,
        profile: {
          ...state.profile,
          babyName: action.babyName,
          babyAgeMonths: action.babyAgeMonths,
          feedingMode: action.feedingMode ?? "",
          onboardingSymptoms: action.symptoms,
          onboarded: true,
        },
      };
    case "updateSymptoms":
      return { ...state, profile: { ...state.profile, onboardingSymptoms: action.symptoms } };
    case "updateAssessmentContext":
      return {
        ...state,
        profile: {
          ...state.profile,
          feedingMode: action.feedingMode ?? state.profile.feedingMode,
          fussinessTiming: action.fussinessTiming ?? state.profile.fussinessTiming,
        },
      };
    case "activateMembership":
      return { ...state, membership: "premium" };
    case "saveAssessment":
      return { ...state, assessment: action.assessment };
    case "startPlan":
      return beginPlan(state, action.protocolId, action.startedAt);
    case "toggleProtocolItem": {
      const current = new Set(state.protocolChecklists[action.protocolId] ?? []);
      if (current.has(action.index)) current.delete(action.index);
      else current.add(action.index);
      const next = beginPlan(state, action.protocolId);
      return {
        ...next,
        protocolChecklists: {
          ...state.protocolChecklists,
          [action.protocolId]: [...current].sort((a, b) => a - b),
        },
      };
    }
    case "saveOutcome":
      return {
        ...state,
        plans: {
          ...state.plans,
          [action.protocolId]: {
            ...state.plans[action.protocolId],
            status: "reviewed",
          },
        },
        outcomes: {
          ...state.outcomes,
          [action.protocolId]: {
            result: action.result,
            followed: action.followed,
            improvedSymptoms: action.improvedSymptoms ?? [],
            note: action.note ?? "",
            reviewedAt: todayKey(),
          },
        },
      };
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
    if (IS_DEMO) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The session remains usable when local storage is unavailable.
    }
  }, [state]);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
