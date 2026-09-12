import { motion } from "framer-motion";
import { experience, education, personal, metrics } from "../../data/portfolio";
import Reveal, { StaggerGroup, StaggerItem } from "../ui/Reveal";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import AnimatedButton from "../ui/AnimatedButton";
import Icon from "../ui/Icon";

const iconByKind = {
  education: "graduation",
  competition: "trophy",
  work: "braces",
};

const timelineGroups = [
  { label: "Experience & Activities", items: experience, kind: "experience" },
  { label: "Education", items: education, kind: "education" },
];

function TimedLine({ items }) {
  return (
    <div className="relative ml-3">
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-[1.35rem] top-2 w-px bg-gradient-to-b from-accent/70 via-edge to-transparent"
      />
      <ul className="flex flex-col gap-5">
        {items.map((item, i) => (
          <motion.li
            key={`${item.title}-${i}`}
            className="relative flex items-start gap-4"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span
              className="relative z-10 mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-edge bg-surface text-accent shadow-sm"
              aria-hidden="true"
            >
              <Icon
                name={iconByKind[item.kind] || (i === 0 ? "graduation" : "trophy")}
                size={18}
              />
            </span>
            <div className="flex flex-1 flex-col rounded-2xl border border-edge bg-surface p-4 transition-colors duration-300 hover:border-accent/50">
              <span className="text-xs font-medium text-mute">{item.date}</span>
              <h4 className="mt-0.5 text-sm font-bold text-ink">{item.title}</h4>
              <p className="mt-0.5 text-sm text-sub">{item.org}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ContributionGrid() {
  const cells = [];
  const monthBeads = [];
  for (let w = 0; w < 26; w++) {
    for (let d = 0; d < 7; d++) {
      const n = Math.abs(Math.sin(w * 3.7 + d * 1.9) * 10) % 10;
      const level = n < 6 ? 0 : n < 8 ? 1 : n < 9.2 ? 2 : 3;
      cells.push(level);
    }
  }
  for (let w = 0; w < 26; w++) {
    monthBeads.push(Math.floor(Math.abs(Math.sin(w * 1.3 + 2) * 8)) % 4 === 0);
  }

  const levelCls = [
    "bg-slate-200/70 dark:bg-slate-700/50",
    "bg-accent/30",
    "bg-accent/60",
    "bg-accent",
  ];

  return (
    <div aria-hidden="true" className="flex flex-col gap-1.5">
      <div className="flex gap-1.5">
        {cells.map((level, i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-[3px] ${levelCls[level]}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-mute">Active on GitHub</span>
        <span className="ml-auto flex items-center gap-0.5">
          <span className="h-2 w-2 rounded-[2px] bg-slate-200/70 dark:bg-slate-700/50" />
          <span className="text-[10px] text-mute">Less</span>
          <span className="ml-1 h-2 w-2 rounded-[2px] bg-accent" />
          <span className="text-[10px] text-mute">More</span>
        </span>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="Experience & Education"
          title={
            <>
              My journey{" "}
              <span className="text-gradient">so far</span>
            </>
          }
          sub="Education, competitions, and milestones that shaped how I build software."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <StaggerGroup
            className="flex flex-col gap-10 lg:col-span-3"
            stagger={0.08}
          >
            {timelineGroups.map((group) => (
              <StaggerItem key={group.label}>
                <h3 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sub">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {group.label}
                </h3>
                <TimedLine items={group.items} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <Reveal>
              <GlassCard className="p-6" spotlight>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-ink">
                    GitHub activity
                  </h3>
                  <Icon name="github" size={18} className="text-accent" />
                </div>
                <div className="mt-5 overflow-hidden rounded-xl border border-edge bg-bg p-4">
                  <ContributionGrid />
                </div>
                <p className="mt-4 text-sm text-sub">
                  Building consistently — commits, projects, and experiments land on my GitHub.
                </p>
                <a
                  href="https://github.com/prithiafrose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  View profile <Icon name="arrowRight" size={14} />
                </a>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.1}>
              <GlassCard className="p-6" spotlight>
                <h3 className="font-display text-base font-bold text-ink">
                  Quick metrics
                </h3>
                <ul className="mt-4 flex flex-col gap-3.5">
                  {metrics.map((m) => (
                    <li key={m.label} className="flex items-center justify-between gap-3">
                      <span className="text-sm text-sub">{m.label}</span>
                      <span className="font-display text-lg font-bold text-accent">{m.value}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-sm text-sub">Core stack</span>
                    <span className="text-sm font-semibold text-ink">React · Node · Postgres</span>
                  </li>
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/60 via-transparent to-cyan-400/30 p-px">
                <div className="flex flex-col items-start gap-4 rounded-[calc(1.5rem-1px)] bg-bg p-6">
                  <p className="text-lg font-bold text-ink">Want the full story?</p>
                  <p className="text-sm text-sub">
                    {personal.availability} — download my resume for the complete picture.
                  </p>
                  <AnimatedButton href={personal.resume} variant="primary" size="sm">
                    Download Resume <Icon name="download" size={14} />
                  </AnimatedButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}