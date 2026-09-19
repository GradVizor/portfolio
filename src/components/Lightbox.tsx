import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

interface LightboxProps {
  open: boolean;
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-screen HUD-styled image viewer. Locked modal: ESC / X closes,
 * arrow keys / chevrons step through the gallery (wrapping at both ends).
 * Renders nothing when closed or when there is no gallery.
 */
export default function Lightbox({ open, images, index, title, onClose, onNavigate }: LightboxProps) {
  const reduce = useReducedMotion();

  const prev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [images.length, index, onNavigate],
  );
  const next = useCallback(
    () => onNavigate((index + 1) % images.length),
    [images.length, index, onNavigate],
  );

  // Lock body scroll + keyboard controls while open. Never unlock a modal
  // that another (stacked) Lightbox closed before us.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, prev, next]);

  if (!open || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b0c14]/92 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} image viewer`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.2 }}
        onClick={onClose}
      >
        {/* Header rail */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5">
          <span className="font-mono text-[10px] tracking-widest text-ink-dim">
            GALLERY<span className="text-line-bright">//</span> {title.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="grid h-9 w-9 place-items-center border border-line/70 text-ink-soft transition-colors hover:border-neon hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Fixed 3:4 stage — all portfolio photos are now a constant 525×700
            portrait crop, so the stage matches 3:4 exactly (object-contain,
            never cropped) while the image's own blurred cover fills any
            residual letterbox from mixed-ratio legacy files. */}
        <motion.div
          key={images[index]}
          className="relative overflow-hidden rounded-sm border border-line/70"
          style={{ width: "min(77vw, calc(78vh * 3 / 4))", aspectRatio: "3 / 4", backgroundColor: "#0b0c14" }}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[index]}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
          />
          <img
            src={images[index]}
            alt={`${title} — image ${index + 1} of ${images.length}`}
            className="relative h-full w-full object-contain"
          />
        </motion.div>

        {/* Prev / next */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 sm:left-5 top-1/2 z-10 -translate-y-1/2 grid h-11 w-11 place-items-center border border-line/70 bg-base/40 text-ink-soft transition-colors hover:border-neon hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 sm:right-5 top-1/2 z-10 -translate-y-1/2 grid h-11 w-11 place-items-center border border-line/70 bg-base/40 text-ink-soft transition-colors hover:border-neon hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Counter caption */}
        <div className="absolute inset-x-0 bottom-4 sm:bottom-5 z-10 flex justify-center">
          <span className="border border-line/70 bg-base/60 px-3 py-1.5 font-mono text-[10px] tracking-widest text-ink-soft">
            IMG {String(index + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}