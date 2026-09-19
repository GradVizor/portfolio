import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  texts: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}

/** Cycling typewriter hook. Returns the currently typed string. */
export function useTypewriter({
  texts,
  typeMs = 55,
  deleteMs = 28,
  holdMs = 1800,
}: UseTypewriterOptions): string {
  const reduce = useReducedMotion();
  const [state, setState] = useState({ text: reduce ? texts[0] ?? "" : "", i: 0, deleting: false });

  useEffect(() => {
    if (reduce) return;
    let timeout: number;
    const current = texts[state.i % texts.length];

    if (!state.deleting) {
      if (state.text.length < current.length) {
        timeout = window.setTimeout(
          () => setState((s) => ({ ...s, text: current.slice(0, s.text.length + 1) })),
          typeMs
        );
      } else {
        timeout = window.setTimeout(() => setState((s) => ({ ...s, deleting: true })), holdMs);
      }
    } else {
      if (state.text.length > 0) {
        timeout = window.setTimeout(
          () => setState((s) => ({ ...s, text: current.slice(0, s.text.length - 1) })),
          deleteMs
        );
      } else {
        timeout = window.setTimeout(
          () => setState((s) => ({ ...s, i: s.i + 1, deleting: false })),
          260
        );
      }
    }
    return () => window.clearTimeout(timeout);
  }, [state, texts, typeMs, deleteMs, holdMs, reduce]);

  return state.text;
}