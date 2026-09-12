import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, personal } from "../../data/portfolio";
import { useActiveSection } from "../../hooks/useActiveSection";
import ThemeToggle from "../ui/ThemeToggle";
import Icon from "../ui/Icon";

const sectionIds = ["top", "about", "skills", "projects", "experience", "contact"];

export default function Navbar({ theme, onToggleTheme }) {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ticking, setTicking] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking) {
        setTicking(true);
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          setTicking(false);
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ticking]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className={`glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-3 pl-4 transition-shadow duration-300 sm:px-4 ${
          scrolled ? "shadow-lg shadow-black/5 dark:shadow-black/30" : ""
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Prithi Afrose — home"
        >
          <img src={personal.logo} alt="" className="h-8 w-8 rounded-lg" width="32" height="32" />
          <span className="font-display text-sm font-bold tracking-tight text-ink">
            Prithi<span className="text-accent">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative z-10 block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-accent" : "text-sub hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-accent-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-surface text-sub transition-colors duration-300 hover:border-accent/60 hover:text-accent md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              id="mobile-menu"
              className="glass mt-2 overflow-hidden rounded-2xl px-3 py-3 md:hidden"
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-accent-soft text-accent"
                            : "text-sub hover:bg-surface-2 hover:text-ink"
                        }`}
                      >
                        {link.label}
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
            <motion.button
              type="button"
              aria-label="Close menu and return to page"
              className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}