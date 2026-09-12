import { cta } from "../../data/portfolio";
import Reveal from "../ui/Reveal";
import AnimatedButton from "../ui/AnimatedButton";
import Icon from "../ui/Icon";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-28" aria-hidden="false">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/60 via-transparent to-cyan-400/40 p-px">
            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-bg px-6 py-12 text-center sm:px-12 sm:py-16">
              <div className="animate-float-slow pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
              <div className="animate-float-slow pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl [animation-delay:-4s]" />

              <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-edge bg-accent-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
                <Icon name="rocket" size={14} />
                {cta.eyebrow}
              </p>
              <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {cta.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-sub">
                {cta.body}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <AnimatedButton href="#contact" variant="primary" size="lg">
                  Say hello <Icon name="send" size={16} />
                </AnimatedButton>
                <AnimatedButton
                  href="https://github.com/prithiafrose"
                  variant="secondary"
                  size="lg"
                >
                  Explore GitHub <Icon name="github" size={16} />
                </AnimatedButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}