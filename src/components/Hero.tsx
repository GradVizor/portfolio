import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { heroTicker, profile } from "../data/profile";
import { useTypewriter } from "../hooks/useTypewriter";
import { asset } from "../lib/asset";

export default function Hero() {
  const typed = useTypewriter({ texts: profile.roles });
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-10">
      {/* perspective floor grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46vh]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(139,92,246,0.14) 1px, transparent 1px), linear-gradient(to top, rgba(34,211,238,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 28px",
          transform: "perspective(700px) rotateX(62deg)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* -- Left: copy -- */}
        <div>
          <motion.div
            {...fadeUp(0.05)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line-bright bg-surface-2/80 px-4 py-1.5"
          >
            <span className="pulse-dot size-2 rounded-full bg-success" />
            <span className="font-mono text-[11px] tracking-[0.22em] text-ink-dim">
              {profile.status}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="glitch font-display text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
            data-text={profile.name}
          >
            <span>
              {profile.firstName}{" "}
              <span className="bg-gradient-to-r from-violet-soft via-violet to-cyan bg-clip-text text-transparent">
                {profile.lastName}
              </span>
            </span>
          </motion.h1>

          <motion.div {...fadeUp(0.25)} className="mt-5 flex items-center gap-2 font-mono text-sm text-cyan sm:text-[16px]">
            <span className="text-ink-faint">&gt;</span>
            <span className="min-h-6">{typed}</span>
            <span className="caret -ml-1 text-violet-soft">▍</span>
          </motion.div>

          <motion.p {...fadeUp(0.32)} className="mt-5 max-w-xl leading-relaxed text-ink-dim">
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-violet px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-glow-violet"
            >
              <span className="relative z-10">View Projects</span>
              <ArrowDown size={15} className="relative z-10 transition-transform group-hover:translate-y-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-deep to-violet transition-transform duration-300 group-hover:translate-x-0" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line-bright bg-surface-2/70 px-5 py-3 text-sm text-ink transition-colors hover:border-violet/60 hover:text-violet-soft"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.48)} className="mt-9 flex items-center gap-5 text-ink-dim">
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
                className="grid size-10 place-items-center rounded-md border border-line bg-surface-2/70 text-ink-dim transition-all hover:-translate-y-0.5 hover:border-violet hover:text-violet-soft hover:shadow-glow-violet"
              >
                <Icon size={17} />
              </a>
            ))}
            <span className="hidden items-center gap-1.5 font-mono text-[11px] text-ink-faint sm:flex">
              <MapPin size={12} /> {profile.location}
            </span>
          </motion.div>
        </div>

        {/* -- Right: HUD portrait -- */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[340px]"
        >
          <div className="hud-corner relative aspect-[4/4.6] overflow-hidden rounded-xl border border-line-bright bg-surface-2">
            <div className="radar-sweep absolute inset-[-35%] opacity-60" />
            <img
              src={asset("projects/img-000.jpg")}
              alt="Reishabh Rathore — portrait"
              className="relative h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-base/25" />
            {/* HUD overlay data */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 font-mono text-[10px] tracking-widest text-ink-dim">
              <span className="text-cyan">● LIVE</span>
              <span>ID: RR-0026</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 py-3">
              <span className="font-mono text-[10px] tracking-widest text-ink-dim">ROBOTICS.ENGINEER</span>
              <span className="font-mono text-[10px] tracking-widest text-violet-soft">OP-READY</span>
            </div>
          </div>

          {/* floating telemetry chips */}
          <div className="float-slow absolute -left-6 top-8 hidden rounded-md border border-line-bright bg-base/85 px-3 py-2 font-mono text-[10px] tracking-wider text-ink-dim backdrop-blur sm:block">
            <span className="text-violet-soft">SLAM</span> · NOISE <span className="text-ink">-30%</span>
          </div>
          <div
            className="float-slow absolute -right-5 bottom-16 hidden rounded-md border border-line-bright bg-base/85 px-3 py-2 font-mono text-[10px] tracking-wider text-ink-dim backdrop-blur sm:block"
            style={{ animationDelay: "-3s" }}
          >
            <span className="text-cyan">RANGE</span> · 2.8 km
          </div>
        </motion.div>
      </div>

      {/* Tech ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="relative z-10 mx-auto mt-16 w-full max-w-6xl overflow-hidden border-y border-line/70 bg-base/60 px-0 backdrop-blur-sm"
      >
        <div className="flex items-center">
          <div className="flex items-center gap-2 whitespace-nowrap border-r border-line px-4 py-2.5 font-mono text-[10px] tracking-widest text-violet-soft">
            TECH_STACK
          </div>
          <div className="relative flex-1 overflow-hidden py-2.5">
            <div className="ticker-track flex w-max items-center gap-8 whitespace-nowrap font-mono text-[11px] tracking-wider text-ink-faint">
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
    </section>
  );
}