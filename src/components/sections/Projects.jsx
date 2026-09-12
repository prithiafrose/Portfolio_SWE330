import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects } from "../../data/portfolio";
import Reveal, { StaggerGroup, StaggerItem } from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";
import AnimatedButton from "../ui/AnimatedButton";
import Icon from "../ui/Icon";
import ProjectCard from "../projects/ProjectCard";
import ProjectModal from "../projects/ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const all = projects.filter((p) => !p.placeholder);
    return [...all].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, []);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-bg-secondary/60" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="Projects"
          title={
            <>
              What I've{" "}
              <span className="text-gradient">built</span>
            </>
          }
          sub="Three full-stack products, live on the web. Source code is on GitHub — tap any project for details."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StaggerGroup className="contents" stagger={0.08}>
            {visible.map((project) => (
              <StaggerItem key={project.id}>
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