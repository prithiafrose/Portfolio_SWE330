import Icon from "../ui/Icon";

export function ProjectCover({ project, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-accent/20 via-surface-2 to-cyan-400/20 ${className}`}
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 opacity-40"
        style={{
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, black, transparent 75%)",
        }}
      />
      <Icon name={project.title === "EduCore" ? "graduation" : project.title === "PrepAI" ? "brain" : "rocket"} size={26} className="absolute right-4 top-4 text-accent/70" />
      <div className="relative flex h-full w-full items-center justify-center">
        <span className="font-display text-5xl font-bold text-gradient sm:text-6xl">
          {project.title.slice(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent/10">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="relative block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
          aria-label={`Open project details for ${project.title}`}
        >
          <ProjectCover project={project} className="aspect-[16/9]" />
          {project.badge && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-lg">
              <Icon name="star" size={12} strokeWidth={2.5} />
              {project.badge}
            </span>
          )}
          {project.tagline && (
            <span className="absolute bottom-3 left-4 right-4">
              <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {project.tagline}
              </span>
            </span>
          )}
        </button>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-ink">{project.title}</h3>
            <Icon name="external" size={16} className="mt-1 shrink-0 text-mute transition-colors group-hover:text-accent" />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-sub">{project.description}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-edge bg-bg px-2.5 py-1 text-xs font-medium text-sub"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-3 pt-6">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-edge bg-bg px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
              aria-label={`${project.title} source code on GitHub`}
            >
              <Icon name="github" size={14} /> GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-hover"
              aria-label={`${project.title} live site`}
            >
              <Icon name="external" size={14} /> Live Site
            </a>
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent-hover"
              aria-label={`Details for ${project.title}`}
            >
              Details <Icon name="arrowRight" size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}