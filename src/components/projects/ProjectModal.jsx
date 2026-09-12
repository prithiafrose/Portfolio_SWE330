import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import Icon from "../ui/Icon";
import { ProjectCover } from "./ProjectCard";

const categoryLabels = {
  web: "Web App",
  app: "Mobile App",
  game: "Game",
};

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const timer = setTimeout(() => dialogRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        type="button"
        aria-label="Close project details"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        ref={dialogRef}
        tabIndex={-1}
        className="glass-card relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl p-6 outline-none focus-visible:outline-2 focus-visible:outline-accent sm:rounded-3xl sm:p-8"
        initial={reduce ? {} : { y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? {} : { y: 60, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {project.badge && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
                <Icon name="star" size={11} strokeWidth={2.5} />
                {project.badge}
              </span>
            )}
            <span className="rounded-full border border-edge px-2.5 py-1 text-xs font-medium text-sub">
              {categoryLabels[project.category]}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-edge bg-surface text-sub transition-colors hover:border-accent/60 hover:text-accent"
            aria-label="Close"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-2xl">
          <ProjectCover project={project} className="aspect-[16/7]" />
        </div>

        <h3 className="mt-5 font-display text-2xl font-bold text-ink">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-sub">{project.description}</p>

        {project.features.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-bold uppercase tracking-wide text-ink">Highlights</h4>
            <ul className="mt-3 flex flex-col gap-2.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-sub">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">Built with</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-edge bg-surface px-3 py-1.5 text-xs font-medium text-sub"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {(project.github || project.demo) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-edge bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
              >
                <Icon name="github" size={16} /> View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                <Icon name="external" size={16} /> Live Site
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}