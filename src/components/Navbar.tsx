import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // active section detection
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    if (window.matchMedia("(min-width: 768px)").matches) return; // desktop: native hash nav
    setOpen(false);
    // Defer scroll until the drawer collapse animation has finished; otherwise
    // Chrome's scroll anchoring undoes the jump when the layout above shrinks.
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView();
      history.pushState(null, "", `#${id}`);
    }, 320);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-base/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-md border border-line-bright bg-surface-2 font-mono text-xs font-bold text-violet-soft transition-colors group-hover:border-violet">
            RR
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-ink-dim">
            REISHABH<span className="text-violet">_</span>RATHORE
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative rounded-md px-3.5 py-2 text-[13px] transition-colors ${
                active === id ? "text-ink" : "text-ink-dim hover:text-ink"
              }`}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-md border border-line-bright bg-surface-2"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{label}</span>
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="grid size-9 place-items-center rounded-md border border-line-bright bg-surface-2 text-ink-dim md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-line bg-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(id);
                  }}
                  className="rounded-md px-3 py-2.5 font-mono text-[13px] tracking-wider text-ink-dim hover:bg-surface-2 hover:text-ink"
                >
                  {label.toUpperCase()}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}