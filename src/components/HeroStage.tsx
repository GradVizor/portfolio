import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import SceneManipulator from "./SceneManipulator";
import SceneMobility from "./SceneMobility";
import SceneAerial from "./SceneAerial";
import { groundGrid, linePaths, type Camera } from "../lib/line3d";
import type { SceneView } from "./sceneVariants";
import { ProjectedPaths } from "./Label3d";

const STAGES = [
  { num: "01", label: "MANIPULATION", mode: "MOVEIT 6DOF", accent: "#a78bfa", Scene: SceneManipulator },
  { num: "02", label: "MOBILITY", mode: "NAV2 SLAM", accent: "#67e8f9", Scene: SceneMobility },
  { num: "03", label: "AERIAL", mode: "PX4 WFB", accent: "#f0abfc", Scene: SceneAerial },
] as const;

const BASE_CAM: Camera = { azimuth: 0.62, elevation: 0.34, f: 1180, k: 1.12, cx: 985, cy: 495 };

const GRID_MINOR = "rgba(148,163,184,0.2)";

const FLASH_GRID = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(103,232,249,0.18) 0 1px, transparent 1px 20px), repeating-linear-gradient(90deg, rgba(167,139,250,0.18) 0 1px, transparent 1px 20px)",
};

interface HeroStageProps {
  sectionRef: RefObject<HTMLElement | null>;
  reduce: boolean;
}

export default function HeroStage({ sectionRef, reduce }: HeroStageProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(stageRef, { amount: 0.15 });
  const running = inView && !reduce;

  const [coarse] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
  );

  const [stage, setStage] = useState(0);
  const stageIdx = useRef(0);
  const prevScroll = useRef(0);
  const lockUntil = useRef(0);

  const [view, setView] = useState<SceneView>(() => ({ cam: BASE_CAM, tick: 0, exit: 0 }));
  const exitRef = useRef(0);

  const scrollYProgress = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  }).scrollYProgress;

  const go = (next: number) => {
    lockUntil.current = performance.now() + 1400;
    stageIdx.current = next;
    setStage(next);
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const exit = Math.max(0, Math.min(1, (v - 0.84) / 0.16));
    exitRef.current = exit;
    setView((prev) =>
      Math.abs(prev.exit - exit) > 0.001 ? { ...prev, exit } : prev,
    );
    if (reduce || coarse || performance.now() < lockUntil.current) return;
    const up = v > prevScroll.current;
    let next = stageIdx.current;
    if (up) {
      if (v > 0.64) next = 2;
      else if (v > 0.33) next = 1;
      else next = 0;
    } else {
      if (v < 0.28) next = 0;
      else if (v < 0.58) next = 1;
      else next = 2;
    }
    prevScroll.current = v;
    if (next !== stageIdx.current) go(next);
  });

  /* rAF camera loop — re-projects scenes every frame while visible */
  useEffect(() => {
    if (!running || reduce) return;
    let raf = 0;
    let sec = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - prev);
      prev = now;
      sec += dt / 1000;
      const p = scrollYProgress.get();
      const az = BASE_CAM.azimuth + p * 0.75 + Math.sin(sec * 0.4) * 0.06 + sx.get() * 0.2;
      const el = BASE_CAM.elevation + Math.sin(p * Math.PI * 0.5) * 0.04 - sy.get() * 0.1;
      setView(() => ({
        cam: { ...BASE_CAM, azimuth: az, elevation: el },
        tick: sec,
        exit: exitRef.current,
      }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, reduce, scrollYProgress]);

  /* coarse pointer → auto-cycle stages */
  useEffect(() => {
    if (!coarse || reduce || !inView) return;
    const id = setInterval(() => {
      if (performance.now() < lockUntil.current) return;
      const next = (stageIdx.current + 1) % STAGES.length;
      stageIdx.current = next;
      setStage(next);
    }, 4000);
    return () => clearInterval(id);
  }, [coarse, reduce, inView]);

  /* parallax springs */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 18, mass: 0.6 };
  const sx = useSpring(mx, springCfg);
  const sy = useSpring(my, springCfg);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || coarse) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetParallax = () => {
    mx.set(0);
    my.set(0);
  };

  const grid = useMemo(() => groundGrid(430, 430, 86, GRID_MINOR, 1), []);

  /* stage-change FX */
  const flashed = useRef(false);
  useEffect(() => {
    flashed.current = true;
  }, []);
  const [fxKey, setFxKey] = useState(0);
  useEffect(() => {
    if (flashed.current && !reduce) setFxKey((k) => k + 1);
  }, [stage, reduce]);

  const current = STAGES[stage];

  return (
    <div ref={stageRef} className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="block h-full w-full"
      >
        <ProjectedPaths paths={linePaths(grid, view.cam)} />
        {STAGES.map((s, i) => (
          <s.Scene
            key={s.num}
            active={stage === i}
            running={running}
            reduce={reduce}
            view={view}
          />
        ))}
      </svg>

      {/* parallax catcher */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2]"
        onMouseMove={handleMove}
        onMouseLeave={resetParallax}
      />

      {/* stage-change FX */}
      {fxKey > 0 && (
        <div key={fxKey} className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 w-[40vw] bg-gradient-to-r from-transparent via-cyan/10 to-transparent"
            initial={{ x: "-40vw", opacity: 1 }}
            animate={{ x: "120vw", opacity: 0.6 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0"
            style={FLASH_GRID}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      )}

      {/* HUD — top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-5 pt-4 font-mono text-[10px] tracking-widest sm:px-8 sm:pt-5">
        <div className="flex flex-col gap-1">
          <span className="text-violet-soft">SYS://WORLD_SIM</span>
          <span style={{ color: current.accent }}>{current.label}</span>
        </div>
        <span className="flex items-center gap-1.5 text-cyan">
          <span className="pulse-dot size-1.5 rounded-full bg-cyan" />
          LIVE
        </span>
      </div>

      </div>
  );
}