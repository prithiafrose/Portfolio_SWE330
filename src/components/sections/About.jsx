import {
  aboutHighlights,
  stats,
  personal,
} from "../../data/portfolio";
import Reveal, { StaggerGroup, StaggerItem } from "../ui/Reveal";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import AnimatedButton from "../ui/AnimatedButton";
import Icon from "../ui/Icon";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="About"
          title={
            <>
              The person behind the{" "}
              <span className="text-gradient">code</span>
            </>
          }
          sub="A quick snapshot of where I am, what I do, and what drives me."
        />

        <div className="mt-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-cyan-400/20 blur-xl dark:from-accent/15 dark:to-cyan-500/10" />
              <img
                src={personal.profileImage}
                alt="Prithi Afrose smiling in profile"
                className="relative w-full rounded-3xl object-cover shadow-lg ring-1 ring-edge"
                loading="lazy"
                decoding="async"
                width="700"
                height="490"
              />
              <GlassCard
                className="absolute bottom-4 left-4 flex items-center gap-3 px-4 py-3 sm:bottom-6 sm:left-6"
                lift={false}
              >
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-ink">
                  {personal.availability}
                </span>
              </GlassCard>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                I'm a <span className="text-accent">Software Engineering student</span> who loves
                turning ideas into products that people enjoy using.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-sub">
                I'm passionate about building interactive web apps and mobile solutions. I love
                taking an idea and turning it into a functional, user-friendly product — and I'm
                constantly learning to do it better.
              </p>
            </Reveal>

            <Reveal>
              <ul className="flex flex-col gap-3">
                {aboutHighlights.map((h) => (
                  <li key={h.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon name={h.icon} size={17} />
                    </span>
                    <div>
                      <span className="block text-xs font-medium text-mute">{h.label}</span>
                      <span className="text-sm font-semibold text-ink">{h.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <StaggerGroup
          className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4"
          stagger={0.06}
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <GlassCard className="p-5 text-center" spotlight>
                <div className="font-display text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-semibold text-ink">{stat.label}</div>
                <div className="mt-0.5 text-[11px] text-mute">{stat.sub}</div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/60 via-transparent to-cyan-400/30 p-px">
            <div className="flex flex-col items-center gap-6 rounded-[calc(1.5rem-1px)] bg-bg p-6 sm:p-8 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon name="download" size={24} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">My resume</h3>
                  <p className="mt-1 text-sm text-sub">
                    One-page CV, always up to date and ready for internships.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <AnimatedButton href={personal.resume} variant="primary" size="md">
                  Download Resume <Icon name="download" size={15} />
                </AnimatedButton>
                <AnimatedButton href={personal.resume} variant="ghost" size="md" newTab>
                  View online <Icon name="external" size={14} />
                </AnimatedButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}