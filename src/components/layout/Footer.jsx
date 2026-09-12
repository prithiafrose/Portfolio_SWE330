import { personal, socials } from "../../data/portfolio";
import SocialButton from "../ui/SocialButton";
import Icon from "../ui/Icon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-edge">
      <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-6">
        <a href="#top" className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label="Back to top">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-cyan-400 font-display text-base font-bold text-white"
            aria-hidden="true"
          >
            P
          </span>
          <span className="font-display text-lg font-bold text-ink">{personal.name}</span>
        </a>
        <p className="mt-2 text-sm text-sub">Web Developer</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {socials.map((social) => (
            <SocialButton key={social.id} social={social} compact />
          ))}
        </div>

        <p className="mt-8 text-sm text-mute">
          © {year} {personal.name} · Made with{" "}
          <span className="inline-flex translate-y-0.5">
            <Icon name="sparkles" size={14} className="text-accent" />
          </span>{" "}
          in Bangladesh
        </p>
        <p className="mt-2 text-xs text-mute">
          Built with React + Tailwind CSS + Framer Motion
        </p>
      </div>
    </footer>
  );
}