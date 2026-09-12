import Icon from "../ui/Icon";

const categoryLabels = {
  web: "Web App",
  app: "Mobile App",
  game: "Game",
};

export default function ProjectCard({ project, onOpen }) {
  const featured = Boolean(project.featured);

  return (
    <article className={featured ? "lg:col-span-2" : ""}>
      <div className="group relative h-full rounded-3xl bg-gradient-to-br from-accent/50 via-transparent to-cyan-400/30 p-px transition-transform duration-300 ease-out hover:-translate-y-1.5">
        <div className="flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-bg transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-accent/10">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="relative block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
            aria-label={`Open project details for ${project.title}`}
          >
            <div className={`relative overflow-hidden ${featured ? "aspect-[16/9] lg:h-56" : "aspect-[16/9]"}`}>
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width="1200"
                height="675"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-40" />
              {project.badge && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  <Icon name="star" size={12} strokeWidth={2.5} />
                  {project.badge}
                </span>
              )}
              <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                {categoryLabels[project.category]}
              </span>
            </div>
          </button>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                {project.title}
              </h3>
              <Icon name="external" size={16} className="mt-1 shrink-0 text-mute transition-colors group-hover:text-accent" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-sub">{project.description}</p>

            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-edge bg-surface px-2.5 py-1 text-xs font-medium text-sub"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
                  aria-label={`${project.title} source code on GitHub`}
                >
                  <Icon name="github" size={14} /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-hover"
                  aria-label={`${project.title} live demo`}
                >
                  <Icon name="external" size={14} /> Live Demo
                </a>
              )}
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
      </div>
    </article>
  );
}