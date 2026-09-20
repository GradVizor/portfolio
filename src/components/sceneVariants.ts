import type { Variants } from "framer-motion";
import type { Camera } from "../lib/line3d";

export interface SceneView {
  cam: Camera;
  tick: number;
  exit: number;
}

export interface SceneProps {
  active: boolean;
  running: boolean;
  reduce: boolean;
  view: SceneView;
}

const easeSmooth = [0.4, 0, 0.2, 1] as const;

export function makeVariants(reduce: boolean) {
  const drawDur = reduce ? 0 : 0.55;
  const fadeDur = reduce ? 0 : 0.5;
  return {
    draw: {
      hidden: reduce ? { opacity: 0 } : { pathLength: 0, opacity: 0 },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: drawDur, ease: easeSmooth },
      },
      exit: {
        pathLength: 0,
        opacity: 0,
        transition: { duration: reduce ? 0 : 0.45, ease: easeSmooth },
      },
    } as Variants,
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: fadeDur, ease: easeSmooth } },
      exit: { opacity: 0, transition: { duration: reduce ? 0 : 0.5, ease: easeSmooth } },
    } as Variants,
    group: {
      hidden: reduce ? {} : { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
      visible: {
        transition: {
          staggerChildren: reduce ? 0 : 0.03,
          delayChildren: reduce ? 0 : 0.05,
          staggerDirection: 1,
        },
      },
    } as Variants,
    art: {
      hidden: reduce ? {} : { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
      visible: {
        transition: {
          staggerChildren: reduce ? 0 : 0.03,
          delayChildren: reduce ? 0 : 0.04,
          staggerDirection: 1,
        },
      },
    } as Variants,
    dims: {
      hidden: reduce ? {} : { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
      visible: {
        transition: {
          staggerChildren: reduce ? 0 : 0.02,
          delayChildren: reduce ? 0 : 0.15,
          staggerDirection: 1,
        },
      },
    } as Variants,
  };
}

export type SceneVariants = ReturnType<typeof makeVariants>;

export const MONO = "'JetBrains Mono', monospace";