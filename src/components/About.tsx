import { GraduationCap, Cpu } from "lucide-react";
import { profile } from "../data/profile";
import { aboutFacts } from "../data/projects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading index="01" kicker="IDENTITY" title="Mission Brief">
        Robotics &amp; automation engineer focused on intelligent systems that operate in the real
        world — ground robots, manipulators and aerial platforms.
      </SectionHeading>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <p className="leading-relaxed text-ink-dim">
            I'm a final-year&nbsp;
            <span className="text-ink">Electronics &amp; Communication Engineering</span> student at{" "}
            {profile.education.short}, building autonomy from the silicon up. My work spans{" "}
            <span className="text-ink">
              LiDAR SLAM, ROS 2 navigation, motion planning, embedded drivers and UAV communication
              stacks
            </span>{" "}
            — from bare-metal STM32 drivers to multi-kilometre drone links.
          </p>
          <p className="mt-4 leading-relaxed text-ink-dim">
            As one of the top 15–20 interns selected from 500+ applicants at{" "}
            <span className="text-ink">ZenithraTech (MapmyIndia)</span>, I shipped defense-grade UAV
            features end-to-end. Away from the bench, I led the{" "}
            <span className="text-ink">Electronics and Robotics Society</span> at IIIT Jabalpur —
            running 20+ workshops and mentoring 250+ enthusiasts.
          </p>

          {/* Education card */}
          <div className="hud-corner mt-8 rounded-xl border border-line-bright bg-surface-2/70 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg border border-violet/40 bg-violet/10 text-violet-soft">
                  <GraduationCap size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{profile.education.degree}</p>
                  <p className="font-mono text-[11px] tracking-wider text-ink-dim">
                    {profile.education.institution}
                  </p>
                </div>
              </div>
              <span className="hidden font-mono text-[11px] tracking-wider text-ink-faint sm:block">
                {profile.education.duration}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Facts grid */}
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {aboutFacts.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.08}>
              <div className="group rounded-xl border border-line bg-surface/70 p-5 transition-all hover:-translate-y-1 hover:border-violet/50 hover:shadow-glow-violet">
                <p className="font-mono text-[10px] tracking-[0.25em] text-ink-faint">{f.k}</p>
                <p className="mt-2 font-display text-xl font-bold text-ink group-hover:text-violet-soft">
                  {f.v}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-ink-dim">{f.d}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.32} className="sm:col-span-2">
            <div className="flex items-center gap-3 rounded-xl border border-line-bright bg-surface-2/70 p-4">
              <Cpu size={18} className="shrink-0 text-cyan" />
              <p className="font-mono text-[12px] leading-relaxed text-ink-dim">
                <span className="text-ink">Systems I breathe:</span> ROS 2 · Nav2 · Cartographer ·
                MoveIt-2 · PX4 · MAVSDK · OpenHD / WFB-ng · micro-ROS
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}