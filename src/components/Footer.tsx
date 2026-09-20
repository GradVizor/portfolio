import { ArrowUp } from "lucide-react";
import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line/70 bg-base-2/60">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-8 px-5 py-14 sm:flex-row sm:px-8">
        <div className="flex items-center gap-4">
          <span className="grid size-10 place-items-center rounded-md border border-line-bright bg-surface-2 font-mono text-[15px] font-bold text-violet-soft">
            RR
          </span>
          <div>
            <p
              className="font-mono text-[13px] font-bold tracking-widest text-violet-soft"
              style={{ filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.45))" }}
            >
              {profile.firstName}_{profile.lastName.toUpperCase()}
            </p>
            <p className="mt-0.5 font-mono text-[11px] tracking-widest text-ink-faint">
              © {year} · ALL SYSTEMS OPERATIONAL
            </p>
          </div>
        </div>

        <p
          className="text-center font-display text-[15px] font-bold leading-snug tracking-wide sm:flex-1 lg:max-w-md lg:text-center xl:text-base"
          style={{
            backgroundImage: "linear-gradient(to right, #a78bfa, #e9ebf4 45%, #22d3ee)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 14px rgba(139, 92, 246, 0.45))",
          }}
        >
          "If it moves, flies, walks, or thinks on its own — I want to build it."
        </p>

        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-md bg-violet px-5 py-3 font-mono text-[12px] font-bold tracking-widest text-white transition-all hover:bg-violet-deep hover:shadow-glow-violet"
        >
          BACK_TO_TOP
          <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}