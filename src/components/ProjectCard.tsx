import { ExternalLink, Github, Play } from "lucide-react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../data/projects";
import { asset } from "../lib/asset";
import Lightbox from "./Lightbox";

interface ProjectCardProps {
  project: Project;
  flip?: boolean;
  compact?: boolean;
}

export default function ProjectCard({ project, flip = false, compact = false }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glow: { x: 50, y: 50, visible: false } });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (0.5 - py) * 5,
      ry: (px - 0.5) * 6,
      glow: { x: px * 100, y: py * 100, visible: true },
    });
  };

  const visibleHighlights = expanded ? project.highlights : project.highlights.slice(0, 3);
  const hasMore = project.highlights.length > 3;

  const cover = asset(project.cover);

  const [activeIdx, setActiveIdx] = useState(() => {
    const i = project.images.indexOf(project.cover);
    return i >= 0 ? i : 0;
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasGallery = project.images.length > 0;
  const mainSrc = hasGallery ? asset(project.images[activeIdx]) : cover;

  return (
    <div style={{ perspective: 1200 }} className={compact ? "" : flip ? "lg:flex-row-reverse" : ""}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setTilt((t) => ({ ...t, glow: { ...t.glow, visible: false }, rx: 0, ry: 0 }))}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="hud-corner group relative flex flex-col overflow-hidden rounded-2xl border border-line-bright bg-surface/80 backdrop-blur-sm lg:grid lg:grid-cols-[1fr_1.05fr]"
      >
        {/* glow following cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: tilt.glow.visible
              ? `radial-gradient(520px circle at ${tilt.glow.x}% ${tilt.glow.y}%, rgba(139,92,246,0.14), transparent 55%)`
              : undefined,
          }}
        />

        {/* -- Image side -- */}
        <div className={`relative z-[1] flex flex-col overflow-hidden border-line/70 ${flip ? "lg:border-r" : "lg:border-l"}`}>
          <div className={`relative overflow-hidden ${compact ? "h-44" : "h-64 lg:h-auto lg:min-h-[380px] lg:flex-1"}`}>
            <img
              src={mainSrc}
              alt={`${project.title} — visual`}
              loading="lazy"
              onClick={() => hasGallery && setLightboxOpen(true)}
              onKeyDown={(e) => {
                if (hasGallery && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setLightboxOpen(true);
                }
              }}
              role={hasGallery ? "button" : undefined}
              tabIndex={hasGallery ? 0 : undefined}
              aria-label={hasGallery ? `Open gallery for ${project.title} (${project.images.length} images)` : undefined}
              className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${project.cover.endsWith(".svg") ? "object-contain" : ""} ${hasGallery ? "cursor-zoom-in" : ""}`}
              style={{ backgroundColor: "#0b0c14" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent opacity-60" />

            {/* index watermark */}
            <span className="absolute right-4 top-3 font-display text-5xl font-bold text-white/10">
              {project.index}
            </span>

            {/* category chip */}
            <span className="absolute left-4 top-3 rounded border border-cyan/40 bg-base/70 px-2.5 py-1 font-mono text-[10px] tracking-widest text-cyan backdrop-blur">
              {project.category}
            </span>

            {hasGallery && (
              <span className="absolute bottom-3 right-3 rounded border border-line/60 bg-base/70 px-2 py-0.5 font-mono text-[9px] tracking-widest text-ink-soft backdrop-blur">
                IMG {String(activeIdx + 1).padStart(2, "0")}/{String(project.images.length).padStart(2, "0")}
              </span>
            )}
          </div>

          {project.images.length > 1 && (
            <div className="flex items-center gap-2 border-t border-line/70 bg-surface/60 px-3 py-2.5">
              <span className="pr-0.5 font-mono text-[9px] tracking-widest text-ink-faint">VIEW</span>
              {project.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`${project.title} — image ${i + 1}`}
                  aria-pressed={i === activeIdx}
                  className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-sm border transition-all ${
                    i === activeIdx
                      ? "border-neon shadow-glow-cyan"
                      : "border-line/70 opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: "#0b0c14" }}
                >
                  <img src={asset(img)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* -- Body side -- */}
        <div className="relative z-[1] flex flex-col p-6 sm:p-7">
          <div className="mb-3 flex items-center gap-3 font-mono text-[10px] tracking-widest text-ink-faint">
            <span className="flex items-center gap-1.5">
              <span
                className={`size-1.5 rounded-full ${
                  project.status === "ACTIVE" ? "bg-success" : project.status === "IN PROGRESS" ? "bg-warning" : "bg-violet-soft"
                }`}
              />
              {project.status}
            </span>
            <span className="h-3 w-px bg-line-bright" />
            <span>{project.duration}</span>
          </div>

          <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-violet-soft sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-0.5 font-mono text-[11px] tracking-wider text-ink-faint">{project.subtitle}</p>

          <p className="mt-4 text-[14px] leading-relaxed text-ink-dim">{project.summary}</p>

          <ul className="mt-4 space-y-2">
            {visibleHighlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-dim">
                <span className="mt-1.5 text-violet-soft">▸</span>
                {h}
              </li>
            ))}
          </ul>

          {hasMore && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 self-start font-mono text-[11px] tracking-wider text-cyan hover:text-ink transition-colors"
            >
              {expanded ? "▲ COLLAPSE LOG" : "▼ EXPAND LOG"}
            </button>
          )}

          {/* tech chips */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-line-bright bg-surface-3/70 px-2 py-0.5 font-mono text-[10px] tracking-wide text-ink-dim"
              >
                {t}
              </span>
            ))}
          </div>

          {/* actions */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-line/70 pt-5">
            {project.source?.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line-bright bg-surface-2 px-4 py-2 text-[12px] font-medium text-ink transition-all hover:border-violet/60 hover:text-violet-soft hover:shadow-glow-violet"
              >
                <Github size={14} /> {s.label}
              </a>
            ))}
            {project.demos?.map((d) => (
              <a
                key={d.label}
                href={d.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-violet/10 px-4 py-2 text-[12px] font-medium text-violet-soft transition-all hover:bg-violet/25 hover:shadow-glow-violet"
              >
                <Play size={13} /> {d.label}
              </a>
            ))}
            {project.demos?.length === 1 && (
              <span className="ml-auto font-mono text-[10px] tracking-widest text-ink-faint">
                <ExternalLink size={12} className="inline" /> EXT_LINK
              </span>
            )}
          </div>
        </div>
      </div>
      {createPortal(
        <Lightbox
          open={lightboxOpen}
          images={hasGallery ? project.images.map(asset) : []}
          index={activeIdx}
          title={project.title}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActiveIdx}
        />,
        document.body,
      )}
    </div>
  );
}