import { ArrowUp } from "lucide-react";
import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line/70 bg-base-2/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-md border border-line-bright bg-surface-2 font-mono text-xs font-bold text-violet-soft">
            RR
          </span>
          <div>
            <p className="font-mono text-[11px] tracking-widest text-ink-dim">
              {profile.firstName}_{profile.lastName.toUpperCase()}
            </p>
            <p className="font-mono text-[9px] tracking-widest text-ink-faint">
              © {year} · ALL SYSTEMS OPERATIONAL
            </p>
          </div>
        </div>

        <p className="hidden font-mono text-[10px] tracking-widest text-ink-faint lg:block">
          BUILD: ROS2 · NAV2 · SLAM · UAV · EMBEDDED
        </p>

        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-md border border-line-bright bg-surface-2 px-4 py-2.5 font-mono text-[11px] tracking-widest text-ink-dim transition-all hover:border-violet/60 hover:text-violet-soft hover:shadow-glow-violet"
        >
          BACK_TO_TOP
          <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}