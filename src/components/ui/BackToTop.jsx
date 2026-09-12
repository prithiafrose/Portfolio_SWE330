import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ticking, setTicking] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking) {
        setTicking(true);
        requestAnimationFrame(() => {
          const doc = document.documentElement;
          const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
          setProgress(scrolled);
          setVisible(window.scrollY > 600);
          setTicking(false);
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ticking]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-accent via-cyan-400 to-violet-400"
        style={{ scaleX: progress }}
      />
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-[0_10px_28px_-8px_var(--glow)] transition-colors hover:bg-accent-hover sm:bottom-8 sm:right-8"
          >
            <Icon name="arrowUp" size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}