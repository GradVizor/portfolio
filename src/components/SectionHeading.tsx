import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  title: string;
  kicker?: string;
  children?: ReactNode;
}

export default function SectionHeading({ index, title, kicker, children }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-12">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-violet-soft">
          <span className="text-ink-faint">{index}</span>
          <span className="h-px w-10 bg-violet/50" />
          <span>{kicker ?? "SYS"}</span>
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {children && <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">{children}</p>}
      </div>
    </Reveal>
  );
}