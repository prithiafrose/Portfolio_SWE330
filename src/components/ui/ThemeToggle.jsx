import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-edge bg-surface text-sub transition-colors duration-300 hover:border-accent/60 hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ y: 18, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -18, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          <Icon name={isDark ? "sun" : "moon"} size={18} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}