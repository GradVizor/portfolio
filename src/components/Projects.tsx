import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  const featured = projects.filter((p) => p.category !== "COMPETITION" && p.id !== "bare-metal");

  return (
    <section id="projects" className="relative mx-auto max-w-[1360px] px-5 py-24 sm:px-8">
      <SectionHeading index="02" kicker="MISSIONS" title="Mission Log — Projects">
        Selected builds from the bench: autonomous navigation, manipulation, precision
        instrumentation and embedded engineering. Source, demos and full logs included.
      </SectionHeading>

      <div className="flex flex-col gap-8">
        {featured.map((p, i) => (
          <Reveal key={p.id} y={40}>
            <ProjectCard project={p} flip={i % 2 === 1} />
          </Reveal>
        ))}

        <Reveal y={40}>
          <ProjectCard project={projects.find((p) => p.id === "bare-metal")!} flip />
        </Reveal>

        <Reveal y={40}>
          <ProjectCard project={projects.find((p) => p.id === "robocon")!} flip />
        </Reveal>
      </div>
    </section>
  );
}