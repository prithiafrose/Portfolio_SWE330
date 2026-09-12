import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personal, socials } from "../../data/portfolio";
import AnimatedButton from "../ui/AnimatedButton";
import SocialButton from "../ui/SocialButton";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";

function useTyping(words, typeSpeed = 82, deleteSpeed = 36, pause = 2200) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    if (!deleting && text === word) {
      const timer = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timer);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
      return;
    }
    const timer = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [text, idx, deleting, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTyping(personal.roles);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
      aria-label="Introduction"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative z-10">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-3.5 py-1.5 text-xs font-semibold tracking-wide text-sub">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {personal.availability}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mb-2 text-sm font-medium text-sub">{personal.role} · {personal.university}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[3.5rem]">
              Hi, I'm{" "}
              <span className="text-gradient">{personal.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-4 font-display text-lg font-semibold text-accent sm:text-xl min-h-[2rem]">
              {typed}
              <span className="inline-block w-[2px] -translate-y-0.5 animate-pulse bg-accent" style={{ height: "1.2em", verticalAlign: "text-bottom" }} />
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-sub sm:text-lg">
              {personal.headline}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AnimatedButton href="#projects" variant="primary" size="lg">
                View Projects <Icon name="arrowRight" size={16} />
              </AnimatedButton>
              <AnimatedButton href="#contact" variant="ghost" size="lg">
                Contact Me
              </AnimatedButton>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map((social) => (
                <SocialButton key={social.id} social={social} compact />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative z-10 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 via-cyan-400/20 to-violet-400/30 blur-2xl dark:from-accent/30 dark:via-cyan-500/15 dark:to-violet-500/25" />
            <img
              src={personal.profileImage}
              alt={personal.avatarAlt}
              className="relative h-72 w-56 rounded-3xl object-cover shadow-2xl shadow-black/10 ring-2 ring-edge/60 sm:h-80 sm:w-64 md:h-[26rem] md:w-72 dark:shadow-black/30"
              width="288"
              height="416"
              fetchpriority="high"
            />
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs font-medium text-mute transition-colors hover:text-accent"
        aria-label="Scroll to About"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon name="arrowRight" size={16} className="rotate-90" />
        </motion.span>
      </a>
    </section>
  );
}