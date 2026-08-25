import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useLocation } from "wouter";

const DISMISS_KEY = "dictation-note-dismissed";
/** Past the hero on every page — fires on reading intent, not on load. */
const SCROLL_TRIGGER = 600;

/**
 * The site's own proof point, surfaced mid-scroll: this whole website was
 * built by dictating to Claude Code, which is exactly what the workshop
 * teaches. Shows once per browser session, never on the post-payment page,
 * and stays dismissed once closed.
 */
export function DictationNote() {
  const [location, navigate] = useLocation();
  const [visible, setVisible] = useState(false);

  const onBookedPage = location === "/workshops/booked";
  const onWorkshopPage = location.startsWith("/workshops") && !onBookedPage;

  useEffect(() => {
    if (onBookedPage) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const onScroll = () => {
      if (window.scrollY > SCROLL_TRIGGER) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onBookedPage]);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  const onLearnHow = () => {
    dismiss();
    if (onWorkshopPage) {
      document.getElementById("sessions")?.scrollIntoView({ block: "start" });
    } else {
      navigate("/workshops");
    }
  };

  return (
    <AnimatePresence>
      {visible && !onBookedPage && (
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          className="fixed bottom-4 left-4 right-4 z-50 border border-foreground bg-background p-5 sm:right-auto sm:max-w-sm"
          style={{ boxShadow: "5px 5px 0 0 var(--foreground)" }}
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute right-3 top-3 p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="section-tag mb-3">[TRUE STORY]</div>
          <p className="mb-4 pr-6 font-mono text-sm leading-relaxed">
            This entire website was built by{" "}
            <span className="font-bold">dictating to Claude Code</span>. Spoken,
            not typed. The workshop teaches you to do the same.
          </p>
          <button
            type="button"
            onClick={onLearnHow}
            className="inline-flex items-center gap-2 border border-foreground px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
          >
            Learn how
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
