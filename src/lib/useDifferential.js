import { useEffect, useRef, useState } from "react";
import { requestDifferential } from "./differential.js";

export function useDifferential() {
  const controllerRef = useRef(null);
  const [state, setState] = useState({ status: "idle", result: null, error: null });

  useEffect(() => () => controllerRef.current?.abort(), []);

  async function run(input) {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState((current) => ({ ...current, status: "loading", error: null }));
    try {
      const result = await requestDifferential({ ...input, signal: controller.signal });
      setState({ status: "ready", result, error: null });
      return result;
    } catch (error) {
      if (controller.signal.aborted) return null;
      const message = error?.message || "Something went wrong.";
      setState({ status: "error", result: null, error: message });
      return null;
    }
  }

  return {
    ...state,
    run,
    reset: () => setState({ status: "idle", result: null, error: null }),
  };
}
