import { ExternalLink, Trophy } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { achievements, experience } from "../data/projects";
import { asset } from "../lib/asset";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const [gallery, setGallery] = useState<{ images: string[]; index: number; title: string } | null>(null);

  return (
    <section id="experience" className="relative border-y border-line/60 bg-base-2/40">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-[1360px] px-5 py-24 sm:px-8">
        <SectionHeading index="03" kicker="TRACK RECORD" title="Deployment History">
          Industry experience leading autonomy work, and the competition record that came with it.
        </SectionHeading>

        {/* Timeline */}
        <div className="relative ml-3 flex flex-col gap-10 border-l border-line-bright sm:ml-4">
          {experience.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 0.1}>
              <div className="relative pl-8 sm:pl-10">
                {/* node */}
                <span className="absolute -left-[7px] top-1.5 grid size-3.5 place-items-center">
                  <span className="absolute size-3.5 rounded-full bg-violet/20" />
                  <span className="size-2 rounded-full bg-violet-soft" />
                </span>

                <div className="hud-corner rounded-xl border border-line-bright bg-surface/80 p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="rounded border border-cyan/40 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] tracking-widest text-cyan">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="mt-2.5 font-display text-xl font-bold text-ink sm:text-2xl">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-violet-soft sm:text-[15px]">
                        {exp.org} · {exp.location}
                      </p>
                    </div>
                    <span className="rounded-md border border-line-bright bg-surface-2 px-3 py-1.5 font-mono text-[11px] tracking-widest text-ink-dim">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{exp.summary}</p>

                  <ul className="mt-4 space-y-2">
                    {exp.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-dim">
                        <span className="mt-1.5 text-cyan">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {exp.demos && (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-line/70 pt-4">
                      {exp.demos.map((d) => (
                        <a
                          key={d.label}
                          href={d.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-line-bright bg-surface-2 px-3 py-1.5 font-mono text-[12px] tracking-wide text-ink-dim transition-colors hover:border-cyan/60 hover:text-cyan"
                        >
                          <ExternalLink size={13} /> {d.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {exp.images && exp.images.length > 0 && (
                    <div className="mt-5 border-t border-line/70 pt-4">
                      <div className="flex items-center gap-2">
                        <span className="pr-0.5 font-mono text-[10px] tracking-widest text-ink-faint">
                          GALLERY
                        </span>
                        {exp.images.map((img, i) => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => {
                              if (exp.images) setGallery({ images: exp.images.map(asset), index: i, title: exp.org });
                            }}
                            aria-label={`${exp.org} — image ${i + 1}`}
                            className="relative h-16 w-12 shrink-0 overflow-hidden rounded-sm border border-line/70 opacity-70 transition-all hover:opacity-100 hover:border-neon"
                            style={{ backgroundColor: "#0b0c14" }}
                          >
                            <img src={asset(img)} alt="" loading="lazy" className="h-full w-full object-cover" />
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 font-mono text-[10px] tracking-widest text-ink-faint">
                        {String(exp.images.length).padStart(2, "0")} IMAGES // CLICK TO ENLARGE
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Achievements */}
        <div className="mt-16">
          <Reveal>
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-violet-soft">
              <Trophy size={13} />
              <span className="h-px w-8 bg-violet/50" />
              <span>ACHIEVEMENTS</span>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-xl border border-line-bright bg-surface/80 p-5 transition-all hover:-translate-y-1 hover:border-violet/50 hover:shadow-glow-violet">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-ink-faint">{a.date}</span>
                    <span className="rounded border border-violet/40 bg-violet/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-violet-soft">
                      {a.meta}
                    </span>
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-ink">{a.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{a.detail}</p>
                  <span className="absolute -right-6 -top-6 size-16 rounded-full bg-violet/10 blur-2xl transition-opacity opacity-60 group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      {createPortal(
        <Lightbox
          open={gallery !== null}
          images={gallery?.images ?? []}
          index={gallery?.index ?? 0}
          title={gallery?.title ?? "Gallery"}
          onClose={() => setGallery(null)}
          onNavigate={(i) => setGallery((g) => (g ? { ...g, index: i } : g))}
        />,
        document.body,
      )}
    </section>
  );
}