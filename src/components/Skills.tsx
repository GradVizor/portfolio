import {
  Bot,
  Boxes,
  BrainCircuit,
  CircuitBoard,
  Code2,
  RadioTower,
  Route,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillGroups } from "../data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const groupIcons: Record<string, LucideIcon> = {
  languages: Code2,
  autonomy: Route,
  perception: BrainCircuit,
  embedded: CircuitBoard,
  aerial: RadioTower,
  sim2real: Boxes,
  agentic: Bot,
  leadership: Users,
};

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-[1360px] px-5 py-24 sm:px-8">
      <SectionHeading index="02" kicker="CAPABILITIES" title="Systems & Skills">
        The toolkit behind everything in this log — languages, autonomy stacks, embedded
        silicon and the leadership that ties the missions together.
      </SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => {
          const Icon = groupIcons[group.id];
          return (
            <Reveal key={group.id} delay={i * 0.08} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-xl border border-line bg-surface/70 p-5 transition-all hover:-translate-y-1 hover:border-violet/50 hover:shadow-glow-violet">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-lg border border-violet/40 bg-violet/10 text-violet-soft">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-ink-faint">
                    SK-{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 font-mono text-[11px] tracking-[0.25em] text-ink-faint">
                  {group.category}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-line-bright bg-surface-2 px-2.5 py-1 font-mono text-[11px] leading-none text-ink-dim transition-colors group-hover:border-violet/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <span className="absolute -right-6 -top-6 size-16 rounded-full bg-violet/10 blur-2xl opacity-60 transition-opacity group-hover:opacity-100" />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}