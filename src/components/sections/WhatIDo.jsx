import { whatIDo } from "../../data/portfolio";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";

export default function WhatIDo() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="whatido-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-edge bg-accent-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
            What I do
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Where I focus my{" "}
            <span className="text-gradient">energy</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {whatIDo.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-edge bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5 card-spotlight">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sub">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  Example work <Icon name="arrowRight" size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}