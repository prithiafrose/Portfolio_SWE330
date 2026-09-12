import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects, projectFilters } from "../../data/portfolio";
import Reveal, { StaggerItem, StaggerGroup } from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";
import AnimatedButton from "../ui/AnimatedButton";
import Icon from "../ui/Icon";
import ProjectCard from "../projects/ProjectCard";
import ProjectModal from "../projects/ProjectModal";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const all = projects.filter((p) => !p.placeholder);
    const filtered = filter === "all" ? all : all.filter((p) => p.category === filter);
    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [filter]);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-bg-secondary/60" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="Projects"
          title={
            <>
              Things I've{" "}
              <span className="text-gradient">built</span>
            </>
          }
          sub="A selection of things I've built. Source code is on GitHub — tap any project for details."
        />

        <Reveal className="mt-10">
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
            {projectFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === f.id
                    ? "relative bg-accent text-white shadow-[0_8px_22px_-8px_var(--glow)]"
                    : "border border-edge bg-surface text-sub hover:border-accent/50 hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <StaggerGroup
            key={filter}
            className="contents"
            stagger={0.05}
          >
            {visible.map((project) => (
              <StaggerItem
                key={`${filter}-${project.id}`}
                className={project.featured ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <ProjectCard project={project} onOpen={setSelected} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal className="mt-12 text-center">
          <AnimatedButton href="https://github.com/prithiafrose" variant="secondary" size="md">
            More on GitHub <Icon name="arrowRight" size={15} />
          </AnimatedButton>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}