import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "../data/profile";
import { asset } from "../lib/asset";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-[1360px] px-5 py-24 sm:px-8">
      <SectionHeading index="04" kicker="UPLINK" title="Establish Contact">
        Open to robotics, embedded systems and autonomy roles — plus collaborations on
        serious engineering problems.
      </SectionHeading>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Direct channels */}
        <Reveal className="min-w-0">
          <div className="hud-corner flex h-full flex-col overflow-hidden rounded-xl border border-line-bright bg-surface/80">
            <div className="relative h-40 shrink-0 overflow-hidden">
              <img
                src={asset("projects/contact-cover.svg")}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/35 to-transparent" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(139,92,246,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.22) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                  maskImage: "linear-gradient(to top, black 20%, transparent 90%)",
                  WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 90%)",
                }}
              />
              <div className="absolute left-4 top-3 flex items-center gap-1.5 rounded-full border border-line-bright bg-base/80 px-2.5 py-1 font-mono text-[10px] tracking-widest text-ink backdrop-blur">
                <span className="pulse-dot size-1.5 rounded-full bg-success" />
                <span className="text-ink-dim">OPERATOR_ONLINE</span>
              </div>
              <div className="absolute inset-x-4 bottom-3 flex items-end gap-3.5">
                <span className="relative shrink-0">
                  <img
                    src={asset("projects/img-000.jpg")}
                    alt=""
                    aria-hidden
                    className="relative size-16 rounded-xl border border-line-bright object-cover object-top"
                  />
                  <span className="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-surface bg-success" />
                </span>
                <span className="min-w-0 pb-0.5">
                  <span className="block truncate font-display text-xl font-bold leading-tight text-ink">
                    {profile.name}
                  </span>
                  <span className="block truncate font-mono text-[11px] tracking-[0.18em] text-violet-soft">
                    {profile.role.toUpperCase()}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 pt-5">
            <p className="font-mono text-[11px] tracking-[0.3em] text-ink-faint">// DIRECT_CHANNELS</p>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href={profile.emailHref}
                className="group flex items-center gap-4 rounded-lg border border-line bg-surface-2/60 p-4 transition-all hover:border-violet/50 hover:shadow-glow-violet"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-md border border-violet/40 bg-violet/10 text-violet-soft">
                  <Mail size={19} />
                </span>
                <span className="min-w-0 break-words">
                  <span className="block font-mono text-[10px] tracking-widest text-ink-faint">EMAIL</span>
                  <span className="text-[15px] text-ink group-hover:text-violet-soft transition-colors">
                    {profile.email}
                  </span>
                </span>
              </a>

              <a
                href={profile.phoneHref}
                className="group flex items-center gap-4 rounded-lg border border-line bg-surface-2/60 p-4 transition-all hover:border-cyan/50 hover:shadow-glow-cyan"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-md border border-cyan/40 bg-cyan/10 text-cyan">
                  <Phone size={19} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] tracking-widest text-ink-faint">PHONE</span>
                  <span className="text-[15px] text-ink group-hover:text-cyan transition-colors">
                    {profile.phone}
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-6 border-t border-line/70 pt-6">
              <p className="font-mono text-[11px] tracking-[0.3em] text-ink-faint">// NETWORK</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-line bg-surface-2/60 p-3.5 transition-all hover:border-violet/50"
                >
                  <Github size={18} className="text-ink-dim group-hover:text-violet-soft" />
                  <span className="font-mono text-[11px] tracking-wider text-ink-dim group-hover:text-ink">
                    GITHUB
                  </span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-line bg-surface-2/60 p-3.5 transition-all hover:border-violet/50"
                >
                  <Linkedin size={18} className="text-ink-dim group-hover:text-violet-soft" />
                  <span className="font-mono text-[11px] tracking-wider text-ink-dim group-hover:text-ink">
                    LINKEDIN
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 pt-6 font-mono text-[11px] tracking-widest text-ink-faint">
              <MapPin size={13} className="text-violet-soft" /> {profile.location} ·{" "}
              {profile.education.short}
            </div>
            </div>
          </div>
        </Reveal>

        {/* Mailto form */}
        <Reveal delay={0.1} className="min-w-0">
          <form
            className="hud-corner flex h-full flex-col rounded-xl border border-line-bright bg-surface/80 p-6"
            action={`mailto:${profile.email}`}
            method="post"
            encType="text/plain"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] tracking-[0.3em] text-ink-faint">// TRANSMIT_MESSAGE</p>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-success">
                <span className="pulse-dot size-1.5 rounded-full bg-success" /> CHANNEL_OPEN
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] tracking-widest text-ink-dim">OPERATOR_ID</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="hud-input rounded-md border border-line bg-surface-3/60 px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-violet"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] tracking-widest text-ink-dim">RETURN_CHANNEL</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@domain.com"
                  className="hud-input rounded-md border border-line bg-surface-3/60 px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-violet"
                />
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] tracking-widest text-ink-dim">SUBJECT</span>
              <input
                type="text"
                name="subject"
                required
                placeholder="Let's work together — here's the mission"
                className="hud-input rounded-md border border-line bg-surface-3/60 px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-violet"
              />
            </label>

            <label className="mt-4 flex flex-1 flex-col gap-1.5">
              <span className="font-mono text-[11px] tracking-widest text-ink-dim">PAYLOAD</span>
              <textarea
                name="body"
                required
                rows={5}
                placeholder="Mission details, requirements, timeline..."
                className="hud-input flex-1 resize-none rounded-md border border-line bg-surface-3/60 px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-violet"
              />
            </label>

            <button
              type="submit"
              className="group mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-violet px-5 py-3 text-[15px] font-semibold text-white transition-all hover:shadow-glow-violet"
            >
              <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Transmit Message
            </button>
            <p className="mt-3 text-center font-mono text-[10px] tracking-widest text-ink-faint">
              OPENS YOUR MAIL CLIENT · OR ADD ME ON LINKEDIN FOR A FASTER RESPONSE
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}