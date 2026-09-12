import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  skillCategories,
  marqueeTechnologies,
  learningChips,
} from "../../data/portfolio";
import Reveal, { StaggerGroup, StaggerItem } from "../ui/Reveal";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import Marquee from "../ui/Marquee";
import Icon from "../ui/Icon";

function ProgressBar({ level, delay = 0 }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-edge">
      <motion.div
        className="h-full rounded-full bg-accent"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
    </div>
  );
}

export default function Skills() {
  const [activeCat, setActiveCat] = useState(skillCategories[0].id);
  const activeCategory = skillCategories.find((c) => c.id === activeCat);
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="relative py-24 sm:py-32" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="Skills"
          title={
            <>
              Tech stack I{" "}
              <span className="text-gradient">work with</span>
            </>
          }
          sub="The technologies and tools I reach for when building software."
        />

        <Marquee items={marqueeTechnologies} className="mt-10" />

        <Reveal className="mt-12">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 scrollbar-none" role="tablist" aria-label="Skill categories">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCat === cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  activeCat === cat.id
                    ? "text-accent"
                    : "text-sub hover:text-ink"
                }`}
              >
                {activeCat === cat.id && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-xl bg-accent-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon name={cat.icon} size={16} />
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            initial={reduce ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            {activeCategory && (
              <div className="mb-4 text-sm text-sub">
                {activeCategory.description}
              </div>
            )}
            <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {activeCategory?.skills.map((skill, i) => (
                <StaggerItem key={skill.name}>
                  <GlassCard className="p-5" spotlight>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-ink">{skill.name}</h3>
                      <span className="text-xs font-semibold text-accent">{skill.level}%</span>
                    </div>
                    <p className="mt-1 text-xs text-mute capitalize">{activeCategory.label}</p>
                    <ProgressBar level={skill.level} delay={i * 0.05} />
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.15} className="mt-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold text-mute">Currently Learning</span>
            {learningChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-accent/50 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent"
              >
                <Icon name="sparkles" size={12} />
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}