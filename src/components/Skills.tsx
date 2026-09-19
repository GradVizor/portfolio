import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { skillGroups } from "../data/projects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const SEGMENTS = 20;
  const active = Math.max(0, Math.min(SEGMENTS, Math.round((level / 100) * SEGMENTS)));
  const fillPct = (active / SEGMENTS) * 100;

  // color-mix: violet at the tail, cyan at the leading edge (index / SEGMENTS-1).
  const segColor = (i: number) =>
    `color-mix(in oklab, var(--color-cyan) ${Math.round((i / Math.max(1, SEGMENTS - 1)) * 100)}%, var(--color-violet))`;

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between font-mono text-[12px]">
        <span className="text-ink-dim">{name}</span>
        <span className="text-violet-soft">{level}%</span>
      </div>

      <div
        role="meter"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency ${level}%`}
        className="relative flex h-3.5 items-stretch gap-[2px]"
      >
        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const filled = i < active;
          return (
            <motion.div
              key={i}
              className="relative flex-1 rounded-[1px]"
              style={{ backgroundColor: "var(--color-surface-3)", transformOrigin: "center" }}
              initial={
                reduce
                  ? { opacity: filled ? 1 : 0.35, scaleY: 1 }
                  : { opacity: 0.35, scaleY: 0.5 }
              }
              animate={
                inView || reduce
                  ? { opacity: filled ? 1 : 0.35, scaleY: 1 }
                  : {}
              }
              transition={{ duration: 0.25, delay: delay + (filled ? i * 0.018 : 0), ease: "easeOut" }}
            >
              {filled && (
                <motion.div
                  className="absolute inset-0 rounded-[1px]"
                  style={{
                    background: `linear-gradient(180deg, rgba(255,255,255,0.14), transparent 35%), ${segColor(i)}`,
                  }}
                  initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                  animate={inView || reduce ? { opacity: 1 } : {}}
                  transition={{ duration: 0.2, delay: delay + i * 0.018 }}
                />
              )}
            </motion.div>
          );
        })}

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-y-[3px] w-[2px] bg-cyan"
          style={{ left: `calc(${fillPct}% - 1px)`, boxShadow: "0 0 6px rgba(34,211,238,0.8)" }}
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={inView || reduce ? { opacity: active > 0 ? 1 : 0 } : {}}
          transition={{ delay: delay + active * 0.018, duration: 0.3 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative border-y border-line/60 bg-base-2/50">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading index="02" kicker="SYSTEMS" title="Technical Arsenal">
          Languages, frameworks and hardware I operate with across the autonomy stack.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.07}>
              <div className="hud-corner flex h-full flex-col rounded-xl border border-line-bright bg-surface/80 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-display text-[16px] font-semibold text-ink">{group.title}</h3>
                  <span className="rounded border border-line-bright px-2 py-0.5 font-mono text-[9px] tracking-widest text-ink-faint">
                    {group.mono}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  {group.skills.map((s, si) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} delay={gi * 0.08 + si * 0.12} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* toolbox card */}
          <Reveal delay={0.3}>
            <div className="flex h-full flex-col rounded-xl border border-dashed border-line-bright bg-transparent p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-[16px] font-semibold text-ink">Toolbox</h3>
                <span className="rounded border border-line-bright px-2 py-0.5 font-mono text-[9px] tracking-widest text-ink-faint">
                  TOOLS
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Git", "Docker", "Make", "CMake", "ROS 2", "micro-ROS", "Fusion 360", "KiCAD",
                  "PX4", "MAVLink", "MAVSDK", "OpenHD", "WFB-ng", "Gazebo", "RViz", "Linux",
                  "Shell", "Arm GCC", "OpenOCD", "VS Code", "Nginx",
                ].map((t) => (
                  <span
                    key={t}
                    className="cursor-default rounded-md border border-line bg-surface-2/80 px-2.5 py-1 font-mono text-[11px] text-ink-dim transition-colors hover:border-cyan/50 hover:text-cyan"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}