import { useEffect, useState } from "react";
import { requestDifferential } from "./differential.js";

/**
 * Runs the differential whenever the symptom list changes.
 * Returns { status, result, error, reload }.
 *   status: "idle" | "loading" | "ready" | "error"
 */
export function useDifferential(symptomIds, babyAgeMonths) {
  const [state, setState] = useState({ status: "idle", result: null, error: null });
  const [nonce, setNonce] = useState(0);
  const key = symptomIds.join("|");

  useEffect(() => {
    if (symptomIds.length === 0) {
      setState({ status: "idle", result: null, error: null });
      return;
    }
    const controller = new AbortController();
    setState((s) => ({ ...s, status: "loading", error: null }));
    requestDifferential({ symptoms: symptomIds, babyAgeMonths, signal: controller.signal })
      .then((result) => setState({ status: "ready", result, error: null }))
      .catch((err) => {
        if (controller.signal.aborted) return;
        setState({ status: "error", result: null, error: err.message || "Something went wrong." });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, babyAgeMonths, nonce]);

  return { ...state, reload: () => setNonce((n) => n + 1) };
}
