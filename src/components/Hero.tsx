import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { heroTicker, profile } from "../data/profile";
import { useTypewriter } from "../hooks/useTypewriter";
import HeroStage from "./HeroStage";

export default function Hero() {
  const typed = useTypewriter({ texts: profile.roles });
  const reduce = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section ref={sectionRef} id="top" className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* full-bleed 3D stage */}
        <HeroStage sectionRef={sectionRef} reduce={reduce} />

        {/* readability scrim */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-[#060609]/60 via-[#060609]/20 to-transparent"
        />

        {/* -- Copy overlay -- */}
        <div className="relative z-10 flex min-h-0 flex-1 items-center pl-10 pr-5 pt-16 sm:pl-16 sm:pr-8 sm:pt-20">
          <div className="w-full max-w-2xl">
            <motion.div
              {...fadeUp(0.05)}
              className="mb-4 sm:mb-7 inline-flex items-center gap-2.5 rounded-full border border-line-bright bg-surface-2/80 px-5 py-2"
            >
              <span className="pulse-dot size-2 rounded-full bg-success" />
              <span className="font-mono text-xs tracking-[0.22em] text-ink-dim">
                {profile.status}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.15)}
              className="glitch font-display text-[clamp(1.9rem,9vw,4.25rem)] font-bold leading-[0.95] tracking-tight"
              data-text={profile.name}
            >
              <span>
                {profile.firstName}{" "}
                <span className="bg-gradient-to-r from-violet-soft via-violet to-cyan bg-clip-text text-transparent">
                  {profile.lastName}
                </span>
              </span>
            </motion.h1>

            <motion.div {...fadeUp(0.25)} className="mt-4 sm:mt-6 flex items-center gap-2 font-mono text-base text-cyan sm:text-lg">
              <span className="text-ink-faint">{' > '}</span>
              <span className="min-h-7">{typed}</span>
              <span className="caret -ml-1 text-violet-soft">▍</span>
            </motion.div>

            <motion.p {...fadeUp(0.32)} className="mt-4 sm:mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim sm:text-xl">
              {profile.tagline}
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="mt-6 sm:mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-violet px-6 py-3.5 text-base font-semibold text-white transition-all hover:shadow-glow-violet"
              >
                <span className="relative z-10">View Projects</span>
                <ArrowDown size={16} className="relative z-10 transition-transform group-hover:translate-y-0.5" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-deep to-violet transition-transform duration-300 group-hover:translate-x-0" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line-bright bg-surface-2/70 px-6 py-3.5 text-base text-ink transition-colors hover:border-violet/60 hover:text-violet-soft"
              >
                Get in touch
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.48)} className="mt-6 sm:mt-10 flex items-center gap-5 text-ink-dim">
              {[
                { icon: Github, href: profile.github, label: "GitHub" },
                { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
                { icon: Mail, href: profile.emailHref, label: "Email" },
                { icon: Phone, href: profile.phoneHref, label: "Phone" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-md border border-line bg-surface-2/70 text-ink-dim transition-all hover:-translate-y-0.5 hover:border-violet hover:text-violet-soft hover:shadow-glow-violet"
                >
                  <Icon size={18} />
                </a>
              ))}
              <span className="hidden items-center gap-1.5 font-mono text-xs text-ink-faint sm:flex">
                <MapPin size={13} /> {profile.location}
              </span>
            </motion.div>
          </div>
        </div>

        {/* -- Tech ticker — now in normal flow at bottom of sticky area -- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="relative z-10 shrink-0 flex overflow-hidden border-y border-line/70 bg-base/60 backdrop-blur-sm [@media(max-height:500px)]:hidden"
        >
          <div className="flex items-center">
            <div className="flex items-center gap-2 whitespace-nowrap border-r border-line px-4 py-3 font-mono text-xs font-semibold tracking-widest text-violet-soft">
              TECH_STACK
            </div>
            <div className="relative flex-1 overflow-hidden py-3">
              <div className="ticker-track flex w-max items-center gap-8 whitespace-nowrap font-mono text-sm font-medium tracking-wider text-ink-faint">
                {[...heroTicker, ...heroTicker].map((item, i) => (
                  <span key={i} className="flex items-center gap-8">
                    {item}
                    <span className="text-violet/70">◆</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}